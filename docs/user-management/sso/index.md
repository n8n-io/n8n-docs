---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Single Sign-On (SSO)
description: "Configuring single sign-on for your self-hosted n8n instance."
---

# Single Sign-On (SSO)

/// info | Feature availability
* Available on Enterprise plans.
* You need to be an instance owner or admin to enable and configure SAML or OIDC.
* You need to be an instance owner to enable and configure LDAP.
///	

n8n supports the SAML and OIDC authentication protocols for single sign-on (SSO). See [OIDC vs SAML](https://www.onelogin.com/learn/oidc-vs-saml) for more general information on the two protocols, the differences between them, and their respective benefits.

* [Set up SAML](/user-management/saml/setup.md): a general guide to setting up SAML in n8n, and links to resources for common identity providers (IdPs).
* [Set up OIDC](/user-management/oidc/setup.md): a general guide to setting up OpenID Connect (OIDC) SSO in n8n.

n8n also supports Lightweight Directory Access Protocol (LDAP) for accessing and authenticating users by connecting to an external directory:

* [Configuring LDAP](/user-management/ldap.md): a page covering how to enable, connect to, and manage users with an LDAP directory.
