# Install, upgrade, and downgrade community nodes

!!! note "Limited to n8n instance owners"
    Only the n8n instance owner can install and manage community nodes. The instance owner is the person who sets up and manages user management. If you haven't set up user management, the instance owner is the default user.

## Install a community node

To install a community node:

1. Go to **Settings** > **Community Nodes**.
2. Select **Install**.
3. Find the node you want to install:
    1. Select **Browse**. n8n takes you to an npm search results page, showing all npm packages tagged with the keyword `n8n-community-node-package`.
    2. Browse the list of results. You can filter the results or add more keywords.
    3. Once you find the package you want, make a note of the package name. If you want to install a specific version, make a note of the version number as well.
    4. Return to n8n.
4. Enter the npm package name, and version number if required. For example, consider a community node designed to access a weather API called "Storms." The package name is n8n-node-storms, and it has three major versions.
    * To install the latest version of a package called n8n-node-weather: enter `n8n-nodes-storms` in **Enter npm package name**.
    * Install version 2.3: enter `n8n-node-storms@2.3` in **Enter npm package name**.
    <!-- vale off -->
5. Agree to the [risks](/integrations/community-nodes/risks/) of using community nodes: select **I understand the risks of installing unverified code from a public source.**
    <!-- vale on -->
6. Select **Install**. n8n installs the node, and returns to the **Community Nodes** list in **Settings**.

!!! note "Nodes on the blocklist"
    n8n maintains a blocklist of community nodes that it prevents you from installing. Refer to [n8n community node blocklist](/integrations/community-nodes/blocklist/) for more information.

## Uninstall a community node

To uninstall a community node:

1. Go to **Settings** > **Community nodes**.
2. On the node you want to install, select **Options** <span class="inline-image">![Three dots options menu](/_images/common-icons/three-dot-options-menu.png)</span>.
3. Select **Uninstall package**.
4. Select **Uninstall Package** in the confirmation modal.

## Upgrade a community node

!!! warning "Breaking changes in versions"
    Node developers may introduce breaking changes in new versions of their nodes. A breaking change is an update that breaks previous functionality. Depending on the node versioning approach that a node developer chooses, upgrading to a version with a breaking change could cause all workflows using the node to break. Be careful when upgrading your nodes. If you find that an upgrade causes issues, you can [downgrade](#downgrade-a-community-node).

### Upgrade to the latest version

You can upgrade community nodes to the latest version from the node list in **Settings** > **community nodes**.

When a new version of a community node is available, n8n displays an **Update** button on the node. Click the button to upgrade to the latest version.

### Upgrade to a specific version

To upgrade to a specific version (a version other than the latest), uninstall the node, then reinstall it, making sure to specify the target version. Follow the [Installation](#install-a-community-node) instructions for more guidance.

## Downgrade a community node

If there is a problem with a particular version of a community node, you may want to roll back to a previous version.

To do this, uninstall the community node, then reinstall it, targeting a specific node version. Follow the [Installation](#install-a-community-node) instructions for more guidance.

