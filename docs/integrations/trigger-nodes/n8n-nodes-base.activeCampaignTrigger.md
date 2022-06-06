# ActiveCampaign Trigger

[ActiveCampaign](https://www.activecampaign.com/) is a cloud software platform for small-to-mid-sized business. The company offers software for customer experience automation, which combines the email marketing, marketing automation, sales automation, and CRM categories.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/activeCampaign/).



## Example Usage

This workflow allows you to receive updates when a new account is added by an admin in ActiveCampaign. You can also find the [workflow](https://n8n.io/workflows/488) on the website. This example usage workflow would use the following node.
- [ActiveCampaign Trigger]()

The final workflow should look like the following image.

![A workflow with the ActiveCampaign Trigger node](/_images/integrations/trigger-nodes/activecampaigntrigger/workflow.png)


### 1. ActiveCampaign Trigger node

1. First of all, you'll have to enter credentials for the ActiveCampaign Trigger node. You can find out how to do that [here](/integrations/credentials/activeCampaign/).
2. Select 'account_add' from the *Events* dropdown list.
3. Select 'Admin' from the *Source* dropdown list.
4. Click on *Execute Node* to run the workflow.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the ActiveCampaign Trigger node.

