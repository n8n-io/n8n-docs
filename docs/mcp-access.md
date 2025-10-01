---
tags:
  - MCP
  - MCP Server
  - MCP Client
  - AI
description: Access your n8n instance through MCP.
hide:
  - tags
contentType: reference
---

# MCP Access

/// info | Feature availability
MCP Access is available on all Self-hosted and Cloud plans.
///

MCP ([Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro)) access lets you reach your n8n workflows from compatible MCP clients. 

When the feature is enabled your instance runs a dedicated MCP server behind the `/mcp-server/http` URL, so MCP clients can search approved workflows and fetch their details without exposing the rest of your workspace.

## Enable MCP access for your instance
1. Open **Settings > MCP Access**.
2. Toggle the **Enable MCP access** switch (only enabled for the instance owner or admins).
3. Once enabled the page shows connection instructions and a list of workflows that are exposed to MCP clients.

If you turn the instance toggle off, existing tokens stop working and MCP clients can no longer connect until it is re-enabled.

Also, self-hosted users can disable the feature entirely with the `N8N_DISABLED_MODULES=mcp` environment variable. Doing so removes the endpoints and hides the related UI.

## Manage the MCP Access Token
- The first time you visit the MCP Access page n8n generates a personal MCP Access Token for you. This token authenticates MCP clients against your user account.
- Copy the token as soon as it appears. On subsequent visits you will only see a redacted value, and the copy button is disabled.
- If you loose your current token, you can always **generate a new one** from this page. The existing token is revoked immediately, so update any connected MCP clients with the new value.

## Connect an MCP client
Connection instructions include the server URL and the token, which are usually enough to connect an MCP client.

If you are using an MCP client that uses JSON config files, you can copy a sample configuration file from the MCP Access page, which looks like this:
```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "supergateway",
        "--streamableHttp",
        "https://<your-n8n-domain>/mcp-server/http",
        "--header",
        "authorization:Bearer <YOUR_N8N_MCP_TOKEN>"
      ]
    }
  }
}
```
Replace `<your-n8n-domain>` with the base URL shown on the page and `<YOUR_N8N_MCP_TOKEN>` with the generated token.

## Expose workflows to MCP clients

/// note | Eligible workflows
Only **active**, **webhook-triggered** workflows can be exposed to MCP clients.
///

By default no workflow is visible to MCP clients. After enabling the feature, you can enable MCP access on a workflow in two ways:

 1. **Workflow settings modal:** Open a workflow, go to **Settings**, and toggle **Available in MCP**.
 2. **Workflow list actions:** From **Workflows**, open the menu on a workflow card and pick **Enable MCP access** (or **Disable MCP access** to remove it).

The MCP Access settings page lists every workflow currently available to MCP. You can open a workflow directly from the list or revoke access from the action menu.

## Server capabilities
The built-in MCP server currently offers read-only access to approved workflows. It exposes two tools:

- `search_workflows` lets clients search within workflows you have marked as available in MCP.
- `get_workflow_details` returns metadata and webhook information, so clients can generate front-ends or documentation for webhook-triggered workflows.

With these tools, MCP clients can build interfaces that let users find and trigger workflows without needing direct access to your n8n instance.

We will extend these capabilities in future n8n releases, but existing tools will continue to work for all connected clients.
