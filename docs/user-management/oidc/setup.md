---
title: Set up OIDC
description: Set up instructions for enabling OIDC SSO with n8n.
contentType: howto
---

# Set up OIDC

--8<-- "_snippets/user-management/sso-oidc-availability.md"

/// note | Configure using environment variables
You can also configure OIDC from environment variables instead of the UI. Available from n8n v2.18.0. See [SSO environment variables](/hosting/configuration/environment-variables/sso.md).
///

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

n8n supports provisioning the instance role and project roles via SSO. When a user signs in via OIDC, n8n can assign their instance role and project access automatically based on claims in the IdP response.

Role provisioning was introduced in version `1.122.2`.

#### Choose how roles are assigned

In n8n, go to **Settings** > **SSO**. Use the **Role assignment** dropdown to choose how n8n assigns roles to users who sign in via SSO. The default is **Assigned manually in n8n**.

The options are:

- **Assigned manually in n8n**: admins assign every role directly in n8n. No automatic mapping from your IdP.
- **Instance roles via SSO**: n8n reads the user's instance role from the IdP at login. Project access is still managed manually in n8n.
- **Instance and project roles via SSO**: n8n reads both the instance role and project access from the IdP at login.

Roles are re-evaluated on every login, so changes in the IdP take effect at the user's next sign-in.

/// warning | Existing access will be overwritten
When you enable one of the SSO provisioning modes, any access granted inside n8n that isn't reflected in the IdP response is removed from users on their next login.

Before saving this change, n8n asks you to download two CSV files containing your current access settings. Keep these for reference.
///

#### Choose a role mapping method

When **Role assignment** is set to **Instance roles via SSO** or **Instance and project roles via SSO**, a **Role mapping method** dropdown appears. You can choose:

- **Map rules on your IdP**: n8n reads n8n-specific claims (`n8n_instance_role` and `n8n_projects`) directly from the IdP response. Your IdP admin configures which n8n role or project each user or group should receive.
- **Map rules inside n8n**: you define expressions in n8n that evaluate the user's OIDC claims and return a role. Use this when your IdP can't encode n8n-specific role logic, or when IT governance makes IdP-side changes slow.

#### Map rules on your IdP

Add an additional scope called `n8n` to your OIDC authorization server with these two claims:

| **Name** | **Data type** | **Scope** | **Token type** |
| -------- | ------------- | --------- | -------------- |
| `n8n_instance_role` | string | `n8n` | ID |
| `n8n_projects` | string array | `n8n` | ID |

Both claims must always be included in the ID Token from your authorization server. Configure them on the user groups in your IdP that have access to n8n.

**Configuring the `n8n_instance_role` claim**

`n8n_instance_role` is a string configured for a group or user on your IdP. If no value is set, n8n falls back to `global:member`.

Supported instance roles:

- `global:member`
- `global:admin`
- `global:chatUser`

**Configuring the `n8n_projects` claim**

`n8n_projects` is a string array configured for a group or user on your IdP. Each element must follow the format `<project-id>:<role>`.

For example:

- `bHsykgeFirmIhezz:viewer`
- `4K3zrg3DvlMFFTB7:editor`
- `dCjnYuEpYOUBVaNe:admin`

For existing access at the time of enabling project provisioning, find the project IDs in the downloaded CSV file.

For new projects, get the project ID from the URL when viewing the project in your browser. In the URL `<your-domain>/projects/VVRWZaq5DRxaf9O1/workflows`, the project ID is `VVRWZaq5DRxaf9O1`.

#### Map rules inside n8n

**Map rules inside n8n** is available from version `2.19.0` upwards.

Use this option to define group-to-role mappings inside n8n rather than in your IdP. Each rule is an expression that n8n evaluates against the OIDC claims in the IdP response.

**How expressions work**

- Expressions access all OIDC claims from the IdP response through a `$claims` object.
- If the expression returns `true`, n8n assigns the role you've selected on that rule.
- Rules are evaluated top-to-bottom. The first matching rule wins.
- Rules re-evaluate on every login, so role changes take effect at the user's next session.
- `$claims` exposes the raw IdP response. n8n doesn't normalise it, so write expressions against the structure your IdP actually sends.

/// note | Send a groups claim from your IdP
Most group-based rules need a `groups` claim in the OIDC response. This claim isn't included by default, you need to configure your IdP to send it. For example, add a `groups` scope in Okta, or configure the `groups` claim in the Azure AD token configuration. Inspect your IdP's response before writing rules so you know the exact claim name and structure.
///

**Example userinfo response**

After authenticating, n8n calls the IdP's userinfo endpoint to fetch the user's claims. A typical response looks like this:

```json
{
  "sub": "00uwyqw9raWrKRJ0Q697",
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "email_verified": true,
  "given_name": "Jane",
  "family_name": "Doe",
  "groups": [
    "Everyone",
    "n8n admins",
    "n8n members",
    "Operations"
  ]
}
```

`$claims` reflects this payload. So `$claims.email` is a string, `$claims.groups` is an array of strings, and you can use standard JavaScript methods on either. The exact group names depend on your IdP. Some providers (for example Azure AD) send group UUIDs rather than display names, in which case your expressions need to reference the UUID.

To inspect your own userinfo response in Okta, call the userinfo endpoint directly with a valid access token. You can get a test access token from **Security** > **API** > **Authorization Servers** > your server > **Token Preview** tab, then run:

```
curl -H "Authorization: Bearer <access-token>" https://<your-okta-domain>/oauth2/<auth-server-id>/v1/userinfo
```

**Instance role rules**

Under **Instance role rules**, select **Add rule** to create a rule. Enter a condition expression and choose the instance role to assign when the condition returns `true`.

For example, to assign the **Admin** role to any user in the IdP `admin` group:

```
{{ $claims.groups.includes('admin') }}
```

The **Default condition** row sets the role that users receive when no rule matches. By default this is **Member**.

**Project role rules**

Under **Project role rules**, select **Add rule** to create a rule that assigns a project role in one or more projects.

For example, to give users in the `operations` group the **Project Editor** role in the **Operations** project, set the expression to:

```
{{ $claims.groups.includes('operations') }}
```

Choose the role in the **assign** field and the target projects in the **in** field. Users who don't match any project rule get no project access.

/// warning | Manual role management is disabled
When **Map rules inside n8n** is active, the UI controls for manually assigning user roles are disabled. All role assignment flows through the mapping rules.
///

/// warning | Switching mapping methods
Switching from **Map rules inside n8n** back to **Map rules on your IdP** removes any in-n8n mappings. Users may lose their currently assigned roles on their next login if equivalent mappings aren't set up in your IdP. n8n asks you to confirm before applying this change.
///


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
