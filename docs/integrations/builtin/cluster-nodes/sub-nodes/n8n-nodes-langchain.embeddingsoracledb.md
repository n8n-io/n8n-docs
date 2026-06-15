---
title: Embeddings Oracle Database node documentation
description: Learn how to use the Embeddings Oracle Database node in n8n. Follow technical documentation to integrate Embeddings Oracle Database node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Embeddings Oracle Database node

Use the Embeddings Oracle Database node to generate [embeddings](/glossary.md#ai-embedding) with ONNX models stored in Oracle Database. This node is useful for workflows that perform semantic search, similarity matching, retrieval-augmented generation, or other tasks that require vector representations of text.

On this page, you'll find the node parameters for the Embeddings Oracle Database node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/oracledb.md).
///

/// note | ONNX models
Your Oracle Database instance must support Oracle AI Vector Search and ONNX model execution capabilities.

Import one or more ONNX embedding models into Oracle Database before using this node. Only imported models are available for selection.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the ONNX model used to generate embeddings. Choose a model from the list of models available in your Oracle Database instance or specify a model ID manually. The selected model determines the embedding dimensions and supported input types.

The node loads available models from the `USER_MINING_MODELS` view in the configured Oracle Database connection. Only models accessible to the current database user are displayed.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'embeddings-oracle-database') ]]

## Related resources

Refer to [Oracle's ONNX model import documentation](https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/import-onnx-models-oracle-ai-database-end-end-example.html) for more information about importing ONNX models into Oracle Database.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
