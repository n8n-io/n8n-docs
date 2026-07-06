---
title: Matrix credentials
description: >-
  Documentation for Matrix credentials. Use these credentials to authenticate
  Matrix in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Matrix credentials
originalFilePath: integrations/builtin/credentials/matrix.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/matrix'
url: 'https://docs.n8n.io/integrations/builtin/credentials/matrix'
layout:
  description:
    visible: false
---

# Matrix credentials <a href="#matrix-credentials" id="matrix-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Matrix](../app-nodes/n8n-nodes-base.matrix.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create an account on a [Matrix](https://matrix.org/) server. Refer to [Creating an account](https://matrix.org/docs/chat_basics/matrix-for-im/#creating-a-matrix-account) for more information.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API access token

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to the [Matrix Specification](https://spec.matrix.org/latest/) for more information about the service.

Refer to the documentation for the specific client you're using to access the Matrix server.

## Using API access token <a href="#using-api-access-token" id="using-api-access-token"></a>

To configure this credential, you'll need:

- An **Access Token**: This token is tied to the account you use to log into Matrix with.
- A **Homeserver URL**: This is the URL of the [homeserver](https://matrix.org/docs/matrix-concepts/elements-of-matrix/#homeserver) you entered when you created your account. n8n prepopulates this with matrix.org's own server; adjust this if you're using a server hosted elsewhere.

Instructions for getting these details vary depending on the client you're using to access the server. Both the **Access Token** and the **Homeserver URL** can most commonly be found in **Settings > Help & About > Advanced**, but refer to your client's documentation for more details. 

