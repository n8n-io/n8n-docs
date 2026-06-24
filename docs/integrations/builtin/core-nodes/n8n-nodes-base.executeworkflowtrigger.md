---
title: Execute Sub-workflow Trigger node documentation
description: >-
  Learn how to use the Execute Sub-workflow Trigger node in n8n. Follow
  technical documentation to integrate Execute Sub-workflow Trigger node into
  your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Execute Sub-workflow Trigger node documentation
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflowtrigger
layout:
  description:
    visible: false
---

# Execute Sub-workflow Trigger node <a href="#execute-sub-workflow-trigger-node" id="execute-sub-workflow-trigger-node"></a>

Use this node to start a workflow in response to another workflow. It should be the first node in the workflow.

n8n allows you to call workflows from other workflows. This is useful if you want to:

* Reuse a workflow: for example, you could have multiple workflows pulling and processing data from different sources, then have all those workflows call a single workflow that generates a report.
* Break large workflows into smaller components.

## Usage <a href="#usage" id="usage"></a>

This node runs in response to a call from the [Execute Sub-workflow](n8n-nodes-base.executeworkflow.md) or [Call n8n Workflow Tool](../cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md) nodes.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/XwY7AayneZzH3fhi47iZ/" %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Execute Sub-workflow Trigger node documentation integration templates](https://n8n.io/integrations/execute-workflow-trigger) or [search all templates](https://n8n.io/workflows/)

## How data passes between workflows <a href="#how-data-passes-between-workflows" id="how-data-passes-between-workflows"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/CTYo2n9a9l27vlfCe7rW/" %}
