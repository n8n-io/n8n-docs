# Dealing with errors in workflows

Sometimes it can happen that you're building a nice workflow, but when you try to execute it––it fails. There are many reasons why workflows executions may fail (some more or less mysterious), for example when a node is not configured correctly or a third-party service that you're trying to connect to is not working properly.

But don't panic. We will show you some ways in which you can troubleshoot the issue, so you can get your workflow up and running as soon as possible.


## Checking failed workflows

When one of your workflows fails, it's helpful to check the execution log by clicking on *Executions* in the left-side panel. The executions log shows you a list of the latest execution time, status, mode, and running time of your saved workflows.

To investigate a specific workflow from the list, click on the folder icon on the row of the respective workflow. 

<figure><img src="./course_images/explanation_workflowExecutions.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow Executions window</i></figcaption></figure>


This will open the workflow in read-only mode, where you can see the execution of each node. This representation can help you identify at what point the workflow ran into issues.

<figure><img src="./course_images/explanation_workflowExecutions_readonly.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow execution view</i></figcaption></figure>

## Catching erroring workflows

To catch failed workflows, create a separate [**Error Workflow**](https://docs.n8n.io/getting-started/key-concepts/#error-workflow) with the [***Error Trigger node***](https://docs.n8n.io/nodes/n8n-nodes-base.errorTrigger/), which gets executed if the main execution fails. 

Then, you can take further actions by connecting other nodes, for example sending notifications via email or Slack about the failed workflow and its errors. To receive error messages for a failed workflow, you need to select the option `Error Workflow` in the [Workflow Settings](https://docs.n8n.io/courses/level-one/chapter-5/chapter-5.8.html) of the respective workflow.

The only difference between a regular workflow and an Error Workflow is that the latter contains an *Error Trigger node*. Make sure to create this node before you set a workflow as Error Workflow.

::: tip 💡 Keep in mind
- You don't need to activate workflows that use the *Error Workflow node*.
- A workflow that uses the *Error Trigger node* uses itself as the error workflow.
- The *Error Trigger node* is designed to get triggered only when the monitored workflow gets executed automatically. This means you can’t test this (to see the result of) an error workflow while executing the monitored workflow manually.
- You can set the same Error Workflow for multiple workflows.
:::

### Exercise
In the previous chapters, you've built several small workflows. Now, pick one of them that you want to monitor. Create an Error Workflow that sends a message to a Slack channel if that workflow fails. Don't forget to set this Error Workflow in the settings of the monitored workflow.

<details>
<summary>Show me the solution</summary>

The workflow for this exercise looks like this:

<figure><img src="./course_images/exercise_errors_errorTriggerNode_workflow.png" alt="" style="width:100%"><figcaption align = "center"><i>Error workflow</i></figcaption></figure>

To check the configuration of the nodes, you can copy-paste the JSON code of the workflow:

<code>
{
  "nodes": [
    {
      "parameters": {},
      "name": "Error Trigger",
      "type": "n8n-nodes-base.errorTrigger",
      "typeVersion": 1,
      "position": [
        720,
        -380
      ]
    },
    {
      "parameters": {
        "channel": "channelname",
        "text": "=This workflow {{$node[\"Error Trigger\"].json[\"workflow\"][\"name\"]}}failed.\nHave a look at it here: {{$node[\"Error Trigger\"].json[\"execution\"][\"url\"]}}",
        "attachments": [],
        "otherOptions": {}
      },
      "name": "Slack",
      "type": "n8n-nodes-base.slack",
      "position": [
        900,
        -380
      ],
      "typeVersion": 1,
      "credentials": {
        "slackApi": {
          "id": "17",
          "name": "slack_credentials"
        }
      }
    }
  ],
  "connections": {
    "Error Trigger": {
      "main": [
        [
          {
            "node": "Slack",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
</code>

</details>


## Throwing exceptions in workflows

Another way of troubleshooting workflows is to include a [***Stop and Error node***](https://docs.n8n.io/nodes/n8n-nodes-base.stopAndError/) in your workflow. This node throws an error, which can be set to one of two *Error Types*: an *Error Message* or an *Error Object*. The *Error Message* returns a custom message about the error, while the *Error Object* returns the type of error.

The *Stop and Error node* can only be added as the last node in a workflow.

:::tip :open_book: **When to throw errors**
Throwing exceptions with the *Stop and Error node* is useful for {verifying/controlling} the data (or assumptions about the data) from a node and returning custom error messages.

If you are working with data from a third-party service, you may come across problems such as: wrongly formatted JSON output, data with the wrong type (for example, numeric data that has a non-numeric value), missing values, or errors from remote servers. In other words, assumptions about the incoming data are violated.

Though this kind of invalid data might not cause the workflow to fail right away, it could cause problems later on, and then it can become difficult to track the source error. This is why it is better to throw an error at the time you know there might be a problem.

For example, let's say you have a *Function node* that is supposed to calculate the length of a list and return `True` if its length is above 5 or `False` if is below 5. The assumption is that the input data is a list. However, if the data is not passed as a list, the function won't work, causing an error in the *Function node*.
:::

<figure><img src="./course_images/exercise_errors_stopAndError.png" alt="" style="width:100%"><figcaption align = "center"><i>Stop and Error node</i></figcaption></figure>

### Example

[//]: #TODO: "There are no examples for this node (docs or workflows). Do we have any good examples, scenarios? Or should we leave it out of the course?"