---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Slack
description: Documentation for the Slack node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Slack

Use the Slack node to automate work in Slack, and integrate Slack with other applications. n8n has built-in support for a wide range of Slack features, including creating, archiving, and closing channels, getting users and files, as well as deleting messages.
On this page, you'll find a list of operations the Slack node supports and links to more resources.

/// note | Credentials
Refer to [Slack credentials](/integrations/builtin/credentials/slack/) for guidance on setting up authentication. 
///

## Operations

* Channel
    * Archive
    * Close
    * Create
    * Get
    * Get many
    * History
    * Invite
    * Join
    * Kick
    * Leave
    * Member
    * Open
    * Rename
    * Replies
    * Sets purpose
    * Sets topic
    * Unarchive
* File
    * Get
    * Get many
    * Upload
* Message
    * Delete
    * Get permalink
    * Search
    * Send
    * Update
* Reaction
    * Add
    * Get
    * Remove
* Star
    * Add
    * Delete
    * Get many
* User
    * Get
	* Get many
    * Get user's status
	* Update user's profile
* User Group
    * Create
    * Disable
    * Enable
    * Get many
    * Update

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, slug) ]]

## Related resources

Refer to [Slack's documentation](https://api.slack.com/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
