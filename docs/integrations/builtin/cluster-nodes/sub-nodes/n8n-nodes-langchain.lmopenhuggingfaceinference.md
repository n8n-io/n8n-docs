---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Hugging Face Inference Model
description: Documentation for the Hugging Face Inference Model node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Hugging Face Inference Model

Use the Hugging Face Inference Model node to use Hugging Face's models.

On this page, you'll find the node parameters for the Hugging Face Inference Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/huggingface/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

**Model**: the model to use to generate the completion.

## Node options

* **Custom Inference Endpoint**: endpoint URL.
* **Frequency Penalty**: increase this to reduce the chance of the model repeating itself.
* **Maximum Number of Tokens**: the completion length, in characters.
* **Presence Penalty**: increase this to increase the chance of the model talking about new topics.
* **Sampling Temperature**: controls the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: the number of token choices the model uses to generate the next token.
* **Top P**: use a lower value to ignore less probable options. 

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'hugging-face-inference-model') ]]

## Related resources

Refer to [LangChains's Hugging Face Inference Model documentation](https://js.langchain.com/docs/modules/model_io/models/llms/integrations/huggingface_inference){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
