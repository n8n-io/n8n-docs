---
description: Connect Environments to any Git repository, including GitHub and Bitbucket, using an SSH deploy key or a username and access token.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Generic Git

The Generic Git provider connects an environment to any Git repository by URL, including repositories on GitHub and Bitbucket. It authenticates with an SSH key or with a username and access token.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## What Generic Git supports

| Feature | Supported |
|---|---|
| Authentication | SSH key, or username and access token |
| Pick repositories and branches from a list | No. You enter the repository URL and branch. |
| Push each promote to a feature branch | Yes |
| Promotion reviews | No. Someone merges the feature branch on the Git host manually. |

## Connect with an SSH key

1. In the **Connect Generic Git** dialog, enter a **Name** and set **Authentication** to **SSH key**.
2. Choose the **SSH key type**. n8n generates the key pair.
3. Select **Continue**, then **Copy deploy key**.
4. On your Git host, add the key to the repository as a deploy key with write access.

Bitbucket Cloud only offers read-only repository access keys, so connect to Bitbucket Cloud with a username and access token, or add the deploy key to a Bitbucket account instead of the repository. An account key gives n8n access to every repository that account can access, so use a dedicated account.

Use an SSH repository URL that starts with `ssh://`, such as `ssh://git@github.com/acme/n8n.git`.

To replace the key, edit the provider and select **Generate a new key**. Add the new key to your Git host, then remove the old key there.

## Connect with a username and access token

1. In the **Connect Generic Git** dialog, enter a **Name** and set **Authentication** to **Username and password**.
2. Enter the **Username** and, in **Password or access token**, an access token with write access to the repository.
3. Select **Continue**.

Use an HTTPS repository URL without credentials in it, such as `https://github.com/acme/n8n.git`.

### What access the token needs

Generic Git only runs Git commands. It doesn't call your Git host's API. The token needs read and write access to the repository's code. If you push each promote to a feature branch, it also needs permission to create branches.

Common Git hosts:

| Git host | Username | Token |
|---|---|---|
| GitHub | Your GitHub username | Fine-grained personal access token for the repository with **Contents**: **Read and write**. This also covers creating branches. |
| GitLab | Your GitLab username | Personal, group, or project access token with the `write_repository` scope. For a fine-grained personal access token, add **Code**: **Download**, **Push**, and **Branch**: **Create**. |
| Bitbucket Cloud | Your Bitbucket username | API token with the `read:repository:bitbucket` and `write:repository:bitbucket` scopes. |

You can't change the authentication method of a provider. To switch, create another provider.

## Finish the environment

After you connect the provider, finish setting up the environment that uses it: enter the **Environment name**, **Repository URL**, and **Branch**. For an environment that an instance promotes changes to, also choose whether to push each promote to a feature branch. See [Set up environments](../set-up-environments.md#add-an-environment).

## Related resources

- [Git-based promotion](./)
- [GitLab](gitlab.md)
- [Set up environments](../set-up-environments.md)
