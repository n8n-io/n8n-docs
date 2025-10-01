---
title: WhatsApp Business Cloud node documentation
description: Learn how to use the WhatsApp Business Cloud node in n8n. Follow technical documentation to integrate WhatsApp Business Cloud node into your workflows.
contentType: [integration, reference]
priority: high
---

# WhatsApp Business Cloud node

Use the WhatsApp Business Cloud node to automate work in WhatsApp Business, and integrate WhatsApp Business with other applications. n8n has built-in support for a wide range of WhatsApp Business features, including sending messages, and uploading, downloading, and deleting media. 

On this page, you'll find a list of operations the WhatsApp Business Cloud node supports and links to more resources.

/// note | Credentials
Refer to [WhatsApp Business Cloud credentials](/integrations/builtin/credentials/whatsapp.md) for guidance on setting up authentication. 
///

## Operations

* Message
	* Send
	* Send and Wait for Response
	* Send Template
* Media
	* Upload
	* Download
	* Delete

--8<-- "_snippets/integrations/builtin/send-and-wait-operation.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'whatsapp-business-cloud') ]]

## Related resources

Refer to [WhatsApp Business Platform's Cloud API documentation](https://developers.facebook.com/docs/whatsapp/cloud-api) for details about the operations.

## Common issues

For common errors or issues and suggested resolution steps, refer to [Common Issues](/integrations/builtin/app-nodes/n8n-nodes-base.whatsapp/common-issues.md).

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
