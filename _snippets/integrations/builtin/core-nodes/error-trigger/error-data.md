The default error data received by the Error Trigger is:

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

All information is always present, except:

- `execution.id`: requires the execution to be saved in the database. Not present if the error is in the trigger node of the main workflow, as the workflow doesn't execute.
- `execution.url`: requires the execution to be saved in the database. Not present if the error is in the trigger node of the main workflow, as the workflow doesn't execute.
- `execution.retryOf`: only present when the execution is a retry of a failed execution.

If the error is caused by the trigger node of the main workflow, rather than a later stage, the data sent to the error workflow is different. There's less information in `execution{}` and more in `trigger{}`:

```json
{
  "trigger": {
    "error": {
      "context": {},
      "name": "WorkflowActivationError",
      "cause": {
        "message": "",
        "stack": ""
      },
      "timestamp": 1654609328787,
      "message": "",
      "node": {
        . . . 
      }
    },
    "mode": "trigger"
  },
  "workflow": {
    "id": "",
    "name": ""
  }
}
```
