---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Workflow Trigger node documentation
description: Learn how to use the Workflow Trigger node in n8n. Follow technical documentation to integrate Workflow Trigger node into your workflows.
contentType: integration
priority: high
---

# Workflow Trigger node

The Workflow Trigger node gets triggered when a workflow is updated or activated.

/// warning | Deprecated
n8n has deprecated the Workflow Trigger node and moved its functionality to the [n8n Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.n8ntrigger/).
///

/// note | Keep in mind
If you want to use the Workflow Trigger node for a workflow, add the node to the workflow. You don't have to create a separate workflow.
///

The Workflow Trigger node gets triggered for the workflow that it gets added to. You can use the Workflow Trigger node to trigger a workflow to notify the state of the workflow.

## Node parameters

The node includes a single parameter to identify the **Events** that should trigger it. Choose from these events:

- **Active Workflow Updated**: If you select this event, the node triggers when this workflow is updated.
- **Workflow Activated**: If you select this event, the node triggers when this workflow is activated.

You can select one or both of these events.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'workflow-trigger') ]]
