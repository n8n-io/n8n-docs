---
title: Chat node documentation
description: >-
  Learn how to use the Chat node in n8n. Follow technical documentation to
  integrate the Chat node into your workflows.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Chat node documentation
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-langchain.chat.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chat'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chat'
layout:
  description:
    visible: false
---

# Chat node <a href="#chat-node" id="chat-node"></a>

Use the Chat node with the [Chat Trigger](n8n-nodes-base.compression/n8n-nodes-base.compression.md) node to send messages into the chat and optionally wait for responses from users. This enables human-in-the-loop (HITL) use cases in chat workflows, allowing you to have multiple chat interactions within a single execution. The Chat node also works as a tool for AI Agents.

{% hint style="info" %}
**Chat Trigger node**

The Chat node requires a [Chat Trigger](n8n-nodes-base.compression/n8n-nodes-base.compression.md) node to be present in the workflow, with the [Response Mode](n8n-nodes-base.compression/n8n-nodes-base.compression.md#response-mode) set to 'Using Response Nodes'.
{% endhint %}

{% hint style="warning" %}
**Embedded mode not supported**

The Chat node isn't supported when the Chat Trigger node is set to **Embedded** mode. In Embedded mode, use the [Respond to Webhook](n8n-nodes-base.respondtowebhook.md) node instead.
{% endhint %}

{% hint style="info" %}
**Previous version**

In previous versions, this node was called "Respond to Chat" and used a single "Wait for User Reply" toggle. The functionality has been reorganized into two distinct actions with additional response types.
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/E4462HQ9P1zhTQgzmcLG/" %}

Configure this node using the following parameters.

### Operation <a href="#operation" id="operation"></a>

The Chat node supports the following operations:

* **Send Message**: Send a message to the chat. The workflow execution continues immediately after sending.
* **Send and Wait for Response**: Send a message to the chat and wait for a response from the user. This operation pauses the workflow execution until the user submits a response.

Choosing **Send and Wait for Response** activates additional parameters and options as discussed in [waiting for a response](#waiting-for-a-response).

### Message <a href="#message" id="message"></a>

The message to send to the chat. This parameter is available for both operations.

## Node options <a href="#node-options" id="node-options"></a>

Use these **Options** to further refine the node's behavior.

### Add Memory Input Connection <a href="#add-memory-input-connection" id="add-memory-input-connection"></a>

Choose whether you want to commit the messages from the Chat node to a connected memory. Using a shared memory between an agent or chain [root node](../cluster-nodes/root-nodes/README.md) and the Chat node attaches the same session key to these messages and lets you capture the full message history.

## Waiting for a response <a href="#waiting-for-a-response" id="waiting-for-a-response"></a>

By choosing the **Send and Wait for Response** operation, you can send a message and pause the workflow execution until a person responds. This enables multi-turn conversations and approval workflows within a single execution.

### Response Type <a href="#response-type" id="response-type"></a>

You can choose between the following types of responses:

* **Free Text**: Users can type any response in the chat. This is the same behavior as the previous "Wait for User Reply" option.
* **Approval**: Users can approve or disapprove using inline buttons in the message. You can also optionally allow users to type custom responses.

Different parameters and options are available depending on which type you choose.

### Free Text parameters and options <a href="#free-text-parameters-and-options" id="free-text-parameters-and-options"></a>

When using the Free Text response type, the user can type any message as their response.

**Use cases:**
- Open-ended questions
- Collecting detailed feedback
- Requesting specific information

**Options:**
* **Limit Wait Time**: Whether the workflow automatically resumes execution after a specified time limit. This can be an interval or a specific wall time.

### Approval parameters and options <a href="#approval-parameters-and-options" id="approval-parameters-and-options"></a>

When using the Approval response type, the message displays inline buttons that users can click to approve or disapprove. This response type follows the same pattern as other human-in-the-loop (HITL) nodes in n8n.

**Use cases:**
- Simple yes/no decisions
- Approval workflows
- Confirmations

When using the Approval response type, the following parameters are available:

* **Type of Approval**: Whether to present only an approval button or both approval and disapproval buttons.
    - **Approve Only**: Displays a single approval button
    - **Approve and Disapprove**: Displays both buttons (default)

* **Approve Button Label**: The text to display on the approval button. Default: `Approve`

* **Disapprove Button Label**: The text to display on the disapproval button (only shown when Type of Approval is "Approve and Disapprove"). Default: `Disapprove`

* **Block User Input**: Whether to prevent users from typing custom messages (enabled) or allow them to type responses (disabled, default).
    - When **disabled** (default): Users can click buttons or type a custom message. Typed messages are treated as disapproval with a custom message.
    - When **enabled**: Users can only interact using the buttons.

The Approval response type also offers the following option:

* **Limit Wait Time**: Whether the workflow automatically resumes execution after a specified time limit. This can be an interval or a specific wall time.

## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

Refer to the [Chat Trigger](n8n-nodes-base.compression/n8n-nodes-base.compression.md) node documentation for information about setting up the chat interface.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

[Browse Chat node documentation integration templates](https://n8n.io/integrations/chat) or [search all templates](https://n8n.io/workflows/)

## Common issues <a href="#common-issues" id="common-issues"></a>

- The Chat node isn't supported when the Chat Trigger node's **Mode** is set to **Embedded**. In Embedded mode, the Chat Trigger node only offers **Respond to Webhook** as a response mode. Use the [Respond to Webhook](n8n-nodes-base.respondtowebhook.md) node instead.
- The Chat node doesn't work when used as a tool of a subagent.
- The Chat node doesn't work when used in a subworkflow. This includes usage in a subworkflow that's being used as a tool for an AI Agent.
- Make sure the Chat Trigger node's Response Mode is set to "Using Response Nodes" for the Chat node to function properly.

For common questions or issues with the Chat Trigger node, refer to [Common Chat Trigger Node Issues](n8n-nodes-base.compression/common-issues.md).
