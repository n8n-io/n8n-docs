# `$execution`

## `$execution.id`

Contains the unique ID of the current workflow execution.

```typescript
const executionId = $execution.id;

return [{json:{executionId}}];
```

## `$execution.resumeUrl`

The webhook URL to call to resume a [waiting](/integrations/builtin/core-nodes/n8n-nodes-base.wait/) workflow.

See the [Wait > On webhook call](/integrations/builtin/core-nodes/n8n-nodes-base.wait/#webhook-call) documentation to learn more.

## `$execution.customData`

This is only available in the Code node.

```js
// Set a single piece of custom execution data
$execution.customData.set("key", "value");

// Set the custom execution data object
$execution.customData.setAll({"key1": "value1", "key2": "value2"})

// Access the current state of the object during the execution
const customData = $execution.customData.getAll()

// Access a specific value set during this execution
const customData = $execution.customData.get("key")
```

Refer to [Custom executions data](/workflows/executions/custom-executions-data/) for more information.
