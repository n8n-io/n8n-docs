---
title: 'Supabase'
description: 'Documentation for the Supabase node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.'
---

# Supabase Vector Store

Use the Supabase Vector Store to interact with your Supabase database as vector store. You can insert documents into a vector database, get many documents from a vector database, and retrieve documents to provide them to a retriever connected to a chain.

On this page, you'll find the node parameters for the Supabase node, and links to more resources.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/supabase/).

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/supabase/){:target=_blank .external-link} page.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"
	
## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

Parameters for **Get Many**:

* Table Name
* Prompt
* Limit

Parameters for **Insert Documents**:

* Table Name

Parameters for **Retrieve Documents (For Agent/Chain)**:

* Table Name

## Node options

* Query Name
* Metadata Filter (not available for **Insert Documents** mode)


## Related resources

View [example workflows and related content](https://n8n.io/integrations/supabase-vectorstore/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's Supabase documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/supabase){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
