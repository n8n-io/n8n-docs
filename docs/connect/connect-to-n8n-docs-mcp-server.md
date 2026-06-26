---
description: Connect an AI tool to the n8n docs Model Context Protocol (MCP) server to search and read the documentation.
layout:
  description:
    visible: false
---

# Connect to the n8n docs MCP server

The n8n documentation publishes a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server. Connect an AI tool to this server to let it search the docs, retrieve specific pages, and answer questions using the documentation content directly.

## MCP server URL

Use this endpoint:

```
https://docs.n8n.io/~gitbook/mcp
```

The server exposes published documentation only. It uses HTTP transport, so your AI tool needs to support remote MCP servers over HTTP. It doesn't support stdio or SSE.

## Connect your AI tool

The steps differ by tool, but each one needs the server URL above. The following examples cover some common tools.

{% tabs %}
{% tab title="Claude Code" %}
Run this command in your terminal:

```bash
claude mcp add --transport http n8n-docs https://docs.n8n.io/~gitbook/mcp
```
{% endtab %}

{% tab title="Cursor" %}
Add the server to your `mcp.json` file:

```json
{
	"mcpServers": {
		"n8n-docs": {
			"url": "https://docs.n8n.io/~gitbook/mcp"
		}
	}
}
```
{% endtab %}

{% tab title="VS Code" %}
Add the server to your `mcp.json` file:

```json
{
	"servers": {
		"n8n-docs": {
			"type": "http",
			"url": "https://docs.n8n.io/~gitbook/mcp"
		}
	}
}
```
{% endtab %}

{% tab title="Other tools" %}
For any other MCP client, add a new remote (HTTP) server in its MCP settings and enter the server URL:

```
https://docs.n8n.io/~gitbook/mcp
```
{% endtab %}
{% endtabs %}

After you connect, your tool can search and read the n8n docs as you work.

{% hint style="info" %}
The exact configuration steps and file locations vary between tools and versions. Check your tool's documentation for how it adds a remote MCP server.
{% endhint %}
