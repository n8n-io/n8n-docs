---
description: How Environments use Git repositories and branches, which Git providers n8n supports, and how to troubleshoot Git connections.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Git-based promotion

With Git-based promotion, changes travel between n8n instances through a Git repository. Each environment is a repository and branch.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## What n8n writes to the repository

n8n stores promoted content in an `n8n/` folder at the root of the repository. The folder holds an [n8n package](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/n8n-packages), which promote exports and apply imports with fixed settings chosen for promotion. n8n doesn't change anything outside that folder, so the repository can hold other files, such as CI configuration.

## Direct commits and feature branches

An environment that an instance promotes changes to does one of the following:

- Commits directly to its branch.
- Pushes each promote to a feature branch named `n8n-promotion/<timestamp>`, based on its branch. n8n never force-pushes. The base branch must already exist on the Git host.

Instances that apply from the environment read its branch, so they see changes from a feature branch only after someone merges it.

## Providers

A provider holds the details n8n uses to connect and authenticate to your Git host. Several environments on an instance can use the same provider. The provider type decides which features you get:

| Feature | Generic Git | GitLab |
|---|---|---|
| Authentication | SSH key, or username and access token | Access token |
| Pick repositories and branches from a list | No | Yes |
| Promotion reviews | No | Yes, as merge requests |

GitHub, Bitbucket, and other Git hosts work through Generic Git, without repository lists or promotion reviews.

## Self-hosted n8n

- Each main instance keeps its own Git copy of each environment in `<n8n-user-folder>/promotions/environments/`.
- If your Git host is on an internal network, allow it in [SSRF protection](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/enable-ssrf-protection) with `N8N_SSRF_ALLOWED_HOSTNAMES` or `N8N_SSRF_ALLOWED_IP_RANGES`.
- If your Git host uses a certificate from a private certificate authority, set `GIT_SSL_CAINFO` or `GIT_SSL_CAPATH` for Git, and [configure custom certificate authorities](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/configuration-examples/configure-custom-ssl-certificate-authorities) for API calls.
- To get detailed logs, set `N8N_LOG_SCOPES=promotions`.

## Troubleshooting

### Could not complete the Git operation

n8n hides the Git error details because they can contain secrets. Check:

- The authentication details in the provider are correct and haven't expired.
- For SSH, the deploy key has write access.
- The branch exists on the Git host.
- The repository URL has the right format for the authentication type. See [Generic Git](generic-git.md).

## In this section

- [Generic Git](generic-git.md): connect any Git repository over SSH or HTTPS.
- [GitLab](gitlab.md): connect GitLab with an access token, and review promotions as merge requests.

## Related resources

- [Environments](../)
- [Plan your environments](../plan-your-environments.md)
- [Set up environments](../set-up-environments.md)
- [Promote changes](../promote-changes.md)
- [Apply changes](../apply-changes.md)
- [Promotion reviews](../promotion-reviews.md)
- [Known limitations](../known-limitations.md)
- [Switch from Environments (Classic)](../switch-from-environments-classic.md)
