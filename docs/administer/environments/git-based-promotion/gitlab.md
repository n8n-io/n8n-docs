---
description: Connect Environments to GitLab with an access token, pick repositories and branches, and review promotions as GitLab merge requests.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# GitLab

The GitLab provider connects an environment to a repository on GitLab.com or a self-managed GitLab instance. It lists your repositories and branches, and supports promotion reviews as merge requests.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## What GitLab supports

| Feature | Supported |
|---|---|
| Authentication | Access token |
| Pick repositories and branches from a list | Yes |
| Push each promote to a feature branch | Yes, with a merge request |
| Promotion reviews | Yes, as merge requests |

## Connect GitLab

1. Create a personal, group, or project access token in GitLab with the `api` and `write_repository` scopes. n8n recommends a group access token. TODO(OPEN-9): confirm the required role (Developer or Maintainer).
2. In the **Connect GitLab** dialog, enter a **Name**, the **GitLab base URL**, such as `https://gitlab.com` or `https://gitlab.example.com`, and the **Access token**.
3. Select **Continue**.
4. In the environment settings, pick the **Repository** and **Branch** from the lists.

For a self-managed GitLab instance on an internal network or with a private certificate authority, see [Git-based promotion](README.md#self-hosted-n8n).

## Promotion reviews with merge requests

To review promotions, turn on **Open a merge request in GitLab** on the environment an instance promotes changes to. Each promote then pushes a feature branch and opens a merge request into the environment's branch. The merge request appears in n8n as a [promotion review](../review-promotions.md).

To approve, open the review in n8n and select **Approve and merge**. n8n approves the merge request on GitLab, merges it, and deletes its branch. You can't undo this.

### n8n acts as the token's user

n8n opens, approves, and merges merge requests as the GitLab user of the access token, not as the n8n user who selects **Approve and merge**. n8n adds a note to the merge request with the name of the n8n user who approved it.

Because the same GitLab user opens and approves the merge request, GitLab approval rules that stop authors from approving their own merge requests block **Approve and merge**. Adjust the approval rules or merge on GitLab.

### When you can't approve and merge

n8n disables **Approve and merge** when:

- A reviewer requested changes on GitLab.
- The merge request has conflicts.
- Someone pushed new commits since you loaded the review.

GitLab can also reject the merge, for example when a required pipeline hasn't passed. n8n then shows an error. Resolve the cause on GitLab, then reload **Reviews**.

### Only merge requests opened by n8n

**Reviews** lists only merge requests that n8n opened. If n8n can't open the merge request after a promote, the promote still succeeds, and n8n shows a warning. n8n doesn't create a promotion review.

### Old reviews

GitLab removes the data n8n needs to show a merge request's changes 14 days after someone merges or closes the merge request. After that, the **Changes** tab of the review may not load.

## Related resources

- [Git-based promotion](./)
- [Generic Git](generic-git.md)
- [Review promotions](../review-promotions.md)
- [Set up environments](../set-up-environments.md)
