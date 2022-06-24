# Custom variables

--8<-- "_snippets/code-examples/variables-list.md"

## Examples


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

### $resumeWebhookUrl

The webhook URL to call to resume a [waiting](/workflow/integrations/core-nodes/workflow-nodes-base.wait/#time-interval) workflow.


See the [Wait > On webhook call](/workflow/integrations/core-nodes/workflow-nodes-base.wait/#webhook-call) documentation to learn more.
