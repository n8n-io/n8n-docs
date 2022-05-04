# Workflow 3 – Monitoring workflow errors

To accomplish this task, you have to create an Error workflow that monitors the main workflow.

1. Add an Error Trigger node (and execute it as a test).
2. To the Error Trigger node, connect a Discord node and configure the fields:<br/>

	* Webhook URL: The URL that you received in the email from n8n when you signed up for this course.
	* Text: The workflow `{workflow name}` failed, with the error message: `{execution error message}`. Last node executed: `{name of the last executed node}`. Check this workflow execution here: `{execution URL}`.

		Note that you need to replace the text in curly brackets `{}` with expressions that take the respective information from the Error Trigger node.<br/>

3. Execute the Discord node.
4. Set the newly created workflow as Error Workflow for the main workflow.

The workflow should look like this:

<figure><img src="/_images/courses/level-two/chapter-five/workflow3.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow 3 for monitoring workflow errors</i></figcaption></figure>

!!! question "Quiz questions"

    * What fields does the Error Trigger node return?
    * What information about the execution does the Error Trigger node return?
    * What information about the workflow does the Error Trigger node return?
    * What is the expression to reference the workflow name?
