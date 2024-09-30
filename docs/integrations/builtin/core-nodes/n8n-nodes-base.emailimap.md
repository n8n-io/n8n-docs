---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Email Trigger (IMAP) node documentation
description: Learn how to use the Email Trigger (IMAP) Trigger node in n8n. Follow technical documentation to integrate Email Trigger (IMAP) Trigger node into your workflows.
contentType: integration
priority: high
---

# Email Trigger (IMAP) node

Use the IMAP Email node to receive emails using an IMAP email server. This node is a trigger node.

/// note | Credential
You can find authentication information for this node [here](/integrations/builtin/credentials/imap/).
///

## Operations

- Receive an email

## Node parameters

Configure the node using the following parameters.

### Credential to connect with

Select or create an [IMAP credential](/integrations/builtin/credentials/imap/) to connect to the server with.

### Mailbox Name

Enter the mailbox from which you want to receive emails.

### Action

Choose whether you want an email marked as read when n8n receives it. **None** will leave it marked unread. **Mark as Read** will mark it as read.

### Download Attachments

This toggle controls whether to download email attachments (turned on) or not (turned off). Only set this if necessary, since it increases processing.

### Format

Choose the format to return the message in from these options:

* **RAW**: This format returns the full email message data with body content in the raw field as a base64url encoded string. It doesn't use the payload field.
* **Resolved**: This format returns the full email with all data resolved and attachments saved as binary data.
* **Simple**: This format returns the full email. Don't use it if you want to gather inline attachments.

## Node options

You can further configure the node using these **Options**.

### Custom Email Rules

Enter custom email fetching rules to determine which emails the node fetches.

Refer to [node-imap's search function criteria](https://github.com/mscdex/node-imap){:target=_blank .external-link} for more information.

### Force Reconnect Every Minutes

Set an interval in minutes to force reconnection.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'email-trigger-imap') ]]
