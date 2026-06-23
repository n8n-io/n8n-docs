---
title: Milvus credentials
description: >-
  Documentation for the Milvus credentials. Use these credentials to
  authenticate Milvus in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Milvus credentials
originalFilePath: integrations/builtin/credentials/milvus.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/milvus'
url: 'https://docs.n8n.io/integrations/builtin/credentials/milvus'
layout:
  description:
    visible: false
---

# Milvus credentials <a href="#milvus-credentials" id="milvus-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Milvus Vector Store](../cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create and run an [Milvus](https://milvus.io/) instance. Refer to the [Install Milvus](https://milvus.io/docs/install-overview.md) for more information.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Basic auth

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Milvus's Authentication documentation](https://milvus.io/docs/authenticate.md?tab=docker#Authenticate-User-Access) for more information about setting up authentication.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

## Using basic auth <a href="#using-basic-auth" id="using-basic-auth"></a>

To configure this credential, you'll need:

* **Base URL**: The base URL of your Milvus instance. The default is `http://localhost:19530`.
* **Username**: The username to authenticate to your Milvus instance. The default value is `root`.
* **Password**: The password to authenticate to your Milvus instance. The default value is `Milvus`.
