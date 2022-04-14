# Box Trigger

[Box](https://www.box.com/) is a cloud computing company which provides file sharing, collaborating, and other tools for working with files that are uploaded to its servers.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/box/).



## Example Usage

This workflow allows you to receive updates when events occur in Box. You can also find the [workflow](https://n8n.io/workflows/560) on the website. This example usage workflow would use the following node.
- [Box Trigger]()

The final workflow should look like the following image.

![A workflow with the Box Trigger node](/_images/integrations/trigger-nodes/boxtrigger/workflow.png)


### 1. Box Trigger node

1. First of all, you'll have to enter credentials for the Box Trigger node. You can find out how to do that [here](/integrations/credentials/box/).
2. Select the events for which you want to receive updates for from the *Events* dropdown list.
3. Select the type of item that will trigger an update from the *Target Type* dropdown list.
4. Enter the target ID of the file/folder to be monitored for updates in the *Target ID* field.
5. Click on *Execute Node* to run the workflow.

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Box Trigger node.


## FAQs

### How do I find my Target ID in Box?
1. Open the file/folder that you would like to monitor.
2. Copy the string of charatcters after `folder/` in your URL. This is the target ID. For example, if the URL is `https://app.box.com/folder/12345`, then `12345` is the target ID.
3. Paste it in the *Target ID* field in n8n.
