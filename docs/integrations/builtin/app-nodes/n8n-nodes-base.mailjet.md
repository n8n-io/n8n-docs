---
title: Mailjet node - n8n Documentation
description: Documentation for the Mailjet node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Mailjet

The Mailjet node allows you to automate work in Mailjet, and integrate Mailjet with other applications. n8n has built-in support for a wide range of Mailjet features, including sending emails, and sms. 

On this page, you'll find a list of operations the Mailjet node supports and links to more resources.

!!! note "Credentials"
    Refer to [Mailjet credentials](/integrations/builtin/credentials/mailjet/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Mailjet integrations](https://n8n.io/integrations/mailjet/){:target="_blank" .external-link} list.


## Basic Operations

* Email
    * Send a email
    * Send a email template
* SMS
    * Send a sms

## Example Usage

This workflow allows you to send an email using Mailjet. You can also find the [workflow](https://n8n.io/workflows/520) on this website. This example usage workflow uses the following two nodes.

- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Mailjet]()

The final workflow should look like the following image.

![A workflow with the Mailjet node](/_images/integrations/builtin/app-nodes/mailjet/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Mailjet node

1. First of all, you'll have to enter credentials for the Mailjet node. You can find out how to do that [here](/integrations/builtin/credentials/mailjet/).
2. Enter the email address from which you want to send the email in the *From Email* field.
3. Enter the recipient email address in the *To Email* field.
4. Enter the subject for the email in the *Subject* field.
5. Enter the content of the email in the *Text* field.
6. Click on *Execute Node* to run the workflow.

