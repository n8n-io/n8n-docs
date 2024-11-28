---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: n8n Trigger node documentation
description: Learn how to use the n8n Trigger node in n8n. Follow technical documentation to integrate n8n Trigger node into your workflows.
contentType: integration
priority: medium
---

# n8n Trigger node

The n8n Trigger node triggers when the current workflow updates or activates, or when the n8n instance starts or restarts. You can use the n8n Trigger node to notify when these events occur.

## Node parameters

The node includes a single parameter to identify the **Events** that should trigger it. Choose from these events:

- **Active Workflow Updated**: If you select this event, the node triggers when this workflow is updated.
- **Instance started**: If you select this event, the node triggers when the n8n instance starts or restarts.
- **Workflow Activated**: If you select this event, the node triggers when this workflow is activated.

You can select one or more of these events.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'n8n-trigger') ]]

