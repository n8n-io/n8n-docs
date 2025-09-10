---
title: Notion credentials
description: Documentation for Notion credentials. Use these credentials to authenticate Notion in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: high
---

# Notion credentials

You can use these credentials to authenticate the following nodes:

- [Notion](/integrations/builtin/app-nodes/n8n-nodes-base.notion/index.md)
- [Notion Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.notiontrigger.md)

## Prerequisites

Create a [Notion](https://notion.so) account with admin level access.

## Supported authentication methods

- API integration token: Used for internal integrations.
- OAuth2: Used for public integrations.

/// note | Integration type
Not sure which integration type to use? Refer to [Internal vs. public integrations](#internal-vs-public-integrations) below for more information.
///

## Related resources

Refer to [Notion's API documentation](https://developers.notion.com/reference/intro) for more information about the service.

## Using API integration token

To configure this credential, you'll need:

- An **Internal Integration Secret**: Generated once you create a Notion integration.

To generate an integration secret, [create a Notion integration](https://developers.notion.com/docs/create-a-notion-integration#create-your-integration-in-notion) and grab the integration secret from the **Secrets** tab:

1. Go to your Notion [integration dashboard](https://www.notion.com/my-integrations).
2. Select the **+ New integration** button.
3. Enter a **Name** for your integration, for example `n8n integration`. If desired, add a **Logo**.
4. Select **Submit** to create your integration.
5. Open the **Capabilities** tab. Select these capabilities:
    - `Read content`
    - `Update content`
    - `Insert content`
    - `User information without email addresses`
6. Be sure to **Save changes**.
7. Select the **Secrets** tab.
8. Copy the **Internal Integration Token** and add it as your n8n **Internal Integration Secret**.

Refer to the [Internal integration auth flow setup documentation](https://developers.notion.com/docs/authorization#internal-integration-auth-flow-set-up) for more information about authenticating to the service.

### Share Notion page(s) with the integration

For your integration to interact with Notion, you must [give your integration page permission](https://developers.notion.com/docs/create-a-notion-integration#give-your-integration-page-permissions) to interact with page(s) in your Notion workspace:

1. Visit the page in your Notion workspace.
2. Select the triple dot menu at the top right of a page.
3. In **Connections**, select **Connect to**.
4. Use the search bar to find and select your integration from the dropdown list.

Once you share at least one page with the integration, you can start making API requests. If the page isn't shared, any API requests made will respond with an error.

Refer to [Integration permissions](https://developers.notion.com/docs/authorization#integration-permissions) for more information.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated once you configure a public integration.
- A **Client Secret**: Generated once you configure a public integration.

You must [create a Notion integration](https://developers.notion.com/docs/create-a-notion-integration#create-your-integration-in-notion) and set it to public distribution:

1. Go to your Notion [integration dashboard](https://www.notion.so/my-integrations).
2. Select the **+ New integration** button.
3. Enter a **Name** for your integration, for example `n8n integration`. If desired, add a **Logo**.
4. Select **Submit** to create your integration.
5. Open the **Capabilities** tab. Select these capabilities:
    - `Read content`
    - `Update content`
    - `Insert content`
    - `User information without email addresses`
6. Select **Save changes**.
7. Go to the **Distribution** tab.
8. Turn on the **Do you want to make this integration public?** control.
9. Enter your company name and website in the **Organization Information** section.
10. Copy the n8n **OAuth Redirect URL** and add it to as a **Redirect URI** in the Notion integration's **OAuth Domain & URLs** section.
11. Go to the **Secrets** tab.
12. Copy the **Client ID** and **Client Secret** and add them to your n8n credential.

Refer to Notion's [public integration auth flow setup](https://developers.notion.com/docs/authorization#public-integration-auth-flow-set-up) for more information about authenticating to the service.

## Internal vs. public integrations

**Internal** integrations are:

* Specific to a single workspace.
* Accessible only to members of that workspace.
* Ideal for custom workspace enhancements.

Internal integrations use a simpler authentication process (the integration secret) and don't require any security review before publishing.

**Public** integrations are:

* Usable across multiple, unrelated Notion workspaces.
* Accessible by any Notion user, regardless of their workspace.
* Ideal for catering to broad use cases.

Public integrations use the OAuth 2.0 protocol for authentication. They require a Notion security review before publishing.

For a more detailed breakdown of the two integration types, refer to Notion's [Internal vs. Public Integrations documentation](https://developers.notion.com/docs/getting-started#internal-vs-public-integrations).
