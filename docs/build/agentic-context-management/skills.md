---
description: >-
  Create skills that agents and n8n Assistant follow for specific tasks, and
  import skills from GitHub.
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

# Skills

A skill is a set of instructions, with optional reference files, that agents and n8n Assistant follow for one kind of task. You manage skills in **Settings** > **Context** > **Skills**.

{% hint style="info" %}
**Feature availability**

TODO: first n8n version and plans for skills and for importing skills from GitHub.
{% endhint %}

{% hint style="info" %}
**Preview status**

Skills are part of agentic context management, which is in Preview and may change in future releases. Avoid relying on it in production.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## What skills are for

Use a skill for a procedure that agents and n8n Assistant follow for one kind of task, such as triaging a support ticket. An agent reads the description of each skill it can use. When a request matches a description, the agent follows that skill's instructions.

* Use a [preference](preferences.md) for a rule that applies to every task, such as how to name nodes.
* Use a skill for steps, checks, and reference material that only some tasks need.
* Keep instructions for the current task in your prompt.

## What a skill contains

n8n skills follow the open [Agent Skills](https://agentskills.io/home) format. A skill is a folder with a `SKILL.md` file. The file holds the skill's name, a description of when to use the skill, and the instructions. See the [Agent Skills specification](https://agentskills.io/specification) for the full format.

In n8n, a skill keeps its `SKILL.md` and the Markdown files in its `references/` folder. n8n doesn't support scripts, templates, or other files in a skill, and never runs scripts.

In the n8n editor, the fields of a skill have these labels:

| Field in `SKILL.md` | Label in n8n | Limit |
| ------------------- | ------------ | ----- |
| `name` | **Name** | 128 characters, unique in the skill's scope |
| `description` | **When to use this skill** | 1,024 characters |
| Instructions after the frontmatter | **What the skill does** | 65,536 characters |
| Files in `references/` | **References** | 20 Markdown files, 65,536 characters each, 262,144 characters in total |

## Skill scopes

A skill's scope decides who can use it. When you create a skill, you choose its scope.

| Scope | Who can use the skill | Who can create, edit, or delete it |
| ----- | --------------------- | ---------------------------------- |
| **Global** | Agents in every project | Instance owners and admins |
| A team project | Agents in that project | Project admins and project editors. Project viewers can see the skill but not change it. |
| **Personal project** | Only you | You |
| One agent (shown as **{agent name} only**) | Only that agent | People who can edit the agent's project |

You create a skill for one agent in the agent builder, not in settings. See [Use skills in agents](skills.md#use-skills-in-agents).

To move a skill to another scope, open it and change its scope. You need permission to delete the skill in its current scope, because a move removes it from there. If an agent that uses the skill can't reach the new scope, n8n refuses the move.

## Create a skill

1. Select **Settings** > **Context** > **Skills**.
2. Select **Create skills** > **Create manually**.
3. Choose how to start:
   * To upload a skill you already have, drop the skill folder or its `SKILL.md` file, or select **Upload folder** or **Upload SKILL.md**.
   * To write a skill from scratch, select **Add manually**.
4. Fill in or check **Name**, **When to use this skill**, and **What the skill does**.
5. Optional: under **References**, select **Add reference** to add a Markdown file.
6. Choose the scope.
7. Select **Save skill**.

An uploaded `SKILL.md` must start with YAML frontmatter that has a `name` and a `description`. A folder must contain a `SKILL.md` file. n8n refuses a folder with scripts, and reference files that aren't Markdown.

## Import skills from GitHub

You can import skills from a GitHub repository instead of copying them by hand. n8n finds every skill in the repository, checks each one for security issues, and imports the skills you pick. n8n calls the imported skills synced skills. GitHub stays their source of truth, and you can't edit their content in n8n.

A connected repository is a source. A source and all its skills have one scope. All skills that you import from one source get the scope that you pick for it.

### GitHub links n8n accepts

Paste a link to a whole repository, a folder, or one skill:

| Link | Example | What n8n reads |
| ---- | ------- | -------------- |
| Repository | `https://github.com/rmakowiak/example-skills` | Every skill on the default branch |
| Folder | `https://github.com/rmakowiak/example-skills/tree/main/support` | Every skill in the folder, on the branch in the link |
| One skill | `https://github.com/rmakowiak/example-skills/blob/main/support/triage/SKILL.md` | That skill only |

The link must start with `https://github.com/`. Links to a tag or a commit don't work. Use a link to a branch.

### How n8n finds skills

n8n reads every folder with a `SKILL.md` file, up to 8 folders below the link. It lists at most 200 skills. If a repository has more, link to a folder to see the others. n8n skips the `node_modules`, `.git`, `vendor`, and `third_party` folders. A skill folder inside another skill folder belongs to the outer skill.

The skill's name comes from the `name` in its frontmatter. If there's no `name`, n8n uses the folder name. Every skill needs a `description`.

n8n imports only `SKILL.md` and the Markdown files in `references/`. The skill list shows which other files n8n leaves out, such as scripts. n8n never runs scripts from a skill.

### Import skills from a link

Use a link to import from a public repository, or to import one folder or one skill.

1. Select **Settings** > **Context** > **Skills**.
2. Select **Create skills** > **Connect to GitHub**.
3. On the **Connect a source** screen, select **paste URL manually**.
4. In **Scope**, choose where the skills go. You only see the scopes where you can create skills.
5. In **Credential**, keep **None, the repository is public**. For a private repository, choose a GitHub credential. See [Credentials for private repositories](skills.md#credentials-for-private-repositories).
6. In **GitHub link**, paste the link.
7. Select **Next**.
8. In **Choose skills**, select the skills to import.
9. If n8n asks for it, select **I reviewed the warnings**.
10. Select **Add**.

n8n runs a security check on each skill and shows the result next to it. You can't select a skill marked **Blocked**, and nobody can override that result. For a skill marked **Review**, read the warnings in the list before you select **I reviewed the warnings**.

If a skill has the same name as a skill in the scope, n8n marks it **Name taken** and doesn't import it.

### Import skills from your GitHub account

Pick a repository from the list of repositories that a GitHub credential can read, instead of pasting a link.

1. Select **Settings** > **Context** > **Skills**.
2. Select **Create skills** > **Connect to GitHub**.
3. On the **Connect a source** screen, select **Connect to GitHub**.
4. In **Scope**, choose where the skills go.
5. In **Credential**, choose a GitHub credential. To create one, select **+ Connect a new GitHub account** or **+ Connect a GitHub App installation**.
6. In **Repository owner**, choose the user or organization.
7. In **Repository**, choose the repository. A lock icon marks a private repository.
8. Select **Next**, then select the skills and import them as in [Import skills from a link](skills.md#import-skills-from-a-link).

n8n reads the default branch of the repository. If the credential can read more repositories than n8n lists, paste a link instead.

### Credentials for private repositories

To read a private repository, n8n needs a [GitHub credential](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/credentials/github) of one of these types:

* An access token (personal access token, classic or fine-grained)
* A GitHub App installation

GitHub OAuth2 credentials don't work for skills yet. Support for them is coming in a later release. n8n only reads from github.com. A credential for a GitHub Enterprise server doesn't work.

n8n stores the credential with the source and uses it again for later checks. The credential must belong to the scope of the source:

| Scope of the source | Credentials you can pick |
| ------------------- | ------------------------ |
| A team project | Credentials that the project owns, credentials that someone shared with the project, and global credentials |
| **Personal project** | Credentials that you own, and credentials that someone shared with you |
| **Global** | Credentials that an instance owner or admin owns in their personal project |

When you create a credential from the import dialog, n8n creates it in the scope of the source. For a Global source, n8n creates it in your personal project.

### Add more skills from a connected repository

After you import skills from a repository, you can import more of its skills later. n8n doesn't connect the repository a second time.

1. Select **Settings** > **Context** > **Skills**, then select the **Sources** tab.
2. Open the options menu of the source, then select **Add more skills**.
3. Select the skills to import, then select **Add**.

The list shows only the skills that you didn't import from this source yet. The new skills get the scope of the source.

You can also select **Add more skills** in the source's details, or in the message that n8n shows when you connect the same repository to the same scope again. You need permission to create skills in the scope of the source.

### Repository already connected

n8n compares the repository, not the branch or the folder in the link:

| Where the repository is already connected | What happens |
| ----------------------------------------- | ------------ |
| **Global** | n8n blocks the import. Every project can already use the skills of a Global source. |
| The scope you picked | n8n blocks the import. Select **Add more skills** to import more skills from the source that exists. |
| Another project that you can see | n8n warns you, and you can continue. Each scope gets its own copy of the skills. |
| A project that you can't see | n8n shows no message. |

### Work with synced skills

A synced skill shows a **Synced from** banner with the name of its repository. To change the skill, select **Open in GitHub** and edit it there.

You can attach a synced skill to agents, view its versions, download it, and delete it, as with any other skill. You can't edit its content in n8n or move it on its own. A synced skill moves only with its source.

To make a synced skill editable, open the skill's options menu in the list and select **Stop syncing**. The skill stays in its scope with all its versions, and agents keep using it. After that, you can edit it and move it. The skill no longer gets changes from GitHub, and you can't undo this.

## Use skills in agents

To add a skill to an agent:

1. Open the agent in the agent builder.
2. In the **Skills** section, select **Add skill**.
3. Search for the skill and select it, or select **Create skill** to write a new skill for this agent.

An agent can use Global skills, the skills of its own project, and its own agent skills. The agent reads the description of each skill, and follows a skill's instructions when a request matches. See [Build and manage agents](../build-and-manage-agents/) for the rest of the agent setup.

## Use skills in n8n Assistant and MCP clients

{% hint style="info" %}
**Preview status**

Skills in n8n Assistant, and loading skills automatically in MCP clients, are in Preview and may change in future releases. They aren't on every instance yet.
{% endhint %}

Each skill has two settings in its edit dialog:

* **Enable for n8n Assistant**: n8n Assistant can use the skill. n8n Assistant reads Global skills and the skills of the project you opened the conversation in. It doesn't read skills that belong to one agent.
* **Enable for MCP clients**: MCP clients that support skills load the skill automatically. With this setting off, MCP clients can still find and read the skill with the skill tools.

In the skills list, the **n8n Assistant** badge and the MCP icon show which skills have these settings on.

An MCP client connected to the [n8n MCP server](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server) can manage skills with these tools:

| Tool | What it does |
| ---- | ------------ |
| `search_n8n_skills` | Searches skills by name, scope, or project |
| `get_skill` | Reads a skill with its instructions, references, and the agents that use it |
| `create_skill` | Creates a skill |
| `update_skill` | Changes a skill. A content change creates a new version. |
| `delete_skill` | Deletes a skill. n8n refuses while an agent uses it. |

The scopes and permissions of skills apply to MCP clients too.

For each tool's parameters and output, see [Skills](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server/mcp-server-tools-reference#skills) in the MCP server tools reference.

### MCP client permissions for skills

When you connect an MCP client with OAuth, n8n asks you to approve two permissions in the **Skills** group:

| Permission on the consent screen | OAuth scope | Tools |
| -------------------------------- | ----------- | ----- |
| **List and read skills** | `skill:read` | `search_n8n_skills`, `get_skill` |
| **Create, update and delete skills** | `skill:write` | `create_skill`, `update_skill`, `delete_skill`, `search_n8n_skills`, `get_skill` |

If you connected a client before skills were on, reconnect it to grant these permissions. See [Reviewing and revoking client access](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server#revoking-client-access).

## Create and change skills from n8n Assistant

You can ask n8n Assistant to list, read, create, update, or delete skills, for example "Create a skill for triaging support tickets". n8n Assistant creates skills for a project or for the whole instance, and only where you have permission. It can't add a skill to an agent. Use the agent builder for that.

Before n8n Assistant creates, updates, or deletes a skill, it asks you to approve the action. Select **Allow once** to approve one action. For creating and updating, you can also select **Always allow** to approve them for the rest of the session. n8n Assistant asks before each deletion.

Instance owners and admins control these actions in **Settings** > **Assistant** > **Permissions**, in the **Skills** group:

| Permission | Default |
| ---------- | ------- |
| **Create skills** | **Ask first** |
| **Update skills** | **Ask first** |
| **Delete skills** | **Ask first** |

Set a permission to **Allow** to skip the approval, or to **Block** to stop n8n Assistant from doing the action. With **Block** set, n8n Assistant can still list and read skills.

## Skill versions

Each save that changes a skill's content creates a new version. A save that changes nothing creates no version.

Agents use versions this way:

* A draft agent uses the latest version of each skill, unless you pinned a version in the agent.
* A published agent keeps the version it had when you published it. It moves to a newer version only when you publish the agent again.

When a skill changes, a published agent that uses it shows unpublished changes.

To see the history of a skill, open its options menu in the list and select **View timeline** or **Compare versions**. From an older version, select **Restore as new version** to make it the latest version again.

## Manage skills

The skills list shows each skill's **Scope**, the **Agents** that use it, **Created by**, and **Last updated**. Filter the list by scope, agent, or creator, or search by name.

Each skill's options menu has these actions:

* **Edit**, or **View** if you can't change the skill
* **View timeline** and **Compare versions**
* **Download**
* **Stop syncing**, for synced skills only
* **Delete**

n8n doesn't delete a skill that an agent uses. Remove the skill from each agent first, including agents in published versions. Deleting can't be undone.

## Write effective skills

* **Write the description for matching.** Agents pick a skill by its **When to use this skill** text. Name the tasks and the words that requests use, for example "Use when someone asks to triage a support ticket or set its priority."
* **Cover one kind of task in each skill.** A narrow skill matches the right requests and is easier to update.
* **Write the instructions as steps.** Say what to do, in which order, and what the result looks like.
* **Move long material to references.** Put examples, tables, and policies in `references/` files, and name the file in the instructions where the agent needs it.

## Turn on skills on a self-hosted instance

Skills are part of the agents module, which is on by default. If you turned off the agents module with `N8N_DISABLED_MODULES`, skills are off too.

n8n turns on three parts of skills step by step, with feature flags:

| Flag | Turns on |
| ---- | -------- |
| `136_skill_sync` | [Import skills from GitHub](skills.md#import-skills-from-github) |
| `130_attach_skills_to_assistant` | **Enable for n8n Assistant**, and skills in n8n Assistant |
| `128_mcp_skills_extension` | **Enable for MCP clients**, and loading skills automatically in MCP clients |

To turn them on yourself, set `N8N_FEATURE_FLAG_OVERRIDES`. For example, add this value to your `.env` file. Preserve any other entries in the JSON object.

```bash
N8N_FEATURE_FLAG_OVERRIDES='{"136_skill_sync":true,"130_attach_skills_to_assistant":true,"128_mcp_skills_extension":true}'
```

Restart n8n to apply the change. Each value must be the boolean `true`, not the string `"variant"`.

## Related resources

* [Agentic context management](./)
* [Preferences](preferences.md)
* [Build and manage agents](../build-and-manage-agents/)
* [Use n8n Assistant](../ways-of-building-workflows/n8n-assistant.md)
* [Use n8n MCP server](../ways-of-building-workflows/connect-to-n8n-mcp-server.md)
* [Connect to n8n MCP server](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server)
* [MCP server tools reference](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server/mcp-server-tools-reference)
