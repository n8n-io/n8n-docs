---
title: Chat node documentation
description: Learn how to use the Chat node in n8n. Follow technical documentation to integrate the Chat node into your workflows.
contentType: [integration, reference]
priority: critical
---

# Chat node

Use the Chat node with the [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) node to send messages into the chat and optionally wait for responses from users. This enables human-in-the-loop (HITL) use cases in chat workflows, allowing you to have multiple chat interactions within a single execution. The Chat node also works as a tool for AI Agents.

All features work with both embedded and hosted chat interfaces.

/// note | Chat Trigger node
The Chat node requires a [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) node to be present in the workflow, with the [Response Mode](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md#response-mode) set to 'Using Response Nodes'.
///

/// note | Previous version
In previous versions, this node was called "Respond to Chat" and used a single "Wait for User Reply" toggle. The functionality has been reorganized into two distinct actions with additional response types.
///

## Node parameters

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

Configure this node using the following parameters.

### Operation

The Chat node supports the following operations:

* **Send Message**: Send a message to the chat. The workflow execution continues immediately after sending.
* **Send and Wait for Response**: Send a message to the chat and wait for a response from the user. This operation pauses the workflow execution until the user submits a response.

Choosing **Send and Wait for Response** activates additional parameters and options as discussed in [waiting for a response](#waiting-for-a-response).

### Message

The message to send to the chat. This parameter is available for both operations.

## Node options

Use these **Options** to further refine the node's behavior.

### Add Memory Input Connection

Choose whether you want to commit the messages from the Chat node to a connected memory. Using a shared memory between an agent or chain [root node](/integrations/builtin/cluster-nodes/root-nodes/index.md) and the Chat node attaches the same session key to these messages and lets you capture the full message history.

## Waiting for a response

By choosing the **Send and Wait for Response** operation, you can send a message and pause the workflow execution until a person responds. This enables multi-turn conversations and approval workflows within a single execution.

### Response Type

You can choose between the following types of responses:

* **Free Text**: Users can type any response in the chat. This is the same behavior as the previous "Wait for User Reply" option.
* **Approval**: Users can approve or disapprove using inline buttons in the message. You can also optionally allow users to type custom responses.

Different parameters and options are available depending on which type you choose.

### Free Text parameters and options

When using the Free Text response type, the user can type any message as their response.

**Use cases:**
- Open-ended questions
- Collecting detailed feedback
- Requesting specific information

**Options:**
* **Limit Wait Time**: Whether the workflow automatically resumes execution after a specified time limit. This can be an interval or a specific wall time.

### Approval parameters and options

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

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

Refer to the [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) node documentation for information about setting up the chat interface.

## Templates and examples

[[ templatesWidget(page.title, 'chat') ]]

## Common issues

- The Chat node doesn't work when used as a tool of a subagent.
- The Chat node doesn't work when used in a subworkflow. This includes usage in a subworkflow that's being used as a tool for an AI Agent.
- Make sure the Chat Trigger node's Response Mode is set to "Using Response Nodes" for the Chat node to function properly.

For common questions or issues with the Chat Trigger node, refer to [Common Chat Trigger Node Issues](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/common-issues.md).
