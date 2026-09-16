---
title: n8n 3.0 breaking changes
description: Breaking changes coming in n8n 3.0
contentType: reference
nodeTitle: n8n 3.0 breaking changes
layout:
  description:
    visible: false
---

# n8n 3.0 breaking changes <a href="#n8n-v30-breaking-changes" id="n8n-v30-breaking-changes"></a>

This document highlights breaking changes and actions to prepare for the upcoming transition to n8n 3.0, scheduled for October 2026. These updates improve security, simplify configuration, and remove legacy features.

The release of n8n 3.0 continues n8n's commitment to providing a secure, reliable, and production-ready automation platform. This major version includes important security enhancements and cleanup of deprecated features.

## Deployment <a href="#deployment" id="deployment"></a>

### Docker-based deployment required for self-hosted n8n <a href="#docker-based-deployment-required-for-self-hosted-n8n" id="docker-based-deployment-required-for-self-hosted-n8n"></a>

Self-hosted n8n will require a Docker-based deployment. n8n 3.0 will no longer support installations run using `npm` or `npx n8n`.

**What to do:** If you run n8n with `npm` or `npx n8n`, plan a move to a Docker-based deployment before upgrading to n8n 3.0. For local installations, Docker Compose is expected to be the easiest path.

*Step-by-step migration guidance will be coming soon.*

## Community node development

These changes affect the [`n8n-node dev`](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/build-your-node/using-the-n8n-node-tool) test loop only. `n8n-node build`, `n8n-node lint`, `n8n-node release`, and `npm create @n8n/node` are unchanged.

### n8n-node dev requires Docker or Podman

- `n8n-node dev` started n8n with `npx n8n@latest`. n8n 3.0 doesn't publish a runnable `n8n` package to npm, so the command now runs the official image in a container.
- **What to do:** Install Docker or Podman. To run n8n yourself instead, use `n8n-node dev --external-n8n` and start that instance with `N8N_DEV_RELOAD=true`. To pin an n8n version, pass the tag: `n8n-node dev --n8n-image docker.n8n.io/n8nio/n8n:<n8n-version>`. Hot reload only works on images that serve `POST /rest/dev/reload`, so older tags load your node but need a restart to pick up changes.

### n8n-node dev test data moves to a per-image container volume

- Workflows and credentials you create while testing your node now live in a `n8n-node-cli-data-<image>` container volume, not in `~/.n8n-node-cli/.n8n`. Data from earlier versions doesn't carry over. Each `--n8n-image` gets its own volume, because n8n only migrates a database forward: switching images gives you an empty instance rather than a database an older n8n can't read.
- **What to do:** Export any test workflows you want to keep before you upgrade or change images. To list and reset the volumes, use `docker volume ls --filter name=n8n-node-cli-data` and `docker volume rm <volume>`, or the `podman` equivalents.

### `--custom-user-folder` only applies with `--external-n8n`

- The flag used to set where the CLI linked your node. It now names the `N8N_USER_FOLDER` of the instance you run yourself, and has no effect in container mode.
- **What to do:** If you pass `--custom-user-folder`, add `--external-n8n` and start that instance with the same `N8N_USER_FOLDER`.

## Configuration

### Remove N8N_PRE_EXECUTE_ERROR_CREATES_EXECUTION

- n8n 3.0 removes the `N8N_PRE_EXECUTE_ERROR_CREATES_EXECUTION` environment variable. If a `workflow.preExecute` [external hook](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/external-hooks) throws, n8n never creates an execution record. The run never starts, so it doesn't count toward Insights or license usage.
- **What to do:** If you set `N8N_PRE_EXECUTE_ERROR_CREATES_EXECUTION=true` to still create a failed execution when the hook throws, remove the variable before you upgrade to n8n 3.0. After you upgrade, n8n ignores the variable. Check the n8n 3.0 migration report in **Settings** to see if this instance sets it.

## Removed nodes and helpers <a href="#removed-nodes-and-helpers" id="removed-nodes-and-helpers"></a>

n8n 3.0 removes older nodes, modes, and helpers that newer patterns have replaced.

### Removed nodes <a href="#removed-nodes" id="removed-nodes"></a>

- **Function** node (legacy)
- **Function Item** node (legacy)
- **Item Lists** node (legacy)
- **LangChain Code** node (legacy)
- **Cron** and **Interval** nodes
- **HTML Extract** node
- **iCalendar** node
- **Convert to/from binary data** node
- **Read Binary File**, **Read Binary Files**, and **Write Binary File** nodes
- **Read PDF** node
- **Workflow Trigger** node
- **Orbit** node
- **OpenAI** node (legacy). The current **OpenAI** node in the AI section stays.
- **OpenAI Assistant** and **OpenAI Model** nodes
- **HTTP Request Tool** node (legacy). Using the **HTTP Request** node as a tool stays.
- **SerpApi (Google Search)** node
- **Manual Chat Trigger** node
- **Chat Messages Retriever** node
- **Motorhead** and **Zep** memory nodes
- **Binary Input Loader**, **JSON Input Loader**, and **GitHub Document Loader** nodes
- **In Memory Vector Store Insert**, **In Memory Vector Store Load**, **Pinecone: Insert**, **Pinecone: Load**, **Supabase: Insert**, **Supabase: Load**, **Zep Vector Store**, **Zep Vector Store: Insert**, and **Zep Vector Store: Load** nodes
- **AI Transform** node: n8n automatically migrates existing nodes to [Code](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.code) nodes on upgrade, keeping the same generated JavaScript, so existing workflows keep working without changes. You can no longer add an **AI Transform** node. Write JavaScript directly in the **Code** node instead.
- **What to do:** Migrate affected workflows to the current recommended alternatives before upgrading:
  - Replace **Function** and **Function Item** nodes with the [Code](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.code) node. Use **Run Once for All Items** mode in place of **Function**, and **Run Once for Each Item** mode in place of **Function Item**.
  - Replace the **Item Lists** node with the node matching the operation you use: [Split Out](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.splitout), [Aggregate](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.aggregate), [Sort](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.sort), [Limit](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.limit), [Remove Duplicates](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.removeduplicates), or [Summarize](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.summarize).
  - Replace **Cron** and **Interval** with the [Schedule Trigger](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.scheduletrigger) node.
  - Replace **HTML Extract** with the [HTML](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.html) node's **Extract HTML Content** operation.
  - Replace **iCalendar** with the [Convert to File](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.converttofile) node's **Convert to ICS** operation.
  - Replace **Convert to/from binary data** with the [Convert to File](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.converttofile) or [Extract from File](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.extractfromfile) node.
  - Replace **Read Binary File**, **Read Binary Files**, and **Write Binary File** with the [Read/Write Files from Disk](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.readwritefile) node.
  - Replace **Read PDF** with the [Extract from File](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.extractfromfile) node's **Extract From PDF** operation.
  - Replace **Workflow Trigger** with the [n8n Trigger](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.n8ntrigger) node.
  - Replace the legacy **OpenAI** node and the **OpenAI Assistant** node with the [OpenAI](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/app-nodes/n8n-nodes-langchain.openai) node. For assistants, use its **Assistant** resource.
  - Replace **OpenAI Model** with the [OpenAI Chat Model](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai) node.
  - Replace the legacy **HTTP Request Tool** with the **HTTP Request** node connected to the **Tool** input of the **AI Agent** node.
  - Replace **Manual Chat Trigger** with the [Chat Trigger](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-langchain.chattrigger) node.
  - Replace **Chat Messages Retriever** with the [Chat Memory Manager](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymanager) node, or load previous sessions in the **Chat Trigger** node.
  - Replace **Binary Input Loader**, **JSON Input Loader**, and **GitHub Document Loader** with the [Default Data Loader](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentdefaultdataloader) node. For GitHub content, fetch it with the **GitHub** node first.
  - Replace the **Insert** and **Load** vector store nodes with the single node for that store: [Simple Vector Store](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory), [Pinecone Vector Store](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorepinecone), or [Supabase Vector Store](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoresupabase). Pick the operation (**Insert Documents**, **Get Many**, or **Retrieve Documents**) in the node.
  - **Orbit**, **SerpApi (Google Search)**, **Motorhead**, **Zep**, and the **Zep Vector Store** nodes have no direct replacement. Use another supported [memory](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes) or [vector store](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes) node, or a verified community node.

### Removed expression helpers <a href="#removed-expression-helpers" id="removed-expression-helpers"></a>

- n8n 3.0 removes the deprecated `$getPairedItem` expression helper.
  - **What to do:** Use n8n's standard [item linking](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/reference-data/link-data-items/how-items-link-through-workflows) instead, for example the `pairedItem` property or `$("<node-name>").item`.

### Execute Sub-workflow node: Local File and URL sources removed

n8n 3.0 removes the **Local File** and **URL** options from the **Source** parameter of the [Execute Sub-workflow](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.executeworkflow) node. Only node versions 1.1 and older offered them. Nodes that still use one of these sources fail with an error.

**What to do:** Import the sub-workflow into your instance and select it with the **Database** source, or paste its JSON with the **Define Below** source. Before you update, **Settings > Migration Report** lists the affected nodes.

### Any workflow caller policy removed

n8n 3.0 removes the **Any workflow** option from the **This workflow can be called by** setting in the [workflow settings](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/configure-workflow-settings). This option let any project on the instance call the sub-workflow, which bypassed project permissions. Sub-workflows that still store this policy reject every call, including calls from the same project, until you save a supported policy. `N8N_WORKFLOW_CALLER_POLICY_DEFAULT_OPTION=any` logs a warning at startup and falls back to the default, the same-project option.

**What to do:** Open the settings of each affected sub-workflow and select **Selected workflows** or the same-project option, then save. Before you update, **Settings > Migration Report** lists the affected workflows. If you set `N8N_WORKFLOW_CALLER_POLICY_DEFAULT_OPTION=any`, change or remove the variable.

### Execute Workflow node: Run once for each item mode removed

n8n 3.0 removes the **Run once for each item** mode from the **Execute Workflow** node. Workflows that use it fail until you update them.

**What to do:** Use a **Loop Over Items** node before an **Execute Workflow** node in **Run once with all items** mode instead.

### Always Output Data on nodes with several outputs

With **Always Output Data** on, nodes with several outputs, for example **If** and **Switch**, now add an empty item only when every output is empty. Before, each empty output got an empty item, so branches ran when they shouldn't have.

**What to do:** Review flagged nodes and adjust the setting to match your intent.

### `$evaluateExpression()` removed from the Code node

n8n 3.0 removes the `$evaluateExpression()` convenience method from the **Code** node (JavaScript). Only task runners in insecure mode (`N8N_RUNNERS_INSECURE_MODE=true`) are affected. Secure-mode runners, the default since n8n 2.0, already fail on this call.

**What to do:** Evaluate the expression in a node field instead, for example in an **Edit Fields (Set)** node before the **Code** node, and read the result from the input item. `$evaluateExpression()` keeps working in `{{ }}` expression fields.

### Gmail Trigger node: Older versions run as version 1.4

n8n 3.0 removes the separate behavior of **Gmail Trigger** node versions 1 to 1.3. Workflows that use these versions keep loading, but the node runs with the version 1.4 behavior:

- **Max Emails per Poll** applies to every poll. The default is 10 emails, and you can set up to 50. The node picks up the remaining emails in later polls, so you don't lose any emails.
- The node skips drafts unless you turn on the **Include Drafts** filter. Versions 1 and 1.1 included drafts by default.
- Sent emails that aren't in the inbox, and scheduled emails, no longer trigger the workflow.

**What to do:** Review workflows with a **Gmail Trigger** node below version 1.4. If a workflow relies on drafts, turn on **Include Drafts**. If a workflow relies on sent or scheduled emails, replace the trigger with a **Schedule Trigger** node followed by the [Gmail](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/app-nodes/n8n-nodes-base.gmail) node's **Get Many** messages operation.

### Webflow OAuth2 credential: Legacy toggle off by default

The **Legacy** toggle on the **Webflow OAuth2 API** credential defaults to off. New credentials request the Webflow v2 API scopes (`cms:read cms:write sites:read forms:read`). Existing credentials that never saved an explicit **Legacy** value request these scopes the next time you reconnect them. Connected credentials keep working: n8n doesn't touch stored tokens, and token refresh doesn't send scopes.

**What to do:** If you still use the deprecated Webflow v1 Data API, for example with a legacy Webflow OAuth app or the **Webflow** node at version 1, turn on **Legacy** on the credential before you reconnect it. Webflow rejects the connection if the requested scopes aren't configured on your app.

### Chat Trigger node: WebSocket messages are JSON frames

The chat WebSocket endpoint that the **Chat Trigger** node uses in the **Using Response Nodes** response mode, where the **Chat** node sends replies, now sends every frame as a JSON object with a `type` field: `heartbeat`, `continue`, `error`, `message`, or `with-buttons`. Before, control frames and plain text replies were raw strings. A text reply is now `{ "type": "message", "text": "..." }`. The client acknowledges heartbeats with `{ "type": "heartbeat-ack" }`, and n8n ignores incoming frames that aren't JSON.

The n8n chat widget (`@n8n/chat`) understands both formats from version 1.31.0, and the hosted chat page always loads a current widget.

**What to do:** If you built a custom chat client that talks to the chat WebSocket directly, parse every frame as JSON and switch on `type`. If you embed `@n8n/chat` yourself, update it to version 1.31.0 or later before you upgrade n8n.

### AI Agent node: Older agent modes removed <a href="#ai-agent-node-older-agent-modes-removed" id="ai-agent-node-older-agent-modes-removed"></a>

Version 1 of the **AI Agent** node supported several agent type modes, including **SQL Agent**, **Conversational Agent**, **OpenAI Functions Agent**, **Plan and Execute Agent**, and **ReAct Agent**. n8n 3.0 removes version 1 of the node, along with these modes.

**What to do:** Update any workflows and templates that use version 1 of the [AI Agent](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent) node to the latest version. Workflows already set to **Tools Agent** continue to behave the same after you update. For **SQL Agent** use cases, replace it with a [Postgres](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/app-nodes/n8n-nodes-base.postgres) or [MySQL](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/app-nodes/n8n-nodes-base.mysql) tool sub-node paired with a recent **AI Agent** node.

## Security <a href="#security" id="security"></a>

Security defaults are getting stronger to make n8n safer by default. These changes may affect existing workflows or credentials.

- **Tighter handling of risky resource names.**
- **More secure credential behavior.**  
- **Key rotation enabled by default.** 

### Larger default SSRF block list

When `N8N_SSRF_PROTECTION_ENABLED` is `true` and `N8N_SSRF_BLOCKED_IP_RANGES` contains `default`, n8n 3.0 also blocks the shared address space (`100.64.0.0/10`) and IPv6 transition ranges.

**What to do:** If your workflows call hosts in these ranges, add their IP ranges to `N8N_SSRF_ALLOWED_IP_RANGES`, or their hostnames to `N8N_SSRF_ALLOWED_HOSTNAMES`. Keep `default` in `N8N_SSRF_BLOCKED_IP_RANGES`: it's the keyword for the whole built-in list, including localhost, private networks, and the cloud metadata endpoint. If you replace it with literal ranges, you must list every range from the current built-in list yourself.

### Lower Compression node decompression limits

The default `N8N_COMPRESSION_NODE_MAX_DECOMPRESSED_SIZE_BYTES` drops from 2 GiB to 256 MiB, and the default `N8N_COMPRESSION_NODE_MAX_ZIP_ENTRIES` drops from 5,000 to 1,000.

**What to do:** If your workflows decompress archives larger than 256 MiB or with more than 1,000 entries, set these variables explicitly to their previous values (2147483648 and 5000) before upgrading to n8n 3.0.

## Configuration

n8n 3.0 changes some defaults and removes settings that only kept older behavior alive. n8n logs a deprecation warning at startup on 2.x for each of these when your instance is affected.

### Storage directory renamed

On first start, n8n 3.0 renames `~/.n8n/binaryData` to `~/.n8n/storage` and removes `N8N_MIGRATE_FS_STORAGE_PATH`.

**What to do:** If you mount a volume at `~/.n8n/binaryData`, mount it at `~/.n8n/storage` instead, or set `N8N_STORAGE_PATH` to the old path to keep it. If both directories exist, n8n doesn't start: move the contents of `~/.n8n/binaryData` into `~/.n8n/storage`, remove `~/.n8n/binaryData`, then start n8n again. Nothing to do if you use the default paths without a volume mount.

### In-memory binary data mode removed

`N8N_DEFAULT_BINARY_DATA_MODE=default` is no longer valid. Instances that still use it switch to `filesystem` on upgrade.

**What to do:** Set `N8N_DEFAULT_BINARY_DATA_MODE` to `filesystem`, `s3`, `azure`, or `database`, and check that your container's mounted disk has room for binary data.

### Changed defaults and removed variables

- **Unverified community packages off by default.** The default for `N8N_UNVERIFIED_PACKAGES_ENABLED` changes from `true` to `false`.
  - **What to do:** Set `N8N_UNVERIFIED_PACKAGES_ENABLED=true` to keep installing unverified community nodes from npm.
- **Shorter task runner timeout.** The default for `N8N_RUNNERS_TASK_TIMEOUT` drops from `300` (5 minutes) to `60` (1 minute). Code node tasks that run longer fail.
  - **What to do:** Set `N8N_RUNNERS_TASK_TIMEOUT` explicitly if your tasks need more than a minute.
- **Manual executions always run on workers in queue mode.** `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` is removed.
  - **What to do:** Remove the variable. Review the memory you give to workers, which now also handle manual executions.
- **`N8N_DB_PING_TIMEOUT` removed.** n8n no longer falls back to this variable.
  - **What to do:** Set `DB_PING_TIMEOUT_MS` instead.

## Community nodes

### `defaults.color` removed from the node description

n8n 3.0 removes the deprecated `defaults.color` property from the node description type. It only tinted Font Awesome icons (`icon: 'fa:...'`). Community nodes that still set it keep working, but the editor shows a Font Awesome icon in a neutral color. Nodes with a file icon (`icon: 'file:...'`) aren't affected, because n8n never tints file icons.

**What to do:** Remove `defaults.color`. If your node uses a Font Awesome icon, replace it with an SVG or PNG file icon, as the [standard parameters](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/build-your-node/reference/base-files/standard-parameters#icon) reference recommends.

## Retired capabilities <a href="#retired-capabilities" id="retired-capabilities"></a>

n8n 3.0 retires some legacy or lower-usage product capabilities. n8n will provide guidance where a migration path or alternative exists.

- **Chat Hub**: n8n 3.0 turns off the Chat Hub module by default. The **Chat** section disappears from the navigation and the Chat Hub endpoints stop responding. Your chat sessions, agents, and messages stay in the database. n8n 4.0 removes the feature.
  - **What to do:** If you still need Chat Hub, add `chat-hub` to the `N8N_ENABLED_MODULES` environment variable. The variable holds a comma-separated list, so keep the modules that you already enable, for example `N8N_ENABLED_MODULES=agents,chat-hub`. This keeps Chat Hub available for the n8n 3.x line only, and n8n prints a deprecation warning at startup. Before you update, **Settings > Migration Report** lists this change for every instance that uses Chat Hub.
- **Workflow import from URL in the editor**: n8n 3.0 removes this. Other [import methods](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/export-and-import) remain supported: copy-paste, **Import from File** in the editor UI menu, the CLI, and the n8n API.
- **Enable external secrets for project roles setting**: n8n 3.0 removes this. Project editors and admins now get external-secrets access in their projects by default. To keep restricting project roles, use [custom project roles](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/create-custom-project-roles) instead. This applies to n8n Enterprise, where external secrets are available.
- **Ask AI tab in the Code node**: n8n 3.0 removes this.

---

_n8n will update this page with full details, migration guides, and links as n8n 3.0 approaches its release._

