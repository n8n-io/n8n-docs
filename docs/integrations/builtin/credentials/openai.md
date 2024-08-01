---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: OpenAI credentials
description: Documentation for OpenAI credentials. Use these credentials to authenticate OpenAI in n8n, a workflow automation platform.
contentType: integration
priority: critical
---

# OpenAI credentials

You can use these credentials to authenticate the following nodes:

- [OpenAI](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/)
- [Chat OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai)
- [Embeddings OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsopenai)
- [LM OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenai)

## Prerequisites

Create an [OpenAI](https://platform.openai.com/signup/){:target=_blank .external-link} account.

## Supported authentication methods

- API key

## Related resources

Refer to [OpenAI's API documentation](https://platform.openai.com/docs/introduction){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**
- An **Organization ID**: Required if you belong to multiple organizations; otherwise, leave this blank.

To generate your API Key:

1. Login to your OpenAI account or [create](https://platform.openai.com/signup/){:target=_blank .external-link} an account.
2. Open your [API keys](https://platform.openai.com/api-keys){:target=_blank .external-link} page.
3. Select **Create new secret key** to create an API key, optionally naming the key.
4. Copy your key and add it as the **API Key** in n8n.

Refer to the [API Quickstart Account Setup documentation](https://platform.openai.com/docs/quickstart/account-setup){:target=_blank .external-link} for more information.

To find your Organization ID:

1. Go to your [Organization Settings](https://platform.openai.com/account/organization){:target=_blank .external-link} page.
2. Copy your Organization ID and add it as the **Organization ID** in n8n.

Refer to [Setting up your organization](https://platform.openai.com/docs/guides/production-best-practices/setting-up-your-organization){:target=_blank .external-link} for more information. Note that API requests made using an Organization ID will count toward the organization's subscription quota.

