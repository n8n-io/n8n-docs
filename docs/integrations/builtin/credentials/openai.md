---
title: OpenAI credentials
contentType:
  - integration
  - reference
priority: critical
nodeTitle: OpenAI credentials
originalFilePath: integrations/builtin/credentials/openai.md
originalUrl: https://docs.n8n.io/integrations/builtin/credentials/openai
url: https://docs.n8n.io/integrations/builtin/credentials/openai
description: >-
  Documentation for OpenAI credentials. Use these credentials to authenticate
  OpenAI in n8n, a workflow automation platform.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# OpenAI credentials

You can use these credentials to authenticate the following nodes:

* [OpenAI](../app-nodes/n8n-nodes-langchain.openai/)
* [Chat OpenAI](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/)
* [Embeddings OpenAI](../cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsopenai.md)
* [LM OpenAI](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create an [OpenAI](https://platform.openai.com/signup/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

* API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [OpenAI's API documentation](https://platform.openai.com/docs/introduction) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

* An **API Key**
* An **Organization ID**: Required if you belong to multiple organizations; otherwise, leave this blank.

To generate your API Key:

1. Login to your OpenAI account or [create](https://platform.openai.com/signup/) an account.
2. Open your [API keys](https://platform.openai.com/api-keys) page.
3. Select **Create new secret key** to create an API key, optionally naming the key.
4. Copy your key and add it as the **API Key** in n8n.

Refer to the [API Quickstart Account Setup documentation](https://platform.openai.com/docs/quickstart/account-setup) for more information.

To find your Organization ID:

1. Go to your [Organization Settings](https://platform.openai.com/account/organization) page.
2. Copy your Organization ID and add it as the **Organization ID** in n8n.

Refer to [Setting up your organization](https://platform.openai.com/docs/guides/production-best-practices/setting-up-your-organization) for more information. Note that API requests made using an Organization ID will count toward the organization's subscription quota.
