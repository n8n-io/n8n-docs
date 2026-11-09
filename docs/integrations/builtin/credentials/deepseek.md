---
title: DeepSeek credentials
description: >-
  Documentation for DeepSeek credentials. Use these credentials to authenticate
  Deepseek in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: DeepSeek credentials
originalFilePath: integrations/builtin/credentials/deepseek.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/deepseek'
url: 'https://docs.n8n.io/integrations/builtin/credentials/deepseek'
layout:
  description:
    visible: false
---

# DeepSeek credentials <a href="#deepseek-credentials" id="deepseek-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Chat DeepSeek](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [DeepSeek](https://platform.deepseek.com/sign_up) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [DeepSeek's API documentation](https://api-docs.deepseek.com/api/deepseek-api) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**

To generate your API Key:

1. Login to your DeepSeek account or [create](https://platform.deepseek.com/sign_up) an account.
2. Open your [API keys](https://platform.deepseek.com/api_keys) page.
3. Select **Create new secret key** to create an API key, optionally naming the key.
4. Copy your key and add it as the **API Key** in n8n.

Refer to the [Your First API Call](https://api-docs.deepseek.com/) page for more information.
