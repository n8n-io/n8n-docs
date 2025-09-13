---
title: ClickUp credentials
description: Documentation for ClickUp credentials. Use these credentials to authenticate ClickUp in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# ClickUp credentials

You can use these credentials to authenticate the following nodes:

- [ClickUp](/integrations/builtin/app-nodes/n8n-nodes-base.clickup.md)
- [ClickUp Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.clickuptrigger.md)

## Supported authentication methods

- API access token
- OAuth2

## Related resources

Refer to [ClickUp's documentation](https://clickup.com/api/) for more information about the service.

## Using API access token

To configure this credential, you'll need a [ClickUp](https://www.clickup.com/) account and:

- A Personal API **Access Token**

To get your personal API token:

1. If you're using ClickUp 2.0, select your avatar in the lower-left corner and select **Apps**. If you're using ClickUp 3.0, select your avatar in the upper-right corner, select **Settings**, and scroll down to select **Apps** in the sidebar.
2. Under **API Token**, select **Generate**.
3. Copy your **Personal API token** and enter it in your n8n credential as the **Access Token**.

Refer to [ClickUp's Personal Token documentation](https://clickup.com/api/developer-portal/authentication#personal-token) for more information.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you're [self-hosting](/hosting/index.md) n8n, you'll need to create an OAuth app:

1. In ClickUp, select your avatar and select **Integrations**.
2. Select **ClickUp API**.
3. Select **Create an App**.
4. Enter a **Name** for your app.
5. In n8n, copy the **OAuth Redirect URL**. Enter this as your ClickUp app's **Redirect URL**.
6. Once you create your app, copy the **client_id** and **secret** and enter them in your n8n credential.
7. Select **Connect my account** and follow the on-screen prompts to finish connecting the credential.

 Refer to the [ClickUp Oauth flow documentation](https://clickup.com/api/developer-portal/authentication#oauth-flow) for more information.
