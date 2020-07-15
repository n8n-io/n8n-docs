---
permalink: /nodes/n8n-nodes-base.mailjet
---

# Mailjet

[Mailjet](https://www.mailjet.com/) is a cloud-based email sending and tracking system. The platform allows professionals to send both marketing emails and transactional emails. It includes tools for designing emails, sending massive volumes and tracking these messages.

::: tip 🔑 Credentials
The instructions for authenticating with Mailjet are [here](../../../credentials/Mailjet/README.md).
:::

## Basic Operations

- Email
	- Send an email
	- Send an email template
- SMS
	- Send a SMS

## Example Usage

This workflow allows you to send an email using Mailjet. You can also find the [workflow](https://n8n.io/workflows/520) on this website. This example usage workflow uses the following two nodes.

- [Start](../../core-nodes/Start)
- [Mailjet]()

The final workflow should look like the following image.

![A workflow with the Mailjet node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Mailjet Node

1. First of all, you'll have to enter credentials for the Mailjet node. You can find out how to do that [here](../../../credentials/Mailjet/README.md).
2. Enter your email address in the *From Email* field.
3. Enter the recipient email address in the *To Email* field.
4. Enter the email address in the *Email* field.
5. Enter a subject for the email in the *Subject* field.
6. Enter your message in the *Text* field.
8. Click on *Execute Node* to run the workflow.
