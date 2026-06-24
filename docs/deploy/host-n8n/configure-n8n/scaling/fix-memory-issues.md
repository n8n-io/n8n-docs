---
contentType: explanation
nodeTitle: Fix memory issues
originalFilePath: hosting/scaling/memory-errors.md
originalUrl: 'https://docs.n8n.io/hosting/scaling/memory-errors'
url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/fix-memory-issues'
layout:
  description:
    visible: false
---

# Memory-related errors <a href="#memory-related-errors" id="memory-related-errors"></a>

n8n doesn't restrict the amount of data each node can fetch and process. While this gives you freedom, it can lead to errors when workflow executions require more memory than available. This page explains how to identify and avoid these errors.

{% hint style="info" %}
**Only for self-hosted n8n**

This page describes memory-related errors when [self-hosting n8n](../../README.md). Visit [Cloud data management](../../../use-n8n-cloud/configure-cloud/manage-your-data.md) to learn about memory limits for [n8n Cloud](/manage-cloud/overview.md).
{% endhint %}

## Identifying out of memory situations <a href="#identifying-out-of-memory-situations" id="identifying-out-of-memory-situations"></a>

n8n provides error messages that warn you in some out of memory situations. For example, messages such as **Execution stopped at this node (n8n may have run out of memory while executing it)**.

Error messages including **Problem running workflow**, **Connection Lost**, or **503 Service Temporarily Unavailable** suggest that an n8n instance has become unavailable. 

When self-hosting n8n, you may also see error messages such as **Allocation failed - JavaScript heap out of memory** in your server logs. 

On n8n Cloud, or when using n8n's Docker image, n8n restarts automatically when encountering such an issue. However, when running n8n with npm you might need to restart it manually.

## Typical causes <a href="#typical-causes" id="typical-causes"></a>

Such problems occur when a workflow execution requires more memory than available to an n8n instance. Factors increasing the memory usage for a workflow execution include:

- Amount of [JSON data](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/understand-n8ns-data-structure).
- Size of binary data.
- Number of nodes in a workflow.
- Some nodes are memory-heavy: the [Code](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.code) node and the older Function node can increase memory consumption significantly.
- Manual or automatic workflow executions: manual executions increase memory consumption as n8n makes a copy of the data for the frontend.
- Additional workflows running at the same time.

## Avoiding out of memory situations <a href="#avoiding-out-of-memory-situations" id="avoiding-out-of-memory-situations"></a>

When encountering an out of memory situation, there are two options: either increase the amount of memory available to n8n or reduce the memory consumption.

### Increase available memory <a href="#increase-available-memory" id="increase-available-memory"></a>

When self-hosting n8n, increasing the amount of memory available to n8n means provisioning your n8n instance with more memory. This may incur additional costs with your hosting provider.

On n8n cloud you need to upgrade to a larger plan.

### Reduce memory consumption <a href="#reduce-memory-consumption" id="reduce-memory-consumption"></a>

This approach is more complex and means re-building the workflows causing the issue. This section provides some guidelines on how to reduce memory consumption. Not all suggestions are applicable to all workflows.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/x69Nl9jqgwUIMnP1x6Hz/" %}

### Increase old memory <a href="#increase-old-memory" id="increase-old-memory"></a>

This applies to self-hosting n8n. When encountering **JavaScript heap out of memory** errors, it's often useful to allocate additional memory to the old memory section of the V8 JavaScript engine. To do this, set the appropriate [V8 option](https://nodejs.org/api/cli.html#--max-old-space-sizesize-in-megabytes) `--max-old-space-size=SIZE` either through the CLI or through the `NODE_OPTIONS` [environment variable](https://nodejs.org/api/cli.html#node_optionsoptions).
