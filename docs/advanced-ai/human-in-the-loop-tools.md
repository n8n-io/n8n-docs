---
title: Human-in-the-loop for AI tool calls
description: Learn how to require human approval before an AI Agent executes specific tools in n8n.
contentType: explanation
---

# Human-in-the-loop for AI tool calls

You can require human approval before an AI Agent executes a specific tool. When a tool requires human review, the workflow pauses and waits for a person to take one of the following actions:

- **Approve**: The tool executes with the input specified by the AI.
- **Deny**: The action is canceled and doesn't run.

This feature allows for selective oversight of tool use within AI workflows, making it easier to apply additional review to tools with higher risk, such as sending messages, modifying records, or deleting data.

## When to use human review

Human-in-the-loop (HITL) review is useful when:

- **Tools perform irreversible actions**: Deleting data, sending external communications, or making purchases.
- **Compliance requirements exist**: Regulated industries may require human approval for certain automated actions.
- **High-value decisions are involved**: Actions that have significant business impact benefit from human oversight.
- **You're building trust in AI workflows**: Start with human review enabled, then reduce oversight as confidence grows.

HITL can be applied to all tools connected to an AI Agent node, or just selected individual tools, offering more precise control than general output gating.

## How it works

1. The AI Agent determines it needs to use a tool that has human review enabled.
2. The workflow pauses and sends an approval request through your configured channel (such as Slack, Telegram, or the n8n Chat interface).
3. A human reviewer receives the request showing which tool the AI wants to use and with what parameters.
4. The reviewer either approves or denies the request.
5. If approved, the tool executes with the AI-specified input. If denied, the action is canceled and the AI is informed of the rejection.

/// note | Different approval channels
The review step can happen through a different channel than the main interaction. For example, you could have users interact with an AI agent through the n8n Chat interface, but route approval requests to a specific person in Slack.
///

## Setting up human review for tools

### Step 1: Open the Tools Panel

In your workflow, click the **Tools** connector on an AI Agent node to open the Tools Panel.

### Step 2: Add a human review step

1. In the Tools Panel, find the **Human review** section.
2. Select your preferred approval channel from the available options.
3. Configure the approval channel with the appropriate credentials and settings.

### Step 3: Connect tools to the review step

1. Add the tools that require approval to the human review step's tool connector.
2. Configure each tool as you normally would.

<!-- TBD: Add screenshot showing Tools panel with Human review section and connected tools -->

## Available approval channels

You can use any of the following services as your human review channel:

| Channel | Description |
|---------|-------------|
| [Chat](/integrations/builtin/core-nodes/n8n-nodes-langchain.chat.md) | n8n's built-in chat interface |
| [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack.md) | Send approval requests to a Slack channel or DM |
| [Discord](/integrations/builtin/app-nodes/n8n-nodes-base.discord/index.md) | Send approval requests to a Discord channel |
| [Telegram](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/index.md) | Send approval requests through Telegram |
| [Microsoft Teams](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftteams.md) | Send approval requests to a Teams channel or chat |
| [Gmail](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/index.md) | Send approval requests via email |
| [WhatsApp Business Cloud](/integrations/builtin/app-nodes/n8n-nodes-base.whatsapp/index.md) | Send approval requests through WhatsApp |
| [Google Chat](/integrations/builtin/app-nodes/n8n-nodes-base.googlechat.md) | Send approval requests to Google Chat |
| [Microsoft Outlook](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftoutlook.md) | Send approval requests via Outlook email |

## Using expressions in human review tools

### The $tool variable

When configuring the human review step, you can use the `$tool` variable to construct a message for the reviewer that provides context about what the AI is trying to do. This variable has two properties:

| Property | Description |
|----------|-------------|
| `$tool.name` | The name of the tool the AI Agent is trying to call. This is the node name as shown on the canvas in n8n. |
| `$tool.parameters` | The parameters the AI Agent is trying to use in the tool call. This includes any fields in the tool's input schema that are configured with `$fromAI()` expressions. |

**Example message configuration:**

```
The AI wants to use {{ $tool.name }} with the following parameters:
{{ JSON.stringify($tool.parameters, null, 2) }}
```

This helps reviewers understand exactly what action the AI is attempting before they approve or deny the request.

### Using $fromAI() in human review tools

The [`$fromAI()` function](/advanced-ai/examples/using-the-fromai-function.md) works with tools connected to human review steps. This means the AI can dynamically specify tool parameters, and those AI-determined values are what the human reviewer sees and approves.

## System prompt best practices

For the AI Agent to correctly interpret and handle denied tool call attempts, include information about the human review setup in your system prompt.

/// warning | System prompt configuration required
Make sure you include the tool setup and human review steps in your system prompt. This helps the AI understand which tools require approval and how to respond gracefully when a tool call is denied.
///

Consider including:

- Which tools require human approval
- What happens when approval is denied
- How the AI should respond to rejections (for example, inform the user, suggest alternatives, or ask for clarification)

<!-- TBD: Provide an example snippet -->

## Chaining and subagents

When using an AI Agent as a tool for another AI Agent, human review steps in the subagent work correctly.

## Related resources

- [AI Agent node](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md)
- [Tools Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent.md)
- [What is a tool in AI?](/advanced-ai/examples/understand-tools.md)
- [Let AI specify tool parameters with $fromAI()](/advanced-ai/examples/using-the-fromai-function.md)
