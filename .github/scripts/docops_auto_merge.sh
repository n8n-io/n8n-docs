#!/usr/bin/env bash
# Process ONE DocOps version-snippet PR: gate -> verdict -> act.
# Called by .github/workflows/docops-auto-merge.yml (trusted default-branch
# checkout). Reads PR data through the API; never runs PR-head code.
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
tr ', ' '\n\n' <<<"$ALLOWED_AUTHORS" | grep -qx "$author" || { log "author '$author' not allowed; skip"; exit 0; }
[[ "$head_ref" =~ $BRANCH_RE ]]         || { log "branch '$head_ref' not a snippet branch; skip"; exit 0; }
[ "$head_repo" = "$GH_REPO" ]           || { log "head repo '$head_repo' is a fork; skip"; exit 0; }
[ "$is_draft" = "false" ]               || { log "draft; skip"; exit 0; }
grep -qx "status:do-not-merge" <<<"$labels" && { log "kill-switch label present; skip"; exit 0; }

# ---------------------------------------------------------------- helpers
add_label() { gh pr edit "$PR" -R "$GH_REPO" --add-label "$1" >/dev/null 2>&1 || true; }

upsert_check() { # conclusion title summary
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
    --arg slack_ts "$slack_ts" --arg failing_check "${failing:-}" \
    --arg run_url "${RUN_URL:-}" \
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

# ---------------------------------------------------------------- changed files must be exactly the snippet
files="$(gh api "repos/$GH_REPO/pulls/$PR/files" --paginate --jq '.[].filename')"
if [ "$(grep -c . <<<"$files")" -ne 1 ] || [ "$files" != "$SNIPPET_PATH" ]; then
  do_escalate escalate "changed files are not exactly the version snippet ($(echo "$files" | tr '\n' ' '))"
  exit 3
fi

# ---------------------------------------------------------------- fetch base/head snippet + npm
base_file="$(mktemp)" ; head_file="$(mktemp)"
gh api "repos/$GH_REPO/contents/$SNIPPET_PATH?ref=main"      --jq '.content' | tr -d '\n' | base64 -d > "$base_file"
gh api "repos/$GH_REPO/contents/$SNIPPET_PATH?ref=$head_sha" --jq '.content' | tr -d '\n' | base64 -d > "$head_file"

dist="$(curl -fsSL https://registry.npmjs.org/-/package/n8n/dist-tags)"
npm_stable="$(jq -r '.stable // .latest // empty' <<<"$dist")"
npm_beta="$(jq -r '.beta // .next // empty' <<<"$dist")"
if [ -z "$npm_stable" ] || [ -z "$npm_beta" ]; then
  do_escalate escalate "could not read npm dist-tags (stable/beta)"
  exit 3
fi

# ---------------------------------------------------------------- verdict
out="$(python3 .github/scripts/check_version_snippet_pr.py \
        --base "$base_file" --head "$head_file" \
        --npm-stable "$npm_stable" --npm-beta "$npm_beta")"
verdict="$(jq -r '.verdict' <<<"$out")"
reason="$(jq -r '.reason' <<<"$out")"
base_stable="$(jq -r '.base.stable // empty' <<<"$out")" ; base_beta="$(jq -r '.base.beta // empty' <<<"$out")"
head_stable="$(jq -r '.head.stable // empty' <<<"$out")" ; head_beta="$(jq -r '.head.beta // empty' <<<"$out")"
log "verdict=$verdict ($reason) base=$base_stable/$base_beta head=$head_stable/$head_beta npm=$npm_stable/$npm_beta"

# ---------------------------------------------------------------- CI state (only gates a would-be merge)
failing=""
if [ "$verdict" = "merge" ]; then
  runs="$(gh api "repos/$GH_REPO/commits/$head_sha/check-runs" --jq '.check_runs')"
  failing="$(jq -r '[.[] | select(.status=="completed" and ((.conclusion=="failure") or (.conclusion=="cancelled") or (.conclusion=="timed_out"))) | .name] | first // empty' <<<"$runs")"
  if [ -z "$failing" ]; then
    stj="$(gh api "repos/$GH_REPO/commits/$head_sha/status")"
    failing="$(jq -r '[.statuses[] | select(.state=="failure" or .state=="error") | .context] | first // empty' <<<"$stj")"
  fi
  if [ -n "$failing" ]; then
    verdict=checks_failed
    reason="required check failed: $failing"
  fi
fi

# ---------------------------------------------------------------- act
case "$verdict" in
  merge)
    mss="$(gh api graphql -f query='query($o:String!,$r:String!,$n:Int!){repository(owner:$o,name:$r){pullRequest(number:$n){mergeStateStatus}}}' \
            -F o="$OWNER" -F r="$REPO_NAME" -F n="$PR" --jq '.data.repository.pullRequest.mergeStateStatus')"
    upsert_check success "merge" "$reason (mergeStateStatus=$mss)"
    if [ "$DRY_RUN" = "true" ]; then log "[dry-run] would merge (mss=$mss)"; post_outcome merge; exit 0; fi
    add_label docops:auto-merge
    approved="$(gh api "repos/$GH_REPO/pulls/$PR/reviews" --jq '[.[]|select(.state=="APPROVED")]|length')"
    [ "$approved" -gt 0 ] || gh pr review "$PR" -R "$GH_REPO" --approve \
      -b "Automated version-snippet update: numbers verified against npm dist-tags. Merges once CI is green." >/dev/null 2>&1 || true
    case "$mss" in
      CLEAN)
        gh pr merge "$PR" -R "$GH_REPO" --squash --delete-branch
        post_outcome merged ; log "merged" ;;
      BEHIND)
        gh api -X PUT "repos/$GH_REPO/pulls/$PR/update-branch" >/dev/null 2>&1 || true
        log "branch BEHIND; updated, will retry on next event" ; exit 0 ;;
      BLOCKED|UNSTABLE)
        committed="$(gh api "repos/$GH_REPO/commits/$head_sha" --jq '.commit.committer.date')"
        age_min=$(( ( $(date -u +%s) - $(date -u -d "$committed" +%s) ) / 60 ))
        if [ "$age_min" -ge "$CHECKS_TIMEOUT_MIN" ]; then
          do_escalate checks_timeout "a required check has not reported in ${CHECKS_TIMEOUT_MIN}m (mergeStateStatus=$mss)"
          exit 3
        fi
        log "checks pending (mss=$mss, ${age_min}m); waiting" ; exit 0 ;;
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

  checks_failed)  do_escalate checks_failed "$reason" ; exit 3 ;;
  *)              do_escalate escalate "$reason" ; exit 3 ;;
esac
