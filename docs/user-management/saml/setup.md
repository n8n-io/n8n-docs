---
title: Set up SAML
description: Generic setup instructions for using SAML SSO with n8n.
contentType: howto
---

# Set up SAML

--8<-- "_snippets/user-management/sso-saml-availability.md"

/// note | Configure using environment variables
You can also configure SAML from environment variables instead of the UI. Available from n8n v2.18.0. See [SSO environment variables](/hosting/configuration/environment-variables/sso.md).
///

## Enable SAML

1. In n8n, go to **Settings** > **SSO**.
1. Make a note of the n8n **Redirect URL** and **Entity ID**.
	* **Optional**: If your IdP allows you to set up SAML from imported metadata, navigate to the **Entity ID** URL and save the XML. 
	* **Optional**: If you are running n8n behind a load balancer make sure you have `N8N_EDITOR_BASE_URL` configured. 
1. Set up SAML with your identity provider (IdP). You need the **Redirect URL** and **Entity ID**. You may also need an email address and name for the IdP user.
1. After completing setup in your IdP, load the metadata XML into n8n. You can use a metadata URL or raw XML:
	* **Metadata URL**: Copy the metadata URL from your IdP into the **Identity Provider Settings** field in n8n.
	* **Raw XML**: Download the metadata XML from your IdP, toggle **Identiy Provider Settings** to **XML**, and then copy the raw XML into **Identity Provider Settings**.
1. Select **Save settings**.
1. Select **Test settings** to check your SAML setup is working.
1. Set SAML 2.0 to **Activated**.

/// note | SAML Request Type
n8n doesn't support `POST` binding. Configure your IdP to use `HTTP` request binding instead. 
///

## Generic IdP setup

The steps to configure the IdP vary depending on your chosen IdP. These are some common setup tasks:

* Create an app for n8n in your IdP.
* Map n8n attributes to IdP attributes:

| Value (IdP side) | Name format | Name |
| ---------------- | ----------- | ---- |
| User email       | URI Reference | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` |
| User First Name  | URI Reference | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/firstname`    |
| User Last Name   | URI Reference | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/lastname`     |
| User Email       | URI Reference | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn`          |

### Instance and project access provisioning

n8n supports provisioning the instance role and project roles via SSO. When a user signs in via SAML, n8n can assign their instance role and project access automatically based on attributes in the SAML response.

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

- **Map rules on your IdP**: n8n reads n8n-specific attributes (`n8n_instance_role` and `n8n_projects`) directly from the SAML response. Your IdP admin configures which n8n role or project each user or group should receive.
- **Map rules inside n8n**: you define expressions in n8n that evaluate the user's SAML attributes and return a role. Use this when your IdP can't encode n8n-specific role logic, or when IT governance makes IdP-side changes slow.

#### Map rules on your IdP

Configure these attributes on the groups or individual users in your IdP:

| Value (IdP side) | Data type | Name |
| ---------------- | ----------- | ---- |
| `n8n_instance_role` | string | `n8n_instance_role` |
| `n8n_projects` | array | `n8n_projects` |

**Configuring the `n8n_instance_role` attribute**

`n8n_instance_role` is a string configured for a group or user on your IdP. If no value is set, n8n falls back to `global:member`.

Supported instance roles:

- `global:member`
- `global:admin`
- `global:chatUser`

**Configuring the `n8n_projects` attribute**

`n8n_projects` is a string array configured for a group or user on your IdP. Each element must follow the format `<project-id>:<role>`.

For example:

- `bHsykgeFirmIhezz:viewer`
- `4K3zrg3DvlMFFTB7:editor`
- `dCjnYuEpYOUBVaNe:admin`

For existing access at the time of enabling project provisioning, find the project IDs in the downloaded CSV file.

For new projects, get the project ID from the URL when viewing the project in your browser. In the URL `<your-domain>/projects/VVRWZaq5DRxaf9O1/workflows`, the project ID is `VVRWZaq5DRxaf9O1`.

#### Map rules inside n8n

**Map rules inside n8n** is available from version `2.19.0` upwards.

Use this option to define group-to-role mappings inside n8n rather than in your IdP. Each rule is an expression that n8n evaluates against the SAML attributes in the IdP response.

**How expressions work**

- Expressions access all SAML attributes from the IdP response through a `$claims` object.
- If the expression returns `true`, n8n assigns the role you've selected on that rule.
- Rules are evaluated top-to-bottom. The first matching rule wins.
- Rules re-evaluate on every login, so role changes take effect at the user's next session.
- `$claims` exposes the raw SAML attributes. n8n doesn't normalise them, so write expressions against the structure your IdP actually sends. SAML group membership is usually delivered as a multi-value attribute, but the exact shape depends on your IdP.

/// note | Check your SAML response structure
Different IdPs serialise groups and other attributes differently. Before writing rules, use a browser tool like SAML Chrome Panel (or your IdP's test tools) to inspect the SAML response and confirm the attribute names and structure.
///

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


## Setup resources for common IdPs

Documentation links for common IdPs.

| IdP | Documentation |
| --- | ------------- |
| Auth0 | [Configure Auth0 as SAML Identity Provider: Manually configure SSO integrations](https://auth0.com/docs/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider#manually-configure-sso-integrations) |
| Authentik | [Applications](https://goauthentik.io/docs/applications) and the [SAML Provider](https://docs.goauthentik.io/add-secure-apps/providers/saml/) |
| Azure AD | [SAML authentication with Azure Active Directory](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml) |
| JumpCloud | [How to setup SAML (SSO) applications with JumpCloud](https://jumpcloud.com/support/integrate-with-zoom#configuring-the-sso-integration) (using `Zoom` as an example) |
| Keycloak | Choose a [Getting Started](https://www.keycloak.org/guides#getting-started) guide depending on your hosting. |
| Okta | n8n provides a [Workforce Identity setup guide](/user-management/saml/okta.md) as well as a [step-by-step PDF guide](n8n-saml-with-okta.pdf) |
| PingIdentity | [PingOne SSO](https://docs.pingidentity.com/pingone/getting_started_with_pingone/p1_p1sso_start.html) |
