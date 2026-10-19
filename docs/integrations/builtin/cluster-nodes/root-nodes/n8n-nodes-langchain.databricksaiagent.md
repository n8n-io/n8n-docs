---
description: >-
  Learn how to use the Databricks AI Agent node in n8n. Run an AI agent and
  export each run to MLflow Tracing in your Databricks workspace.
status: preview
tags:
  - tag: preview
    primary: true
layout:
  description:
    visible: false
---

# Databricks AI Agent node

Use the Databricks AI Agent node to build an AI agent[^1] whose runs show up in [MLflow Tracing](https://docs.databricks.com/aws/en/mlflow3/genai/tracing/) in your Databricks workspace. The node runs the same agent as the [AI Agent](n8n-nodes-langchain.agent/README.md) node: it takes the same chat model, memory, tool[^2], and output parser sub-nodes and offers the same options. What it adds is **Export Traces to MLflow**. With the option on, each run creates one trace in an MLflow experiment, with a span for every model call and tool call, so the team that runs your Databricks workspace can inspect n8n agents next to the rest of their AI systems.

On this page, you'll find the prerequisites, setup steps, node parameters, what a trace contains, and how the export behaves when something fails.

{% hint style="info" %}
**Credentials**

Refer to [Databricks credentials](../../credentials/databricks.md) for guidance on setting up authentication. The credential on this node is optional. The agent runs on the credential of the connected chat model sub-node. This node uses its own **Databricks OAuth2 API** credential only to export traces, so select one when you turn on **Export Traces to MLflow**.
{% endhint %}

{% hint style="info" %}
**Preview status**

The Databricks AI Agent node is in Preview from n8n 2.45.0 and may change in future releases. Avoid relying on it in production workflows.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## Prerequisites

To run the agent, you need a chat model sub-node with its own credential, such as the [Databricks Chat Model](../sub-nodes/n8n-nodes-langchain.lmchatdatabricks.md) node. To export traces, you also need:

- A [Databricks OAuth2 credential](../../credentials/databricks.md#supported-authentication-methods) in n8n, with a service principal or user login. A service principal must be a member of the workspace with the **Workspace access** entitlement.
- **CAN EDIT** on the experiment that receives the traces. **CAN READ** isn't enough: the export fails with a `403` that says the identity doesn't have permission to edit the experiment.
- For the default experiment the node creates under `/Shared`, no extra grant. Databricks gives all workspace users **CAN MANAGE** on objects in the `/Shared` folder by default, so the identity can create the experiment and write to it. The same default means every workspace user can open and delete those traces. For workflows that handle personal or confidential data, set **Experiment** to a path in a folder you control, or create the experiment first and set its permissions before you turn on the export.

Permission changes take a minute or more to reach the trace service. A run right after a change can still use the old permissions.

## Set up the node

1. Add a **Databricks AI Agent** node to your workflow, for example after a [Chat Trigger](../../core-nodes/n8n-nodes-langchain.chattrigger/README.md) node.
2. Select the **+** on the **Chat Model** connector and add a chat model, such as the [Databricks Chat Model](../sub-nodes/n8n-nodes-langchain.lmchatdatabricks.md) node. Add memory, tools, and an output parser the same way you would for the [AI Agent](n8n-nodes-langchain.agent/README.md) node. The [Databricks Vector Store](n8n-nodes-langchain.vectorstoredatabricks/README.md) node and the [Databricks Genie MCP server](../sub-nodes/n8n-mcp-registry.databricksgenie.md) both work as tools.
3. Set **Source for Prompt (User Message)** and the [node options](#node-options).
4. To export traces, select a Databricks OAuth2 credential under **Credential to connect with** and turn on **Export Traces to MLflow**.
5. In **Experiment**, leave the name empty to let the node create an experiment for the workflow, or enter the path or ID of an existing experiment. Refer to [Node parameters](#node-parameters).
6. Run the workflow. In Databricks, open **Experiments** in the sidebar, select the experiment, then the **Traces** tab. Each run of the agent appears as one trace with a preview of the question and the answer.

## Node parameters

- **Source for Prompt (User Message)**: Where the user message comes from: **Connected Chat Trigger Node** or **Define below**. Works like the same field on the [AI Agent](n8n-nodes-langchain.agent/README.md) node. The node doesn't offer the **Connected Guardrails Node** source.
- **Require Specific Output Format**: Turn on to connect an output parser sub-node that shapes the agent's output.
- **Enable Fallback Model**: Turn on to connect a second chat model that the agent uses when the main model fails.
- **Export Traces to MLflow**: Whether to send each run to MLflow Tracing in the workspace of the credential selected on this node. Turned off by default.
- **Experiment**: Where the traces are stored. Shown when **Export Traces to MLflow** is on.
	- **By Name**: The experiment path, for example `/Shared/my-agent-traces`. The node creates the experiment if it doesn't exist. Leave the field empty to use `/Shared/n8n-workflows-<workflow-id>`, one experiment for each workflow.
	- **By ID**: The numeric ID of an existing experiment, as shown in its URL in Databricks. An ID that doesn't exist doesn't fail the run: the agent answers, and the export fails afterwards with a warning in the n8n log.

## Node options

The options are the ones of the AI Agent node. Refer to [Tools Agent](n8n-nodes-langchain.agent/tools-agent.md) for **System Message**, **Max Iterations** (default `10`), **Return Intermediate Steps**, **Automatically Passthrough Binary Images**, **Tracing Metadata**, and **Enable Streaming**. Two more options:

- **Automatically Passthrough Binary PDFs**: Whether to pass binary PDF documents from the input to the model as part of the message. Turned off by default. Use it with a model that accepts PDF input.
- **Batch Processing**: **Batch Size** sets how many input items the agent processes at once (default `1`), and **Delay Between Batches** waits the given number of milliseconds between batches (default `0`). Use it to stay under the rate limit of a pay-per-token model service.

## What the node exports

Each item the node processes becomes one trace. A trace holds a tree of spans:

- The agent run at the top, with the user message as input and the final answer as output.
- One span for each model call, with the full message list sent to the model and its completion in OpenAI format. The message list includes the system message, the conversation history loaded from memory, and any images or PDFs passed to the model as base64. The span also records tool calls and the token usage of the call.
- One span for each tool call, with the arguments and the result. A vector store tool's span shows the documents it returned.
- One span for each retriever call, when a tool such as the Vector Store Question Answer Tool queries a vector store through a retriever.

Every span carries its start and end time. The trace itself carries:

- `client_request_id`: the n8n execution ID, so a trace in the workspace maps back to one execution in n8n.
- The tags `n8n.source` (`n8n`), `n8n.workflowId`, and `n8n.node` (the node's name).
- A request preview and a response preview, the first 1,000 characters of the question and the answer, shown as the two columns of the trace list.
- The total token usage of the run, so the trace list shows cost per run without opening a span.
- A state: `OK`, or `ERROR` when the run failed. A failed model call makes the trace `ERROR` with the Databricks error message on the model span. A tool that throws is recorded as an `ERROR` tool span, while the trace stays `OK` when the agent recovers and answers.

Streaming runs export the same spans, with end times and token counts filled in. When you cancel a run, the export stops with it. The experiment then shows no trace for the run, or a trace without spans. Either way, n8n logs an export failure. A model span is named `ChatOpenAI` rather than after the model service, because the Databricks Chat Model node calls the gateway through an OpenAI-compatible client.

{% hint style="warning" %}
**Traces contain your data**

Trace export sends the real prompts, including the system message and memory, model outputs, tool results, and retrieved documents of every run to the Databricks workspace of the selected credential. Inside spans, n8n redacts well-known token formats and labelled secrets such as `password=...`, and nothing else. The question and answer previews shown in the trace list aren't redacted. The export is off by default, and the data goes only to your own workspace, never to n8n or a third party. Agree the setting with your security team before you turn it on for workflows that handle personal or confidential data.
{% endhint %}

## How export failures behave

Trace export is observability, so it never changes the result of a run:

- When the node can't prepare the export, because the credential doesn't work, the experiment lookup fails, or the identity lacks permission, the agent still runs and answers. n8n writes `Databricks AI Agent: could not prepare MLflow trace export` with the reason to its log.
- When the trace write fails after the run, the run's output stands and n8n logs `Databricks AI Agent: MLflow trace export failed` with the Databricks error. The warning appears in the n8n server log only, not in the execution.
- A partial export is possible: Databricks can register the trace but reject the upload of its spans. The trace then appears in the list without spans.
- The one hard failure is a missing credential. With **Export Traces to MLflow** on and no credential selected, the node fails before any model call with `Select a Databricks credential to export traces to MLflow`.

The export makes three calls for each trace: it registers the trace in the experiment, requests a signed upload URL, and uploads the spans to that URL. The upload URL carries its own short-lived credential, so the workspace token is never sent to it.

## Related resources

- [AI Agent](n8n-nodes-langchain.agent/README.md) and [Tools Agent](n8n-nodes-langchain.agent/tools-agent.md) for the agent's options and common issues
- [Databricks Chat Model](../sub-nodes/n8n-nodes-langchain.lmchatdatabricks.md)
- [Databricks Vector Store](n8n-nodes-langchain.vectorstoredatabricks/README.md), including a [worked example](n8n-nodes-langchain.vectorstoredatabricks/README.md#example-answer-questions-from-a-databricks-index-with-an-ai-agent) of an agent that answers from a Databricks index
- [Embeddings Databricks](../sub-nodes/n8n-nodes-langchain.embeddingsdatabricks.md)
- [Databricks Genie MCP server](../sub-nodes/n8n-mcp-registry.databricksgenie.md)
- [Databricks credentials](../../credentials/databricks.md)
- Migrating from the community package: refer to [Migrate from the n8n-nodes-databricks community package](n8n-nodes-langchain.vectorstoredatabricks/migrate-from-the-community-package.md)
- [MLflow Tracing](https://docs.databricks.com/aws/en/mlflow3/genai/tracing/) and [MLflow experiment permissions](https://docs.databricks.com/aws/en/security/auth/access-control/#mlflow-experiment-acls) in the Databricks documentation

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Common issues

### Select a Databricks credential to export traces to MLflow

**Export Traces to MLflow** is on, but the node has no credential. Select a Databricks OAuth2 credential under **Credential to connect with**, or turn the option off.

### No traces appear in the experiment

The run succeeded but the experiment stays empty. Check the n8n server log for a line that starts with `Databricks AI Agent:`. It names the cause: a `403` means the identity lacks **CAN EDIT** on the experiment, a `404` with `RESOURCE_DOES_NOT_EXIST` means the **By ID** experiment doesn't exist, and a token error means the credential can't reach the workspace. After granting a permission, wait a minute before you run again.

### A trace has no spans

Databricks registered the trace but rejected the span upload, so the trace list shows the run without its tree. Check the n8n server log for the upload error and the identity's **CAN EDIT** permission on the experiment.

### Agent issues

For problems with the agent itself, such as a model that doesn't call tools or hits a rate limit, refer to [Choose a model for agents](../sub-nodes/n8n-nodes-langchain.lmchatdatabricks.md#choose-a-model-for-agents) on the Databricks Chat Model page and the AI Agent [common issues](n8n-nodes-langchain.agent/common-issues.md).

[^1]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
[^2]: In an AI context, a tool is an add-on resource that the AI can refer to for specific information or functionality when responding to a request. The AI model can use a tool to interact with external systems or complete specific, focused tasks.
