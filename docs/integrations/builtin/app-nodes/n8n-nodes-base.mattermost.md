---
title: Mattermost node documentation
description: Learn how to use the Mattermost node in n8n. Follow technical documentation to integrate Mattermost node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Mattermost node

Use the Mattermost node to automate work in Mattermost, and integrate Mattermost with other applications. n8n has built-in support for a wide range of Mattermost features, including creating, deleting, and getting channels, and users, as well as posting messages, and adding reactions.

On this page, you'll find a list of operations the Mattermost node supports and links to more resources.

/// note | Credentials
Refer to [Mattermost credentials](/integrations/builtin/credentials/mattermost.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* Channel
    * Add a user to a channel
    * Create a new channel
    * Soft delete a channel
    * Get a page of members for a channel
    * Restores a soft deleted channel
    * Search for a channel
    * Get statistics for a channel
* Message
    * Soft delete a post, by marking the post as deleted in the database
    * Post a message into a channel
    * Post an ephemeral message into a channel
* Reaction
    * Add a reaction to a post.
    * Remove a reaction from a post
    * Get all the reactions to one or more posts
* User
    * Create a new user
    * Deactivates the user and revokes all its sessions by archiving its user object.
    * Retrieve all users
    * Get a user by email
    * Get a user by ID
    * Invite user to team


## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'mattermost') ]]

## Related resources

Refer to [Mattermost's documentation](https://api.mattermost.com/) for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

## Channel ID field error

If you're not the System Administrator, you might get an error: **there was a problem loading the parameter options from server: "Mattermost error response: You do not have the appropriate permissions.** next to the **Channel ID** field.

Ask your system administrator to grant you the `post:channel` permission.

## Find the channel ID

To find the channel ID in Mattermost:

1. Select the channel from the left sidebar.
2. Select the channel name at the top.
3. Select **View Info**.





