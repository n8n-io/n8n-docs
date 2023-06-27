---
title: Set up source control
description: Link n8n to your Git provider.
---

# Set up source control

Link a Git repository to an n8n instance and configure your source control.

## Prerequisites

To use source control with n8n, you need a Git repository that allows SSH access. 

This document assumes you are familiar with Git and your Git provider.

## Step 1: Set up your repository and branches

For a new setup:

1. Create a new repository for use with n8n. 
1. Create the branches you need. For example, if you plan to have different environments for test and production, set up a branch for each.

To help decide what branches you need for your use case, refer to [Understand source control in n8n | Source control patterns](/source-control/understand#source-control-patterns).

## Step 2: Configure Git in n8n

1. In n8n, go to **Settings** > **Source Control**.
1. Enter the details for your Git repository:
	1. **Git repository URL**: the SSH URL for your repository.
	1. **Commit author name**: the username for the Git account that owns the repository.
	1. **Commit author email**: the email address for the Git account that owns the repository.
1. Copy the SSH key.

## Step 3: Set up Git access

Set up SSH access by creating a deploy key for the repository using the SSH key from n8n. The key must have write access. 

The steps depend on your Git provider. Help links for common providers:

* [GitHub | Managing deploy keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys){:target=_blank .external-link}
* [GitLab | Deploy keys](https://docs.gitlab.com/ee/user/project/deploy_keys/){:target=_blank .external-link}

## Step 4: Connect n8n and configure your instance

1. In **Settings** > **Source Control** in n8n, select **Connect**. n8n connects to your Git repository.
1. Under **Instance settings**, choose which branch you want to use for the current n8n instance.
1. **Optional**: select **Read-only instance** to prevent users editing workflows in this instance. This is useful for protecting production instances.
1. **Optional**: choose a custom color for the instance. This will appear in the menu next to the source control push and pull buttons. It helps indicate to users which instance they're in.
1. Select **Save settings**.

