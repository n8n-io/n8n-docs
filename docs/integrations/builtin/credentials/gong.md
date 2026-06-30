---
title: Gong credentials
description: >-
  Documentation for the Gong credentials. Use these credentials to authenticate
  Gong in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Gong credentials
originalFilePath: integrations/builtin/credentials/gong.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/gong'
url: 'https://docs.n8n.io/integrations/builtin/credentials/gong'
layout:
  description:
    visible: false
---

# Gong credentials <a href="#gong-credentials" id="gong-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Gong](../app-nodes/n8n-nodes-base.gong.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API access token
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Gong's API documentation](https://gong.app.gong.io/settings/api/documentation) for more information about the service.

## Using API access token <a href="#using-api-access-token" id="using-api-access-token"></a>

To configure this credential, you'll need a [Gong](https://app.gong.io/welcome/sign-in) account and:

- An **Access Key**
- An **Access Key Secret**

You can create both of these items on the [Gong API Page](https://app.gong.io/company/api) (you must be a technical administrator in Gong to access this resource).

Refer to [Gong's API documentation](https://gong.app.gong.io/settings/api/documentation) for more information about authenticating to the service.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

To configure this credential, you'll need a [Gong](https://app.gong.io/welcome/sign-in) account, a [Gong developer](https://gong.partnerfleet.app/application_forms/become-a-gong-technology-partner/partner_applications/new) account and:

* A **Client ID**: Generated when you create an Oauth app for Gong.
* A **Client Secret**: Generated when you create an Oauth app for Gong.

If you're [self-hosting](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n) n8n, you'll need to [create an app](https://help.gong.io/docs/create-an-app-for-gong) to configure OAuth2. Refer to [Gong's OAuth documentation](https://gong.app.gong.io/settings/api/documentation) for more information about setting up OAuth2.
