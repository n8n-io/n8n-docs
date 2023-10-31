---
title: sms77
description: Documentation for the sms77 node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# sms77

Use the sms77 node to automate work in sms77, and integrate sms77 with other applications. n8n has built-in support for a wide range of sms77 features, including sending SMS, and converting text to voice. 

On this page, you'll find a list of operations the sms77 node supports and links to more resources.

!!! note "Credentials"
    Refer to [sms77 credentials](/integrations/builtin/credentials/sms77/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [sms77 integrations](https://n8n.io/integrations/sms77/){:target="_blank" .external-link} list.


## Basic Operations

* SMS
    * Send SMS
* Voice Call
    * Converts text to voice and calls a given number

## Example Usage

This workflow allows you to send an SMS to a specified phone number from any phone number. You can also find the [workflow](https://n8n.io/workflows/469) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [sms77]()

The final workflow should look like the following image.

![A workflow with the sms77 node](/_images/integrations/builtin/app-nodes/sms77/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. sms77 node

1. First of all, you'll have to enter credentials for the sms77 node. You can find out how to do that [here](/integrations/builtin/credentials/sms77/).
2. Enter the phone number from which you'll be sending the message in the *From* field.
3. Enter the phone number to which you'll be sending the message in the *To* field.
4. Enter you message in the *Message* field.
5. Click on *Execute Node* to run the workflow.

