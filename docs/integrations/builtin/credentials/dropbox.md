---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Dropbox credentials
description: Documentation for Dropbox credentials. Use these credentials to authenticate Dropbox in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Dropbox credentials

You can use these credentials to authenticate the following nodes:

- [Dropbox](/integrations/builtin/app-nodes/n8n-nodes-base.dropbox/)

## Supported authentication methods

- API access token: Dropbox recommends this method for testing with your user account and granting a limited number of users access.
- OAuth2: Dropbox recommends this method for production or for testing with more than 50 users.

/// note | App reuse
You can transition an app from the API access token to OAuth2 by creating a new credential in n8n for OAuth2 using the same app.
///

## Related resources

Refer to [Dropbox's Developer documentation](https://www.dropbox.com/developers/documentation){:target=_blank .external-link} for more information about the service.

## Using access token

To configure this credential, you'll need a [Dropbox](https://www.dropbox.com/developers){:target=_blank .external-link} developer account and:

- An **Access Token**: Generated once you create a Dropbox app.
- An **App Access Type**

To set up the credential, create a Dropbox app:

1. Open the [App Console](https://www.dropbox.com/developers/apps){:target=_blank .external-link} within the Dropbox developer portal.
2. Select **Create app**.
3. In **Choose an API**, select **Scoped access**.
4. In **Choose the type of access you need**, choose whichever option best fits your use of the [Dropbox](/integrations/builtin/app-nodes/n8n-nodes-base.dropbox/) node:
    - **App Folder** grants access to a single folder created specifically for your app.
    - **Full Dropbox** grants access to all files and folders in your user's Dropbox.
    - Refer to the [DBX Platform developer guide](https://www.dropbox.com/developers/reference/developer-guide){:target=_blank .external-link} for more information.
5. In **Name your app**, enter a name for your app, like `n8n integration`.
6. Check the box to agree to the **Dropbox API Terms and Conditions**.
7. Select **Create app**. The app's **Settings** open.
8. In the **OAuth 2** section, in **Generated access token**, select **Generate**.
9. Copy the access token and enter it as the **Access Token** in your n8n credential.
10. In n8n, select the same **App Access Type** you selected for your app.

Refer to the [Dropbox App Console Settings documentation](https://www.dropbox.com/developers/reference/getting-started){:target=_blank .external-link} for more information.

/// warning | User limits
On the **Settings** tab, you can add other users to your app, even with the access token method. Once your app links 50 Dropbox users, you will have two weeks to apply for and receive production status approval before Dropbox freezes your app from linking more users.
///

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

Cloud users need to select the **App Access Type**:

- **App Folder** grants access to a single folder created specifically for your app.
- **Full Dropbox** grants access to all files and folders in your user's Dropbox.
- Refer to the [DBX Platform developer guide](https://www.dropbox.com/developers/reference/developer-guide){:target=_blank .external-link} for more information.

If you're [self-hosting](/hosting/) n8n, you'll need to configure OAuth2 manually:

1. Open the [App Console](https://www.dropbox.com/developers/apps){:target=_blank .external-link} within the Dropbox developer portal.
2. Select **Create app**.
3. In **Choose an API**, select **Scoped access**.
4. In **Choose the type of access you need**, choose whichever option best fits your use of the [Dropbox](/integrations/builtin/app-nodes/n8n-nodes-base.dropbox/) node:
    - **App Folder** grants access to a single folder created specifically for your app.
    - **Full Dropbox** grants access to all files and folders in your user's Dropbox.
    - Refer to the [DBX Platform developer guide](https://www.dropbox.com/developers/reference/developer-guide){:target=_blank .external-link} for more information.
5. In **Name your app**, enter a name for your app, like `n8n integration`.
6. Check the box to agree to the **Dropbox API Terms and Conditions**.
7. Select **Create app**. The app's **Settings** open.
8. Copy the **App key** and enter it as the **Client ID** in your n8n credential.
9. Copy the **Secret** and enter it as the **Client Secret** in your n8n credential.
10. In n8n, copy the **OAuth Redirect URL** and enter it in the Dropbox **Redirect URIs**.
11. In n8n, select the same **App Access Type** you selected for your app.

Refer to the instructions in the [Dropbox Implementing OAuth documentation](https://developers.dropbox.com/oauth-guide#implementing-oauth){:target=_blank .external-link} for more information.

For internal tools and limited usage, you can keep your app private. But if you'd like your app to be used by more than 50 users or you want to distribute it, you'll need to complete Dropbox's production approval process. Refer to **Production Approval** in the [DBX Platform developer guide](https://www.dropbox.com/developers/reference/developer-guide){:target=_blank .external-link} for more information.

/// warning | User limits
On the **Settings** tab, you can add other users to your app. Once your app links 50 Dropbox users, you will have two weeks to apply for and receive production status approval before Dropbox freezes your app from linking more users.
///
