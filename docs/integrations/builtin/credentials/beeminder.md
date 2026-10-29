---
title: Beeminder credentials
description: >-
  Documentation for Beeminder credentials. Use these credentials to authenticate
  Beeminder in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Beeminder credentials
originalFilePath: integrations/builtin/credentials/beeminder.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/beeminder'
url: 'https://docs.n8n.io/integrations/builtin/credentials/beeminder'
layout:
  description:
    visible: false
---

# Beeminder credentials <a href="#beeminder-credentials" id="beeminder-credentials"></a>

You can use these credentials to authenticate the following node:

- [Beeminder](../app-nodes/n8n-nodes-base.beeminder.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Beeminder](https://www.beeminder.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API user token

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Beeminder's API documentation](https://api.beeminder.com/#beeminder-api-reference) for more information about the service.

## Using API user token <a href="#using-api-user-token" id="using-api-user-token"></a>

To configure this credential, you'll need:

- A **User** name: Should match the user who the Auth Token is generated for.
- A personal **Auth Token** for that user. Generate this using either method below:
    - In the GUI: From the [Apps & API](https://help.beeminder.com/article/110-apps-and-api#API-token) option within **Account Settings**
    - In the API: From hitting the [`auth_token` API endpoint](https://api.beeminder.com/#auth)

