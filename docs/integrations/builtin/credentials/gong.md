---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Gong credentials
description: Documentation for the Gong credentials. Use these credentials to authenticate Gong in n8n, a workflow automation platform.
contentType: integration
---

# Gong credentials

You can use these credentials to authenticate the following nodes:

* [Gong](/integrations/builtin/app-nodes/n8n-nodes-base.gong/)

## Supported authentication methods

- API access token
- OAuth2

## Related resources

Refer to [Gong's API documentation](https://gong.app.gong.io/settings/api/documentation){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need a [Gong](https://app.gong.io/welcome/sign-in) account and:

- An **Access Key**
- An **Access Key Secret**

You can create both of these items on the [Gong API Page](https://app.gong.io/company/api) (you must be a technical administrator in Gong to access this resource).

Refer to [Gong's API documentation](https://gong.app.gong.io/settings/api/documentation){:target=_blank .external-link} for more information about authenticating to the service.

## Using OAuth2

To configure this credential, you'll need a [Gong](https://app.gong.io/welcome/sign-in) account, a [Gong developer](https://gong.partnerfleet.app/application_forms/become-a-gong-technology-partner/partner_applications/new) account and:

* A **Client ID**: Generated when you create an Oauth app for Gong.
* A **Client Secret**: Generated when you create an Oauth app for Gong.

If you're [self-hosting](/hosting/) n8n, you'll need to [create an app](https://help.gong.io/docs/create-an-app-for-gong) to configure OAuth2. Refer to [Gong's OAuth documentation](https://gong.app.gong.io/settings/api/documentation){:target=_blank .external-link} for more information about setting up OAuth2.
