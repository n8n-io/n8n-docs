---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Execute Workflow Trigger node documentation
description: Learn how to use the Execute Workflow Trigger node in n8n. Follow technical documentation to integrate Execute Workflow Trigger node into your workflows.
contentType: integration
priority: high
---

# Execute Workflow Trigger node

Use this node to start a workflow in response to another workflow. It should be the first node in the workflow.

n8n allows you to call workflows from other workflows. This is useful if you want to:

* Reuse a workflow: for example, you could have multiple workflows pulling and processing data from different sources, then have all those workflows call a single workflow that generates a report.
* Break large workflows into smaller components.

## Usage

This node runs in response to a call from the [Execute Workflow](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow/) node.

--8<-- "_snippets/flow-logic/subworkflow-usage.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'execute-workflow-trigger') ]]

## How data passes between workflows

--8<-- "_snippets/flow-logic/subworkflow-data-flow.md"
