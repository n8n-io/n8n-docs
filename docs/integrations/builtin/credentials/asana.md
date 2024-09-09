---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Asana credentials
description: Documentation for Asana credentials. Use these credentials to authenticate Asana in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Asana credentials

You can use these credentials to authenticate the following nodes:

- [Asana](/integrations/builtin/app-nodes/n8n-nodes-base.asana/)
- [Asana Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.asanatrigger/)

## Supported authentication methods

- Access token
- OAuth2

## Related resources

Refer to [Asana's Developer Guides](https://developers.asana.com/docs/overview){:target=_blank .external-link} for more information about working with the service.

## Using Access token

To configure this credential, you'll need an [Asana](https://asana.com/){:target=_blank .external-link} account and:

- A Personal **Access Token** (PAT)

To get your PAT:

1. Open the Asana [developer console](https://app.asana.com/0/my-apps){:target=_blank .external-link}.
2. In the **Personal access tokens** section, select **Create new token**.
3. Enter a **Token name**, like `n8n integration`.
4. Check the box to agree to the **Asana API terms**.
5. Select **Create token**.
6. Copy the token and enter it as the **Access Token** in your n8n credential.

Refer to the [Asana Quick start guide](https://developers.asana.com/docs/quick-start#setup){:target=_blank .external-link} for more information.

## Using OAuth2

To configure this credential, you'll need an [Asana](https://asana.com/){:target=_blank .external-link} account.

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you're [self-hosting](/hosting/) n8n, you'll need to register an application to set up OAuth:

1. Open the Asana [developer console](https://app.asana.com/0/my-apps){:target=_blank .external-link}.
2. In the **My apps** section, select **Create new app**.
3. Enter an **App name** for your application, like `n8n integration`.
4. Select a purpose for your app.
5. Check the box to agree to the **Asana API terms**.
6. Select **Create app**. The page opens to the app's **Basic Information**.
7. Select **OAuth** from the left menu.
8. In n8n, copy the **OAuth Redirect URL**.
9. In Asana, select **Add redirect URL** and enter the URL you copied from n8n.
7. Copy the **Client ID** from Asana and enter it in your n8n credential.
8. Copy the **Client Secret** from Asana and enter it in your n8n credential.

Refer to the [Asana OAuth register an application documentation](https://developers.asana.com/docs/oauth#register-an-application){:target=_blank .external-link} for more information.
