---
title: Message an Agent node documentation
description: >-
  Learn how to use the Message an Agent node in n8n. Follow technical
  documentation to integrate the Message an Agent node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Message an Agent
layout:
  description:
    visible: false
---

# Message an Agent node

Use the Message an Agent node to send a message to an agent from a workflow, then use the agent's reply in the nodes that follow. The agent runs its own reasoning loop, calls its own tools and skills, and returns a response to the workflow.

You can message an agent you've already built, or define an agent inline in the node.

{% hint style="info" %}
Agents are in preview. To learn how to build, publish, and manage them, refer to [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents).
{% endhint %}

Each message you send counts as one execution, the same as any other workflow execution.

## Node parameters

### Agent

Select the agent you want to message.

The list shows the agents that belong to the same project as the workflow. If the list is empty, that project doesn't have any agents yet. Create one in the project, or move the workflow to the project that holds the agent you want.

Which version of the agent runs depends on how you run the workflow:

- Manual and chat executions use the agent's current draft, so testing always picks up your latest changes.
- Production executions use the agent's published version.

Publish the agent after you change it, otherwise production runs keep using the previous version.

### Message

Enter the message to send to the agent. Write it the way you'd write a request to a person, and use expressions to include data from earlier nodes.

For example:

```
Process the refund for order {{ $json.order_id }}, then confirm with the customer that it was approved.
```

### Require Specific Output Format

Turn this on when later nodes need a predictable shape instead of free text. The agent then returns an object on the `structuredOutput` field that matches the schema you define.

Choose how to define the schema with **Schema Type**:

- **Generate From JSON Example**: paste an example object in **JSON Example** and n8n builds the schema from it. Every property in the example becomes required.
- **Define Using JSON Schema**: write the schema yourself in **Output Schema**, using [JSON Schema](https://json-schema.org/) format.

{% hint style="warning" %}
The model provider enforces structured output, so support varies. Mark every property as required for the most reliable results. Some providers reject optional fields or advanced keywords, and others don't support structured output at all.
{% endhint %}

## Node options

Select **Add Option** under **Advanced** to add these options.

### Enable Streaming

Whether to stream the agent's response as it generates text, instead of waiting for the complete reply. Enabled by default. Output streams through connected Chat and Webhook triggers.

### Invoke Agent

Whether to call the agent once for all input items or once for each input item:

- **Once for All Items**: call the agent a single time. The agent can read every input item. This is the default.
- **Once Per Item**: make one agent call for each input item.

This option doesn't apply to inline agents.

### Session

Sessions let the agent remember earlier messages. Without one, each execution starts a fresh conversation.

Set **Session ID** to choose where the session key comes from:

- **Connected Chat Trigger Node**: reuse the session from a directly connected Chat Trigger. This is the default, so a Chat Trigger works without extra setup.
- **Define below**: enter your own key in **Key**, as static text or an expression. Use this to group runs into one conversation, for example by customer ID.

A session key can be at most 74 characters.

### Allow Agent to Access Other Nodes' Data

Whether to give the agent a tool that reads the execution data of other nodes in the workflow. Turned off by default, which limits the agent to its own input.

This option doesn't apply to inline agents.

## Node output

The node returns one item per agent call, with these fields:

| Field | Description |
|-------|-------------|
| `text` | The agent's response. |
| `structuredOutput` | The object matching your schema when **Require Specific Output Format** is on, otherwise `null`. |
| `usage` | Token usage for the call. |
| `toolCalls` | The tools the agent called while producing the response. |
| `finishReason` | Why the agent stopped. |
| `session` | The session the call ran in. |

{% hint style="info" %}
Version 1 of the node returned the response on a field named `response`. Version 2 renamed it to `text`. Existing workflows on version 1 keep the old field name.
{% endhint %}

## Use the node as a tool

The node is also available as **Message an Agent Tool**, so an AI Agent can hand work to one of your agents. Connect it to the **Tool** input of the AI Agent node and configure it the same way.

## Related resources

* [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents)
* [AI Agent node](../cluster-nodes/root-nodes/n8n-nodes-langchain.agent/README.md)
* [Execute Sub-workflow node](n8n-nodes-base.executeworkflow.md)

## Common issues

Here are some common errors and issues with the Message an Agent node and steps to resolve or troubleshoot them.

### The agent list is empty

The **Agent** list only shows agents in the project that the workflow belongs to. Agents in your other projects don't appear.

Build an agent in the same project, or move the workflow to the project that holds the agent.

### Agent not found or not accessible

The node can only reach agents in the project that owns the workflow. You'll see this error if someone deleted the agent, or if the workflow and the agent sit in different projects.

Check that the agent still exists in the same project as the workflow.

### Session ID must be at most 74 characters

n8n stores the session under a key that combines the project ID with your session ID, and the stored value has a fixed length limit.

Shorten the value in **Key**. If you're mapping a long ID from earlier data, hash or truncate it first.

### The prompt is empty

The node returns `Prompt cannot be empty` when **Message** resolves to an empty value, or to something that isn't text.

Check the expression in **Message**. An expression that returns an object or a number resolves to an empty prompt, so convert it to text first.
