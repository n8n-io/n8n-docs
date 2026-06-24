---
title: OpenAI node documentation
description: >-
  Learn how to use the OpenAI node in n8n. Follow technical documentation to
  integrate OpenAI node into your workflows.
contentType:
  - integration
  - reference
priority: critical
search:
  boost: 3
nodeTitle: n8n-nodes-langchain.openai
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-langchain.openai/index.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai'
layout:
  description:
    visible: false
---

# OpenAI node <a href="#openai-node" id="openai-node"></a>

Use the OpenAI node to automate work in OpenAI and integrate OpenAI with other applications. n8n has built-in support for a wide range of OpenAI features, including creating images and assistants, as well as chatting with models. 

On this page, you'll find a list of operations the OpenAI node supports and links to more resources.

{% hint style="info" %}
**Previous node versions**

The OpenAI node replaces the OpenAI assistant node from version 1.29.0 on.
n8n version 1.117.0 introduces V2 of the OpenAI node that supports the OpenAI Responses API and removes support for the [to-be-deprecated Assistants API](https://platform.openai.com/docs/assistants/migration).
{% endhint %}

{% hint style="info" %}
**Credentials**

Refer to [OpenAI credentials](../../credentials/openai.md) for guidance on setting up authentication.
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

- **Text**
	- [**Generate a Chat Completion**](text-operations.md#generate-a-chat-completion)
	- [**Generate a Model Response**](text-operations.md#generate-a-model-response)
	- [**Classify Text for Violations**](text-operations.md#classify-text-for-violations)
- **Image**
	- [**Analyze Image**](image-operations.md#analyze-image)
	- [**Generate an Image**](image-operations.md#generate-an-image)
	- [**Edit an Image**](image-operations.md#edit-an-image)
- **Audio**
	- [**Generate Audio**](audio-operations.md#generate-audio)
	- [**Transcribe a Recording**](audio-operations.md#transcribe-a-recording)
	- [**Translate a Recording**](audio-operations.md#translate-a-recording)
- **File**
	- [**Delete a File**](file-operations.md#delete-a-file)
	- [**List Files**](file-operations.md#list-files)
	- [**Upload a File**](file-operations.md#upload-a-file)
- **Video**
	- [**Generate a Video**](video-operations.md#generate-video)
- **Conversation**
	- [**Create a Conversation**](conversation-operations.md#create-a-conversation)
	- [**Get a Conversation**](conversation-operations.md#get-a-conversation)
	- [**Update a Conversation**](conversation-operations.md#update-a-conversation)
	- [**Remove a Conversation**](conversation-operations.md#remove-a-conversation)


## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse n8n-nodes-langchain.openai integration templates](https://n8n.io/integrations/openai) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [OpenAI's documentation](https://beta.openai.com/docs/introduction) for more information about the service.

Refer to [OpenAI's assistants documentation](https://platform.openai.com/docs/assistants/how-it-works/objects) for more information about how assistants work.

For help dealing with rate limits, refer to [Handling rate limits](../../handle-rate-limits.md).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/lMIxsgtfHVazfAS7oe1v/" %}

## Using tools with OpenAI assistants <a href="#using-tools-with-openai-assistants" id="using-tools-with-openai-assistants"></a>

Some operations allow you to connect tools. [Tools](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/how-tools-work) act like addons that your AI can use to access extra context or resources.

Select the **Tools** connector to browse the available tools and add them.

Once you add a tool connection, the OpenAI node becomes a [root node](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#root-node-n8n), allowing it to form a [cluster node](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#cluster-node-n8n) with the tools [sub-nodes](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#sub-node-n8n). See [Node types](../../node-types.md#cluster-nodes) for more information on cluster nodes and root nodes.

### Operations that support tool connectors <a href="#operations-that-support-tool-connectors" id="operations-that-support-tool-connectors"></a>

- **Text**
	- [**Generate a Chat Completion**](text-operations.md#generate-a-chat-completion)
	- [**Generate a Model Response**](text-operations.md#generate-a-model-response)

## Common issues <a href="#common-issues" id="common-issues"></a>

For common questions or issues and suggested solutions, refer to [Common issues](common-issues.md).
