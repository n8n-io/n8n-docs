---
title: Execute Workflow trigger
description: Documentation for the Execute Workflow trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Execute Workflow trigger

Use this node to start a workflow in response to another workflow. It should be the first node in the workflow.

n8n allows you to call workflows from other workflows. This is useful if you want to:

* Reuse a workflow: for example, you could have multiple workflows pulling and processing data from different sources, then have all those workflows call a single workflow that generates a report.
* Break large workflows into smaller components.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [Execute Workflow trigger integrations](https://n8n.io/integrations/execute-workflow-trigger/){:target=_blank .external-link} page.

## Usage

This node runs in response to a call from the [Execute Workflow](/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow/) node.

--8<-- "_snippets/flow-logic/subworkflow-usage.md"

## How data passes between workflows

--8<-- "_snippets/flow-logic/subworkflow-data-flow.md"
