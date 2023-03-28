---
title: HubSpot credentials - n8n Documentation
description: Documentation for HubSpot credentials. Use these credentials to authenticate HubSpot in n8n, a workflow automation platform.
---

# HubSpot credentials

You can use these credentials to authenticate the following nodes with HubSpot.

- [HubSpot](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/)
- [HubSpot Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspottrigger/)

!!! note "API key deprecated"
	HubSpot deprecated the API key authentication method. The option still appears in n8n, but you should use OAuth or APP Token.

## Prerequisites

Create a [HubSpot](https://www.hubspot.com/){:target=_blank .external-link} account.

## Using OAuth

!!! note "Note for n8n Cloud users"
    You can skip these steps. Enter the credential name, then select **Connect my account** in the OAuth section to connect your HubSpot account to n8n.


!!! warning "HubSpot old accounts"
    Some HubSpot accounts don't have access to all the scopes. HubSpot is migrating accounts gradually. If you can't find all the scopes in your current HubSpot developer account, try creating a fresh developer account.


1. Access your [HubSpot Developer Home](https://developers.hubspot.com/){:target=_blank .external-link}.
2. Select **Manage apps**.
3. Select **Create app**.
4. Enter an app name in **Public app name**.
5. Select the **Auth** tab.
6. Use the provided **Client ID** and the **Client secret** with your HubSpot OAuth2 API credentials in n8n. If you're using the [HubSpot Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspottrigger/) node, copy the **App ID** along with the information in the previous step.
8. Copy your OAuth Callback URL from the **Create New Credentials** screen in n8n and paste in the **Redirect URL** section in HubSpot	
9. In the Scopes section, select the following scopes in the **Find a scope** search box:
    * Trigger node:
        * oauth
        * crm.objects.contacts (read),
        * crm.schemas.contacts (read),
        * crm.objects.companies (read),
        * crm.schemas.companies (read),
        * crm.objects.deals (read),
        * crm.schemas.deals (read),
    * Regular node:
        * oauth
        * crm.schemas.deals (read),
        * crm.objects.owners (read),
        * crm.objects.contacts (write),
        * crm.objects.companies (write),
        * crm.objects.companies (read),
        * crm.objects.deals (read),
        * crm.schemas.contacts (read),
        * crm.objects.deals (write),
        * crm.objects.contacts (read),
        * crm.schemas.companies (read),
        * forms,
        * tickets,

		!!! note "Exact scope needed"
	    	If you grant access to more or less scopes than listed above, this can cause an issue with the authentication step.

10. Select **Save** to save your settings in HubSpot.
11. In n8n, select **Connect my account** in the OAuth section to connect your HubSpot account to n8n.
12. Click the **Save** button to save your credentials.


## Using APP Token

1. Follow the instructions in the [Private Apps Documentation](https://developers.hubspot.com/docs/api/private-apps){:target=_blank .external-link} to get your access token.
2. Set the access token as the key in your HubSpot credentials in n8n.

