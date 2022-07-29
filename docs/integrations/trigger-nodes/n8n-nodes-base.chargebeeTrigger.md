# Chargebee Trigger

[Chargebee](https://www.chargebee.com/) is a billing platform for subscription based SaaS and eCommerce businesses. Chargebee integrates with payment gateways to let you automate recurring payment collection along with invoicing, taxes, accounting, email notifications, SaaS Metrics and customer management.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/chargebee/).



## Example Usage

This workflow allows you to receive updates for events in Chargebee. You can also find the [workflow](https://n8n.io/workflows/486) on the website. This example usage workflow would use the following node.

- [Chargebee Trigger]()

The final workflow should look like the following image.

![A workflow with the Chargebee Trigger node](/_images/integrations/trigger-nodes/chargebeetrigger/workflow.png)


### 1. Chargebee Trigger node

1. First of all, you'll have to add the webhook URL in Chargebee. You can find instructions on how to do that in the FAQs below.
2. Select the `*` option in the *Events* field to receive updates when any event is triggered.
3. Click on *Execute Node* to run the workflow.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Chargebee Trigger node.


## FAQs

### How do I add my webhook URL in Chargebee?
1. Open your Chargebee dashboard.
2. Click on "Settings".
3. Click on "Configure Chargebee".
4. Scroll down and click on "Webhooks".
5. Click on the *Add Webhook* button.
6. Enter the Webhook Name and the Webhook URL.
7. Click on the *Create* button.
