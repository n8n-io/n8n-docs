---
contentType: explanation
---

# Node types: Trigger and Action

There are two node types you can build for n8n: trigger nodes and action nodes.

Both types provide integrations with external services. 

## Trigger nodes

Trigger nodes start a workflow and supply the initial data. A workflow can contain multiple trigger nodes but with each execution, only one of them will execute, depending on the triggering event.

There are three types of trigger nodes in n8n: 

| Type | Description | Example Nodes |
| --- | --- | --- |
| **Webhook** | Nodes for services that support webhooks. These nodes listen for events and trigger workflows in real time. | Zendesk Trigger, Telegram Trigger, Brevo Trigger |
| **Polling** | Nodes for services that don't support webhooks. These nodes periodically check for new data, triggering workflows when they detect updates. | Airtable Trigger, Gmail Trigger, Google Sheet Trigger, RssFeed Read Trigger |
| **Others** | Nodes that handle real-time responses not related to HTTP requests or polling. This includes message queue nodes and time-based triggers. | AMQP Trigger, RabbitMQ Trigger, MQTT Trigger, Schedule Trigger, Email Trigger |

Refer to the source code of these example nodes on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes){:target=_blank .external-link} to compare the differences. 

## Action nodes

Action nodes perform operations as part of your workflow. These can include manipulating data, and triggering events in other systems.

