---
title: MCP Server Trigger node documentation
description: >-
  Learn how to use the MCP Server Trigger node in n8n. Follow technical
  documentation to integrate the MCP Server Trigger node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: MCP Server Trigger node documentation
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-langchain.mcptrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.mcptrigger
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.mcptrigger
layout:
  description:
    visible: false
---

# MCP Server Trigger node <a href="#mcp-server-trigger-node" id="mcp-server-trigger-node"></a>

Use the MCP Server Trigger node to allow n8n to act as a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) server, making n8n tools and workflows available to MCP clients.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/httprequest.md).
{% endhint %}

## How the MCP Server Trigger node works <a href="#how-the-mcp-server-trigger-node-works" id="how-the-mcp-server-trigger-node-works"></a>

The MCP Server Trigger node acts as an entry point into n8n for MCP clients. It operates by exposing a URL that MCP clients can interact with to access n8n tools.

Unlike conventional [trigger nodes](#user-content-fn-1)[^1], which respond to events and pass their output to the next [connected node](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/workflow-components/connect-nodes-together), the MCP Server Trigger node only connects to and executes [tool](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/how-tools-work) nodes. Clients can list the available tools and call individual tools to perform work.

You can expose n8n workflows to clients by attaching them with the [Custom n8n Workflow Tool](../cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md) node.

{% hint style="info" %}
**Server-Sent Events (SSE) and streamable HTTP support**

The MCP Server Trigger node supports both [Server-Sent Events (SSE)](https://modelcontextprotocol.io/docs/concepts/transports#server-sent-events-sse), a long-lived transport built on top of HTTP, and [streamable HTTP](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) for connections between clients and the server. It currently doesn't support [standard input/output (stdio)](https://modelcontextprotocol.io/docs/concepts/transports#standard-input%2Foutput-stdio) transport.
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Use these parameters to configure your node.

### MCP URL <a href="#mcp-url" id="mcp-url"></a>

The MCP Server Trigger node has two **MCP URLs**: test and production. n8n displays the URLs at the top of the node panel.

Select **Test URL** or **Production URL** to toggle which URL n8n displays.

* **Test**: n8n registers a test MCP URL when you select **Listen for Test Event** or **Execute workflow**, if the workflow isn't active. When you call the MCP URL, n8n displays the data in the workflow.
* **Production**: n8n registers a production MCP URL when you publish the workflow. When using the production URL, n8n doesn't display the data in the workflow. You can still view workflow data for a production execution: select the **Executions** tab in the workflow, then select the workflow execution you want to view.

### Authentication <a href="#authentication" id="authentication"></a>

You can require authentication for clients connecting to your MCP URL. Choose from these authentication methods:

- Bearer auth
- Header auth

Refer to the [HTTP request credentials](../credentials/httprequest.md) for more information on setting up each credential type.

### Path <a href="#path" id="path"></a>

By default, this field contains a randomly generated MCP URL path, to avoid conflicts with other MCP Server Trigger nodes. 

You can manually specify a URL path, including adding route parameters. For example, you may need to do this if you use n8n to prototype an API and want consistent endpoint URLs.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse MCP Server Trigger node documentation integration templates](https://n8n.io/integrations/mcp-server-trigger) or [search all templates](https://n8n.io/workflows/)

### Integrating with Claude Desktop <a href="#integrating-with-claude-desktop" id="integrating-with-claude-desktop"></a>

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

## Limitations <a href="#limitations" id="limitations"></a>

### Configuring the MCP Server Trigger node with webhook replicas <a href="#configuring-the-mcp-server-trigger-node-with-webhook-replicas" id="configuring-the-mcp-server-trigger-node-with-webhook-replicas"></a>

The MCP Server Trigger node relies on Server-Sent Events (SSE) or streamable HTTP, which require the same server instance to handle persistent connections. This can cause problems when running n8n in [queue mode](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/enable-queue-mode) depending on your [webhook processor](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/enable-queue-mode#webhook-processors) configuration:

* If you use queue mode with a **single webhook replica**, the MCP Server Trigger node works as expected.
* If you run **multiple webhook replicas**, you need to route all `/mcp*` requests to a single, dedicated webhook replica. Create a separate replica set with one webhook container for MCP requests. Afterward, update your ingress or load balancer configuration to direct all `/mcp*` traffic to that instance.

{% hint style="warning" %}
**Caution when running with multiple webhook replicas**

If you run an MCP Server Trigger node with multiple webhook replicas and don't route all `/mcp*` requests to a single, dedicated webhook replica, your SSE and streamable HTTP connections will frequently break or fail to reliably deliver events.
{% endhint %}

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n also provides an [MCP Client Tool](../cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp.md) node that allows you to connect your n8n AI agents to external tools.

Refer to the [MCP documentation](https://modelcontextprotocol.io/introduction) and [MCP specification](https://modelcontextprotocol.io/specification/) for more details about the protocol, servers, and clients.

## Common issues <a href="#common-issues" id="common-issues"></a>

Here are some common errors and issues with the MCP Server Trigger node and steps to resolve or troubleshoot them.

### Running the MCP Server Trigger node with a reverse proxy <a href="#running-the-mcp-server-trigger-node-with-a-reverse-proxy" id="running-the-mcp-server-trigger-node-with-a-reverse-proxy"></a>

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

[^1]: A trigger node is a special node responsible for executing the workflow in response to certain conditions. All production workflows need at least one trigger to determine when the workflow should run.
