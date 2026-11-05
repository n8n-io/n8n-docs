---
description: >-
  Save preferences that n8n Assistant and connected MCP clients apply every time
  they build workflows and agents for you.
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
  anchors:
    visible: true
tags:
  - preview
---

# Preferences

Preferences are short instructions you write once, such as "Always connect an error workflow", that n8n Assistant and connected MCP clients apply every time they build workflows and agents for you.

{% hint style="info" %}
**Feature availability**

Preferences are available on:

* **n8n Cloud:** Starter, Pro
* **Self-hosted:** Community, Registered Community, Business

Preferences aren't available on n8n Cloud Enterprise or self-hosted Enterprise yet.

Preferences are available from n8n 2.40.0. Saving preferences from n8n Assistant, and the preferences tools on the n8n MCP server, are available from n8n 2.42.0.
{% endhint %}

{% hint style="info" %}
**Preview status**

Preferences are part of agentic context management, which is in Preview and may change in future releases. Avoid relying on it in production.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## What preferences are for

Use a preference for a rule you want AI tools to follow in every task, not only the current one. Good preferences cover:

* **Node and credential choices:** "Use the **Slack** credential named `ops-bot` for alerts."
* **Naming:** "Name nodes in English, starting with a verb."
* **How work is organized:** "Put new workflows in the `Drafts` folder."
* **Patterns to avoid:** "Don't use the **Code** node when a built-in node can do the job."
* **Communication style:** "Explain changes in two sentences or fewer."

Keep instructions for the current task in your prompt. "Make this one a POST request" belongs in the chat, not in a preference.

## Where n8n applies preferences

Two AI surfaces read preferences:

| Surface                                                                                                                 | When it reads preferences                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [n8n Assistant](../ways-of-building-workflows/n8n-assistant.md)                                                         | On every message you send, so a preference you save or edit applies from your next message, even in an open conversation.                        |
| MCP clients connected to the [n8n MCP server](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server) | When the client calls the `get_user_preferences` tool. The n8n MCP server tells clients to call it before they create or change anything in n8n. |

If a preference conflicts with something you ask for directly, the AI tool follows your request and tells you which preference it set aside.

## Preference scopes

A preference's scope decides who it applies to. Choose the scope in the **Scope** field when you create or edit a preference.

| Scope label                                              | Applies to                                       | Who can create, edit, or delete it                                                |
| -------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------- |
| **Just you · All projects**                              | Only you, in every project                       | You                                                                               |
| **Just you · Personal project**                          | Only you, when you work in your personal project | You                                                                               |
| A team project's name (shown as **Project** in the list) | Everyone who works in that project               | Project admins and project editors. Project viewers can see it but not change it. |
| **Global**                                               | Everyone on the instance                         | Instance owners and admins                                                        |

n8n applies every preference in scope at once. In a conversation, n8n Assistant receives the **Global** preferences, your own preferences, and the preferences of the project you opened the conversation in. An MCP client receives the **Global** preferences, your own preferences, and the preferences of every project you can read, grouped by project. A client that passes a `projectId` receives that one project's preferences instead of every project's.

Moving a preference to another scope needs permission to delete it from the old scope and to create it in the new one.

## Preference limits

| Limit                       | Value                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| Length of one preference    | 2,000 characters                                                                              |
| Preferences in one scope    | 50                                                                                            |
| Duplicate text in one scope | Not allowed. n8n refuses a preference whose text matches one already saved in the same scope. |

When a scope is full, delete a preference before you add another.

## Create a preference in settings

1. Select **Settings** > **Context**.
2. Select **Preferences**.
3. Select **Create preference**.
4. In **Preference**, write the instruction. Write it as you'd tell a colleague, for example "Always connect an error workflow, so that I'm notified on Slack if anything fails".
5. In **Scope**, choose who the preference applies to. See [Preference scopes](preferences.md#preference-scopes) for each option.
6. Select **Save**.

n8n Assistant applies the new preference from your next message. MCP clients apply it the next time they call `get_user_preferences`.

## Edit or delete preferences in settings

**Settings** > **Context** > **Preferences** lists every preference you can see. The list shows each preference's **Scope**, **Created by**, and **Last updated** values. **Created by** names the person who created the preference, followed by its origin in parentheses when an AI tool saved it, for example "Jane Doe (MCP)" or "Jane Doe (n8n assistant)".

* **To edit a preference:** open the preference's **Options** menu, select **Edit**, change the text or the scope, then select **Save**.
* **To delete a preference:** open the preference's **Options** menu, then select **Delete**.
* **To delete several preferences:** select them in the list, then select **Delete selected**.

Deleting can't be undone. n8n Assistant and MCP clients stop using a deleted preference immediately.

If you don't have permission to change a preference, n8n shows it as read-only.

## Save preferences from n8n Assistant

When you tell n8n Assistant about a lasting rule, for example "From now on, always add an error workflow", it saves the rule as a preference with the scope **Just you · All projects**. It doesn't save one-off instructions for the current task.

After it saves a preference, n8n Assistant shows a card in the chat with the saved text. From the card:

* Select **Edit** to change the text or the scope.
* In the **Edit preference** dialog, select **Remove preference** to delete it.

To see which preferences n8n Assistant applied to its latest reply, open the **+** menu in the chat input, then select **Preferences**.

Instance owners and admins control whether n8n Assistant can save preferences. In **Settings** > **Assistant** > **Permissions**, set **Save preferences from chat** to **Allow** (the default) or **Block**. With **Block** set, n8n Assistant still applies saved preferences but can't save new ones.

## Save preferences from an MCP client

An MCP client connected to the n8n MCP server can read and save preferences through four tools:

| Tool                     | What it does                                                      |
| ------------------------ | ----------------------------------------------------------------- |
| `get_user_preferences`   | Reads the preferences that apply to you                           |
| `save_user_preference`   | Saves a new preference with the scope **Just you · All projects** |
| `update_user_preference` | Changes a preference's text, its scope, or both                   |
| `undo_user_preference`   | Removes a preference that an MCP client saved for you             |

`undo_user_preference` can't remove a preference you wrote in settings, or one saved for a project or the whole instance. Remove those in **Settings** > **Context** > **Preferences**.

If your MCP client supports MCP elicitation, n8n shows you a review form after `save_user_preference` saves a preference. In the form, you can:

* Accept the text as shown, or edit it first.
* Change the scope to **Everyone on this n8n instance**, if you're an instance owner or admin.
* Decline the form to remove the preference.

Closing the form without answering keeps the preference as saved.

### MCP client permissions for preferences

When you connect an MCP client with OAuth, n8n asks you to approve two permissions for preferences:

| Permission on the consent screen         | OAuth scope          | Tools                                                                    |
| ---------------------------------------- | -------------------- | ------------------------------------------------------------------------ |
| **Read AI preferences**                  | `aiPreference:read`  | `get_user_preferences`                                                   |
| **Save, update and undo AI preferences** | `aiPreference:write` | `save_user_preference`, `update_user_preference`, `undo_user_preference` |

n8n only offers these permissions when preferences are on for your instance. If you connected a client before preferences were on, reconnect it to grant them. See [Reviewing and revoking client access](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server#revoking-client-access).

For each tool's parameters and output, see [User preferences](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server/mcp-server-tools-reference#user-preferences) in the MCP server tools reference.

## Write effective preferences

AI tools apply a preference to every task in its scope, so write it to hold up in every task.

* **State one rule per preference.** One rule is easier to edit or delete later than a paragraph of several.
* **Say what to do, and why if it helps.** "Use the **Gmail** credential named `support-inbox` for customer emails" beats "Use the right credential".
* **Name exact nodes, credentials, folders, and projects.** AI tools match names exactly.
* **Avoid rules that only fit one workflow.** Put those in your prompt instead.

| Instead of                                                     | Write                                                                          |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| "Make the webhook path `/orders`."                             | Keep it in the prompt. It only applies to one workflow.                        |
| "Be careful with errors."                                      | "Connect every new workflow to the `Error alerts` error workflow."             |
| "Use good names, put things in folders, and avoid Code nodes." | Three preferences: one for naming, one for folders, one for the **Code** node. |

## Turn on preferences on a self-hosted instance

Preferences are on by default. If your instance has telemetry turned off (`N8N_DIAGNOSTICS_ENABLED=false`), or can't reach n8n's feature flag service, preferences stay off.

To turn preferences on, set `N8N_FEATURE_FLAG_OVERRIDES`. For example, add this value to your `.env` file. Preserve any other entries in the JSON object.

```bash
N8N_FEATURE_FLAG_OVERRIDES='{"111_context_preferences":"variant"}'
```

Restart n8n to apply the change.

The value must be the string `"variant"`. A boolean value, such as `true`, doesn't turn preferences on.

With preferences off, n8n hides **Preferences** in **Settings** > **Context**, n8n Assistant doesn't read or save preferences, and the n8n MCP server doesn't offer the preferences tools. n8n keeps preferences saved earlier, and applies them again when you turn preferences back on.

## Troubleshoot preferences

### Preferences doesn't appear in settings

Check that your instance runs n8n 2.40.0 or later, and that it isn't on an Enterprise plan. On a self-hosted instance with telemetry turned off, see [Turn on preferences on a self-hosted instance](preferences.md#turn-on-preferences-on-a-self-hosted-instance).

### An MCP client doesn't list the preferences tools

Check that preferences are on for your instance, then check that the client has the **Read AI preferences** and **Save, update and undo AI preferences** permissions. If you connected the client before preferences were on, revoke its access and connect it again.

### n8n Assistant says saving preferences is blocked

An instance owner or admin has set **Save preferences from chat** to **Block** in **Settings** > **Assistant** > **Permissions**, or the instance is connected to a protected source control branch. Create the preference in **Settings** > **Context** > **Preferences** instead, if you have permission.

### An AI tool ignores a preference

Check that the preference's scope covers the project you're working in. In n8n Assistant, a team project's preference only applies in conversations opened in that project. If the preference conflicts with your prompt, the AI tool follows your prompt.

## Related resources

* [Agentic context management](./)
* [Skills](skills.md)
* [Use n8n Assistant](../ways-of-building-workflows/n8n-assistant.md)
* [Use n8n MCP server](../ways-of-building-workflows/connect-to-n8n-mcp-server.md)
* [Connect to n8n MCP server](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server)
* [MCP server tools reference](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server/mcp-server-tools-reference)
