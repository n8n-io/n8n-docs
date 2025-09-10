---
contentType: howto
---

# Install verified community nodes in the n8n app

/// note | Limited to n8n instance owners
Only the n8n instance owner can install and manage verified community nodes. The instance owner is the person who sets up and manages user management. All members of an n8n instance can use already installed community nodes in their workflows.

Admin accounts can also uninstall any community node, verified or unverified. This helps them remove problematic nodes that may affect the instance's health and functionality.
///

## Install a community node

To install a [verified community node](/integrations/creating-nodes/deploy/submit-community-nodes.md#submit-your-node-for-verification-by-n8n):

1. Go to the **Canvas** and open the **nodes panel** (either by selecting '+' or pressing ++tab++).
2. **Search** for the node that you're looking for. If there is a matching verified community node, you will see a **More from the community** section at the bottom of the nodes panel.
3. Select the node you want to install. This takes you to a detailed view of the node, showing all the supported actions.
4. Select **install**. This will install the node for your instance and enable all members to use it in their workflows.
5. You can now add the node to your workflows.

/// note | Enable installation of verified community nodes
Some users may not want to show verified community nodes in the nodes panel of their instances. On n8n cloud, instance owners can toggle this in the [Cloud Admin Panel](/manage-cloud/cloud-admin-dashboard.md). Self-hosted users can use [environment variables](/hosting/configuration/environment-variables/nodes.md) to control the availability of this feature.
///

## Uninstall a community node

To uninstall a community node:

1. Go to **Settings** > **Community nodes**.
2. On the node you want to install, select **Options** <span class="n8n-inline-image">![Three dots options menu](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span>.
3. Select **Uninstall package**.
4. Select **Uninstall Package** in the confirmation modal.
