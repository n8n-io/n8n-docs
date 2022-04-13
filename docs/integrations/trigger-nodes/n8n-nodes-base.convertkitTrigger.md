# ConvertKit Trigger

[ConvertKit](https://www.convertkit.com/) is a fully-featured email marketing platform. ConvertKit can be used to build an email list, send email broadcasts, automate sequences, create segments, and build landing pages.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/convertKit/).


## Example Usage

This workflow allows you to receive updates when a subscriber is added through a form in ConvertKit. You can also find the [workflow](https://n8n.io/workflows/644) on n8n.io. This example usage workflow would use the following node.
- [ConvertKit Trigger]()

The final workflow should look like the following image.

![A workflow with the ConvertKit Trigger node](/_images/integrations/trigger-nodes/convertkittrigger/workflow.png)

### 1. ConvertKit Trigger node

1. First of all, you'll have to enter credentials for the ConvertKit Trigger node. You can find out how to do that [here](/integrations/credentials/convertKit/).
2. Select 'Form Subscribe' from the ***Event*** dropdown list.
3. Select the form from the ***Form ID*** dropdown list.
4. Click on ***Execute Node*** to run the node.

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the ConvertKit Trigger node.

