# Security Assertion Markup Language (SAML)

!!! info "Feature availability"
	* Available on Enterprise plans. [TODO: and?]
	* You need access to the n8n instance owner account to enable and configure SAML

	Available from version [TODO] onwards.

This page tells you how to enable SAML SSO (single sign-on) in n8n. It assumes you're familiar with SAML. If you're not, [SAML Explained in Plain English](https://www.onelogin.com/learn/saml){:target=_blank .external-link} can help you understand how SAML works, and its benefits.

[TODO

- any limits on supported providers (e.g. metabase limits Okta)
- version
- 
]

## Enable SAML

1. In n8n, go to **Settings** > **SSO**.
1. Make a note of the n8n **Redirect URL** and **Entity ID**.
1. Set up SAML with your IdP (identity provider). You need the redirect URL and entity ID. You may also need an email address and name for the IdP user.
1. After completing setup in your IdP, download the metadata XML from your IdP.
1. In n8n, copy the raw XML into **Identity Provider Settings**.
1. Select **Save settings**, then **Test settings** to check your SAML setup is working.
1. Set SAML 2.0 to **Activated**.

## Generic IdP setup

The steps to configure the IdP vary depending on your chosen IdP. These are some common setup tasks:

* Create an app for n8n in your IdP.
* Map n8n attributes to IdP attributes: first name, last name, email address, and UPN (User Principal Name). n8n uses the email address as the unique ID in n8n. Map this to the UPN in your IdP.

## Setup resources for common IdPs

Documentation links and n8n-specific details for common IdPs.

### Auth0

[Configure Auth0 as SAML Identity Provider | Manually configure SSO integrations](https://auth0.com/docs/authenticate/protocols/saml/saml-sso-integrations/configure-auth0-saml-identity-provider#manually-configure-sso-integrations){:target=_blank .external-link}


### Authentik

### Keycloak

[TODO: different links for different hosting options, e.g. https://www.keycloak.org/getting-started/getting-started-docker]

### Okta

n8n provides a [Workforce Identity setup guide](/user-management/saml/okta/).

### OneLogin

### PingIdentity

## Troubleshooting

