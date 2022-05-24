# Install, upgrade, and downgrade Community Nodes

!!! note "Limited to n8n instance owners"
    Only the n8n instance owner can install and manage Community Nodes. The instance owner is the person who sets up and manages user management. If you haven't set up user management, the instance owner is the default user.

## Install a Community Node

To install a Community Node:

1. Go to **Settings** > **Community Nodes**.
2. Select **Install a Community Node**.
3. Find the node you want to install:
    1. Select **Browse**. n8n takes you to an npm search results page, showing all npm packages tagged with the keyword `n8n-community-node-package`.
    2. Browse the list of results. You can filter the results or add more keywords.
    3. Once you find the package you want, make a note of the package name. If you want to install a specific version, make a note of the version number as well.
    4. Return to n8n.
4. Enter the npm package name, and version number if required. For example, consider a Community Node designed to access a weather API called "Stormz." The package is named n8n-node-stormz, and has three major versions.
    * To install the latest version of a package called n8n-node-weather: enter `n8n-node-stormz` in **Enter npm package name**.
    * Install version 2.3: enter `n8n-node-stormz@2.3` in **Enter npm package name**.
5. Agree to the [risks](/integrations/community-nodes/risks/) of using Community Nodes: select **I understand the risks of installing unverified code from a public source.**
6. Select **Install**. n8n installs the node, and returns to the **Community Nodes** list in **Settings**.

!!! note "Nodes on the blocklist"
    n8n maintains a blocklist of Community Nodes that it prevents you from installing. Refer to [n8n Community Node blocklist](/integrations/community-nodes/blocklist/) for more information.

## Uninstall a Community Node

To uninstall a Community Node:

1. Go to **Settings** > **Community Nodes**.
2. On the node you want to install, select **Options** [TODO: add image of icon].
3. Select **Uninstall package**.

## Upgrade a Community Node

### Upgrade to the latest version

You can upgrade Community Nodes to the latest version from the node list in **Settings** > **Community Nodes**.

When a new version of a Community Node is available, n8n displays an **Update** button on the node. Click the button to upgrade to the latest version.

### Upgrade to a specific version

To upgrade to a specific version (a version other than the latest), uninstall the node, then reinstall it, making sure to specify the target version. Follow the [Installation](#install-a-community-node) instructions for more guidance.

## Downgrade a Community Node

If there is a problem with a particular version of a Community Node, you may want to roll back to a previous version.

To do this, uninstall the Community Node, then reinstall it, targeting a specific node version. Follow the [Installation](#install-a-community-node) instructions for more guidance.

