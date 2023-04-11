# Security Assertion Markup Language (SAML)

!!! info "Feature availability"
	* Available on Self-hosted Enterprise and Power Cloud plans.
	* You need access to the n8n instance owner account to enable and configure SAML

	Available from version [TODO] onwards.

This page tells you how to enable SAML SSO (single sign-on) in n8n. It assumes you're familiar with SAML. If you're not, [SAML Explained in Plain English](https://www.onelogin.com/learn/saml){:target=_blank .external-link} can help you understand how SAML works, and its benefits.

[TODO

- any limits on supported providers (e.g. metabase limits Okta)
- version
- 
]

## Enable SAML


1. In n8n, go to **Settings** > **Authentication**. n8n shows a list of single sign-on options.
1. Set **SAML 2.0** to **Activated**. You can't use SAML and LDAP at the same time.
1. Make a note of the n8n **Redirect URL** and **Entity ID**.
1. Set up SAML with your IdP (identity provider). You need the redirect URL and entity ID. You may also need an email address and name for the IdP user.
1. After completing setup in your IdP, download the metadata XML from your IdP.
1. In n8n, copy the raw XML into **Identity Provider Settings**.

### Setup guidance for common IdPs

These guides aren't full step-by-step guides. They provide documentation links, outline steps, and any n8n-specific details.

#### Auth0

[Configure Auth0 as SAML Identity Provider | Manually configure SSO integrations](https://auth0.com/docs/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider#manually-configure-sso-integrations){:target=_blank .external-link}


#### Authentik

#### Keycloak

#### Okta

[TODO: probably this but . . . https://help.okta.com/oie/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_SAML.htm]

#### OneLogin

#### PingIdentity
