---
title: ClickUp credentials
description: Documentation for ClickUp credentials. Use these credentials to authenticate ClickUp in n8n, a workflow automation platform.
contentType: integration
---

# ClickUp credentials

You can use these credentials to authenticate the following nodes:

- [ClickUp](/integrations/builtin/app-nodes/n8n-nodes-base.clickup/)
- [ClickUp Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.clickuptrigger/)

## Prerequisites

Create a [ClickUp](https://www.clickup.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API access token
- OAuth2

## Related resources

Refer to [ClickUp's documentation](https://clickup.com/api/){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need:

- A Personal API **Access Token**: Refer to [ClickUp's Personal Token documentation](https://clickup.com/api/developer-portal/authentication#personal-token){:target=_blank .external-link} for instructions on getting a personal token. Add that personal token as the **Access Token** in the n8n credential.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure OAuth2 from scratch or need more detail on what's happening in the OAuth web flow, refer to the instructions in the [ClickUp Oauth flow documentation](https://clickup.com/api/developer-portal/authentication#oauth-flow){:target=_blank .external-link} to create an OAuth app and get the necessary information.
