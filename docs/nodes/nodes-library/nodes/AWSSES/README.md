---
permalink: /nodes/n8n-nodes-base.awsSes
description: Learn how to use the AWS SES node in n8n
---

# AWS SES

[AWS SES](https://aws.amazon.com/ses/) is a cost-effective, flexible, and scalable email service that enables developers to send mail from within any application.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/AWS/README.md).
:::

## Basic Operations

::: details Email
- Send Email
- Send Template
:::

::: details Template
- Create a template
- Delete a template
- Get a template
- Get all templates
- Update a template
:::

## Example Usage

This workflow allows you to send an email using AWS SES. You can also find the [workflow](https://n8n.io/workflows/507) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [AWS SES]()

The final workflow should look like the following image.

![A workflow with the AWS SES node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. AWS SNS node

1. First of all, you'll have to enter credentials for the AWS SES node. You can find out how to do that [here](../../../credentials/AWS/README.md).
2. Enter a subject for your email in the *Subject* field.
3. Enter your message in the *Body* field.
4. Enter the email address from which you want to send the email in the *From Email* field.
5. Click on the *Add To Email* button and add your recipient email addresses.
6. Click on *Execute Node* to run the workflow.

## Further Reading

<FurtherReadingBlog node="AWS SES" />
