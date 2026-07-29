---
title: MiniMax credentials
description: >-
  Documentation for MiniMax credentials. Use these credentials to authenticate
  MiniMax in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: MiniMax credentials
originalFilePath: integrations/builtin/credentials/minimax.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/minimax'
url: 'https://docs.n8n.io/integrations/builtin/credentials/minimax'
layout:
  description:
    visible: false
---

# MiniMax credentials <a href="#minimax-credentials" id="minimax-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [MiniMax](../app-nodes/n8n-nodes-langchain.minimax.md)
* [MiniMax Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatminimax.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [MiniMax](https://platform.minimax.io/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [MiniMax's API documentation](https://platform.minimax.io/docs/guides/models-intro) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- A **Region**: Select **International** or **China** depending on your MiniMax account.
- An **API Key**

To get your API key:

1. Log in to your [MiniMax account](https://platform.minimax.io/).
2. Go to **Account** > **API Keys**.
3. Select **Create API Key**.
4. Copy the key and enter it in your n8n credential.
