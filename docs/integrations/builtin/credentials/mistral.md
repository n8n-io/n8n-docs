---
title: Mistral Cloud credentials
description: Documentation for the Mistral Cloud credentials. Use these credentials to authenticate Mistral Cloud in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Mistral Cloud credentials

You can use these credentials to authenticate the following nodes:

* [Mistral AI](/integrations/builtin/app-nodes/n8n-nodes-base.mistralai.md)
* [Mistral Cloud](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatmistralcloud.md)
* [Embeddings Mistral Cloud](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsmistralcloud.md)

## Prerequisites

<!-- vale off -->
- Create a [Mistral](https://mistral.ai/) La Plateforme account.
- You must add payment information in **Workspace >** [**Billing**](https://admin.mistral.ai/organization/billing) and activate payments to enable API keys. Refer to [Account setup](https://docs.mistral.ai/getting-started/quickstart/#account-setup) for more information.
<!-- vale on -->

## Supported authentication methods

- API key

## Related resources

Refer to [Mistral's API documentation](https://docs.mistral.ai/api/) for more information about the APIs.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need:

- An **API Key**

Once you've added payment information to your Mistral Cloud account:

1. Sign in to your [Mistral account](https://console.mistral.ai/home).
2. Go to the **API Keys** page.
3. Select **Create new key**.
4. Copy the API key and enter it in your n8n credential.

Refer to [Account setup](https://docs.mistral.ai/getting-started/quickstart/#account-setup) for more information.

/// note | Paid account required
Mistral requires you to add payment information and activate payments to use API keys. Refer to the [Prerequisites](#prerequisites) section above for more information.
