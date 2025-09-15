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

## Not applicable in MCP Server Trigger node

* `execution.resumeUrl`:  
  MCP does not expose a webhook-based "resume URL" for pausing or resuming executions. 

* **Model Context Protocol (MCP)** is **stateful within a session**, but **not workflow-execution stateful like n8n**.  
  * An MCP client opens a session with a server.  
  * That session can hold **memory, context, and active resources**.  
  * But it does not support *waiting on a webhook and resuming an execution by URL*.  
