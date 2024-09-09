---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Motorhead credentials
description: Documentation for the Motorhead credentials. Use these credentials to authenticate Motorhead in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Motorhead credentials

You can use these credentials to authenticate the following nodes:

* [Motorhead](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymotorhead/)

## Supported authentication methods

- API key

## Related resources

Refer to [Motorhead's API documentation](https://docs.getmetal.io/rest-api/introduction){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need a [Motorhead](https://www.metal.ai/){:target=_blank .external-link} account and:

- Your **Host** URL
- An **API Key**
- A **Client ID**

To set it up, you'll generate an API key:

1. If you're self-hosting Motorhead, update the **Host** URL to match your Motorhead URL.
2. In Motorhead, go to [**Settings > Organization**](https://app.getmetal.io/settings/organization){:target=_blank .external-link}.
3. In the **API Keys** section, select **Create**.
4. Enter a **Name** for your API Key, like `n8n integration`.
5. Select **Generate**.
6. Copy the **apiKey** and enter it in your n8n credential.
7. Return to the API key list.
8. Copy the **clientID** for the key and enter it as the **Client ID** in your n8n credential.

Refer to [Generate an API key](https://docs.getmetal.io/guides/misc-get-keys){:target=_blank .external-link} for more information.
