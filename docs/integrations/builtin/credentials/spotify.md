---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Spotify credentials
description: Documentation for Spotify credentials. Use these credentials to authenticate Spotify in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Spotify credentials

You can use these credentials to authenticate the following nodes:

- [Spotify](/integrations/builtin/app-nodes/n8n-nodes-base.spotify/)

## Supported authentication methods

- OAuth2

## Related resources

Refer to [Spotify's Web API documentation](https://developer.spotify.com/documentation/web-api){:target=_blank .external-link} for more information about the service.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you're [self-hosting](/hosting/) n8n, you'll need a [Spotify Developer](https://developer.spotify.com/){:target=_blank .external-link} account so you can create a Spotify app:

1. Open the [Spotify developer dashboard](https://developer.spotify.com/dashboard){:target=_blank .external-link}.
2. Select **Create an app**.
3. Enter an **App name**, like `n8n integration`.
4. Enter an **App description**.
5. Copy the **OAuth Redirect URL** from n8n and enter it as the **Redirect URI** in your Spotify app.
6. Check the box to agree to the Spotify Terms of Service and Branding Guidelines.
7. Select **Create**. The **App overview** page opens.
8. Copy the **Client ID** and enter it in your n8n credential.
9. Copy the **Client Secret** and enter it in your n8n credential.
10. Select **Connect my account** and follow the on-screen prompts to finish authorizing the credential.

Refer to [Spotify Apps](https://developer.spotify.com/documentation/web-api/concepts/apps){:target=_blank .external-link} for more information.
