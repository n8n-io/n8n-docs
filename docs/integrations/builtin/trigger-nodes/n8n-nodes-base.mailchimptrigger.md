# Mailchimp Trigger

[Mailchimp](https://mailchimp.com/) is an integrated marketing platform that allows business owners to automate their email campaigns and track user engagement.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/mailchimp/).



## Example Usage

This workflow allows you to receive updates when Subscribe events occur in a MailChimp list. You can also find the [workflow](https://n8n.io/workflows/516) on the website. This example usage workflow would use the following node.

- [Mailchimp Trigger]()

The final workflow should look like the following image.

![A workflow with the Mailchimp Trigger node](/_images/integrations/builtin/trigger-nodes/mailchimptrigger/workflow.png)


### 1. Mailchimp Trigger node

1. First of all, you'll have to enter credentials for the Mailchimp Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/mailchimp/).
2. Select the list you want to listen to from the *List* dropdown list.
3. Select 'Subscribe' from the *Events* dropdown list.
4. Select 'API', 'Admin', and 'User' from the *Sources* dropdown list.
5. Click on *Execute Node* to run the workflow.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Mailchimp Trigger node.

