---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Set up OIDC
description: Set up instructions for enabling OIDC SSO with n8n.
contentType: howto
---

This section tells you how to enable OIDC SSO (single sign-on) in n8n. It assumes you're familiar with OIDC. If you're not, [OpenID Connect explained](https://openid.net/connect/) can help you understand how OIDC works, and its benefits.

## Setting up and enabling OIDC

1. In n8n, go to **Settings** > **SSO**.
2. Under **Select Authentication Protocol**, choose **OIDC** from the dropdown.
3. Copy the **redirect URL** shown (for example, `https://yourworkspace.app.n8n.cloud/rest/sso/oidc/callback`)
   1. If you are running n8n behind a load balancer, make sure you set the [`N8N_EDITOR_BASE_URL` environment variable](/hosting/configuration/environment-variables/deployment.md).
4. Set up OIDC with your identity provider (IdP). You'll need to:
   
   - Create a new OIDC client/application in your IdP
   - Configure the redirect URL from step 3
   - Note down the **Client ID** and **Client Secret** provided by your IdP

5. In your IdP, locate the **Discovery Endpoint** (also called the well-known configuration endpoint). This is typically in the following format:
   ```
   https://your-idp-domain/.well-known/openid-configuration

   ```

6. In n8n, complete the OIDC configuration:
   
   - **Discovery Endpoint**: Enter the discovery endpoint URL from your IdP
   - **Client ID**: Enter the client ID you received when registering your application with your IdP
   - **Client Secret**: Enter the client secret you received when registering your application with your IdP

## Provider-specific OIDC setup

### Auth0

1. **Create an application in Auth0**:

   - Log in to your Auth0 Dashboard
   - Go to **Applications** > **Applications**
   - Click **Create Application**
   - Enter a name (e.g., "n8n SSO") and select **Regular Web Applications**
   - Click **Create**

2. **Configure the application**:

   - Go to the **Settings** tab of your new application
   - **Allowed Callback URLs**: Add your n8n redirect URL from settings>SSO>OIDC
   - **Allowed Web Origins**: Add your n8n base URL (e.g. `https://yourworkspace.app.n8n.cloud`)
   - Click **Save Changes**

3. **Get your credentials**:

   - **Client ID**: Found in the **Settings** tab
   - **Client Secret**: Found in the **Settings** tab
   - **Discovery Endpoint**: `https://{your-auth0-domain}.auth0.com/.well-known/openid-configuration`

6. **In n8n, complete the OIDC configuration:**

   - **Discovery Endpoint**: Enter the discovery endpoint URL from your IdP
   - **Client ID**: Enter the client ID you received when registering your application with your IdP
   - **Client Secret**: Enter the client secret you received when registering your application with your IdP

7. Select **Save settings**.
9. Set OIDC to **Activated**.

## Discovery endpoints reference
- **Google**: Discovery endpoint example `https://accounts.google.com/.well-known/openid-configuration`
- **Microsoft Azure AD**: Discovery endpoint example `https://login.microsoftonline.com/{tenant-id}/v2.0/.well-known/openid-configuration`
- **Auth0**: Discovery endpoint example `https://{your-domain}.auth0.com/.well-known/openid-configuration`
- **Okta**: Discovery endpoint example `https://{your-domain}.okta.com/.well-known/openid-configuration`

