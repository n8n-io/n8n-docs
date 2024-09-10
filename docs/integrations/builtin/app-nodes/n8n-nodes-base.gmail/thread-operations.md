---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Gmail node Thread Operations documentation
description: Learn how to use the Thread Operations of the Gmail node in n8n. Follow technical documentation to integrate Thread Operations into your workflows.
contentType: integration
priority: high
---

# Gmail node Thread Operations

Use the Thread operations to delete, reply to, trash, untrash, add/remove labels, get one, or list threads. Refer to the [Gmail node](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/) for more information on the Gmail node itself.

## Add Label to a thread

Use this operation to create a new draft.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Thread**.
* **Operation**: Select **Add Label**.
* **Thread ID**: Enter the ID of the thread you want to add the label to.
* **Label Names or IDs**: Select the Label names you want to apply or enter an expression to specify IDs. The dropdown populates based on the **Credential** you selected.

Refer to the [Gmail API Method: users.threads.modify](https://developers.google.com/gmail/api/reference/rest/v1/users.threads/modify){:target=_blank .external-link} documentation for more information.

## Delete a thread

Use this operation to immediately and permanently delete a thread and all its messages. This operation can't be undone. For recoverable deletions, use the Trash operation instead.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Thread**.
* **Operation**: Select **Delete**.
* **Thread ID**: Enter the ID of the thread you want to delete.

Refer to the [Gmail API Method: users.threads.delete](https://developers.google.com/gmail/api/reference/rest/v1/users.threads/delete){:target=_blank .external-link} documentation for more information.

## Get a thread

Use this operation to get a single thread.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Thread**.
* **Operation**: Select **Get**.
* **Thread ID**: Enter the ID of the thread you wish to retrieve.
* **Simplify**: Choose whether to return a simplified version of the response (turned on) or the raw data (turned off). Default is on.
    * This is the same as setting the `format` for the API call to `metadata`, which returns email message IDs, labels, and email headers, including: From, To, Cc, Bcc, and Subject.

### Get thread options

Use these options to further refine the node's behavior:

* **Return Only Messages**: Choose whether to return only thread messages (turned on).

Refer to the [Gmail API Method: users.threads.get](https://developers.google.com/gmail/api/reference/rest/v1/users.threads/get){:target=_blank .external-link} documentation for more information.

<!-- TODO: PICK UP HERE-->

## Get Many drafts

Use this operation to get two or more drafts.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Draft**.
* **Operation**: Select **Get Many**.
* **Return All**: Choose whether the node returns all drafts (turned on) or only up to a set limit (turned off).
* **Limit**: Enter the maximum number of drafts to return. Only used if **Return All** is turned off.

### Get Many drafts options

Use these options to further refine the node's behavior:

* **Attachment Prefix**: Enter a prefix for the name of the binary property the node should write any attachments to. n8n adds an index starting with `0` to the prefix. So if you enter `attachment_' as the prefix, the first attachment saves to 'attachment_0'.
* **Download Attachments**: Select whether the node should download the draft's attachments (turned on) or not (turned off).
* **Include Spam and Trash**: Select whether the node should get drafts in the Spam and Trash folders (turned on) or not (turned off).

Refer to the [Gmail API Method: users.drafts.list](https://developers.google.com/gmail/api/reference/rest/v1/users.drafts/list){:target=_blank .external-link} documentation for more information.