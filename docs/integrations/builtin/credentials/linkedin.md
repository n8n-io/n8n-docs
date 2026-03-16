---
title: LinkedIn credentials
description: Documentation for LinkedIn credentials. Use these credentials to authenticate LinkedIn in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# LinkedIn credentials

You can use these credentials to authenticate the following nodes:

- [LinkedIn](/integrations/builtin/app-nodes/n8n-nodes-base.linkedin.md)


## Prerequisites

* Create a [LinkedIn](https://www.linkedin.com/) account.
* Create a LinkedIn [Company Page](https://www.linkedin.com/help/linkedin/answer/a543852).

## Supported authentication methods

- **Community Management OAuth2**: Use this method if you're a new LinkedIn user or creating a new LinkedIn app.
- **OAuth2**: Use this method for older LinkedIn apps and user accounts.

## Related Resources

Refer to [LinkedIn's Community Management API documentation](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview?view=li-lms-2024-04) for more information about the service.

This credential works with API version `202404`.

## Using Community Management OAuth2

Use this method if you're a new LinkedIn user or creating a new LinkedIn app.

To configure this credential, you'll need a [LinkedIn](https://www.linkedin.com/) account, a LinkedIn [Company Page](https://www.linkedin.com/help/linkedin/answer/a543852), and:

- A **Client ID**: Generated after you create a new developer app.
- A **Client Secret**: Generated after you create a new developer app.

To create a new developer app and set up the credential:

1. Log into LinkedIn and select this link to [create a new developer app](https://www.linkedin.com/developers/apps/new).
2. Enter an **App name** for your app, like `n8n integration`.
3. For the **LinkedIn Page**, enter a LinkedIn [Company Page](https://www.linkedin.com/help/linkedin/answer/a543852) or use the **Create a new LinkedIn Page** link to create one on-the-fly. Refer to [Associate an App with a LinkedIn Page](https://www.linkedin.com/help/linkedin/answer/a548360) for more information. 
4. Add an **App logo**.
5. Check the box to agree to the **Legal agreement**.
6. Select **Create app**.
7. This should open the **Products** tab. Select the products/APIs you want to enable for your app. For the LinkedIn node to work, you must include and configure:
	- **Share on LinkedIn**
	- **Sign In with LinkedIn using OpenID Connect**
 	- **Advertising API** (if using it as an organization account rather than an individual)
8. Once you've requested access to the products you need, open the **Auth** tab.
9. Copy the **Client ID** and enter it in your n8n credential.
10. Select the icon to **Copy** the **Primary Client Secret**. Enter this in your n8n credential as the **Client Secret**.

/// note | Posting from organization accounts
To post as an organization, you need to put your app through LinkedIn's [Community Management App Review](https://learn.microsoft.com/en-us/linkedin/marketing/community-management-app-review) process.
///

Refer to [Getting Access to LinkedIn APIs](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access) for more information on scopes and permissions.

## Using Lead Sync API

LinkedIn's Lead Sync API allows you to sync lead form responses from LinkedIn ads and organic forms (company pages, events, products) to your n8n workflows using webhooks. This requires more setup and LinkedIn approval.

### Prerequisites

- A LinkedIn developer app (created using steps above)
- Your company LinkedIn account linked to your developer app
- Access to the Lead Sync API product (requires separate application)
- A publicly accessible HTTPS webhook URL (your n8n workflow webhook URL)

### Setup process

1. **Create a LinkedIn developer app** following the steps in the Community Management OAuth2 or OAuth2 sections above.
2. **Link your company account**: Submit a request to LinkedIn to link your company LinkedIn account to your developer app. This is done through the LinkedIn Developer Portal.
3. **Request Lead Sync API access**: 
   - In your [LinkedIn developer app](https://www.linkedin.com/developers/apps/), navigate to the **Products** tab.
   - Request access to the **Lead Sync API** product.
4. **Configure permissions**: Ensure your app has the `r_marketing_leadgen_automation` permission, which allows you to:
   - Access authenticated member's ad forms and organic forms
   - Access form responses (leads)
   - Manage lead notifications (webhooks)
5. **Set up webhook in n8n**:
   - Create a workflow with a Webhook trigger node in n8n.
   - Copy the webhook URL from n8n (must be HTTPS).
   - The webhook URL must be publicly accessible and accept POST requests without additional authorization requirements.
6. **Handle the challenge request**:
   - When you register your webhook with LinkedIn, LinkedIn will send a GET request with a `challengeCode` query parameter.
   - Your n8n workflow must respond within 3 seconds with a JSON payload containing:
     - `challengeCode`: The code LinkedIn sent
     - `challengeResponse`: HMAC-SHA256 hash of the challenge code using your app's Client Secret as the key
   - Example response format:
     ```json
     {
       "challengeCode": "890e4665-4dfe-4ab1-b689-ed553bceeed0",
       "challengeResponse": "27b1d19678542072a7f1d0ce845d0c78cec22567f413697e25648f44fa3d1514"
     }
     ```
7. **Create lead notification subscription**:
   - Use the `leadNotifications` API to create a webhook subscription.
   - You can create subscriptions at different levels:
     - **Owner level**: Receive notifications for all forms under an organization or sponsored account
     - **Form level**: Receive notifications only for specific forms
     - **Associated entity level**: Receive notifications for forms attached to specific entities (ads, events, etc.)
   - Example API call:
     ```bash
     POST https://api.linkedin.com/rest/leadNotifications
     {
       "webhook": "https://your-n8n-instance.com/webhook/linkedin-leads",
       "owner": {"organization": "urn:li:organization:123456"},
       "leadType": "SPONSORED"
     }
     ```
8. **Fetch lead form responses**:
   - Once webhook notifications are set up, you'll receive notifications when new leads are submitted.
   - Use the `leadFormResponses` API to fetch the actual lead data:
     ```bash
     GET https://api.linkedin.com/rest/leadFormResponses?owner=(organization:urn%3Ali%3Aorganization%3A123456)&leadType=(leadType:SPONSORED)&q=owner
     ```

### Lead types

LinkedIn supports different types of leads that can be synced:

- **SPONSORED**: Leads collected from sponsored ads
- **COMPANY**: Leads collected from company pages  
- **EVENT**: Leads collected from event pages
- **ORGANIZATION_PRODUCT**: Leads collected from organization product pages

### Webhook validation

LinkedIn periodically re-validates webhook endpoints every 2 hours. If validation fails 3 times in a row, the endpoint will be blocked and events will no longer be sent. Ensure your webhook:

- Responds to challenge requests within 3 seconds
- Returns a 2xx HTTP status code for all notifications
- Uses HTTPS (HTTP URLs aren't supported)
- Is publicly accessible without authentication requirements

### Security

To verify that notifications are from LinkedIn:

1. Check the `X-LI-Signature` header in the POST request
2. This header contains the HMAC-SHA256 hash of the JSON-encoded POST body, computed using your app's Client Secret
3. Compute the same hash on your side and verify it matches
4. Discard any events where the signatures don't match

Refer to LinkedIn's [Lead Sync API documentation](https://learn.microsoft.com/en-us/linkedin/marketing/lead-sync/leadsync) and [Webhook Validation guide](https://learn.microsoft.com/en-us/linkedin/shared/api-guide/webhook-validation) for more information.

## Using OAuth2

Only use this method for older LinkedIn apps and user accounts.

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

All users must select:

- **Organization Support**: If turned on, the credential requests permission to post as an organization using the `w_organization_social` scope.
	- To use this option, you must put your app through LinkedIn's [Community Management App Review](https://learn.microsoft.com/en-us/linkedin/marketing/community-management-app-review) process.
- **Legacy**: If turned on, the credential uses legacy scopes for `r_liteprofile` and `r_emailaddress` instead of the newer `profile` and `email` scopes.

If you're [self-hosting](/hosting/index.md) n8n, you'll need to configure OAuth2 from scratch by creating a new developer app:

1. Log into LinkedIn and select this link to [create a new developer app](https://www.linkedin.com/developers/apps/new).
2. Enter an **App name** for your app, like `n8n integration`.
3. For the **LinkedIn Page**, enter a LinkedIn [Company Page](https://www.linkedin.com/help/linkedin/answer/a543852) or use the **Create a new LinkedIn Page** link to create one on-the-fly. Refer to [Associate an App with a LinkedIn Page](https://www.linkedin.com/help/linkedin/answer/a548360) for more information. 
4. Add an **App logo**.
5. Check the box to agree to the **Legal agreement**.
6. Select **Create app**.
7. This should open the **Products** tab. Select the products/APIs you want to enable for your app. For the LinkedIn node to work properly, you must include:
	- **Share on LinkedIn**
	- **Sign In with LinkedIn using OpenID Connect**
8. Once you've requested access to the products you need, open the **Auth** tab.
9. Copy the **Client ID** and enter it in your n8n credential.
10. Select the icon to **Copy** the **Primary Client Secret**. Enter this in your n8n credential as the **Client Secret**.

/// note | Posting from organization accounts
To post as an organization, you need to put your app through LinkedIn's [Community Management App Review](https://learn.microsoft.com/en-us/linkedin/marketing/community-management-app-review) process.
///

Refer to [Getting Access to LinkedIn APIs](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access) for more information on scopes and permissions.
