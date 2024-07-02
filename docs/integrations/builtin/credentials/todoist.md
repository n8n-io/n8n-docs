---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Todoist credentials
description: Documentation for Todoist credentials. Use these credentials to authenticate Todoist in n8n, a workflow automation platform.
contentType: integration
---

# Todoist credentials

You can use these credentials to authenticate the following nodes:

- [Todoist](/integrations/builtin/app-nodes/n8n-nodes-base.todoist/)

## Prerequisites

Create a [Todoist](https://todoist.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API key
- OAuth2

## Related resources

Refer to [Todoist's REST API documentation](https://developer.todoist.com/rest/v2/#overview){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Get your personal API token from your [**Integration settings**](https://todoist.com/prefs/integrations){:target=_blank .external-link} and enter it here.


## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

To configure this credential from scratch, you'll need:

- A **Client ID**
- A **Client Secret**

Get both by creating an application in the Todoist [App Management Console](https://developer.todoist.com/appconsole.html){:target=_blank .external-link}.

Use these settings for your application:

- Copy the **OAuth Callback URL** from n8n and add it as the **OAuth redirect URL**.
- Copy the **Client ID** and **Client Secret** from Todoist and add it to n8n.

Refer to the Todoist [Authorization Guide](https://developer.todoist.com/guides/#authorization){:target=_blank .external-link} for more information.

