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

The GitLab provider connects an environment to a repository on GitLab.com or a self-managed GitLab instance. It lists your repositories and branches, and supports promotion reviews based on merge requests that you review visually in n8n.

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
| Promotion reviews | Yes: GitLab merge requests synced to n8n, with a visual diff of the changes on the **Reviews** page |

## Create an access token

Create one of these tokens in GitLab:

- A personal, group, or project access token with the `api` and `write_repository` scopes. n8n recommends a group access token.
- A fine-grained personal access token, if your GitLab version supports them, with these permissions on the repository's project or group:

| Resource | Permissions | n8n uses it to |
|---|---|---|
| User | Read | Check the token |
| Project | Read | List repositories |
| Branch | Read | List branches |
| Code | Download, Push | Read from and push to the repository |
| Merge Request | Create, Read, Approve, Merge | Open, approve, and merge promotion reviews |
| Work Item | Create | Add the approval note to the merge request |

The token's user needs at least the Developer role on the repository. n8n only lists repositories where the user has that role. To merge promotion reviews into a protected branch, the user also needs a role that the branch protection allows to merge, which is Maintainer by default.

## Set up the GitLab provider

1. In the **Connect GitLab** dialog, enter a **Name**, the **GitLab base URL**, such as `https://gitlab.com` or `https://gitlab.example.com`, and the **Access token**.
2. Select **Continue**.
3. In the environment settings, pick the **Repository** and **Branch** from the lists.

For a self-managed GitLab instance on an internal network or with a private certificate authority, see [Git-based promotion](README.md#self-hosted-n8n).

## Promotion reviews with merge requests

To review promotions as merge requests, turn on **Open a merge request in GitLab** on the environment an instance promotes changes to. For how to review and approve them, see [Promotion reviews with GitLab](../promotion-reviews.md#promotion-reviews-with-gitlab).

## Related resources

- [Git-based promotion](./)
- [Generic Git](generic-git.md)
- [Promotion reviews](../promotion-reviews.md)
- [Set up environments](../set-up-environments.md)
