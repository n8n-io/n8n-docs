---
description: >-
  Everything an AI coding agent needs to write n8n workflows as code: the MCP
  builder tools, the docs servers, Markdown access, and the recommended order.
contentType: howto
layout:
  description:
    visible: false
---

# Build with AI

This page lists what an AI coding agent needs to write [Workflow SDK](README.md) code for your n8n instance, and the order in which to use it. Point your agent here, or paste the table into its instructions.

## What to connect

| Resource | Where | Use it for |
| --- | --- | --- |
| n8n MCP server | Your instance, see [Connect to n8n MCP server](../connect-to-n8n-mcp-server.md) | The builder tools below, plus workflow, execution, and credential management on your instance |
| GitBook docs MCP server | `https://docs.n8n.io/~gitbook/mcp` | Searching and reading the n8n docs, see [Connect to the n8n docs MCP server](../connect-to-n8n-docs-mcp-server.md) |
| Kapa.ai docs MCP server | `https://n8n.mcp.kapa.ai` | Questions the docs alone don't answer: forum threads and blog posts |
| Docs as Markdown | Append `.md` to any docs URL, or fetch `https://docs.n8n.io/llms.txt` for the index | Reading a page without HTML |
| n8n CLI skill | `n8n-cli skill install --global`, see [n8n CLI](../n8n-cli.md) | Managing workflows from the terminal with JSON, without an MCP server |

The SDK itself ships inside n8n as the `@n8n/workflow-sdk` package. Your agent doesn't install it.

## The builder tools

These tools on the n8n MCP server read and write Workflow SDK code. Parameters and output are in the [MCP server tools reference](../connect-to-n8n-mcp-server/mcp-server-tools-reference.md#workflow-builder). The tools are available from n8n 2.12.0 unless the table says otherwise.

| Tool | What it returns |
| --- | --- |
| `get_workflow_sdk_reference` | The SDK reference: import statement, patterns, expressions, functions, rules, guidelines, and design guidance. Call it first. |
| `get_workflow_best_practices` | A guide for one workflow technique, such as `chatbot` or `data_extraction`. Pass `list` to see the techniques. Available from n8n 2.26.0. |
| `search_nodes` | Node ids and the resource or operation values a node needs, from a service name or a task. |
| `get_node_types` | TypeScript type definitions for the nodes you plan to use, with their parameters. |
| `explore_node_resources` | Live options for a node, such as the channels a Slack credential can see. Available from n8n 2.27.0. |
| `validate_node_config` | Checks one node configuration against its schema. Available from n8n 2.25.1. |
| `validate_workflow` | Checks a whole file. Returns errors and a hint when the code is invalid. |
| `create_workflow_from_code` | Saves validated code as a new workflow and returns its URL. |
| `update_workflow` | Applies an ordered batch of partial changes to an existing workflow, such as `addNode`, `updateNodeParameters`, or `addConnection`. It doesn't take a new file. |

## The order that works

Agents that skip the reference guess the syntax and loop on validation errors. Give your agent this sequence:

1. Call `get_workflow_sdk_reference`. Read the `patterns` section for the shape that matches the task.
2. Call `get_workflow_best_practices` for the technique, when one applies and the instance runs n8n 2.26.0 or later.
3. Call `search_nodes`, then `get_node_types`, for every node the workflow needs.
4. Write the file. Declare the nodes first, compose the workflow last, one `export default`.
5. Call `validate_workflow`. Fix what the `hint` says. Repeat until `valid` is `true`.
6. Call `create_workflow_from_code`. For an existing workflow, call `update_workflow` with an `operations` array.
7. Run the workflow once and read the execution with `get_workflow_execution` before reporting success.

{% hint style="warning" %}
`create_workflow_from_code` saves the workflow but doesn't publish it. Publish the workflow in the editor, or call `publish_workflow`, before a trigger can fire.
{% endhint %}

## A prompt to start from

Paste this into your agent and change the last sentence:

```text
You build n8n workflows as Workflow SDK code through the n8n MCP server.
Before writing code, call get_workflow_sdk_reference and read the patterns section.
For each node, call search_nodes and get_node_types to get the exact type id, version, and parameter names.
Write one file with export default workflow(...). Call validate_workflow and fix every error until valid is true.
Then call create_workflow_from_code and return the workflow URL.
Task: build a workflow that ...
```

## Related resources

* [Workflow SDK](./)
* [Quickstart](quickstart.md)
* [MCP client connection examples](../connect-to-n8n-mcp-server/mcp-client-examples.md)
* [Connect to the n8n docs MCP server](../connect-to-n8n-docs-mcp-server.md)
