---
description: Methods for working with n8n metadata.
contentType: reference
hide:
  - toc
nodeTitle: n8n metadata
originalFilePath: code/builtin/n8n-metadata.md
originalUrl: 'https://docs.n8n.io/code/builtin/n8n-metadata'
url: 'https://docs.n8n.io/build/code-in-n8n/use-built-in-shortcuts/n8n-metadata'
layout:
  description:
    visible: false
---

# n8n metadata <a href="#n8n-metadata" id="n8n-metadata"></a>

Methods for working with n8n metadata.

This includes:

* Access to n8n environment variables for self-hosted n8n.
* Metadata about workflows, executions, and nodes.
* Information about instance [Variables](../define-custom-variables.md) and [External secrets](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/use-external-secret-stores).

{% hint style="info" %}
**Python support**

You can use Python in the Code node. It isn't available in expressions.
{% endhint %}
{% tabs %}
{% tab title="JavaScript" %}
| Method | Description | Available in Code node? |
| ------ | ----------- | :-------------------------: |
| `$env` | Contains n8n instance configuration [environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables). | ✅ |
| `$execution.customData` | Set and get custom execution data. Refer to [Custom executions data](../../understand-workflows/understand-executions/customize-executions-data.md) for more information. | ✅ | 
| `$execution.id` | The unique ID of the current workflow execution. | ✅ |
| `$execution.mode` | Whether the execution was triggered automatically, or by manually running the workflow. Possible values are `test` and `production`. | ✅ |
| `$execution.resumeUrl` | The webhook URL to call to resume a workflow waiting at a [Wait node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.wait). | ✅ |
| `$getWorkflowStaticData(type)` | View an [example](../cookbook/built-in-methods-and-variables-examples/getworkflowstaticdata.md). Static data doesn't persist when testing workflows. The workflow must be active and called by a trigger or webhook to save static data. This gives access to the static workflow data. | ✅ |
| `$("<node-name>").isExecuted` | Check whether a node has already executed. | ✅ |
| `$itemIndex` | The index of an item in a list of items. | ❌ |
| `$nodeVersion` | Get the version of the current node. | ✅ |
| `$prevNode.name` | The name of the node that the current input came from. When using the Merge node, note that `$prevNode` always uses the first input connector. | ✅ |
| `$prevNode.outputIndex` | The index of the output connector that the current input came from. Use this when the previous node had multiple outputs (such as an If or Switch node).  When using the Merge node, note that `$prevNode` always uses the first input connector. | ✅ |
| `$prevNode.runIndex` | The run of the previous node that generated the current input. When using the Merge node, note that `$prevNode` always uses the first input connector. | ✅ |
| `$runIndex` | How many times n8n has executed the current node. Zero-based (the first run is 0, the second is 1, and so on). | ✅ |
| `$secrets` | Contains information about your [External secrets](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/use-external-secret-stores) setup. | ❌ |
| `$vars` | Contains the [Variables](../define-custom-variables.md) available in the active environment. | ✅ |
| `$version` | The node version. | ❌ |
| `$workflow.active` | Whether the workflow is active (true) or not (false). | ✅ |
| `$workflow.id` | The workflow ID. | ✅ |
| `$workflow.name` | The workflow name. | ✅ |
{% endtab %}

{% tab title="Python (native)" %}
| Method | Description |
| ------ | ----------- |
| `_items` | Contains incoming items in "Run once for all items" mode. |
| `_item` | Contains the item being iterated on in "Run once for each item" mode. |
{% endtab %}

{% tab title="Python (Pyodide, deprecated)" %}
| Method | Description |
| ------ | ----------- |
| `_env` | Contains n8n instance configuration [environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables). |
| `_execution.customData` | Set and get custom execution data. Refer to [Custom executions data](../../understand-workflows/understand-executions/customize-executions-data.md) for more information. | 
| `_execution.id` | The unique ID of the current workflow execution. | 
| `_execution.mode` | Whether the execution was triggered automatically, or by manually running the workflow. Possible values are `test` and `production`. | 
| `_execution.resumeUrl` | The webhook URL to call to resume a workflow waiting at a [Wait node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.wait). |
| `_getWorkflowStaticData(type)` | View an [example](../cookbook/built-in-methods-and-variables-examples/getworkflowstaticdata.md). Static data doesn't persist when testing workflows. The workflow must be active and called by a trigger or webhook to save static data. This gives access to the static workflow data. |
| `_("<node-name>").isExecuted` | Check whether a node has already executed. |
| `_nodeVersion` | Get the version of the current node. | ✅ |
| `_prevNode.name` | The name of the node that the current input came from. When using the Merge node, note that `_prevNode` always uses the first input connector. | 
| `_prevNode.outputIndex` | The index of the output connector that the current input came from. Use this when the previous node had multiple outputs (such as an If or Switch node).  When using the Merge node, note that `_prevNode` always uses the first input connector. | 
| `_prevNode.runIndex` | The run of the previous node that generated the current input. When using the Merge node, note that `_prevNode` always uses the first input connector. |
| `_runIndex` | How many times n8n has executed the current node. Zero-based (the first run is 0, the second is 1, and so on). |
| `_secrets` | Contains information about your [External secrets](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/use-external-secret-stores) setup. | 
| `_vars` | Contains the [Variables](../define-custom-variables.md) available in the active environment. | 
| `_workflow.active` | Whether the workflow is active (true) or not (false). |
| `_workflow.id` | The workflow ID. | 
| `_workflow.name` | The workflow name. |
{% endtab %}
{% endtabs %}
