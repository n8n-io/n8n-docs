---
description: >-
  Connect an n8n AI agent to Databricks Genie through the Databricks Genie MCP
  server in n8n's MCP servers registry, and tune the agent for Genie's polling.
layout:
  description:
    visible: false
---

# Databricks Genie MCP server

The **Databricks Genie** tile in n8n's [MCP servers](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/mcp-servers) registry connects an AI agent to the [Genie MCP server](https://docs.databricks.com/aws/en/agents/mcp-tools/genie-mcp) in your Databricks workspace. Genie answers natural-language questions about your data by generating and running SQL against the tables in your Genie space. The tile is labeled **Powered by Genie**, and every answer links back to the conversation in Databricks.

On this page, you'll find the prerequisites, setup steps, agent settings, and known issues for using Genie with an n8n agent.

{% hint style="info" %}
**Credentials**

The tile uses a [Databricks OAuth2 credential](../../credentials/databricks.md#using-oauth2-with-user-login) with user login. It doesn't offer service principals or personal access tokens.
{% endhint %}

## Prerequisites

- A Databricks account admin has [created a custom OAuth app connection](../../credentials/databricks.md#create-a-custom-oauth-app-connection) with the **All APIs** scope. The tile requests the `genie` and `offline_access` scopes, and in n8n's testing **All APIs** covers them. If connecting fails with a `genie` scope error, the admin [adds the `genie` scope](../../credentials/databricks.md#add-the-genie-scope-for-the-genie-mcp-server) to the app connection.
- You have **CAN RUN** on the Genie space and **CAN USE** on its SQL warehouse. Refer to [Required Databricks privileges](../../credentials/databricks.md#required-databricks-privileges).
- A chat model that calls tools reliably. n8n recommends the [Databricks Chat Model](n8n-nodes-langchain.lmchatdatabricks.md) node with Llama 3.3 70B or Qwen 3.5. Refer to [Choose a model for agents](n8n-nodes-langchain.lmchatdatabricks.md#choose-a-model-for-agents).

## Connect Genie to an agent

The Genie MCP server uses one authentication type, user login. The agent asks Genie questions as the Databricks user who connected the credential, so each n8n user creates their own credential.

1. Open an [AI Agent](../root-nodes/n8n-nodes-langchain.agent/README.md) node on the canvas and select the **+** on its **Tool** connector.
2. Search for `Databricks Genie`, or open the **MCP Servers** section to browse the registry.
3. Select the **Databricks Genie** tile. n8n adds a Databricks Genie node to the agent and opens its settings.
4. Under **Credential to connect with**, select **Create new credential**.
5. Enter your workspace URL as the **Host**, for example `https://adb-1234567890123456.7.azuredatabricks.net`.
6. Enter the **Client ID** and **Client Secret** from the custom OAuth app connection your admin created.
7. Select **Connect my account** and sign in to Databricks.
8. In **Tools to Include**, keep **All** so the agent can ask, poll, fetch results, and cancel. Refer to [Tools](#tools).
9. Set the agent's **Max Iterations** option to 30 or more. Refer to [Configure the agent for Genie](#configure-the-agent-for-genie).

Send the agent a question about your data, for example "How many trips are in the trips table?". The reply includes Genie's answer and an **Explore in Databricks** link.

## Tools

Genie exposes four tools. Databricks picks the Genie space, so there's no space parameter.

| Tool | What it does |
|------|--------------|
| `genie_ask` | Starts a Genie conversation with a question, or continues one with a `conversation_id`. Returns a status without waiting for the answer. |
| `genie_poll_response` | Checks whether Genie has finished. Databricks recommends waiting 2 to 5 seconds between polls. |
| `genie_get_query_result` | Fetches the full result rows of the SQL Genie ran, when the answer summary isn't enough. |
| `genie_cancel_response` | Cancels a running Genie turn. |

## Configure the agent for Genie

Genie answers asynchronously. The agent calls `genie_ask`, then calls `genie_poll_response` until Genie reports it has finished. Each poll costs one agent iteration: the `genie_poll_response` call plus the model turn that decides to poll again. Databricks states that Genie turns typically complete in 70 to 260 seconds and recommends 2 to 5 seconds between polls, so one answer can take from 14 to 130 iterations.

- **Raise Max Iterations.** The AI Agent's default of 10 fails on realistic questions. Set **Max Iterations** to 30 or more. Questions at the slow end of Databricks' range can still hit the limit, so raise it further if you see cutoffs.
- **Know how the cutoff looks.** AI Agent node version 3 fails the execution with `Max iterations (30) reached`. Older AI Agent versions succeed with the reply `Agent stopped due to max iterations.`, which looks like an answer but isn't one. Genie keeps running the turn on the Databricks side after a cutoff.
- **Guide the model.** A system message like the following keeps the loop tight and preserves the attribution link:

	```text
	To answer data questions, call genie_ask, then call genie_poll_response until the status is completed.
	Call genie_get_query_result only if you need the full result rows.
	Include any [Explore in Databricks](url) link from the tool result in your reply, verbatim.
	```

- **Watch chat model rate limits.** Genie itself didn't throttle in n8n's tests, but pay-per-token model endpoints do. Three concurrent agent runs are enough to fail the execution with a rate limit error from the chat model. Use a provisioned throughput endpoint or keep concurrency low.

## Genie attribution

Databricks requires Genie-powered integrations to identify Genie. In n8n:

- The tile in the node panel and the node's description carry the **Powered by Genie** label.
- Every completed Genie answer includes an **Explore in Databricks** link that opens the conversation in Genie in your workspace, so users can inspect the SQL and results. Genie instructs the model to render this link verbatim, and n8n passes the tool result through unchanged. Don't strip the link in your system message or output parsing.

## Related resources

- [Databricks credentials](../../credentials/databricks.md), including the `genie` scope setup for admins
- [Databricks Chat Model node](n8n-nodes-langchain.lmchatdatabricks.md)
- [Databricks node](../../app-nodes/n8n-nodes-base.databricks.md) for calling the Genie REST API directly without an agent
- [MCP servers](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/mcp-servers) for how the registry works
- [Genie MCP server](https://docs.databricks.com/aws/en/agents/mcp-tools/genie-mcp) in the Databricks documentation

## Common issues

### Connect fails with a genie scope error

Selecting **Connect my account** fails with:

```text
access_denied: Scopes 'genie' are not assigned to the client <client-id>
```

The custom OAuth app connection doesn't have the `genie` scope, and on this Databricks account **All APIs** doesn't stand in for it. A Databricks account admin needs to [add the `genie` scope](../../credentials/databricks.md#add-the-genie-scope-for-the-genie-mcp-server) to the app connection, in the account console's scope picker or with the Databricks CLI.

### Max iterations reached

The execution fails with `Max iterations (10) reached` or the agent replies `Agent stopped due to max iterations.`. Genie hadn't finished when the agent ran out of iterations. Raise **Max Iterations** to 30 or more on the AI Agent node. Refer to [Configure the agent for Genie](#configure-the-agent-for-genie).

### The agent never calls Genie

The agent uses all its iterations without a single tool call. The chat model isn't returning tool calls the agent can execute. Switch to a model that calls tools reliably, such as Llama 3.3 70B or Qwen 3.5 through the [Databricks Chat Model](n8n-nodes-langchain.lmchatdatabricks.md#choose-a-model-for-agents) node.

### Genie reports a SQL or permission error

Genie returns its own error text, for example `[TABLE_OR_VIEW_NOT_FOUND] The table or view samples.nyctaxi.does_not_exist cannot be found`, and the agent relays it. Fix the underlying data or grant issue in Databricks. The connected user needs **CAN RUN** on the Genie space and the Unity Catalog privileges on the tables the space uses.
