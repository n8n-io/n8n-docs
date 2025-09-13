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
7. This should open the **Products** tab. Select the products/APIs you want to enable for your app. For the LinkedIn node to work properly, you must include and configure:
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
