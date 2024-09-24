---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Twist node documentation
description: Learn how to use the Twist node in n8n. Follow technical documentation to integrate Twist node into your workflows.
contentType: integration
---

# Twist node

Use the Twist node to automate work in Twist, and integrate Twist with other applications. n8n has built-in support for a wide range of Twist features, including creating conversations in a channel, as well as creating and deleting comments on a thread. 

On this page, you'll find a list of operations the Twist node supports and links to more resources.

/// note | Credentials
Refer to [Twist credentials](/integrations/builtin/credentials/twist/) for guidance on setting up authentication. 
///

## Operations

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

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'twist') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

## Get the User ID

To get the User ID for a user:

1. Open the **Team** tab.
2. Select a user's avatar.
3. Copy the string of characters located after `/u/` in your Twist URL. This string is the User ID. For example, if the URL is `https://twist.com/a/4qw45/people/u/475370` the User ID is `475370`.

