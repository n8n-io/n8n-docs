---
title: Embeddings Oracle Database node documentation
description: Learn how to use the Embeddings Oracle Database node in n8n. Follow technical documentation to integrate Embeddings Oracle Database node into your workflows.
contentType:
  - integration
  - reference
priority: medium
layout:
  description:
    visible: false
---

# Embeddings Oracle Database node

Use the Embeddings Oracle Database node to generate embeddings[^1] with ONNX models stored in Oracle Database. This node is useful for workflows that perform semantic search, similarity matching, retrieval-augmented generation, or other tasks that require vector representations of text.

On this page, you'll find the node parameters for the Embeddings Oracle Database node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/oracledb.md).
{% endhint %}

{% hint style="info" %}
**ONNX models**

Your Oracle Database instance must support Oracle AI Vector Search and ONNX model execution capabilities.

Import one or more ONNX embedding models into Oracle Database before using this node. Only imported models are available for selection.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters

* **Model**: Select the ONNX model used to generate embeddings. Choose a model from the list of models available in your Oracle Database instance or specify a model ID manually. The selected model determines the embedding dimensions and supported input types.

The node loads available models from the `USER_MINING_MODELS` view in the configured Oracle Database connection. Only models accessible to the current database user are displayed.

## Templates and examples

[Browse Embeddings Oracle Database node documentation integration templates](https://n8n.io/integrations/embeddings-oracle-database) or [search all templates](https://n8n.io/workflows/)

## Related resources

Refer to [Oracle's ONNX model import documentation](https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/import-onnx-models-oracle-ai-database-end-end-example.html) for more information about importing ONNX models into Oracle Database.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: Embeddings are numerical representations of data using vectors. They're used by AI to interpret complex data and relationships by mapping values across many dimensions. Vector databases, or vector stores, are databases designed to store and access embeddings.
