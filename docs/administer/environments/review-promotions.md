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

# Review promotions

A promotion review lets someone check and approve promoted changes before they reach the branch of the environment. Instances that apply from that environment get the changes only after approval.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## Supported providers

Promotion reviews depend on the provider of the environment:

| Provider | Promotion reviews |
|---|---|
| [GitLab](git-based-promotion/gitlab.md#promotion-reviews-with-merge-requests) | Yes, as merge requests |
| [Generic Git](git-based-promotion/generic-git.md) | No. n8n can push each promote to a new branch, and someone merges it on the Git host. |

Only GitLab supports promotion reviews.

## Turn on promotion reviews

Promotion reviews are a setting of the environment an instance promotes changes to. For GitLab, turn on **Open a merge request in GitLab** when you [add or edit the environment](set-up-environments.md#add-an-environment). Each promote then opens a new review. If n8n can't open it, the promote still succeeds without a review.

## Review and approve a promotion

1. On the instance that promoted the changes, select **Reviews** in the left menu. Promotion reviews have a **Promotion** badge.
2. Open the review. The **Changes** tab shows each changed workflow and dependency. **Before** is the environment's branch, and **After** is the review.
3. Approve the review. For what approval does on your Git host, see the provider's page.

Instance owners and instance admins can approve reviews. You can't approve a review you requested.

## Review states

| State | Meaning |
|---|---|
| **Open** | The review waits for approval. |
| **Changes requested** | A reviewer asked for changes on the Git host. |
| **Merged** | The changes are on the environment's branch. |
| **Closed** | Someone closed the review without merging it. |

## One open review per project

While a review for a project is open, you can't promote that project again. The **Changes to promote** page shows **A review is open**. Approve or close the review, then promote again.

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
