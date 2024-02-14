---
title: Twist
description: Documentation for the Twist node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Twist

Use the Twist node to automate work in Twist, and integrate Twist with other applications. n8n has built-in support for a wide range of Twist features, including creating conversations in a channel, as well as creating and deleting comments on a thread. 

On this page, you'll find a list of operations the Twist node supports and links to more resources.

/// note | Credentials
Refer to [Twist credentials](/integrations/builtin/credentials/twist/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Twist integrations](https://n8n.io/integrations/twist/){:target="_blank" .external-link} list.
///

## Basic Operations

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


## FAQs

### Where can I get the User ID?

To get the User ID for a user follow the steps mentioned below
1. Click on the ***Team*** tab.
2. Click on a user's avatar.
3. Copy the string of characters located after `/u/` in your Twist URL. This string is the User ID. For example, if the URL is `https://twist.com/a/4qw45/people/u/475370` the User ID will be `475370`.

