---
title: Set up SAML
description: Generic setup instructions for using SAML SSO with n8n.
---

# Set up SAML

!!! info "Feature availability"
	* Available on Enterprise plans.
	* You need access to the n8n instance owner account to enable and configure SAML

	Available from version 0.225.0 onwards.

This page tells you how to enable SAML SSO (single sign-on) in n8n. It assumes you're familiar with SAML. If you're not, [SAML Explained in Plain English](https://www.onelogin.com/learn/saml){:target=_blank .external-link} can help you understand how SAML works, and its benefits.

## Enable SAML

1. In n8n, go to **Settings** > **SSO**.
1. Make a note of the n8n **Redirect URL** and **Entity ID**.
	1. **Optional**: if your IdP allows you to set up SAML from imported metadata, navigate to the **Entity ID** URL and save the XML. 
1. Set up SAML with your IdP (identity provider). You need the redirect URL and entity ID. You may also need an email address and name for the IdP user.
1. After completing setup in your IdP, download the metadata XML from your IdP.
1. In n8n, copy the raw XML into **Identity Provider Settings**.
1. Select **Save settings**.
1. Select **Test settings** to check your SAML setup is working.
1. Set SAML 2.0 to **Activated**.

## Generic IdP setup

The steps to configure the IdP vary depending on your chosen IdP. These are some common setup tasks:

* Create an app for n8n in your IdP.
* Map n8n attributes to IdP attributes:

	| Name | Name format | Value (IdP side) |
	| ---- | ----------- | ---------------- |
	| http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress | URI Reference | User email       |
	| http://schemas.xmlsoap.org/ws/2005/05/identity/claims/firstname    | URI Reference | User First Name  |
	| http://schemas.xmlsoap.org/ws/2005/05/identity/claims/lastname     | URI Reference | User Last Name   |
	| http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn          | URI Reference | User Email       |

## Setup resources for common IdPs

Documentation links for common IdPs.

| IdP | Documentation |
| --- | ------------- |
| Auth0 | [Configure Auth0 as SAML Identity Provider: Manually configure SSO integrations](https://auth0.com/docs/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider#manually-configure-sso-integrations){:target=_blank .external-link} |
| Authentik | [Applications](https://goauthentik.io/docs/applications){:target=_blank .external-link} and the [SAML Provider](https://goauthentik.io/docs/providers/saml/){:target=_blank .external-link} |
| Azure AD | [SAML authentication with Azure Active Directory](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml){:target=_blank .external-link} |
| Keycloak | Choose a [Getting Started](https://www.keycloak.org/guides#getting-started){:target=_blank .external-link} guide depending on your hosting. |
| Okta | n8n provides a [Workforce Identity setup guide](/user-management/saml/okta/) |
| PingIdentity | [PingOne SSO](https://docs.pingidentity.com/r/en-us/pingone/pingone_p1sso_start){:target=_blank .external-link} |

## Deleting users

If you remove a user from your IdP, they remain logged in to n8n. You need to manually remove them from n8n as well. Refer to [Manage users](/user-management/manage-users/) for guidance on deleting users.

