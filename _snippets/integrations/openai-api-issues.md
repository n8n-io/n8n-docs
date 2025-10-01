## The service is receiving too many requests from you

This error displays when you've exceeded [OpenAI's rate limits](https://platform.openai.com/docs/guides/rate-limits).

There are two ways to work around this issue:

1. Split your data up into smaller chunks using the [Loop Over Items](/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches.md) node and add a [Wait](/integrations/builtin/core-nodes/n8n-nodes-base.wait.md) node at the end for a time amount that will help. Copy the code below and paste it into a workflow to use as a template.
    ```
    {
        "nodes": [
        {
            "parameters": {},
            "id": "35d05920-ad75-402a-be3c-3277bff7cc67",
            "name": "When clicking ‘Execute workflow’",
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
        "When clicking ‘Execute workflow’": {
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
2. Use the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node with the built-in batch-limit option against the [OpenAI API](https://platform.openai.com/docs/quickstart) instead of using the OpenAI node.

## Insufficient quota

/// note | Quota issues
There are a number of OpenAI issues surrounding quotas, including failures when quotas have been recently topped up. To avoid these issues, ensure that there is credit in the account and issue a new API key from the [API keys screen](https://platform.openai.com/settings/organization/api-keys).
///

This error displays when your OpenAI account doesn't have enough credits or capacity to fulfill your request. This may mean that your OpenAI trial period has ended, that your account needs more credit, or that you've gone over a usage limit.

To troubleshoot this error, on your [OpenAI settings](https://platform.openai.com/settings/organization/billing/overview) page:

* Select the correct organization for your API key in the first selector in the upper-left corner.
* Select the correct project for your API key in the second selector in the upper-left corner.
* Check the organization-level [billing overview](https://platform.openai.com/settings/organization/billing/overview) page to ensure that the organization has enough credit. Double-check that you select the correct organization for this page.
* Check the organization-level [usage limits](https://platform.openai.com/settings/organization/limits) page. Double-check that you select the correct organization for this page and scroll to the **Usage limits** section to verify that you haven't exceeded your organization's usage limits.
* Check your OpenAI project's usage limits. Double-check that you select the correct project in the second selector in the upper-left corner. Select **Project** > **Limits** to view or change the project limits.
* Check that the [OpenAI API](https://status.openai.com/) is operating as expected.

/// note | Balance waiting period
After topping up your balance, there may be a delay before your OpenAI account reflects the new balance.
///

In n8n:

* check that the [OpenAI credentials](/integrations/builtin/credentials/openai.md) use a valid [OpenAI API key](https://platform.openai.com/api-keys) for the account you've added money to
* ensure that you connect the [OpenAI node](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/index.md) to the correct [OpenAI credentials](/integrations/builtin/credentials/openai.md)

If you find yourself frequently running out of account credits, consider turning on auto recharge in your [OpenAI billing settings](https://platform.openai.com/settings/organization/billing/overview) to automatically reload your account with credits when your balance reaches $0.

## Bad request - please check your parameters

This error displays when the request results in an error but n8n wasn't able to interpret the error message from OpenAI.

To begin troubleshooting, try running the same operation using the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node, which should provide a more detailed error message.
