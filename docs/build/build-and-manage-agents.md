---
title: Build and manage agents
status: preview
description: >-
  Build agents in n8n alongside your workflows, publish them,  and let people
  reach them through chat, channels, and schedules.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
tags:
  - tag: preview
    primary: true
---

# Build and manage agents

An agent is an autonomous assistant you build in n8n. Each agent has a language model, instructions, and capabilities you configure, like tools, skills, and access to your knowledge base. Agents live alongside your workflows as first-class artifacts in your project. Use an agent when work is too open-ended for a fixed workflow, and you need an assistant that can reason about requests, pick the right tools, and adapt to responses.

{% hint style="info" %}
**Feature availability**

Agents are available on **n8n Cloud** and **self-hosted**. They aren't ready for self-hosted Enterprise yet. Support for self-hosted Enterprise is coming soon.
{% endhint %}

{% hint style="info" %}
**Preview status**

Agents are in Preview. They can make mistakes, and their behavior may change while the feature is in development. On self-hosted, knowledge bases are also in Preview.
{% endhint %}

### What you can build with agents

Use agents to answer questions using your uploaded files and connected services, take actions in tools like Slack, Google Sheets, or Linear, and trigger or coordinate workflows to complete larger tasks. Agents can also delegate to other agents and run on a schedule. See [Sub-agents](build-and-manage-agents.md#add-sub-agents) and [Schedules](build-and-manage-agents.md#run-agents-on-a-schedule) below.

### How agents work

An agent runs a reasoning loop. When you send it a message, or a schedule triggers it, the agent reads your instructions, looks at the request, and decides what to do next: call a tool, search your knowledge base, hand off to another agent, or ask a follow-up question. It repeats this loop until it produces a final response.

Each conversation with an agent is a **session**, which n8n stores so you can resume it later and so the agent can recall context through memory.

### Parts of an agent

Configure these parts of an agent in the Agent Builder:

| Part               | What it does                                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| **Model**          | The language model that reasons and generates responses. Choose a provider and model when you set up the agent. |
| **Instructions**   | The system prompt that describes the agent's role, tone, and constraints.                                       |
| **Tools**          | Actions the agent can take: workflows, custom code, built-in n8n integrations, and [MCP servers](integrate-ai/mcp-servers.md).                 |
| **Skills**         | Reusable behavior bundles that package instructions with the tools needed for a specific task.                  |
| **Channels**       | Places people can reach the agent, like Slack, Telegram, or Linear.                                             |
| **Schedules**      | Tasks the agent runs on a recurring basis once published.                                                       |
| **Sub-agents**     | Other published agents this agent can delegate work to.                                                         |
| **Knowledge base** | Files the agent can search and read for context (n8n Cloud, or self-hosted in preview with a Daytona sandbox).   |
| **Memory**         | Session memory keeps the current conversation. Episodic memory recalls context from earlier sessions.           |

Model, Instructions, Tools, Skills, Knowledge, Memory, and Sub-agents are configured while building the agent. Channels and Schedules take effect once you publish.

### Draft and published versions

Every agent has a **draft** version and, once you're ready, a published version. The draft is where you make changes; n8n saves them automatically. The published version is what runs when someone chats with the agent, a channel triggers it, or a schedule fires.

Publishing takes a snapshot of the draft, so the running agent doesn't change while you edit. Every publish adds a version to the publish history, and you can restore or revert to an earlier version at any time.

### Build an agent

Build agents in the Agent Builder. Start with a name and a model, add instructions, then attach the tools, skills, knowledge, memory, and sub-agents the agent needs. n8n saves your changes to the draft automatically.

#### Create the agent

1. Select your project from the left menu. Then navigate to the **Agents** tab.
2. Select **Create Agent**. n8n opens the Agent Builder with a blank draft.
3. In the **Agent** tab, enter a name for the agent. Use the icon picker to change the icon.

{% hint style="info" %}
**Use the AI Assistant**

Describe what you want the agent to do to the [AI Assistant](ways-of-building-workflows/ai-assistant.md). It suggests instructions, tools, and skills to add. Refine the suggestions in the Agent Builder as you go.
{% endhint %}

#### Choose a model

In the **Agent** tab, open the Model field and pick a provider and model. If the provider needs credentials, follow the prompt to add them.

#### Write instructions

In the **Instructions** field, describe the agent's role, its tone and response format, what it should and shouldn't do, and which tools or skills it should prefer for common tasks.

Keep instructions specific; if the agent doesn't behave as expected, refine the instructions first before adding more tools.

#### Add tools

In the **Tools** section, select **Add tool** and pick from built-in tools (n8n integrations like Slack or Google Sheets), workflows in the same project, custom tools defined by a JSON schema, or external tools using [MCP servers](integrate-ai/mcp-servers.md).

The agent decides which tool to use based on your instructions and the task, using the credentials you attach when you add the tool. For sensitive tools, you can require approval before the agent runs them. See [Approve tool calls](build-and-manage-agents.md#approve-tool-calls).

#### Bundle capabilities with skills

A skill packages instructions with the tools needed for a specific task. Use skills when the agent handles several distinct tasks, each with its own steps.

To add a skill:

1. Open the **Skills** section and select **Add skill**.
2. Give the skill a name and a short description.
3. Pick the tools the skill can use.
4. Write the instructions the agent should follow when it runs the skill.

The agent picks the right skill based on the description and the current request.

#### Upload knowledge

Add files the agent can search and read from the **Knowledge** tab. Supported file types: csv, pdf, markdown, txt.

{% hint style="info" %}
**Feature availability**

Knowledge bases are available on n8n Cloud. On self-hosted, they need a Daytona sandbox. See [Self-hosted](build-and-manage-agents.md#self-hosted).
{% endhint %}

{% hint style="info" %}
**Preview status**

On self-hosted, knowledge bases are in Preview and may change in future releases.
{% endhint %}

Once you upload a file, the agent can search your knowledge base to answer questions and pull in context.

#### Configure memory

Session memory keeps the context of the current conversation. It's on by default and needs no setup.

To let the agent recall context from earlier sessions:

1. Open the **Memory** tab.
2. Enable **Episodic memory**.

Episodic memory needs an OpenAI credential to store and retrieve memories.

#### Add sub-agents

Sub-agents let this agent hand off work to other published agents. Use sub-agents when a task has clearly separate parts and a specialized agent can handle each part better.

1. Open the **Agents** section in the capabilities list.
2. Select **Add agent** and pick a published agent from your project.
3. Under **When should this agent be used?**, describe situations where this sub-agent should be called.

You can set the maximum number of sub-agents that run in parallel in the agent settings.

#### Preview your agent

Select **Preview** in the header to test the agent without publishing. n8n starts a chat session with the current draft. Use the preview to check the agent's behavior, tool choices, and responses before you publish.

If **Preview** is disabled, the draft has configuration errors. n8n lists the items you need to resolve.

### Publish an agent

Publish an agent to make it available to users, channels, and schedules. Only the published version runs in production, so you can keep editing the draft without changing what people see or what your schedules use.

1. Open the agent in the Agent Builder.
2. Check for errors. If **Publish** is disabled, n8n lists the configuration items you need to resolve.
3. Select **Publish**.

Publishing takes a snapshot of the current draft and marks it as the active version.

#### Update a published agent

Once an agent is published, edits go into the draft. The published version keeps running until you publish again.

To roll out your changes:

1. Edit the draft in the Agent Builder. n8n saves your changes automatically.
2. Test the changes with **Preview**.
3. Select **Publish** again to release a new version.

To discard unsaved changes and match the published version, select **Revert changes** from the publish menu.

#### Unpublish an agent

To take an agent offline while keeping the draft in your project, select **Unpublish** from the publish menu. Users, channels, and schedules can no longer run the agent until you publish it again. The draft remains editable.

### Chat with a published agent

The chat panel in the Agent Builder lets you talk to the agent directly.

1. Open the chat panel.
2. Type a message and send it. The agent starts a session and responds.
3. To review or continue a past conversation, open the session history and select a session.

n8n stores each conversation as a session. Review sessions in the **Sessions** tab, including the messages exchanged, the tools the agent used, and any pending approvals.

#### Approve tool calls

For sensitive tools, the agent pauses and asks for approval before running the tool. In the chat, select **Approve** to let the tool run, or **Reject** to cancel it. The agent continues from where it left off with your decision.

### Reach agents from other places

Connect a channel to let people reach the agent outside the Agent Builder chat.

Available channels:

* **Slack**
* **Telegram**
* **Linear**

Open the **Channels** section on the agent and follow the setup for the channel you want. Each channel has its own connection and permission model.

### Manage agents through MCP

You can also build and manage agents from an MCP client, such as Claude Desktop or Claude Code, using n8n's [instance-level MCP server](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server). This approach exposes tools to search, create, and configure agents alongside the workflow tools the MCP server already provides.

{% hint style="info" %}
**Reconnect existing MCP clients**

If you connected an MCP client to your n8n instance before agents were available, you'll need to reconnect the client to access the agent management tools. Go to **Settings > Instance-level MCP** and reconnect your client to get the new permissions for managing agents through MCP.
{% endhint %}

### Run agents on a schedule

Schedules let agents run on their own on a recurring basis. Add a schedule from the **Schedules** section, describe the task the agent should complete, and pick a frequency:

* Hourly
* Daily
* Weekly
* Monthly
* Custom cron

Schedules run only against the published version of the agent. n8n shows the next run time, the last run time, and the outcome of the last run for each schedule.

### Use agents in workflows

You can use agents within your workflows in two ways:

* **Create agents inline**: Add an agent as a node directly in a workflow. This lets you build and configure an agent without leaving the workflow editor.
* **Message existing agents**: Send messages to already created agents from a workflow. This lets you access published agents and integrate their capabilities into your automation.

### Self-hosted

Agents run on self-hosted n8n from 2.32.3 (Beta). There are two ways to set them up:

* **Build manually**: enable the `agents` module (add `agents` to `N8N_ENABLED_MODULES`). You pick the model, write the instructions, and attach tools and skills yourself. This is all you need to build and run agents.
* **Full experience**: also set up [AI Assistant](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/set-up-ai-assistant) (`instance-ai`) for AI-assisted building, where you describe an agent and n8n scaffolds it. The knowledge base needs a Daytona sandbox, and connecting channels needs a public `WEBHOOK_URL`.

{% hint style="warning" %}
Agents aren't ready for self-hosted Enterprise yet. Support for self-hosted Enterprise is coming soon.
{% endhint %}

{% hint style="warning" %}
Queue mode isn't supported for agents yet, and connecting channels (such as Telegram) can fail. Run agents in regular mode for now.
{% endhint %}

For the environment variables and setup steps, see [Enable agents](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/set-up-ai-assistant#enable-agents).

### Agent executions and pricing

One turn with an agent counts as one execution. A turn is a single exchange, where you send the agent a message and it produces a response.

Agents share the same execution quota as workflows. Executions from your agents and workflows count toward the same total on your plan.
