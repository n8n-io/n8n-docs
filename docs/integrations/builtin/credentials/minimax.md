---
title: MiniMax credentials
description: Documentation for MiniMax credentials. Use these credentials to authenticate MiniMax in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# MiniMax credentials

You can use these credentials to authenticate the following nodes:

* [MiniMax](/integrations/builtin/app-nodes/n8n-nodes-langchain.minimax.md)
* [MiniMax Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatminimax.md)

## Prerequisites

Create a [MiniMax](https://platform.minimax.io/){:target="_blank" .external-link} account.

## Supported authentication methods

- API key

## Related resources

Refer to [MiniMax's API documentation](https://platform.minimax.io/docs/guides/models-intro){:target="_blank" .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need:

- A **Region**: Select **International** or **China** depending on your MiniMax account.
- An **API Key**

To get your API key:

1. Log in to your [MiniMax account](https://platform.minimax.io/){:target="_blank" .external-link}.
2. Go to **Account** > **API Keys**.
3. Select **Create API Key**.
4. Copy the key and enter it in your n8n credential.
