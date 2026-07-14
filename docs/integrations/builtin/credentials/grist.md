---
title: Grist credentials
description: >-
  Documentation for Grist credentials. Use these credentials to authenticate
  Grist in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Grist credentials
originalFilePath: integrations/builtin/credentials/grist.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/grist'
url: 'https://docs.n8n.io/integrations/builtin/credentials/grist'
layout:
  description:
    visible: false
---

# Grist credentials <a href="#grist-credentials" id="grist-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Grist](../app-nodes/n8n-nodes-base.grist.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Grist](https://getgrist.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Grist's API documentation](https://support.getgrist.com/api/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- A **Grist URL**. This points n8n at your Grist server:
    - The default, `https://api.getgrist.com`, works for any account on hosted Grist (getgrist.com).
    - To restrict the connection to a single team, use `https://YOUR_TEAM.getgrist.com`.
    - For a self-managed instance, use its URL, without `/api` and without a trailing slash (for example `https://grist.example.com`).
- An **API Key**: in Grist, open the account menu (top right), then go to **Account settings** > **Developer** to create or copy your API key. Refer to the [Grist API authentication documentation](https://support.getgrist.com/rest-api/#authentication) for more information.

