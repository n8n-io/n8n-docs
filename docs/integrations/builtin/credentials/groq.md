---
title: Groq credentials
description: Documentation for the Groq credentials. Use these credentials to authenticate Groq in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Groq credentials

You can use these credentials to authenticate the following nodes:

* [Groq Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgroq.md)

## Prerequisites

Create a [Groq](https://groq.com/) account.

## Supported authentication methods

- API key

## Related resources

Refer to [Groq's documentation](https://console.groq.com/docs/quickstart) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need:

- An **API Key**

To get your API key:

1. Go to the [API Keys](https://console.groq.com/keys) page of your Groq console.
2. Select **Create API Key**.
3. Enter a **display name** for the key, like `n8n integration`, and select **Submit**.
4. Copy the key and paste it into your n8n credential.

Refer to [Groq's API Keys documentation](https://console.groq.com/docs/quickstart) for more information.

/// note | Groq API keys
Groq binds API keys to the organization, not the user.
///
