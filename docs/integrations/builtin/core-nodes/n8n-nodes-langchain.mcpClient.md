---
title: MCP Client node documentation
description: >-
  Learn how to use the MCP Client node in n8n. Follow technical documentation to
  integrate MCP Client node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: MCP Client node documentation
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-langchain.mcpClient.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.mcpClient
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.mcpClient
layout:
  description:
    visible: false
---

# MCP Client node <a href="#mcp-client-node" id="mcp-client-node"></a>

The MCP Client node is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) client that allows you to use the tools that are exposed by an external MCP server.

You can use the MCP Client node to use MCP tools as regular steps in a workflow.

If you want to use MCP tools as tools for an AI Agent, use the [MCP Client Tool node](../cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp.md) instead.

{% hint style="info" %}
**Credentials**

The MCP Client node supports [Bearer](../credentials/httprequest.md#using-bearer-auth), generic [header](../credentials/httprequest.md#using-header-auth), multiple headers, and [OAuth2](../credentials/httprequest.md#using-oauth2) authentication methods.
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Configure the node with the following parameters.

* **Server Transport**: The transport protocol used by the MCP Server endpoint you want to connect to.
* **MCP Endpoint URL**: The URL of the external MCP Server. For example, `https://mcp.notion.com/mcp`.
* **Authentication**: The authentication method for authentication to your MCP server. The MCP Client node supports [bearer](../credentials/httprequest.md#using-bearer-auth), generic [header](../credentials/httprequest.md#using-header-auth), multiple headers, and [OAuth2](../credentials/httprequest.md#using-oauth2) authentication. Select **None** to attempt to connect without authentication.
	* **Multiple Headers Auth**: Use this when your MCP server requires more than one header, for example an API key and a username. Add each header as a **Name** and **Value** pair in the credential. You can add as many headers as you need.
* **Tool**: Select the tool to use in the node. The list of tools is automatically fetched from the external MCP server.
* **Input Mode**: 
	* **Manual**: Specify each tool parameter manually.
	* **JSON**: Specify tool parameters as a JSON object. Use this mode for tools with nested parameters.

## Options <a href="#options" id="options"></a>

* **Convert to Binary**: Whether to convert images and audio to binary data. If false, images and audio are returned as base64 encoded strings.
* **Timeout**: Time in milliseconds to wait for tool calls to finish.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse MCP Client node documentation integration templates](https://n8n.io/integrations/mcp-client) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

To use MCP tools with AI Agents, n8n has the [MCP Client Tool node](../cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp.md).

n8n also has an [MCP Server Trigger](n8n-nodes-langchain.mcptrigger.md) node that allows you to expose n8n tools to external AI Agents.

Refer to the [MCP documentation](https://modelcontextprotocol.io/introduction) and [MCP specification](https://modelcontextprotocol.io/specification/) for more details about the protocol, servers, and clients.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/tzB5H7fSmYiRvvv52e4P/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

