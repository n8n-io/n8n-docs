---
description: >-
  Describe n8n workflows as TypeScript code with the Workflow SDK, the format
  that the n8n MCP server builder tools and n8n AI use to create workflows.
contentType: overview
layout:
  description:
    visible: false
---

# Workflow SDK

The Workflow SDK is a TypeScript format for describing an n8n workflow as code. You declare triggers and nodes, connect them with `.add()` and `.to()`, and export the result. n8n turns that code into the same workflow JSON the editor uses.

{% hint style="info" %}
**Feature availability**

The Workflow SDK builder tools on the n8n MCP server are available from n8n 2.12.0. The SDK ships inside n8n as the `@n8n/workflow-sdk` package. You don't install it to write workflow code.
{% endhint %}

## Who uses the Workflow SDK

Three parts of n8n read Workflow SDK code:

* The [n8n MCP server](../connect-to-n8n-mcp-server.md) builder tools. `validate_workflow` checks the code, `create_workflow_from_code` saves it as a workflow, and `update_workflow` changes an existing workflow. Refer to the [MCP server tools reference](../connect-to-n8n-mcp-server/mcp-server-tools-reference.md#workflow-builder).
* n8n AI, which writes Workflow SDK code when it builds a workflow for you.
* AI coding agents such as Claude Code or Cursor, when they connect to the n8n MCP server.

The [n8n CLI](../n8n-cli.md) and the [n8n API](../n8n-api/README.md) work with workflow JSON, not with SDK code. To turn SDK code into a workflow, send it through the MCP server tools.

## What the code looks like

A workflow is a chain of calls. This example runs a manual trigger, fetches a GitHub repository, and keeps its star count:

```javascript
import { workflow, node, trigger, expr } from '@n8n/workflow-sdk';

const start = trigger({
  type: 'n8n-nodes-base.manualTrigger',
  version: 1,
  config: { name: 'Start' }
});

const fetchRepo = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.3,
  config: {
    name: 'Fetch repository',
    parameters: { method: 'GET', url: 'https://api.github.com/repos/n8n-io/n8n' }
  }
});

const keepStars = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: {
    name: 'Keep stars',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'stars', name: 'stars', value: expr('{{ $json.stargazers_count }}'), type: 'number' }
        ]
      }
    }
  }
});

export default workflow('github-stars', 'GitHub stars')
  .add(start)
  .to(fetchRepo)
  .to(keepStars);
```

Every file exports one workflow with `export default workflow(...)`. Node types and parameter names are the same as in workflow JSON. Expressions use `expr()` around the `{{ }}` syntax you know from the editor.

## Where to go next

* [Quickstart](quickstart.md): write your first workflow file, check it, and create it on your instance.
* [Build with AI](build-with-ai.md): everything an AI coding agent needs to write Workflow SDK code for your instance.
* [MCP server tools reference](../connect-to-n8n-mcp-server/mcp-server-tools-reference.md#workflow-builder): the builder tools, their parameters, and their output.

## Which package is this

`@n8n/workflow-sdk` describes workflows. It isn't the n8n public API client, it isn't the `@n8n/cli` command-line tool, and it isn't the framework for building [custom nodes](../create-nodes/README.md). You don't need to install it: the n8n instance parses the code. Install it only if you want TypeScript types in your editor.

The Workflow SDK works with any n8n instance, n8n Cloud or self-hosted, once an owner or admin [enables MCP access](../connect-to-n8n-mcp-server.md#enabling-mcp-access).
