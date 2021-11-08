---
permalink: /nodes/n8n-nodes-base.respondToWebhook
description: Learn how to use the Respond to Webhook node in n8n
---

# Respond to Webhook

The Respond to Webhook node can be used in workflows with a [Webhook](../Webhook/README.md) node. It allows controlling the response to incoming webhooks.

## Node reference

The node supports the following modes through the **Respond With** field:
- **First Incoming Item**: Respond with the first incoming item.
- **Text**: Respond with a text defined in the **Response Body** field.
- **JSON**: Respond with a JSON object defined in the **Response Body** field.
- **Binary**: Respond with a binary file defined in the **Response Data Source** field.
- **No Data**: No response payload is sent.

Available options:
- **Response Code**: Set the [response code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) to be used.
- **Response Headers**: Define response headers to be sent.
