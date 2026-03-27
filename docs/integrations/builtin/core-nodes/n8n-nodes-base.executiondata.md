---
title: Execution Data
description: Documentation for the Execution Data node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: high
---

# Execution Data

Use this node to save metadata for workflow executions. You can then search by this data in the **Executions** list.

You can retrieve custom execution data during workflow execution using the Code node. Refer to [Custom executions data](/workflows/executions/custom-executions-data.md) for more information.

--8<-- "_snippets/workflows/executions/custom-execution-data-availability.md"

## Operations

* Save Execution Data for Search

## Data to Save

Add a **Saved Field** for each key/value pair of metadata you'd like to save.

## Limitations

The Execution Data node has the following restrictions when storing execution metadata:

* `key`: limited to 50 characters
* `value`: limited to 512 characters

If either the `key` or `value` exceed the above limitations, n8n truncates to their maximum length and outputs a log entry.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'execution-data') ]]
