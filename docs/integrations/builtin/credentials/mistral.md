---
title: Mistral Cloud credentials
description: >-
  Documentation for the Mistral Cloud credentials. Use these credentials to
  authenticate Mistral Cloud in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Mistral Cloud credentials
originalFilePath: integrations/builtin/credentials/mistral.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/mistral'
url: 'https://docs.n8n.io/integrations/builtin/credentials/mistral'
layout:
  description:
    visible: false
---

# Mistral Cloud credentials <a href="#mistral-cloud-credentials" id="mistral-cloud-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Mistral AI](../app-nodes/n8n-nodes-base.mistralai.md)
* [Mistral Cloud](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatmistralcloud.md)
* [Embeddings Mistral Cloud](../cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsmistralcloud.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>


- Create a [Mistral](https://mistral.ai/) La Plateforme account.
- You must add payment information in **Workspace >** [**Billing**](https://admin.mistral.ai/organization/billing) and activate payments to enable API keys. Refer to [Account setup](https://docs.mistral.ai/getting-started/quickstart/#account-setup) for more information.


## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Mistral's API documentation](https://docs.mistral.ai/api/) for more information about the APIs.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**

Once you've added payment information to your Mistral Cloud account:

1. Sign in to your [Mistral account](https://console.mistral.ai/home).
2. Go to the **API Keys** page.
3. Select **Create new key**.
4. Copy the API key and enter it in your n8n credential.

Refer to [Account setup](https://docs.mistral.ai/getting-started/quickstart/#account-setup) for more information.

{% hint style="info" %}
**Paid account required**

Mistral requires you to add payment information and activate payments to use API keys. Refer to the [Prerequisites](#prerequisites) section above for more information.
{% endhint %}
