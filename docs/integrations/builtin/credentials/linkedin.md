---
title: LinkedIn credentials
description: Documentation for LinkedIn credentials. Use these credentials to authenticate LinkedIn in n8n, a workflow automation platform.
contentType: integration
---

# LinkedIn credentials

You can use these credentials to authenticate the following nodes:

- [LinkedIn](/integrations/builtin/app-nodes/n8n-nodes-base.linkedin/)


## Prerequisites

* Create a [LinkedIn](https://www.linkedin.com/){:target=_blank .external-link} account.
* Create a LinkedIn [Company Page](https://www.linkedin.com/help/linkedin/answer/a543852){:target=_blank .external-link}.

## Supported authentication methods

- Community Management OAuth2: Use this method if you're a new LinkedIn user or creating a new LinkedIn app.
- OAuth2: Use this method for older LinkedIn apps and user accounts.

## Related Resources

Refer to [LinkedIn's Community Management API documentation](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview?view=li-lms-2024-04){:target=_blank .external-link} for more information about the service.

This credential works with API version `202404`.

## Using Community Management OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated after you create a new developer app.
- A **Client Secret**: Generated after you create a new developer app.

To enable OAuth, you need to create a [new developer app](https://www.linkedin.com/developers/apps/new){:target=_blank .external-link}.

Use these settings for your app:

- Enter a LinkedIn Company Page for **LinkedIn Page**. Refer to [Associate an App with a LinkedIn Page](https://www.linkedin.com/help/linkedin/answer/a548360){:target=_blank .external-link} for more guidance.
- Enable APIs for your app, including:
	- **Share on LinkedIn**
	- **Sign In with LinkedIn using OpenID Connect**

/// note | Posting from organization accounts
To post as an organization, you need to put your app through LinkedIn's [Community Management App Review](https://learn.microsoft.com/en-us/linkedin/marketing/community-management-app-review){:target=_blank .external-link} process.
///

Refer to [Getting Access to LinkedIn APIs](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access){:target=_blank .external-link} for more information on scopes and permissions.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

All users must select:

- **Organization Support**: If turned on, the credential requests permission to post as an organization using the `w_organization_social` scope.
	- To use this option, you must put your app through LinkedIn's [Community Management App Review](https://learn.microsoft.com/en-us/linkedin/marketing/community-management-app-review){:target=_blank .external-link} process.
- **Legacy**: If turned on, the credential uses legacy scopes for `r_liteprofile` and `r_emailaddress` instead of the newer `profile` and `email` scopes.

If you need to configure OAuth2 from scratch, create a [new developer app](https://www.linkedin.com/developers/apps/new){:target=_blank .external-link}.

Use these settings for your app:

- Enter a LinkedIn Company Page for **LinkedIn Page**. Refer to [Associate an App with a LinkedIn Page](https://www.linkedin.com/help/linkedin/answer/a548360){:target=_blank .external-link} for more guidance.
- Enable APIs for your app, including:
	- **Share on LinkedIn**
	- **Sign In with LinkedIn using OpenID Connect**

Refer to [Getting Access to LinkedIn APIs](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access){:target=_blank .external-link} for more information on scopes and permissions.