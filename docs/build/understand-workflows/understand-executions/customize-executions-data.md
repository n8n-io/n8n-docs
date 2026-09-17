---
description: >-
  Add custom data to your workflow executions using the Code node. You can then
  filter executions by this data.
contentType: howto
nodeTitle: Customize executions data
originalFilePath: workflows/executions/custom-executions-data.md
originalUrl: 'https://docs.n8n.io/workflows/executions/custom-executions-data'
url: >-
  https://docs.n8n.io/build/understand-workflows/understand-executions/customize-executions-data
layout:
  description:
    visible: false
---

# Custom executions data <a href="#custom-executions-data" id="custom-executions-data"></a>

You can set custom data on your workflow using the Code node or the [Execution Data node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.executiondata). n8n records this with each execution. You can then use this data when filtering the executions list, or fetch it in your workflows using the Code node.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hEbJHXcEBce6m2wEE65f/" %}

## Set and access custom data using the Code node <a href="#set-and-access-custom-data-using-the-code-node" id="set-and-access-custom-data-using-the-code-node"></a>

This section describes how to set and access data using the Code node. Refer to [Execution Data node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.executiondata) for information on using the Execution Data node to set data. You can't retrieve custom data using the Execution Data node.

### Set custom executions data <a href="#set-custom-executions-data" id="set-custom-executions-data"></a>

Set a single piece of extra data:

{% tabs %}
{% tab title="JavaScript" %}
```js
$execution.customData.set("key", "value");
```
{% endtab %}

{% tab title="Python" %}
```python
_execution.customData.set("key", "value");
```
{% endtab %}
{% endtabs %}

Set all extra data. This overwrites the whole custom data object for this execution:

{% tabs %}
{% tab title="JavaScript" %}
```js
$execution.customData.setAll({"key1": "value1", "key2": "value2"})
```
{% endtab %}

{% tab title="Python" %}
```python
_execution.customData.setAll({"key1": "value1", "key2": "value2"})
```
{% endtab %}
{% endtabs %}

There are limitations:

* They must be strings
* `key` has a maximum length of 50 characters
* `value` has a maximum length of 255 characters
* n8n supports a maximum of 10 items of custom data

### Access the custom data object during execution <a href="#access-the-custom-data-object-during-execution" id="access-the-custom-data-object-during-execution"></a>

You can retrieve the custom data object, or a specific value in it, during an execution:


{% tabs %}
{% tab title="JavaScript" %}
```js
// Access the current state of the object during the execution
const customData = $execution.customData.getAll();

// Access a specific value set during this execution
const customData = $execution.customData.get("key");
```
{% endtab %}

{% tab title="Python" %}
```python
# Access the current state of the object during the execution
customData = _execution.customData.getAll();

# Access a specific value set during this execution
customData = _execution.customData.get("key");
```
{% endtab %}
{% endtabs %}

## Related pages

* [Understand executions](./): what an execution is, and how to view, filter, and debug them.
* [Manual, partial, and production executions](types-of-executions.md): how manual, partial, and production executions differ.
* [View all executions](view-all-executions.md): view and filter all executions across all your workflows.
* [View executions for a single workflow](view-executions-for-a-single-workflow.md): view and filter executions for the workflow currently open on the canvas.
* [Debug and re-run past executions](debug-executions.md): copy data from a previous execution into your current workflow to debug it.
* [Stream real-time responses](stream-real-time-responses.md): send data back to users as an AI Agent node generates it.
* [Dirty nodes](understand-dirty-nodes.md): what dirty nodes are and how they affect workflow execution.
