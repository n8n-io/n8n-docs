---
title: Mattermost node - n8n Documentation
description: Documentation for the Mattermost node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Mattermost

[Mattermost](https://mattermost.org/) is an open-source, self-hostable online chat service with file sharing, search, and integrations. It is designed as an internal chat for organisations and companies.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/mattermost/).


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


## Related resources


Refer to [Mattermost's documentation](https://api.mattermost.com/){:target=_blank .external-link} for more information about the service.
	
View [example workflows and related content](https://n8n.io/integrations/mattermost/){:target=_blank .external-link} on n8n's website.

## Channel ID field error

If you're not the System Administrator, you might get an error: **there was a problem loading the parameter options from server: "Mattermost error response: You do not have the appropriate permissions.** next to the **Channel ID** field.

Ask your system administrator to grant you the `post:channel` permission.

## Find the channel ID

To find the channel ID in Mattermost:

1. Select the channel from the left sidebar.
2. Select the channel name at the top.
3. Select **View Info**.





