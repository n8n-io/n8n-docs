---
title: HubSpot credentials
description: Documentation for HubSpot credentials. Use these credentials to authenticate HubSpot in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# HubSpot credentials

You can use these credentials to authenticate the following nodes:

- [HubSpot](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot.md)
- [HubSpot Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspottrigger.md)

## Supported authentication methods

- App token: Use with the [HubSpot](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot.md) node.
- Developer API key: Use with the [HubSpot Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspottrigger.md) node.
- OAuth2: Use with the [HubSpot](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot.md) node.

/// warning | API key deprecated
HubSpot deprecated the regular **API Key** authentication method. The option still appears in n8n, but you should use the authentication methods listed above instead. If you have existing integrations using this API key method, refer to HubSpot's [Migrate an API key integration to a private app](https://web.archive.org/web/20240106022147/https://developers.hubspot.com/docs/api/migrate-an-api-key-integration-to-a-private-app) guide and set up an app token.
///

## Related resources

Refer to [HubSpot's API documentation](https://developers.hubspot.com/docs/api/overview) for more information about the service. The [HubSpot Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspottrigger.md) node uses the Webhooks API; refer to [HubSpot's Webhooks API documentation](https://developers.hubspot.com/docs/api-reference/webhooks-webhooks-v3/guide) for more information about that service.

## Using App token

To configure this credential, you'll need a [HubSpot](https://www.hubspot.com/) account or [HubSpot developer](https://developers.hubspot.com/) account and:

- An **App Token**

To generate an app token, create a private app in HubSpot:

1. In your HubSpot account, select the **settings icon** in the main navigation bar.
2. In the left sidebar menu, go to **Integrations > Private Apps**.
3. Select **Create private app**.
4. On the **Basic Info** tab, enter your app's **Name**.
5. Hover over the **placeholder logo** and select the upload icon to upload a square image that will serve as the logo for your app.
6. Enter a **Description** for your app.
7. Open the **Scopes** tab and add the appropriate scopes. Refer to [Required scopes for HubSpot node](#required-scopes-for-hubspot-node) for a complete list of scopes you should add.
8. Select **Create app** to finish the process.
9. In the modal, review the info about your app's access token, then select **Continue creating**.
10. Once your app's created, open the **Access token card** and select **Show token** to reveal the token.
11. Copy this token and enter it in your n8n credential.

Refer to the [HubSpot Private Apps documentation](https://developers.hubspot.com/docs/apps/legacy-apps/private-apps/overview) for more information.

## Using Developer API key

To configure this credential, you'll need a [HubSpot developer](https://developers.hubspot.com/) account and:

- A **Client ID**: Generated once you create a public app. 
- A **Client Secret**: Generated once you create a public app.
- A **Developer API Key**: Generated from your Developer Apps dashboard.
- An **App ID**: Generated once you create a public app.

To create the public app and set up the credential:

1. Log into your [HubSpot app developer account](https://developers.hubspot.com/).
2. Select **Apps** from the main navigation bar.
3. Select **Get HubSpot API key**. You may need to select the option to **Show key**.
4. Copy the key and enter it in n8n as the **Developer API Key**.
3. Still on the HubSpot **Apps** page, select **Create app**.
4. On the **App Info** tab, add an **App name**, **Description**, **Logo**, and any support contact info you want to provide. Anyone encountering the app would see these.
5. Open the **Auth** tab.
6. Copy the **App ID** and enter it in n8n.
6. Copy the **Client ID** and enter it in n8n.
7. Copy the **Client Secret** and enter it in n8n.
8. In the **Scopes** section, select **Add new scope**.
9. Add all the scopes listed in [Required scopes for HubSpot Trigger node](#required-scopes-for-hubspot-trigger-node) to your app.
10. Select **Update**.
11. Copy the n8n **OAuth Redirect URL** and enter it as the **Redirect URL** in your HubSpot app.
12. Select **Create app** to finish creating the HubSpot app.

 Refer to the [HubSpot Public Apps documentation](https://developers.hubspot.com/docs/apps/legacy-apps/public-apps/overview) for more detailed instructions.

### Required scopes for HubSpot Trigger node

If you're creating an app for use with the [HubSpot Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspottrigger.md) node, n8n recommends starting with these scopes:

| **Element** | **Object** | **Permission** | **Scope name** |
| --- | --- | --- | --- |
| n/a | n/a | n/a | `oauth` |
| CRM | Companies | Read | `crm.objects.companies.read` |
| CRM | Companies schemas | Read | `crm.schemas.companies.read` |
| CRM | Contacts | Read | `crm.objects.contacts.read` |
| CRM | Contacts schemas | Read | `crm.schemas.contacts.read` |
| CRM | Deals | Read | `crm.objects.deals.read` |
| CRM | Deals schemas| Read | `crm.schemas.deals.read` |

/// warning | HubSpot old accounts
Some HubSpot accounts don't have access to all the scopes. HubSpot is migrating accounts gradually. If you can't find all the scopes in your current HubSpot developer account, try creating a fresh developer account.
///

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you're [self-hosting](/hosting/index.md) n8n, you'll need to configure OAuth2 from scratch by creating a new public app:

1. Log into your [HubSpot app developer account](https://developers.hubspot.com/).
2. Select **Apps** from the main navigation bar.
3. Select **Create app**.
4. On the **App Info** tab, add an **App name**, **Description**, **Logo**, and any support contact info you want to provide. Anyone encountering the app would see these.
5. Open the **Auth** tab.
6. Copy the **App ID** and enter it in n8n.
6. Copy the **Client ID** and enter it in n8n.
7. Copy the **Client Secret** and enter it in n8n.
8. In the **Scopes** section, select **Add new scope**.
9. Add all the scopes listed in [Required scopes for HubSpot node](#required-scopes-for-hubspot-node) to your app.
10. Select **Update**.
11. Copy the n8n **OAuth Redirect URL** and enter it as the **Redirect URL** in your HubSpot app.
12. Select **Create app** to finish creating the HubSpot app.

Refer to the [HubSpot Public Apps documentation](https://developers.hubspot.com/docs/apps/legacy-apps/public-apps/overview) for more detailed instructions. If you need more detail on what's happening in the OAuth web flow, refer to the [HubSpot Working with OAuth documentation](https://developers.hubspot.com/docs/apps/legacy-apps/authentication/working-with-oauth).

## Required scopes for HubSpot node

If you're creating an app for use with the [HubSpot](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot.md) node, n8n recommends starting with these scopes:

| **Element** | **Object** | **Permission** | **Scope name(s)** |
| --- | --- | --- | --- |
| n/a | n/a | n/a |  `oauth` |
| n/a | n/a | n/a |  `forms` |
| n/a | n/a | n/a |  `tickets` |
| CRM | Companies | Read <br> Write | `crm.objects.companies.read` <br> `crm.objects.companies.write`|
| CRM | Companies schemas | Read | `crm.schemas.companies.read` |
| CRM | Contacts schemas | Read | `crm.schemas.contacts.read` |
| CRM | Contacts | Read <br> Write | `crm.objects.contacts.read` <br> `crm.objects.contacts.write`|
| CRM | Deals | Read <br> Write | `crm.objects.deals.read` <br> `crm.objects.deals.write`|
| CRM | Deals schemas | Read | `crm.schemas.deals.read` |
| CRM | Owners | Read | `crm.objects.owners.read` |
| CRM | Lists | Write | `crm.lists.write` |

/// warning | HubSpot old accounts
Some HubSpot accounts don't have access to all the scopes. HubSpot is migrating accounts gradually. If you can't find all the scopes in your current HubSpot developer account, try creating a fresh developer account.
///
