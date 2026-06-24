---
title: Execution order in multi-branch workflows
description: How n8n decides the node execution order in multi-branch workflows.
contentType: explanation
nodeTitle: Understand execution order
originalFilePath: flow-logic/execution-order.md
originalUrl: 'https://docs.n8n.io/flow-logic/execution-order'
url: 'https://docs.n8n.io/build/flow-logic/understand-execution-order'
layout:
  description:
    visible: false
---

# Execution order in multi-branch workflows <a href="#execution-order-in-multi-branch-workflows" id="execution-order-in-multi-branch-workflows"></a>

n8n's node execution order depends on the version of n8n you're using:

* For workflows created before version 1.0: n8n executes the first node of each branch, then the second node of each branch, and so on.
* For workflows created in version 1.0 and above: executes each branch in turn, completing one branch before starting another. n8n orders the branches based on their position on the [canvas](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#canvas-n8n), from topmost to bottommost. If two branches are at the same height, the leftmost branch executes first.

You can change the execution order in your [workflow settings](../manage-workflows/configure-workflow-settings.md).

