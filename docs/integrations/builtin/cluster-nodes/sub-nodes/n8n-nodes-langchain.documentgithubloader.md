---
title: GitHub Document Loader
description: Documentation for the GitHub Document Loader node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# GitHub Document Loader

Use the GitHub Document Loader node to load data from a GitHub repository for vector stores or summarization.

On this page, you'll find the node parameters for the GitHub Document Loader node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/github/). This node doesn't support OAuth for authentication.
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [GitHub Document Loader](https://n8n.io/integrations/github-document-loader/){:target=_blank .external-link} page.
///	

## Node parameters

* Repository Link: URL of your GitHub repository.
* Branch: the branch name.

## Node options

* Recursive: whether to include sub-folders and files.
* Ignore Paths: set directories to ignore.

## Node reference

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Related resources

View [example workflows and related content](https://n8n.io/integrations/github-document-loader/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-doc-loaders-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
