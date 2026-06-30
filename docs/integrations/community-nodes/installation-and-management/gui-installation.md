---
contentType: howto
nodeTitle: GUI installation
originalFilePath: integrations/community-nodes/installation/gui-install.md
originalUrl: https://docs.n8n.io/integrations/community-nodes/installation/gui-install
url: >-
  https://docs.n8n.io/integrations/community-nodes/installation-and-management/gui-installation
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# GUI installation

{% hint style="info" %}
**Owner and Admin users only**

Only users with an Owner or Admin role can install and manage community nodes from npm on a self-hosted n8n instance. The instance owner is the person who sets up and manages user management.
{% endhint %}

## Install a community node <a href="#install-a-community-node" id="install-a-community-node"></a>

To install a community node from npm:

1. Go to **Settings** > **Community Nodes**.
2. Select **Install**.
3. Find the node you want to install:
   1. Select **Browse**. n8n takes you to an npm search results page, showing all npm packages tagged with the keyword `n8n-community-node-package`.
   2. Browse the list of results. You can filter the results or add more keywords.
   3. Once you find the package you want, make a note of the package name. If you want to install a specific version, make a note of the version number as well.
   4. Return to n8n.
4.  Enter the npm package name, and optionally a version number or dist-tag. For example, consider a community node designed to access a weather API called "Storms." The package name is n8n-node-storms, and it has three major versions.<br>

    * To install the latest version of a package called n8n-node-weather: enter `n8n-nodes-storms` in **Enter npm package name**.
    * To install version 2.3: enter `n8n-node-storms@2.3` in **Enter npm package name**.
    * To install from a dist-tag such as `beta`: enter `n8n-node-storms@beta` in **Enter npm package name**. You can use any [npm dist-tag](https://docs.npmjs.com/cli/commands/npm-dist-tag) published by the package author, such as `beta`, `next`, or `latest`.

    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p><strong>Dist-tags resolve once at install time</strong></p><p>When you install a package using a dist-tag, n8n resolves the tag to its current version at that moment. Future updates don't follow the dist-tag. For example, if you install <code>n8n-node-storms@beta</code> and <code>beta</code> points to version <code>2.0.0-beta.1</code>, n8n installs that specific version. Later updates compare against the installed semver version, not the <code>beta</code> tag.</p></div>
5. Agree to the [risks](../risks.md) of using community nodes: select **I understand the risks of installing unverified code from a public source.**
6. Select **Install**. n8n installs the node, and returns to the **Community Nodes** list in **Settings**.

{% hint style="info" %}
**Nodes on the blocklist**

n8n maintains a blocklist of community nodes that it prevents you from installing. Refer to [n8n community node blocklist](../blocklist.md) for more information.
{% endhint %}

## Uninstall a community node <a href="#uninstall-a-community-node" id="uninstall-a-community-node"></a>

To uninstall a community node:

1. Go to **Settings** > **Community nodes**.
2. On the node you want to install, select **Options** <img src="../../.gitbook/assets/three-dot-options-menu (2).png" alt="Three dots options menu" data-size="line">.
3. Select **Uninstall package**.
4. Select **Uninstall Package** in the confirmation modal.

## Upgrade a community node <a href="#upgrade-a-community-node" id="upgrade-a-community-node"></a>

{% hint style="warning" %}
**Breaking changes in versions**

Node developers may introduce breaking changes in new versions of their nodes. A breaking change is an update that breaks previous functionality. Depending on the node versioning approach that a node developer chooses, upgrading to a version with a breaking change could cause all workflows using the node to break. Be careful when upgrading your nodes. If you find that an upgrade causes issues, you can [downgrade](gui-installation.md#downgrade-a-community-node).
{% endhint %}

\### Upgrade to the latest version

You can upgrade community nodes to the latest version from the node list in **Settings** > **community nodes**.

When a new version of a community node is available, n8n displays an **Update** button on the node. Click the button to upgrade to the latest version.

### Upgrade to a specific version <a href="#upgrade-to-a-specific-version" id="upgrade-to-a-specific-version"></a>

To upgrade to a specific version (a version other than the latest), uninstall the node, then reinstall it, making sure to specify the target version. Follow the [Installation](gui-installation.md#install-a-community-node) instructions for more guidance.

## Downgrade a community node <a href="#downgrade-a-community-node" id="downgrade-a-community-node"></a>

If there is a problem with a particular version of a community node, you may want to roll back to a previous version.

To do this, uninstall the community node, then reinstall it, targeting a specific node version. Follow the [Installation](gui-installation.md#install-a-community-node) instructions for more guidance.
