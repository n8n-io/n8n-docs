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

### Instance and project access provisioning

From version `1.122.2` upwards, n8n supports provisioning the instance role and project roles from your IdP.

You need to add a an additional scope called `n8n` to your OIDC authorization server.

On this `n8n` scope, you need to add these two claims:

| **Name** | **Data type** | **Scope** | **Token type** |
| -------- | ------------- | --------- | -------------- |
| n8n_instance_role | string | n8n | ID |
| n8n_projects | string array | n8n | ID |

These two need to always be included in the "ID Token" from your authorization server.

Ensure that these two attributes are configured in the user groups of your identity provider that have access to n8n.

Inside the form on the **Settings** > **SSO** page in n8n, you will find a dropdown labeled "User role provisioning" in the form.

By default this is set to "Manged in n8n".

You can choose to set it to:

- Instance role
    * Only the instance role of each provisioned user will be read from the `n8n_instance_role` attribute from the SAML response. Project access will still be managed inside n8n only.
    * If there is no value for `n8n_instance_role` configured on your IdP, the `global:member` role is used as fallback.
- Instance and project roles
    * Both the instance role and project access of each provisioned user will be read from the `n8n_instance_role` and `n8n_projects` attributes from the SAML response.

/// warning | Existing access will be overwritten
Once you enable "User role provisioning", the next time any user logs in using SAML, any access they've been granted inside n8n, which isn't reflected in the n8n_instance_role and n8n_projects will be removed from that user.

When activating this feature, you are required to download two CSV files before you can save this change. These files contain all your current access settings should you need to reference them.
///

**Configuring n8n_instance_role attribute**

The n8n_instance_role attribute is a simple string configured for a group or user on your IdP.

Supported instance roles are:

* global:member
* global:admin

**Configuring n8n_projects attribute**

The n8n_projects attribute is a string array configured for a group or user on your IdP.

Each element in this array needs to follow this format:
<project-id>:<role>

For example:

* bHsykgeFirmIhezz:viewer
* 4K3zrg3DvlMFFTB7:editor
* dCjnYuEpYOUBVaNe:admin

For existing access settings at the time of enabling project access provisioning using your IdP, you can find the project IDs in the downloaded CSV file.

When creating a project from scratch, get the project ID from the URL when viewing the project in your browser:

In the URL `<your-domain>/projects/VVRWZaq5DRxaf9O1/workflows` for example, the project ID is `VVRWZaq5DRxaf9O1`.


## Provider-specific OIDC setup

### Okta

The steps to setup OIDC in Okta are similar as with Auth0 described below.

For Okta, you can download a visual step-by-step guide as PDF:

[n8n-oidc-with-okta.pdf](n8n-oidc-with-okta.pdf)

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
- **Amazon Cognito discovery endpoint example**:
```
https://cognito-idp.{region}.amazonaws.com/{user-pool-id}/.well-known/openid-configuration
```
