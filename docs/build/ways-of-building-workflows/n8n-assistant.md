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
- **Pick up recent work:** ask about a workflow you built earlier or an execution that failed, and n8n Assistant can find it without you naming it.

## What n8n Assistant knows about your instance

At the start of a conversation, n8n Assistant receives instance context: a short summary of the project you opened it in. This is why a brief prompt such as "what should I look at?" or "carry on" often works without you naming a workflow.

Instance context draws on three sources:

| What instance context reports | Source |
| --- | --- |
| Which workflows exist in the project, and which are published | Your workflows |
| What changed recently, and who changed it | The instance activity log |
| Which workflows ran, how many failed, and the last failure | Your execution history |

n8n Assistant gets the full picture with your first message in a conversation. After that, each message carries only what changed since then. Start a new conversation for unrelated work, and n8n Assistant reads the project again from the start.

On n8n Cloud, n8n manages instance context for you. On self-hosted instances n8n turns it on through a managed rollout, and an instance admin can force it on. See [Enable instance context](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/set-up-n8n-assistant#enable-instance-context).

### What n8n Assistant can look up from instance context

Instance context holds pointers, not contents. From it, n8n Assistant can:

- **Read further back through recent changes.** Instance context covers a recent window. n8n Assistant can list older entries, filter to workflow or credential changes, or open one entry to see a single workflow's recent change history.
- **Open the live record.** Every line carries an ID, so n8n Assistant can fetch the workflow, execution, or credential it points to.

Activity entries follow your [activity log retention settings](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/set-up-n8n-assistant#enable-instance-context). Executions follow your [execution data retention settings](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/manage-execution-data). If an activity entry has been pruned, n8n Assistant continues without it.

### How n8n Assistant learns which nodes you use

Node type counting is a separate setting from instance context, and an instance admin turns it on separately. See [Enable node type counting](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/set-up-n8n-assistant#enable-node-type-counting).

With it on, n8n Assistant can ask how many workflows in a project use each node type, instead of reading every workflow to work out your conventions. It reports counts of node types, never parameter values, so it can tell that 10 of your 10 workflows use the **Slack** node, never how you configured any of them. To follow a convention rather than just name it, n8n Assistant reads one workflow in full.

### What instance context doesn't include

The activity log records that a change happened, not what the change contained. To answer anything about how a workflow is built, n8n Assistant reads the workflow itself.

Instance context doesn't include:

- **Parameter values.** A change entry names the node types you added or removed, and which settings you changed. It never records the values you set.
- **Individual nodes.** A save entry names added or removed node types, not individual nodes. Adding a second **Slack** node changes the total node count but doesn't add a new type.
- **Every node type in a large change.** When one save adds many node types, the entry lists some of them and reports the total.
- **Work in projects you didn't open.** See [Instance context stays inside one project](#instance-context-stays-inside-one-project).

## Before you start

To use n8n Assistant, you need access to an n8n instance with the feature enabled.

Make sure that:

- You can access the project where you want n8n Assistant to work.
- You have permission to use the workflows, credentials, and resources needed for the task.
- You know what you want the workflow to do.

n8n Assistant uses the permissions of your n8n user. It can only access workflows, credentials, and resources that you have permission to use.

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

n8n Assistant can read credential descriptions from n8n 2.41.0. From n8n 2.42.0, n8n Assistant only reads descriptions if your instance enables credential descriptions.

n8n Assistant uses available credential descriptions to help choose between credentials of the same type. For example, a description can identify a production account or a test account. If the choice remains unclear, n8n Assistant asks you which credential to use.

The AI can receive credential descriptions. Don't include API keys, passwords, or tokens in them.

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
- credential names, types, descriptions, or connection status,
- approved web pages or domains, when you enable web access,
- the names of the workflows in the project you opened it in,
- a record of recent workflow and credential changes in that project,
- which of those workflows ran, and which executions failed.

n8n Assistant doesn't require you to paste secrets into chat. Enter API keys, passwords, and tokens through the standard n8n credential screens.

{% hint style="warning" %}
Don't paste sensitive data into chat unless it's necessary for the task. AI-generated outputs can be incorrect, so review workflows and configurations before using them in production.
{% endhint %}

### Instance context stays inside one project

A conversation is bound to the project you opened it in. Automatic instance context and activity log lookups read only that project. Workflow searches and node type counting can include other projects you have permission to read.

n8n Assistant reads instance context with your own permissions, and n8n checks them on every message rather than once at the start. If you lose access to the project, n8n Assistant stops reading it.

Looking up an activity-entry ID outside the conversation's project gives the same answer as looking up a missing entry. These lookups don't reveal whether an entry exists in another project.

## Credit usage

On n8n Cloud, n8n Assistant uses [Assistant credits](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/assistant-credits), based on the tokens processed by the underlying AI model. Your plan includes a monthly allowance of Assistant credits that resets on the first day of every month. If you use it up, the instance owner can buy extra credits to keep using n8n Assistant until the next reset. Everyone on the instance shares one balance.

Assistant credits and [Gateway credits](../understand-workflows/use-gateway-credits.md) are separate. Assistant credits pay for your conversations with n8n Assistant, not for the AI models your workflows or agents call when they run. Gateway credits pay for those model calls, not for n8n Assistant. Topping up one doesn't add to the other.

Longer conversations, larger workflows, debugging sessions, and repeated iterations use more credits.

To reduce unnecessary usage:

- Be specific about the workflow goal and constraints.
- Start a new conversation for unrelated tasks.
- Review n8n Assistant's plan before asking it to build.
- Avoid asking it to regenerate the same workflow without adding new guidance.

To check your balance, open the credits menu in the n8n Assistant panel. For your plan's monthly allowance, see [n8n plans and pricing](https://n8n.io/pricing/).

Self-hosted n8n doesn't use Assistant credits. On a self-hosted instance, n8n Assistant runs on your own AI provider account. Refer to [Set up n8n Assistant](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/set-up-n8n-assistant).

## Related resources

* [Ways of building workflows](./)
* [Use n8n MCP server](connect-to-n8n-mcp-server.md)
* [Use templates](use-templates.md)
* [Use Ask n8n AI](use-the-ai-assistant.md)
* [Use Chat Hub](chat-hub.md)
