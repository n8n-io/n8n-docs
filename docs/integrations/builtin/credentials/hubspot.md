---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: HubSpot credentials
description: Documentation for HubSpot credentials. Use these credentials to authenticate HubSpot in n8n, a workflow automation platform.
contentType: integration
---

# HubSpot credentials

You can use these credentials to authenticate the following nodes:

- [HubSpot](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/)
- [HubSpot Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspottrigger/)

## Prerequisites

Create a [HubSpot](https://www.hubspot.com/){:target=_blank .external-link} account or [HubSpot developer](https://developers.hubspot.com/){:target=_blank .external-link} account.

## Supported authentication methods

- App token: Used with [HubSpot](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/) node
- Developer API key: Used with [HubSpot Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspottrigger/) node
- OAuth2: Used with [HubSpot](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/) node

/// note | API key deprecated
HubSpot deprecated the API key authentication method. The option still appears in n8n, but you should use the other authentication methods.
///

## Related resources

Refer to [HubSpot's API documentation](https://developers.hubspot.com/docs/api/overview){:target=_blank .external-link} for more information about the service. The [HubSpot Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspottrigger/) node uses the Webhooks API; refer to [HubSpot's Webhooks API documentation](https://developers.hubspot.com/docs/api/webhooks){:target=_blank .external-link} for more information about that service.

## Using App token

To configure this credential, you'll need:

- An **APP Token**: To generate an app token, create a private app in HubSpot. Refer to the [HubSpot Private Apps documentation](https://developers.hubspot.com/docs/api/private-apps){:target=_blank .external-link} for detailed instructions.

Authenticating the credential can fail if you don't use appropriate scopes. See [Required scopes for HubSpot node](#required-scopes-for-hubspot-node) for required scopes for this app.

## Using Developer API key

To configure this credential, you'll need:

- A **Client ID**: Generated once you create a public app, displayed in the app's **Auth** settings. Refer to the instructions in the [HubSpot Public Apps documentation](https://developers.hubspot.com/docs/api/creating-an-app){:target=_blank .external-link}.
    - Use the n8n **OAuth Redirect URL** as the **Redirect URL** in your HubSpot app.
- A **Client Secret**: Generated once you create a public app, displayed in the app's **Auth** settings.
- A **Developer API Key**: Generated from your Developer Applications dashboard. Refer to [HubSpot Developer API keys](https://legacydocs.hubspot.com/docs/faq/developer-api-keys){:target=_blank .external-link} for more information.
- An **App ID**: Generated once you create a public app, displayed in the app's **Auth** settings.

Authenticating the credential can fail if you don't use appropriate scopes. See [Required scopes for HubSpot Trigger node](#required-scopes-for-hubspot-trigger-node) for required scopes for this app.

### Required scopes for HubSpot Trigger node

If you're creating an app for use with the [HubSpot Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspottrigger/) node, n8n recommends starting with these scopes:

* `oauth`
* `crm.objects.companies.read`
* `crm.objects.contacts.read`
* `crm.objects.deals.read`
* `crm.schemas.companies.read`
* `crm.schemas.contacts.read`
* `crm.schemas.deals.read`

/// warning | HubSpot old accounts
Some HubSpot accounts don't have access to all the scopes. HubSpot is migrating accounts gradually. If you can't find all the scopes in your current HubSpot developer account, try creating a fresh developer account.
///

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure OAuth2 from scratch, you'll need to create a public app. Refer to the instructions in the [HubSpot Public Apps documentation](https://developers.hubspot.com/docs/api/creating-an-app){:target=_blank .external-link}. If you need more detail on what's happening in the OAuth web flow, refer to the [HubSpot Working with OAuth documentation](https://developers.hubspot.com/docs/api/working-with-oauth){:target=_blank .external-link}.

Authenticating the credential can fail if you don't use appropriate scopes. See [Required scopes for HubSpot node](#required-scopes-for-hubspot-node) for required scopes for this app.

## Required scopes for HubSpot node

If you're creating an app for use with the [HubSpot](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/) node, n8n recommends starting with these scopes:

* `oauth`
* `crm.objects.contacts.read`
* `crm.objects.contacts.write`
* `crm.objects.companies.read`
* `crm.objects.companies.write`
* `crm.objects.deals.read`
* `crm.objects.deals.write`
* `crm.objects.owners.read`
* `crm.schemas.companies.read`
* `crm.schemas.contacts.read`
* `crm.schemas.deals.read`
* `forms`
* `tickets`

/// warning | HubSpot old accounts
Some HubSpot accounts don't have access to all the scopes. HubSpot is migrating accounts gradually. If you can't find all the scopes in your current HubSpot developer account, try creating a fresh developer account.
///
