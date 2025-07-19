---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Cerebras credentials
description: Documentation for the Cerebras credentials. Use these credentials to authenticate Cerebras in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Cerebras credentials

You can use these credentials to authenticate the following nodes:

* [Cerebras Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatcerebras.md)

## Prerequisites

Create a [Cerebras](https://cloud.cerebras.ai/){:target=_blank .external-link} account.

## Supported authentication methods

- API key

## Related resources

Refer to [Cerebras's documentation](https://inference-docs.cerebras.ai/introduction){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need:

- An **API Key**

To get your API key:

1. Go to the 'API Keys' section within the [Cerebras inference platform](https://cloud.cerebras.ai/){:target=_blank .external-link} page of your Cerebras console.
2. Select **Generate API Key**.
3. Enter a **display name** for the key, like `n8n integration`, and select **Submit**.
4. Copy the key and paste it into your n8n credential.

Refer to [Cerebras's API documentation](https://inference-docs.cerebras.ai/introduction){:target=_blank .external-link} for more information.
