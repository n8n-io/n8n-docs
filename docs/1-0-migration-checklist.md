---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: n8n v1.0 migration guide
description: What's new in version 1
contentType: reference
---

# n8n v1.0 migration guide

This document provides a summary of what you should be aware of before updating to version 1.0 of n8n.

The release of n8n 1.0 marks a milestone in n8n's journey to make n8n available for demanding production environments. Version 1.0 represents the hard work invested over the last four years to make n8n the most accessible, powerful, and versatile automation tool. n8n 1.0 is now ready for use in production.

## New features

### Python support in the Code node

Although JavaScript remains the default language, you can now also select Python as an option in the [Code node](/code/code-node.md) and even make use of [many Python modules](https://pyodide.org/en/stable/usage/packages-in-pyodide.html#packages-in-pyodide). Note that Python is unavailable in Code nodes added to a workflow before v1.0.

[PR #4295](https://github.com/n8n-io/n8n/pull/4295), [PR #6209](https://github.com/n8n-io/n8n/pull/6209)

### Execution order

n8n 1.0 introduces a new execution order for multi-branch workflows:

In multi-branch workflows, n8n needs to determine the order in which to execute nodes on branches. Previously, n8n executed the first node of each branch, then the second of each branch, and so on (breadth-first). The new execution order ensures that each branch executes completely before starting the next one (depth-first). Branches execute based on their position on the canvas, from top to bottom. If two branches are at the same height, the leftmost one executes first.

n8n used to execute multi-input nodes as long as they received data on their first input. Nodes connected to the second input of multi-input nodes automatically executed regardless of whether they received data. The new execution order introduced in n8n 1.0 simplifies this behavior: Nodes are now executed only when they receive data, and multi-input nodes require data on at least one of their inputs to execute.

Your existing workflows will use the legacy order, while new workflows will execute using the v1 order. You can configure the execution order for each workflow in [workflow settings](/workflows/settings.md).

[PR #4238](https://github.com/n8n-io/n8n/pull/4238), [PR #6246](https://github.com/n8n-io/n8n/pull/6246), [PR #6507](https://github.com/n8n-io/n8n/pull/6507)

## Deprecations

### MySQL and MariaDB

n8n has deprecated support for MySQL and MariaDB as storage backends for n8n. These database systems are used by only a few users, yet they require continuous development and maintenance efforts. n8n recommends migrating to PostgreSQL for better compatibility and long-term support.

[PR #6189](https://github.com/n8n-io/n8n/pull/6189)

### EXECUTIONS_PROCESS and "own" mode

Previously, you could use the `EXECUTIONS_PROCESS` environment variable to specify whether executions should run in the `main` process or in their `own` processes. This option and `own` mode are now deprecated and will be removed in a future version of n8n. This is because it led to increased code complexity while offering marginal benefits. Starting from n8n 1.0, `main` will be the new default.

Note that executions start much faster in `main` mode than in `own` mode. However, if a workflow consumes more memory than is available, it might crash the entire n8n application instead of just the worker thread. To mitigate this, make sure to allocate enough system resources or configure [queue mode](/hosting/scaling/queue-mode.md) to distribute executions among multiple workers.

[PR #6196](https://github.com/n8n-io/n8n/pull/6196)

## Breaking changes

### Docker

#### Permissions change

When using Docker-based deployments, the n8n process is now run by the user `node` instead of `root`. This change increases security.

If permission errors appear in your n8n container logs when starting n8n, you may need to update the permissions by executing the following command on the Docker host:

```bash
docker run --rm -it --user root -v ~/.n8n:/home/node/.n8n --entrypoint chown n8nio/base:16 -R node:node /home/node/.n8n
```

#### Image removal

We've removed the Debian and RHEL images. If you were using these you need to change the image you use. This shouldn't result in any errors unless you were making a custom image based on one of those images.

#### Entrypoint change

The entrypoint for the container has changed and you no longer need to specify the n8n command. If you were previously running `n8n worker --concurrency=5` it's now `worker --concurrency=5`

[PR #6365](https://github.com/n8n-io/n8n/pull/6365)

### Workflow failures due to expression errors

Workflow executions may fail due to syntax or runtime errors in expressions, such as those that reference non-existent nodes. While expressions already throw errors on the frontend, this change ensures that n8n also throws errors on the backend, where they were previously silently ignored. To receive notifications of failing workflows, n8n recommends setting up an "error workflow" under workflow settings.

[PR #6352](https://github.com/n8n-io/n8n/pull/6352)

### Mandatory owner account

This change makes [User Management](/user-management/index.md) mandatory and removes support for other authentication methods, such as BasicAuth and External JWT. Note that the number of permitted users on [n8n.cloud](https://n8n.cloud/) or custom plans still varies depending on your subscription.

[PR #6362](https://github.com/n8n-io/n8n/pull/6362)

### Directory for installing custom nodes

n8n will no longer load custom nodes from its global `node_modules` directory. Instead, you must install (or link) them to `~/.n8n/custom` (or a directory defined by `N8N_CUSTOM_EXTENSIONS`). Custom nodes that are npm packages will be located in `~/.n8n/nodes`.
If you have custom nodes that were linked using `npm link` into the global `node_modules` directory, you need to link them again, into `~/.n8n/nodes` instead.

[PR #6396](https://github.com/n8n-io/n8n/pull/6396)

### WebSockets

The `N8N_PUSH_BACKEND` environment variable can be used to configure one of two available methods for pushing updates to the user interface: `sse` and `websocket`. Starting with n8n 1.0, `websocket` is the default method.

[PR #6196](https://github.com/n8n-io/n8n/pull/6196)

### Date transformation functions

n8n provides various transformation functions that operate on dates. These functions may return either a JavaScript `Date` or a Luxon `DateTime` object. With the new behavior, the return type always matches the input. If you call a date transformation function on a `Date`, it returns a `Date`. Similarly, if you call it on a `DateTime` object, it returns a `DateTime` object.

To identify any workflows and nodes that might be impacted by this change, you can use this [utility workflow](https://n8n.io/workflows/1929-v1-helper-find-params-with-affected-expressions/).

For more information about date transformation functions, please refer to the [official documentation](/code/builtin/data-transformation-functions/dates.md).

[PR #6435](https://github.com/n8n-io/n8n/pull/6435)

### Execution data retention

Starting from n8n 1.0, all successful, failed, and manual workflow executions will be saved by default. These settings can be modified for each workflow under "Workflow Settings," or globally using the respective environment variables. Additionally, the `EXECUTIONS_DATA_PRUNE` setting will be enabled by default, with `EXECUTIONS_DATA_PRUNE_MAX_COUNT` set to 10,000. These default settings are designed to prevent performance degradation when using SQLite. Make sure to configure them according to your individual requirements and system capacity.

[PR #6577](https://github.com/n8n-io/n8n/pull/6577)

### Removed N8N_USE_DEPRECATED_REQUEST_LIB

The legacy `request` library has been deprecated for some time now. As of n8n 1.0, the ability to fall back to it in the HTTP Request node by setting the `N8N_USE_DEPRECATED_REQUEST_LIB` environment variable has been fully removed. The HTTP Request node will now always use the new `HttpRequest` interface.

If you build custom nodes, refer to [HTTP request helpers](/integrations/creating-nodes/build/reference/http-helpers.md) for more information on migrating to the new interface.

[PR #6413](https://github.com/n8n-io/n8n/pull/6413)

### Removed WEBHOOK_TUNNEL_URL

As of version 0.227.0, n8n has renamed the `WEBHOOK_TUNNEL_URL` configuration option to `WEBHOOK_URL`. In n8n 1.0, `WEBHOOK_TUNNEL_URL` has been removed. Update your setup to reflect the new name. For more information about this configuration option, refer to [the docs](/hosting/configuration/configuration-examples/webhook-url.md).

[PR #1408](https://github.com/n8n-io/n8n/pull/1408)

### Remove Node 16 support

n8n now requires Node 18.17.0 or above.

## Updating to n8n 1.0

1. Create a full backup of n8n.
2. n8n recommends updating to the latest n8n 0.x release before updating to n8n 1.x. This will allow you to pinpoint any potential issues to the correct release. Once you have verified that n8n 0.x starts up without any issues, proceed to the next step.
3. Carefully read the [Deprecations](#deprecations) and [Breaking Changes](#breaking-changes) sections above to assess how they may affect your setup.
4. Update to n8n 1.0:
	* During beta (before July 24th 2023): If using Docker, pull the `next` Docker image.
	* After July 24th 2023: If using Docker, pull the `latest` Docker image.
5. If you encounter any issues, redeploy the previous n8n version and restore the backup.

## Reporting issues

If you encounter any issues during the process of updating to n8n 1.0, please seek help in the community [forum](https://community.n8n.io/).

## Thank you

We would like to take a moment to express our gratitude to all of our users for their continued support and feedback. Your contributions are invaluable in helping us make n8n the best possible automation tool. We're excited to continue working with you as we move forward with the release of version 1.0 and beyond. Thank you for being a part of our journey!
