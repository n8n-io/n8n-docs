---
title: SSE trigger
description: Documentation for the SSE trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# SSE trigger

Server-Sent Events (SSE) is a server push technology enabling a client to receive automatic updates from a server using HTTP connection. The SSE trigger node is used to receive server-sent events and is a trigger node.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [SSE Trigger integrations](https://n8n.io/integrations/sse-trigger/){:target=_blank .external-link} page.
///

## Node Reference

***URL***: This field specifies the URL from which to receive the server-sent events.

## Example Usage

This workflow allows you to receive server-sent events using the SSE trigger node. You can also find the [workflow](https://n8n.io/workflows/639) on n8n.io. This example usage workflow would use the following node.
- [SSE trigger]()

The final workflow should look like the following image.

![A workflow with the SSE trigger node](/_images/integrations/builtin/core-nodes/ssetrigger/workflow.png)


### 1. SSE trigger node

1. Enter the URL in the ***URL*** field. 
2. Click on ***Test step*** to run the node.

