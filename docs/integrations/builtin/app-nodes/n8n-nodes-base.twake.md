---
title: Twake
description: Documentation for the Twake node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Twake

Use the Twake node to automate work in Twake, and integrate Twake with other applications. n8n supports sending messages with Twake.

On this page, you'll find a list of operations the Twake node supports and links to more resources.

!!! note "Credentials"
    Refer to [Twake credentials](/integrations/builtin/credentials/twake/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Twake integrations](https://n8n.io/integrations/twake/){:target="_blank" .external-link} list.


## Basic Operations

* Message
    * Send a message


## Example Usage

This workflow allows you to send a message to a channel on Twake. You can also find the [workflow](https://n8n.io/workflows/595) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Twake]()

The final workflow should look like the following image.

![A workflow with the Twake node](/_images/integrations/builtin/app-nodes/twake/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Twake node

1. First of all, you'll have to enter credentials for the Twake node. You can find out how to do that [here](/integrations/builtin/credentials/twake/).
2. Select the channel from the ***Channel ID*** dropdown list.
3. Enter the content of the message in the ***Content*** field.
4. Click on ***Execute Node*** to run the node.

![Using the Twake node to send a message](/_images/integrations/builtin/app-nodes/twake/twake_node.png)

