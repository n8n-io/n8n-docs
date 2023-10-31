---
title: Mandrill
description: Documentation for the Mandrill node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Mandrill

Use the Mandrill node to automate work in Mandrill, and integrate Mandrill with other applications. n8n supports sending messages based on templates or HTML with Mandrill.

On this page, you'll find a list of operations the Mandrill node supports and links to more resources.

!!! note "Credentials"
    Refer to [Mandrill credentials](/integrations/builtin/credentials/mandrill/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Mandrill integrations](https://n8n.io/integrations/mandrill/){:target="_blank" .external-link} list.


## Basic Operations

* Message
    * Send message based on template.
    * Send message based on HTML.

## Example Usage

This workflow allows you to send an email using a template via Mandrill. You can also find the [workflow](https://n8n.io/workflows/571) on this website. This example usage workflow uses the following two nodes.

- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Mandrill]()

The final workflow should look like the following image.

![A workflow with the Mandrill node](/_images/integrations/builtin/app-nodes/mandrill/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Mandrill node

1. First of all, you'll have to enter credentials for the Mandrill node. You can find out how to do that [here](/integrations/builtin/credentials/mandrill/).
2. Select the template you would like to use from the *Template* dropdown list.
3. Enter the email address from which you want to send the email in the *From Email* field.
4. Enter the recipient email address in the *To Email* field.
5. Click on *Execute Node* to run the workflow.





