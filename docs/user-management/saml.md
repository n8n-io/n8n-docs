# Security Assertion Markup Language (SAML)

!!! info "Feature availability"
	* Available on Self-hosted Enterprise and Power Cloud plans.
	* You need access to the n8n instance owner account to enable and configure SAML

	Available from version [TODO] onwards.

This page tells you how to enable SAML in n8n. It assumes you're familiar with SAML. If you're not, [SAML Explained in Plain English](https://www.onelogin.com/learn/saml){:target=_blank .external-link} can help you understand how SAML works, and its benefits.

[TODO

- any limits on supported providers (e.g. metabase limits Okta)
- version
- 
]

## Enable SAML


1. In n8n, go to **Settings** > **Authentication**. n8n shows a list of single sign-on options.
1. Set **SAML 2.0** to **Activated**. You can only have one single sign-on method active.
1. Make a note of the n8n **Redirect URL** and **Entity ID**.
1. Set up SAML with your IdP. You need the redirect URL and entity ID. You may also need an email address and name for the IdP user.

