---
title: Send Email
description: >-
  Documentation for the Send Email node in n8n, a workflow automation platform.
  Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Send Email
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.sendemail.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.sendemail'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.sendemail'
layout:
  description:
    visible: false
---

# Send Email <a href="#send-email" id="send-email"></a>

The Send Email node sends emails using an SMTP email server.

{% hint style="info" %}
**Credential**

You can find authentication information for this node [here](../credentials/send-email/README.md).
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

Configure this node using the following parameters.

### Credential to connect with <a href="#credential-to-connect-with" id="credential-to-connect-with"></a>

Select or create an [SMTP account credential](../credentials/send-email/README.md) for the node to use.

### Operation <a href="#operation" id="operation"></a>

The Send Email node supports the following operations:

* **Send**: Send an email.
* **Send and Wait for Response**: Send an email and wait for a response from the receiver. This operation pauses the workflow execution until the user submits a response.

Choosing **Send and Wait for Response** will activate parameters and options as discussed in [waiting for a response](#waiting-for-a-response).

### From Email <a href="#from-email" id="from-email"></a>

Enter the email address you want to send the email from. You can also include a name using this format: `Name Name <email@sample.com>`, for example: `Nathan Doe <nate@n8n.io>`.

### To Email <a href="#to-email" id="to-email"></a>

Enter the email address you want to send the email to. You can also include a name using this format: `Name Name <email@sample.com>`, for example: `Nathan Doe <nate@n8n.io>`. Use a comma to separate multiple email addresses: `first@sample.com, "Name" <second@sample.com>`.

{% hint style="info" %}
**Email Format**

This email format also applies to the CC and BCC fields.
{% endhint %}

### Subject <a href="#subject" id="subject"></a>

Enter the subject line for the email.

### Email Format <a href="#email-format" id="email-format"></a>

Select the format to send the email in. This parameter is available when using the **Send** operation. Choose from:

* **Text**: Send the email in plain-text format.
* **HTML**: Send the email in HTML format.
* **Both**: Send the email in both formats. If you choose this option, the email recipient's client will set which format to display.

## Node options <a href="#node-options" id="node-options"></a>

Use these **Options** to further refine the node's behavior.

### Append n8n Attribution <a href="#append-n8n-attribution" id="append-n8n-attribution"></a>

Set whether to include the phrase `This email was sent automatically with n8n` at the end of the email (turned on) or not (turned off).

### Attachments <a href="#attachments" id="attachments"></a>

Enter the name of the binary properties that contain data to add as an attachment. Some tips on using this option:

* Use the [Read/Write Files from Disk](n8n-nodes-base.readwritefile.md) node or the [HTTP Request](n8n-nodes-base.httprequest/README.md) node to upload the file to your workflow.
* Add multiple attachments by entering a comma-separated list of binary properties.
* Reference embedded images or other content within the body of an email message, for example `<img src="cid:image_1">`.

### CC Email <a href="#cc-email" id="cc-email"></a>

Enter an email address for the `cc:` field.

### BCC Email <a href="#bcc-email" id="bcc-email"></a>

Enter an email address for the `bcc:` field.

### Ignore SSL Issues <a href="#ignore-ssl-issues" id="ignore-ssl-issues"></a>

Set whether n8n should ignore failures with TLS/SSL certificate validation (turned on) or enforce them (turned off).

### Reply To <a href="#reply-to" id="reply-to"></a>

Enter an email address for the Reply To field.

## Waiting for a response <a href="#waiting-for-a-response" id="waiting-for-a-response"></a>

By choosing the **Send and Wait for a Response** operation, you can send an email message and pause the workflow execution until a person confirms the action or provides more information.

### Response Type <a href="#response-type" id="response-type"></a>

You can choose between the following types of waiting and approval actions:

* **Approval**: Users can approve or disapprove from within the message.
* **Free Text**: Users can submit a response with a form.
* **Custom Form**: Users can submit a response with a custom form.

Different options are available depending on which type you choose.

### Approval parameters and options <a href="#approval-parameters-and-options" id="approval-parameters-and-options"></a>

When using the Approval response type, the following options are available:

* **Type of Approval**: Whether to present only an approval button or both an approval and disapproval buttons.
* **Button Label**: The label for the approval or disapproval button. The default choice is `Approve` and `Decline` for approval and disapproval actions respectively.
* **Button Style**: The style (primary or secondary) for the button.

This mode also offers the following options:

* **Limit Wait Time**: Whether the workflow will automatically resume execution after a specified time limit. This can be an interval or a specific wall time.
* **Append n8n Attribution**: Set whether to include the phrase `This email was sent automatically with n8n` at the end of the email (turned on) or not (turned off).

### Free Text parameters and options <a href="#free-text-parameters-and-options" id="free-text-parameters-and-options"></a>

When using the Free Text response type, the following options are available:

* **Message Button Label**: The label to use for message button. The default choice is `Respond`.
* **Response Form Title**: The title of the form where users provide their response.
* **Response Form Description**: A description for the form where users provide their response.
* **Response Form Button Label**: The label for the button on the form to submit their response. The default choice is `Submit`.
* **Limit Wait Time**: Whether the workflow will automatically resume execution after a specified time limit. This can be an interval or a specific wall time.
* **Append n8n Attribution**: Set whether to include the phrase `This email was sent automatically with n8n` at the end of the email (turned on) or not (turned off).

### Custom Form parameters and options <a href="#custom-form-parameters-and-options" id="custom-form-parameters-and-options"></a>

When using the Custom Form response type, you build a form using the fields and options you want.

You can customize each form element with the settings outlined in the [n8n Form trigger's form elements](n8n-nodes-base.formtrigger.md#form-elements). To add more fields, select the **Add Form Element** button.

The following options are also available:

* **Message Button Label**: The label to use for message button. The default choice is `Respond`.
* **Response Form Title**: The title of the form where users provide their response.
* **Response Form Description**: A description for the form where users provide their response.
* **Response Form Button Label**: The label for the button on the form to submit their response. The default choice is `Submit`.
* **Limit Wait Time**: Whether the workflow will automatically resume execution after a specified time limit. This can be an interval or a specific wall time.
* **Append n8n Attribution**: Set whether to include the phrase `This email was sent automatically with n8n` at the end of the email (turned on) or not (turned off).

## Limitations <a href="#limitations" id="limitations"></a>

The Send Email (SMTP) node does not support setting headers like `In-Reply-To` and `References`, which are required for email threading. As a result, each email is treated as a new conversation instead of appearing in the same thread.

* **Workaround**: Use the Gmail node’s **Reply to a message** operation, or a custom node that supports custom headers.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Send Email integration templates](https://n8n.io/integrations/send-email) or [search all templates](https://n8n.io/workflows/)
