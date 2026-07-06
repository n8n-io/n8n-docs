---
title: Gmail node Draft Operations documentation
description: >-
  Learn how to use the Draft Operations of the Gmail node in n8n. Follow
  technical documentation to integrate Draft Operations into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Gmail node Draft Operations documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.gmail/draft-operations.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/draft-operations
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/draft-operations
layout:
  description:
    visible: false
---

# Gmail node Draft Operations <a href="#gmail-node-draft-operations" id="gmail-node-draft-operations"></a>

Use the Draft operations to create, delete, or get a draft or list drafts in Gmail. Refer to the [Gmail node](README.md) for more information on the Gmail node itself.

## Create a draft <a href="#create-a-draft" id="create-a-draft"></a>

Use this operation to create a new draft.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Draft**.
* **Operation**: Select **Create**.
* **Subject**: Enter the subject line.
* Select the **Email Type**. Choose from **Text** or **HTML**.
* **Message**: Enter the email message body.

### Create draft options <a href="#create-draft-options" id="create-draft-options"></a>

Use these options to further refine the node's behavior:

* **Attachments**: Select **Add Attachment** to add an attachment. Enter the **Attachment Field Name (in Input)** to identify which field from the input node contains the attachment.
    * For multiple properties, enter a comma-separated list.
* **BCC**: Enter one or more email addresses for blind copy recipients. Separate multiple email addresses with a comma, for example `jay@gatsby.com, jon@smith.com`.
* **CC**: Enter one or more email addresses for carbon copy recipients. Separate multiple email addresses with a comma, for example `jay@gatsby.com, jon@smith.com`.
* **From Alias Name or ID**: Select an alias to send the draft from. This field populates based on the credential you selected in the parameters.
* **Send Replies To**: Enter an email address to set as the reply to address.
* **Thread ID**: If you want this draft attached to a thread, enter the ID for that thread.
* **To Email**: Enter one or more email addresses for recipients. Separate multiple email addresses with a comma, for example `jay@gatsby.com, jon@smith.com`.

Refer to the [Gmail API Method: users.drafts.create](https://developers.google.com/gmail/api/reference/rest/v1/users.drafts/create) documentation for more information.

## Delete a draft <a href="#delete-a-draft" id="delete-a-draft"></a>

Use this operation to delete a draft.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Draft**.
* **Operation**: Select **Delete**.
* **Draft ID**: Enter the ID of the draft you wish to delete.

Refer to the [Gmail API Method: users.drafts.delete](https://developers.google.com/gmail/api/reference/rest/v1/users.drafts/delete) documentation for more information.

## Get a draft <a href="#get-a-draft" id="get-a-draft"></a>

Use this operation to get a single draft.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Draft**.
* **Operation**: Select **Get**.
* **Draft ID**: Enter the ID of the draft you wish to get information about.

### Get draft options <a href="#get-draft-options" id="get-draft-options"></a>

Use these options to further refine the node's behavior:

* **Attachment Prefix**: Enter a prefix for the name of the binary property the node should write any attachments to. n8n adds an index starting with `0` to the prefix. For example, if you enter `attachment_' as the prefix, the first attachment saves to 'attachment_0'.
* **Download Attachments**: Select whether the node should download the draft's attachments (turned on) or not (turned off).

Refer to the [Gmail API Method: users.drafts.get](https://developers.google.com/gmail/api/reference/rest/v1/users.drafts/get) documentation for more information.


## Get Many drafts <a href="#get-many-drafts" id="get-many-drafts"></a>


Use this operation to get two or more drafts.

Enter these parameters:

* Select the **Credential to connect with** or create a new one.
* **Resource**: Select **Draft**.
* **Operation**: Select **Get Many**.
* **Return All**: Choose whether the node returns all drafts (turned on) or only up to a set limit (turned off).
* **Limit**: Enter the maximum number of drafts to return. Only used if you've turned off **Return All**.


### Get Many drafts options <a href="#get-many-drafts-options" id="get-many-drafts-options"></a>


Use these options to further refine the node's behavior:

* **Attachment Prefix**: Enter a prefix for the name of the binary property the node should write any attachments to. n8n adds an index starting with `0` to the prefix. For example, if you enter `attachment_' as the prefix, the first attachment saves to 'attachment_0'.
* **Download Attachments**: Select whether the node should download the draft's attachments (turned on) or not (turned off).
* **Include Spam and Trash**: Select whether the node should get drafts in the Spam and Trash folders (turned on) or not (turned off).

Refer to the [Gmail API Method: users.drafts.list](https://developers.google.com/gmail/api/reference/rest/v1/users.drafts/list) documentation for more information.

## Common issues <a href="#common-issues" id="common-issues"></a>

For common errors or issues and suggested resolution steps, refer to [Common Issues](common-issues.md).
