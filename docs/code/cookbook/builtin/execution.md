---
contentType: reference
---

# `execution`

## `execution.id`

Contains the unique ID of the current workflow execution.

=== "JavaScript"
	```js
	let executionId = $execution.id;
	```
=== "Python"
	```python
	executionId = _execution.id
	```

## `execution.resumeUrl`

The webhook URL to call to resume a [waiting](/integrations/builtin/core-nodes/n8n-nodes-base.wait.md) workflow.

See the [Wait > On webhook call](/integrations/builtin/core-nodes/n8n-nodes-base.wait.md#on-webhook-call) documentation to learn more.

`execution.resumeUrl` is available in workflows containing a Wait node, along with a node that waits for a webhook response.

## `execution.customData`

This is only available in the Code node.

=== "JavaScript"
	```js
	// Set a single piece of custom execution data
	$execution.customData.set("key", "value");

	// Set the custom execution data object
	$execution.customData.setAll({"key1": "value1", "key2": "value2"})

	// Access the current state of the object during the execution
	var customData = $execution.customData.getAll()

	// Access a specific value set during this execution
	var customData = $execution.customData.get("key")
	```
=== "Python"
	```python
	# Set a single piece of custom execution data
	_execution.customData.set("key", "value");

	# Set the custom execution data object
	_execution.customData.setAll({"key1": "value1", "key2": "value2"})

	# Access the current state of the object during the execution
	customData = _execution.customData.getAll()

	# Access a specific value set during this execution
	customData = _execution.customData.get("key")
	```

Refer to [Custom executions data](/workflows/executions/custom-executions-data.md) for more information.

---


