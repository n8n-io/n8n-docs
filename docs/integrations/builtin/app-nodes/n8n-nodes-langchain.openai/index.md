---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: OpenAI node documentation
description: Learn how to use the OpenAI node in n8n. Follow technical documentation to integrate OpenAI node into your workflows.
contentType: integration
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
Refer to [OpenAI credentials](/integrations/builtin/credentials/openai/) for guidance on setting up authentication. 
///

## Operations

- **Assistant** 
	- [**Create an Assistant**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations/#create-an-assistant)
	- [**Delete an Assistant**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations/#delete-an-assistant)
	- [**List Assistants**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations/#list-assistants)
	- [**Message an Assistant**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations/#message-an-assistant)
	- [**Update an Assistant**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations/#update-an-assistant)
- **Text**
	- [**Message a Model**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations/#message-a-model)
	- [**Classify Text for Violations**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations/#classify-text-for-violations)
- **Image**
	- [**Analyze Image**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/image-operations/#analyze-image)
	- [**Generate an Image**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/image-operations/#generate-an-image)
- **Audio**
	- [**Generate Audio**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations/#generate-audio)
	- [**Transcribe Audio**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations/#transcribe-audio)
	- [**Translate Audio**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations/#translate-audio)
- **File**
	- [**Delete a File**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/file-operations/#delete-a-file)
	- [**List Files**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/file-operations/#list-files)
	- [**Upload a File**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/file-operations/#upload-a-file)

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'openai') ]]

## Related resources

Refer to [OpenAI's documentation](https://beta.openai.com/docs/introduction){:target=_blank .external-link} for more information about the service.

Refer to [OpenAI's assistants documentation](https://platform.openai.com/docs/assistants/how-it-works/objects){:target=_blank .external-link} for more information about how assistants work.

For help dealing with rate limits, refer to [Handling rate limits](/integrations/builtin/rate-limits/).

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

## Using tools with OpenAI assistants

Some operations allow you to connect tools. [Tools](https://docs.n8n.io/advanced-ai/examples/understand-tools/) act like addons that your AI can use to access extra context or resources.

Select the **Tools** connector to browse the available tools and add them.

Once you add a tool connection, the OpenAI node becomes a root node, allowing it to form a cluster node with the tools sub-nodes. See [Node types](/integrations/builtin/node-types/#cluster-nodes) for more information on cluster nodes and root nodes.

### Operations that support tool connectors

- **Assistant**
	- [**Message an Assistant**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/assistant-operations/#message-an-assistant)
- **Text**
	- [**Message a Model**](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations/#message-a-model)

## Common issues

For common questions or issues and suggested solutions, refer to [Common issues](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/common-issues/).
