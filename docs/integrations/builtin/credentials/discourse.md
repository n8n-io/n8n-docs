---
title: Discourse credentials
description: >-
  Documentation for Discourse credentials. Use these credentials to authenticate
  Discourse in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Discourse credentials
originalFilePath: integrations/builtin/credentials/discourse.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/discourse'
url: 'https://docs.n8n.io/integrations/builtin/credentials/discourse'
layout:
  description:
    visible: false
---

# Discourse credentials <a href="#discourse-credentials" id="discourse-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Discourse](../app-nodes/n8n-nodes-base.discourse.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

- Host an instance of [Discourse](https://discourse.org/)
- Create an account on your hosted instance and make sure that you are an admin

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Discourse's API documentation](https://docs.discourse.org/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- The **URL** of your Discourse instance, for example `https://community.n8n.io`
- An **API Key**: Create an API key through the Discourse admin panel. Refer to the [Discourse create and configure an API key documentation](https://meta.discourse.org/t/create-and-configure-an-api-key/230124) for instructions on creating an API key and specifying a username.
- A **Username**: Use your own name, `system`, or another user.

Refer to the Authentication section of the [Discourse API documentation](https://docs.discourse.org/) for examples.


