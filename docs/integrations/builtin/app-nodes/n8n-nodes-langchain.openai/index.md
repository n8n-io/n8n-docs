---
title: OpenAI node documentation
description: Learn how to use the OpenAI node in n8n. Follow technical documentation to integrate OpenAI node into your workflows.
contentType: [integration, reference]
priority: critical
search:
    boost: 3
---

# OpenAI node

Use the OpenAI node to automate work in OpenAI and integrate OpenAI with other applications. n8n has built-in support for a wide range of OpenAI features, including creating images and assistants, as well as chatting with models. 

On this page, you'll find a list of operations the OpenAI node supports and links to more resources.

/// note | OpenAI Assistant node
The OpenAI node replaces the OpenAI assistant node from version 1.29.0 on.
///

/// note | Credentials
Refer to [OpenAI credentials](/integrations/builtin/credentials/openai.md) for guidance on setting up authentication. 
///

## Operations

- **Assistant** 
	- [**Create an Assistant**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations.md#create-an-assistant)
	- [**Delete an Assistant**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations.md#delete-an-assistant)
	- [**List Assistants**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations.md#list-assistants)
	- [**Message an Assistant**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations.md#message-an-assistant)
	- [**Update an Assistant**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations.md#update-an-assistant)
- **Text**
	- [**Message a Model**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations.md#message-a-model)
	- [**Classify Text for Violations**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations.md#classify-text-for-violations)
- **Image**
	- [**Analyze Image**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/image-operations.md#analyze-image)
	- [**Generate an Image**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/image-operations.md#generate-an-image)
- **Audio**
	- [**Generate Audio**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations.md#generate-audio)
	- [**Transcribe a Recording**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations.md#transcribe-a-recording)
	- [**Translate a Recording**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations.md#translate-a-recording)
- **File**
	- [**Delete a File**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/file-operations.md#delete-a-file)
	- [**List Files**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/file-operations.md#list-files)
	- [**Upload a File**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/file-operations.md#upload-a-file)

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'openai') ]]

## Related resources

Refer to [OpenAI's documentation](https://beta.openai.com/docs/introduction) for more information about the service.

Refer to [OpenAI's assistants documentation](https://platform.openai.com/docs/assistants/how-it-works/objects) for more information about how assistants work.

For help dealing with rate limits, refer to [Handling rate limits](/integrations/builtin/rate-limits.md).

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

## Using tools with OpenAI assistants

Some operations allow you to connect tools. [Tools](/advanced-ai/examples/understand-tools.md) act like addons that your AI can use to access extra context or resources.

Select the **Tools** connector to browse the available tools and add them.

Once you add a tool connection, the OpenAI node becomes a [root node](/glossary.md#root-node-n8n), allowing it to form a [cluster node](/glossary.md#cluster-node-n8n) with the tools [sub-nodes](/glossary.md#sub-node-n8n). See [Node types](/integrations/builtin/node-types.md#cluster-nodes) for more information on cluster nodes and root nodes.

### Operations that support tool connectors

- **Assistant**
	- [**Message an Assistant**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations.md#message-an-assistant)
- **Text**
	- [**Message a Model**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations.md#message-a-model)

## Common issues

For common questions or issues and suggested solutions, refer to [Common issues](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/common-issues.md).
