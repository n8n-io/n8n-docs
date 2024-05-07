---
title: Dropbox credentials
description: Documentation for Dropbox credentials. Use these credentials to authenticate Dropbox in n8n, a workflow automation platform.
contentType: integration
---

# Dropbox credentials

You can use these credentials to authenticate the following nodes:

- [Dropbox](/integrations/builtin/app-nodes/n8n-nodes-base.dropbox/)

## Prerequisites

- Create a [Dropbox](https://www.dropbox.com/developers){:target=_blank .external-link} developer account.
- [Create a Dropbox app](https://www.dropbox.com/developers/reference/getting-started?_tk=guides_lp&_ad=guides2&_camp=get_started#app%20console){:target=_blank .external-link}.

## Supported authentication methods

- API access token: For use only with your user account
- OAuth2: For distribution to other users

## Related resources

Refer to [Dropbox's Developer documentation](https://www.dropbox.com/developers/documentation){:target=_blank .external-link} for more information about the service.

## Using access token

To configure this credential, you'll need:

- An **Access Token**: Once you've created your app, access **Settings > OAuth 2** and select the option to **Generate** an access token. Use that access token in your n8n credential. Refer to the [Dropbox App Console Settings documentation](https://www.dropbox.com/developers/reference/getting-started?_tk=guides_lp&_ad=guides2&_camp=get_started#app%20console){:target=_blank .external-link} for more information.
- An **App Access Type**: Choose between **App Folder** and **Full Dropbox**. Your selection should match the **Type of access** you created your app with.

## Using OAuth2

/// note | Note for n8n Cloud users
You'll only need to enter the Credentials Name, select the **App Access Type**, and select the **Connect my account** button in the OAuth credential to connect your Dropbox account to n8n.
///

Should you need to configure OAuth2 from scratch or need more detail on what's happening in the OAuth web flow, refer to the instructions in the [Dropbox Implementing OAuth documentation](https://developers.dropbox.com/oauth-guide#implementing-oauth){:target=_blank .external-link} to set up OAuth.

