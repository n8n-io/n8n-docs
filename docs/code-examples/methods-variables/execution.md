# $execution

## $execution.id

Contains the unique ID of the current workflow execution.

```typescript
const executionId = $execution.id;

return [{json:{executionId}}];
```

## `$execution.resumeUrl`

The webhook URL to call to resume a [waiting](/integrations/builtin/core-nodes/n8n-nodes-base.wait/) workflow.

See the [Wait > On webhook call](/integrations/builtin/core-nodes/n8n-nodes-base.wait/#webhook-call) documentation to learn more.
