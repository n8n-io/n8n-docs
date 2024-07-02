---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Mailchimp credentials
description: Documentation for Mailchimp credentials. Use these credentials to authenticate Mailchimp in n8n, a workflow automation platform.
contentType: integration
---

# Mailchimp credentials

You can use these credentials to authenticate the following nodes:

- [Mailchimp](/integrations/builtin/app-nodes/n8n-nodes-base.mailchimp/)
- [Mailchimp Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.mailchimptrigger/)

## Prerequisites

Create a [Mailchimp](https://www.mailchimp.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API key
- OAuth2

Refer to [Selecting an authentication method](#selecting-an-authentication-method) for guidance on which method to use.

## Related resources

Refer to [Mailchimp's API documentation](https://mailchimp.com/developer/marketing/api/){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Generate an API key in the [API keys section](https://us1.admin.mailchimp.com/account/api/){:target=_blank .external-link} of your Mailchimp account. Refer to [Mailchimp's Generate your API key documentation](https://mailchimp.com/developer/marketing/guides/quick-start/#generate-your-api-key){:target=_blank .external-link} for more detailed instructions.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure OAuth2 from scratch, [register an application](https://mailchimp.com/developer/marketing/guides/access-user-data-oauth-2/#register-your-application){:target=_blank .external-link}. Refer to the [Mailchimp OAuth2 documentation](https://mailchimp.com/developer/marketing/guides/access-user-data-oauth-2/){:target=_blank .external-link} for more information.

## Selecting an authentication method

Mailchimp suggests using an API key if you're only accessing your own Mailchimp account's data:

> Use an API key if you're writing code that tightly couples _your_ application's data to _your_ Mailchimp account's data. If you ever need to access _someone else's_ Mailchimp account's data, you should be using OAuth 2 ([source](https://mailchimp.com/developer/marketing/guides/access-user-data-oauth-2/#when-not-to-use-oauth-2){:target=_blank .external-link})

