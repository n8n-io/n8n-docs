---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: "Executions"
description: n8n executions explanation.
contentType: explanation
---

# Executions

In n8n, the term "execution" refers to the process of carrying out the instructions in a workflow. Executions can be triggered manually, by a schedule, via incoming webhooks, or through other internal and external events. n8n maintains a full record of node inputs, outputs, and any errors encountered, which can be viewed in the execution history for debugging or auditing.

## Production executions
   - Triggers

## Manual Executions

### Partial executions

Partial executions are manual executions that only run a subset of your workflow nodes. Running only part of the workflow has a number of advantages when actively editing or troubleshooting:

**Faster Debugging**: You don’t need to re-run the entire workflow from the beginning. You can test just the section you're working on, saving time.

**Retaining outputs**: You can reuse previous node outputs or test with a known input, reducing variability and focusing on the logic you’re debugging.

**Avoid repeating unwanted actions**: For example, sending messages, accessing external websites.

For a partial execution, n8n follows the path from the initial trigger and moves forward along the path of nodes until it finds one which is either un-executed, has an error, or is marked as dirty (see [next section](#dirty-nodes)). The workflow execution is than started from that node using existing data.



### Dirty nodes

A 'dirty' node is simply one which has executed successfully in the past, but the resulting output is considered stale or unreliable. It is marked in this way for information purposes, as if the node were executed again, the output may be different.

#### How to recognize 'dirty' node data

In the canvas of the workflow editor, dirty notes can be identified by a different-colored border and a yellow triangle where previously it had a green 'tick' symbol. For example:

!["Image of node displayed with yellow border"](/_images/workflows/executions/dirty-node-canvas.png)

In the node editor view, the output panel will also display the yellow triangle on the output panel. Hovering the mouse over the triangle will show a tooltip with more explanation about why the data is considered stale.

!["Image of node displayed with yellow border"](/_images/workflows/executions/dirty-node-editor.png)

#### How does a node get to be 'dirty'?

There are a number of ways that execution data can be flagged as stale, depending on changes you have made. For example:

- Inserting or deleting a node: mark the first node that follows the inserted node.
- Modifying node parameters: mark the node being modified.
- Adding a connector: mark the destination node of the new connector.
- Disabling a node: mark the first node that follows the disabled node.

??? explanation "List of other ways a node can become dirty..."
    - Unpinning a node: mark the node that was unpinned.
    - Modifying pinned data: mark the node that comes after the pinned data.
    - If any of the above actions occur inside a loop, also mark the first node of the loop.
    
    For sub-nodes, also mark any executed parent nodes (up to and including the root) when:

    - Editing an executed sub-node
    - Adding a new sub-node
    - Disconnecting or deleting a sub-node
    - Disabling a sub-node
    - Enabling a sub-node

<div class="grid cards" markdown>

-   When deleting a node connected in a workflow...

    !["Image of node displayed with yellow border"](/_images/workflows/executions/dirty-before.png)

-   ...the next node in the sequence becomes dirty

    !["Image of node displayed with yellow border"](/_images/workflows/executions/dirty-after.png)

</div>

In the case of a loop (using the [Loop over Items][] node), when any node within the loop is marked as dirty, the initial node of the loop is also marked:

!["Image of node displayed with yellow border"](/_images/workflows/executions/dirty-loop.png)

#### Resolving dirty nodes

The 'dirty' status of a node can be cleared by executing the node again. This can be done by manually triggering the whole workflow, or by running a partial execution (as described in the [preceding section](#partial-executions)) by running 'test step' on the individual node.

### Execution Flow
   - Execution order
   - Logic and branching
   - Loops
   - Sub-workflows

## Execution Status and Lifecycle
   - Queued
   - Running
   - Completed
   - Failed
   - Canceled

## Execution logs
   - Viewing execution history
   - Inspecting node data
   - Debugging Failures

## Queuing executions
   - Execution modes
   - Workers
   - Execution timeout and retries

## Best Practices
   - Error-handling
   - Design tips
   - Performance

## Troubleshooting executions

- Common problems
- Interpreting stack traces
- Monitoring and alerts

<!-- LINKS -->

[Loop over Items]: /integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches.md
[pinning data]: /data/data-pinning.md