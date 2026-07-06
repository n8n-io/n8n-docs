---
title: Twist node documentation
description: >-
  Learn how to use the Twist node in n8n. Follow technical documentation to
  integrate Twist node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Twist node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.twist.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.twist'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.twist'
layout:
  description:
    visible: false
---

# Twist node <a href="#twist-node" id="twist-node"></a>

Use the Twist node to automate work in Twist, and integrate Twist with other applications. n8n has built-in support for a wide range of Twist features, including creating conversations in a channel, as well as creating and deleting comments on a thread. 

On this page, you'll find a list of operations the Twist node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Twist credentials](../credentials/twist.md) for guidance on setting up authentication.
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

* Channel
    * Archive a channel
    * Initiates a public or private channel-based conversation
    * Delete a channel
    * Get information about a channel
    * Get all channels
    * Unarchive a channel
    * Update a channel
* Comment
    * Create a new comment to a thread
    * Delete a comment
    * Get information about a comment
    * Get all comments
    * Update a comment
* Message Conversation
    * Create a message in a conversation
    * Delete a message in a conversation
    * Get a message in a conversation
    * Get all messages in a conversation
    * Update a message in a conversation
* Thread
    * Create a new thread in a channel
    * Delete a thread
    * Get information about a thread
    * Get all threads
    * Update a thread

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Twist node documentation integration templates](https://n8n.io/integrations/twist) or [search all templates](https://n8n.io/workflows/)

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/96ifDzfcUuwOyYrubZUt/" %}

## Get the User ID <a href="#get-the-user-id" id="get-the-user-id"></a>

To get the User ID for a user:

1. Open the **Team** tab.
2. Select a user's avatar.
3. Copy the string of characters located after `/u/` in your Twist URL. This string is the User ID. For example, if the URL is `https://twist.com/a/4qw45/people/u/475370` the User ID is `475370`.

