---
description: >-
  Learn how to use the Embeddings Databricks node in n8n. Generate embeddings
  with a Databricks model service and pair the node with the Databricks Vector
  Store node.
status: preview
tags:
  - tag: preview
    primary: true
layout:
  description:
    visible: false
---

# Embeddings Databricks node

Use the Embeddings Databricks node to generate embeddings[^1] for text with an embeddings model served by your Databricks workspace. The node queries [Unity AI Gateway model services](https://docs.databricks.com/aws/en/ai-gateway/model-services), the same gateway the [Databricks Chat Model](n8n-nodes-langchain.lmchatdatabricks.md) node uses. Its main job is to pair with the [Databricks Vector Store](../root-nodes/n8n-nodes-langchain.vectorstoredatabricks/README.md) node, which needs an embeddings connection in every operation mode.

On this page, you'll find the prerequisites, setup steps, pairing rules, node parameters, and known issues for the Embeddings Databricks node.

{% hint style="info" %}
**Credentials**

Refer to [Databricks credentials](../../credentials/databricks.md) for guidance on setting up authentication. The node accepts the **Databricks OAuth2 API** credential only, with a service principal or user login. It doesn't accept a personal access token.
{% endhint %}

{% hint style="info" %}
**Preview status**

The Embeddings Databricks node is in Preview and may change in future releases. Avoid relying on it in production workflows.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## Prerequisites

- A Databricks workspace with Unity AI Gateway enabled.
- A [Databricks OAuth2 credential](../../credentials/databricks.md#supported-authentication-methods) in n8n, using either a service principal or user login.
- The identity the credential authenticates as needs **USE CATALOG** and **USE SCHEMA** on the catalog and schema that hold the model service, and **EXECUTE** on the model service. Databricks grants **EXECUTE** on the `system.ai` model services to all workspace users by default. Refer to [Required Databricks privileges](../../credentials/databricks.md#required-databricks-privileges).

## Set up the node

1. Add a [Databricks Vector Store](../root-nodes/n8n-nodes-langchain.vectorstoredatabricks/README.md) node, or another node that takes an embeddings sub-node, to your workflow.
2. Select the **+** on the node's **Embedding** connector, then select **Embeddings Databricks**.
3. Under **Credential to connect with**, select an existing Databricks OAuth2 credential or create a new one.
4. In **Model**, open the list and pick a model service. n8n loads the model services the credential can access that support embeddings, and leaves out chat models. Type to filter the list. To use a service that isn't listed, switch to **ID** and enter its full name, for example `system.ai.gte-large-en`.

## Pair the node with a Databricks index

Which model you pick depends on the index the Databricks Vector Store node works with:

- **Managed index** (a Delta Sync index with a Databricks embedding model): Databricks embeds the queries itself with the index's own model. The Embeddings Databricks node must be connected, but it's never called, so any model service works.
- **Self-managed index** (a Direct Access index, or a Delta Sync index with its own vector column): the Embeddings Databricks node embeds every search query and every inserted document. Pick the model and dimension the index was built with. An index built with `databricks-gte-large-en`, which has 1024 dimensions, needs the `system.ai.gte-large-en` model service. A different model fails with `query vector dimension <n> does not match index vector dimension <m>` on a search, and with `Databricks rejected the upsert into <index>. Failed primary keys: ...` on an insert.

Refer to [Index types and embeddings](../root-nodes/n8n-nodes-langchain.vectorstoredatabricks/README.md#index-types-and-embeddings) on the Databricks Vector Store page for how the vector store node decides which query form to send.

The node is a standard embeddings sub-node, so it also works with the other vector store nodes in n8n, such as the [Simple Vector Store](../root-nodes/n8n-nodes-langchain.vectorstoreinmemory.md).

## Node parameters

- **Model**: The Unity AI Gateway model service that generates the embeddings, named `catalog.schema.service`.
	- **From List**: Choose from the model services the credential can access that support embeddings.
	- **ID**: Enter the full name of a model service directly. Use this for a service that supports embeddings but isn't advertised as embeddings-capable.

## Node options

- **Batch Size**: The maximum number of documents to send in one request. Default `512`, maximum `2048`. Refer to [Rate limits](#rate-limits) before lowering it.
- **Strip New Lines**: Whether to remove new line characters from the input text before embedding it. Turned on by default.
- **Timeout**: The maximum time a request may take, in milliseconds. Default `360000` (six minutes). A request that runs out of time fails with `Request timed out.`
- **Max Retries**: How many times to retry a failed request. Default `2`.

## Rate limits

Pay-per-token model services are rate limited per workspace. When the Databricks Vector Store node inserts documents, it embeds them in chunks of its **Embedding Batch Size** (`200` by default), and each chunk is split into requests of this node's **Batch Size** that go out in parallel. A small **Batch Size** turns one chunk into many simultaneous requests, which can exceed the workspace limit of the model service. The insert then fails with `Databricks rate limit reached for <service>: REQUEST_LIMIT_EXCEEDED: Exceeded workspace QPS rate limit` and writes nothing.

To avoid it, keep **Batch Size** at its default so a chunk goes out in one request, keep concurrent inserts low, or use a [provisioned throughput](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/deploy-prov-throughput-foundation-model-apis) endpoint for the model.

## Related resources

- [Databricks Vector Store](../root-nodes/n8n-nodes-langchain.vectorstoredatabricks/README.md)
- [Databricks AI Agent](../root-nodes/n8n-nodes-langchain.databricksaiagent.md)
- [Databricks Chat Model](n8n-nodes-langchain.lmchatdatabricks.md)
- [Databricks credentials](../../credentials/databricks.md)
- [Unity AI Gateway model services](https://docs.databricks.com/aws/en/ai-gateway/model-services) in the Databricks documentation
- Migrating from the community package: refer to [Migrate from the n8n-nodes-databricks community package](../root-nodes/n8n-nodes-langchain.vectorstoredatabricks/migrate-from-the-community-package.md)

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Common issues

### No model services found

The model list is empty and the node reports `No model services found`. Unity AI Gateway isn't enabled on the workspace, or the credential's identity can't access any model service. Check the workspace settings, then grant **USE CATALOG**, **USE SCHEMA**, and **EXECUTE** on at least one model service.

### No embeddings-capable model services found

The credential can see model services, but none advertises embeddings. Switch **Model** to **ID** and enter the service name directly. Chat-only services don't work in this node.

### Model service not found

The node fails with `The resource you are requesting could not be found`, and the error description names the missing service. The **Model** name doesn't exist in the workspace. Check the three-part name, or pick the service **From List**.

### Query vector dimension doesn't match the index

The model doesn't match the index the Databricks Vector Store node searches. Refer to [Pair the node with a Databricks index](#pair-the-node-with-a-databricks-index).

### Rate limit reached

The execution fails with `Databricks rate limit reached for <service>` and a 429 status. Refer to [Rate limits](#rate-limits).

### Host must use HTTPS

The node fails with `Databricks host must use https` because the credential's **Host** starts with `http://`. Every request carries a token, so the node refuses plain HTTP. Change the host to `https://`.

### Connection error

The node reports `Connection error.` without a Databricks message. The credential's **Host** doesn't point at a Databricks workspace, or the workspace isn't reachable from your n8n instance. Check the host URL and the network path.

[^1]: Embeddings are numerical representations of data using vectors. They're used by AI to interpret complex data and relationships by mapping values across many dimensions. Vector databases, or vector stores, are databases designed to store and access embeddings.
