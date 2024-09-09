---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: OpenAI node documentation
description: Learn how to use the OpenAI node in n8n. Follow technical documentation to integrate OpenAI node into your workflows.
contentType: integration
priority: critical
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
[[ templatesWidget(title, 'openai') ]]

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

## The service is receiving too many requests from you

This error displays when you've exceeded [OpenAI's rate limits](https://platform.openai.com/docs/guides/rate-limits){:target=_blank .external-link}.

There are two ways to work around this issue:

1. Split your data up into smaller chunks using the [Loop Over Items](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/) node and add a [Wait](/integrations/builtin/core-nodes/n8n-nodes-base.wait/) node at the end for a time amount that will help. Copy the code below and paste it into a workflow to use as a template.
    ```
    {
        "nodes": [
        {
            "parameters": {},
            "id": "35d05920-ad75-402a-be3c-3277bff7cc67",
            "name": "When clicking ‘Test workflow’",
            "type": "n8n-nodes-base.manualTrigger",
            "typeVersion": 1,
            "position": [
            880,
            400
            ]
        },
        {
            "parameters": {
            "batchSize": 500,
            "options": {}
            },
            "id": "ae9baa80-4cf9-4848-8953-22e1b7187bf6",
            "name": "Loop Over Items",
            "type": "n8n-nodes-base.splitInBatches",
            "typeVersion": 3,
            "position": [
            1120,
            420
            ]
        },
        {
            "parameters": {
            "resource": "chat",
            "options": {},
            "requestOptions": {}
            },
            "id": "a519f271-82dc-4f60-8cfd-533dec580acc",
            "name": "OpenAI",
            "type": "n8n-nodes-base.openAi",
            "typeVersion": 1,
            "position": [
            1380,
            440
            ]
        },
        {
            "parameters": {
            "unit": "minutes"
            },
            "id": "562d9da3-2142-49bc-9b8f-71b0af42b449",
            "name": "Wait",
            "type": "n8n-nodes-base.wait",
            "typeVersion": 1,
            "position": [
            1620,
            440
            ],
            "webhookId": "714ab157-96d1-448f-b7f5-677882b92b13"
        }
        ],
        "connections": {
        "When clicking ‘Test workflow’": {
            "main": [
            [
                {
                "node": "Loop Over Items",
                "type": "main",
                "index": 0
                }
            ]
            ]
        },
        "Loop Over Items": {
            "main": [
            null,
            [
                {
                "node": "OpenAI",
                "type": "main",
                "index": 0
                }
            ]
            ]
        },
        "OpenAI": {
            "main": [
            [
                {
                "node": "Wait",
                "type": "main",
                "index": 0
                }
            ]
            ]
        },
        "Wait": {
            "main": [
            [
                {
                "node": "Loop Over Items",
                "type": "main",
                "index": 0
                }
            ]
            ]
        }
        },
        "pinData": {}
    }
    ```
2. Use the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node with the built-in batch-limit option against the [OpenAI API](https://platform.openai.com/docs/quickstart){:target=_blank .external-link} instead of using the OpenAI node.

## Bad request - please check your parameters

This error displays when n8n doesn't display the actual error from OpenAI.

To begin troubleshooting, try running the same operation using the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node, which should provide a more detailed error message.

<!-- vale off -->
## Referenced node is unexecuted
<!-- vale on -->

This error displays when a previous node in the workflow hasn't executed and isn't providing output that this node needs as input.

The full text of this error will tell you the exact node that isn't executing in this format:
```
An expression references the node '<node-name>'', but it hasn’t been executed yet. Either change the expression, or re-wire your workflow to make sure that node executes first.
```

To begin troubleshooting, test the workflow up to the named node.

For nodes that call JavaScript or other custom code, you can call `$("<node-name>").isExecuted` to determine if a node has executed before trying to use the value.
