---
title: Set up SAML
description: Generic setup instructions for using SAML SSO with n8n.
contentType: howto
---

# Set up SAML

--8<-- "_snippets/user-management/sso-saml-availability.md"

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

From version `1.122.2` upwards, n8n supports provisioning the instance role and project roles from your IdP.

You need to configure these attributes on the groups or individual users in your IdP:

| Value (IdP side) | Data type | Name |
| ---------------- | ----------- | ---- |
| `n8n_instance_role` | string | `n8n_instance_role` |
| `n8n_projects` | array | `n8n_projects` |

On the form on the **Settings** > **SSO** page, located the dropdown labeled **User role provisioning**. n8n sets the default value of this dropdown to **Managed in n8n**.

You can choose to set it to one of these values:

- **Instance role**
    * Only the instance role of each provisioned user is read from the `n8n_instance_role` attribute from the SAML response. Project access is still managed inside n8n only.
    * If there is no value for `n8n_instance_role` configured on your IdP, the `global:member` role is used as fallback.
- **Instance and project roles**
    * Both the instance role and project access of each provisioned user are read from the `n8n_instance_role` and `n8n_projects` attributes from the SAML response.

/// warning | Existing access will be overwritten
Once you enable "User role provisioning", the next time any user logs in via SAML, any access they've been granted inside n8n, which isn't reflected in the n8n_instance_role and n8n_projects will be removed from that user.

When activating this feature, you are required to download two CSV files before you can save this change. These files contain all your current access settings should you need to reference them.
///

#### Configuring n8n_instance_role attribute

The `n8n_instance_role` attribute is a string configured for a group or user on your IdP.

Supported instance roles are:

* `global:member`
* `global:admin`

#### Configuring n8n_projects attribute

The `n8n_projects` attribute is a string array configured for a group or user on your IdP.

Each element in this array needs to follow this format:
`<project-id>:<role>`

For example:

* `bHsykgeFirmIhezz:viewer`
* `4K3zrg3DvlMFFTB7:editor`
* `dCjnYuEpYOUBVaNe:admin`

For existing access settings at the time of enabling project access provisioning through your IdP, you can find the project IDs in the downloaded CSV file.

When creating a project from scratch, get the project ID from the URL when viewing the project in your browser:

In the URL `<your-domain>/projects/VVRWZaq5DRxaf9O1/workflows` for example, the project ID is `VVRWZaq5DRxaf9O1`.


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
