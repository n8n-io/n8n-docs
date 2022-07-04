# Mailgun

[Mailgun](https://www.mailgun.com/) is a developer-friendly email sending platform that provides API-based email services that are easy to use.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/mailgun/).


## Basic Operations

- Send an email

## Example Usage

This workflow allows you to send an email using Mailgun. You can also find the [workflow](https://n8n.io/workflows/522) on this website. This example usage workflow uses the following two nodes.

- [Start](/workflow/integrations/core-nodes/workflow-nodes-base.start/)
- [Mailgun]()

The final workflow should look like the following image.

![A workflow with the Mailgun node](/_images/integrations/nodes/mailgun/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Mailgun node

1. First of all, you'll have to enter credentials for the Mailgun node. You can find out how to do that [here](/workflow/integrations/credentials/mailgun/).
2. Enter the email address from which you want to send the email in the *From Email* field.
3. Enter the recipient email in the *To Email* field.
4. Enter the subject for the email in the *Subject* field.
5. Enter the content of the email in the *Text* field.
6. Click on *Execute Node* to run the workflow.
