---
contentType: overview
nodeTitle: Installation and management
originalFilePath: integrations/community-nodes/installation/index.md
originalUrl: 'https://docs.n8n.io/integrations/community-nodes/installation'
url: 'https://docs.n8n.io/integrations/community-nodes/installation-and-management'
layout:
  description:
    visible: false
---

# Install and manage community nodes <a href="#install-and-manage-community-nodes" id="install-and-manage-community-nodes"></a>

There are four ways to install community nodes:

* Within n8n using the [nodes panel](install-verified-community-nodes.md) (for verified community nodes only).
* Within n8n [using the GUI](gui-installation.md): Use this method to install community nodes from the npm registry.
* [Manually from the command line](manual-installation.md): use this method to install community nodes from npm if your n8n instance doesn't support installation through the in-app GUI.
* [From environment variables](environment-variable-installation.md): use this method to bootstrap an instance with a fixed set of community packages, for example through a deployment pipeline.

{% hint style="info" %}
**Installing from npm only available on self-hosted instances**

Unverified community nodes aren't available on n8n cloud and require [self-hosting](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n) n8n.
{% endhint %}
