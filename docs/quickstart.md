# Try it out

This page will help you get up and running with n8n, taking you from installation to building and executing your first workflow.

To ensure you can follow along with the steps below, be sure to first:

* Download and install [Docker Desktop](https://docs.docker.com/get-docker/)
    * Linux users, you'll have to install [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) individually
* [Register](https://discord.com/register) for a Discord account

!!! note "n8n desktop app"
    Install our [desktop app](/hosting/installation/desktop-app/) if you want to start faster and skip a technical setup. 


## Install n8n

1. Now that your have Docker installed, let's start by pulling the latest n8n image. Open your Terminal window and run:
    ```sh
    docker pull n8nio/n8n
    ```

    ![Terminal window for Docker pull command](/_images/quickstart/docker_pull.png)

2. Open the Docker Desktop application and select **Images** from the left-hand pane. The n8n image downloaded above should be visible here:

    ![Docker Desktop images view](/_images/quickstart/docker_desktop_image.png)

3. Click **Run** and a modal window appears with some **Optional Settings**:
    * **Container Name**: Enter a name for your n8n container. If left blank Docker will generate a random name for you.
    * **Ports**
        * **Local Host**: Enter `5678`. This is the port on your local machine where n8n will be available once running.
        * **Container Port**: The default container port for n8n. Cannot be edited.
    * **Volumes**:
        * **Host Path**: Select a local directory that will be available to your n8n Docker application. Here we use a folder `n8n` located on the `/Desktop`.
        * **Container Path**: Provide the path of that directory where it will be accessible from inside the Docker container. Here we use `/n8n`.

    ![Docker optional settings](/_images/quickstart/image_settings.png)

4. Click **Run** to start your n8n container. 

You can now access n8n by navigating your browser to `localhost:5678`.

## Build your first workflow

For your first workflow, let's build something to take one tedious task off you plate: cleaning up a cluttered Gmail inbox.

!!! note "Keep in mind"
    You can find this complete workflow [here](https://n8n.io/workflows/1153) courtesy of n8n's own [Tephlon](https://t5n.xyz/).


1. Open the Nodes Panel by click the orange `+` sign, then search and find the [Gmail node](/integrations/nodes/n8n-nodes-base.gmail/). Click on it to add it to your canvas:
    ![Add Gmail node](/_images/quickstart/add_gmail_node.png)

2. When you add the Gmail node to the canvas, its configuration modal opens automatically:
    ![Gmail configuration modal](/_images/quickstart/gmail_config.png)

3. The first thing you need to do is configure your credentials so that n8n can communicate with your Gmail account. You'll notice that the *OAuth2* method is selected by default for *Authentication*, so click the *Credentials* dropdown and select **Create New**. The new credentials modal appears:
    ![New Credentials modal](/_images/quickstart/credentials_modal.png)

4. Copy the *OAuth Callback URL* from this modal, then open a new browser tab and navigate to your [Google Cloud Console](https://console.cloud.google.com/) dashboard.

5. From your Google Cloud Console, perform the following:
    * Navigate to *APIs & Services* > *Credentials*.
    * Click *+ CREATE CREDENTIALS* and select *OAuth client ID*.
    * Select *Web Application* from the *Application type* dropdown.
    * Click *+Add URI* and enter the *OAuth Callback URL* you copied from n8n.
    * Click *Create* to save your new credentials. A corresponding *Client ID* and *Client Secret* are now available. Copy these to use in n8n.
    * Navigate to *APIs & Services* > *Library*, search for Gmail and select *Enable*.

    !!! note "Keep in mind"
        We go through a quick credential flow for Google in this example, but you can learn all about n8n credentials for Google services [here](/integrations/credentials/google/).

6. Return to your n8n tab and in the new credentials modal enter the *Client ID* and *Client Secret* obtained from your Google Cloud Console. A *Sign in with Google* button appears.
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

10. Next, let's add a [Split in Batches node](/integrations/core-nodes/n8n-nodes-base.splitInBatches/) after the Gmail node. This will break up the cleanup operation into chucks so avoid hitting any API rate limits. Let's configure it to use batches of 100 messages at a time:
    ![Split in Batches node](/_images/quickstart/batches_node.png)

11. Now let's add another Gmail node to perform the delete operation:
    ![Gmail node](/_images/quickstart/gmail_node2.png)
    * *Resource*: Select **Message** as we will be deleting any message passed to this node.
    * *Operation*: Select **Delete**.
    * *Message ID*: Use the gears button to enter an [expression](/code-examples/expressions/). This enables the ID of each message from the first Gmail node to be dynamically passed to this node. From the *Edit Expression* window, use the menu to find and select the message ID in the *Output Data*:
    ![Edit Expression](/_images/quickstart/expression_editor.png)

12. Lastly, let's ensure your nodes are properly connected in the workflow. The final result should look like this:

![Workflow](/_images/quickstart/workflow.png)

You've build your fist automation workflow and cleaned up a cluttered inbox in the process. Don't forget you can edit the query to find more messages to cleanup, and also set this workflow to run automatically using the [Cron node](/integrations/core-nodes/n8n-nodes-base.cron/).

## What's next?

Do you enjoy automating workflows? Here's what you can do next:

- See all n8n [nodes](/integrations/) and try out new workflows.
- Check out the [hosting](/hosting/) section to learn more about options for installing and running n8n.
- Read our [blog](https://n8n.io/blog/) and discover what others are doing with n8n.