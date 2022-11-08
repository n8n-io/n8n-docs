# Zendesk Trigger

[Zendesk](https://www.zendesk.com/) is a support ticketing system, designed to help track, prioritize, and solve customer support interactions. More than just a help desk, Zendesk Support helps nurture customer relationships with personalized, responsive support across any channel.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/zendesk/).


## Example Usage

This workflow allows you to receive updates for support in Zendesk. You can also find the [workflow](https://n8n.io/workflows/648) on n8n.io. This example usage workflow would use the following node.

- [Zendesk Trigger]()

The final workflow should look like the following image.

![A workflow with the Zendesk Trigger node](/_images/integrations/builtin/trigger-nodes/zendesktrigger/workflow.png)

### 1. Zendesk Trigger node

1. First of all, you'll have to enter credentials for the Zendesk Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/zendesk/).
2. Click on the ***Add Condition*** button and select 'All' from the dropdown list.
3. Select 'Open' from the ***Value*** dropdown list.
4. Click on ***Execute Node*** to run the node.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Zendesk Trigger node.

