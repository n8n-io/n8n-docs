---
title: Mailchimp credentials
description: >-
  Documentation for Mailchimp credentials. Use these credentials to authenticate
  Mailchimp in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Mailchimp credentials
originalFilePath: integrations/builtin/credentials/mailchimp.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/mailchimp'
url: 'https://docs.n8n.io/integrations/builtin/credentials/mailchimp'
layout:
  description:
    visible: false
---

# Mailchimp credentials <a href="#mailchimp-credentials" id="mailchimp-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Mailchimp](../app-nodes/n8n-nodes-base.mailchimp.md)
- [Mailchimp Trigger](../trigger-nodes/n8n-nodes-base.mailchimptrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Mailchimp](https://www.mailchimp.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key
- OAuth2

Refer to [Selecting an authentication method](#selecting-an-authentication-method) for guidance on which method to use.

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Mailchimp's API documentation](https://mailchimp.com/developer/marketing/api/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: Generate an API key in the [API keys section](https://us1.admin.mailchimp.com/account/api/) of your Mailchimp account. Refer to [Mailchimp's Generate your API key documentation](https://mailchimp.com/developer/marketing/guides/quick-start/#generate-your-api-key) for more detailed instructions.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/8WBawhAsMzeYnydxU5Sr/" %}

If you need to configure OAuth2 from scratch, [register an application](https://mailchimp.com/developer/marketing/guides/access-user-data-oauth-2/#register-your-application). Refer to the [Mailchimp OAuth2 documentation](https://mailchimp.com/developer/marketing/guides/access-user-data-oauth-2/) for more information.

## Selecting an authentication method <a href="#selecting-an-authentication-method" id="selecting-an-authentication-method"></a>

Mailchimp suggests using an API key if you're only accessing your own Mailchimp account's data:

> Use an API key if you're writing code that tightly couples _your_ application's data to _your_ Mailchimp account's data. If you ever need to access _someone else's_ Mailchimp account's data, you should be using OAuth 2 ([source](https://mailchimp.com/developer/marketing/guides/access-user-data-oauth-2/#when-not-to-use-oauth-2))

