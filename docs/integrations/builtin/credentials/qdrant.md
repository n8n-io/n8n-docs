---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Qdrant credentials
description: Documentation for the Qdrant credentials. Use these credentials to authenticate Qdrant in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Qdrant credentials

You can use these credentials to authenticate the following nodes:

* [Qdrant Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreqdrant/)

## Supported authentication methods

- API key

## Related resources

Refer to [Qdrant's documentation](https://qdrant.tech/documentation/){:target=_blank .external-link} for more information.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need a [Qdrant cluster](https://qdrant.tech/documentation/cloud/create-cluster/){:target=_blank .external-link} and:

- An **API Key**
- Your **Qdrant URL**

To set it up:

1. Go to the [Cloud Dashboard](https://qdrant.to/cloud){:target=_blank .external-link}.
2. Select **Access Management** to display available API keys (or go to the **API Keys** section of the **Cluster detail** page).
3. Select **Create**.
4. Select the cluster you want the key to have access to in the dropdown.
5. Select **OK**.
6. Copy the API Key and enter it in your n8n credential.
7. Enter the URL for your Qdrant cluster in the **Qdrant URL**. Refer to [Qdrant Web UI](https://qdrant.tech/documentation/interfaces/web-ui/){:target=_blank .external-link} for more information.

Refer to [Qdrant's authentication documentation](https://qdrant.tech/documentation/cloud/authentication/){:target=_blank .external-link} for more information on creating and using API keys.
