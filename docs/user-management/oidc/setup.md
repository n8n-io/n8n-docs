---
title: Set up OIDC
description: Set up instructions for enabling OIDC SSO with n8n.
contentType: howto
---

# Set up OIDC

--8<-- "_snippets/user-management/sso-oidc-availability.md"

## Setting up and enabling OIDC


1. In n8n, go to **Settings** > **SSO**.
1. Under **Select Authentication Protocol**, choose **OIDC** from the dropdown.
1. Copy the **redirect URL** shown (for example, `https://yourworkspace.app.n8n.cloud/rest/sso/oidc/callback`).

	/// note | Extra configuration for load balancers or proxies
	If you are running n8n behind a load balancer, make sure you set the [`N8N_EDITOR_BASE_URL` environment variable](/hosting/configuration/environment-variables/deployment.md).
	///

1. Set up OIDC with your identity provider (IdP). You'll need to:
	- Create a new OIDC client/application in your IdP.
	- Configure the redirect URL from the previous step.
	- Note down the **Client ID** and **Client Secret** provided by your IdP.
1. In your IdP, locate the **Discovery Endpoint** (also called the well-known configuration endpoint). It typically has the following format:
	```
	https://your-idp-domain/.well-known/openid-configuration
	```
1. In n8n, complete the OIDC configuration:
	- **Discovery Endpoint**: Enter the discovery endpoint URL from your IdP.
	- **Client ID**: Enter the client ID you received when registering your application with your IdP.
	- **Client Secret**: Enter the client secret you received when registering your application with your IdP.
1. Select **Save settings**.
1. Set OIDC to **Activated**.

## Provider-specific OIDC setup

### Auth0

1. **Create an application in Auth0**:
	- Log in to your Auth0 Dashboard.
	- Go to **Applications** > **Applications**.
	- Click **Create Application**.
	- Enter a name (for example, "n8n SSO") and select **Regular Web Applications**.
	- Click **Create**.
1. **Configure the application**:
	- Go to the **Settings** tab of your new application.
	- **Allowed Callback URLs**: Add your n8n redirect URL from **Settings** > **SSO** > **OIDC**.
	- **Allowed Web Origins**: Add your n8n base URL (for example, `https://yourworkspace.app.n8n.cloud`).
	- Click **Save Changes**.
1. **Get your credentials**:
	- **Client ID**: Found in the **Settings** tab.
	- **Client Secret**: Found in the **Settings** tab.
	- **Discovery Endpoint**: `https://{your-auth0-domain}.auth0.com/.well-known/openid-configuration`.
1. **In n8n, complete the OIDC configuration:**
	- **Discovery Endpoint**: Enter the discovery endpoint URL from Auth0.
	- **Client ID**: Enter the client ID you found in your Auth0 settings.
	- **Client Secret**: Enter the client secret you found in your Auth0 settings.
1. Select **Save settings**.
1. Set OIDC to **Activated**.

## Discovery endpoints reference

- **Google discovery endpoint example**:
```
https://accounts.google.com/.well-known/openid-configuration
```
- **Microsoft Azure AD discovery endpoint example**:
```
https://login.microsoftonline.com/{tenant-id}/v2.0/.well-known/openid-configuration
```
- **Auth0 discovery endpoint example**:
```
https://{your-domain}.auth0.com/.well-known/openid-configuration
```
- **Okta discovery endpoint example**:
```
https://{your-domain}.okta.com/.well-known/openid-configuration
```
