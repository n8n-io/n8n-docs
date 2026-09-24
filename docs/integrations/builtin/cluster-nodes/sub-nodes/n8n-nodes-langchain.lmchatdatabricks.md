---
description: >-
  Learn how to use the Databricks Chat Model node in n8n. Follow technical
  documentation to integrate Databricks Chat Model node into your workflows.
layout:
  description:
    visible: false
---

# Databricks Chat Model node

Use the Databricks Chat Model node to run AI agents and chains on models served by your Databricks workspace. The node queries [Unity AI Gateway model services](https://docs.databricks.com/aws/en/ai-gateway/model-services), so it works with Databricks-hosted foundation models and with external providers you route through the gateway.

On this page, you'll find the prerequisites, setup steps, node parameters, and known limitations for the Databricks Chat Model node.

{% hint style="info" %}
**Credentials**

Refer to [Databricks credentials](../../credentials/databricks.md) for guidance on setting up authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Prerequisites

- A Databricks workspace with Unity AI Gateway enabled.
- A [Databricks OAuth2 credential](../../credentials/databricks.md#supported-authentication-methods) in n8n, using either a service principal or user login. The node doesn't support personal access tokens.
- The identity the credential authenticates as needs **USE CATALOG** and **USE SCHEMA** on the catalog and schema that hold the model service, and **EXECUTE** on the model service. Databricks grants **EXECUTE** on the `system.ai` model services to all workspace users by default.

## Set up the node

1. Add an [AI Agent](../root-nodes/n8n-nodes-langchain.agent/README.md) node (or another root node that takes a chat model) to your workflow.
2. Select the **+** on the node's **Chat Model** connector, then select **Databricks Chat Model**.
3. Under **Credential to connect with**, select an existing Databricks OAuth2 credential or create a new one. Follow the steps for your authentication type below.
4. In **Model**, open the list and pick a model service. n8n loads the chat-capable model services the credential can access. To use a service that isn't listed, switch to **ID** and enter its full name, for example `system.ai.databricks-meta-llama-3-3-70b-instruct`.

### Set up with a service principal

Use a service principal for unattended workflows, such as scheduled or webhook-triggered agents.

1. Have a Databricks admin [create a service principal and OAuth secret](../../credentials/databricks.md#create-a-service-principal-and-oauth-secret), and grant it **EXECUTE** on the model services you want to use.
2. In the n8n credential, enter the workspace URL as the **Host**, keep **Grant Type** as **Client Credentials (Service Principal)**, and enter the **Client ID** and **Client Secret**.
3. Save the credential and select it in the node.

### Set up with user login

Use user login when the agent should run with your own Databricks permissions and appear under your identity in Databricks audit logs.

1. Have a Databricks account admin [create a custom OAuth app connection](../../credentials/databricks.md#create-a-custom-oauth-app-connection) and share its client ID and secret with you.
2. In the n8n credential, enter the workspace URL as the **Host**, set **Grant Type** to **Authorization Code (User)**, and enter the **Client ID** and **Client Secret**.
3. Select **Connect my account** and sign in to Databricks.
4. Select the credential in the node. n8n refreshes the access token during long executions, so agents can run past the one-hour token lifetime.

## Node parameters

- **Model**: The Unity AI Gateway model service that generates the completion, named `catalog.schema.service`.
	- **From List**: Choose from the model services the credential can access that support chat completions. Databricks-hosted foundation models in `system.ai` and external provider routes both appear.
	- **ID**: Enter the full name of a model service directly. Use this for a service that supports chat but isn't advertised as chat-capable.

## Node options

- **Frequency Penalty**: Penalize new tokens based on how often they already appear in the text, to reduce verbatim repetition. Range from `-2` to `2`, default `0`.
- **Maximum Number of Tokens**: The maximum number of tokens to generate in the completion. Default `-1` (no limit set by n8n).
- **Response Format**: **Text** (default) or **JSON**. JSON mode requires the word `json` in your prompt and a model service that supports JSON mode.
- **Presence Penalty**: Penalize new tokens based on whether they appear in the text so far, to encourage new topics. Range from `-2` to `2`, default `0`.
- **Sampling Temperature**: Control randomness. Lower values give more deterministic completions. Range from 0 to 2, default 0.7.
- **Timeout**: The maximum time a request may take, in milliseconds. Default 360000 (six minutes).
- **Max Retries**: How many times to retry a failed request. Default 2.
- **Top P**: Nucleus sampling. Adjust this or **Sampling Temperature**, not both. Range from 0 to 1, default 1.

## Choose a model for agents

Not every model service works as an agent's tool-calling model through this node. The model must support tool calling, and some endpoints that advertise it don't return tool calls the AI Agent can execute. In n8n's testing:

- **Llama 3.3 70B** and **Qwen 3.5** call tools reliably and are a good default for the [Databricks Genie MCP server](n8n-mcp-registry.databricksgenie.md) and other tools.
- **gpt-oss** and **Llama 4 Maverick** endpoints don't return tool calls the AI Agent can execute. Agents using them loop until they hit **Max Iterations** without calling any tool.

Your workspace may list other model services. To test one, ask the agent a question that requires a tool call and check the execution log. A model that doesn't work shows the same symptom: the agent uses all its iterations without a single tool call.

Pay-per-token model services are rate limited per workspace. Three concurrent agent runs are enough to hit the limit, and the node uses up its two default retries within seconds. For demos, pilots, and production agents, use a [provisioned throughput](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/deploy-prov-throughput-foundation-model-apis) endpoint or keep agent concurrency low.

## Related resources

- [Databricks credentials](../../credentials/databricks.md)
- [Databricks node](../../app-nodes/n8n-nodes-base.databricks.md) for SQL, Unity Catalog, and Genie REST operations
- [Databricks Genie MCP server](n8n-mcp-registry.databricksgenie.md) to give an agent access to Genie
- [Unity AI Gateway model services](https://docs.databricks.com/aws/en/ai-gateway/model-services) in the Databricks documentation

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Common issues

### No model services found

The model list is empty and the node reports `No model services found`. Unity AI Gateway isn't enabled on the workspace, or the credential's identity can't access any model service. Check the workspace settings, then grant **USE CATALOG**, **USE SCHEMA**, and **EXECUTE** on at least one model service.

### No chat-capable model services found

The credential can see model services, but none advertises chat completions. Switch **Model** to **ID** and enter the service name directly. This node doesn't support embeddings-only services.

### Rate limit reached

The execution fails with `Rate limit reached` or a 429 status. Databricks rejected the request with `REQUEST_LIMIT_EXCEEDED` because the request exceeded the pay-per-token endpoint's workspace rate limit. Reduce concurrent agent runs, or use a provisioned throughput endpoint. The error text names OpenAI because the node uses an OpenAI-compatible client to call the gateway.

### Host must use HTTPS

The node fails with `Databricks host must use https` because the credential's **Host** starts with `http://`. Every request carries a token, so the node refuses plain HTTP. Change the host to `https://`.

### Requests fail with 403 after the credential worked before

For user-login credentials, the refresh token or the OAuth app's absolute session lifetime has expired. Open the credential in n8n and select **Connect my account** again. To avoid this for scheduled workflows, use a service principal or ask your admin to [extend the token lifetimes](../../credentials/databricks.md#configure-token-lifetimes).
