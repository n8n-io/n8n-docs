---
contentType: explanation
---

# Node types: Trigger and Action

There are two node types you can build for n8n: trigger nodes and action nodes.

Both types provide integrations with external services. 

## Trigger nodes

[Trigger nodes](/glossary.md#trigger-node-n8n) start a workflow and supply the initial data. A workflow can contain multiple trigger nodes but with each execution, only one of them will execute, depending on the triggering event.

There are three types of trigger nodes in n8n: 

| Type | Description | Example Nodes |
| --- | --- | --- |
| Webhook | Nodes for services that support webhooks. These nodes listen for events and trigger workflows in real time. | [Zendesk Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Zendesk), [Telegram Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Telegram), [Brevo Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Brevo) |
| Polling | Nodes for services that don't support webhooks. These nodes periodically check for new data, triggering workflows when they detect updates. | [Airtable Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Airtable), [Gmail Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Google/Gmail), [Google Sheet Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Google/Sheet), [RssFeed Read Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/RssFeedRead) |
| Others | Nodes that handle real-time responses not related to HTTP requests or polling. This includes message queue nodes and time-based triggers. | [AMQP Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Amqp), [RabbitMQ Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/RabbitMQ), [MQTT Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/MQTT), [Schedule Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Schedule), [Email Trigger (IMAP)](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/EmailReadImap) |

## Action nodes

Action nodes perform operations as part of your workflow. These can include manipulating data, and triggering events in other systems.

