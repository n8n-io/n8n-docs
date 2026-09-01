#!/usr/bin/env bash
# Process ONE DocOps version-snippet PR: gate -> verdict -> act.
# Called by .github/workflows/docops-auto-merge.yml (trusted default-branch
# checkout, pinned to main). Reads PR data through the API; never runs PR-head code.
#
# Exit codes: 0 = handled (merged / closed / waiting / ignored);
#             3 = escalated (checks_failed / checks_timeout / escalate) - visibly red.
set -euo pipefail

PR="${1:?usage: docops_auto_merge.sh <pr-number>}"
: "${GH_TOKEN:?}" ; : "${GH_REPO:?}"
DRY_RUN="${DRY_RUN:-false}"
SNIPPET_PATH="${SNIPPET_PATH:?}"
MARKER="${MARKER:?}"
BRANCH_RE="${BRANCH_RE:?}"
ALLOWED_AUTHORS="${ALLOWED_AUTHORS:?}"
REQUIRED_CHECKS="${REQUIRED_CHECKS:?}"     # comma-separated required check names/contexts
CHECKS_TIMEOUT_MIN="${CHECKS_TIMEOUT_MIN:-60}"
OWNER="${GH_REPO%/*}" ; REPO_NAME="${GH_REPO#*/}"

log() { echo "PR #$PR: $*"; }

# ---------------------------------------------------------------- PR metadata
pr_json="$(gh api "repos/$GH_REPO/pulls/$PR")"
author="$(jq -r '.user.login' <<<"$pr_json")"
head_sha="$(jq -r '.head.sha' <<<"$pr_json")"
head_ref="$(jq -r '.head.ref' <<<"$pr_json")"
head_repo="$(jq -r '.head.repo.full_name // ""' <<<"$pr_json")"
is_draft="$(jq -r '.draft' <<<"$pr_json")"
state="$(jq -r '.state' <<<"$pr_json")"
body="$(jq -r '.body // ""' <<<"$pr_json")"
labels="$(jq -r '.labels[].name' <<<"$pr_json")"
linear_key="$(sed -nE 's/^(doc-[0-9]+)-.*/\1/p' <<<"$head_ref" | tr '[:lower:]' '[:upper:]')"
slack_ts="$(sed -nE 's/.*docops:slack-ts=([0-9.]+).*/\1/p' <<<"$body" | head -1)"

# ---------------------------------------------------------------- gate
[ "$state" = "open" ] || { log "not open; skip"; exit 0; }
grep -qF "$MARKER" <<<"$body"           || { log "no marker; ignore (v1 or unrelated PR)"; exit 0; }
tr ', ' '\n\n' <<<"$ALLOWED_AUTHORS" | grep -Fqx "$author" || { log "author '$author' not allowed; skip"; exit 0; }
[[ "$head_ref" =~ $BRANCH_RE ]]         || { log "branch '$head_ref' not a snippet branch; skip"; exit 0; }
[ "$head_repo" = "$GH_REPO" ]           || { log "head repo '$head_repo' is a fork; skip"; exit 0; }
[ "$is_draft" = "false" ]               || { log "draft; skip"; exit 0; }
grep -qx "status:do-not-merge" <<<"$labels" && { log "kill-switch label present; skip"; exit 0; }

# ---------------------------------------------------------------- helpers
add_label() { [ "$DRY_RUN" = "true" ] && return 0; gh pr edit "$PR" -R "$GH_REPO" --add-label "$1" >/dev/null 2>&1 || true; }

upsert_check() { # conclusion title summary  (no-op in dry-run: must not mutate PR state)
  [ "$DRY_RUN" = "true" ] && return 0
  gh api -X POST "repos/$GH_REPO/check-runs" \
    -f name="DocOps / auto-merge" -f head_sha="$head_sha" \
    -f status=completed -f conclusion="$1" \
    -f "output[title]=$2" -f "output[summary]=$3" >/dev/null 2>&1 || true
}

post_outcome() { # outcome
  [ -z "${WEBHOOK_URL:-}" ] && { log "no webhook configured; skip outcome POST"; return 0; }
  local payload
  payload="$(jq -n \
    --argjson pr "$PR" --arg head_sha "$head_sha" --arg verdict "$1" \
    --arg reason "${reason:-}" --arg branch "$head_ref" --arg linear_key "$linear_key" \
    --arg slack_ts "$slack_ts" --arg failing_check "${failing:-}" --arg run_url "${RUN_URL:-}" \
    --arg base_stable "${base_stable:-}" --arg base_beta "${base_beta:-}" \
    --arg head_stable "${head_stable:-}" --arg head_beta "${head_beta:-}" \
    --arg npm_stable "${npm_stable:-}" --arg npm_beta "${npm_beta:-}" \
    '{pr:$pr, head_sha:$head_sha, verdict:$verdict, reason:$reason, branch:$branch,
      linear_key:$linear_key, slack_ts:$slack_ts, failing_check:$failing_check, run_url:$run_url,
      base:{stable:$base_stable,beta:$base_beta}, head:{stable:$head_stable,beta:$head_beta},
      npm:{stable:$npm_stable,beta:$npm_beta}}')"
  curl -fsS -u "${WEBHOOK_USER:-}:${WEBHOOK_PASSWORD:-}" -H 'content-type: application/json' \
    -d "$payload" "$WEBHOOK_URL" >/dev/null 2>&1 || log "outcome POST failed (non-fatal)"
}

do_escalate() { # verdict reason
  reason="$2"
  upsert_check failure "$1" "$reason"
  if [ "$DRY_RUN" != "true" ]; then
    add_label status:do-not-merge
    gh pr comment "$PR" -R "$GH_REPO" -b "🛑 DocOps auto-merge: **$1** — $reason. Left for a human; \`status:do-not-merge\` set." >/dev/null 2>&1 || true
  fi
  post_outcome "$1"
  log "escalated ($1): $reason"
}

approve_pr() {  # 0 = approved (or already approved); 1 = approval failed (surface it)
  [ "$DRY_RUN" = "true" ] && return 0
  local n
  n="$(gh api "repos/$GH_REPO/pulls/$PR/reviews" --jq '[.[]|select(.state=="APPROVED")]|length' 2>/dev/null || echo 0)"
  [ "${n:-0}" -gt 0 ] && return 0
  # No `|| true`: a failed approval must escalate, not silently time out. n8n-docs
  # has "Allow GitHub Actions to approve pull requests" enabled (verified:
  # can_approve_pull_request_reviews=true), so github-actions[bot] can approve;
  # if that is ever revoked, this returns non-zero and the caller escalates.
  gh pr review "$PR" -R "$GH_REPO" --approve \
    -b "Automated version-snippet update: numbers verified against npm dist-tags. Merges once CI is green." >/dev/null 2>&1
}

# Name of the first REQUIRED check that concluded failure on head_sha, else empty.
# Only required checks count, so a failing OPTIONAL check never escalates.
required_failed() {
  local names=() n r
  while IFS= read -r n; do [ -n "$n" ] && names+=("$n"); done < <(
    gh api "repos/$GH_REPO/commits/$head_sha/check-runs" --paginate \
      --jq '.check_runs[] | select(.status=="completed" and (.conclusion=="failure" or .conclusion=="cancelled" or .conclusion=="timed_out")) | .name' 2>/dev/null || true)
  while IFS= read -r n; do [ -n "$n" ] && names+=("$n"); done < <(
    gh api "repos/$GH_REPO/commits/$head_sha/status" \
      --jq '.statuses[] | select(.state=="failure" or .state=="error") | .context' 2>/dev/null || true)
  IFS=',' read -ra req <<<"$REQUIRED_CHECKS"
  for n in "${names[@]:-}"; do
    for r in "${req[@]}"; do
      [ "$n" = "$r" ] && { echo "$n"; return 0; }
    done
  done
  return 0
}

head_age_min() {  # echoes minutes since the head commit; returns 1 if unavailable
  local committed
  committed="$(gh api "repos/$GH_REPO/commits/$head_sha" --jq '.commit.committer.date' 2>/dev/null || true)"
  [ -z "$committed" ] && return 1   # do NOT pretend age 0 (would silently wait)
  echo $(( ( $(date -u +%s) - $(date -u -d "$committed" +%s) ) / 60 ))
}

merge_state() {
  gh api graphql -f query='query($o:String!,$r:String!,$n:Int!){repository(owner:$o,name:$r){pullRequest(number:$n){mergeStateStatus}}}' \
    -F o="$OWNER" -F r="$REPO_NAME" -F n="$PR" --jq '.data.repository.pullRequest.mergeStateStatus' 2>/dev/null || echo UNKNOWN
}

# ---------------------------------------------------------------- changed files must be exactly the snippet
files="$(gh api "repos/$GH_REPO/pulls/$PR/files" --paginate --jq '.[].filename')"
if [ "$(grep -c . <<<"$files")" -ne 1 ] || [ "$files" != "$SNIPPET_PATH" ]; then
  do_escalate escalate "changed files are not exactly the version snippet ($(echo "$files" | tr '\n' ' '))"
  exit 3
fi

# ---------------------------------------------------------------- fetch base/head snippet + npm (explicit failures)
base_file="$(mktemp)" ; head_file="$(mktemp)"
fetch_snippet() { # ref dest
  local b64
  if ! b64="$(gh api "repos/$GH_REPO/contents/$SNIPPET_PATH?ref=$1" --jq '.content' 2>/dev/null)"; then
    return 1
  fi
  printf '%s' "$b64" | tr -d '\n' | base64 -d > "$2" 2>/dev/null
}
if ! fetch_snippet "main" "$base_file";     then do_escalate escalate "could not fetch/decode the snippet on main"; exit 3; fi
if ! fetch_snippet "$head_sha" "$head_file"; then do_escalate escalate "could not fetch/decode the snippet at head"; exit 3; fi

if ! dist="$(curl -fsSL https://registry.npmjs.org/-/package/n8n/dist-tags 2>/dev/null)"; then
  do_escalate escalate "could not reach npm dist-tags"; exit 3
fi
npm_stable="$(jq -r '.stable // .latest // empty' <<<"$dist")"
npm_beta="$(jq -r '.beta // .next // empty' <<<"$dist")"
if [ -z "$npm_stable" ] || [ -z "$npm_beta" ]; then
  do_escalate escalate "npm dist-tags missing stable/beta"; exit 3
fi

# ---------------------------------------------------------------- verdict
out="$(python3 .github/scripts/check_version_snippet_pr.py \
        --base "$base_file" --head "$head_file" \
        --npm-stable "$npm_stable" --npm-beta "$npm_beta")"
verdict="$(jq -r '.verdict' <<<"$out")"
reason="$(jq -r '.reason' <<<"$out")"
base_stable="$(jq -r '.base.stable // empty' <<<"$out")" ; base_beta="$(jq -r '.base.beta // empty' <<<"$out")"
head_stable="$(jq -r '.head.stable // empty' <<<"$out")" ; head_beta="$(jq -r '.head.beta // empty' <<<"$out")"
failing=""
log "verdict=$verdict ($reason) base=$base_stable/$base_beta head=$head_stable/$head_beta npm=$npm_stable/$npm_beta"

# ---------------------------------------------------------------- act
case "$verdict" in
  merge)
    # Required-check gate FIRST, so a dry-run reports the same verdict as a live run.
    failing="$(required_failed || true)"
    if [ -n "$failing" ]; then
      reason="required check failed: $failing"
      if [ "$DRY_RUN" = "true" ]; then log "[dry-run] would escalate: $reason"; post_outcome checks_failed; exit 0; fi
      do_escalate checks_failed "$reason"; exit 3
    fi
    if [ "$DRY_RUN" = "true" ]; then
      log "[dry-run] would merge once CLEAN (mergeStateStatus=$(merge_state))"
      post_outcome merge; exit 0
    fi

    add_label docops:auto-merge
    if ! approve_pr; then
      do_escalate escalate "bot approval failed - check repo Actions setting 'Allow GitHub Actions to approve pull requests'"; exit 3
    fi
    mss="$(merge_state)"              # supplying the review may flip BLOCKED -> CLEAN
    case "$mss" in
      CLEAN)
        # --match-head-commit: refuse to merge a commit we did not verify (PR raced).
        if gh pr merge "$PR" -R "$GH_REPO" --squash --delete-branch --match-head-commit "$head_sha"; then
          upsert_check success merge "$reason"    # only after the merge actually lands
          post_outcome merged ; log "merged"
        else
          do_escalate escalate "merge command failed (head moved or protection changed)"; exit 3
        fi ;;
      BEHIND)
        gh api -X PUT "repos/$GH_REPO/pulls/$PR/update-branch" >/dev/null 2>&1 || true
        log "branch BEHIND; updated, will retry on next event" ; exit 0 ;;
      BLOCKED|UNSTABLE)
        if age="$(head_age_min)"; then
          if [ "$age" -ge "$CHECKS_TIMEOUT_MIN" ]; then
            do_escalate checks_timeout "a required check has not reported in ${CHECKS_TIMEOUT_MIN}m (mergeStateStatus=$mss)"; exit 3
          fi
          log "checks pending (mss=$mss, ${age}m); waiting" ; exit 0
        else
          do_escalate escalate "could not read head commit time to evaluate the timeout"; exit 3
        fi ;;
      *)
        do_escalate escalate "unexpected mergeStateStatus=$mss" ; exit 3 ;;
    esac
    ;;

  close_outdated)
    upsert_check neutral "close_outdated" "$reason"
    if [ "$DRY_RUN" = "true" ]; then log "[dry-run] would close_outdated"; post_outcome closed_outdated; exit 0; fi
    gh pr comment "$PR" -R "$GH_REPO" -b "🗑️ Closing: docs already at stable \`$base_stable\` / beta \`$base_beta\`. A fresh PR opens automatically if npm moves." >/dev/null 2>&1 || true
    add_label status:outdated
    gh pr close "$PR" -R "$GH_REPO" --delete-branch
    post_outcome closed_outdated ; log "closed_outdated" ;;

  *)  do_escalate escalate "$reason" ; exit 3 ;;
esac
