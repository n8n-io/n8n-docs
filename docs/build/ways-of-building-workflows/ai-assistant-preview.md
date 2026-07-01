---
title: Use AI Assistant (Preview)
description: >-
  Use the AI Assistant to create, edit, test, and troubleshoot n8n workflows from
  a chat.
status: preview
layout:
  description:
    visible: false
---

# Use AI Assistant (Preview)

The AI Assistant is a chat-based agent in n8n that helps you create, edit, test, and troubleshoot workflows from natural language. It can also help with instance tasks, such as renaming or activating workflows.

Describe what you want to automate. The AI Assistant can plan the workflow, build it in your selected project, test it, and help you fix errors.

The result is a normal n8n workflow. You can open it, inspect it, edit it, test it, and publish it like any other workflow.

{% hint style="info" %}
The AI Assistant is available on n8n Cloud only.

The AI Assistant is in Preview. It can make mistakes, and behavior may change while the feature is in development. Always review generated workflows before using them in production.
{% endhint %}

## What the AI Assistant can help with

You interact with the AI Assistant in a chat. It can use tools inside n8n to help you create and debug workflows.

You can ask the AI Assistant to:

- **Create workflows:** describe the automation you want, and the AI Assistant can generate a workflow.
- **Edit workflows:** ask it to change a workflow, add nodes, update logic, or adjust configuration.
- **Test and troubleshoot workflows:** ask it to run checks, inspect relevant errors, and suggest fixes.
- **Help with credentials:** prompt you to select an existing credential or create a new one, without pasting secrets into chat.
- **Use n8n resources:** create or update supporting resources such as [Data Tables](../work-with-data/data-tables.md) when needed.
- **Research approved websites:** when web access is enabled, the AI Assistant asks for permission before accessing a domain.

## Before you start

To use the AI Assistant, you need access to an n8n instance where the feature is enabled.

Make sure that:

- You can access the project where you want the AI Assistant to work.
- You have permission to use the workflows, credentials, and resources needed for the task.
- You know what you want the workflow to do.

The AI Assistant uses the permissions of your n8n user. It can only access the workflows, credentials, and resources that you can access in the selected project.

## Write effective prompts

Specific prompts help the AI Assistant produce better results with fewer iterations.

When you write a prompt, include:

- what should trigger the workflow,
- which apps or services the workflow should use,
- what data the workflow should read, send, or update,
- what should happen when the workflow succeeds,
- what should happen when the workflow fails,
- whether the AI Assistant should ask before publishing the workflow.

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

The AI Assistant can take actions in your n8n instance, but you stay in control.

Before you use an AI-generated workflow in production:

- Review the workflow logic.
- Check node configuration and credentials.
- Test the workflow with expected input data.
- Check execution results and error handling.
- Confirm that the workflow doesn't perform unintended actions.

The AI Assistant asks for confirmation before high-impact actions, such as publishing, deleting, or making other important changes.

## Credential handling

Your credential secrets are never sent to the AI, and the AI never sees them.

When a workflow needs credentials, the AI Assistant prompts you with a credential card in the chat. From that card, you can:

- Select an existing credential that you have access to in the project.
- Create a new credential.

If you create a new credential, you enter the secret in the standard n8n credential screen, not in the chat. Don't paste API keys, passwords, or tokens into the conversation.

## Web access

When web research is enabled, the AI Assistant asks for permission before accessing an external domain.

Review the requested domain before you approve access.

## Preview limitations

The AI Assistant is a Preview feature. Availability, supported actions, and behavior may change.

During Preview:

- The AI Assistant may not support some actions yet.
- Some capabilities may roll out gradually.
- The AI Assistant may ask for clarification more often than expected.
- Generated workflows may need manual review and correction.
- UI, credit usage, and supported resources may change.

## Data and privacy

The AI Assistant processes the information it needs to help build and troubleshoot workflows.

Depending on the task, this can include:

- your prompts and chat messages,
- workflow structure and node configuration,
- selected execution and error details used for troubleshooting,
- credential names, credential types, or connection status,
- approved web pages or domains, when web research is enabled.

The AI Assistant doesn't require you to paste secrets into chat. Enter API keys, passwords, and tokens through the standard n8n credential screens.

{% hint style="warning" %}
Don't paste sensitive data into chat unless it's necessary for the task. AI-generated outputs can be incorrect, so review workflows and configurations before using them in production.
{% endhint %}

## Credit usage

The AI Assistant uses credits based on the tokens processed by the underlying AI model.

Longer conversations, larger workflows, debugging sessions, and repeated iterations use more credits.

To reduce unnecessary usage:

- Be specific about the workflow goal and constraints.
- Start a new conversation for unrelated tasks.
- Review the AI Assistant's plan before asking it to build.
- Avoid asking it to regenerate the same workflow without adding new guidance.

To get more credits during Preview, upgrade your plan. More ways to top up are coming.

For current plan details, see [n8n Plans and Pricing](https://n8n.io/pricing/).
