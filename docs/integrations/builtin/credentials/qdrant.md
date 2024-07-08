---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Qdrant credentials
description: Documentation for the Qdrant credentials. Use these credentials to authenticate Qdrant in n8n, a workflow automation platform.
contentType: integration
---

# Qdrant credentials

You can use these credentials to authenticate the following nodes:

* [Qdrant Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreqdrant/)


## Prerequisites

Create a [Qdrant cluster](https://qdrant.tech/documentation/cloud/create-cluster/){:target=_blank .external-link}.

## Supported authentication methods

- API key

## Related resources

Refer to [Qdrant's documentation](https://qdrant.tech/documentation/){:target=_blank .external-link} for more information.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need:

- An **API Key**: Create an API key from your **Cloud Dashboard > Access Management**. Refer to [Qdrant's authentication documentation](https://qdrant.tech/documentation/cloud/authentication/){:target=_blank .external-link} for more information.
- A **Qdrant URL**: The URL for your Qdrant cluster. Refer to [Qdrant Web UI](https://qdrant.tech/documentation/interfaces/web-ui/){:target=_blank .external-link} for more information.
