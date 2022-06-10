# AWS SES

[AWS SES](https://aws.amazon.com/ses/) is a cost-effective, flexible, and scalable email service that enables developers to send mail from within any application.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/aws/).


## Basic Operations

* Custom Verification Email
    * Create a new custom verification email template
    * Delete an existing custom verification email template
    * Get the custom email verification template
    * Get all the existing custom verification email templates for your account
    * Add an email address to the list of identities
    * Update an existing custom verification email template.
* Email
    * Send
    * Send Template
* Template
    * Create a template
    * Delete a template
    * Get a template
    * Get all templates
    * Update a template

## Example Usage

This workflow allows you to send an email using AWS SES. You can also find the [workflow](https://n8n.io/workflows/507) on the website. This example usage workflow would use the following two nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [AWS SES]()

The final workflow should look like the following image.

![A workflow with the AWS SES node](/_images/integrations/nodes/awsses/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. AWS SNS node

1. First of all, you'll have to enter credentials for the AWS SES node. You can find out how to do that [here](/workflow/integrations/credentials/aws/).
2. Enter a subject for your email in the *Subject* field.
3. Enter your message in the *Body* field.
4. Enter the email address from which you want to send the email in the *From Email* field.
5. Click on the *Add To Email* button and add your recipient email addresses.
6. Click on *Execute Node* to run the workflow.




