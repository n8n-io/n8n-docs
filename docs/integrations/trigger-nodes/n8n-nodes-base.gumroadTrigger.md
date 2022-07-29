# Gumroad Trigger

[Gumroad](https://gumroad.com) is an online platform that enables creators to sell products directly to consumers.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/gumroad/).


## Example Usage

This workflow allows you to receive updates when a sale is made in Gumroad. You can also find the [workflow](https://n8n.io/workflows/650) on n8n.io. This example usage workflow would use the following node.

- [Gumroad Trigger]()

The final workflow should look like the following image.

![A workflow with the Gumroad Trigger node](/_images/integrations/trigger-nodes/gumroadtrigger/workflow.png)

### 1. Gumroad Trigger node

1. First of all, you'll have to enter credentials for the Gumroad Trigger node. You can find out how to do that [here](/integrations/credentials/gumroad/).
2. Select 'Sale' from the ***Resource*** dropdown list.
3. Click on ***Execute Node*** to run the node.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Gumroad Trigger node.

