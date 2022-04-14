## Error workflow

For each workflow, an optional Error Workflow can be set in the Workflow Settings. It gets executed if the original execution fails. That makes it possible to, for instance, inform the user via Email or Slack if something goes wrong. The same Error Workflow can be set on multiple workflows.

The only difference between a regular workflow and an Error Workflow is that it contains an Error Trigger node, so it is important to make sure that this node gets created before setting a workflow as Error Workflow.

The Error Trigger node will trigger in case the execution fails and receives information about it. The data looks like this:

```json
[
	{
		"execution": {
			"id": "231",
			"url": "https://n8n.example.com/execution/231",
			"retryOf": "34",
			"error": {
				"message": "Example Error Message",
				"stack": "Stacktrace"
			},
			"lastNodeExecuted": "Node With Error",
			"mode": "manual"
		},
		"workflow": {
			"id": "1",
			"name": "Example Workflow"
		}
	}
]

```

All information is always present except:

- **execution.id**: Only present when the execution gets saved in the database
- **execution.url**: Only present when the execution gets saved in the database
- **execution.retryOf**: Only present when the execution is a retry of a previously failed execution
