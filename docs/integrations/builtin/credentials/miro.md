---
title: Miro credentials
description: >-
  Documentation for the Miro credentials. Use these credentials to authenticate
  Miro in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Miro credentials
originalFilePath: integrations/builtin/credentials/miro.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/miro'
url: 'https://docs.n8n.io/integrations/builtin/credentials/miro'
layout:
  description:
    visible: false
---

# Miro credentials <a href="#miro-credentials" id="miro-credentials"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/7QbEnpnpOks3Rq0SiMFb/" %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Miro](https://miro.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

* OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Miro's API documentation](https://developers.miro.com/reference/overview) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](../custom-api-actions-for-existing-nodes.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/miro/) on n8n's website.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need a [Miro](https://miro.com/login/) account and app, as well as:

- A **Client ID**: Generated when you create a new OAuth2 application.
- A **Client Secret**: Generated when you create a new OAuth2 application.

Refer to [Miro's API documentation](https://developers.miro.com/reference/overview) for more information about authenticating to the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/HoGXnGIfupVt81dGox48/" %}

If you're [self-hosting](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n) n8n, you'll need to [create an app](https://developers.miro.com/docs/rest-api-build-your-first-hello-world-app) to configure OAuth2. Refer to [Miro's OAuth documentation](https://developers.miro.com/docs/getting-started-with-oauth) for more information about setting up OAuth2.
