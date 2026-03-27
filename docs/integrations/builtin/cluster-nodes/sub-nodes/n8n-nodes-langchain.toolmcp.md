---
title: MCP Client Tool node documentation
description: Learn how to use the MCP Client Tool node in n8n. Follow technical documentation to integrate MCP Client Tool node into your workflows.
contentType: [integration, reference]
---

# MCP Client Tool node

The MCP Client Tool node is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) client, allowing you to use the tools exposed by an external MCP server. You can connect the MCP Client Tool node to your models to call external tools with n8n agents.

///  note  | Credentials
The MCP Client Tool node supports [Bearer](/integrations/builtin/credentials/httprequest.md#using-bearer-auth), generic [header](/integrations/builtin/credentials/httprequest.md#using-header-auth), and [OAuth2](/integrations/builtin/credentials/httprequest.md#using-oauth2) authentication methods.
///

## Node parameters

Configure the node with the following parameters.

* **SSE Endpoint**: The SSE endpoint for the MCP server you want to connect to.
* **Authentication**: The authentication method for authentication to your MCP server. The MCP tool supports [bearer](/integrations/builtin/credentials/httprequest.md#using-bearer-auth), generic [header](/integrations/builtin/credentials/httprequest.md#using-header-auth), and [OAuth2](/integrations/builtin/credentials/httprequest.md#using-oauth2) authentication. Select **None** to attempt to connect without authentication.
* **Tools to Include**: Choose which tools you want to expose to the AI Agent:
	* **All**: Expose all the tools given by the MCP server.
	* **Selected**: Activates a **Tools to Include** parameter where you can select the tools you want to expose to the AI Agent.
	* **All Except**: Activates a **Tools to Exclude** parameter where you can select the tools you want to avoid sharing with the AI Agent. The AI Agent will have access to all MCP server's tools that aren't selected.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'mcp-client-tool') ]]

## Related resources

n8n also has an [MCP Server Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.mcptrigger.md) node that allows you to expose n8n tools to external AI Agents.

Refer to the [MCP documentation](https://modelcontextprotocol.io/introduction) and [MCP specification](https://modelcontextprotocol.io/specification/) for more details about the protocol, servers, and clients.

--8<-- "_snippets/integrations/builtin/cluster-nodes/tools-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

