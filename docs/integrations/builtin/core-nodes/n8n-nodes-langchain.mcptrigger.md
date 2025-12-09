---
title: MCP Server Trigger node documentation
description: Learn how to use the MCP Server Trigger node in n8n. Follow technical documentation to integrate the MCP Server Trigger node into your workflows.
contentType: [integration, reference]
---

# MCP Server Trigger node

Use the MCP Server Trigger node to allow n8n to act as a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) server, making n8n tools and workflows available to MCP clients.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/httprequest.md).
///

## How the MCP Server Trigger node works

The MCP Server Trigger node acts as an entry point into n8n for MCP clients. It operates by exposing a URL that MCP clients can interact with to access n8n tools.

Unlike conventional [trigger nodes](/glossary.md#trigger-node-n8n), which respond to events and pass their output to the next [connected node](/workflows/components/connections.md), the MCP Server Trigger node only connects to and executes [tool](/advanced-ai/examples/understand-tools.md) nodes. Clients can list the available tools and call individual tools to perform work.

You can expose n8n workflows to clients by attaching them with the [Custom n8n Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md) node.

/// note | Server-Sent Events (SSE) and streamable HTTP support
The MCP Server Trigger node supports both [Server-Sent Events (SSE)](https://modelcontextprotocol.io/docs/concepts/transports#server-sent-events-sse), a long-lived transport built on top of HTTP, and [streamable HTTP](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) for connections between clients and the server. It currently doesn't support [standard input/output (stdio)](https://modelcontextprotocol.io/docs/concepts/transports#standard-input%2Foutput-stdio) transport.
///

## Node parameters

Use these parameters to configure your node.

### MCP URL

The MCP Server Trigger node has two **MCP URLs**: test and production. n8n displays the URLs at the top of the node panel.

Select **Test URL** or **Production URL** to toggle which URL n8n displays.

* **Test**: n8n registers a test MCP URL when you select **Listen for Test Event** or **Execute workflow**, if the workflow isn't active. When you call the MCP URL, n8n displays the data in the workflow.
* **Production**: n8n registers a production MCP URL when you publish the workflow. When using the production URL, n8n doesn't display the data in the workflow. You can still view workflow data for a production execution: select the **Executions** tab in the workflow, then select the workflow execution you want to view.

### Authentication

You can require authentication for clients connecting to your MCP URL. Choose from these authentication methods:

- Bearer auth
- Header auth

Refer to the [HTTP request credentials](/integrations/builtin/credentials/httprequest.md) for more information on setting up each credential type.

### Path

By default, this field contains a randomly generated MCP URL path, to avoid conflicts with other MCP Server Trigger nodes. 

You can manually specify a URL path, including adding route parameters. For example, you may need to do this if you use n8n to prototype an API and want consistent endpoint URLs.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'mcp-server-trigger') ]]

### Integrating with Claude Desktop

You can connect to the MCP Server Trigger node from [Claude Desktop](https://claude.ai/download) by running a gateway to proxy SSE messages to stdio-based servers.

To do so, add the following to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "n8n": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "<MCP_URL>",
        "--header",
        "Authorization: Bearer ${AUTH_TOKEN}"
      ],
      "env": {
        "AUTH_TOKEN": "<MCP_BEARER_TOKEN>"
      }
    }
  }
}
```

Be sure to replace the `<MCP_URL>` and `<MCP_BEARER_TOKEN>` placeholders with the values from your MCP Server Trigger node parameters and credentials.

## Limitations

### Configuring the MCP Server Trigger node with webhook replicas

The MCP Server Trigger node relies on Server-Sent Events (SSE) or streamable HTTP, which require the same server instance to handle persistent connections. This can cause problems when running n8n in [queue mode](/hosting/scaling/queue-mode.md) depending on your [webhook processor](/hosting/scaling/queue-mode.md#webhook-processors) configuration:

* If you use queue mode with a **single webhook replica**, the MCP Server Trigger node works as expected.
* If you run **multiple webhook replicas**, you need to route all `/mcp*` requests to a single, dedicated webhook replica. Create a separate replica set with one webhook container for MCP requests. Afterward, update your ingress or load balancer configuration to direct all `/mcp*` traffic to that instance.

/// warning | Caution when running with multiple webhook replicas
If you run an MCP Server Trigger node with multiple webhook replicas and don't route all `/mcp*` requests to a single, dedicated webhook replica, your SSE and streamable HTTP connections will frequently break or fail to reliably deliver events.
///

## Related resources

n8n also provides an [MCP Client Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp.md) node that allows you to connect your n8n AI agents to external tools.

Refer to the [MCP documentation](https://modelcontextprotocol.io/introduction) and [MCP specification](https://modelcontextprotocol.io/specification/) for more details about the protocol, servers, and clients.

## Common issues

Here are some common errors and issues with the MCP Server Trigger node and steps to resolve or troubleshoot them.

### Running the MCP Server Trigger node with a reverse proxy

When running n8n behind a reverse proxy like nginx, you may experience problems if the MCP endpoint isn't configured for SSE or streamable HTTP.

Specifically, you need to disable proxy buffering for the endpoint. Other items you might want to adjust include disabling gzip compression (n8n handles this itself), disabling chunked transfer encoding, and setting the `Connection` to an empty string to remove it from the forwarded headers. Explicitly disabling these in the MCP endpoint ensures they're not inherited from other places in your nginx configuration.

An example nginx location block for serving MCP traffic with these settings may look like this:

```
location /mcp/ {
    proxy_http_version          1.1;
    proxy_buffering             off;
    gzip                        off;
    chunked_transfer_encoding   off;

    proxy_set_header            Connection '';

    # The rest of your proxy headers and settings
    # . . .
}
```
