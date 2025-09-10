---
title: Execute Sub-workflow Trigger node documentation
description: Learn how to use the Execute Sub-workflow Trigger node in n8n. Follow technical documentation to integrate Execute Sub-workflow Trigger node into your workflows.
contentType: [integration, reference]
priority: high
---

# Execute Sub-workflow Trigger node

Use this node to start a workflow in response to another workflow. It should be the first node in the workflow.

n8n allows you to call workflows from other workflows. This is useful if you want to:

* Reuse a workflow: for example, you could have multiple workflows pulling and processing data from different sources, then have all those workflows call a single workflow that generates a report.
* Break large workflows into smaller components.

## Usage

This node runs in response to a call from the [Execute Sub-workflow](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow.md) or [Call n8n Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md) nodes.

--8<-- "_snippets/flow-logic/subworkflow-usage.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'execute-workflow-trigger') ]]

## How data passes between workflows

--8<-- "_snippets/flow-logic/subworkflow-data-flow.md"
