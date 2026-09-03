---
title: MCP client connection examples
description: >-
  Copy-paste connection commands and configuration for Lovable, Claude
  Desktop, Claude Code, Codex, Gemini CLI, Cursor, VS Code, Windsurf, and
  Google ADK agents.
layout:
  description:
    visible: false
---

# MCP client connection examples <a href="#mcp-client-connection-examples" id="mcp-client-connection-examples"></a>

These examples show the exact commands and configuration for connecting specific clients to n8n's MCP server. Before using them, [enable MCP access](../connect-to-n8n-mcp-server.md#enabling-mcp-access) on your instance and choose an authentication method, see [Connecting MCP clients](../connect-to-n8n-mcp-server.md#setting-up-mcp-authentication).

{% hint style="info" %}
The **Connect a client** dialog (available from n8n 2.33.0) provides one-click setup to connect Claude.ai, Cursor, and VS Code. It also provides interactive setup steps for Claude Code, Codex, Gemini CLI, ChatGPT, and Windsurf. See [Using OAuth (recommended)](../connect-to-n8n-mcp-server.md#using-oauth2) for how to open the dialog and pick your client.

The examples below are useful if interactive steps aren't shown in n8n for your chosen client, for reference purposes, or for manual configuration.
{% endhint %}

## Connecting Lovable to n8n MCP server <a href="#connecting-lovable-to-n8n-mcp-server" id="connecting-lovable-to-n8n-mcp-server"></a>

1. Configure MCP Server in Lovable (OAuth).
   * Navigate to your workspace **Settings > Integrations**.
   * In the **MCP Servers** section, find **n8n** and click **Connect**.
   * Enter your n8n server URL: the **Server URL** value shown in the **Connect a client** dialog.
   * Save the connection. If successful, n8n redirects you to approve access for Lovable.
2. Verify connectivity.
   * Once connected, Lovable can query for workflows with MCP access enabled.
   * **Example:** Asking Lovable to build a workflow UI that lists users and allows deleting them.

## Connecting Claude Desktop to n8n MCP server <a href="#connecting-claude-desktop-to-n8n-mcp-server" id="connecting-claude-desktop-to-n8n-mcp-server"></a>

**Using OAuth (recommended)**

1. Navigate to **Settings** > **Connectors** in Claude Desktop.
2. Click on **Add custom connector**.
3. Enter the following details:
   * **Name:** n8n MCP
   * **Remote MCP Server URL**: the **Server URL** value shown in the **Connect a client** dialog
4. Save the connector.
5. When prompted, approve access for Claude Desktop.

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

* `<your-n8n-domain>`: Your n8n domain, for example `https://your-instance.app.n8n.cloud`, found in n8n under **Settings** > **Instance-level MCP > Connect a client > Server URL**.

## Connecting Claude Code to n8n MCP server <a href="#connecting-claude-code-to-n8n-mcp-server" id="connecting-claude-code-to-n8n-mcp-server"></a>

**Option 1: Authenticate using OAuth (recommended)**

Use the following CLI command:

```bash
claude mcp add --transport http n8n https://<your-n8n-domain>/mcp-server/http
```

Or add the following entry to your `claude.json` file:

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

* `<your-n8n-domain>`: Your n8n domain, for example `https://your-instance.app.n8n.cloud`, found in n8n under **Settings** > **Instance-level MCP > Connect a client > Server URL**.

Run `/mcp` in Claude Code and select **n8n** to complete the OAuth authorization.

**Option 2: Authenticate using API key**

Use the following CLI command:

```bash
claude mcp add --transport http n8n-mcp https://<your-n8n-domain>/mcp-server/http \
  --header "Authorization: Bearer <YOUR_N8N_MCP_TOKEN>"
```

Or add the following entry to your `claude.json` file:

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

* `<your-n8n-domain>`: Your n8n domain, for example `https://your-instance.app.n8n.cloud`, found in n8n under **Settings** > **Instance-level MCP > Connect a client > Server URL**.
* `<YOUR_N8N_MCP_TOKEN>`: Your generated token

## Connecting Codex CLI to n8n MCP server <a href="#connecting-codex-cli-to-n8n-mcp-server" id="connecting-codex-cli-to-n8n-mcp-server"></a>

**Option 1: Authenticate using OAuth (recommended)**

Use the following CLI command:

```bash
codex mcp add n8n --url "https://<your-n8n-domain>/mcp-server/http"
```

Or add the following entry to your `~/.codex/config.toml` file:

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

* `<your-n8n-domain>`: Your n8n domain, for example `https://your-instance.app.n8n.cloud`, found in n8n under **Settings** > **Instance-level MCP > Connect a client > Server URL**.

Run `codex mcp login n8n` to complete the OAuth authorization.

**Option 2: Authenticate using API key**

Add the following entry to your `~/.codex/config.toml` file:

```toml
[features]
experimental_use_rmcp_client = true

[mcp_servers.n8n-mcp]
url = "https://<your-n8n-domain>/mcp-server/http"
http_headers = { "authorization" = "Bearer <YOUR_N8N_MCP_TOKEN>" }
```

Here, replace:

* `<your-n8n-domain>`: Your n8n domain, for example `https://your-instance.app.n8n.cloud`, found in n8n under **Settings** > **Instance-level MCP > Connect a client > Server URL**.
* `<YOUR_N8N_MCP_TOKEN>`: Your generated token

## Connecting Gemini CLI to n8n MCP server <a href="#connecting-gemini-cli-to-n8n-mcp-server" id="connecting-gemini-cli-to-n8n-mcp-server"></a>

Use the following CLI command:

```bash
gemini mcp add --transport http n8n https://<your-n8n-domain>/mcp-server/http
```

Or add the following entry to your `~/.gemini/settings.json` file:

```json
{
    "mcpServers": {
        "n8n": {
            "httpUrl": "https://<your-n8n-domain>/mcp-server/http"
        }
    }
}
```

Here, replace:

* `<your-n8n-domain>`: Your n8n domain, for example `https://your-instance.app.n8n.cloud`, found in n8n under **Settings** > **Instance-level MCP > Connect a client > Server URL**.

Run `/mcp` in Gemini CLI and select **n8n** to complete the OAuth authorization.

## Connecting Cursor to n8n MCP server <a href="#connecting-cursor-to-n8n-mcp-server" id="connecting-cursor-to-n8n-mcp-server"></a>

In the **Connect a client** dialog, select **Cursor** from **Your client**, then select **One-click setup** to open Cursor and add the n8n server automatically. Approve access when Cursor redirects you back to n8n.

Or add the following entry to your `~/.cursor/mcp.json` file (or the project's `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "n8n": {
      "type": "streamable-http",
      "url": "https://<your-n8n-domain>/mcp-server/http"
    }
  }
}
```

Here, replace:

* `<your-n8n-domain>`: Your n8n domain, for example `https://your-instance.app.n8n.cloud`, found in n8n under **Settings** > **Instance-level MCP > Connect a client > Server URL**.

## Connecting VS Code to n8n MCP server <a href="#connecting-vs-code-to-n8n-mcp-server" id="connecting-vs-code-to-n8n-mcp-server"></a>

In the **Connect a client** dialog, select **VS Code** from **Your client**, then select **One-click setup** to open VS Code and add the n8n server automatically. Approve access when VS Code redirects you back to n8n.

Or add the following entry to your workspace's `.vscode/mcp.json` file:

```json
{
  "servers": {
    "n8n": {
      "type": "http",
      "url": "https://<your-n8n-domain>/mcp-server/http"
    }
  }
}
```

Here, replace:

* `<your-n8n-domain>`: Your n8n domain, for example `https://your-instance.app.n8n.cloud`, found in n8n under **Settings** > **Instance-level MCP > Connect a client > Server URL**.

## Connecting Windsurf to n8n MCP server <a href="#connecting-windsurf-to-n8n-mcp-server" id="connecting-windsurf-to-n8n-mcp-server"></a>

Add the following entry to your `~/.codeium/windsurf/mcp_config.json` file:

```json
{
  "mcpServers": {
    "n8n": {
      "serverUrl": "https://<your-n8n-domain>/mcp-server/http"
    }
  }
}
```

Here, replace:

* `<your-n8n-domain>`: Your n8n domain, for example `https://your-instance.app.n8n.cloud`, found in n8n under **Settings** > **Instance-level MCP > Connect a client > Server URL**.

Approve access when Windsurf redirects you to n8n on its first connection attempt.

## Connecting Google ADK agent to n8n MCP server <a href="#connecting-google-adk-agent-to-n8n-mcp-server" id="connecting-google-adk-agent-to-n8n-mcp-server"></a>

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

Here, replace:

* `N8N_INSTANCE_URL`: Your n8n domain, for example `https://your-instance.app.n8n.cloud`, found in n8n under **Settings** > **Instance-level MCP > Connect a client > Server URL**.
* `YOUR_N8N_MCP_TOKEN`: Your generated access token

For more details, see [Connect ADK agent to n8n](https://google.github.io/adk-docs/tools/third-party/n8n/).

## Troubleshooting

If a client doesn't connect using the steps above, see [Troubleshooting](../connect-to-n8n-mcp-server.md#troubleshooting) on the main MCP server page.
