---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Pipedrive credentials
description: Documentation for Pipedrive credentials. Use these credentials to authenticate Pipedrive in n8n, a workflow automation platform.
contentType: integration
---

# Pipedrive credentials

You can use these credentials to authenticate the following nodes:

- [Pipedrive](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/)
- [Pipedrive Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.pipedrivetrigger/)

## Prerequisites

- Create a [Pipedrive](https://pipedrive.com/){:target=_blank .external-link} account.
- For OAuth2 authentication, create a [Pipedrive developer sandbox](https://developers.pipedrive.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API token
- OAuth2

## Related resources

Refer to [Pipedrive's developer documentation](https://pipedrive.readme.io/docs/getting-started){:target=_blank .external-link} for more information about the service.

## Using API token

To configure this credential, you'll need:

- An **API Token**: To get your API token, select your account name in the upper right > **Company Settings > Personal Preferences > API**. Refer to [How to find the API token](https://pipedrive.readme.io/docs/how-to-find-the-api-token){:target=_blank .external-link} for more information.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Created when you register a new app.
- A **Client Secret**: Created when you register a new app.

To get both, open the **Developer Hub** in your account and [register a new public app](https://pipedrive.readme.io/docs/marketplace-registering-the-app#register-a-new-public-app){:target=_blank .external-link}. Copy the **OAuth Redirect URL** from n8n and add it as the app's **Callback URL**. Copy the **Client ID** and **Client Secret** from the app's **OAuth & access scopes** tab and add them to your n8n credential.

Be sure to add appropriate [scopes](https://pipedrive.readme.io/docs/marketplace-registering-the-app#oauth--access-scopes){:target=_blank .external-link} to your app. 

Refer to [App registration form](https://pipedrive.readme.io/docs/marketplace-registering-the-app#app-registration-form){:target=_blank .external-link} for more information on registering your app. Refer to [Scopes and permissions explanations](https://pipedrive.readme.io/docs/marketplace-scopes-and-permissions-explanations){:target=_blank .external-link} for more information on app scopes.