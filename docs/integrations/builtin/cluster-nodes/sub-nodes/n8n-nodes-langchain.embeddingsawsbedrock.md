---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Embeddings AWS Bedrock node documentation
description: Learn how to use the Embeddings AWS Bedrock node in n8n. Follow technical documentation to integrate Embeddings AWS Bedrock node into your workflows.
contentType: integration
---

# Embeddings AWS Bedrock node

Use the Embeddings AWS Bedrock node to generate embeddings for a given text.

On this page, you'll find the node parameters for the Embeddings AWS Bedrock node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/aws/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model to use to generate the embedding.

Learn more about available models in the [Amazon Bedrock documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html){:target=_blank .external-link}. 

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'embeddings-aws-bedrock') ]]

## Related resources

Refer to [LangChains's AWS Bedrock embeddings documentation](https://js.langchain.com/docs/integrations/platforms/aws/#text-embedding-models){:target=_blank .external-link} and the [AWS Bedrock documentation](https://docs.aws.amazon.com/bedrock/){:target=_blank .external-link} for more information about AWS Bedrock.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
