---
description: Choose how your n8n instances, environments, and Git branches connect before you set up Environments.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Plan your environments

Decide which instances promote changes, which instances apply them, and which repository and branch stand for each environment before you set anything up.

{% hint style="info" %}
**Preview status**

Environments are in Preview and may change in future releases. Try them on test instances before you set them up for your production instances.
{% endhint %}

## How instances and environments relate

Each instance can have two environments, one per direction:

- The environment the instance promotes changes to.
- The environment the instance applies changes from.

Name each environment after the stage it stands for, such as Staging or Production. With [Git-based promotion](git-based-promotion/), each environment is a repository and branch. The instance that promotes to Production and the instance that applies from Production both point to the same repository and branch.

## Development and production

![The development instance promotes to the Production environment, and the production instance applies from it](../.gitbook/assets/environments-dev-prod.png)

Use this pattern when one team builds on one instance and runs workflows on another.

| Instance | Promote changes to | Apply changes from |
|---|---|---|
| Development | Production: repository `acme/n8n`, branch `main` | None |
| Production | None | Production: repository `acme/n8n`, branch `main` |

## Development, staging, and production

![The staging instance applies from the Staging environment and promotes to the Production environment](../.gitbook/assets/environments-dev-staging-prod.png)

Use this pattern when you test changes on a staging instance before they reach production. The staging instance has two environments: it applies changes from Staging and promotes changes to Production.

| Instance | Promote changes to | Apply changes from |
|---|---|---|
| Development | Staging: branch `staging` | None |
| Staging | Production: branch `main` | Staging: branch `staging` |
| Production | None | Production: branch `main` |

Staging and Production can be two branches in one repository, as in the table, or branches in two repositories. Use two repositories if different teams own staging and production, or if they need different access rules on your Git host.

## Review changes before production

To make sure production only applies changes someone reviewed, set the environment that promotes to Production to push each promote to a new branch. n8n then never commits directly to the branch production applies from:

- With GitLab, n8n also opens a merge request, which you approve in n8n as a [promotion review](review-promotions.md).
- With other Git providers, someone merges the new branch on the Git host.

## Protect the instances that only apply

Turn on **Protected instance** on instances that only apply changes, such as production. Users then can't edit workflows there, so the instance stays in line with its environment. See [Set up environments](set-up-environments.md#protect-an-instance).

## Related resources

- [Environments](./)
- [Set up environments](set-up-environments.md)
- [Git-based promotion](git-based-promotion/)
