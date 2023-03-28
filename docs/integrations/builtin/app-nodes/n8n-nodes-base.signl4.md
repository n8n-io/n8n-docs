---
title: SIGNL4
description: Documentation for the SIGNL4 node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# SIGNL4

The SIGNL4 node allows you to automate work in SIGNL4, and integrate SIGNL4 with other applications. n8n supports sending and resolving alerts with SIGNL4.

On this page, you'll find a list of operations the SIGNL4 node supports and links to more resources.

!!! note "Credentials"
    Refer to [SIGNL4 credentials](/integrations/builtin/credentials/signl4/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [SIGNL4 integrations](https://n8n.io/integrations/signl4/){:target="_blank" .external-link} list.


## Basic Operations

* Alert
    * Send an alert
    * Resolve an alert

## Example Usage

This workflow allows you to send an alert on SIGNL4. You can also find the [workflow](https://n8n.io/workflows/441) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [SIGNL4]()

The final workflow should look like the following image.

![A workflow with the SIGNL4 node](/_images/integrations/builtin/app-nodes/signl4/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. SIGNL4 node

1. First of all, you'll have to enter credentials for the SIGNL4 node. You can find out how to do that [here](/integrations/builtin/credentials/signl4/).
2. Enter a message in the *Message* field.
3. Click on the *Add Field* button and select 'Title'.
4. Enter a title in the *Title* field.
5. Click on *Execute Node* to run the workflow.

