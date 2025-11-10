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

   ![enable-mcp-access.png](/_images/advanced-ai/enable-mcp-access.png)

Once enabled, you'll see:

- Connection instructions
- List of workflows exposed to MCP clients

**To disable:** Toggle the switch off.

### For self-hosted: Complete disablement

To remove the feature entirely, set the environment variable:

`N8N_DISABLED_MODULES=mcp`

This removes MCP endpoints and hides all related UI elements.

## Setting up MCP authentication

The **How to connect** section on the **MCP Access** page provides two authentication methods for MCP clients:

- **oAuth2**
- **Access Token**

### Using oAuth2

Copy your instance server URL from the **oAuth** tab and use it to configure your MCP client.
After connecting, the client will redirect you to n8n to authorize access.

#### Revoking client access

To revoke access for connected MCP clients:

1. Navigate to **Settings > MCP Access**.
2. Make sure you are on the **oAuth** tab in the **How to connect** section.
3. You should see a table of connected clients in the **Connected oAuth clients** section.
3. Use the action menu to revoke access for specific clients.

### Using Access Token

Use your instance server URL and your personal MCP Access Token from the **Access Token** tab on the settings page.

When you first visit the **MCP Access page**, n8n automatically generates a personal MCP Access Token tied to your user account.

/// info
Copy your token right away. On future visits, you'll only see a redacted value and the copy button will be disabled.
///

#### Rotating your token

If you lose your token or need to rotate it:

1. Navigate to **Settings > MCP Access**.
2. Make sure you are on the **Access Token** tab in the **How to connect** section.
2. Generate a new token.
    
    The previous token is revoked right away upon generation.
    
3. Update all connected MCP clients with the new value.

## Connecting an MCP client using configuration files

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

### Workflow descriptions

To help MCP clients identify workflows, you can add free-text descriptions as follows:

1. Open the workflow.
2. Click the pencil icon next to the workflow name.
3. Enter your description in the **Description** field.

	![mcp-access-workflow-descriptions.png](/_images/advanced-ai/mcp-access-workflow-descriptions.png)

## Example: Connecting Lovable to n8n MCP server

1. Configure MCP Server in Lovable (oAuth).
    - Navigate to **Settings > Integrations**.
    - Add a new MCP server connection (Custom):
    	- Enter your desired connector name.
        - Enter the **Server URL** (copy from n8n instance settings).
    - Save the connection. Upon success, you will be redirected to n8n to authorize Lovable.
2. Verify connectivity.
    - Once connected, Lovable can query for workflows with MCP access enabled.
    - Example: asking Lovable to build a workflow UI that lists users and allows deleting them.
     
/// info
A native n8n connector is coming soon to Lovable. You can use it to connect directly with your server URL.
///

## Troubleshooting

If you encounter issues connecting MCP clients to your n8n instance, consider the following:

- Ensure that your n8n instance is publicly accessible if you are using cloud-based MCP clients.
- Verify that the MCP access is enabled in n8n settings.
- Check that the workflows you want to access are marked as available in MCP.
- Confirm that the authentication method (oAuth2 or Access Token) is correctly configured in your MCP client.
- Review n8n server logs for any error messages related to MCP connections.
- If you are using desktop MCP clients, make sure you have latest [ Node.js](https://nodejs.org/en/download) version installed.
