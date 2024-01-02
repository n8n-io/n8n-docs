---
title: Mailgun
description: Documentation for the Mailgun node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Mailgun

Use the Mailgun node to automate work in Mailgun, and integrate Mailgun with other applications. n8n has built-in support for sending emails with Mailgun. 

On this page, you'll find a list of operations the Mailgun node supports and links to more resources.

/// note | Credentials
Refer to [Mailgun credentials](/integrations/builtin/credentials/mailgun/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Mailgun integrations](https://n8n.io/integrations/mailgun/){:target="_blank" .external-link} list.
///

## Basic Operations

- Send an email

## Example Usage

This workflow allows you to send an email using Mailgun. You can also find the [workflow](https://n8n.io/workflows/522) on this website. This example usage workflow uses the following two nodes.

- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Mailgun]()

The final workflow should look like the following image.

![A workflow with the Mailgun node](/_images/integrations/builtin/app-nodes/mailgun/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Mailgun node

1. First of all, you'll have to enter credentials for the Mailgun node. You can find out how to do that [here](/integrations/builtin/credentials/mailgun/).
2. Enter the email address from which you want to send the email in the *From Email* field.
3. Enter the recipient email in the *To Email* field.
4. Enter the subject for the email in the *Subject* field.
5. Enter the content of the email in the *Text* field.
6. Click on *Execute Node* to run the workflow.

