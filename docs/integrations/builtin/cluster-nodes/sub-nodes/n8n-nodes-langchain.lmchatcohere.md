---
title: Cohere Chat Model node documentation
description: Learn how to use the Cohere Chat Model node in n8n. Follow technical documentation to integrate Cohere Chat Model node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Cohere Chat Model node

Use the Cohere Chat Model node to access Cohere's large language models for conversational AI and text generation tasks.

On this page, you'll find the node parameters for the Cohere Chat Model node, and links to more resources.

/// note | Credentials 
You can find authentication information for this node [here](/integrations/builtin/credentials/cohere.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model which will generate the completion. n8n dynamically loads available models from the Cohere API. Learn more in the [Cohere model documentation](https://docs.cohere.com/v2/docs/models#command).

## Node options

* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Max Retries**: Enter the maximum number of times to retry a request.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'cohere-chat-model') ]]

## Related resources

Refer to [Cohere's API documentation](https://docs.cohere.com/v2/reference/about) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

