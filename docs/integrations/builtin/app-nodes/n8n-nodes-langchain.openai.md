---
title: OpenAI
description: Documentation for the OpenAI node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# OpenAI

Use the OpenAI node to automate work in OpenAI, and integrate OpenAI with other applications. n8n has built-in support for a wide range of OpenAI features, including creating images and assistants, as well as chatting with models. 

On this page, you'll find a list of operations the OpenAI node supports and links to more resources.

/// note | OpenAI Assistant node
The OpenAI node replaces the OpenAI assistant node from version 1.29.0 on.
///

/// note | Credentials
Refer to [OpenAI credentials](/integrations/builtin/credentials/openai/) for guidance on setting up authentication. 
///

/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [OpenAI integrations](https://n8n.io/integrations/openai/){:target="_blank" .external-link} list.
///

## Operations

* Assistant
	* Create
	* Delete
	* List
	* Message
	* Update
* Text
	* Message a Model
	* Classify Text for Violations
* Image
	* Analyze
	* Generate
* Audio
	* Generate
	* Transcribe
	* Translate
* File
	* Delete
	* List
	* Upload


## Related resources

Refer to [OpenAI's documentation](https://beta.openai.com/docs/introduction){:target=_blank .external-link} for more information about the service.

Refer to [OpenAI's assistants documentation](https://platform.openai.com/docs/assistants/how-it-works/objects){:target=_blank .external-link} for more information about how assistants work.
	
View [example workflows and related content](https://n8n.io/integrations/openai/){:target=_blank .external-link} on n8n's website.

For help dealing with rate limits, refer to [Handling rate limits](/integrations/builtin/rate-limits/).

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"


## Using tools with OpenAI assistants

Some operations allow you to connect tools. [Tools](https://docs.n8n.io/advanced-ai/examples/understand-tools/) act like addons that your AI can use to access extra context or resources.

Select the **Tools** connector to browse the available tools and add them.

Once you add a tool connection, the OpenAI node becomes a root node, allowing it to form a cluster node with the tools sub-nodes. See [Node types](/integrations/builtin/node-types/#cluster-nodes) for more information on cluster nodes and root nodes.

### Operations that support tool connectors

* Assistant
	* Message Assistant
* Text
	* Message Model

### Using memory with OpenAI assistants

For the Assistant: Message operation, you can use the memory connector to preserve and retrieve chat history. This allows the assistant to maintain context across multiple messages. The connected memory sub-node is the source of truth for the assistant's memory. This means that we create a new thread on each run and pre-populate it with messages from the memory sub-node. After the run is completed, the memory sub-node is updated with the new messages, and the thread is deleted from OpenAI.
