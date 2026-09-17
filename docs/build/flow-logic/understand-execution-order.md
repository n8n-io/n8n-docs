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

Execution order is part of your workflow's [flow logic](./), and matters most in workflows that [split into multiple branches](split-with-conditionals.md).

n8n's node execution order depends on the version of n8n you're using:

* For workflows created before n8n 1.0: n8n executes the first node of each branch, then the second node of each branch, and so on.
* For workflows created from n8n 1.0: executes each branch in turn, completing one branch before starting another. n8n orders the branches based on their position on the canvas[^1], from topmost to bottommost. If two branches are at the same height, the leftmost branch executes first.

You can change the execution order in your [workflow settings](../manage-workflows/configure-workflow-settings.md).

[^1]: The canvas is the main interface for building workflows in n8n's editor UI. You use the canvas to add and connect nodes to compose workflows.

## Related pages

* [Flow logic](./): how to represent logic in n8n workflows.
* [Split with conditionals](split-with-conditionals.md): route items down different branches with the IF and Switch nodes.
* [Merge data](merge-data.md): combine multiple data streams back into one.
* [Loop](loop.md): repeat an action until a condition is met, or until all items are processed.
* [Wait](wait.md): pause a workflow's execution and resume it later.
* [Break workflows into smaller parts](break-workflows-into-smaller-parts.md): call one workflow from another to build modular, microservice-like workflows.
* [Convert to sub-workflows](convert-to-sub-workflows.md): turn part of an existing workflow into a reusable sub-workflow.
* [Handle errors gracefully](handle-errors-gracefully.md): set up an error workflow to respond to execution failures.
