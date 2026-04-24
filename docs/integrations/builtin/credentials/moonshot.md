---
title: Moonshot credentials
description: Documentation for Moonshot credentials. Use these credentials to authenticate Moonshot in n8n, a workflow automation platform.
contentType: [integration, reference]
---


# Moonshot credentials

You can use these credentials to authenticate the following nodes:

* [Moonshot Kimi](/integrations/builtin/app-nodes/n8n-nodes-langchain.moonshot.md)
* [Moonshot Kimi Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatmoonshot.md)


## Prerequisites

Create a [Kimi API Platform account](https://platform.kimi.ai/).

## Supported authentication methods

- API key

## Related resources

Refer to [Moonshot's documentation](https://platform.kimi.ai/docs/) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need a [Kimi API Platform](https://platform.kimi.ai/) account and an API key:

1. In the [Kimi API Platform console](https://platform.kimi.ai/console/api-keys), select **API Keys**.
2. Select **Create API Key**.
3. Enter a **name** and **project** for the API key.
4. Copy the API key and enter it in your n8n credential.