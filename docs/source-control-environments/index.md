---
title: Source control and environments
description: Overview of source control and environments in n8n
contentType: overview
hide:
  - toc
---

# Source control and environments

--8<-- "_snippets/source-control-environments/feature-availability.md"

n8n uses Git-based source control to support environments. Linking your n8n instances to a Git repository lets you create multiple n8n environments, backed by Git branches.

In this section:

* [Understand](/source-control-environments/understand/index.md):
	* [Environments in n8n](/source-control-environments/understand/environments.md): The purpose of environments, and how they work in n8n.
	* [Git and n8n](/source-control-environments/understand/git.md): How n8n uses Git. 
	* [Branch patterns](/source-control-environments/understand/patterns.md): The possible relationships between n8n instances and Git branches.
* [Set up source control for environments](/source-control-environments/setup.md): How to connect your n8n instance to Git.
* [Using](/source-control-environments/using/index.md):
	* [Push and pull](/source-control-environments/using/push-pull.md): Send work to Git, and fetch work from Git to your instance.
	* [Copy work between environments](/source-control-environments/using/copy-work.md): How to copy work between different n8n instances.
* [Tutorial: Create environments with source control](/source-control-environments/create-environments.md): An end-to-end tutorial, setting up environments using n8n's recommended configurations.

Related sections:

* [Variables](/code/variables.md): reusable values.
* [External secrets](/external-secrets.md): manage [credentials](/glossary.md#credential-n8n) with an external secrets vault.
