---
title: DeepInfra Model node documentation
description: Learn how to use the DeepInfra Model node in n8n. Follow technical documentation to integrate DeepInfra Model node into your workflows.
contentType: [integration, reference]
priority: medium
---

# DeepInfra Model node

Use the DeepInfra Model node to access powerful language models like Llama and Deepseek through DeepInfra's API with your [agents](/glossary.md#ai-agent).

On this page, you'll find the node parameters for the DeepInfra Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/deepinfra.md).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: Select the model that generates the completion. DeepInfra offers various models including:
	* **Llama models**
	* **Deepseek models**
	* And many other open-source models

Learn more in the [DeepInfra models documentation](https://deepinfra.com/docs/models){:target=_blank .external-link}.

## Node options

* **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
* **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'deepinfra-model') ]]

## Related resources

Refer to [LangChain's DeepInfra documentation](https://js.langchain.com/docs/integrations/llms/deep_infra/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

--8<-- "_glossary/ai-glossary.md" 