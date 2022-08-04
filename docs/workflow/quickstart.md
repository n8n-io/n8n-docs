---
title: Welcome to Workflow²
description: What is Workflow²? Workflow² helps you to connect any app with an API with any other, and manipulate its data with little or no code.
tags:
  - DOC²
  - Workflow
---

 

Go to **APPS** 
![APPS](/_images/workflows/workflows/WF_TryItOut_0.png)
and after activating Workflow² by clicking the button, go to **OPEN WORKFLOW²**

![Start](/_images/workflows/workflows/WF_TryItOut_1.png)


## Build your first workflow

For your first workflow, let's build something to take one tedious task off you plate: cleaning up a cluttered Gmail inbox.

1. Open the Nodes Panel by click the orange `+` sign, then search and find the [Gmail node](/workflow/integrations/nodes/workflow-nodes-base.gmail/). Click on it to add it to your canvas:
    ![Add Gmail node](/_images/quickstart/add_gmail_node.png)

2. When you add the Gmail node to the canvas, its configuration modal opens automatically:
    ![Gmail configuration modal](/_images/quickstart/gmail_config.png)

3. The first thing you need to do is configure your credentials so that Doc² can communicate with your Gmail account. You'll notice that the *OAuth2* method is selected by default for *Authentication*, so click the *Credentials* dropdown and select **Create New**. The new credentials modal appears:
    ![New Credentials modal](/_images/quickstart/credentials_modal.png)

4. Copy the *OAuth Callback URL* from this modal, then open a new browser tab and navigate to your [Google Cloud Console](https://console.cloud.google.com/) dashboard.

5. From your Google Cloud Console, perform the following:
    * Navigate to *APIs & Services* > *Credentials*.
    * Click *+ CREATE CREDENTIALS* and select *OAuth client ID*.
    * Select *Web Application* from the *Application type* dropdown.
    * Click *+Add URI* and enter the *OAuth Callback URL* you copied from Workflow².
    * Click *Create* to save your new credentials. A corresponding *Client ID* and *Client Secret* are now available. Copy these to use in Workflow².
    * Navigate to *APIs & Services* > *Library*, search for Gmail and select *Enable*.

    !!! note " Keep in mind"
        We go through a quick credential flow for Google in this example, but you can learn all about Doc² credentials for Google services [here](/workflow/integrations/credentials/google/).

6. Return to your Doc² tab and in the new credentials modal enter the *Client ID* and *Client Secret* obtained from your Google Cloud Console. A *Sign in with Google* button appears.
    ![Gmail Credentials modal](/_images/quickstart/credentials_modal2.png)

7. Click the *Sign in with Google* button. A modal appears asking you to select your Google account and **Allow** access.

8. Click **Save** to complete your Gmail credentials setup.

9. Configure your Gmail node as follows:
    ![Gmail node](/_images/quickstart/gmail_node.png)
    * *Resource*: Select **Message** as we will be looking through all messages to decide which we can clean up.
    * *Operation*: Select **Get All** since we want to fetch all messages, not any particular one.
    * *Return All*: Leave this enabled so that the node fetches all you messages, no matter how full your inbox is.
    * *Add Field* > *Format*: Select **IDs** so that we fetch only the message ID instead of its entire contents.
    * *Add Field* > *Query*: This is where we use [Gmail Search Operators](https://support.google.com/mail/answer/7190?hl=en) to find the messages we want to delete. Here we use `-in:chats unsubscribe` to identify all messages not in chats that contain the word "unsubscribe".

10. Next, let's add a [Split in Batches node](/workflow/integrations/core-nodes/workflow-nodes-base.splitInBatches/) after the Gmail node. This will break up the cleanup operation into chucks so avoid hitting any API rate limits. Let's configure it to use batches of 100 messages at a time:
    ![Split in Batches node](/_images/quickstart/batches_node.png)

11. Now let's add another Gmail node to perform the delete operation:
    ![Gmail node](/_images/quickstart/gmail_node2.png)
    * *Resource*: Select **Message** as we will be deleting any message passed to this node.
    * *Operation*: Select **Delete**.
    * *Message ID*: Use the gears button to enter an [expression](/workflow/code-examples/expressions/). This enables the ID of each message from the first Gmail node to be dynamically passed to this node. From the *Edit Expression* window, use the menu to find and select the message ID in the *Output Data*:
    ![Edit Expression](/_images/quickstart/expression_editor.png)

12. Lastly, let's ensure your nodes are properly connected in the workflow. The final result should look like this:

![Workflow](/_images/quickstart/workflow.png)

You've build your fist automation workflow and cleaned up a cluttered inbox in the process. Don't forget you can edit the query to find more messages to cleanup, and also set this workflow to run automatically using the [Cron node](/workflow/integrations/core-nodes/workflow-nodes-base.cron/).

## What's next?

Do you enjoy automating workflows? Here's what you can do next:

- See all Workflow² [nodes](/workflow/integrations/) and try out new workflows. Find more examples [here](/example/workflows/).
