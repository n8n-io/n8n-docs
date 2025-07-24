---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
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
| Webhook | Nodes for services that support webhooks. These nodes listen for events and trigger workflows in real time. | [Zendesk Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Zendesk){:target=_blank .external-link}, [Telegram Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Telegram){:target=_blank .external-link}, [Brevo Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Brevo){:target=_blank .external-link} |
| Polling | Nodes for services that don't support webhooks. These nodes periodically check for new data, triggering workflows when they detect updates. | [Airtable Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Airtable){:target=_blank .external-link}, [Gmail Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Google/Gmail){:target=_blank .external-link}, [Google Sheet Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Google/Sheet){:target=_blank .external-link}, [RssFeed Read Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/RssFeedRead){:target=_blank .external-link} |
| Others | Nodes that handle real-time responses not related to HTTP requests or polling. This includes message queue nodes and time-based triggers. | [AMQP Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Amqp){:target=_blank .external-link}, [RabbitMQ Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/RabbitMQ){:target=_blank .external-link}, [MQTT Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/MQTT){:target=_blank .external-link}, [Schedule Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Schedule){:target=_blank .external-link}, [Email Trigger (IMAP)](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/EmailReadImap){:target=_blank .external-link} |

## Action nodes

Action nodes perform operations as part of your workflow. These can include manipulating data, and triggering events in other systems.

