---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: OpenAI node common issues 
description: Documentation for common issues and questions in the OpenAI node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: integration
priority: critical
---

# OpenAI node common issues

Here are some common errors and issues with the [OpenAI node](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/) and steps to resolve or troubleshoot them.

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

This error displays when the request errored but the OpenAI node wasn't able to interpret the error message from OpenAI.

To begin troubleshooting, try running the same operation using the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node, which should provide a more detailed error message.

--8<-- "_snippets/integrations/referenced-node-unexecuted.md"
