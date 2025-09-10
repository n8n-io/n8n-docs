---
title: Anthropic node documentation
description: Learn how to use the Anthropic node in n8n. Follow technical documentation to integrate Anthropic node into your workflows.
contentType: [integration, reference]
---

# Anthropic node

Use the Anthropic node to automate work in Anthropic and integrate Anthropic with other applications. n8n has built-in support for a wide range of Anthropic features, including analyzing, uploading, getting, and deleting documents, files, and images,  and generating, improving, or templatizing prompts.

On this page, you'll find a list of operations the Anthropic node supports, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/anthropic.md).
///


## Operations

* Document:
	* Analyze Document: Take in documents and answer questions about them.
* File:
	* Upload File: Upload a file to the Anthropic API for later user.
	* Get File Metadata: Get metadata for a file from the Anthropic API.
	* List Files: List files from the Anthropic API.
	* Delete File: Delete a file from the Anthropic API.
* Image:
	* Analyze Image: Take in images and answer questions about them.
* Prompt:
	* Generate Prompt: Generate a prompt for a model.
	* Improve Prompt: Improve a prompt for a model.
	* Templatize Prompt: Templatize a prompt for a model.
* Text:
	* Message a Model: Create a completion with an Anthropic model.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'anthropic') ]]

## Related resources

<!-- add a link to the service's documentation. This should usually go direct to the API docs -->
Refer to [Anthropic's documentation](https://docs.anthropic.com/en/api/overview) for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
