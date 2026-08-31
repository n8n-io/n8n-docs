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

- Self-hosted n8n will require a Docker-based deployment. n8n 3.0 will no longer support installations run using `npm` or `npx n8n`.
- **What to do:** If you run n8n with `npm` or `npx n8n`, plan a move to a Docker-based deployment before upgrading to n8n 3.0. For local installations, Docker Compose is expected to be the easiest path.
- *Step-by-step migration guidance will be coming soon*

## Removed nodes and helpers <a href="#removed-nodes-and-helpers" id="removed-nodes-and-helpers"></a>

n8n 3.0 removes older nodes, modes, and helpers that newer patterns have replaced.

### Removed nodes <a href="#removed-nodes" id="removed-nodes"></a>

- **Function** node (legacy)
- **Function Item** node (legacy)
- **Item Lists** node (legacy)
- **What to do:** Migrate affected workflows to the current recommended alternatives before upgrading:
  - Replace **Function** and **Function Item** nodes with the [Code](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.code) node. Use **Run Once for All Items** mode in place of **Function**, and **Run Once for Each Item** mode in place of **Function Item**.
  - Replace the **Item Lists** node with the node matching the operation you use: [Split Out](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.splitout), [Aggregate](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.aggregate), [Sort](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.sort), [Limit](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.limit), [Remove Duplicates](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.removeduplicates), or [Summarize](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.summarize).

### Changed node behavior <a href="#changed-node-behavior" id="changed-node-behavior"></a>

- **Execute Workflow** node: n8n 3.0 removes the older behavior.

### AI Agent node: Older agent modes removed <a href="#ai-agent-node-older-agent-modes-removed" id="ai-agent-node-older-agent-modes-removed"></a>

- Version 1 of the **AI Agent** node supported several agent type modes, including **SQL Agent**, **Conversational Agent**, **OpenAI Functions Agent**, **Plan and Execute Agent**, and **ReAct Agent**. n8n 3.0 removes version 1 of the node, along with these modes.
- **What to do:** Update any workflows and templates that use version 1 of the [AI Agent](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent) node to the latest version. Workflows already set to **Tools Agent** continue to behave the same after you update. For **SQL Agent** use cases, replace it with a [Postgres](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/app-nodes/n8n-nodes-base.postgres) or [MySQL](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/app-nodes/n8n-nodes-base.mysql) tool sub-node paired with a recent **AI Agent** node.

### Removed expression helpers <a href="#removed-expression-helpers" id="removed-expression-helpers"></a>

- n8n 3.0 removes the deprecated `$getPairedItem` expression helper.
- **What to do:** Use n8n's standard [item linking](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/reference-data/link-data-items/how-items-link-through-workflows) instead, for example the `pairedItem` property or `$("<node-name>").item`.

## Security <a href="#security" id="security"></a>

Security defaults are getting stronger to make n8n safer by default. These changes may affect existing workflows or credentials.

- **Tighter handling of risky resource names.**
- **More secure credential behavior.**  
- **Key rotation enabled by default.** 
- **Lower Compression node decompression limits.** Default `N8N_COMPRESSION_NODE_MAX_DECOMPRESSED_SIZE_BYTES` drops from 2 GiB to 256 MiB, and default `N8N_COMPRESSION_NODE_MAX_ZIP_ENTRIES` drops from 5,000 to 1,000.
  - **What to do:** If your workflows decompress archives larger than 256 MiB or with more than 1,000 entries, set these variables explicitly to their previous values (2147483648 and 5000) before upgrading to n8n 3.0.

## Retired capabilities <a href="#retired-capabilities" id="retired-capabilities"></a>

n8n 3.0 retires some legacy or lower-usage product capabilities. n8n will provide guidance where a migration path or alternative exists.

- **Chat Hub**: n8n 3.0 retires this feature.
- **Workflow import from URL in the editor**: n8n 3.0 removes this. Other [import methods](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/export-and-import) remain supported: copy-paste, **Import from File** in the editor UI menu, the CLI, and the n8n API.
- **Non-functional nodes**: n8n 3.0 removes these.

---

_n8n will update this page with full details, migration guides, and links as n8n 3.0 approaches its release._


