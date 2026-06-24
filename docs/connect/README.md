---
contentType: guide
status: beta
nodeTitle: n8n CLI
originalFilePath: api/n8n-cli/index.md
originalUrl: https://docs.n8n.io/api/n8n-cli
url: https://docs.n8n.io/connect/
description: Use the API, CLI, and MCP server to connect to n8n programmatically.
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
    visible: false
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Connect

Connect to n8n from code, scripts, and AI tools.

Use this documentation when you want to work with n8n outside the editor. You can call the public API, script against it with the CLI, or connect MCP-compatible clients.

This section includes the n8n API guides and reference material, the n8n CLI reference, and the docs for the built-in n8n MCP server. It also covers authentication, connection setup, and client-specific instructions for connecting tools and agents to n8n.

{% hint style="info" %}
Choose the interface that matches your workflow. Each option uses a different access model and fits a different job.
{% endhint %}

{% tabs %}
{% tab title="n8n API" %}
Manage n8n programmatically over HTTP.

Best for:

* Building platforms and tooling on top of n8n
* Triggering and monitoring executions from external systems
* Automating workflow and credential management

Start with [n8n API](n8n-api/).
{% endtab %}

{% tab title="n8n CLI" %}
Control n8n directly from your terminal.

Best for:

* Importing and exporting workflows
* Running executions in scripts and CI pipelines
* Local development and debugging

Start with [n8n CLI](n8n-cli.md).
{% endtab %}

{% tab title="MCP server" %}
Connect AI agents and MCP clients directly to your n8n instance.

Best for:

* Claude Code, Claude Desktop, Lovable, and similar tools
* Discovering and executing workflows from an AI agent
* Managing workflows through an MCP client

Start with [Connect to n8n MCP server](connect-to-n8n-mcp-server.md).
{% endtab %}
{% endtabs %}
