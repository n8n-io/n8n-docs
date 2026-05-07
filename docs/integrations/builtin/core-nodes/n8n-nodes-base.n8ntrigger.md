---
title: n8n Trigger node documentation
description: Learn how to use the n8n Trigger node in n8n. Follow technical documentation to integrate n8n Trigger node into your workflows.
contentType: [integration, reference]
priority: medium
---

# n8n Trigger node

The n8n Trigger node triggers when the workflow containing this node updates or gets published, or when the n8n instance starts or restarts. This node only responds to events in its own workflow; changes to other workflows won't trigger it. 

## Node parameters

The node includes a single parameter to identify the **Events** that should trigger it. Choose from these events:

- **Published Workflow Updated**: If you select this event, the node triggers when the workflow containing this node is updated. Changes to other workflows won't trigger this node.
- **Instance started**: If you select this event, the node triggers when the n8n instance starts or restarts.
- **Workflow Published**: If you select this event, the node triggers when the workflow containing this node is published. Publishing other workflows won't trigger this node.

You can select one or more of these events.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'n8n-trigger') ]]

