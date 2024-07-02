---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Asana credentials
description: Documentation for Asana credentials. Use these credentials to authenticate Asana in n8n, a workflow automation platform.
contentType: integration
---

# Asana credentials

You can use these credentials to authenticate the following nodes:

- [Asana](/integrations/builtin/app-nodes/n8n-nodes-base.asana/)
- [Asana Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.asanatrigger/)


## Prerequisites

Create an [Asana](https://asana.com/){:target=_blank .external-link} account.

## Supported authentication methods

- OAuth2
- API access token

## Related resources

Refer to [Asana's Developer Guides](https://developers.asana.com/docs/overview){:target=_blank .external-link} for more information about working with the service.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure OAuth2 from scratch or need more detail on what's happening in the OAuth web flow, refer to the instructions in the [Asana OAuth register an application documentation](https://developers.asana.com/docs/oauth#register-an-application){:target=_blank .external-link} to create an app and set up OAuth.

Use the following adjustments:

1. Use the n8n **OAuth Callback URL** as the Asana **Redirect URLs**.
2. Use the Asana **Client ID** and **Client secret** in the corresponding fields within n8n.

## Using API access token

To configure this credential, you'll need:

- A Personal **Access Token** (PAT): Refer to the [Asana Quick start guide](https://developers.asana.com/docs/quick-start#setup){:target=_blank .external-link} for the steps to generate a Personal Access Token (PAT).

