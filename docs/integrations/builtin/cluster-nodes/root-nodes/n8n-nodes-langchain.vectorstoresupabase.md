---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Supabase Vector Store node documentation
description: Learn how to use the Supabase Vector Store node in n8n. Follow technical documentation to integrate Supabase Vector Store node into your workflows.
contentType: integration
priority: medium
---

# Supabase Vector Store node

Use the Supabase Vector Store to interact with your Supabase database as vector store. You can insert documents into a vector database, get many documents from a vector database, and retrieve documents to provide them to a retriever connected to a chain.

On this page, you'll find the node parameters for the Supabase node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/supabase/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"
	
Supabase provides a [quickstart for setting up your vector store](https://supabase.com/docs/guides/ai/langchain?database-method=sql){:target=_blank .external-link}. If you use settings other than the defaults in the quickstart, this may affect parameter settings in n8n. Make sure you understand what you're doing.

## Node parameters

--8<-- "_snippets/integrations/builtin/cluster-nodes/vector-store-mode.md"

### Get Many parameters

* **Table Name**: Enter the Supabase table to use.
* **Prompt**: Enter the search query.
* **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Insert Documents parameters

* **Table Name**: Enter the Supabase table to use.

### Retrieve Documents (For Agent/Chain) parameters

* **Table Name**: Enter the Supabase table to use.

## Node options

### Query Name

The name of the matching function you set up in Supabase. If you follow the [Supabase quickstart](https://supabase.com/docs/guides/ai/langchain?database-method=sql){:target=_blank .external-link}, this will be `match_documents`.

### Metadata Filter

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/vector-store-metadata-filter.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'supabase-vector-store') ]]

## Related resources

Refer to [LangChain's Supabase documentation](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/supabase){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
