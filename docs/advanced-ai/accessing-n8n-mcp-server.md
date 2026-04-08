---
title: Set up and use n8n MCP server
description: Connect, authenticate, and integrate MCP clients to build and execute n8n workflows programmatically
status: beta
---

# Accessing n8n MCP server

Connect supported MCP clients to your n8n workflows through n8n's built-in MCP server.

The server allows clients such as Lovable or Claude Desktop to connect securely to an n8n instance. Once connected, these clients can:

- Search within workflows marked as available in MCP
- Retrieve metadata and trigger information for workflows
- Trigger and run exposed workflows
- Create and edit workflows

## Difference between instance-level MCP access and MCP Server Trigger node

Instance-level MCP access lets you create one connection per n8n instance, use centralized authentication, and choose which workflows to enable for access. Enabled workflows are easy to find and run without extra setup for each workflow.

In comparison, you configure an MCP Server Trigger node inside a single workflow. This node exposes tools only from that workflow, a useful approach when you want to craft a specific MCP server behavior within one workflow.

### Key considerations when using instance-level MCP access

- MCP supports two types of workflow interactions: running existing workflows with the workflow execution tools, and building or editing workflows (v2.13 onward).
- It doesn't provide blanket exposure to all workflows in your instance. You must enable MCP at the instance level and then enable each workflow individually.
- It's not scoped to each MCP client. Any connected client sees all workflows you’ve enabled for MCP access.

## Enabling MCP access

### For Cloud and self-hosted instances

1. Navigate to **Settings > Instance-level MCP**
2. Toggle **Enable MCP access** (requires instance owner or admin permissions).

   ![enable-mcp-access.png](/_images/advanced-ai/enable-mcp-access.png)

Once enabled, you'll see:

1. List of workflows exposed to MCP clients
2. List of connected OAuth clients
3. Main MCP toggle to enable/disable instance-level access
4. *Connection details* button that shows detailed instructions for connecting MCP clients

   ![mcp_page_content.png](/_images/advanced-ai/mcp_page_content.png)

**To disable:** Toggle the main MCP toggle off.

### For self-hosted: Complete disablement

To remove the feature entirely, set the environment variable:

`N8N_DISABLED_MODULES=mcp`

This action removes MCP endpoints and hides all related UI elements.

## Setting up MCP authentication

The **Connection details** popup menu provides two authentication options for MCP clients:

- **OAuth2**
- **Access Token**

   ![mcp_connect_menu.png](/_images/advanced-ai/mcp_connect_menu.png)

### Using OAuth2

Copy your instance server URL from the **OAuth** tab and use it to configure your MCP client.
After connecting, the client will redirect you to n8n to authorize access.

#### Revoking client access

To revoke access for connected MCP clients:

1. Navigate to **Settings > Instance-level MCP**.
2. Switch to the **Connected clients** tab.
   You should see a table of connected OAuth clients.
3. Use the action menu in each client's row to revoke access for specific clients.

   ![mcp_revoke_client_access.png](/_images/advanced-ai/mcp_revoke_client_access.png)

### Using Access Token

Use your instance server URL and your personal MCP Access Token from the **Access Token** tab on the *Connection details* menu.

When you first visit the **MCP Access page**, n8n automatically generates a personal MCP Access Token tied to your user account.

/// info
Copy your token right away. On future visits, you'll only see a redacted value and the copy button will be disabled.
///

#### Rotating your token

If you lose your token or need to rotate it:

1. Navigate to **Settings > Instance-level MCP**.
2. Open the *Connection details* menu by clicking the button in the top-right corner.
3. Switch to the **Access Token** tab.
4. Generate a new token using the button next to the redacted token value.
    
    n8n revokes the previous token when you generate a new one.
    
3. Update all connected MCP clients with the new value.


   ![mcp_rotate_token.png](/_images/advanced-ai/mcp_rotate_token.png)

## Exposing workflows to MCP clients

By default, no workflows are visible to MCP clients. You must explicitly enable MCP access for each workflow you want to expose.

### Enabling access

#### Option 1: From MCP settings page (available from n8n v2.2.0)

1. Click the **Enable workflows** button (in the workflows table header or in the table's empty state)
2. Search for the desired workflow (by name or description) and select it from the list
3. Click **Enable** button to confirm

#### Option 2: From the workflow editor

1. Open the workflow.
2. Click the main workflow menu (`...`) in the top-right corner.
3. Select **Settings**.
4. Toggle **Available in MCP**.

#### Option 3: From the workflows list

1. Go to **Workflows**.
2. Open the menu on a workflow card.
3. Select **Enable MCP access**.

### Managing access

The **Instance-level MCP** settings page shows all workflows available to MCP clients. From this list you can:

- Open a workflow, its home project or parent folder directly
- Revoke access using the action menu (or use **Disable MCP access** from the workflow card menu)
- Update workflow description using the action menu (or use the menu in the workflow editor)
- Enable access for more workflows using the **Enable workflows** button (available from n8n v2.2.0)

### Workflow descriptions

To help MCP clients identify workflows, you can add free-text descriptions as follows:

1. Option 1: From the **Instance-level MCP** page
	1. Navigate to **Settings > Instance-level MCP**.
	2. Make sure you are on the **Workflows** tab.
    3. Use the action menu in the desired workflow's row and select the **Edit description** action.
    4. Alternatively, click the description text directly to open the edit dialog.
	
2. Option 2: From the workflow editor
	1. Open the workflow.
	2. Click the main workflow menu (`...`) in the top-right corner.
	3. Select **Edit description**.

	![mcp_workflow_description.png](/_images/advanced-ai/mcp_workflow_description.png)

## Executing workflows through MCP clients

MCP clients can execute workflows that you identify as available in MCP.

When a workflow is triggered or created, it runs as usual in n8n, and you can monitor its execution in the **Executions** list. Once the execution is complete, the MCP client will retrieve the results.

### Providing input data

MCP clients are typically able to assess what inputs are expected by a workflow. If you have a webhook trigger and If you see a client struggling to determine the right inputs, we recommend you provide this information in the workflow description.

### Workflow timeouts

n8n enforces a 5-minute timeout for workflow executions triggered by MCP clients. If a workflow doesn't finish in time, n8n stops the execution and sends an error to the MCP client, ignoring any timeout you set in the workflow settings for MCP-triggered executions.

### Limitations

- If there are multiple supported triggers in a workflow, MCP clients may only be able to use one (first one) of them to trigger the workflow when using workflow execution tools (not applicable to AI Workflow builder workflows).
- Executing workflows with multi-step forms or any kind of human-in-the-loop interactions isn't supported.
- Binary input data isn't supported. MCP clients can only provide text-based inputs for your workflows.

## Tools

/// tip
Consider using coding agents (such as Claude Code or Google ADK agents) instead of chat clients as your MCP clients. Coding agents are optimized for generating and validating TypeScript code, making them ideal for building workflows programmatically.
///

The n8n MCP Server exposes the following tools so that you can create and update workflows using an MCP Client.

### SDK and node reference

* `get_sdk_reference`: Retrieve n8n SDK documentation to understand the TypeScript syntax used for building workflows as code. Supports fetching either the full documentation or specific sections. Valid sections: `patterns`, `expressions`, `functions`, `rules`, `import`, `guidelines`, `design`, or `all` (v2.13 onward).
* `search_nodes`: Search for n8n nodes by service name, trigger type, or utility function. Returns node IDs, discriminators (resource/operation/mode parameters), and related nodes needed for the `get_node_types` tool (v2.13 onward).
* `get_node_types`: Retrieve TypeScript type definitions for n8n nodes. Returns exact parameter names and structures needed for proper node configuration (v2.13 onward).
* `get_suggested_nodes`: Get curated node recommendations for workflow technique categories. Returns recommended nodes with pattern hints and configuration guidance (v2.13 onward).

### Workflow creation and validation

* `validate_workflow`: Validate TypeScript workflow code for syntax and structural errors. Returns either a success confirmation or a list of errors that need fixing (v2.13 onward).
* `create_workflow_from_code`: Create a new workflow in n8n from validated TypeScript workflow code. The tool parses the code into workflow JSON and saves it to your n8n instance. Newly created workflows automatically have descriptions generated from the code and MCP access enabled. Optionally accepts `projectId` and `folderId` parameters to create the workflow inside a project or folder. (v2.14 onward)
* `update_workflow`: Update an existing workflow in n8n from validated TypeScript workflow code. Parses the code and saves changes to your n8n instance (v2.13 onward).
* `delete_workflow`: Archive a workflow by ID.
* `publish_workflow`: Publish a workflow by ID.
* `unpublish_workflow`: Unpublish a workflow by ID.

### Workflow introspection

* `get_execution`: Retrieve workflow execution history and results. Supports filtering parameters to avoid context overflow. (v2.14 onward)
    * `includeData` (boolean): Include full execution result data. Defaults to `false` (metadata only).
    * `nodeNames` (array): When `includeData` is true, return data only for the specific node names.
    * `truncateData` (boolean): When `includeData` is true, limit the number of data items returned per node.

### Testing workflows

* `prepare_test_pin_data`: Look at a workflow and return JSON schemas for any nodes that need simulated data (triggers, credentialed nodes, HTTP requests). Use these schemas to generate realistic test data before running `test_workflow`. (v2.15 onward)
* `test_workflow`: Run a workflow using generated pin data to simulate external services, while still actually executing logic nodes (Set, If, Code). Return the execution status. (v2.15 onward)

### Projects and folders

* `search_projects`: Search for projects accessible to the current user. (v2.14 onward)
* `search_folders`: Search for folders within a project. (v2.14 onward)

### Data tables

* `create_data_table`: Create a new data table with the specified columns. Use `search_projects` to find a project ID first. (v2.16 onward)
* `search_data_tables`: Search for data tables accessible to the current user. Use this to find a data table ID before modifying or adding data to it. (v2.16 onward)
* `add_data_table_rows`: Insert rows into an existing data table. Each row is an object mapping column names to values. Use `search_data_tables` to find the data table ID first. (v2.16 onward)
* `add_data_table_column`: Add a new column to an existing data table. (v2.16 onward)
* `rename_data_table`: Rename an existing data table. (v2.16 onward)
* `rename_data_table_column`: Rename a column in a data table. (v2.16 onward)
* `delete_data_table_column`: Delete a column from a data table. This permanently removes the column and all its data. (v2.16 onward)

## Resources

For MCP clients that support resources:

* `workflow-sdk-reference`: Access n8n SDK documentation as an MCP resource, providing comprehensive reference material for building workflows as code.

## Examples

#### Connecting Lovable to n8n MCP server

1. Configure MCP Server in Lovable (OAuth).
    - Navigate to your workspace  **Settings > Integrations**.
    - In the **MCP Servers** section, find **n8n** and click **Connect**.
    - Enter your n8n server URL (shown on the **MCP Access** page).
    - Save the connection. If successful, n8n redirects you to authorize Lovable.
2. Verify connectivity.
    - Once connected, Lovable can query for workflows with MCP access enabled.
    - **Example:** Asking Lovable to build a workflow UI that lists users and allows deleting them.

#### Connecting Claude Desktop to n8n MCP server

##### Using OAuth2

1. Navigate to **Settings** > **Connectors** in Claude Desktop.
2. Click on **Add custom connector**.
3. Enter the following details:
   	- **Name:** n8n MCP
    - **Remote MCP Server URL**: Your n8n base URL (shown on the **Instance-level MCP** page)
4. Save the connector.
5. When prompted, authorize Claude Desktop to access your n8n instance.

##### Using Access Token

/// info
This requires the latest version of [Node.js](https://nodejs.org/en/download).
///

Add the following entry to your `claude_desktop_config.json` file:

```json
"mcpServers": {
  "n8n-local": {
    "type": "http",
    "url": "https://<your-n8n-domain>/mcp-server/http",
    "headers": {
      "Authorization": "Bearer <YOUR_N8N_MCP_TOKEN>"
    }
  }
}
```

Here, replace:

- `<your-n8n-domain>`: Your n8n base URL (shown on the **Instance-level MCP** page)
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

- `<your-n8n-domain>`: Your n8n base URL (shown on the **Instance-level MCP** page)
- `<YOUR_N8N_MCP_TOKEN>`: Your generated token

### Connecting Codex CLI to n8n MCP server

Add the following entry to your `~/.codex/config.toml` file:

```toml
[mcp_servers.n8n_mcp]
url = "https://<your-n8n-domain>/mcp-server/http"
http_headers = { "authorization" = "Bearer <YOUR_N8N_MCP_TOKEN>" }
```

Here, replace:

- `<your-n8n-domain>`: Your n8n base URL (shown on the **Instance-level MCP** page)
- `<YOUR_N8N_MCP_TOKEN>`: Your generated token

### Connecting Google ADK agent to n8n MCP server

Here's sample code to create an agent that connects to a remote n8n MCP server:

```python
from google.adk.agents import Agent
from google.adk.tools.mcp_tool import McpToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StreamableHTTPServerParams

N8N_INSTANCE_URL = "https://localhost:5678"
N8N_MCP_TOKEN = "YOUR_N8N_MCP_TOKEN"

root_agent = Agent(
    model="gemini-2.5-pro",
    name="n8n_agent",
    instruction="Help users manage and execute workflows in n8n",
    tools=[
        McpToolset(
            connection_params=StreamableHTTPServerParams(
                url=f"{N8N_INSTANCE_URL}/mcp-server/http",
                headers={
                    "Authorization": f"Bearer {N8N_MCP_TOKEN}",
                },
            ),
        )
    ],
)
```

For more details, see [Connect ADK agent to n8n](https://google.github.io/adk-docs/tools/third-party/n8n/).


## Troubleshooting

If you encounter issues connecting MCP clients to your n8n instance, consider the following:

- Ensure that your n8n instance is publicly accessible if you are using cloud-based MCP clients.
- Verify that the MCP access is enabled in n8n settings.
- Check that the workflows you want to access are marked as available in MCP.
- Confirm that the authentication method (OAuth2 or Access Token) is correctly configured in your MCP client.
- Review n8n server logs for any error messages related to MCP connections.
- If you are using desktop MCP clients, make sure you have the latest [Node.js](https://nodejs.org/en/download) version installed.
