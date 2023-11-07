---
title: Binary Input Loader
description: Documentation for the Binary Input Loader node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Binary Input Loader

[TODO: merge with JSON]

Use the Binary Input Loader node to load binary data files for vector stores or summarization.

On this page, you'll find a list of parameters the Binary Input Loader node supports, and links to more resources.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/binary-input-loader/){:target=_blank .external-link} page.
	
## Node parameters

* Loader Type
	* CSV
	* Docx
	* EPub
	* JSON
	* PDF
	* Text
* Binary Data Key
* Pointers

[TODO: when selecting data format, if the incoming file MIME type doesn't match what you selected, it throws error. If you use automatic, it will fall back to text if it can't detect a supported type]

## Options
[TODO
Metadata: set metadata for vector store. This is what's being matched in the metadata filter


]

## Node reference

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Related resources

View [example workflows and related content](https://n8n.io/integrations/binary-input-loader/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-doc-loaders-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
