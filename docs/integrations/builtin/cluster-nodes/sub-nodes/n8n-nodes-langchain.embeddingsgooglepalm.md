---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Embeddings Google PaLM node documentation
description: Learn how to use the Embeddings Google PaLM node in n8n. Follow technical documentation to integrate Embeddings Google PaLM node into your workflows.
contentType: integration
---

# Embeddings Google PaLM node

Use the Embeddings Google PaLM node to generate embeddings for a given text.

On this page, you'll find the node parameters for the Embeddings Google PaLM node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/googleai/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model to use to generate the embedding.

n8n dynamically loads models from the Google PaLM API and you'll only see the models available to your account.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'embeddings-google-palm') ]]

## Related resources

Refer to [Langchain's Google PaLM embeddings documentation](https://js.langchain.com/v0.2/docs/integrations/text_embedding/google_palm/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
