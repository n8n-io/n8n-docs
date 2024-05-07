---
title: Bitly credentials
description: Documentation for Bitly credentials. Use these credentials to authenticate Bitly in n8n, a workflow automation platform.
contentType: integration
---

# Bitly credentials

You can use these credentials to authenticate the following node:

- [Bitly](/integrations/builtin/app-nodes/n8n-nodes-base.bitly/)

## Prerequisites

Create a [Bitly](https://www.bitly.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API token
- OAuth2

## Related resources

Refer to [Bitly's API documentation](https://dev.bitly.com/){:target=_blank .external-link} for more information about the service.

## Using API token

To configure this credential, you'll need:

- An **Access Token**: Once logged in, visit [Settings > Developer Settings > API](https://app.bitly.com/settings/api/){:target=_blank .external-link} to generate an Access Token.


## Using OAuth2

/// note | Note for n8n Cloud users
You'll only need to enter the Credentials Name and select the **Connect my account** button in the OAuth credential to connect your Bitly account to n8n.
///

Should you need to configure OAuth2 from scratch or need more detail on what's happening in the OAuth web flow, refer to the [Bitly API Authentication documentation](https://dev.bitly.com/docs/getting-started/authentication/){:target=_blank .external-link} for more information.

