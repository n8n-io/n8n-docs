---
title: Use n8n Assistant
description: >-
  Use n8n Assistant to create, edit, test, and troubleshoot n8n workflows from
  a chat.
status: preview
tags:
  - tag: preview
    primary: true
layout:
  description:
    visible: false
---

# Use n8n Assistant

n8n Assistant is a chat-based agent in n8n that helps you create, edit, test, and troubleshoot workflows from natural language. It can also build agents and help with instance tasks, such as renaming or publishing workflows.

Describe what you want to automate. n8n Assistant can plan the workflow, build it in your selected project, test it, and help you fix errors.

The result is a normal n8n workflow. You can open it, inspect it, edit it, test it, and publish it like any other workflow.

{% hint style="info" %}
**Feature availability**

n8n Assistant is available on:

- **n8n Cloud:** Starter, Pro
- **Self-hosted:** Community, Registered Community, Business

It isn't ready for n8n Cloud Enterprise or self-hosted Enterprise yet. If you're an Enterprise customer, contact your Customer Success Manager about preview access.
{% endhint %}

{% hint style="info" %}
**Preview status**

n8n Assistant is in Preview. It can make mistakes, and behavior may change while the feature is in development. Always review generated workflows before using them in production.
{% endhint %}

## What n8n Assistant can help with

You interact with n8n Assistant in a chat. It can use tools inside n8n to help you create and debug workflows.

You can ask n8n Assistant to:

- **Create workflows:** describe the automation you want, and n8n Assistant can generate a workflow.
- **Build agents:** describe the agent you want, and n8n Assistant can suggest instructions, tools, and skills to add. Agents also run on self-hosted with the `agents` module. See [Build and manage agents](../build-and-manage-agents.md) and [Enable agents](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/set-up-n8n-assistant#enable-agents).
- **Connect MCP servers:** connect a server from the [MCP servers](../integrate-ai/mcp-servers.md) registry directly to the assistant, both to perform tasks and to gather context while it builds workflows for you.
- **Edit workflows:** ask it to change a workflow, add nodes, update logic, or adjust configuration.
- **Test and troubleshoot workflows:** ask it to run checks, inspect relevant errors, and suggest fixes.
- **Help with credentials:** prompt you to select an existing credential or create a new one, without pasting secrets into chat.
- **Use n8n resources:** create or update supporting resources such as [Data Tables](../work-with-data/data-tables.md) when needed.
- **Research approved websites:** when web access is enabled, n8n Assistant asks for permission before accessing a domain.

## Before you start

To use n8n Assistant, you need access to an n8n instance with the feature enabled.

Make sure that:

- You can access the project where you want n8n Assistant to work.
- You have permission to use the workflows, credentials, and resources needed for the task.
- You know what you want the workflow to do.

n8n Assistant uses the permissions of your n8n user. It can only access the workflows, credentials, and resources that you can access in the selected project.

## Write effective prompts

Specific prompts help n8n Assistant produce better results with fewer iterations.

When you write a prompt, include:

- what should trigger the workflow,
- which apps or services the workflow should use,
- what data the workflow should read, send, or update,
- what should happen when the workflow succeeds,
- what should happen when the workflow fails,
- whether n8n Assistant should ask before publishing the workflow.

## Example prompts

### Create a workflow

```text
Create a workflow that checks Gmail every morning for invoices,
saves PDF attachments to Google Drive, and adds a row to a Data Table.
Ask me before publishing the workflow.
```

### Debug a failed execution

```text
Debug the latest failed execution of this workflow.
Explain what failed, then suggest a fix before changing anything.
```

### Update an existing workflow

```text
Update this workflow so failed orders are sent to Slack,
then retry the API request after 10 minutes.
```

## Review AI-generated changes

n8n Assistant can take actions in your n8n instance, but you stay in control.

Before you use an AI-generated workflow in production:

- Review the workflow logic.
- Check node configuration and credentials.
- Test the workflow with expected input data.
- Check execution results and error handling.
- Confirm that the workflow doesn't perform unintended actions.

n8n Assistant asks for confirmation before high-impact actions, such as publishing, deleting, or making other important changes.

## Credential handling

Your credential secrets are never sent to the AI, and the AI never sees them.

When a workflow needs credentials, n8n Assistant prompts you with a credential card in the chat. From that card, you can:

- Select an existing credential that you have access to in the project.
- Create a new credential.

If you create a new credential, you enter the secret in the standard n8n credential screen, not in the chat. Don't paste API keys, passwords, or tokens into the conversation.

## Web access

When you enable web access, n8n Assistant asks for permission before accessing an external domain.

Review the requested domain before you approve access.

## Preview limitations

n8n Assistant is a Preview feature. Availability, supported actions, and behavior may change.

During Preview:

- n8n Assistant may not support some actions yet.
- Some capabilities may roll out gradually.
- n8n Assistant may ask for clarification more often than expected.
- Generated workflows may need manual review and correction.
- UI, credit usage, and supported resources may change.

## Data and privacy

n8n Assistant processes the information it needs to help build and troubleshoot workflows.

Depending on the task, this can include:

- your prompts and chat messages,
- workflow structure and node configuration,
- selected execution and error details used for troubleshooting,
- credential names, credential types, or connection status,
- approved web pages or domains, when you enable web access.

n8n Assistant doesn't require you to paste secrets into chat. Enter API keys, passwords, and tokens through the standard n8n credential screens.

{% hint style="warning" %}
Don't paste sensitive data into chat unless it's necessary for the task. AI-generated outputs can be incorrect, so review workflows and configurations before using them in production.
{% endhint %}

## Credit usage

n8n Assistant uses credits based on the tokens processed by the underlying AI model.

Longer conversations, larger workflows, debugging sessions, and repeated iterations use more credits.

To reduce unnecessary usage:

- Be specific about the workflow goal and constraints.
- Start a new conversation for unrelated tasks.
- Review n8n Assistant's plan before asking it to build.
- Avoid asking it to regenerate the same workflow without adding new guidance.

To get more credits during Preview, upgrade your plan. More ways to top up are coming.

For current plan details, see [n8n plans and pricing](https://n8n.io/pricing/).

See [Ways of building workflows](README.md) for other approaches.
