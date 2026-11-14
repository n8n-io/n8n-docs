---
title: n8n Trigger node documentation
description: >-
  Learn how to use the n8n Trigger node in n8n. Follow technical documentation
  to integrate n8n Trigger node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: n8n Trigger node documentation
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.n8ntrigger.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.n8ntrigger'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.n8ntrigger'
layout:
  description:
    visible: false
---

# n8n Trigger node <a href="#n8n-trigger-node" id="n8n-trigger-node"></a>

The n8n Trigger node triggers when the workflow containing this node updates or gets published, or when the n8n instance starts or restarts. This node only responds to events in its own workflow; changes to other workflows won't trigger it. 

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

The node includes a single parameter to identify the **Events** that should trigger it. Choose from these events:

- **Published Workflow Updated**: If you select this event, the node triggers when the workflow containing this node is updated. Changes to other workflows won't trigger this node.
- **Instance started**: If you select this event, the node triggers when the n8n instance starts or restarts.
- **Workflow Published**: If you select this event, the node triggers when the workflow containing this node is published. Publishing other workflows won't trigger this node.

You can select one or more of these events.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse n8n Trigger node documentation integration templates](https://n8n.io/integrations/n8n-trigger) or [search all templates](https://n8n.io/workflows/)

