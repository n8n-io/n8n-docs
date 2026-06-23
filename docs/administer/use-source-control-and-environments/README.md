---
title: Source control and environments
description: Overview of source control and environments in n8n
contentType: overview
hide:
  - toc
nodeTitle: Use source control and environments
originalFilePath: source-control-environments/index.md
originalUrl: 'https://docs.n8n.io/source-control-environments'
url: 'https://docs.n8n.io/administer/'
layout:
  description:
    visible: false
---

# Source control and environments <a href="#source-control-and-environments" id="source-control-and-environments"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Tf19KXxolDkcfArIYg5K/" %}

n8n uses Git-based source control to support environments. Linking your n8n instances to a Git repository lets you create multiple n8n environments, backed by Git branches.

In this section:

* [Understand](understand-source-control.md):
	* [Environments in n8n](work-with-environments.md): The purpose of environments, and how they work in n8n.
	* [Git and n8n](use-git-in-n8n.md): How n8n uses Git. 
	* [Branch patterns](choose-branching-patterns.md): The possible relationships between n8n instances and Git branches.
* [Set up source control for environments](set-up-source-control.md): How to connect your n8n instance to Git.
* [Using](/source-control-environments/using/index.md):
	* [Push and pull](push-and-pull-changes.md): Send work to Git, and fetch work from Git to your instance.
	* [Copy work between environments](move-work-between-environments.md): How to copy work between different n8n instances.
* [Tutorial: Create environments with source control](tutorial-create-environments-with-source-control.md): An end-to-end tutorial, setting up environments using n8n's recommended configurations.

Related sections:

* [Variables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n/define-custom-variables): reusable values.
* [External secrets](../manage-credentials/use-external-secret-stores.md): manage [credentials](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#credential-n8n) with an external secrets vault.
