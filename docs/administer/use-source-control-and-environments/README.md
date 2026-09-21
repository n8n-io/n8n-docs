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

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/2T2SmMUgiLyck7FDDwRD/" %}

n8n uses Git-based source control to support environments. Linking your n8n instances to a Git repository lets you create multiple n8n environments, backed by Git branches.

## In this section

* [Understand source control](understand-source-control.md): how source control and environments work in n8n.
* [Work with environments](work-with-environments.md): the purpose of environments, and how they work in n8n.
* [Use Git in n8n](use-git-in-n8n.md): how n8n uses Git.
* [Choose branching patterns](choose-branching-patterns.md): the possible relationships between n8n instances and Git branches.
* [Set up source control](set-up-source-control.md): how to connect your n8n instance to Git.
* [Push and pull changes](push-and-pull-changes.md): send work to Git, and fetch work from Git to your instance.
* [Compare versions](compare-versions.md): use workflow diffs to compare local and remote changes.
* [Move work between environments](move-work-between-environments.md): how to copy work between different n8n instances.
* [Use environments programmatically with the public API](use-environments-via-api.md): preview, push, and pull source control changes using the n8n public API.
* [Tutorial: Create environments with source control](tutorial-create-environments-with-source-control.md): an end-to-end tutorial, setting up environments using n8n's recommended configurations.

## Related sections

* [Variables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n/define-custom-variables): reusable values.
* [External secrets](../manage-credentials/use-external-secret-stores.md): manage credentials[^1] with an external secrets vault.

[^1]: In n8n, credentials store authentication information to connect with specific apps and services. After creating credentials with your authentication information (username and password, API key, OAuth secrets, etc.), you can use the associated app node to interact with the service.
