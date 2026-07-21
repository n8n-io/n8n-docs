---
title: Gmail node Message Operations documentation
description: >-
  Learn how to use the Message Operations of the Gmail node in n8n. Follow
  technical documentation to integrate Message Operations into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Gmail node Message Operations documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations
layout:
  description:
    visible: false
---

# Gmail node Message Operations <a href="#gmail-node-message-operations" id="gmail-node-message-operations"></a>

Use the Message operations to send, reply to, delete, mark read or unread, add a label to, remove a label from, or get a message or get a list of messages in Gmail. Refer to the [Gmail node](README.md) for more information on the Gmail node itself.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/sYWM3IB0LEL4RkPx8ndF/" %}

## Add Label to a message <a href="#add-label-to-a-message" id="add-label-to-a-message"></a>

Use this operation to add one or more labels to a message.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Message**.
* **Operation**: Select **Add Label**.
* **Message ID**: Enter the ID of the message you want to add the label to.
* **Label Names or IDs**: Select the Label names you want to add or enter an expression to specify IDs. The dropdown populates based on the **Credential** you selected.


Refer to the [Gmail API Method: users.messages.modify](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/modify) documentation for more information.


## Delete a message <a href="#delete-a-message" id="delete-a-message"></a>

Use this operation to immediately and permanently delete a message.

{% hint style="info" %}
**Permanent deletion**

This operation can't be undone. For recoverable deletions, use the [Thread Trash operation](thread-operations.md#trash-a-thread) instead.
{% endhint %}

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Message**.
* **Operation**: Select **Delete**.
* **Message ID**: Enter the ID of the message you want to delete.

Refer to the [Gmail API Method: users.messages.delete](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/delete) documentation for more information.

## Get a message <a href="#get-a-message" id="get-a-message"></a>

Use this operation to get a single message.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Message**.
* **Operation**: Select **Get**.
* **Message ID**: Enter the ID of the message you wish to retrieve.
* **Simplify**: Choose whether to return a simplified version of the response (turned on) or the raw data (turned off). Default is on.
    * This is the same as setting the `format` for the API call to `metadata`, which returns email message IDs, labels, and email headers, including: From, To, CC, BCC, and Subject.

Refer to the [Gmail API Method: users.messages.get](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/get) documentation for more information.


## Get Many messages <a href="#get-many-messages" id="get-many-messages"></a>


Use this operation to get two or more messages.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Message**.
* **Operation**: Select **Get Many**.
* **Return All**: Choose whether the node returns all messages (turned on) or only up to a set limit (turned off).
* **Limit**: Enter the maximum number of messages to return. Only used if you've turned off **Return All**.
* **Simplify**: Choose whether to return a simplified version of the response (turned on) or the raw data (turned off). Default is on.
    * This is the same as setting the `format` for the API call to `metadata`, which returns email message IDs, labels, and email headers, including: From, To, CC, BCC, and Subject.


### Get Many messages filters <a href="#get-many-messages-filters" id="get-many-messages-filters"></a>


Use these filters to further refine the node's behavior:

* **Include Spam and Trash**: Select whether the node should get messages in the Spam and Trash folders (turned on) or not (turned off).
* **Label Names or IDs**: Only return messages with the selected labels added to them. Select the Label names you want to apply or enter an expression to specify IDs. The dropdown populates based on the **Credential** you selected.
* **Search**: Enter Gmail search refine filters, like `from:`, to filter the messages returned. Refer to [Refine searches in Gmail](https://support.google.com/mail/answer/7190?hl=en) for more information.
* **Read Status**: Choose whether to receive **Unread and read emails**, **Unread emails only** (default), or **Read emails only**.
* **Received After**: Return only those emails received after the specified date and time. Use the date picker to select the day and time or enter an expression to set a date as a string in ISO format or a timestamp in milliseconds. Refer to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) for more information on formatting the string.
* **Received Before**: Return only those emails received before the specified date and time. Use the date picker to select the day and time or enter an expression to set a date as a string in ISO format or a timestamp in milliseconds. Refer to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) for more information on formatting the string.
* **Sender**: Enter an email or a part of a sender name to return messages from only that sender.

Refer to the [Gmail API Method: users.messages.list](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/list) documentation for more information.

## Mark as Read <a href="#mark-as-read" id="mark-as-read"></a>

Use this operation to mark a message as read.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Message**.
* **Operation**: Select **Mark as Read**.
* **Message ID**: Enter the ID of the message you wish to mark as read.


Refer to the [Gmail API Method: users.messages.modify](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/modify) documentation for more information.


## Mark as Unread <a href="#mark-as-unread" id="mark-as-unread"></a>

Use this operation to mark a message as unread.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Message**.
* **Operation**: Select **Mark as Unread**.
* **Message ID**: Enter the ID of the message you wish to mark as unread.


Refer to the [Gmail API Method: users.messages.modify](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/modify) documentation for more information.


## Remove Label from a message <a href="#remove-label-from-a-message" id="remove-label-from-a-message"></a>

Use this operation to remove one or more labels from a message.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Message**.
* **Operation**: Select **Remove Label**.
* **Message ID**: Enter the ID of the message you want to remove the label from.
* **Label Names or IDs**: Select the Label names you want to remove or enter an expression to specify IDs. The dropdown populates based on the **Credential** you selected.


Refer to the [Gmail API Method: users.messages.modify](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/modify) documentation for more information.


## Reply to a message <a href="#reply-to-a-message" id="reply-to-a-message"></a>

Use this operation to send a message as a reply to an existing message.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Message**.
* **Operation**: Select **Reply**.
* **Message ID**: Enter the ID of the message you want to reply to.
* Select the **Email Type**. Choose from **Text** or **HTML**.
* **Message**: Enter the email message body.

### Reply options <a href="#reply-options" id="reply-options"></a>

Use these options to further refine the node's behavior:

* **Append n8n attribution**: By default, the node appends the statement `This email was sent automatically with n8n` to the end of the email. To remove this statement, turn this option off.
* **Attachments**: Select **Add Attachment** to add an attachment. Enter the **Attachment Field Name (in Input)** to identify which field from the input node contains the attachment.
    * For multiple properties, enter a comma-separated list.
* **BCC**: Enter one or more email addresses for blind copy recipients. Separate multiple email addresses with a comma, for example `jay@gatsby.com, jon@smith.com`.
* **CC**: Enter one or more email addresses for carbon copy recipients. Separate multiple email addresses with a comma, for example `jay@gatsby.com, jon@smith.com`.
* **Sender Name**: Enter the name you want displayed in your recipients' email as the sender.
* **Reply to Sender Only**: Choose whether to reply all (turned off) or reply to the sender only (turned on).

Refer to the [Gmail API Method: users.messages.send](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send) documentation for more information.

## Send a message <a href="#send-a-message" id="send-a-message"></a>

Use this operation to send a message.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Message**.
* **Operation**: Select **Send**.
* **To**: Enter the email address you want the email sent to.
* **Subject**: Enter the subject line.
* Select the **Email Type**. Choose from **Text** or **HTML**.
* **Message**: Enter the email message body.

### Send options <a href="#send-options" id="send-options"></a>

Use these options to further refine the node's behavior:

* **Append n8n attribution**: By default, the node appends the statement `This email was sent automatically with n8n` to the end of the email. To remove this statement, turn this option off.
* **Attachments**: Select **Add Attachment** to add an attachment. Enter the **Attachment Field Name (in Input)** to identify which field from the input node contains the attachment.
    * For multiple properties, enter a comma-separated list.
* **BCC**: Enter one or more email addresses for blind copy recipients. Separate multiple email addresses with a comma, for example `jay@gatsby.com, jon@smith.com`.
* **CC**: Enter one or more email addresses for carbon copy recipients. Separate multiple email addresses with a comma, for example `jay@gatsby.com, jon@smith.com`.
* **Sender Name**: Enter the name you want displayed in your recipients' email as the sender.
* **Send Replies To**: Enter an email address to set as the reply to address.
* **Reply to Sender Only**: Choose whether to reply all (turned off) or reply to the sender only (turned on).

Refer to the [Gmail API Method: users.messages.send](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send) documentation for more information.

## Send a message and wait for approval <a href="#send-a-message-and-wait-for-approval" id="send-a-message-and-wait-for-approval"></a>

Use this operation to send a message and wait for approval from the recipient before continuing the workflow execution.

{% hint style="info" %}
**Use Wait for complex approvals**

The **Send and Wait for Approval** operation is well-suited for simple approval processes. For more complex approvals, consider using the [Wait node](../../core-nodes/n8n-nodes-base.wait.md).
{% endhint %}

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Message**.
* **Operation**: Select **Send and Wait for Approval**.
* **To**: Enter the email address you want the email sent to.
* **Subject**: Enter the subject line.
* **Message**: Enter the email message body.

### Send and wait for approval options <a href="#send-and-wait-for-approval-options" id="send-and-wait-for-approval-options"></a>

Use these options to further refine the node's behavior:

* **Type of Approval**: Choose **Approve Only** (default) to include only an approval button or **Approve and Disapprove** to also include a disapproval option.
* **Approve Button Label**: The label to use for the approval button (**Approve** by default).
* **Approve Button Style**: Whether to style the approval button as a **Primary** (default) or **Secondary** button.
* **Disapprove Button Label**: The label to use for the disapproval button (**Decline** by default). Only visible when you set **Type of Approval** to **Approve and Disapprove**.
* **Disapprove Button Style**: Whether to style the disapproval button as a **Primary** or **Secondary** (default) button. Only visible when you set **Type of Approval** to **Approve and Disapprove**.
* **Show Confirmation Page**: Whether the response link opens a page where the responder confirms their choice, instead of recording the response as soon as the link opens. Refer to [Show confirmation page](#show-confirmation-page) below for more information.
* **Advanced Email Options**: Whether to set more email fields such as CC, BCC, sender name, and reply threading. Refer to [Advanced email options](#advanced-email-options) below for more information.

{% hint style="info" %}
**No Google-side setup**

**Show Confirmation Page** and **Advanced Email Options** work with your existing [Google credential](../../credentials/google/README.md), whether you connect with OAuth2 or a service account. There's nothing to configure on Google's side, before or after turning them on.
{% endhint %}

#### Show confirmation page

When you turn on **Show Confirmation Page**, the approval link in the email opens a page showing the request and a single confirmation button. n8n records the response—and resumes the workflow—when the responder presses that button, not when the link opens.

The extra click protects the approval from automation. Email security tools open links in incoming email automatically to scan them, which can record a response before anyone reads the message. With the confirmation page on, opening the link only displays the page: n8n records a response only when a person presses the button.

How the page behaves:

* The button on the page repeats the choice the responder selected in the email, using your **Approve Button Label** or **Disapprove Button Label**. To pick the other option, the responder returns to the email and selects the other link.
* Once someone responds, the links stop working: anyone opening them later sees a page saying the request already has a response.

With **Show Confirmation Page** off, the node behaves as before: opening the approval link records the response directly.

#### Advanced email options

Turning on **Advanced Email Options** lets you address the approval email like a regular email:

* **To**: Accepts more than one recipient. Separate addresses with a comma.
* **CC** / **BCC**: The email addresses of the copy and blind copy recipients. Separate multiple addresses with a comma.
* **Reply in Thread**: The ID of a Gmail conversation to send the message in, instead of starting a new one. Useful for keeping recurring approvals in a single conversation. n8n takes the email subject from the thread and ignores the **Subject** field.
* **Send Replies To**: The email address that receives the reply when a recipient answers the email instead of using the approval link.
* **Sender Name**: The name displayed in recipients' inboxes alongside your Gmail address.

{% hint style="info" %}
**The first response wins**

All recipients—including CC and BCC—receive the same response links. The workflow resumes with the first response; anyone responding later sees a page saying the request already has a response.
{% endhint %}

#### What the approval email can't do

Gmail's interactive email features (Gmail Actions and AMP for Email) are only available to senders registered with Google, which rules out some things the chat-based **Send and Wait** nodes can do:

* **No buttons inside the email**: Approvers always follow a link; they can't respond from within the message itself.
* **No record of who responded**: An email link carries no identity, so the node's output tells you the decision, not who made it.
* **The sent email can't be changed**: Unlike a chat message, n8n can't edit the email after a decision to show the outcome or remove the links.

If you need in-message buttons or the responder's identity, use the [Slack](../n8n-nodes-base.slack.md) or [Telegram](../n8n-nodes-base.telegram/message-operations.md) **Send and Wait** operations instead.

Refer to the [Gmail API Method: users.messages.send](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send) documentation for more information.

## Common issues <a href="#common-issues" id="common-issues"></a>

For common errors or issues and suggested resolution steps, refer to [Common Issues](common-issues.md).
