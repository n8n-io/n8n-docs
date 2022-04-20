# Mailjet Trigger

[Mailjet](https://www.mailjet.com/) is a cloud-based email sending and tracking system. The platform allows professionals to send both marketing emails and transactional emails. It includes tools for designing emails, sending massive volumes and tracking these messages.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/mailjet/).



## Example Usage

This workflow allows you to receive updates when emails are sent in Mailjet. You can also find the [workflow](https://n8n.io/workflows/521) on the website. This example usage workflow would use the following node.
- [Mailjet Trigger]()

The final workflow should look like the following image.

![A workflow with the Mailjet Trigger node](/_images/integrations/trigger-nodes/mailjettrigger/workflow.png)


### 1. Mailjet Trigger node

1. First of all, you'll have to enter credentials for the Mailjet Trigger node. You can find out how to do that [here](/workflow/integrations/credentials/mailjet/).
2. Select the `email.sent` option from the *Event* dropdown list to receive updates when an email is sent.
3. Click on *Execute Node* to run the workflow.

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Mailjet Trigger node.

