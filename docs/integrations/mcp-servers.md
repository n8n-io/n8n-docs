---
description: >-
  Connect an AI agent to an MCP registry server directly from the node panel,
  with OAuth2 sign-in and no manual credential setup.
layout:
  description:
    visible: false
---

# MCP servers

n8n's node panel includes a registry of MCP servers you can connect to an agent in one click. Select a server, sign in, and its tools are available to your agent. You don't need to add an MCP Client Tool node or set up credentials by hand.

## Add a registry server to an agent

1. Open the node panel on an [AI Agent](builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/README.md) node, or in [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents#add-tools).
2. Search for the service you want to connect with the search bar (such as Notion or Linear) or click the new "MCP Servers" section to view all available servers.
3. Select the server, then sign in when prompted.
4. Choose which of the server's tools to expose to the agent with "Tools to include": all, a selected list, or all except a selected list.

n8n creates an [MCP credential](builtin/credentials/mcp.md) automatically when you sign in from the panel.

## Find available servers

The list of registry servers changes often. Browse the current list in the node panel instead of relying on a static list here.

If the server you want isn't in the registry yet, use the [MCP Client Tool](builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp.md) node to connect to any MCP server manually with its connection URL and credentials.

## Choose between a node, an agent tool, and an MCP server

| Option | When to use | Key characteristics |
| ------ | ----------- | ------------------- |
| Native node | You know the exact API call ahead of time | Deterministic step with the same result every time |
| Agent tool | The agent should decide whether to call one fixed action | Single node connected to an AI Agent for one well-defined action |
| MCP server | The agent needs access to a broader toolset from one connection | Agent picks whichever tool fits the request; requires more reasoning per call |

A single workflow can combine all three approaches.
