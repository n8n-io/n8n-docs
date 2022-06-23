# Custom variables

--8<-- "_snippets/code-examples/variables-list.md"

## Examples

### $executionId

Contains the unique ID of the current workflow execution.

```typescript
const executionId = $executionId;

return [{json:{executionId}}];
```

### $runIndex

Contains the index of the current run of the node.

```typescript
// Returns all items the node "IF" outputs (index: 0 which is Output "true" of the same run as current node)
const allItems = $items("IF", 0, $runIndex);
```

### $workflow

Gives information about the current workflow.

```js
// Boolean. Whether the workflow is active (true) or not (false)
$workflow.active
// Number. The workflow ID.
$workflow.id
// String. The workflow name.
$workflow.name
```

### $resumeWebhookURL

The weebhook URL to call to resume a [waiting](/workflow/integrations/core-nodes/workflow-nodes-base.wait/#time-interval) workflow.

See the [Wait > On weebhook call](/workflow/integrations/core-nodes/workflow-nodes-base.wait/#webhook-call) documentation to learn more.