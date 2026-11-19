---
description: >-
  Move workflows from the n8n-nodes-databricks community package to the
  built-in Databricks nodes: node mapping, field differences, and behavior
  changes.
layout:
  description:
    visible: false
---

# Migrate from the n8n-nodes-databricks community package

The built-in Databricks nodes replace the [n8n-nodes-databricks](https://www.npmjs.com/package/n8n-nodes-databricks) community package. This page maps each community node to its built-in counterpart, lists the fields that moved, and describes the behavior changes to expect.

Community nodes and built-in nodes have different node types, so you can't convert a node in place. For each community node in a workflow: add the built-in node, copy the settings over, reconnect it, and delete the community node.

The built-in AI nodes need a [Databricks OAuth2 credential](../../../credentials/databricks.md#supported-authentication-methods) with a service principal or user login. The community package's host and personal access token credential has no built-in equivalent for the AI nodes; only the built-in [Databricks](../../../app-nodes/n8n-nodes-base.databricks.md) and [Databricks Trigger](../../../trigger-nodes/n8n-nodes-base.databrickstrigger.md) nodes accept a personal access token.

## Node mapping

| Community node | Built-in node | What changed |
|----------------|---------------|--------------|
| Databricks | [Databricks](../../../app-nodes/n8n-nodes-base.databricks.md) | Same resources. The built-in node adds Job operations and a [Databricks Trigger](../../../trigger-nodes/n8n-nodes-base.databrickstrigger.md) node. |
| Databricks Chat Model | [Databricks Chat Model](../../sub-nodes/n8n-nodes-langchain.lmchatdatabricks.md) | **Model** selects a Unity AI Gateway model service, `catalog.schema.service`, instead of a serving endpoint. The **Conversation ID** and **Return Trace** options don't exist. |
| Embeddings Databricks | [Embeddings Databricks](../../sub-nodes/n8n-nodes-langchain.embeddingsdatabricks.md) | **Serving Endpoint** becomes **Model**, a list of the embeddings-capable model services. |
| Databricks Vector Store | [Databricks Vector Store](README.md) | **Index Name** becomes **Index**, a list or the full `catalog.schema.index` name. **Text Column** becomes **Content Column**, picked from the index's columns. **Metadata Columns** is a multi-select instead of a comma-separated list. **Score Threshold** is gone; use **Limit**. New: **Search Mode** and **Metadata Filter**. |
| Databricks AI Agent | [Databricks AI Agent](../n8n-nodes-langchain.databricksaiagent.md) | **Enable MLflow Tracking** becomes **Export Traces to MLflow**. The default experiment path `/Shared/n8n-workflows-<workflow-id>` stays the same, and the new **Experiment** field lets you pick an existing experiment. The credential on the agent is only needed for the export. |

## Field differences on the Vector Store node

| Community field | Built-in field | Notes |
|-----------------|----------------|-------|
| **Index Name** (text) | **Index** | Pick **From List**, or enter the full name in **Name**. In **Insert Documents** mode the list shows Direct Access indexes only. |
| **Text Column** (default `text`) | **Content Column** | Picked from the index's columns. Leave it empty on a managed index to use the embedding source column. |
| **Metadata Columns** (comma-separated text) | **Metadata Columns** option | A multi-select. Empty returns every column except the primary key, the content column, and the vector column. |
| **Score Threshold** (default `0.8`) | None | Use **Limit**. Refer to [No score threshold](README.md#no-score-threshold) for why. |
| None | **Search Mode** option | **Vector** or **Hybrid**. |
| None | **Metadata Filter** option | A JSON filter sent as `filters_json`. |

## Behavior changes to expect

- **Searches on managed indexes work.** The community node always sent `query_vector`, so every search on a Delta Sync index with Databricks-computed embeddings failed. The built-in node sends `query_text` or `query_vector` as the index requires. Refer to [Index types and embeddings](README.md#index-types-and-embeddings).
- **No results dropped by a threshold.** The community node's **Score Threshold** defaulted to `0.8`, which discarded every result on indexes whose similarity scores sit far below that. The built-in node returns the top **Limit** results.
- **Hybrid search and metadata filters** are available in all search modes, including when an agent uses the index as a tool.
- **Inserts are checked before the request.** A Delta Sync index or a wrong **Content Column** fails with a message that names the problem instead of a raw API error.
- **The agent doesn't drift.** The built-in Databricks AI Agent runs the AI Agent node's own code instead of a fork, so it has the same options and gets the same fixes.
- **Traces keep landing in the same experiment** when you replace the agent node inside an existing workflow, because the default experiment path contains the workflow ID.

## Related resources

- [Databricks Vector Store](README.md)
- [Embeddings Databricks](../../sub-nodes/n8n-nodes-langchain.embeddingsdatabricks.md)
- [Databricks AI Agent](../n8n-nodes-langchain.databricksaiagent.md)
- [Databricks Chat Model](../../sub-nodes/n8n-nodes-langchain.lmchatdatabricks.md)
- [Databricks credentials](../../../credentials/databricks.md)
