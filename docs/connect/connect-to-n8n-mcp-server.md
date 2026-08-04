---
title: Set up and use n8n MCP server
status: beta
nodeTitle: Connect to n8n MCP server
originalFilePath: advanced-ai/mcp/accessing-n8n-mcp-server.md
originalUrl: https://docs.n8n.io/advanced-ai/mcp/accessing-n8n-mcp-server
url: https://docs.n8n.io/connect/connect-to-n8n-mcp-server
description: >-
  Connect, authenticate, and integrate MCP clients to build and execute n8n
  workflows programmatically
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Connect to n8n MCP server

Connect supported MCP clients to your n8n workflows through n8n's built-in MCP server.

The server allows clients such as Lovable or Claude Desktop to connect securely to an n8n instance. Once connected, these clients can:

* Search for your workflows
* Interact with workflows marked as available in MCP
* Trigger and test exposed workflows
* Create and edit workflows and data tables

## Difference between instance-level MCP access and MCP Server Trigger node <a href="#difference-between-instance-level-mcp-access-and-mcp-server-trigger-node" id="difference-between-instance-level-mcp-access-and-mcp-server-trigger-node"></a>

Instance-level MCP access lets you create one connection per n8n instance, use centralized authentication, and choose which workflows to enable for access. Enabled workflows are easy to find and run without extra setup for each workflow.

In comparison, you configure an MCP Server Trigger node inside a single workflow. This node exposes tools only from that workflow, a useful approach when you want to craft a specific MCP server behavior within one workflow.

### Key considerations when using instance-level MCP access <a href="#key-considerations-when-using-instance-level-mcp-access" id="key-considerations-when-using-instance-level-mcp-access"></a>

* MCP supports two types of workflow interactions: running existing workflows with the workflow execution tools, and building or editing workflows (v2.13 onward).
* It doesn’t provide blanket exposure to all workflows in your instance. You must enable MCP at the instance level and then enable each workflow individually. The only exception here is the `search_workflows` tool, which is able to access all workflows current user has access to but it will only be able to surface previews, not the full workflow data.
* It's not scoped to each MCP client. All clients you connect (for example, Claude Desktop and ChatGPT) can see all workflows you've enabled for MCP access. You can't restrict specific workflows to specific clients. On a user level, visibility remains user-scoped: users can only see MCP-enabled workflows they have access to.
* Most MCP tools work on unpublished workflows. The exception is `execute_workflow`, which defaults to production mode and runs the published version of a workflow. It also supports a `manual` execution mode to run the current (unpublished) version.

## Enabling MCP access <a href="#enabling-mcp-access" id="enabling-mcp-access"></a>

### For Cloud and self-hosted instances <a href="#for-cloud-and-self-hosted-instances" id="for-cloud-and-self-hosted-instances"></a>

1. Navigate to **Settings > Instance-level MCP**.
2. Select **Enable MCP access** (requires instance owner or admin permissions).

Once enabled, the page groups settings into three sections:

* **Connection details**: shows the **MCP status** and a **Connect** button that opens setup steps for your MCP client.
* **Access**: shows how many workflows (and, if your instance has the agents feature, agents) are exposed to MCP clients. Select **Workflows exposed** to manage which workflows clients can access, or **Agents exposed** to manage which agents clients can access. n8n grants permissions per client, not all-or-nothing for every connection, see [Reviewing and revoking client access](#revoking-client-access). Instance owners and admins also see **Allowed callback URLs** here, see [Restricting OAuth callback URLs](#restricting-oauth-callback-urls).
* **Connected clients**: shows how many clients currently have access. Select **View all** to manage or revoke access for individual clients.

**To disable:** In **Connection details**, select the **MCP status** control and choose **Disable**. n8n asks you to confirm, since disabling disconnects every connected client and revokes its access. You can turn MCP access back on later.

{% hint style="info" %}
**Environment variables (self-hosted only)**

On self-hosted instances, you can also manage MCP settings using environment variables. See [Manage instance settings using environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/manage-settings-using-environment-variables#mcp).
{% endhint %}

### For self-hosted: Complete disablement <a href="#for-self-hosted-complete-disablement" id="for-self-hosted-complete-disablement"></a>

To remove the feature entirely, set the environment variable:

`N8N_DISABLED_MODULES=mcp`

This action removes MCP endpoints and hides all related UI elements.

## Setting up MCP authentication <a href="#setting-up-mcp-authentication" id="setting-up-mcp-authentication"></a>

In **Connection details**, select **Connect** to open the **Connect a client** dialog. Choose an authentication method from the tabs:

* **OAuth (recommended)**
* **API key**

### Using OAuth (recommended) <a href="#using-oauth2" id="using-oauth2"></a>

On the **OAuth** tab, use the **Your client** dropdown to pick your AI assistant, IDE, or CLI. n8n shows tailored setup steps grouped into:

* **CLI**: Claude Code, Codex, Gemini CLI.
* **Web**: Claude.ai, ChatGPT.
* **IDE**: Cursor, VS Code, Windsurf.

The setup steps depend on the client type:

* **Web clients** show a **One-click setup** button that adds n8n to the client directly, and/or a **Server URL** to paste in yourself.
* **CLI clients** show a command that installs and configures n8n in one step, a manual configuration snippet you can add to the client's configuration file instead, and an **Authenticate** step to complete the OAuth sign-in (see the [Claude Code](#connecting-claude-code-to-n8n-mcp-server) and [Codex](#connecting-codex-cli-to-n8n-mcp-server) examples below for the exact commands).
* **IDE clients** show a one-click install link (where the editor supports one), the **Server URL**, and a manual configuration snippet.

After connecting, the client redirects you to n8n so you can approve access.

#### Reviewing and revoking client access <a href="#revoking-client-access" id="revoking-client-access"></a>

Each connected client only has the permissions you granted it when it connected, for example reading workflows without being able to create or run them. To review or revoke a client's access:

1. Navigate to **Settings > Instance-level MCP**.
2. In **Connected clients**, select **View all**. You should see a table of connected clients, their access level, and when they connected.
3. Select a client's row to open its details and see every permission you granted it, or select **Revoke access** directly on the row to skip straight to revoking.
4. Confirm the revocation. n8n disconnects the client at once; it must reconnect and sign in again to regain access.

### Using API key <a href="#using-access-token" id="using-access-token"></a>

1. Navigate to **Settings > Instance-level MCP. 
2. In **Connection details**, select **Connect** to open the **Connect a client** dialog. 
3. Go to the **API key** tab to view your instance server URL and personal access token. 

Unlike the OAuth tab, this tab isn't client-specific: it shows the same server URL, token, and configuration snippet regardless of any specific client.

When you first open the **API key** tab, n8n automatically generates a personal access token tied to your user account.

{% hint style="info" %}
Copy your token right away. On future visits, you'll only see a redacted value and the copy button will be disabled.
{% endhint %}

#### Rotating your access token <a href="#rotating-your-token" id="rotating-your-token"></a>

If you lose your token or need to rotate it:

1. Navigate to **Settings > Instance-level MCP**.
2. In **Connection details**, select **Connect** to open the **Connect a client** dialog.
3. Switch to the **API key** tab.
4. Generate a new token using the button next to the redacted value.

    n8n revokes the previous token when you generate a new one.
5. Update all connected MCP clients with the new value.

### Restricting OAuth callback URLs <a href="#restricting-oauth-callback-urls" id="restricting-oauth-callback-urls"></a>

Instance owners and admins can restrict which URLs an OAuth client can redirect to after it signs in. By default, n8n allows any callback URL, which is less secure.

1. Navigate to **Settings > Instance-level MCP**.
2. In **Access**, select **Allowed callback URLs**.
3. Choose a mode:
   * **All callback URLs**: any URL can complete an OAuth sign-in.
   * **Only trusted URLs**: only the URLs you list can complete an OAuth sign-in.
4. If you chose **Only trusted URLs**, add each URL you trust, then select **Save**.

## Exposing workflows to MCP clients <a href="#exposing-workflows-to-mcp-clients" id="exposing-workflows-to-mcp-clients"></a>

MCP clients can discover previews of all workflows the current user has access to using `search_workflows`. However, clients can't access full workflow data, nor execute or modify a workflow unless you explicitly enable MCP access for that workflow.

{% hint style="info" %}
**Workflow eligibility** <a href="#workflow-eligibility" id="workflow-eligibility"></a>

Only workflows that are published, and that contain a webhook, form, schedule, or chat trigger node, can be enabled for MCP access.
{% endhint %}

### Enabling access for individual workflows <a href="#enabling-access-for-individual-workflows" id="enabling-access-for-individual-workflows"></a>

#### Option 1: From MCP settings page (available from n8n v2.2.0) <a href="#option-1-from-mcp-settings-page-available-from-n8n-v220" id="option-1-from-mcp-settings-page-available-from-n8n-v220"></a>

1. Click the **Enable workflows** button (in the workflows table header or in the table's empty state)
2. Search for the desired workflow (by name or description) and select it from the list
3. Click **Enable** button to confirm

#### Option 2: From the workflow editor <a href="#option-2-from-the-workflow-editor" id="option-2-from-the-workflow-editor"></a>

1. Open the workflow.
2. Click the main workflow menu (`...`) in the top-right corner.
3. Select **Settings**.
4. Toggle **Available in MCP**.

#### Option 3: From the workflows list <a href="#option-3-from-the-workflows-list" id="option-3-from-the-workflows-list"></a>

1. Go to **Workflows**.
2. Open the menu on a workflow card.
3. Select **Enable MCP access**.

### Enabling access for projects/folders <a href="#enabling-access-for-projectsfolders" id="enabling-access-for-projectsfolders"></a>

{% hint style="info" %}
**Available from n8n v2.24.0**
{% endhint %}

You can use the **Options** menu <img src=".gitbook/assets/three-dot-options-menu (1).png" alt="Options menu" data-size="line"> in the workflow list to toggle MCP access for all workflows in the current project or folder:

1. Navigate to the desired project and select **Workflows** from the top menu, then open a subfolder if required.
2. Select the **Options** menu <img src=".gitbook/assets/three-dot-options-menu (1).png" alt="Options icon" data-size="line"> next to the name of the project or folder.
3. Select **Manage MCP access**, then either **Enable MCP** or **Disable MCP**.

![mcp\_bulk\_toggle.png](<.gitbook/assets/mcp_bulk_toggle (1).png>)

{% hint style="info" %}
**Note**

This will toggle MCP access for all workflows that are **currently** in the selected project or folder (skipping ones that are already in the selected state). You will still need to toggle access for any workflows added in the future.
{% endhint %}

### Managing access <a href="#managing-access" id="managing-access"></a>

The **Instance-level MCP** settings page shows all workflows enabled for MCP clients to access and operate on. From this list you can:

* Open a workflow, its home project or parent folder directly
* Revoke access using the action menu (or use **Disable MCP access** from the workflow card menu)
* Update workflow description using the action menu (or use the menu in the workflow editor)
* Enable access for more workflows using the **Enable workflows** button (available from n8n v2.2.0)

### Workflow descriptions <a href="#workflow-descriptions" id="workflow-descriptions"></a>

To help MCP clients identify workflows, you can add free-text descriptions as follows:

1. Option 1: From the **Instance-level MCP** page
   1. Navigate to **Settings > Instance-level MCP**.
   2. Make sure you are on the **Workflows** tab.
   3. Use the action menu in the desired workflow's row and select the **Edit description** action.
   4. Alternatively, click the description text directly to open the edit dialog.
2.  Option 2: From the workflow editor

    1. Open the workflow.
    2. Click the main workflow menu (`...`) in the top-right corner.
    3. Select **Edit description**.

    ![mcp\_workflow\_description.png](<.gitbook/assets/mcp_workflow_description (1).png>)

## Exposing agents to MCP clients <a href="#exposing-agents-to-mcp-clients" id="exposing-agents-to-mcp-clients"></a>

{% hint style="info" %}
Agents are a separate feature from workflows, see [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents). This section only applies if agents are available on your instance.
{% endhint %}

If your instance has the agents feature, the **Access** section also shows **Agents exposed**. As with workflows, MCP clients can't read or manage an agent unless you explicitly enable MCP access for it.

### Enabling access for individual agents <a href="#enabling-access-for-individual-agents" id="enabling-access-for-individual-agents"></a>

#### Option 1: From the MCP settings page <a href="#option-1-from-the-mcp-settings-page-agents" id="option-1-from-the-mcp-settings-page-agents"></a>

1. Navigate to **Settings > Instance-level MCP**.
2. Select **Agents exposed**.
3. Select **Enable agents**.
4. Search for the desired agent by name and select it from the list.
5. Select **Enable** to confirm.

#### Option 2: From the agent builder <a href="#option-2-from-the-agent-builder" id="option-2-from-the-agent-builder"></a>

1. Open the agent in the agent builder.
2. Open its MCP settings.
3. Toggle **Available in MCP**.

### Managing agent access <a href="#managing-agent-access" id="managing-agent-access"></a>

The **Agents exposed** page shows every agent enabled for MCP clients to access, with its name and its project or folder location. From this list you can:

* Open an agent or its project directly.
* Remove access for a single agent from its row, or select multiple agents and remove access for all of them at once.
* Enable access for more agents using the **Enable agents** button.

## Tools and resources <a href="#tools-and-resources" id="tools-and-resources"></a>

{% hint style="info" %}
Consider using coding agents (such as Claude Code or Google ADK agents) instead of chat clients as your MCP clients. Coding agents are optimized for generating and validating TypeScript code, making them ideal for building workflows programmatically.
{% endhint %}

The n8n MCP server exposes tools for workflow management, workflow building, and data tables. For a complete list of available tools and their parameters, refer to the [MCP server tools reference](connect-to-n8n-mcp-server/mcp-server-tools-reference.md).

## n8n Skills for coding agents

When you connect a coding agent to the n8n MCP server, the agent can build and edit workflows, but it doesn't automatically know n8n's conventions for expressions, node configuration, error handling, and other patterns. n8n Skills give the agent that knowledge so it gets workflows right the first time.

n8n Skills are a set of capability modules published in the [n8n-io/skills](https://github.com/n8n-io/skills) repository. They pair with the instance-level MCP server and include:

* **13 capability skills** covering workflow best practices, including subworkflows, expressions, loops, AI agents, error handling, credentials, Data Tables, and debugging.
* **50+ reference documents and examples** with per-node guidance, decision trees, and copy-paste workflow snippets.
* **Hooks** that load the right guidance automatically, so the agent reads the relevant skill before it makes high-impact MCP calls.

A 14th meta-skill, `using-n8n-skills-official`, routes the agent to the matching capability skill for each task.

### Why use skills <a href="#why-use-skills" id="why-use-skills"></a>

Skills load guidance at the moment the agent needs it, rather than relying on the model's general knowledge. This helps the agent:

* Follow n8n best practices for the node or feature it's working with.
* Avoid common mistakes, such as incorrect expression syntax or missing error handling.
* Produce workflows that need less back-and-forth to fix.

The skills are plain Markdown, so you can read, fork, and modify them for your own conventions.

### Installing skills <a href="#installing-skills" id="installing-skills"></a>

The [n8n-io/skills](https://github.com/n8n-io/skills) repository has up-to-date install instructions for Claude Code, Codex, and other coding agents. Follow the steps in the repository README to add the skills to your agent.

## Examples <a href="#examples" id="examples"></a>

{% hint style="info" %}
The **Connect a client** dialog generates ready-to-use setup steps for Claude Code, Codex, Gemini CLI, Claude.ai, ChatGPT, Cursor, VS Code, and Windsurf. The manual examples below remain useful for clients not covered by the dialog, such as Lovable and Google ADK agents, or if you prefer to configure a client by hand.
{% endhint %}

#### Connecting Lovable to n8n MCP server <a href="#connecting-lovable-to-n8n-mcp-server" id="connecting-lovable-to-n8n-mcp-server"></a>

1. Configure MCP Server in Lovable (OAuth).
   * Navigate to your workspace  **Settings > Integrations**.
   * In the **MCP Servers** section, find **n8n** and click **Connect**.
   * Enter your n8n server URL (shown on the **MCP Access** page).
   * Save the connection. If successful, n8n redirects you to authorize Lovable.
2. Verify connectivity.
   * Once connected, Lovable can query for workflows with MCP access enabled.
   * **Example:** Asking Lovable to build a workflow UI that lists users and allows deleting them.

#### Connecting Claude Desktop to n8n MCP server <a href="#connecting-claude-desktop-to-n8n-mcp-server" id="connecting-claude-desktop-to-n8n-mcp-server"></a>

**Using OAuth (recommended)**

1. Navigate to **Settings** > **Connectors** in Claude Desktop.
2. Click on **Add custom connector**.
3. Enter the following details:
   * **Name:** n8n
   * **Remote MCP Server URL**: Your n8n base URL (shown on the **Instance-level MCP** page)
4. Save the connector.
5. When prompted, authorize Claude Desktop to access your n8n instance.

**Using API key**

Add the following entry to your `claude_desktop_config.json` file:

```json
"mcpServers": {
  "n8n-mcp": {
    "command": "npx",
    "args": [
    "-y",
    "supergateway",
    "--streamableHttp",
    "https://<your-n8n-domain>/mcp-server/http",
    "--header",
    "Authorization:Bearer <YOUR_N8N_MCP_TOKEN>"
    ]
  }
}
```


Here, replace:

* `<your-n8n-domain>`: Your n8n base URL (shown on the **Instance-level MCP** page)

#### Connecting Claude Code to n8n MCP server <a href="#connecting-claude-code-to-n8n-mcp-server" id="connecting-claude-code-to-n8n-mcp-server"></a>

**OPTION 1: Authenticate using OAuth (recommended)**

Use the following CLI command:

```bash
claude mcp add --transport http n8n https://<your-n8n-domain>/mcp-server/http
```

Alternatively, add the following entry to your `claude.json` file:

```json
{
    "mcpServers": {
        "n8n": {
            "type": "http",
            "url": "https://<your-n8n-domain>/mcp-server/http"
        }
    }
}
```

Here, replace:

* `<your-n8n-domain>`: Your n8n base URL (shown on the **Instance-level MCP** page)

Run `/mcp` in Claude Code and select **n8n** to complete the OAuth authorization.

**OPTION 2: Authenticate using API key**

Use the following CLI command:

```bash
claude mcp add --transport http n8n-mcp https://<your-n8n-domain>/mcp-server/http \
  --header "Authorization: Bearer <YOUR_N8N_MCP_TOKEN>"
```

Alternatively, add the following entry to your `claude.json` file:

```json
{
    "mcpServers": {
        "n8n-mcp": {
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

* `<your-n8n-domain>`: Your n8n base URL (shown on the **Instance-level MCP** page)
* `<YOUR_N8N_MCP_TOKEN>`: Your generated token

### Connecting Codex CLI to n8n MCP server <a href="#connecting-codex-cli-to-n8n-mcp-server" id="connecting-codex-cli-to-n8n-mcp-server"></a>

**OPTION 1: Authenticate using OAuth (recommended)**

Use the following CLI command:

```bash
codex mcp add n8n --url "https://<your-n8n-domain>/mcp-server/http"
```

Alternatively, add the following entry to your `~/.codex/config.toml` file:

```toml
[features]
experimental_use_rmcp_client = true

[mcp_servers.n8n]
url = "https://<your-n8n-domain>/mcp-server/http"
```

{% hint style="info" %}
The `[features]` block enables Codex's HTTP MCP client. Older Codex builds require it; newer builds ignore it.
{% endhint %}

Here, replace:

* `<your-n8n-domain>`: Your n8n base URL (shown on the **Instance-level MCP** page)

Run `codex mcp login n8n` to complete the OAuth authorization.

**OPTION 2: Authenticate using API key**

Add the following entry to your `~/.codex/config.toml` file:

```toml
[features]
experimental_use_rmcp_client = true

[mcp_servers.n8n-mcp]
url = "https://<your-n8n-domain>/mcp-server/http"
http_headers = { "authorization" = "Bearer <YOUR_N8N_MCP_TOKEN>" }
```

Here, replace:

* `<your-n8n-domain>`: Your n8n base URL (shown on the **Instance-level MCP** page)
* `<YOUR_N8N_MCP_TOKEN>`: Your generated API key

### Connecting Google ADK agent to n8n MCP server <a href="#connecting-google-adk-agent-to-n8n-mcp-server" id="connecting-google-adk-agent-to-n8n-mcp-server"></a>

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

## Troubleshooting <a href="#troubleshooting" id="troubleshooting"></a>

If you encounter issues connecting MCP clients to your n8n instance, consider the following:

* Ensure that your n8n instance is publicly accessible if you are using cloud-based MCP clients.
* Verify that the MCP access is enabled in n8n settings.
* Check that the workflows you want to execute or modify are marked as **Available in MCP**.
* Confirm that the authentication method (OAuth or API key) is configured correctly in your MCP client.
* Review n8n server logs for any error messages related to MCP connections.
