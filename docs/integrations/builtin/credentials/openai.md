---
title: OpenAI credentials
description: Documentation for OpenAI credentials. Use these credentials to authenticate OpenAI in n8n, a workflow automation platform.
contentType: integration
---

# OpenAI credentials

You can use these credentials to authenticate the following nodes:

- [OpenAI](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/)
- [Chat OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai)
- [Embeddings OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsopenai)
- [LM OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenai)

## Prerequisites

Create an [OpenAI](https://openai.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API key

## Related resources

Refer to [OpenAI's API documentation](https://platform.openai.com/docs/introduction){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: From your OpenAI account, open the [API keys](https://platform.openai.com/api-keys){:target=_blank .external-link} page to create an API key. Refer to the [API Quickstart Account Setup documentation](https://platform.openai.com/docs/quickstart/account-setup){:target=_blank .external-link} for more information.
- An **Organization ID**: Required if you belong to multiple organizations; otherwise, leave this blank.
    - Go to your [Organization Settings](https://platform.openai.com/account/organization) page to get your Organization ID. Refer to [Setting up your organization](https://platform.openai.com/docs/guides/production-best-practices/setting-up-your-organization) for more information.
    - API requests made using an Organization ID will count toward the organization's subscription quota.

