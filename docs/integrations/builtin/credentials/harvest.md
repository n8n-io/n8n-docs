---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Harvest credentials
description: Documentation for Harvest credentials. Use these credentials to authenticate Harvest in n8n, a workflow automation platform.
contentType: integration
---

# Harvest credentials

You can use these credentials to authenticate the following nodes:

- [Harvest](/integrations/builtin/app-nodes/n8n-nodes-base.harvest/)

## Prerequisites

Create a [Harvest](https://www.getharvest.com/) account.

## Supported authentication methods

- API access token
- OAuth2

## Related resources

Refer to [Harvest's API documentation](https://help.getharvest.com/api-v2/){:target=_blank .external-link} for more information about the service.

## Using API Access Token

To configure this credential, you'll need:

- A Personal **Access Token**: Refer to the [Harvest Personal Access Token Authentication documentation](https://help.getharvest.com/api-v2/authentication-api/authentication/authentication/#personal-access-tokens){:target=_blank .external-link} for instructions on creating a personal access token.


## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure OAuth2 from scratch or need more detail on what's happening in the OAuth web flow, refer to the instructions in the [Harvest OAuth2 documentation](https://help.getharvest.com/api-v2/authentication-api/authentication/authentication/#oauth2-application){:target=_blank .external-link} to set up OAuth.

