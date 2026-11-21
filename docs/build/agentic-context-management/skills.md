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

A skill is a set of instructions, with optional reference files, that agents and n8n Assistant follow for a specific task. You manage skills in **Settings** > **Context** > **Skills**.

{% hint style="info" %}
**Feature availability**

Skills are available on:

* **n8n Cloud:** Starter, Pro
* **Self-hosted:** Community, Registered Community, Business

Skills aren't available on n8n Cloud Enterprise or self-hosted Enterprise yet.

Skills are available from n8n 2.45.0. Managing skills from n8n Assistant, and the MCP skills extension on the n8n MCP server, are available from n8n 2.46.0. The **Enable for n8n Assistant** and **Enable for MCP clients** settings, and importing skills from GitHub, are available from n8n 2.47.0. Reviewing updates, changing the scope or the credential of a source, deleting a source, and the GitHub sign-in are available from n8n 2.49.0. The **Skill Sync** setting, and importing skills from GitHub with n8n Assistant and with MCP clients, are available from n8n 2.50.0.
{% endhint %}

{% hint style="info" %}
**Preview status**

Skills are part of agentic context management, which is in Preview and may change in future releases. Avoid relying on it in production.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## What skills are for

Use a skill for a procedure that agents and n8n Assistant follow for a specific task, such as triaging a support ticket. An agent reads the description of each skill it can use. When a request matches a description, the agent follows that skill's instructions.

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

To move a skill to another scope, open it and change its scope. You need permission to delete the skill in its current scope, because a move removes it from there. If an agent that uses the skill can't reach the new scope, n8n refuses the move.

## Create a skill

1. Select **Settings** > **Context** > **Skills**.
2. Select **Create skills**, then choose how to start:
   * To write a skill from scratch, select **Create manually**.
   * To upload a skill you already have, select **Upload folder** or **Upload SKILL.md**. n8n opens the skill with the content of the upload.
3. Fill in or check **Name**, **When to use this skill**, and **What the skill does**.
4. Optional: under **References**, select **Add reference** to add a Markdown file.
5. Choose the scope.
6. Select **Save skill**.

An uploaded `SKILL.md` must start with YAML frontmatter that has a `name` and a `description`. A folder must contain a `SKILL.md` file. n8n refuses a folder with scripts, and reference files that aren't Markdown.

## Import skills from GitHub

You can import skills from a GitHub repository instead of copying them by hand. This feature is Skill Sync. n8n finds every skill in the repository, checks each one for security issues, and imports the skills you pick. After the import, n8n checks the repository for changes, and you decide which updates your skills get.

n8n calls a connected repository a source.

### Turn Skill Sync on or off

Instance owners and admins control Skill Sync for the whole instance:

1. Select **Settings** > **Context** > **Skills**.
2. Select **Skill settings**, the settings icon next to **Create skills**.
3. Turn **Skill Sync** on or off.

Skill Sync is on by default. On an Enterprise plan, it's off until an owner or admin turns it on.

When Skill Sync is off, nobody can import skills from GitHub, and n8n stops checking for updates. The sources and the synced skills stay, and agents keep using the skills.

If the setting shows **Managed via environment variables**, you can't change it here. See [Turn on skills on a self-hosted instance](skills.md#turn-on-skills-on-a-self-hosted-instance).

### GitHub links n8n accepts

You can paste a link to a whole repository, a folder, or one skill:

| Link | Example | What n8n reads |
| ---- | ------- | -------------- |
| Repository | `https://github.com/rmakowiak/example-skills` | Every skill on the default branch |
| Folder | `https://github.com/rmakowiak/example-skills/tree/main/support` | Every skill in the folder, on the branch in the link |
| One skill | `https://github.com/rmakowiak/example-skills/blob/main/support/triage/SKILL.md` | That skill only |

The link must start with `https://github.com/`. n8n doesn't read other GitHub servers, such as GitHub Enterprise Server. Links to a tag or a commit don't work. Use a link to a branch.

### How n8n finds skills

n8n reads every folder with a `SKILL.md` file, up to 8 folders below the link. It lists at most 200 skills. If a repository has more, link to a folder to see the others. n8n skips the `node_modules`, `.git`, `vendor`, and `third_party` folders. A skill folder inside another skill folder belongs to the outer skill.

The skill's name comes from the `name` in its frontmatter. If there's no `name`, n8n uses the folder name. Every skill needs a `description`.

n8n imports only `SKILL.md` and the Markdown files in `references/`. The review step shows which other files n8n leaves out, such as scripts. n8n never runs scripts from a skill.

### Import skills from a repository

1. Select **Settings** > **Context** > **Skills**.
2. Select **Create skills** > **Connect to GitHub**.
3. In **Who can use these skills**, choose the scope. You only see the scopes where you can create skills. All skills from the repository get this scope.
4. In **GitHub credential**, keep **None, the repository is public** for a public repository. For a private repository, choose a GitHub credential. See [Credentials for private repositories](skills.md#credentials-for-private-repositories).
5. In **Repository**, paste a link. If you chose a credential, you can also search the repositories that the credential can read, and pick one. A lock icon marks a private repository.
6. Select **Next**.
7. Review the skills. n8n sorts them into the **Warning**, **Passed**, and **Blocked** tabs, and selects every skill that it can import. Select a skill to read its files. Clear the skills you don't want.
8. If a selected skill has warnings, read them, then select **I have reviewed the warnings**.
9. Select **Import skills**. The button shows the number of skills and the scope.

n8n runs a security check on each skill and sorts the skills by the result:

| Tab | What it means |
| --- | ------------- |
| **Passed** | The check found no issues. |
| **Warning** | The check found something that a person must read first, such as a link to a new domain or hidden Unicode characters. You can import the skill after you read the warnings. |
| **Blocked** | You can't import the skill, and nobody can override that. The tab shows the reason: the security check blocked the skill, a skill in the scope already has the same name, or n8n can't read the `SKILL.md`. |

n8n reads the default branch of a repository that you pick from the list. If the credential can read more repositories than n8n lists, paste a link instead.

n8n checks the skills again when you import them. If a skill changed in GitHub after the review step and no longer passes, n8n leaves it out and tells you why.

### Credentials for private repositories

To read a private repository, n8n needs a [GitHub credential](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/credentials/github) of one of these types:

* An access token (personal access token, classic or fine-grained)
* A GitHub App installation
* A GitHub OAuth2 sign-in

To create a credential in the import dialog, open **GitHub credential** and select **+ Connect a new GitHub account**, **+ Connect a GitHub App installation**, or **+ Sign in with GitHub**.

{% hint style="warning" %}
A GitHub sign-in gives n8n write access to every repository that the account can reach, and admin access to its organizations. n8n only reads skills. For read-only access, use a fine-grained token or a GitHub App.
{% endhint %}

n8n stores the credential with the source and uses it again for later checks. The credential must belong to the scope of the source:

| Scope of the source | Credentials you can pick |
| ------------------- | ------------------------ |
| A team project | Credentials that the project owns, credentials that someone shared with the project, and global credentials |
| **Personal project** | Credentials that you own, and credentials that someone shared with you |
| **Global** | Credentials that an instance owner or admin owns in their personal project |

When you create a credential from the import dialog, n8n creates it in the scope of the source. For a Global source, n8n creates it in your personal project.

### Sources in the skills list

The skills list groups synced skills under their source. The row of a source shows:

* The repository and the branch.
* The scope of the source.
* The status of the source. See [Source status](skills.md#source-status).
* A **new** count: the skills in the repository that you didn't import yet.
* An **updates** count: the updates that wait for review.

The options menu of a source has these actions. You only see the actions that you have permission for.

| Action | What it does |
| ------ | ------------ |
| **Review skills** | Opens the review of new skills and updates |
| **Check for updates** | Checks the repository now, at most once a minute for each source |
| **Change scope** | Moves the source and all its synced skills to another scope |
| **Open in GitHub** | Opens the repository in GitHub |
| **Replace credential** | Picks another credential for the source. n8n makes sure that the credential can read the repository before it saves. |
| **Delete source** | Removes the source. You choose whether its skills stay. |

### Add more skills from a connected repository

When a source has skills that you didn't import, its row shows a **new** count.

1. Open the options menu of the source, then select **Review skills**. You can also select the **new** count.
2. Select the new skills to import. n8n marks them **New** and doesn't select them for you.
3. If a selected skill has warnings, read them, then select **I have reviewed the warnings**.
4. Select **Import skills**.

The new skills get the scope of the source. You need permission to create skills in that scope.

If you don't want a skill, select it, then select **Remove from new count**. The skill stays in **Review skills**, and n8n counts it again when its content changes.

### Review and accept updates

n8n checks each source every hour. To check sooner, open the options menu of the source and select **Check for updates**.

A change in GitHub doesn't change your skills. n8n stores the change as an update that waits for review, and the skill shows **Update available**. Agents keep using the current version until someone accepts the update.

1. On the row of the source, select the **updates** count. You can also select **Review skills** in the options menu.
2. Select an update to read what changed. n8n shows the changed files, and the agent drafts that use the update after you accept it.
3. Clear the updates that you don't want yet. They keep waiting for review.
4. If a selected update has warnings, read them, then select **I have reviewed the warnings**.
5. Select **Update skills**.

Each accepted update creates a new version of the skill. Published agents keep their version until you publish them again. See [Skill versions](skills.md#skill-versions).

n8n runs the security check on each update. A skill with **Update blocked** has an update that you can't accept. Fix the skill in GitHub, then check for updates again. n8n also refuses an update that gives the skill a name that another skill already uses.

If the repository changes while you review, n8n applies none of the updates and asks you to review the latest changes.

### Source status

A source that n8n can read shows no status text. Hover over its status icon to see the time of the last check. If a check fails, the row shows one of these:

| Status | What it means |
| ------ | ------------- |
| **Credential issue** | n8n can't use the credential of the source. Select **Replace credential** in the options menu of the source. |
| **Source unavailable** | n8n can't read the source. The repository or the branch can be missing, n8n can have no access, or GitHub can be down. |
| **Checking delayed** | GitHub limited the requests. n8n checks again later. |

With any status, your skills keep their last accepted version, and agents keep using them.

### Repository already connected

n8n compares the repository, not the branch or the folder in the link:

| Where the repository is already connected | What happens |
| ----------------------------------------- | ------------ |
| **Global** | n8n blocks the import. Every project can already use the skills of a Global source. |
| The scope you picked | n8n blocks the import. Select **View source** to go to the source that exists. To import more of its skills, see [Add more skills from a connected repository](skills.md#add-more-skills-from-a-connected-repository). |
| Another project that you can see | n8n tells you, and you can continue. Each scope gets its own skills and reviews. |
| A project that you can't see | n8n shows no message. |

### Work with synced skills

A skill that you import from GitHub is a synced skill. It shows a **Synced from** banner with the name of its repository. To change the skill, select **Open in GitHub** and edit it there. Then [review and accept the update](skills.md#review-and-accept-updates) in n8n.

You can attach a synced skill to agents, view its versions, download it, and delete it, as with any other skill. You can't edit its content in n8n or move it on its own. A synced skill moves only with its source.

To make a synced skill editable, open the skill's options menu in the list and select **Stop syncing**. The skill stays in its scope with all its versions, and agents keep using it. After that, you can edit it and move it. The skill no longer gets updates from GitHub, and you can't undo this.

### Change the scope of a source

1. Open the options menu of the source, then select **Change scope**.
2. Choose the new scope. You only see the scopes where you can create skills.
3. If the source uses a credential, choose a credential that the new scope can use.
4. Select **Change scope**.

All synced skills move with the source. Their content and versions stay the same. n8n refuses the move in these cases:

* A skill in the new scope has the same name as a skill of the source. Rename the skill in the new scope, or rename the synced skill in GitHub.
* An agent that uses a skill of the source can't use skills from the new scope. Remove the skill from the agent, or choose another scope.
* The repository is already connected in the new scope or in **Global**.

### Delete a source

1. Open the options menu of the source, then select **Delete source**.
2. Choose what happens to the synced skills:
   * To delete the source and its synced skills, select **Delete skills**. You can't undo this.
   * To remove the source and keep its skills, select **Stop syncing**. The skills keep their versions, agents keep using them, and people with edit access can edit them in n8n.

n8n doesn't delete the skills of a source while an agent uses one of them. Remove the skills from each agent first, or select **Stop syncing**.

### Import skills with n8n Assistant or an MCP client

n8n Assistant and MCP clients can also work with GitHub repositories. They can:

* List the repositories that you can see, with their sync status and the number of updates that wait for review.
* Preview the skills in a link to a public repository, with the result of the security check for each skill.
* Connect a public repository and import the skills you pick.

Skill Sync must be on. The rules of the import dialog apply: the [links n8n accepts](skills.md#github-links-n8n-accepts), the scopes where you can create skills, the security check, and the rules for a [repository that's already connected](skills.md#repository-already-connected). n8n imports the skills as synced skills.

n8n Assistant and MCP clients import only skills that pass the security check with no warnings. Do these tasks in **Settings** > **Context** > **Skills**:

* Import skills from a private repository. n8n Assistant and MCP clients can't use a GitHub credential.
* [Import more skills](skills.md#add-more-skills-from-a-connected-repository) from a repository that's already connected in the scope.
* Import a skill that has warnings. A person must read the warnings first.
* [Review and accept the updates](skills.md#review-and-accept-updates) that synced skills get from GitHub.

Each user can make 15 preview and import requests in 5 minutes, in n8n Assistant and MCP clients together. If you reach the limit, wait 5 minutes.

For the steps, see [Import skills from GitHub with n8n Assistant](skills.md#import-skills-from-github-with-n8n-assistant) and [Import skills from GitHub with the skill source tools](skills.md#import-skills-from-github-with-the-skill-source-tools).

## Use skills in agents

To add a skill to an agent:

1. Open the agent in the agent builder.
2. In the **Skills** section, select **Add skill**.
3. Search for the skill and select it, or select **Create skill** to write a new skill.

An agent can use Global skills and the skills of its own project. The agent reads the description of each skill, and follows a skill's instructions when a request matches. See [Build and manage agents](../build-and-manage-agents/) for the rest of the agent setup.

## Use skills in n8n Assistant

{% hint style="info" %}
**Preview status**

Skills in n8n Assistant are in Preview and may change in future releases. They aren't on every instance yet.
{% endhint %}

To let n8n Assistant use a skill, turn on **Enable for n8n Assistant** in the skill's edit dialog. n8n Assistant reads Global skills and the skills of the project you opened the conversation in. In the skills list, the **n8n Assistant** badge shows which skills have this setting on.

## Use skills in MCP clients

An MCP client connected to the [n8n MCP server](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server) can work with skills in two ways:

* **Manage skills:** find, read, create, change, and delete skills with the skill tools. This works in every MCP client.
* **Use skills:** load n8n skills and follow them, as the client does with its own skills. This works only in MCP clients that support the MCP skills extension, and only for skills that you turn on for MCP clients.

The scopes and permissions of skills apply to MCP clients in both cases.

### Manage skills with the skill tools

The n8n MCP server has these skill tools:

| Tool | What it does |
| ---- | ------------ |
| `search_n8n_skills` | Searches skills by name, scope, or project |
| `get_skill` | Reads a skill with its instructions, references, and the agents that use it |
| `create_skill` | Creates a skill |
| `update_skill` | Changes a skill. A content change creates a new version. |
| `delete_skill` | Deletes a skill. n8n refuses while an agent uses it. |

The skill tools work for every skill you can see, whatever the setting **Enable for MCP clients** is. For a synced skill, `search_n8n_skills` and `get_skill` also return its sync status and the repository it comes from. For each tool's parameters and output, see [Skills](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server/mcp-server-tools-reference#skills) in the MCP server tools reference.

### Import skills from GitHub with the skill source tools

When importing skills from GitHub is on, the n8n MCP server also has these tools:

| Tool | What it does |
| ---- | ------------ |
| `list_skill_sources` | Lists the connected repositories you can see, with their sync status and update counts |
| `discover_skill_source` | Previews the skills in a link to a public repository, with the result of the security check for each skill |
| `import_skills_from_source` | Connects a public repository and imports the skills you pick as synced skills |

To import skills, ask the MCP client to preview a link, for example "Preview the skills in `https://github.com/rmakowiak/example-skills` for my personal project". The client calls `discover_skill_source` and shows you the skills and their check results. Tell the client which skills to import. The client then calls `import_skills_from_source` with the same link, the same scope, and the revision from the preview.

n8n reads the repository again before it imports. If the repository changed after the preview, n8n imports nothing and asks for a new preview. n8n imports the picked skills that pass the security check, and the result lists the other picked skills with a reason.

n8n doesn't ask you to approve an import from an MCP client. The **Create, update and delete skills** permission that you gave the client covers it. If you want to approve each import, set that in your MCP client.

An imported skill starts with **Enable for n8n Assistant** and **Enable for MCP clients** off, and no agent uses it. For what MCP clients can't do with repositories, see [Import skills with n8n Assistant or an MCP client](skills.md#import-skills-with-n8n-assistant-or-an-mcp-client).

### Use skills in clients with the skills extension

{% hint style="info" %}
**Preview status**

Using skills through the MCP skills extension is in Preview and may change in future releases. It isn't on every instance yet.
{% endhint %}

The [MCP skills extension](https://modelcontextprotocol.io/seps/2640-skills-extension) lets an MCP server offer skills to a client. The n8n MCP server supports it with the extension's `skills/list` and `skills/get` requests. A client that supports the extension lists the n8n skills next to its own skills, and loads a skill when a task matches its description.

To offer a skill to these clients, turn on **Enable for MCP clients** in the skill's edit dialog. In the skills list, the MCP icon shows which skills have this setting on.

In an MCP client without the extension, this setting has no effect. Use the skill tools in that client instead.

### MCP client permissions for skills

When you connect an MCP client with OAuth, n8n asks you to approve two permissions in the **Skills** group:

| Permission on the consent screen | OAuth scope | Tools |
| -------------------------------- | ----------- | ----- |
| **List and read skills** | `skill:read` | `search_n8n_skills`, `get_skill`, `list_skill_sources` |
| **Create, update and delete skills** | `skill:write` | `create_skill`, `update_skill`, `delete_skill`, `search_n8n_skills`, `get_skill`, `list_skill_sources`, `discover_skill_source`, `import_skills_from_source` |

The consent screen lists the three skill source tools only when importing skills from GitHub is on. A client that already has these permissions gets the skill source tools without a new connection.

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

### Import skills from GitHub with n8n Assistant

When importing skills from GitHub is on, you can ask n8n Assistant to import skills from a public repository:

1. Ask n8n Assistant to preview a link, for example "Show me the skills in `https://github.com/rmakowiak/example-skills`". Say where the skills go: a project, or the whole instance.
2. n8n Assistant lists the skills with the result of the security check for each one. Tell it which skills to import.
3. n8n Assistant asks you to approve the import. The request names the repository, the scope, and the skills that n8n imports. It also says how many of the skills you picked can't come in.
4. Select **Allow once**.

n8n Assistant asks before each import. An import has no **Always allow** option, and the **Allow** setting of a permission doesn't skip this approval. The import uses the **Create skills** permission. If that permission is **Block**, n8n Assistant can't import skills.

n8n reads the repository again before it imports. If the repository changed after the preview, n8n imports nothing, and n8n Assistant must preview the link again.

An imported skill starts with **Enable for n8n Assistant** off. Turn it on in the skill's edit dialog to let n8n Assistant use the skill.

You can also ask n8n Assistant to list the connected repositories and the synced skills that have updates. For what n8n Assistant can't do with repositories, see [Import skills with n8n Assistant or an MCP client](skills.md#import-skills-with-n8n-assistant-or-an-mcp-client).

## Skill versions

Each save that changes a skill's content creates a new version. A save that changes nothing creates no version.

Agents use versions this way:

* A draft agent uses the latest version of each skill, unless you pinned a version in the agent.
* A published agent keeps the version it had when you published it. It moves to a newer version only when you publish the agent again.

When a skill changes, a published agent that uses it shows unpublished changes.

To see the history of a skill, open its options menu in the list and select **Version history**. There you can compare two versions. From an older version, select **Restore as new version** to make it the latest version again.

A synced skill gets a new version each time someone accepts an update from GitHub.

## Manage skills

The skills list shows each skill's **Scope**, the **Agents** that use it, **Created by**, and **Last updated**. Filter the list by scope, agent, creator, or source, or search by name. Synced skills appear under their source. See [Sources in the skills list](skills.md#sources-in-the-skills-list).

Each skill's options menu has these actions:

* **Edit**, or **View** if you can't change the skill
* **Version history**
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

Skills are part of the agents module, which is on by default. If you turned off the agents module with `N8N_DISABLED_MODULES`, skills are off too. Skills also need one or more of these features on: agents, n8n Assistant, or instance-level MCP access.

n8n turns on three parts of skills step by step, with feature flags:

| Flag | Turns on |
| ---- | -------- |
| `136_skill_sync` | [Import skills from GitHub](skills.md#import-skills-from-github), in **Settings**, in n8n Assistant, and in MCP clients. The **Skill Sync** setting must also be on. |
| `130_attach_skills_to_assistant` | **Enable for n8n Assistant**, and skills in n8n Assistant |
| `128_mcp_skills_extension` | **Enable for MCP clients**, and loading skills automatically in MCP clients |

To turn them on yourself, set `N8N_FEATURE_FLAG_OVERRIDES`. For example, add this value to your `.env` file. Preserve any other entries in the JSON object.

```bash
N8N_FEATURE_FLAG_OVERRIDES='{"136_skill_sync":true,"130_attach_skills_to_assistant":true,"128_mcp_skills_extension":true}'
```

Restart n8n to apply the change. Each value must be the boolean `true`, not the string `"variant"`.

### Skill Sync environment variables

| Variable | Default | What it does |
| -------- | ------- | ------------ |
| `N8N_SKILL_SYNC_MANAGED_BY_ENV` | `false` | When `true`, n8n applies `N8N_SKILL_SYNC_ENABLED` on every startup, and admins can't change the **Skill Sync** setting in the UI. |
| `N8N_SKILL_SYNC_ENABLED` | `false` | Whether Skill Sync is on. n8n reads this variable only when `N8N_SKILL_SYNC_MANAGED_BY_ENV` is `true`. |
| `N8N_SKILL_SYNC_CHECK_INTERVAL_SECONDS` | `3600` | How often n8n checks each source for updates, in seconds. The minimum is `60`. |

## Related resources

* [Agentic context management](./)
* [Preferences](preferences.md)
* [Build and manage agents](../build-and-manage-agents/)
* [Use n8n Assistant](../ways-of-building-workflows/n8n-assistant.md)
* [Use n8n MCP server](../ways-of-building-workflows/connect-to-n8n-mcp-server.md)
* [Connect to n8n MCP server](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server)
* [MCP server tools reference](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server/mcp-server-tools-reference)
