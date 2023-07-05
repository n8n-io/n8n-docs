---
title: Push and pull
description: Send work to Git, and fetch work from Git to your instance.
---

# Push and pull

If your n8n instance connects to a Git repository, you need to keep your work in sync with Git.

This document assumes some familiarity with Git concepts and terminology. Refer to [Git and n8n](/source-control-environments/understand/git/) for an introduction to how n8n works with Git.

--8<-- "_snippets/source-control-environments/one-direction.md"

## Fetch other people's work

!!! note "Restricted to instance owners"
	Ordinary users can't fetch work from Git.

To pull work from Git, select **Pull** <span class="inline-image">![Pull icon](/_images/source-control-environments/pull-icon.png)</span> in the main menu.

--8<-- "_snippets/source-control-environments/push-pull-menu-state.md"

n8n may display a warning about overriding local changes. Select **Pull and override** to override your local work with the content in Git.

### Workflow owner may change on pull

When you pull from Git to an n8n instance, the workflow owner may change. If the same owner is available on both instances, the owner remains the same. If the original owner isn't on the new instance, n8n sets the instance owner as the workflow owner.

### Pulling may cause brief service interruption

If you pull changes to an active workflow, n8n sets the workflow to inactive while pulling, then reactivates it. This may result in a few seconds of downtime for the workflow.

## Send your work to Git

!!! note "Restricted to instance owners"
	Ordinary users can't send work to Git.

--8<-- "_snippets/source-control-environments/push.md"

## What gets committed

n8n commits the following to Git:

* Workflows, including their tags and the email address of the workflow owner. You can choose which workflows to push.
* Credential stubs (ID, name, type)
* Variable stubs (ID and name)

You can programmatically [Manage variables](/source-control-environments/using/manage-variables/) using the n8n API.

!!! note "Coming soon: credential support with secret managers"
	n8n is working on support for external secret managers to handle credentials. Once this feature is complete, n8n will support linking the secret manager to multiple instances.

## Merge behaviors and conflicts

n8n's implementation of source control is opinionated. It resolves merge conflicts for credentials and variables automatically. Merge conflicts can occur for workflows.

### Workflows

You can get merge conflicts with workflows if:

* Two instances push to the same branch.
* People make changes directly in the Git repository.

n8n doesn't automatically merge workflows. If it detects a conflict, n8n warns you. You can then decide whether to proceed. On pushing, you can choose not to include the workflow with the conflict. On pull, you can choose to overwrite your local changes, or to cancel and push your local changes before pulling again.

To avoid merge conflicts:

* Design your source control setup so that workflows flow in one direction. For example, make edits on a development instance, push to Git, then pull to production. Don't make edits on the production instance and push them.
* Don't push all workflows. Select the ones you need.
* Be cautious about manually editing files in the Git repository.

### Credentials and variables

Credentials and variables can't have merge issues, as n8n chooses the version to keep.

On pull:

* If the variable or credential doesn't exist, n8n creates it.
* If the variable or credential already exists, n8n doesn't update it, unless:
	* You set the value of a variable using the API or externally. The new value overwrites any existing value.
	* The credential name has changed. n8n uses the version in Git.

On push:

* n8n overwrites the entire variables file.
* If a credential already exists, n8n overwrites it with the changes, but doesn't apply these changes to existing credentials on pull.

