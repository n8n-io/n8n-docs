---
description: >-
  Connect an AI tool to an n8n docs Model Context Protocol (MCP) server to
  search and answer questions from the documentation and wider knowledge base.
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
---

# Connect to the n8n docs MCP server

The n8n documentation publishes two [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers. Connect an AI tool to a server to let it search n8n's knowledge and answer your questions as you work.

The two servers draw on different sources, so pick the one that fits how you want your AI tool to answer:

| Server | Sources | Best for |
|--------|---------|----------|
| **GitBook docs server** | The published n8n docs only | Searching and reading exact documentation pages. The docs are the single, authoritative source. |
| **Kapa.ai server** | The docs, the [community forum](https://community.n8n.io/), and the [n8n blog](https://blog.n8n.io/) | Broader questions that the docs alone don't cover, such as troubleshooting and real-world examples. This is the same engine that powers the AI Assistant on the docs site. |

You can connect both. Use the GitBook server when you want answers grounded in the docs, and the Kapa.ai server when you want answers drawn from n8n's wider knowledge base.

Both servers use HTTP transport, so your AI tool needs to support remote MCP servers over HTTP. Neither supports stdio or SSE.

## MCP server URLs

Use the endpoint for the server you want:

| Server | URL |
|--------|-----|
| GitBook docs server | `https://docs.n8n.io/~gitbook/mcp` |
| Kapa.ai server | `https://n8n.mcp.kapa.ai` |

## Connect your AI tool

The steps differ by tool, but each one needs a server URL from above. The following examples set up both servers. To connect only one, keep the entry you want and remove the other.

{% hint style="info" %}
The Kapa.ai server requires authentication. Your AI tool opens a browser-based sign-in flow when you first connect to it, or the first time you use it. Follow the prompts to authorize the connection.
{% endhint %}

{% tabs %}
{% tab title="Claude Code" %}
Run these commands in your terminal:

```bash
claude mcp add --transport http n8n-docs https://docs.n8n.io/~gitbook/mcp
claude mcp add --transport http n8n-kapa https://n8n.mcp.kapa.ai
```
{% endtab %}

{% tab title="Cursor" %}
Add the servers to your `mcp.json` file:

```json
{
	"mcpServers": {
		"n8n-docs": {
			"url": "https://docs.n8n.io/~gitbook/mcp"
		},
		"n8n-kapa": {
			"url": "https://n8n.mcp.kapa.ai"
		}
	}
}
```
{% endtab %}

{% tab title="VS Code" %}
Add the servers to your `mcp.json` file:

```json
{
	"servers": {
		"n8n-docs": {
			"type": "http",
			"url": "https://docs.n8n.io/~gitbook/mcp"
		},
		"n8n-kapa": {
			"type": "http",
			"url": "https://n8n.mcp.kapa.ai"
		}
	}
}
```
{% endtab %}

{% tab title="Other tools" %}
For any other MCP client, add a new remote (HTTP) server in its MCP settings and enter a server URL:

```
https://docs.n8n.io/~gitbook/mcp
https://n8n.mcp.kapa.ai
```
{% endtab %}
{% endtabs %}

After you connect, your tool can search n8n's knowledge as you work.

{% hint style="info" %}
The exact configuration steps and file locations vary between tools and versions. Check your tool's documentation for how it adds a remote MCP server. For more on the Kapa.ai server, see the [Kapa.ai MCP documentation](https://docs.kapa.ai/overview/build-with-ai).
{% endhint %}
