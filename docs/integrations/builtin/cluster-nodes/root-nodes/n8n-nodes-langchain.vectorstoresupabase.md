---
title: Supabase Vector Store
description: Documentation for the Supabase node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Supabase Vector Store

Use the Supabase Vector Store to interact with your Supabase database as vector store. You can insert documents into a vector database, get many documents from a vector database, and retrieve documents to provide them to a retriever connected to a chain.

On this page, you'll find the node parameters for the Supabase node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/supabase/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Supabase integrations](https://n8n.io/integrations/supabase-vector-store/){:target=_blank .external-link} page.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"
	
Supabase provides a [quickstart for setting up your vector store](https://supabase.com/docs/guides/ai/langchain?database-method=sql){:target=_blank .external-link}. If you use settings other than the defaults in the quickstart, this may affect parameter settings in n8n. Make sure you understand what you're doing.

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

### Query Name

The name of the matching function you set up in Supabase. If you follow the [Supabase quickstart](https://supabase.com/docs/guides/ai/langchain?database-method=sql){:target=_blank .external-link}, this will be `match_documents`.

### Metadata Filter

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/vector-store-metadata-filter.md"


## Related resources

View [example workflows and related content](https://n8n.io/integrations/supabase-vectorstore/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's Supabase documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/supabase){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
