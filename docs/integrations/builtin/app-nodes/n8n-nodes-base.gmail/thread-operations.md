---
title: Gmail node Thread Operations documentation
description: Learn how to use the Thread Operations of the Gmail node in n8n. Follow technical documentation to integrate Thread Operations into your workflows.
contentType: [integration, reference]
priority: high
---

# Gmail node Thread Operations

Use the Thread operations to delete, reply to, trash, untrash, add/remove labels, get one, or list threads. Refer to the [Gmail node](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/index.md) for more information on the Gmail node itself.

## Add Label to a thread

Use this operation to create a new draft.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Thread**.
* **Operation**: Select **Add Label**.
* **Thread ID**: Enter the ID of the thread you want to add the label to.
* **Label Names or IDs**: Select the Label names you want to apply or enter an expression to specify IDs. The dropdown populates based on the **Credential** you selected.

<!-- vale off -->
Refer to the [Gmail API Method: users.threads.modify](https://developers.google.com/gmail/api/reference/rest/v1/users.threads/modify) documentation for more information.
<!-- vale on -->

## Delete a thread

Use this operation to immediately and permanently delete a thread and all its messages.

/// note | Permanent deletion
This operation can't be undone. For recoverable deletions, use the [Trash operation](#trash-a-thread) instead.
///

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Thread**.
* **Operation**: Select **Delete**.
* **Thread ID**: Enter the ID of the thread you want to delete.

Refer to the [Gmail API Method: users.threads.delete](https://developers.google.com/gmail/api/reference/rest/v1/users.threads/delete) documentation for more information.

## Get a thread

Use this operation to get a single thread.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Thread**.
* **Operation**: Select **Get**.
* **Thread ID**: Enter the ID of the thread you wish to retrieve.
* **Simplify**: Choose whether to return a simplified version of the response (turned on) or the raw data (turned off). Default is on.
    * This is the same as setting the `format` for the API call to `metadata`, which returns email message IDs, labels, and email headers, including: From, To, CC, BCC, and Subject.

### Get thread options

Use these options to further refine the node's behavior:

* **Return Only Messages**: Choose whether to return only thread messages (turned on).

Refer to the [Gmail API Method: users.threads.get](https://developers.google.com/gmail/api/reference/rest/v1/users.threads/get) documentation for more information.

<!-- vale off -->
## Get Many threads
<!-- vale on -->

Use this operation to get two or more threads.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Thread**.
* **Operation**: Select **Get Many**.
* **Return All**: Choose whether the node returns all threads (turned on) or only up to a set limit (turned off).
* **Limit**: Enter the maximum number of threads to return. Only used if you've turned off **Return All**.

<!-- vale off -->
### Get Many threads filters
<!-- vale on -->

Use these filters to further refine the node's behavior:

* **Include Spam and Trash**: Select whether the node should get threads in the Spam and Trash folders (turned on) or not (turned off).
* **Label Names or IDs**: Only return threads with the selected labels added to them. Select the Label names you want to apply or enter an expression to specify IDs. The dropdown populates based on the **Credential** you selected.
* **Search**: Enter Gmail search refine filters, like `from:`, to filter the threads returned. Refer to [Refine searches in Gmail](https://support.google.com/mail/answer/7190?hl=en) for more information.
* **Read Status**: Choose whether to receive **Unread and read emails**, **Unread emails only** (default), or **Read emails only**.
* **Received After**: Return only those emails received after the specified date and time. Use the date picker to select the day and time or enter an expression to set a date as a string in ISO format or a timestamp in milliseconds. Refer to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) for more information on formatting the string.
* **Received Before**: Return only those emails received before the specified date and time. Use the date picker to select the day and time or enter an expression to set a date as a string in ISO format or a timestamp in milliseconds. Refer to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) for more information on formatting the string.

Refer to the [Gmail API Method: users.threads.list](https://developers.google.com/gmail/api/reference/rest/v1/users.threads/list) documentation for more information.

## Remove label from a thread

Use this operation to remove a label from a thread.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Thread**.
* **Operation**: Select **Remove Label**.
* **Thread ID**: Enter the ID of the thread you want to remove the label from.
* **Label Names or IDs**: Select the Label names you want to remove or enter an expression to specify their IDs. The dropdown populates based on the **Credential** you selected.

<!-- vale off -->
Refer to the [Gmail API Method: users.threads.modify](https://developers.google.com/gmail/api/reference/rest/v1/users.threads/modify) documentation for more information.
<!-- vale on -->

## Reply to a message

Use this operation to reply to a message.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Thread**.
* **Operation**: Select **Reply**.
* **Thread ID**: Enter the ID of the thread you want to reply to.
* **Message Snippet or ID**: Select the Message you want to reply to or enter an expression to specify its ID. The dropdown populates based on the **Credential** you selected.
* Select the **Email Type**. Choose from **Text** or **HTML**.
* **Message**: Enter the email message body.

### Reply options

Use these options to further refine the node's behavior:

* **Attachments**: Select **Add Attachment** to add an attachment. Enter the **Attachment Field Name (in Input)** to identify which field from the input node contains the attachment.
    * For multiple properties, enter a comma-separated list.
* **BCC**: Enter one or more email addresses for blind copy recipients. Separate multiple email addresses with a comma, for example `jay@gatsby.com, jon@smith.com`.
* **CC**: Enter one or more email addresses for carbon copy recipients. Separate multiple email addresses with a comma, for example `jay@gatsby.com, jon@smith.com`.
* **Sender Name**: Enter the name you want displayed in your recipients' email as the sender.
* **Reply to Sender Only**: Choose whether to reply all (turned off) or reply to the sender only (turned on).

Refer to the [Gmail API Method: users.messages.send](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send) documentation for more information.

## Trash a thread

Use this operation to move a thread and all its messages to the trash.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Thread**.
* **Operation**: Select **Trash**.
* **Thread ID**: Enter the ID of the thread you want to move to the trash.

Refer to the [Gmail API Method: users.threads.trash](https://developers.google.com/gmail/api/reference/rest/v1/users.threads/trash) documentation for more information.

## Untrash a thread

Use this operation to recover a thread and all its messages from the trash.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Thread**.
* **Operation**: Select **Untrash**.
* **Thread ID**: Enter the ID of the thread you want to move to the trash.

Refer to the [Gmail API Method: users.threads.untrash](https://developers.google.com/gmail/api/reference/rest/v1/users.threads/untrash) documentation for more information.

## Common issues

For common errors or issues and suggested resolution steps, refer to [Common Issues](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/common-issues.md).
