---
title: Ollama node documentation
description: Learn how to use the Ollama node in n8n. Follow technical documentation to integrate Ollama node into your workflows.
contentType: [integration, reference]
---

# Ollama node

Use the Ollama node to automate work with Ollama and integrate Ollama with other applications. n8n has built-in support for a wide range of Ollama features, including text generation with tool calling capabilities and image analysis using vision models.

On this page, you'll find a list of operations the Ollama node supports, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/ollama.md).
///


## Operations

* Image:
	* Analyze Image: Take in images and answer questions about them using vision models like LLaVA.
* Text:
	* Message a Model: Create a completion with an Ollama model, including support for tool calling.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'ollama') ]]

## Related resources

<!-- add a link to the service's documentation. This should usually go direct to the API docs -->
Refer to [Ollama's documentation](https://github.com/ollama/ollama/blob/main/docs/api.md) for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"