---
title: Email trigger (IMAP)
description: Documentation for the Email trigger (IMAP) node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Email trigger (IMAP)

Use the IMAP Email node to receive emails using an IMAP email server. This node is a trigger node.

/// note | Credential
You can find authentication information for this node [here](/integrations/builtin/credentials/imap/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Email Trigger (IMAP) integrations](https://n8n.io/integrations/email-trigger-imap/){:target=_blank .external-link} page.
///

## Operations

- Receive an email

## Node parameters

* **Credential to connect with**: Select or create an [IMAP credential](/integrations/builtin/credentials/imap/) to connect to the server with.
* **Mailbox Name**: Enter the mailbox from which you want to receive emails.
* **Action**: Choose whether you want an email marked as read when n8n receives it. **None** will leave it marked unread. **Mark as Read** will mark it as read.
* **Download Attachments**: This toggle controls whether email attachments are downloaded (turned on) or not (turned off). Only set this if necessary, since it increases processing.
* **Format**: Choose the format to return the message in from these options:
    * **RAW**: This format returns the full email message data with body content in the raw field as a base64url encoded string. It doesn't use the payload field.
    * **Resolved**: This format returns the full email with all data resolved and attachments saved as binary data.
    * **Simple**: This format returns the full email. Don't use it if you want to gather inline attachments.

## Node options

* **Custom Email Rules**: Enter custom email fetching rules to determine which emails are fetched. Refer to [node-imap's search function criteria](https://github.com/mscdex/node-imap){:target=_blank .external-link} for more information.
* **Force Reconnect Every Minutes**: Set an interval in minutes to force reconnection.
