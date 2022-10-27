# Invoice Ninja Trigger

[Invoice Ninja](https://www.invoiceninja.com/) is a free open-source online invoicing app for freelancers & businesses. It offers invoicing, payments, expense tracking, & time-tasks.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/invoiceNinja/).



## Example Usage

This workflow allows you to receive updates when new invoices are created in Invoice Ninja. You can also find the [workflow](https://n8n.io/workflows/535) on the website. This example usage workflow would use the following node.

- [Invoice Ninja Trigger]()

The final workflow should look like the following image.

![A workflow with the Invoice Ninja Trigger node](/_images/integrations/builtin/trigger-nodes/invoiceninjatrigger/workflow.png)


### 1. Invoice Ninja Trigger node

1. First of all, you'll have to enter credentials for the Invoice Ninja Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/invoiceNinja/).
2. Select the 'Invoice Created' option from the *Event* dropdown list to receive updates when a new invoice is created.
3. Click on *Execute Node* to run the workflow.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Invoice Ninja Trigger node.

