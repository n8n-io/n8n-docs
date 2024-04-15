---
contentType: tutorial
---

# Workflow 3: Monitoring workflow errors

Last but not least, let's help Nathan know if there are any errors running the workflow.

To accomplish this task, create an Error workflow that monitors the main workflow:

1. Create a new workflow.
2. Add an **Error Trigger node** (and execute it as a test).
3. Connect a **Discord node** to the **Error Trigger node** and configure these fields:<br/>

	* **Webhook URL**: The Discord URL that you received in the email from n8n when you signed up for this course.
	* **Text**: "The workflow `{workflow name}` failed, with the error message: `{execution error message}`. Last node executed: `{name of the last executed node}`. Check this workflow execution here: `{execution URL}` My Unique ID: " followed by the unique ID emailed to you when you registered for this course.

		Note that you need to replace the text in curly brackets `{}` with expressions that take the respective information from the Error Trigger node.<br/>

4. Execute the Discord node.
5. Set the newly created workflow as the **Error Workflow** for the main workflow you created in the previous lesson.

The workflow should look like this:

<figure><img src="/_images/courses/level-two/chapter-five/workflow3.png" alt="Workflow 3 for monitoring workflow errors" style="width:100%"><figcaption align = "center"><i>Workflow 3 for monitoring workflow errors</i></figcaption></figure>

/// question | Quiz questions
* What fields does the **Error Trigger node** return?
* What information about the execution does the **Error Trigger node** return?
* What information about the workflow does the **Error Trigger node** return?
* What's the expression to reference the workflow name?
///
