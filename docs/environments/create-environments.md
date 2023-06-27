---
title: Tutorial - Create environments with source control
description: How to use n8n's source control feature to create environments.
---

# Tutorial: Create environments with source control

!!! info "Feature availability"
	* Source control is available on Enterprise plans.
	* You need access to the n8n instance owner account to set up source control, and to push work to Git. All users can pull.

n8n has built its environments feature on top of Git, a version control software. You link an n8n instance to a Git branch, and use a push-pull pattern to move work between environments. This tutorial walks through the process of setting up environments end-to-end.

You should have some understanding of environments and Git. If you need more information on these topics, refer to:

* [Understand environments in n8n](/environments/understand/): the purpose of environments, and how they work in n8n. 
* [Git and n8n](/source-control/git/): Git concepts and source control in n8n.

## Choose your source control pattern

Before setting up source control and environments, you need to plan your environments, and how they relate to Git branches. n8n supports four [Source control patterns](/source-control/).

## Connect your n8n instances to Git

## Manage variables with a GitHub Action

[TODO: note that the same action can also automate pushing to prod]

## Push work from development

## Pull work to production

## Next steps
