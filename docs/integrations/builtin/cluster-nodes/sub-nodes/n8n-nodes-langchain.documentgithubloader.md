---
title: GitHub Document Loader node documentation
description: >-
  Learn how to use the GitHub Document Loader node in n8n. Follow technical
  documentation to integrate GitHub Document Loader node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: GitHub Document Loader node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader
layout:
  description:
    visible: false
---

# GitHub Document Loader node <a href="#github-document-loader-node" id="github-document-loader-node"></a>

{% hint style="warning" %}
**Deprecated**

This node is deprecated, and will be removed in a future version.
{% endhint %}

Use the GitHub Document Loader node to load data from a GitHub repository for [vector stores](#user-content-fn-1)[^1] or summarization.

On this page, you'll find the node parameters for the GitHub Document Loader node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/github.md). This node doesn't support OAuth for authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Text Splitting**: Choose from:
	* **Simple**: Uses the [Recursive Character Text Splitter](n8n-nodes-langchain.textsplitterrecursivecharactertextsplitter.md) with a chunk size of 1000 and an overlap of 200.
    * **Custom**: Allows you to connect a text splitter of your choice.
* **Repository Link**: Enter the URL of your GitHub repository.
* **Branch**: Enter the branch name to use.

## Node options <a href="#node-options" id="node-options"></a>

* **Recursive**: Select whether to include sub-folders and files (turned on) or not (turned off).
* **Ignore Paths**: Enter directories to ignore.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse GitHub Document Loader node documentation integration templates](https://n8n.io/integrations/github-document-loader) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/7MPhMVJM8wcmiOf5zn2m/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: A vector store, or vector database, stores mathematical representations of information. Use with embeddings and retrievers to create a database that your AI can access when answering questions.
