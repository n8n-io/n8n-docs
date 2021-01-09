---
description: Learn how to use the Mailgun node in n8n
---

# Mailgun

[Mailgun](https://www.mailgun.com/) is a developer-friendly email sending platform that provides API-based email services that are easy to use.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Mailgun/README.md).
:::

## Basic Operations

- Send an email

## Example Usage

This workflow allows you to send an email using Mailgun. You can also find the [workflow](https://n8n.io/workflows/522) on this website. This example usage workflow uses the following two nodes.

- [Start](../../core-nodes/Start)
- [Mailgun]()

The final workflow should look like the following image.

![A workflow with the Mailgun node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Mailgun node

1. First of all, you'll have to enter credentials for the Mailgun node. You can find out how to do that [here](../../../credentials/Mailgun/README.md).
2. Enter the email address from which you want to send the email in the *From Email* field.
3. Enter the recipient email in the *To Email* field.
4. Enter the subject for the email in the *Subject* field.
5. Enter the content of the email in the *Text* field.
6. Click on *Execute Node* to run the workflow.
