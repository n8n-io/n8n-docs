---
title: v1.0 preview
description: Information about n8n's upcoming v1.0 release.
---

# v1.0 preview

n8n is preparing to release its 1.0 version. This document describes planned changes, including breaking changes, and new features. It includes guidance on how to test preview builds of 1.0. Where work is in progress or completed, you can view the pull requests containing the changes.

## Expected new features

* Python support in the Code node

## Expected changes

* Improvements to data processing for multi-input nodes, to ensure predictable behavior. When building a node, it will be possible to control if incoming nodes get forced to execute (currently this is the default), and it'is possible to define which inputs are required. [PR #4238](https://github.com/n8n-io/n8n/pull/4238){:target=_blank .external-link}.
* Workflow executions will fail when there are syntax errors or runtime errors in expressions. For example, expressions that reference non-existent nodes.


## Expected breaking changes

* Force all n8n instances to have an owner account. This makes [user management](/user-management/) mandatory, and removes support for other methods such as BasicAuth and JWT. It will include a change to n8n pricing plans to make user management is available to all tiers.
* Remove support for MySQL and MariaDB as n8n backend databases.
* Remove own mode. n8n will now run in main mode by default. Refer to [Execute all workflows in the same process](/hosting/environment-variables/configuration-methods/#execute-all-workflows-in-the-same-process) for more information on own and main mode. You should use [Queue mode](/hosting/scaling/queue-mode/) if you need scalability.
* Ensure users can't install custom nodes in the `~/.n8n/node_modules` directory. Custom nodes and credentials will install to `~/.n8n/custom` (or the directory defined by `CUSTOM_EXTENSION_ENV`). Custom nodes that are npm packages will live in `~/.n8n/nodes`.
* Changes to how the Merge node processes data. This relates to the improvements to data processing for multi-input nodes. [PR #4238](https://github.com/n8n-io/n8n/pull/4238){:target=_blank .external-link}.
* Websockets will become the default method to update the n8n UI. Support for websockets was introduced in v0.215.0 ([PR #5443](https://github.com/n8n-io/n8n/pull/5443){:target=_blank .external-link}) but SSE (server side events) are still the default. [PR #6196](https://github.com/n8n-io/n8n/pull/6196){:target=_blank .external-link}.
* New behavior for [data transformation functions that operate on dates](/code-examples/expressions/data-transformation-functions/dates/). Currently, they return a Date object. The new behavior will ensure the return type matches the type of the object the function is called on.
* Fully remove the deprecated request library. The HTTPRequest node will use the new HttpRequest interface. If you build nodes, refer to [HTTP request helpers](https://docs.n8n.io/integrations/creating-nodes/build/reference/http-helpers/) for more information on migrating to the new interface.
* Replace `WEBHOOK_TUNNEL_URL` with `WEBHOOK_URL`. Refer to [Webhook URL](/hosting/environment-variables/configuration-methods/#webhook-url) for more information about this configuration option.

## How to test 1.0

n8n produces a nightly build of the 1.0 release candidate, with the latest changes. You should expect bugs: this is work-in-progress, which n8n is releasing to enable advanced testing and gather feedback.

To get the latest release candidate build, pull the Docker image:

```shell
docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n docker.n8n.io/n8nio/n8n:1.0.0-rc
```

If you're already running n8n, modify the command to use different ports and a different name.

To report issues, use [GitHub issues](https://github.com/n8n-io/n8n/issues){:target=_blank .external-link} or the [forum](https://community.n8n.io/){:target=_blank .external-link}. Use the `v1` label on your GitHub issue or forum post.

## Why is 1.0 important?

Version 1.0 is a milestone in an application's development. It indicates that the software has enough major features, and enough stability, to be considered reliable and full-featured.

This doesn't mean development stops: many new features and feature upgrades beyond v1.0 are planned.
