---
title: Drift credentials
description: >-
  Documentation for Drift credentials. Use these credentials to authenticate
  Drift in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Drift credentials
originalFilePath: integrations/builtin/credentials/drift.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/drift'
url: 'https://docs.n8n.io/integrations/builtin/credentials/drift'
layout:
  description:
    visible: false
---

# Drift credentials <a href="#drift-credentials" id="drift-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Drift](../app-nodes/n8n-nodes-base.drift.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

- Create a [Drift](https://www.drift.com/) account.
- [Create a Drift app](https://devdocs.drift.com/docs/quick-start#3-install-it-to-your-drift-account-).

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API personal access token
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Drift's API documentation](https://devdocs.drift.com/docs/using-drift-apis) for more information about the service.

## Using API personal access token <a href="#using-api-personal-access-token" id="using-api-personal-access-token"></a>

To configure this credential, you'll need:

- A **Personal Access Token**: To get a token, [create a Drift app](https://devdocs.drift.com/docs/quick-start#3-install-it-to-your-drift-account-). [Install the app](https://devdocs.drift.com/docs/quick-start#3-install-it-to-your-drift-account-) to generate an OAuth Access token. Add this to the n8n credential as your **Personal Access Token**.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/8WBawhAsMzeYnydxU5Sr/" %}

If you need to configure OAuth2 from scratch or need more detail on what's happening in the OAuth web flow, refer to the instructions in the [Drift Authentication and Scopes documentation](https://devdocs.drift.com/docs/authentication-and-scopes) to set up OAuth for your app.
