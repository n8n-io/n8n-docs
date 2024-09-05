---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Mistral Cloud credentials
description: Documentation for the Mistral Cloud credentials. Use these credentials to authenticate Mistral Cloud in n8n, a workflow automation platform.
priority: medium
---

# Mistral Cloud credentials

You can use these credentials to authenticate the following nodes:

* [Mistral Cloud](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatmistralcloud/)
* [Embeddings Mistral Cloud](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsmistralcloud/)

## Prerequisites

<!-- vale off -->
- Create a [Mistral](https://mistral.ai/){:target=_blank .external-link} La Plateforme account.
- You must add payment information in **Workspace >** [**Billing**](https://console.mistral.ai/billing/){:target=_blank .external-link} and activate payments to enable API keys. Refer to [Account setup](https://docs.mistral.ai/getting-started/quickstart/#account-setup){:target=_blank .external-link} for more information.
<!-- vale on -->

## Supported authentication methods

- API key

## Related resources

Refer to [Mistral's API documentation](https://docs.mistral.ai/api/){:target=_blank .external-link} for more information about the APIs.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need:

- An **API Key**

Once you've added payment information to your Mistral Cloud account:

1. Sign in to your [Mistral account](https://console.mistral.ai/){:target=_blank .external-link}.
2. Go to the **API Keys** page.
3. Select **Create new key**.
4. Copy the API key and enter it in your n8n credential.

Refer to [Account setup](https://docs.mistral.ai/getting-started/quickstart/#account-setup){:target=_blank .external-link} for more information.

/// note | Paid account required
Mistral requires you to add payment information and activate payments to use API keys. Refer to the [Prerequisites](#prerequisites) section above for more information.
