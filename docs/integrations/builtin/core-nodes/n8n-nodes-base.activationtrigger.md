---
title: Activation Trigger node documentation
description: >-
  Learn how to use the Activation Trigger node in n8n. Follow technical
  documentation to integrate Activation Trigger node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Activation Trigger node documentation
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.activationtrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.activationtrigger
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.activationtrigger
layout:
  description:
    visible: false
---

# Activation Trigger node <a href="#activation-trigger-node" id="activation-trigger-node"></a>

The Activation Trigger node gets triggered when an event gets fired by n8n or a workflow.

{% hint style="warning" %}
n8n has deprecated the Activation Trigger node and replaced it with two new nodes: the [n8n Trigger node](n8n-nodes-base.n8ntrigger.md) and the [Workflow Trigger node](n8n-nodes-base.workflowtrigger.md). For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01170) page.
{% endhint %}

{% hint style="info" %}
**Keep in mind**

If you want to use the Activation Trigger node for a workflow, add the node to the workflow. You don't have to create a separate workflow.
{% endhint %}

The Activation Trigger node gets triggered for the workflow that it gets added to. You can use the Activation Trigger node to trigger a workflow to notify the state of the workflow.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

- Events
    - **Activation**: Run when the workflow gets published
    - **Start**: Run when n8n starts or restarts
    - **Update**: Run when the workflow gets saved while it's active

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Activation Trigger node documentation integration templates](https://n8n.io/integrations/activation-trigger) or [search all templates](https://n8n.io/workflows/)
