---
title: Accessing n8n MCP server
description: enable, authenticate, and connect MCP clients to n8n workflows securely
status: beta
---

# Accessing n8n MCP server

Connect supported MCP clients to your n8n workflows through n8n's built-in MCP server.

The server allows clients such as Lovable to connect securely to an n8n instance. Once connected, these clients can:

- Search within workflows marked as available in MCP
- Retrieve metadata and webhook information for workflows
- Trigger and run workflows using webhook endpoints

## Enabling MCP access

### For Cloud and self-hosted instances

1. Navigate to **Settings > MCP Access**
2. Toggle **Enable MCP access** (requires instance owner or admin permissions).

   ![ai-workflow-builder.png](/_images/advanced-ai/enable-mcp-access.png)

Once enabled, you'll see:

- Connection instructions
- List of workflows exposed to MCP clients

**To disable:** Toggle the switch off.

### For self-hosted: Complete disablement

To remove the feature entirely, set the environment variable:

`N8N_DISABLED_MODULES=mcp`

This removes MCP endpoints and hides all related UI elements.

## Setting up MCP authentication

### Generating your access token

When you first visit the MCP Access page, n8n automatically generates a personal MCP Access Token tied to your user account.

/// info
Copy your token right away. On future visits, you'll only see a redacted value and the copy button will be disabled.
///

### Rotating your token

If you lose your token or need to rotate it:

1. Navigate to **Settings > MCP Access**.
2. Generate a new token.
    
    The previous token is revoked right away upon generation.
    
3. Update all connected MCP clients with the new value.

## Connecting an MCP client

### Basic connection

Most MCP clients require two pieces of information from the **MCP Access** page:

- Server URL
- Your MCP Access Token

### JSON configuration

For MCP clients using JSON configuration files, copy the sample configuration from the MCP Access page:

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

Here, replace:

- `<your-n8n-domain>`: Your n8n base URL (shown on the **MCP Access** page)
- `<YOUR_N8N_MCP_TOKEN>`: Your generated token

### TOML configuration

For MCP clients using TOML configuration files (like Codex CLI), use the following configuration:

```toml
[mcp_servers.n8n_mcp]
command = "npx"
args = [
    "-y",
    "supergateway",
    "--streamableHttp",
    "https://<your-n8n-domain>/mcp-server/http",
    "--header",
    "authorization:Bearer <YOUR_N8N_MCP_TOKEN>"
]
```

Here, replace:
- `<your-n8n-domain>`: Your n8n base URL, which is shown on the MCP Access page
- `<YOUR_N8N_MCP_TOKEN>`: Your generated token

## Exposing workflows to MCP clients

### Workflow eligibility

Only **active, webhook-triggered workflows** can be exposed to MCP clients.

By default, no workflows are visible to MCP clients. You must explicitly enable access.

### Enabling access

**Option 1: From the workflow editor**

1. Open the workflow.
2. Go to **Settings**.
3. Toggle **Available in MCP**.

**Option 2: From the workflows list**

1. Go to **Workflows**.
2. Open the menu on a workflow card.
3. Select **Enable MCP access**.

### Managing access

The **MCP Access settings page** shows all workflows available to MCP clients. From this list you can:

- Open a workflow directly
- Revoke access using the action menu (or use **Disable MCP access** from the workflow card menu)

## **Example: Connecting Lovable to n8n MCP server**

1. Configure MCP Server in Lovable.
    - Navigate to **Settings → Connection**.
    - Add a new MCP server connection:
        - Enter the **Server URL** (copy from n8n instance settings).
        - Provide the **Bearer Token** (API key) from the n8n instance's settings page.
    - Save the connection. Upon success, a confirmation message appears and available MCP tools are listed.
2. Verify connectivity.
    - Once connected, Lovable can query for workflows with MCP access enabled.
    - Example: asking Lovable to build a workflow UI that lists users and allows deleting them.