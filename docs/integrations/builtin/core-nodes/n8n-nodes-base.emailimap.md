---
title: Email Trigger (IMAP) node documentation
description: >-
  Learn how to use the Email Trigger (IMAP) Trigger node in n8n. Follow
  technical documentation to integrate Email Trigger (IMAP) Trigger node into
  your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Email Trigger (IMAP) node documentation
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.emailimap.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.emailimap'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.emailimap'
layout:
  description:
    visible: false
---

# Email Trigger (IMAP) node <a href="#email-trigger-imap-node" id="email-trigger-imap-node"></a>

Use the IMAP Email node to receive emails using an IMAP email server. This node is a trigger node.

{% hint style="info" %}
**Credential**

You can find authentication information for this node [here](../credentials/imap/README.md).
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

- Receive an email

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Configure the node using the following parameters.

### Credential to connect with <a href="#credential-to-connect-with" id="credential-to-connect-with"></a>

Select or create an [IMAP credential](../credentials/imap/README.md) to connect to the server with.

### Mailbox Name <a href="#mailbox-name" id="mailbox-name"></a>

Enter the mailbox from which you want to receive emails.

### Action <a href="#action" id="action"></a>

Choose whether you want an email marked as read when n8n receives it. **None** will leave it marked unread. **Mark as Read** will mark it as read.

### Download Attachments <a href="#download-attachments" id="download-attachments"></a>

This toggle controls whether to download email attachments (turned on) or not (turned off). Only set this if necessary, since it increases processing.

### Format <a href="#format" id="format"></a>

Choose the format to return the message in from these options:

* **RAW**: This format returns the full email message data with body content in the raw field as a base64url encoded string. It doesn't use the payload field.
* **Resolved**: This format returns the full email with all data resolved and attachments saved as binary data.
* **Simple**: This format returns the full email. Don't use it if you want to gather inline attachments.

## Node options <a href="#node-options" id="node-options"></a>

You can further configure the node using these **Options**.

### Custom Email Rules <a href="#custom-email-rules" id="custom-email-rules"></a>

Enter custom email fetching rules to determine which emails the node fetches.

Refer to [node-imap's search function criteria](https://github.com/mscdex/node-imap) for more information.

### Force Reconnect Every Minutes <a href="#force-reconnect-every-minutes" id="force-reconnect-every-minutes"></a>

Set an interval in minutes to force reconnection.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Email Trigger (IMAP) node documentation integration templates](https://n8n.io/integrations/email-trigger-imap) or [search all templates](https://n8n.io/workflows/)
