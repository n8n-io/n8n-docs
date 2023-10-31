---
title: Token Splitter
description: Documentation for the Token Splitter node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Token Splitter

The Token Splitter node splits a raw text string by first converting the text into BPE tokens, then splits these tokens into chunks and converts the tokens within a single chunk back into text.

On this page, you'll find the node parameters for the Token Splitter node, and links to more resources.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/token-splitter/){:target=_blank .external-link} page.
	
## Node parameters

* Chunk Size
* Chunk Overlap

## Node reference

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Related resources

View [example workflows and related content](https://n8n.io/integrations/token-splitter/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's token text splitter documentation](https://js.langchain.com/docs/modules/data_connection/document_transformers/text_splitters/token){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
