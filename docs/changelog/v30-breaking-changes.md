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

## Removed nodes and helpers <a href="#removed-nodes-and-helpers" id="removed-nodes-and-helpers"></a>

n8n 3.0 removes older nodes, modes, and helpers that newer patterns have replaced.

### Removed nodes <a href="#removed-nodes" id="removed-nodes"></a>

- **Function** node (legacy)
- **Function Item** node (legacy)
- **Item Lists** node (legacy)
- **LangChain Code** node (legacy)
- **AI Transform** node: n8n automatically migrates existing nodes to [Code](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.code) nodes on upgrade, keeping the same generated JavaScript, so existing workflows keep working without changes. You can no longer add an **AI Transform** node. Write JavaScript directly in the **Code** node instead.
- **What to do:** Migrate affected workflows to the current recommended alternatives before upgrading:
  - Replace **Function** and **Function Item** nodes with the [Code](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.code) node. Use **Run Once for All Items** mode in place of **Function**, and **Run Once for Each Item** mode in place of **Function Item**.
  - Replace the **Item Lists** node with the node matching the operation you use: [Split Out](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.splitout), [Aggregate](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.aggregate), [Sort](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.sort), [Limit](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.limit), [Remove Duplicates](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.removeduplicates), or [Summarize](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.summarize).

### Removed expression helpers <a href="#removed-expression-helpers" id="removed-expression-helpers"></a>

- n8n 3.0 removes the deprecated `$getPairedItem` expression helper.
  - **What to do:** Use n8n's standard [item linking](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/reference-data/link-data-items/how-items-link-through-workflows) instead, for example the `pairedItem` property or `$("<node-name>").item`.

### Execute Workflow node: Run once for each item mode removed

n8n 3.0 removes the **Run once for each item** mode from the **Execute Workflow** node. Workflows that use it fail until you update them.

**What to do:** Use a **Loop Over Items** node before an **Execute Workflow** node in **Run once with all items** mode instead.

### Always Output Data on nodes with several outputs

With **Always Output Data** on, nodes with several outputs, for example **If** and **Switch**, now add an empty item only when every output is empty. Before, each empty output got an empty item, so branches ran when they shouldn't have.

**What to do:** Review flagged nodes and adjust the setting to match your intent.

### `$evaluateExpression()` removed from the Code node

n8n 3.0 removes the `$evaluateExpression()` convenience method from the **Code** node (JavaScript). Only task runners in insecure mode (`N8N_RUNNERS_INSECURE_MODE=true`) are affected. Secure-mode runners, the default since n8n 2.0, already fail on this call.

**What to do:** Evaluate the expression in a node field instead, for example in an **Edit Fields (Set)** node before the **Code** node, and read the result from the input item. `$evaluateExpression()` keeps working in `{{ }}` expression fields.

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

## Retired capabilities <a href="#retired-capabilities" id="retired-capabilities"></a>

n8n 3.0 retires some legacy or lower-usage product capabilities. n8n will provide guidance where a migration path or alternative exists.

- **Chat Hub**: n8n 3.0 turns off the Chat Hub module by default. The **Chat** section disappears from the navigation and the Chat Hub endpoints stop responding. Your chat sessions, agents, and messages stay in the database. n8n 4.0 removes the feature.
  - **What to do:** If you still need Chat Hub, add `chat-hub` to the `N8N_ENABLED_MODULES` environment variable. The variable holds a comma-separated list, so keep the modules that you already enable, for example `N8N_ENABLED_MODULES=agents,chat-hub`. This keeps Chat Hub available for the n8n 3.x line only, and n8n prints a deprecation warning at startup. Before you update, **Settings > Migration Report** lists this change for every instance that uses Chat Hub.
- **Workflow import from URL in the editor**: n8n 3.0 removes this. Other [import methods](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/export-and-import) remain supported: copy-paste, **Import from File** in the editor UI menu, the CLI, and the n8n API.
- **Non-functional nodes**: n8n 3.0 removes these.
- **Enable external secrets for project roles setting**: n8n 3.0 removes this. Project editors and admins now get external-secrets access in their projects by default. To keep restricting project roles, use [custom project roles](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/create-custom-project-roles) instead. This applies to n8n Enterprise, where external secrets are available.
- **Ask AI tab in the Code node**: n8n 3.0 removes this.

---

_n8n will update this page with full details, migration guides, and links as n8n 3.0 approaches its release._

