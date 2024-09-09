---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Pinecone credentials
description: Documentation for the Pinecone credentials. Use these credentials to authenticate Pinecone in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Pinecone credentials

You can use these credentials to authenticate the following nodes:

* [Pinecone Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorepinecone/)

## Supported authentication methods

- API key

## Related resources

Refer to [Pinecone's documentation](https://docs.pinecone.io/reference/api/introduction){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need a [Pinecone](https://www.pinecone.io/){:target=_blank .external-link} account and:

- An **API Key**

To get an API key:

1. Open your [Pinecone console](https://app.pinecone.io/organizations/-/projects){:target=_blank .external-link}.
2. Select the project you want to create an API key for. If you don't have any existing projects, create one. Refer to Pinecone's [Quickstart](https://docs.pinecone.io/guides/get-started/quickstart){:target=_blank .external-link} for more information.
3. Go to **API Keys**.
4. Copy the API Key displayed there and enter it in your n8n credential.

Refer to Pinecone's API [Authentication documentation](https://docs.pinecone.io/guides/get-started/authentication){:target=_blank .external-link} for more information.
