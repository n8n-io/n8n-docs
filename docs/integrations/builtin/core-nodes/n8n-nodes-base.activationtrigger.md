---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Activation Trigger node documentation
description: Learn how to use the Activation Trigger node in n8n. Follow technical documentation to integrate Activation Trigger node into your workflows.
contentType: integration
---

# Activation Trigger node

The Activation Trigger node gets triggered when an event gets fired by n8n or a workflow.

/// warning
n8n has deprecated the Activation Trigger node and replaced it with two new nodes: the [n8n Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.n8ntrigger/) and the [Workflow Trigger node](/integrations/builtin/core-nodes/n8n-nodes-base.workflowtrigger/). For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01170) page.
///

/// note | Keep in mind
If you want to use the Activation Trigger node for a workflow, add the node to the workflow. You don't have to create a separate workflow.
///

The Activation Trigger node gets triggered for the workflow that it gets added to. You can use the Activation Trigger node to trigger a workflow to notify the state of the workflow.

## Node parameters

- Events
    - **Activation**: Run when the workflow gets activated
    - **Start**: Run when n8n starts or restarts
    - **Update**: Run when the workflow gets saved while it's active

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'activation-trigger') ]]
