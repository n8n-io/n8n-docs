---
title: Groq credentials
description: >-
  Documentation for the Groq credentials. Use these credentials to authenticate
  Groq in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Groq credentials
originalFilePath: integrations/builtin/credentials/groq.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/groq'
url: 'https://docs.n8n.io/integrations/builtin/credentials/groq'
layout:
  description:
    visible: false
---

# Groq credentials <a href="#groq-credentials" id="groq-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Groq Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgroq.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Groq](https://groq.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Groq's documentation](https://console.groq.com/docs/quickstart) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**

To get your API key:

1. Go to the [API Keys](https://console.groq.com/keys) page of your Groq console.
2. Select **Create API Key**.
3. Enter a **display name** for the key, like `n8n integration`, and select **Submit**.
4. Copy the key and paste it into your n8n credential.

Refer to [Groq's API Keys documentation](https://console.groq.com/docs/quickstart) for more information.

{% hint style="info" %}
**Groq API keys**

Groq binds API keys to the organization, not the user.
{% endhint %}
