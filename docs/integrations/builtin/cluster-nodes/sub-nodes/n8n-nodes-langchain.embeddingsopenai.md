---
title: Embeddings OpenAI
description: Documentation for the Embeddings OpenAI node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Embeddings OpenAI

Use the Embeddings OpenAI node to generate embeddings for a given text.

On this page, you'll find the node parameters for the Embeddings OpenAI node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/openai/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/embeddings-openai/){:target=_blank .external-link} page.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"


## Node options

* Base URL: the URL to send the request to. Use this if you are using a self-hosted OpenAI-like model. 
* Batch Size: maximum number of documents to send in each request.
* Strip New Lines: whether to strip new lines from input text. This is enabled by default.
* Timeout: maximum amount of time a request is allowed to take in seconds. Set to -1 for no timeout.
	
## Related resources

View [example workflows and related content](https://n8n.io/integrations/embeddings-openai/){:target=_blank .external-link} on n8n's website.

Refer to [LangChains's OpenAI embeddings documentation](https://js.langchain.com/docs/modules/data_connection/text_embedding/integrations/openai){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
