---
title: Execute Workflow
description: Documentation for the Execute Workflow node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Execute Workflow

Use the Execute Workflow node to run a different workflow on the host machine that runs n8n.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [Execute Workflow integrations](https://n8n.io/integrations/execute-workflow/){:target=_blank .external-link} page.


## Properties

The Execute Workflow node has two properties:

- **Source**: This field specifies from where to get the workflow's information.
	- Database
	- Local File
	- Parameter
	- URL
- **Workflow**: This field contains information about the workflow, such as the workflow ID, URL, or a file.

## Set up and use a sub-workflow

This section walks through setting up both the parent workflow and sub-workflow.

--8<-- "_snippets/flow-logic/subworkflow-usage.md"

## Find a workflow ID

1. Open the workflow for which you want to get the workflow ID.
2. Copy the number after `workflow/` in your URL and paste that in the **Workflow ID** field.


## How data passes between workflows

--8<-- "_snippets/flow-logic/subworkflow-data-flow.md"
