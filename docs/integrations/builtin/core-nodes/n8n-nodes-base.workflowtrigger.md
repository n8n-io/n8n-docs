---
title: Workflow trigger
description: Documentation for the Workflow trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Workflow trigger

The Workflow trigger node gets triggered when a workflow is updated or activated.

/// note | Keep in mind
If you want to use the Workflow trigger node for a workflow, add the node to the workflow. You don't have to create a separate workflow.
///

The Workflow trigger node gets triggered for the workflow that it gets added to. You can use the Workflow trigger node to trigger a workflow to notify the state of the workflow.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Workflow Trigger integrations](https://n8n.io/integrations/workflow-trigger/){:target=_blank .external-link} page.
///

## Node parameters

The node includes a single parameter to identify the **Events** that should trigger it. Choose from these events:

- **Active Workflow Updated**: If you select this event, the node triggers when this workflow is updated.
- **Workflow Activated**: If you select this event, the node triggers when this workflow is activated.

You can select one or both of these events.
