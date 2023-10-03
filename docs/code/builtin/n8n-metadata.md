---
description: Methods for working with n8n metadata.
contentType: reference
---

# n8n metadata

Methods for working with n8n metadata.

This includes:

* Access to n8n environment variables for self-hosted n8n.
* Metadata about workflows, executions, and nodes.
* Information about instance [Variables](/variables/) and [External secrets](/external-secrets/).

Note that some methods and variables aren't available in the Code node.

| Method | Description | Available in Code node? |
| ------ | ----------- | :-------------------------: |
| `$env` | Contains n8n instance configuration [environment variables](/hosting/environment-variables/environment-variables/). | :white_check_mark: |
| `$execution.customData` | Set and get custom execution data. Refer to [Custom executions data](/workflows/executions/custom-executions-data/) for more information. | :white_check_mark: | 
| `$execution.id` | The unique ID of the current workflow execution. | :white_check_mark: |
| `$execution.mode` | Whether the execution was triggered automatically, or by manually running the workflow. Possible values are `test` and `production`. | :white_check_mark: |
| `$execution.resumeUrl` | The webhook URL to call to resume a workflow waiting at a [Wait node](/integrations/builtin/core-nodes/n8n-nodes-base.wait/). | :white_check_mark: |
| `$getWorkflowStaticData(type)` | View an [example](/code/cookbook/builtin/get-workflow-static-data/). Static data doesn't persist when testing workflows. The workflow must be active and called by a trigger or webhook to save static data. This gives access to the static workflow data. | :white_check_mark: |
| `$itemIndex` | The index of an item in a list of items. | :x: |
| `$prevNode.name` | The name of the node that the current input came from. When using the Merge node, note that `$prevNode` always uses the first input connector. | :white_check_mark: |
| `$prevNode.outputIndex` | The index of the output connector that the current input came from. Use this when the previous node had multiple outputs (such as an If or Switch node).  When using the Merge node, note that `$prevNode` always uses the first input connector. | :white_check_mark: |
| `$prevNode.runIndex` | The run of the previous node that generated the current input. When using the Merge node, note that `$prevNode` always uses the first input connector. | :white_check_mark: |
| `$runIndex` | How many times n8n has executed the current node. Zero-based (the first run is 0, the second is 1, and so on). | :white_check_mark: |
| `$secrets` | Contains information about your [External secrets](/external-secrets/) setup. | :white_check_mark: |
| `$vars` | Contains the [Variables](/variables/) available in the active environment. | :white_check_mark: |
| `$workflow.active` | Whether the workflow is active (true) or not (false). | :white_check_mark: |
| `$workflow.id` | The workflow ID. | :white_check_mark: |
| `$workflow.name` | The workflow name. | :white_check_mark: |
