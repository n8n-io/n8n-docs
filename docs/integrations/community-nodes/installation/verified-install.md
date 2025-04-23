---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Install verified community nodes in the n8n app

/// note | Limited to n8n instance owners and admins
Only the n8n instance owner and admin users can install and manage verified community nodes. The instance owner is the person who sets up and manages user management. All members of an n8n instance can use already installed community nodes in their workflows.
///
## Install a community node

To install a verified community node:

1. Go to the **Canvas** and open the **nodes panel** (by clicking '+').
2. **Search** for the node that you are looking for.
3. If there is a matching verified community node, you will see a **More from the community** section at the bottom of the nodes panel.
    1. Click on the node you want to install. This takes you to a detailed view of the node, showing all the supported actions.
    2. Select 'install'. This will install the node for your instance and enable all members to insert it into their workflows.
4. You can now add the node to your workflows.

/// note | Enable installation of verified community nodes
Some users may not want to show verified community nodes in the nodes panel of their instances. On n8n cloud, instance owners can toggle this in the Cloud Admin Panel. Self-hosted users can use [environment variables](/hosting/configuration/environment-variables/nodes.md) to control the availability of this feature.
///

## Uninstall a community node

To uninstall a community node:

1. Go to **Settings** > **Community nodes**.
2. On the node you want to install, select **Options** <span class="inline-image">![Three dots options menu](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span>.
3. Select **Uninstall package**.
4. Select **Uninstall Package** in the confirmation modal.