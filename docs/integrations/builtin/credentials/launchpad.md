---
title: Launchpad by Pegasystems credentials
description: Documentation for the Launchpad by Pegasystems credentials. Use these credentials to authenticate Launchpad by Pegasystems in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Launchpad by Pegasystems credentials

You can use these credentials to authenticate the following nodes:

- [Launchpad by Pegasystems](/integrations/builtin/app-nodes/n8n-nodes-base.pegalaunchpad.md)

## Supported authentication methods

- OAuth2 (Client Credentials)

## Related resources

Refer to [Pegasystems' DX API documentation](https://docs.pega.com/bundle/launchpad/page/platform/launchpad/dx-api-endpoints.html) for more information about the API.

Refer to [Pegasystems' Launchpad documentation](https://docs.pega.com/bundle/launchpad/page/platform/launchpad/introducing-launchpad.html) for more information about the service.

## Using OAuth2

To configure this credential, you'll need a [Launchpad](https://www.pega.com/products/launchpad) account and:

- An **Access Token URL**: The OAuth2 token endpoint for your Launchpad instance.
- A **Client ID**: The client ID of your registered OAuth2 client.
- A **Client Secret**: The client secret of your registered OAuth2 client.
- A **Scope** (optional): The OAuth2 scope for your Launchpad API access.

To set up the OAuth2 Client Credentials in Launchpad:

1. Log in to your Launchpad instance as an administrator.
2. Navigate to the OAuth 2.0 client registration. In Dev Studio, go to **Records** > **Security** > **OAuth 2.0 Client Registration**.
3. Create a new client registration or open an existing one.
4. Set the **Grant Type** to **Client Credentials**.
5. Copy the **Client ID** from the registration and paste it into the n8n credential.
6. Copy or generate a **Client Secret** and paste it into the n8n credential.
7. Set the **Access Token URL** in n8n. This is typically in the format:
    ```
    https://<your-launchpad-domain>/prweb/PRRestService/oauth2/v1/token
    ```
8. Optionally, enter a **Scope** if your Launchpad instance requires one.

Refer to [Pegasystems' OAuth 2.0 documentation](https://docs.pega.com/bundle/launchpad/page/platform/launchpad/configure-oauth2-authentication-profile.html) for more information about setting up OAuth2 client credentials.

Refer to [Pegasystems' DX API documentation](https://docs.pega.com/bundle/dx-api/page/platform/dx-api/dx-api-version-2-con.html) for detailed DX API reference.

/// note | Client Credentials grant type
The Launchpad by Pegasystems node uses the **Client Credentials** grant type. This means the node authenticates as the application itself, not on behalf of a specific user. Make sure your OAuth2 client is configured for Client Credentials and has the necessary access to the DX API endpoints.
///
