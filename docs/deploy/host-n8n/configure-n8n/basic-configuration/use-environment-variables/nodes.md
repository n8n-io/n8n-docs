---
title: Nodes environment variables
description: >-
  Environment variables to configure nodes management and node-specific limits
  in self-hosted n8n.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: Nodes
originalFilePath: hosting/configuration/environment-variables/nodes.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/environment-variables/nodes'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/nodes
layout:
  description:
    visible: false
---

# Nodes environment variables <a href="#nodes-environment-variables" id="nodes-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/WWmlKw7GKa6dRtz6RUkf/" %}

This page lists the environment variables configuration options for managing [nodes](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#node-n8n) in n8n, including specifying which nodes to load or exclude, importing built-in or external modules in the Code node, enabling community nodes, and configuring node-specific limits.

## Nodes and community node settings <a href="#nodes-and-community-node-settings" id="nodes-and-community-node-settings"></a>

| Variable                                 | Type             | Default                       | Description                                                                                                                                                                                                                           |
|:-----------------------------------------|:-----------------|:------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `N8N_COMMUNITY_PACKAGES_AUTH_TOKEN`      | String           | -                             | Authentication token for a private npm registry. Use with `N8N_COMMUNITY_PACKAGES_REGISTRY` to authenticate requests when installing community nodes from a private registry. |
| `N8N_COMMUNITY_PACKAGES_ENABLED`         | Boolean          | `true`                        | Enables (true) or disables (false) the functionality to install and load community nodes. If set to false, neither verified nor unverified community packages will be available, regardless of their individual settings. |
| `N8N_COMMUNITY_PACKAGES_PREVENT_LOADING` | Boolean          | `false`                       | Prevents (true) or allows (false) loading installed community nodes on instance startup. Use this if a faulty node prevents the instance from starting.                                                                               |
| `N8N_COMMUNITY_PACKAGES_REGISTRY`        | String           | `https://registry.npmjs.org`  | NPM registry URL to pull community packages from (license required).                                                                                                                                                                  |
| `N8N_CUSTOM_EXTENSIONS`                  | String           | -                             | Specify the path to directories containing your custom nodes.                                                                                                                                                                         |
| `N8N_PYTHON_ENABLED`                     | Boolean          | `true`                        | Whether to enable Python execution on the Code node.                                                                                                                                                                                  |
| `N8N_UNVERIFIED_PACKAGES_ENABLED`        | Boolean          | `true`                        | When `N8N_COMMUNITY_PACKAGES_ENABLED` is true, this variable controls whether to enable the installation and use of unverified community nodes from an NPM registry (true) or not (false).                                        |
| `N8N_VERIFIED_PACKAGES_ENABLED`          | Boolean          | `true`                        | When `N8N_COMMUNITY_PACKAGES_ENABLED` is true, this variable controls whether to show verified community nodes in the nodes panel for installation and use (true) or to hide them (false).                                       |
| `NODE_FUNCTION_ALLOW_BUILTIN`            | String           | -                             | Permit users to import specific built-in modules in the Code node. Use * to allow all. n8n disables importing modules by default.                                                                                                   |
| `NODE_FUNCTION_ALLOW_EXTERNAL`           | String           | -                             | Permit users to import specific external modules (from `n8n/node_modules`) in the Code node. n8n disables importing modules by default.                                                                                             |
| `NODES_ERROR_TRIGGER_TYPE`               | String           | `n8n-nodes-base.errorTrigger` | Specify which node type to use as Error Trigger.                                                                                                                                                                                      |
| `NODES_EXCLUDE`                          | Array of strings | `[\"n8n-nodes-base.executeCommand\", \"n8n-nodes-base.localFileTrigger\"]`                             | Specify which nodes not to load. For example, to block nodes that can be a security risk if users aren't trustworthy: `NODES_EXCLUDE: "[\"n8n-nodes-base.executeCommand\", \"@n8n/n8n-nodes-langchain.lmChatDeepSeek\"]"`.  To enable all nodes, specify `NODES_EXCLUDE: "[]"`.                       |
| `NODES_INCLUDE`                          | Array of strings | -                             | Specify which nodes to load.                                                                                                                                                                                                          |

## Compression node settings <a href="#compression-node-settings" id="compression-node-settings"></a>

| Variable                                             | Type   | Default        | Description                                                                          |
|:-----------------------------------------------------|:-------|:---------------|:-------------------------------------------------------------------------------------|
| `N8N_COMPRESSION_NODE_MAX_DECOMPRESSED_SIZE_BYTES`   | Number | `2147483648`   | Maximum total decompressed output size in bytes. Default is 2 GiB.                   |
| `N8N_COMPRESSION_NODE_MAX_ZIP_ENTRIES`               | Number | `5000`         | Maximum number of entries allowed in a ZIP archive.                                   |

## Manage installed community packages <a href="#manage-installed-community-packages" id="manage-installed-community-packages"></a>

{% hint style="info" %}
**Available from n8n v2.21.0**


{% endhint %}

Pre-provision installed [community packages](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/community-nodes/installation-and-management) from environment variables. See [Manage instance settings using environment variables](../../manage-settings-using-environment-variables.md) for the `*_MANAGED_BY_ENV` pattern.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TjfmMoYY6Kb06aCUnGHG/" %}
