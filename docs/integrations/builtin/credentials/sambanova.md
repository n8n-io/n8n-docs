---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: SambaNova credentials
description: Documentation for the SambaNova credentials. Use these credentials to authenticate SambaNova in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# SambaNova credentials

You can use these credentials to authenticate the following nodes:

* [SambaNova Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatsambanova.md)

## Prerequisites

Create a [SambaNova Cloud](http://cloud.sambanova.ai?utm_source=n8n&utm_medium=external&utm_campaign=cloud_signup)){:target=_blank .external-link} account.

## Supported authentication methods

- API key

## Related resources

Refer to [SambaNova's documentation](https://docs.sambanova.ai/cloud/docs/get-started/quickstart){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need:

- An **API Key**

To get your API key:

1. Go to the [API Keys](https://cloud.sambanova.ai/apis) page of SambaNova cloud.
2. Select **Create API Key**.
3. Enter a **name** for the key, like `n8n integration`, and select **Create API Key**.
4. Copy the key and paste it into your n8n credential.

Refer to [SambaNova's API Keys documentation](https://docs.sambanova.ai/cloud/docs/get-started/quickstart){:target=_blank .external-link} for more information.