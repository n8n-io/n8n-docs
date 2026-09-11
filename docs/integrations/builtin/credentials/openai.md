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
  with OpenAI in n8n.
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

{% hint style="info" %}
On n8n Cloud, you can skip setting up OpenAI credentials by selecting **Use Gateway credits** in the credential field of nodes that support it. Refer to [Gateway credits](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/gateway-credits) for details.
{% endhint %}

You can use these credentials to authenticate the following nodes:

* [OpenAI](../app-nodes/n8n-nodes-langchain.openai/README.md)
* [Chat OpenAI](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/README.md)
* [Embeddings OpenAI](../cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsopenai.md)
* [LM OpenAI](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/README.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create an [OpenAI](https://platform.openai.com/signup/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

* API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [OpenAI's API documentation](https://platform.openai.com/docs/introduction) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

* An **API Key**
* A **Base URL** (optional): Override the default `https://api.openai.com/v1` to point at any OpenAI-compatible endpoint. Leave the default for official OpenAI.
* An **Organization ID**: Required if you belong to multiple organizations; otherwise, leave this blank.

### Using an OpenAI-compatible base URL

The OpenAI credential's **Base URL** field accepts any server that implements the OpenAI HTTP API (chat completions, embeddings, and so on). Common cases:

* Self-hosted model runtimes on your own machine or network (for example `http://localhost:11434/v1`)
* Cloud or self-hosted OpenAI-compatible gateways

When you change the Base URL:

1. Paste the endpoint's `/v1` root into **Base URL**.
2. Use an API key issued by that endpoint (not necessarily an OpenAI platform key).
3. Pick a **model name that the endpoint actually serves** — model IDs differ across providers. Call the endpoint's `/v1/models` (or check its docs) if you're unsure.
4. Keep **Organization ID** blank unless the target service uses OpenAI-style org headers.

Expect some variation. OpenAI-compatible endpoints don't all implement the same routes, parameters, and response fields, so a credential test can succeed while a node still fails at runtime or returns unexpected results. If that happens, check that your endpoint supports what the specific node needs.

To generate your API Key:

1. Log in to your OpenAI account or [create](https://platform.openai.com/signup/) an account.
2. Open your [API keys](https://platform.openai.com/api-keys) page.
3. Select **Create new secret key** to create an API key, optionally naming the key.
4. Copy your key and add it as the **API Key** in n8n.

Refer to the [API Quickstart Account Setup documentation](https://platform.openai.com/docs/quickstart/account-setup) for more information.

To find your Organization ID:

1. Go to your [Organization Settings](https://platform.openai.com/account/organization) page.
2. Copy your Organization ID and add it as the **Organization ID** in n8n.

Refer to [Setting up your organization](https://platform.openai.com/docs/guides/production-best-practices/setting-up-your-organization) for more information. Note that API requests made using an Organization ID will count toward the organization's subscription quota.
