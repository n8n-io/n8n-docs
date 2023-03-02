---
description: Add custom data to your workflow executions using the Code node. You can then filter executions by this data.
---

# Custom executions data

You can set custom data on your workflow using the Code node. n8n records this with each execution. You can then use this data when filtering the executions list.

!!! info "Feature availability"		
	Custom executions data is available on:

	* Cloud: Start, Pro, and Power
	* Self-Hosted: Team and Enterprise

## Set custom executions data

Set a single piece of extra data:

```js
$execution.customData.set("key", "value");
```

Set all extra data. This overwrites the whole custom data object for this execution:

```js
$execution.customData.setAll({"key1": "value1", "key2": "value2"})
```

There are limitations:

* They must be strings
* `key` has a maximum length of 50 characters
* `value` has a maximum length of 255 characters
* n8n supports a maximum of 10 items of custom data

## Access the custom data object during execution

You can retrieve the custom data object, or a specific value in it, during an execution:

```js
// Access the current state of the object during the execution
const customData = $execution.customData.getAll()

// Access a specific value set during this execution
const customData = $execution.customData.get("key")
```
