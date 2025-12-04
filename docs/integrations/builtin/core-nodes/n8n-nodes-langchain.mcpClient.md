---
title: MCP Client node documentation
description: Learn how to use the MCP Client node in n8n. Follow technical documentation to integrate MCP Client node into your workflows.
contentType: [integration, reference]
---

# MCP Client node

The MCP Client node is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) client, allowing you to use the tools exposed by an external MCP server. You can use the MCP Client node to use MCP tools as regular workflow steps. If you want to use MCP tools as tools for an AI Agent, use the [MCP Client Tool node](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp.md).

///  note  | Credentials
The MCP Client node supports [Bearer](/integrations/builtin/credentials/httprequest.md#using-bearer-auth), generic [header](/integrations/builtin/credentials/httprequest.md#using-header-auth), and [OAuth2](/integrations/builtin/credentials/httprequest.md#using-oauth2) authentication methods.
///

## Node parameters

Configure the node with the following parameters.

* **Server Transport**: The transport protocol used by the MCP Server endpoint you want to connect to.
* **MCP Endpoint URL**: The URL of the external MCP Server (e.g. https://mcp.notion.com/mcp).
* **Authentication**: The authentication method for authentication to your MCP server. The MCP Client node supports [bearer](/integrations/builtin/credentials/httprequest.md#using-bearer-auth), generic [header](/integrations/builtin/credentials/httprequest.md#using-header-auth), and [OAuth2](/integrations/builtin/credentials/httprequest.md#using-oauth2) authentication. Select **None** to attempt to connect without authentication.
* **Tool**: Select the tool to use in the node. The list of tools is automatically fetched from the external MCP server.
* **Input Mode**: 
	* **Manual**: Specify each tool parameter manually.
	* **JSON**: Specify tool parameters as a JSON object. Use this mode for tools with nested parameters.
	* **All Except**: Activates a **Tools to Exclude** parameter where you can select the tools you want to avoid sharing with the AI Agent. The AI Agent will have access to all MCP server's tools that aren't selected.

## Options

* **Convert to Binary**: Whether to convert images and audio to binary data. If false, images and audio will be returned as base64 encoded strings.
* **Timeout**: Time in milliseconds to wait for tool calls to finish.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'mcp-client') ]]

## Related resources

To use MCP tools with AI Agents, n8n has the [MCP Client Tool node](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp.md).

n8n also has an [MCP Server Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.mcptrigger.md) node that allows you to expose n8n tools to external AI Agents.

Refer to the [MCP documentation](https://modelcontextprotocol.io/introduction) and [MCP specification](https://modelcontextprotocol.io/specification/) for more details about the protocol, servers, and clients.

--8<-- "_snippets/integrations/builtin/cluster-nodes/tools-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

