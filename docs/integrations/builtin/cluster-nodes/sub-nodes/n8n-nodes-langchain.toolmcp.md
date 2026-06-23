---
title: MCP Client Tool node documentation
description: >-
  Learn how to use the MCP Client Tool node in n8n. Follow technical
  documentation to integrate MCP Client Tool node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: MCP Client Tool node documentation
originalFilePath: integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp
layout:
  description:
    visible: false
---

# MCP Client Tool node <a href="#mcp-client-tool-node" id="mcp-client-tool-node"></a>

The MCP Client Tool node is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) client, allowing you to use the tools exposed by an external MCP server. You can connect the MCP Client Tool node to your models to call external tools with n8n agents.

{% hint style="info" %}
**Credentials**

The MCP Client Tool node supports [Bearer](../../credentials/httprequest.md#using-bearer-auth), generic [header](../../credentials/httprequest.md#using-header-auth), multiple headers, and [OAuth2](../../credentials/httprequest.md#using-oauth2) authentication methods.
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Configure the node with the following parameters.

* **SSE Endpoint**: The SSE endpoint for the MCP server you want to connect to.
* **Authentication**: The authentication method for authentication to your MCP server. The MCP tool supports [bearer](../../credentials/httprequest.md#using-bearer-auth), generic [header](../../credentials/httprequest.md#using-header-auth), multiple headers, and [OAuth2](../../credentials/httprequest.md#using-oauth2) authentication. Select **None** to attempt to connect without authentication.
	* **Multiple Headers Auth**: Use this when your MCP server requires more than one header, for example an API key and a username. Add each header as a **Name** and **Value** pair in the credential. You can add as many headers as you need.
* **Tools to Include**: Choose which tools you want to expose to the AI Agent:
	* **All**: Expose all the tools given by the MCP server.
	* **Selected**: Activates a **Tools to Include** parameter where you can select the tools you want to expose to the AI Agent.
	* **All Except**: Activates a **Tools to Exclude** parameter where you can select the tools you want to avoid sharing with the AI Agent. The AI Agent will have access to all MCP server's tools that aren't selected.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse MCP Client Tool node documentation integration templates](https://n8n.io/integrations/mcp-client-tool) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n also has an [MCP Server Trigger](../../core-nodes/n8n-nodes-langchain.mcptrigger.md) node that allows you to expose n8n tools to external AI Agents.

Refer to the [MCP documentation](https://modelcontextprotocol.io/introduction) and [MCP specification](https://modelcontextprotocol.io/specification/) for more details about the protocol, servers, and clients.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/tzB5H7fSmYiRvvv52e4P/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

