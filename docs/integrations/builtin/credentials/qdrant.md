---
title: Qdrant credentials
description: >-
  Documentation for the Qdrant credentials. Use these credentials to
  authenticate Qdrant in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Qdrant credentials
originalFilePath: integrations/builtin/credentials/qdrant.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/qdrant'
url: 'https://docs.n8n.io/integrations/builtin/credentials/qdrant'
layout:
  description:
    visible: false
---

# Qdrant credentials <a href="#qdrant-credentials" id="qdrant-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Qdrant Vector Store](../cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreqdrant.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Qdrant's documentation](https://qdrant.tech/documentation/) for more information.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need a [Qdrant cluster](https://qdrant.tech/documentation/cloud/create-cluster/) and:

- An **API Key**
- Your **Qdrant URL**

To set it up:

1. Go to the [Cloud Dashboard](https://qdrant.to/cloud).
2. Select **Access Management** to display available API keys (or go to the **API Keys** section of the **Cluster detail** page).
3. Select **Create**.
4. Select the cluster you want the key to have access to in the dropdown.
5. Select **OK**.
6. Copy the API Key and enter it in your n8n credential.
7. Enter the URL for your Qdrant cluster in the **Qdrant URL**. Refer to [Qdrant Web UI](https://qdrant.tech/documentation/interfaces/web-ui/) for more information.

Refer to [Qdrant's authentication documentation](https://qdrant.tech/documentation/cloud/authentication/) for more information on creating and using API keys.
