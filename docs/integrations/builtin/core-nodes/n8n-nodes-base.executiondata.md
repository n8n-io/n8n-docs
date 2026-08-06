---
title: Execution Data
description: >-
  Documentation for the Execution Data node in n8n, a workflow automation
  platform. Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Execution Data
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.executiondata.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executiondata
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executiondata
layout:
  description:
    visible: false
---

# Execution Data <a href="#execution-data" id="execution-data"></a>

Use this node to save metadata for workflow executions. You can then search by this data in the **Executions** list.

You can retrieve custom execution data during workflow execution using the Code node. Refer to [Custom executions data](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/understand-executions/customize-executions-data) for more information.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hEbJHXcEBce6m2wEE65f/" %}

## Operations <a href="#operations" id="operations"></a>

* Save Execution Data for Search

## Data to Save <a href="#data-to-save" id="data-to-save"></a>

Add a **Saved Field** for each key/value pair of metadata you'd like to save.

## Limitations <a href="#limitations" id="limitations"></a>

The Execution Data node has the following restrictions when storing execution metadata:

* `key`: limited to 50 characters
* `value`: limited to 512 characters

If either the `key` or `value` exceed the above limitations, n8n truncates to their maximum length and outputs a log entry.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Execution Data integration templates](https://n8n.io/integrations/execution-data) or [search all templates](https://n8n.io/workflows/)
