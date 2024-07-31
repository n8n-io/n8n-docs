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


## Prerequisites

Create a [Spotify Developer](https://developer.spotify.com/){:target=_blank .external-link} account.

## Supported authentication methods

- OAuth2

## Related resources

Refer to [Spotify's Web API documentation](https://developer.spotify.com/documentation/web-api){:target=_blank .external-link} for more information about the service.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure OAuth2 from scratch, [create a Spotify app](https://developer.spotify.com/documentation/web-api/concepts/apps){:target=_blank .external-link}.

Use these settings for your app:

- Copy the **OAuth Redirect URL** from n8n and use this as the app's **Redirect URI**.
- Copy the **Client ID** and **Client Secret** from your app and add them to n8n.

