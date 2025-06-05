---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Send Email
description: Documentation for the Send Email node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: high
---

# Send Email

The Send Email node sends emails using an SMTP email server.

/// note | Credential
You can find authentication information for this node [here](/integrations/builtin/credentials/sendemail/index.md).
///

## Node parameters

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

Configure this node using the following parameters.

### Credential to connect with

Select or create an [SMTP account credential](/integrations/builtin/credentials/sendemail/index.md) for the node to use.

### Operation

The Send Email node supports the following operations:

* **Send**: Send an email.
* **Send and Wait for Response**: Send an email and wait for a response from the receiver. This operation pauses the workflow execution until the user submits a response.

Choosing **Send and Wait for Response** will activate parameters and options as discussed in [waiting for a response](#waiting-for-a-response).

### From Email

Enter the email address you want to send the email from. You can also include a name using this format: `Name Name <email@sample.com>`, for example: `Nathan Doe <nate@n8n.io>`.

### To Email

Enter the email address you want to send the email to. You can also include a name using this format: `Name Name <email@sample.com>`, for example: `Nathan Doe <nate@n8n.io>`.

### Subject

Enter the subject line for the email.

### Email Format

Select the format to send the email in. This parameter is available when using the **Send** operation. Choose from:

* **Text**: Send the email in plain-text format.
* **HTML**: Send the email in HTML format.
* **Both**: Send the email in both formats. If you choose this option, the email recipient's client will set which format to display.

## Node options

Use these **Options** to further refine the node's behavior.

### Append n8n Attribution

Set whether to include the phrase `This email was sent automatically with n8n` at the end of the email (turned on) or not (turned off).

### Attachments

Enter the name of the binary properties that contain data to add as an attachment. Some tips on using this option:

* Use the [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile.md) node or the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node to upload the file to your workflow.
* Add multiple attachments by entering a comma-separated list of binary properties.
* Reference embedded images or other content within the body of an email message, for example `<img src="cid:image_1">`.

### CC Email

Enter an email address for the `cc:` field.

### BCC Email

Enter an email address for the `bcc:` field.

### Ignore SSL Issues

Set whether n8n should ignore failures with TLS/SSL certificate validation (turned on) or enforce them (turned off).

### Reply To

Enter an email address for the Reply To field.

## Waiting for a response

By choosing the **Send and Wait for a Response** operation, you can send an email message and pause the workflow execution until a person confirms the action or provides more information.

### Response Type

You can choose between the following types of waiting and approval actions:

* **Approval**: Users can approve or disapprove from within the message.
* **Free Text**: Users can submit a response with a form.
* **Custom Form**: Users can submit a response with a custom form.

Different options are available depending on which type you choose.

### Approval parameters and options

When using the Approval response type, the following options are available:

* **Type of Approval**: Whether to present only an approval button or both an approval and disapproval buttons.
* **Button Label**: The label for the approval or disapproval button. The default choice is `Approve` and `Decline` for approval and disapproval actions respectively.
* **Button Style**: The style (primary or secondary) for the button.

This mode also offers the following options:

* **Limit Wait Time**: Whether the workflow will automatically resume execution after a specified time limit. This can be an interval or a specific wall time.
* **Append n8n Attribution**: Set whether to include the phrase `This email was sent automatically with n8n` at the end of the email (turned on) or not (turned off).

### Free Text parameters and options

When using the Free Text response type, the following options are available:

* **Message Button Label**: The label to use for message button. The default choice is `Respond`.
* **Response Form Title**: The title of the form where users provide their response.
* **Response Form Description**: A description for the form where users provide their response.
* **Response Form Button Label**: The label for the button on the form to submit their response. The default choice is `Submit`.
* **Limit Wait Time**: Whether the workflow will automatically resume execution after a specified time limit. This can be an interval or a specific wall time.
* **Append n8n Attribution**: Set whether to include the phrase `This email was sent automatically with n8n` at the end of the email (turned on) or not (turned off).

### Custom Form parameters and options

When using the Custom Form response type, you build a form using the fields and options you want.

You can customize each form element with the settings outlined in the [n8n Form trigger's form elements](/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md#form-elements). To add more fields, select the **Add Form Element** button.

The following options are also available:

* **Message Button Label**: The label to use for message button. The default choice is `Respond`.
* **Response Form Title**: The title of the form where users provide their response.
* **Response Form Description**: A description for the form where users provide their response.
* **Response Form Button Label**: The label for the button on the form to submit their response. The default choice is `Submit`.
* **Limit Wait Time**: Whether the workflow will automatically resume execution after a specified time limit. This can be an interval or a specific wall time.
* **Append n8n Attribution**: Set whether to include the phrase `This email was sent automatically with n8n` at the end of the email (turned on) or not (turned off).

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'send-email') ]]
