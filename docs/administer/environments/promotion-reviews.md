---
description: Approve promoted changes in n8n before they reach the environment's branch, using promotion reviews.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---


# Promotion reviews

A promotion review lets someone approve promoted changes on the source instance before they reach the branch of the environment. Instances that apply from that environment get the changes only after approval.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## How promotion reviews work

You turn on promotion reviews on the environment an instance promotes changes to. Each promote then opens a review instead of changing the environment's branch directly. Reviews appear in **Reviews** in the left menu of the source instance, where you inspect the changes and approve them.

While a review for a project is open, you can't promote that project again, and you can't add changes to the open review. This prevents merge conflicts between reviews. Approve or close the review, then promote again.

Only instance owners and instance admins can see and approve promotion reviews.

## Supported providers

Only GitLab supports promotion reviews at the moment, using merge requests. Support for more Git providers is planned, as well as promotion reviews that don't depend on a Git host. With [Generic Git](git-based-promotion/generic-git.md), n8n can push each promote to a feature branch, and someone merges it on the Git host manually.

## Promotion reviews with GitLab

### Turn on promotion reviews

On the instance that promotes changes, edit the environment it promotes changes to and turn on **Open a merge request in GitLab**. See [Set up environments](set-up-environments.md#add-an-environment).

Each promote then pushes a feature branch and opens a merge request into the environment's branch. The merge request appears as a promotion review in **Reviews**. **Reviews** lists only merge requests that n8n opened.

### Review and approve a promotion

1. On the instance that promoted the changes, select **Reviews** in the left menu. Promotion reviews have a **Promotion** badge.
2. Open the review. The **Changes** tab shows each changed workflow and dependency. **Before** is the environment's branch, and **After** is the review.
3. Select **Approve and merge**. n8n approves the merge request on GitLab, merges it, and deletes its branch. You can't undo this.

### When you can't approve and merge

n8n disables **Approve and merge** when:

- A reviewer requested changes on GitLab.
- The merge request has conflicts.
- Someone pushed new commits since you loaded the review.

GitLab can also reject the merge, for example when a required pipeline hasn't passed. n8n then shows GitLab's message. Resolve the cause on GitLab, then reload **Reviews**.

### n8n acts as the token's user

n8n opens, approves, and merges merge requests as the GitLab user of the provider's access token, not as the n8n user who selects **Approve and merge**. n8n adds a note to the merge request with the name of the n8n user who approved it.

Because the same GitLab user opens and approves the merge request, GitLab approval rules that stop authors from approving their own merge requests block **Approve and merge**. Adjust the approval rules, or merge on GitLab.

### Review states

| State | Meaning |
|---|---|
| **Open** | The review waits for approval. |
| **Changes requested** | A reviewer asked for changes on GitLab. |
| **Merged** | The changes are on the environment's branch. |
| **Closed** | Someone closed the review without merging it. |

## Related resources

- [Environments](./)
- [Plan your environments](plan-your-environments.md)
- [Set up environments](set-up-environments.md)
- [Promote changes](promote-changes.md)
- [Apply changes](apply-changes.md)
- [Git-based promotion](git-based-promotion/README.md)
- [Known limitations](known-limitations.md)
- [Switch from Environments (Classic)](switch-from-environments-classic.md)
- [GitLab](git-based-promotion/gitlab.md)
- [Workflow reviews](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/workflow-reviews)
