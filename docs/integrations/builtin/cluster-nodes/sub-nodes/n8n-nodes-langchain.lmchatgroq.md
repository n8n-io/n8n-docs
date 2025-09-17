---
title: Groq Chat Model node documentation
description: Learn how to use the Groq Chat Model node in n8n. Follow technical documentation to integrate Groq Chat Model node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Groq Chat Model node

Use the Groq Chat Model node to access Groq's large language models for conversational AI and text generation tasks.

On this page, you'll find the node parameters for the Groq Chat Model node, and links to more resources.

/// note | Credentials 
You can find authentication information for this node [here](/integrations/builtin/credentials/groq.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model which will generate the completion. n8n dynamically loads available models from the Groq API. Learn more in the [Groq model documentation](https://console.groq.com/docs/models).

## Node options

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'groq-chat-model') ]]

## Related resources

Refer to [Groq's API documentation](https://console.groq.com/docs/quickstart) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

