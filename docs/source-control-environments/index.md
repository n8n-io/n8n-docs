---
title: Source control and environments
description: Overview of source control and environments in n8n
---

# Source control and environments

!!! info "Feature availability"
	* Available on Enterprise.
	* You need access to the n8n instance owner account to set up source control, and to push work to Git.

n8n uses Git-based source control to support environments. Linking your n8n instances to a Git repository lets you create multiple n8n environments, backed by Git branches.

In this section:

* Understand:
	* [Understand environments in n8n](/source-control-environments/understand/environments/): The purpose of environments, and how they work in n8n.
	* [Source control patterns](/source-control/patterns/): The possible relationships between n8n instances and Git branches.
	* [Git and n8n](/source-control/git/): How n8n uses Git. 
* [Set up source control](/source-control/setup/): How to connect your n8n instance to Git.
* Using:
	* [Copy work between multi-branch environments](/source-control-environments/using/copy-work/): How to copy work between environments when using a multi-branch pattern.
* [Tutorial: Create environments with source control](/environments/create-environments/): An end-to-end tutorial, setting up environments using n8n's recommended configurations.
