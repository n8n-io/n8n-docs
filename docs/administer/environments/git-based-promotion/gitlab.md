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

To review promotions as merge requests, turn on **Open a merge request in GitLab** on the environment an instance promotes changes to. For how to review and approve them, see [Promotion reviews with GitLab](../promotion-reviews.md#promotion-reviews-with-gitlab).

## Related resources

- [Git-based promotion](./)
- [Generic Git](generic-git.md)
- [Promotion reviews](../promotion-reviews.md)
- [Set up environments](../set-up-environments.md)
