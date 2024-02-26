---
title: OpenAI
description: Documentation for the OpenAI node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# OpenAI

Use the OpenAI node to automate work in OpenAI, and integrate OpenAI with other applications. n8n has built-in support for a wide range of OpenAI features, including creating images and chats, as well as moderating, and editing texts. 

On this page, you'll find a list of operations the OpenAI node supports and links to more resources.

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
	
View [example workflows and related content](https://n8n.io/integrations/openai/){:target=_blank .external-link} on n8n's website.

## Using tools with OpenAI assistants

Some operations allow you to connect tools. [Tools](https://docs.n8n.io/advanced-ai/examples/understand-tools/) act like addons that your AI can use to access extra context or resources.

Clicking the Tools connector for these operations will let you browse the available n8n tools to add tools sub-nodes.

Once you add a tool connection, the OpenAI node becomes a root node, allowing it to form a cluster node with the tools sub-nodes. See [Node types](/integrations/builtin/node-types/#cluster-nodes) for more information on cluster nodes and root nodes.

### Operations that support tool connectors

* Assistant
	* Message Assistant
* Text
	* Message Model

### Related resources

Refer to [OpenAI's documentation](https://platform.openai.com/docs/assistants/how-it-works/objects){:target=_blank .external-link} for more information about how assistants work.
