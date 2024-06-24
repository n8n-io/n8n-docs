---
title: Groq Chat Model 
description: Documentation for the Groq Chat Model node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Groq Chat Model

Use the Groq Chat Model node to access Groq's large language models for conversational AI and text generation tasks.

On this page, you'll find the node parameters for the Groq Chat Model node, and links to more resources.

/// note | Credentials 
You can find authentication information for this node [here](/integrations/builtin/credentials/groq/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Groq Chat Model integrations](https://n8n.io/integrations/groq-chat-model/){:target=_blank .external-link} page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: The model which will generate the completion. Learn more in the [Groq model documentation](https://console.groq.com/docs/models){:target=_blank .external-link}. Available models are loaded dynamically from the Groq API.

## Node options

* **Maximum Number of Tokens**: the maximum number of tokens to generate in the completion.
* **Sampling Temperature**: controls randomness. Lowering the value results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. Valid range is 0 to 1.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/groq-chat-model/){:target=_blank .external-link} on n8n's website.

Refer to [Groq's API documentation](https://console.groq.com/docs/quickstart){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
