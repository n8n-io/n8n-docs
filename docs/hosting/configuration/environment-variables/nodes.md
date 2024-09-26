---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Nodes environment variables
description: Environment variable to configure nodes management in self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Nodes environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

This page lists the environment variables configuration options for managing nodes in n8n, including specifying which nodes to load or exclude, importing built-in or external modules in the Code node, and enabling community nodes.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `NODES_INCLUDE` | Array of strings | - | Specify which nodes to load. |
| `NODES_EXCLUDE` | Array of strings | - | Specify which nodes not to load. For example, to block nodes that can be a security risk if users aren't trustworthy: `NODES_EXCLUDE: "[\"n8n-nodes-base.executeCommand\", \"n8n-nodes-base.readWriteFile\"]"` |
| `NODE_FUNCTION_ALLOW_BUILTIN` | String | - | Permit users to import specific built-in modules in the Code node. Use * to allow all. n8n disables importing modules by default. |
| `NODE_FUNCTION_ALLOW_EXTERNAL` | String | - | Permit users to import specific external modules (from `n8n/node_modules`) in the Code node. n8n disables importing modules by default. |
| `NODES_ERROR_TRIGGER_TYPE` | String | `n8n-nodes-base.errorTrigger` | Specify which node type to use as Error Trigger. |
| `N8N_CUSTOM_EXTENSIONS` | String | - | Specify the path to directories containing your custom nodes. |
| `N8N_COMMUNITY_PACKAGES_ENABLED` | Boolean | `true` | Enables (true) or disables (false) community nodes. |
| `N8N_COMMUNITY_PACKAGES_REGISTRY` | String | `https://registry.npmjs.org` | NPM registry URL to pull community packages from (license required). |
