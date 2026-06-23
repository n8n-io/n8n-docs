---
contentType: howto
nodeTitle: Install verified community nodes
originalFilePath: integrations/community-nodes/installation/verified-install.md
originalUrl: 'https://docs.n8n.io/integrations/community-nodes/installation/verified-install'
url: >-
  https://docs.n8n.io/integrations/community-nodes/installation-and-management/install-verified-community-nodes
layout:
  description:
    visible: false
---

# Install verified community nodes in the n8n app <a href="#install-verified-community-nodes-in-the-n8n-app" id="install-verified-community-nodes-in-the-n8n-app"></a>

{% hint style="info" %}
**Limited to n8n instance owners and admins**

The n8n instance owner and admin accounts can install and manage verified community nodes. The instance owner is the person who sets up and manages user management. All members of an n8n instance can use already installed community nodes in their workflows.
{% endhint %}

## Install a community node <a href="#install-a-community-node" id="install-a-community-node"></a>

To install a [verified community node](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/deploy-your-node/submit-community-nodes#submit-your-node-for-verification-by-n8n):

1. Go to the **Canvas** and open the **nodes panel** (either by selecting '+' or pressing ++n++).
2. **Search** for the node that you're looking for. If there is a matching verified community node, you will see a **More from the community** section at the bottom of the nodes panel.
3. Select the node you want to install. This takes you to a detailed view of the node, showing all the supported actions.
4. Select **install**. This will install the node for your instance and enable all members to use it in their workflows.
5. You can now add the node to your workflows.

{% hint style="info" %}
**Enable installation of verified community nodes**

Some users may not want to show verified community nodes in the nodes panel of their instances. On n8n cloud, instance owners can toggle this in the [Cloud Admin Panel](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/use-the-admin-dashboard). Self-hosted users can use [environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/nodes) to control the availability of this feature.
{% endhint %}

## Uninstall a community node <a href="#uninstall-a-community-node" id="uninstall-a-community-node"></a>

To uninstall a community node:

1. Go to **Settings** > **Community nodes**.
2. On the node you want to install, select **Options** <img src="../../.gitbook/assets/three-dot-options-menu.png" alt="Three dots options menu" data-size="line">.
3. Select **Uninstall package**.
4. Select **Uninstall Package** in the confirmation modal.
