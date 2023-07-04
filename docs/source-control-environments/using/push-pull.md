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


## Send your work to Git

!!! note "Restricted to instance owners"
	Ordinary users can't send work to Git.

--8<-- "_snippets/source-control-environments/push.md"

## What gets committed

You can programmatically [Manage variables](/source-control-environments/using/manage-variables/) using the n8n API.
