---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Notion credentials
description: Documentation for Notion credentials. Use these credentials to authenticate Notion in n8n, a workflow automation platform.
contentType: integration
---

# Notion credentials

You can use these credentials to authenticate the following nodes:

- [Notion](/integrations/builtin/app-nodes/n8n-nodes-base.notion/)
- [Notion Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.notiontrigger/)

## Prerequisites

Create a [Notion](https://notion.so){:target=_blank .external-link} account with admin level access.

## Supported authentication methods

- API integration token: Used for internal integrations
- OAuth2: Used for public integrations

## Related resources

Refer to [Notion's API documentation](https://developers.notion.com/reference/intro){:target=_blank .external-link} for more information about the service.

## Using API integration token

To configure this credential, you'll need:

- An **Internal Integration Secret**

To generate an integration secret, [create a Notion integration](https://developers.notion.com/docs/create-a-notion-integration#create-your-integration-in-notion){:target=_blank .external-link} and grab the integration secret from the **Secrets** tab:

1. Go to your Notion [integration dashboard](https://www.notion.com/my-integrations){:target=_blank .external-link}.
2. Select the **+ New integration** button.
3. Enter a **Name** for your integration, for example `n8n integration`. If desired, add a **Logo**.
4. Select **Submit** to create your integration.
5. Open the **Capabilities** tab. Make sure you select these capabilities:
    - `Read content`
    - `Update content`
    - `Insert content`
    - `User information without email addresses`
6. Be sure to **Save changes**.
7. Select the **Secrets** tab.
8. Copy the **Internal Integration Token** and add it as your n8n **Internal Integration Secret**. Refer to [Get your API secret](https://developers.notion.com/docs/create-a-notion-integration#get-your-api-secret){:target=_blank .external-link} for more information.

For your integration to interact with Notion, you must [share a Notion page with the integration](https://developers.notion.com/docs/create-a-notion-integration#give-your-integration-page-permissions){:target=_blank .external-link}. To share a page with an integration:

1. Visit the page in your Notion workspace.
2. Select the ••• menu at the top right of a page.
3. Scroll down to **Add connections**.
4. Use the search bar to find and select your integration from the dropdown list.

Once you share at least one page with the integration, you can start making API requests. If the page isn't shared, any API requests made will respond with an error.

Refer to the [Internal integration auth flow setup documentation](https://developers.notion.com/docs/authorization#internal-integration-auth-flow-set-up){:target=_blank .external-link} for further explanation.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated once you configure a public integration
- A **Client Secret**: Generated once you configure a public integration

You must [create a Notion integration](https://developers.notion.com/docs/create-a-notion-integration#create-your-integration-in-notion){:target=_blank .external-link} and set it to public distribution:

1. Go to your Notion [integration dashboard](https://www.notion.so/my-integrations){:target=_blank .external-link}.
2. Select the **+ New integration** button.
3. Enter a **Name** for your integration, for example `n8n integration`. If desired, add a **Logo**.
4. Select **Submit** to create your integration.
5. Open the **Capabilities** tab. Make sure you select these capabilities:
    - `Read content`
    - `Update content`
    - `Insert content`
    - `User information without email addresses`
6. Be sure to **Save changes**.
7. Go to the **Distribution** tab.
8. Turn on the **Do you want to make this integration public?** control.
9. Enter your company name and website in the **Organization Information** section.
10. Copy the n8n **OAuth Redirect URL** and add it to as a **Redirect URI** in the Notion integration's **OAuth Domain & URLs** section.
11. Go to the **Secrets** tab.
12. Copy the **Client ID** and **Client Secret** and add them to your n8n credential.

Refer to the [public integration auth flow setup](https://developers.notion.com/docs/authorization#public-integration-auth-flow-set-up){:target=_blank .external-link} for further explanation and guidance.
