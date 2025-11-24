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
	1. **Optional**: if your IdP allows you to set up SAML from imported metadata, navigate to the **Entity ID** URL and save the XML. 
	2. **Optional**: if you are running n8n behind a load balancer make sure you have `N8N_EDITOR_BASE_URL` configured. 
1. Set up SAML with your IdP (identity provider). You need the redirect URL and entity ID. You may also need an email address and name for the IdP user.
1. After completing setup in your IdP, load the metadata XML into n8n. You can use a metadata URL or raw XML:
	1. **Metadata URL**: Copy the metadata URL from your IdP into the **Identity Provider Settings** field in n8n.
	1. **Raw XML**: Download the metadata XML from your IdP, toggle **Identiy Provider Settings** to **XML**, then copy the raw XML into **Identity Provider Settings**.
1. Select **Save settings**.
1. Select **Test settings** to check your SAML setup is working.
1. Set SAML 2.0 to **Activated**.

/// note | SAML Request Type
Please note, n8n currently doesn't support `POST` binding. Please configure your IdP to use `HTTP` request binding instead. 
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

From version `1.122.1` upwards, n8n supports provisioning the instance role and project roles via SAML.

You need to configure these attributes on the groups or individual users in your IdP:

| Value (IdP side) | Name format | Name |
| ---------------- | ----------- | ---- |
| n8n_instance_role | string | n8n_instance_role |
| n8n_projects | array | n8n_projects |

Inside the form on the **Settings** > **SSO** page, you will find a dropdown labeled "User role provisioning" in the form.

By default this is set to "Manged in n8n".

You can choose to set it to:

- Instance role
    * Only the instance role of each provisioned user will be read from the `n8n_instance_role` attribute from the SAML response. Project access will still be managed inside n8n only.
    * If there is no value for `n8n_instance_role` configured on your IdP, the `global:member` role is used as fallback.
- Instance and project roles
    * Both the instance role and project access of each provisioned user will be read from the `n8n_instance_role` and `n8n_projects` attributes from the SAML response.

/// warning | Data loss
Once you enable "User role provisioning", the next time any user logs in via SAML, any access they've been granted inside n8n, which is not reflected in the n8n_instance_role and n8n_projects will be removed from that user.

This is why it is required to download two csv files with the current access settings of all your users before you can save this change.
///

**Configuring n8n_instance_role attribute**

The n8n_instance_role attribute is a simple string configured for a group or user on your IdP.

Supported instance roles are:
- global:member
- global:admin

**Configuring n8n_projects attribute**

The n8n_projects attribute is a string array configured for a group or user on your IdP.

Each element in this array needs to follow this format:
<project-id>:<role>

For example:
* bHsykgeFirmIhezz:viewer
* 4K3zrg3DvlMFFTB7:editor
* dCjnYuEpYOUBVaNe:admin

For existing access settings at the time of enabling project access provisioning via your IdP, you can find the project IDs in the downloaded csv file.
When creating a project from scratch, get the project ID from the URL when viewing the project in your browser:
In `<your-domain>/projects/VVRWZaq5DRxaf9O1/workflows` for example, the porjec


## Setup resources for common IdPs

Documentation links for common IdPs.

| IdP | Documentation |
| --- | ------------- |
| Auth0 | [Configure Auth0 as SAML Identity Provider: Manually configure SSO integrations](https://auth0.com/docs/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider#manually-configure-sso-integrations) |
| Authentik | [Applications](https://goauthentik.io/docs/applications) and the [SAML Provider](https://docs.goauthentik.io/add-secure-apps/providers/saml/) |
| Azure AD | [SAML authentication with Azure Active Directory](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml) |
| JumpCloud | [How to setup SAML (SSO) applications with JumpCloud](https://jumpcloud.com/support/integrate-with-zoom#configuring-the-sso-integration) (using `Zoom` as an example) |
| Keycloak | Choose a [Getting Started](https://www.keycloak.org/guides#getting-started) guide depending on your hosting. |
| Okta | n8n provides a [Workforce Identity setup guide](/user-management/saml/okta.md) |
| PingIdentity | [PingOne SSO](https://docs.pingidentity.com/pingone/getting_started_with_pingone/p1_p1sso_start.html) |

