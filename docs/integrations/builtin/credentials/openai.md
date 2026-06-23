---
title: OpenAI credentials
description: Documentation for OpenAI credentials. Use these credentials to authenticate OpenAI in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: critical
---

# OpenAI credentials

You can use these credentials to authenticate the following nodes:

- [OpenAI](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/index.md)
- [Chat OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/index.md)
- [Embeddings OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsopenai.md)
- [LM OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/index.md)

## Prerequisites

Create an [OpenAI](https://platform.openai.com/signup/) account.

## Supported authentication methods

- API key
- OpenAI Account (ChatGPT)

## Related resources

Refer to [OpenAI's API documentation](https://platform.openai.com/docs/introduction) for more information about the service.

## Using OpenAI Account (ChatGPT)

Use this method to connect the [OpenAI Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/index.md) node with your ChatGPT or OpenAI account, without entering an API key.

To configure this credential:

1. In the OpenAI Chat Model node, set **Authentication** to **OpenAI Account**.
2. Create or select an **OpenAI Account (ChatGPT)** credential.
3. Select **Connect**.
4. Open the OpenAI login page shown by n8n.
5. Enter the code shown in n8n on the OpenAI login page.
6. Return to n8n to finish connecting the credential.

## Using API key

To configure this credential, you'll need:

- An **API Key**
- An **Organization ID**: Required if you belong to multiple organizations; otherwise, leave this blank.

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
