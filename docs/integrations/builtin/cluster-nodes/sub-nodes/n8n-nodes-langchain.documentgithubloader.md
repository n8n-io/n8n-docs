---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: GitHub Document Loader
description: Documentation for the GitHub Document Loader node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# GitHub Document Loader

Use the GitHub Document Loader node to load data from a GitHub repository for vector stores or summarization.

On this page, you'll find the node parameters for the GitHub Document Loader node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/github/). This node doesn't support OAuth for authentication.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* Repository Link: URL of your GitHub repository.
* Branch: the branch name.

## Node options

* Recursive: whether to include sub-folders and files.
* Ignore Paths: set directories to ignore.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'github-document-loader') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-doc-loaders-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
