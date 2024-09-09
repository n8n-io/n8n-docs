---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Todoist credentials
description: Documentation for Todoist credentials. Use these credentials to authenticate Todoist in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Todoist credentials

You can use these credentials to authenticate the following nodes:

- [Todoist](/integrations/builtin/app-nodes/n8n-nodes-base.todoist/)

## Supported authentication methods

- API key
- OAuth2

## Related resources

Refer to [Todoist's REST API documentation](https://developer.todoist.com/rest/v2/#overview){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need a [Todoist](https://todoist.com/){:target=_blank .external-link} account and:

- An **API Key**

To get your **API Key**:

1. In Todoist, open your [**Integration settings**](https://todoist.com/prefs/integrations){:target=_blank .external-link}.
2. Select the **Developer** tab.
3. Copy your **API token** and enter it as the **API Key** in your n8n credential.

Refer to [Find your API token](https://todoist.com/help/articles/find-your-api-token-Jpzx9IIlB){:target=_blank .external-link} for more information.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you're [self-hosting](/hosting/) n8n, you'll need a [Todoist](https://todoist.com/){:target=_blank .external-link} account and:

- A **Client ID**
- A **Client Secret**

Get both by creating an application:

1. Open the Todoist [App Management Console](https://developer.todoist.com/appconsole.html){:target=_blank .external-link}.
2. Select **Create a new app**.
3. Enter an **App name** for your app, like `n8n integration`.
4. Select **Create app**.
5. Copy the n8n **OAuth Redirect URL** and enter it as the **OAuth redirect URL** in Todoist.
6. Copy the **Client ID** from Todoist and enter it in your n8n credential.
7. Copy the **Client Secret** from Todoist and enter it in your n8n credential.
8. Configure the rest of your Todoist app as it makes sense for your use case.

Refer to the Todoist [Authorization Guide](https://developer.todoist.com/guides/#authorization){:target=_blank .external-link} for more information.
