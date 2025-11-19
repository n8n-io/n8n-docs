---
title: Accessing n8n MCP server
description: enable, authenticate, and connect MCP clients to n8n workflows securely
status: beta
---

# Accessing n8n MCP server

Connect supported MCP clients to your n8n workflows through n8n's built-in MCP server.

The server allows clients such as Lovable or Claude Desktop to connect securely to an n8n instance. Once connected, these clients can:

- Search within workflows marked as available in MCP
- Retrieve metadata and trigger information for workflows
- Trigger and run exposed workflows

## How this differs from the MCP Server Trigger node?

Instance‑level MCP access provides one connection per instance with centralized authentication and per‑workflow opt‑in so that enabled workflows across your instance are discoverable and runnable without bespoke server setup in each workflow. 

The MCP Server Trigger node is configured inside a single workflow and exposes tools only from that workflow, which is useful when you want to craft a specific MCP server behavior within one workflow.

### What it’s not

- Instance‑level MCP access is not a way to build or edit workflows from an AI client; authoring remains in n8n.
- It is not blanket exposure. You must enable MCP at the instance level and then enable each workflow individually.
- It is not per‑client scoping - any connected client sees all workflows you’ve enabled for MCP at this time.

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

- **OAuth2**
- **Access Token**

### Using OAuth2

Copy your instance server URL from the **OAuth** tab and use it to configure your MCP client.
After connecting, the client will redirect you to n8n to authorize access.

#### Revoking client access

To revoke access for connected MCP clients:

1. Navigate to **Settings > MCP Access**.
2. Make sure you are on the **OAuth** tab in the **How to connect** section.
3. You should see a table of connected clients in the **Connected OAuth clients** section.
3. Use the action menu in each client's roww to revoke access for specific clients.

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


## Exposing workflows to MCP clients

### Workflow eligibility

In order for a workflow to be available to MCP clients, it must meet the following criteria:

1. Be active
2. Contain one of the following trigger nodes:
    - Webhook
    - Schedule
    - Chat
    - Form

By default, no workflows are visible to MCP clients. You must explicitly enable access.

/// info
Once you deactivate a workflow, its MCP access will be removed automatically. You will have to re-enable it when you activate the workflow again.
///

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

## Executing workflows trough MCP

MCP clients can execute eligible workflows on your request. When a workflow is triggered, it runs as usual in n8n, and you can monitor its execution in the **Executions** list. Once the execution is complete, the client will retrieve the results.

### Providing input data

If a workflow requires input data, in must be provided by the MCP client when triggering the workflow. Input schema is determined by the workflow's trigger node:

1. **Webhook trigger**: MCP client will look for hints in workflow contents and it's description. It is up to workflow author to provide enough information for the client to generate valid input data.
2. **Schedule trigger**: No input data is required.
3. **Chat trigger**: Chat input format is determined by the chat node configuration.
4. **Form trigger**: Form fields are determined by the form node configuration.

### Workflow timeouts

There is a built-in, 5-minute, timeout for workflow executions triggered via MCP. If a workflow does not complete within this time, the execution is aborted, and an error is returned to the MCP client.
This means that timeout set in workflow settings is ignored for MCP-triggered executions.
Future versions of n8n may allow mcp server to respect workflow timeouts set in workflow settings.

### Limitations

- If there are multiple supported triggers in a workflow, MCP clients may only be able to use one (first one) of them to trigger the workflow.
- Executing workflows with multi-step forms or any kind of human-in-the-loop interactions is not supported.
- Binary input data is not supported. MCP clients can only provide text-based inputs for your workflows.

## Examples

#### Connecting Lovable to n8n MCP server

1. Configure MCP Server in Lovable (OAuth).
    - Navigate to your workspace  **Settings > Integrations**.
    - On the **MCP Servers** section, find **n8n** and click **Connect**.
    - Fill in your n8n server URL (shown on the **MCP Access** page).
    - Save the connection. Upon success, you will be redirected to n8n to authorize Lovable.
2. Verify connectivity.
    - Once connected, Lovable can query for workflows with MCP access enabled.
    - Example: asking Lovable to build a workflow UI that lists users and allows deleting them.

#### Connecting Claude Desktop to n8n MCP server

##### Using OAuth2

1. Navigate to **Settings** > **Connectors** in Claude Desktop.
2. Click on **Add custom connector**.
3. Fill in the following details:
   	- **Name**: n8n MCP
    - **Remote MCP Server URL**: Your n8n base URL (shown on the **MCP Access** page)
4. Save the connector.
5. When prompted, authorize Claude Desktop to access your n8n instance.

##### Using Access Token

/// info
This requires latest version of [Node.js](https://nodejs.org/en/download).
///

Add the following entry to your `claude_desktop_config.json` file:

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

### Connecting Claude Code to n8n MCP server

Use the following CLI command:

```bash
claude mcp add --transport http n8n-mcp https://<your-n8n-domain>/mcp-server/http \
  --header "Authorization: Bearer <YOUR_N8N_MCP_TOKEN>"
```

Alternatively, add the following entry to your `claude.json` file:

```json
{
    "mcpServers": {
        "n8n-local": {
            "type": "http",
            "url": "https://<your-n8n-domain>/mcp-server/http",
            "headers": {
                "Authorization": "Bearer <YOUR_N8N_MCP_TOKEN>"
            }
        }
    }
}
```

Here, replace:

- `<your-n8n-domain>`: Your n8n base URL (shown on the **MCP Access** page)
- `<YOUR_N8N_MCP_TOKEN>`: Your generated token

### Connecting Codex CLI to n8n MCP server

Add the following entry to your `~/.codex/config.toml` file:

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

## Troubleshooting

If you encounter issues connecting MCP clients to your n8n instance, consider the following:

- Ensure that your n8n instance is publicly accessible if you are using cloud-based MCP clients.
- Verify that the MCP access is enabled in n8n settings.
- Check that the workflows you want to access are marked as available in MCP.
- Confirm that the authentication method (OAuth2 or Access Token) is correctly configured in your MCP client.
- Review n8n server logs for any error messages related to MCP connections.
- If you are using desktop MCP clients, make sure you have latest [ Node.js](https://nodejs.org/en/download) version installed.
