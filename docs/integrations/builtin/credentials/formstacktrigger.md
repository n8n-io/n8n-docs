---
title: Formstack Trigger credentials
description: Documentation for Formstack Trigger credentials. Use these credentials to authenticate Formstack Trigger in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Formstack Trigger credentials

You can use these credentials to authenticate the following nodes:

- [Formstack Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.formstacktrigger.md)

## Prerequisites

Create a [Formstack](https://www.formstack.com/) account.

## Supported authentication methods

- API access token
- OAuth2

## Related resources

Refer to [Formstack's API documentation](https://developers.formstack.com/reference/api-overview) for more information about the service.

## Using API access token

To configure this credential, you'll need:

- An API **Access Token**: To generate an Access Token, [create a new application](https://www.formstack.com/admin/apiKey/main) in Formstack using the following details:
    * **Redirect URI**: For cloud n8n instances, enter `https://oauth.n8n.cloud/oauth2/callback`.
        - For self-hosted n8n instances, enter the OAuth callback URL for your n8n instance in the format `https://<n8n_url>/rest/oauth2-credential/callback`. For example `https://localhost:5678/rest/oauth2-credential/callback`.
    * **Platform**: Select **Website**.

Once you've created the application, copy the access token either from the applications list or by selecting the application to view its details.

Refer to [Formstack's API Authorization documentation](https://developers.formstack.com/reference/api-overview#obtaining-an-api-key-oauth2-access-token) for more detailed instructions.

/// note | Access token permissions
Formstack ties access tokens to a Formstack user. Access tokens follow Formstack (in-app) user permissions.
///

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**

To generate both of these, [create a new application](https://www.formstack.com/admin/apiKey/main) in Formstack using the following details:

- **Redirect URI**: Copy the **OAuth Redirect URL** from the n8n credential to enter here.
    - For self-hosted n8n instances, enter the OAuth callback URL for your n8n instance in the format `https://<n8n_url>/rest/oauth2-credential/callback`. For example `https://localhost:5678/rest/oauth2-credential/callback`.
- **Platform**: Select **Website**.

Once you've created the application, select it from the applications list to view the **Application Details**. Copy the **Client ID** and **Client Secret** and add them to n8n. Once you've added both, select the **Connect my account** button to begin the OAuth2 flow and authorization process.

Refer to [Formstack's API Authorization documentation](https://developers.formstack.com/reference/api-overview#obtaining-an-api-key-oauth2-access-token) for more detailed instructions.

/// note | Access token permissions
Formstack ties access tokens to a Formstack user. Access tokens follow Formstack (in-app) user permissions.
///

