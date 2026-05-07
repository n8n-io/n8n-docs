---
title: Agents
description: Build AI-powered assistants that understand natural language, make decisions, and take actions with your connected tools.
status: beta
hide:
  - navigation
---

## Prerequisites

To create and test an agent, you need:

- Basic knowledge of credentials and connections if your agent will use external tools
- Basic knowledge of workflows if you plan to embed an agent in a workflow

## What is an agent?

An **Agent** is an AI-powered assistant that you can configure with:

- **Instructions**: What the agent should do and how it should behave
- **Tools**: Actions the agent can take, such as n8n nodes, workflows, or connected integrations
- **Triggers**: How the agent starts running, such as chat, events, webhooks, or schedules
- **Memory**: Optional persistent memory so the agent can remember context across interactions

You can use agents in the n8n UI to chat with them, from workflows using an agent node, or from supported clients like Slack.

## Create your first agent

You can create an agent in two ways: use natural language to describe what you want the agent to accomplish (recommended) or start from scratch. This guide walks you through the manual setup process.

### Step 1: Create a new agent

From the **Agents** tab, click **Create agent**. Give your agent a name and optional description.

Choose a name that describes what your agent does, such as "Support triage agent" or "Release notes assistant." You can change this name later.

### Step 2: Add instructions

Add a set of instructions that define your agent's role, allowed actions, output format, and tone. Here's a template you can customize:

```
You are an n8n agent that helps with: <what you do>.

Rules:
- If the user’s request is ambiguous, ask 1–2 clarifying questions.
- If you don’t have enough information to complete the task, say what’s missing.
- When you produce an answer, use this format:
  - Summary
  - Steps
  - Notes / assumptions

Scope:
- You may use the enabled tools when needed.
- Do not invent credentials, data, or actions you cannot perform.
```

### Step 3: Choose a model

Select a model appropriate for your use case. 

If you're unsure which model to choose, start with the default. You can switch models later after you validate quality and cost.

### Step 4: Add tools

Add tools that your agent can call, such as n8n nodes or existing workflows. Start with one or two tools so you can debug behavior and test permissions before expanding.

### Step 5: Add memory (optional)

Enable persistent memory if your agent needs to remember facts across conversations. Use memory when the agent benefits from continuity, such as user preferences, recurring tasks, or known context. Avoid storing sensitive information in memory.

### Step 6: Test in chat

Open the agent chat and test it with a few prompts:

- "Summarize what you can do and what tools you have access to."
- "Ask me three questions to understand what you should help me with."
- “Given this text, extract key fields as JSON: …”

## Add a trigger

Triggers determine how your agent starts running. Common trigger types include:

- **Chat/manual**: User initiates a chat session
- **Event-driven**: Agent runs when something happens, such as a message received, row updated, or webhook
- **Scheduled**: Agent runs on a schedule

### Example: Trigger from Slack

You can connect your agent to Slack by configuring the client integration. Select the agent and specify which channels or events trigger it, what content is passed to the agent, and where responses are posted.

Start with a private test channel and a limited scope.

## Monitor executions

You can view your agent's past sessions and executions to debug behavior. Each execution shows:

- Inputs (prompt and event payload)
- Tool calls (what the agent attempted)
- Outputs
- Errors and retries

When an agent behaves unexpectedly, check the execution trace first.

## Publish and use your agent

### Publish your agent

Publishing makes your agent available for use from the product UI and from workflows.

### Use an agent in a workflow

Add an agent node to your workflow and configure it with the relevant context, such as customer ticket text or CRM fields. Capture the output as structured JSON so downstream nodes can reliably parse the result.

## Common agent patterns

### Router agent

Classifies an input and routes it to one of several actions or workflows.

### Extractor agent

Extracts fields from unstructured text into a defined schema.

### Drafting agent

Generates a draft and asks for human confirmation before sending or publishing.

## Troubleshoot your agent

### My agent ignores instructions

Make instructions shorter and more explicit. Put non-negotiable rules in bullet points and reduce the number of tools.

### The agent can't use a tool

Check that the tool is enabled and credentials are configured correctly. Validate the tool's input format.

### Outputs are inconsistent

Request structured output in JSON format and provide a schema. Add examples in your agent's instructions.

