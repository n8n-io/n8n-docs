---
title: GitHub Document Loader node documentation
description: Learn how to use the GitHub Document Loader node in n8n. Follow technical documentation to integrate GitHub Document Loader node into your workflows.
contentType: [integration, reference]
---

# GitHub Document Loader node

/// warning | Deprecated
This node is deprecated, and will be removed in a future version.
///

Use the GitHub Document Loader node to load data from a GitHub repository for [vector stores](/glossary.md#ai-vector-store) or summarization.

On this page, you'll find the node parameters for the GitHub Document Loader node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/github.md). This node doesn't support OAuth for authentication.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Text Splitting**: Choose from:
	* **Simple**: Uses the [Recursive Character Text Splitter](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.textsplitterrecursivecharactertextsplitter.md) with a chunk size of 1000 and an overlap of 200.
    * **Custom**: Allows you to connect a text splitter of your choice.
* **Repository Link**: Enter the URL of your GitHub repository.
* **Branch**: Enter the branch name to use.

## Node options

* **Recursive**: Select whether to include sub-folders and files (turned on) or not (turned off).
* **Ignore Paths**: Enter directories to ignore.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'github-document-loader') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-doc-loaders-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

