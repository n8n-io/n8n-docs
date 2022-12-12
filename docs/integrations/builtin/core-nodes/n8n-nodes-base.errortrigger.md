# Error Trigger

You can use the Error Trigger node to create error workflows. When another linked workflow fails, this node gets details about the failed workflow and the errors, and runs the error workflow.

## Usage

1. Create a new workflow, with the Error Trigger as the first node. 
2. Give the workflow a name, for example `Error Handler`. 
3. Select **Save**.
4. In the workflow where you want to use this error workflow:
	1. Select **Options** <span class="inline-image">![Options menu icon](/_images/common-icons/three-dot-options-menu.png)</span> > **Settings**.
	2. In **Error workflow**, select the workflow you just created. For example, if you used the name Error Handler, select **Error handler**.
	3. Select **Save**.
	Now, when this workflow errors, the related error workflow runs.


Note the following:

* If a workflow uses the Error Trigger node, you don't have to activate the workflow.
* If a workflow contains the Error Trigger node, by default, the workflow uses itself as the error workflow.
* You can't test error workflows when running workflows manually. The Error Trigger only runs when an automatic workflow errors.

## Related resources

You can use the [Stop And Error](/integrations/builtin/core-nodes/n8n-nodes-base.stopanderror/) node to send custom messages to the Error Trigger.

Read more about [Error handling](/flow-logic/error-handling/) in n8n workflows.
