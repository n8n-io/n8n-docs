---
title: Zulip
description: Documentation for the Zulip node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Zulip

The Zulip node allows you to automate work in Zulip, and integrate Zulip with other applications. n8n has built-in support for a wide range of Zulip features, including creating, deleting, and getting users and streams, as well as sending messages. 

On this page, you'll find a list of operations the Zulip node supports and links to more resources.

!!! note "Credentials"
    Refer to [Zulip credentials](/integrations/builtin/credentials/zulip/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Zulip integrations](https://n8n.io/integrations/zulip/){:target="_blank" .external-link} list.


## Basic Operations

* Message
    * Delete a message
    * Get a message
    * Send a private message
    * Send a message to stream
    * Update a message
    * Upload a file
* Stream
    * Create a stream.
    * Delete a stream.
    * Get all streams.
    * Get subscribed streams.
    * Update a stream.
* User
    * Create a user.
    * Deactivate a user.
    * Get a user.
    * Get all users.
    * Update a user.

## Example Usage

This workflow allows you to send a private message on Zulip. You can also find the [workflow](https://n8n.io/workflows/498) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Zulip]()

The final workflow should look like the following image.

![A workflow with the Zulip node](/_images/integrations/builtin/app-nodes/zulip/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Zulip node

1. First of all, you'll have to enter credentials for the Zulip node. You can find out how to do that [here](/integrations/builtin/credentials/zulip/).
2. Select the user you want to send a private message to from the *To* dropdown list.
3. Type the message you want to post in the *Content* field.
4. Click on *Execute Node* to run the workflow.

