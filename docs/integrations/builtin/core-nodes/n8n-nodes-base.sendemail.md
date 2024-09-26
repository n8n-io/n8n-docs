---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Send Email
description: Documentation for the Send Email node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
priority: high
---

# Send Email

The Send Email node sends emails using an SMTP email server.

/// note | Credential
You can find authentication information for this node [here](/integrations/builtin/credentials/sendemail/).
///

## Node parameters

Configure this node using the following parameters.

### Credential to connect with

Select or create an [SMTP account credential](/integrations/builtin/credentials/sendemail/) for the node to use.

### From Email

Enter the email address you want to send the email from. You can also include a name using this format: `Name Name <email@sample.com>`, for example: `Nathan Doe <nate@n8n.io>`.

### To Email

Enter the email address you want to send the email to. You can also include a name using this format: `Name Name <email@sample.com>`, for example: `Nathan Doe <nate@n8n.io>`.

### Subject

Enter the subject line for the email.

### Email Format

Select the format to send the email in. Choose from:

* **Text**: Send the email in plain-text format.
* **HTML**: Send the email in HTML format.
* **Both**: Send the email in both formats. If you choose this option, the email recipient's client will set which format to display.

## Node options

Use these **Options** to further refine the node's behavior.

### Append n8n Attribution

Set whether to include the phrase `This email was sent automatically with n8n` at the end of the email (turned on) or not (turned off).

### Attachments

Enter the name of the binary properties that contain data to add as an attachment. Some tips on using this option:

* Use the [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile/) node or the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node to upload the file to your workflow.
* Add multiple attachments by entering a comma-separated list of binary properties.
* Reference embedded images or other content within the body of an email message, for example `<img src="cid:image_1">`.

### CC Email

Enter an email address for the cc: field.

### BCC Email

Enter an email address for the bcc: field.

### Ignore SSL Issues

Set whether n8n should ignore failures with TLS/SSL certificate validation (turned on) or enforce them (turned off).

### Reply To

Enter an email address for the Reply To field.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'send-email') ]]
