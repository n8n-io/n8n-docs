---
contentType: explanation
nodeTitle: Choose a node type
originalFilePath: integrations/creating-nodes/plan/node-types.md
originalUrl: 'https://docs.n8n.io/integrations/creating-nodes/plan/node-types'
url: 'https://docs.n8n.io/connect/create-nodes/plan-your-node/choose-a-node-type'
layout:
  description:
    visible: false
---

# Node types: Trigger and Action <a href="#node-types-trigger-and-action" id="node-types-trigger-and-action"></a>

There are two node types you can build for n8n: trigger nodes and action nodes.

Both types provide integrations with external services. 

## Trigger nodes <a href="#trigger-nodes" id="trigger-nodes"></a>

[Trigger nodes](#user-content-fn-1)[^1] start a workflow and supply the initial data. A workflow can contain multiple trigger nodes but with each execution, only one of them will execute, depending on the triggering event.

There are three types of trigger nodes in n8n: 

| Type | Description | Example Nodes |
| --- | --- | --- |
| Webhook | Nodes for services that support webhooks. These nodes listen for events and trigger workflows in real time. | [Zendesk Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Zendesk), [Telegram Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Telegram), [Brevo Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Brevo) |
| Polling | Nodes for services that don't support webhooks. These nodes periodically check for new data, triggering workflows when they detect updates. | [Airtable Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Airtable), [Gmail Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Google/Gmail), [Google Sheet Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Google/Sheet), [RssFeed Read Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/RssFeedRead) |
| Others | Nodes that handle real-time responses not related to HTTP requests or polling. This includes message queue nodes and time-based triggers. | [AMQP Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Amqp), [RabbitMQ Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/RabbitMQ), [MQTT Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/MQTT), [Schedule Trigger](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Schedule), [Email Trigger (IMAP)](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/EmailReadImap) |

## Action nodes <a href="#action-nodes" id="action-nodes"></a>

Action nodes perform operations as part of your workflow. These can include manipulating data, and triggering events in other systems.

[^1]: A trigger node is a special node responsible for executing the workflow in response to certain conditions. All production workflows need at least one trigger to determine when the workflow should run.
