---
title: Summarization Chain
description: Documentation for the Summarization Chain node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Summarization Chain

Use the Summarization Chain node to summarize multiple documents.

On this page, you'll find the node parameters for the Summarization Chain node, and links to more resources.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/summarization-chain/){:target=_blank .external-link} page.
	
## Node parameters

### Type

The type of summarization to run.

* Map Reduce ([Map Reduce](https://js.langchain.com/docs/modules/chains/document/map_reduce){:target=_blank .external-link} in the LangChain documentation)
* Refine ([Refine](https://js.langchain.com/docs/modules/chains/document/refine){:target=_blank .external-link} in the LangChain documentation)
* Stuff ([Stuff](https://js.langchain.com/docs/modules/chains/document/stuff){:target=_blank .external-link} in the LangChain documentation)

### Options

[TODO: direct user to UI example]

* **Combine Map Prompt**: write a prompt to guide the agent when combining summaries.
* **Prompt**: write a prompt to guide the agent when generating individual summaries.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/summarization-chain/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's documentation on summarization](https://js.langchain.com/docs/modules/chains/popular/summarize){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
