# PayPal Trigger

[PayPal](https://paypal.com) is a digital payment service that supports online fund transfers that customers can use when shopping online.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/payPal/).


## Example Usage

This workflow allows you to receive updates when a billing plan is activated in PayPal. You can also find the [workflow](https://n8n.io/workflows/653) on n8n.io. This example usage workflow would use the following node.
- [PayPal Trigger]()

The final workflow should look like the following image.

![A workflow with the PayPal Trigger node](/_images/integrations/trigger-nodes/paypaltrigger/workflow.png)

### 1. PayPal Trigger node

1. First of all, you'll have to enter credentials for the PayPal Trigger node. You can find out how to do that [here](/workflow/integrations/credentials/payPal/).
2. Select 'Billing Plan Activated' from the ***Events*** dropdown list.
3. Click on ***Execute Node*** to run the node.

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the PayPal Trigger node.

