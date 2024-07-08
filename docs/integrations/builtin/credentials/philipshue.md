---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Philips Hue credentials
description: Documentation for Philips Hue credentials. Use these credentials to authenticate Philips Hue in n8n, a workflow automation platform.
contentType: integration
---

# Philips Hue credentials

You can use these credentials to authenticate the following nodes:

- [Philips Hue](/integrations/builtin/app-nodes/n8n-nodes-base.philipshue/)

## Prerequisites

Create a [Philips Hue](https://www.philips-hue.com/en-us){:target=_blank .external-link} account.

## Supported authentication methods

- OAuth2

## Related resources

Refer to [Philips Hue's CLIP API documentation](https://developers.meethue.com/develop/hue-api-v2/api-reference/){:target=_blank .external-link} for more information about the service.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you're using the built-in OAuth connection, you don't need to enter an **APP ID**.

If you need to configure OAuth2 from scratch, you'll need a [Philips Hue developer](https://developers.meethue.com/){:target=_blank .external-link} account

Create a new remote app on the [Add new Hue Remote API app](https://developers.meethue.com/add-new-hue-remote-api-app/) page.

Use these settings for your app:

- Copy the **OAuth Callback URL** from n8n and add it as a **Callback URL**.
- Copy the **AppId**, **ClientId**, and **ClientSecret** and enter these in the corresponding fields in n8n.
