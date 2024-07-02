---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Add custom data to your workflow executions using the Code node. You can then filter executions by this data.
contentType: howto
---

# Custom executions data

You can set custom data on your workflow using the Code node or the [Execution Data node](/integrations/builtin/core-nodes/n8n-nodes-base.executiondata/). n8n records this with each execution. You can then use this data when filtering the executions list, or fetch it in your workflows using the Code node.

--8<-- "_snippets/workflows/executions/custom-execution-data-availability.md"

## Set and access custom data using the Code node

This section describes how to set and access data using the Code node. Refer to [Execution Data node](/integrations/builtin/core-nodes/n8n-nodes-base.executiondata/) for information on using the Execution Data node to set data. You can't retrieve custom data using the Execution Data node.

### Set custom executions data

Set a single piece of extra data:

=== "JavaScript"
	```js
	$execution.customData.set("key", "value");
	```
=== "Python"
	```python
	_execution.customData.set("key", "value");
	```

Set all extra data. This overwrites the whole custom data object for this execution:

=== "JavaScript"
	```js
	$execution.customData.setAll({"key1": "value1", "key2": "value2"})
	```
=== "Python"
	```python
	_execution.customData.setAll({"key1": "value1", "key2": "value2"})
	```

There are limitations:

* They must be strings
* `key` has a maximum length of 50 characters
* `value` has a maximum length of 255 characters
* n8n supports a maximum of 10 items of custom data

### Access the custom data object during execution

You can retrieve the custom data object, or a specific value in it, during an execution:

<!-- vale off -->
=== "JavaScript"
	```js
	// Access the current state of the object during the execution
	const customData = $execution.customData.getAll();

	// Access a specific value set during this execution
	const customData = $execution.customData.get("key");
	```
=== "Python"
	```python
	# Access the current state of the object during the execution
	customData = _execution.customData.getAll();

	# Access a specific value set during this execution
	customData = _execution.customData.get("key");
	```
<!-- vale on -->
