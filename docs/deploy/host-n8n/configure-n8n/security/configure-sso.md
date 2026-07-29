---
title: Set up Single Sign-On (SSO)
description: Set up SAML or OIDC Single Sign-On for your self-hosted n8n instance.
contentType: howto
nodeTitle: Configure SSO
originalFilePath: hosting/securing/set-up-sso.md
originalUrl: 'https://docs.n8n.io/hosting/securing/set-up-sso'
url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/configure-sso'
layout:
  description:
    visible: false
---

# Set up Single Sign-On (SSO) <a href="#set-up-single-sign-on-sso" id="set-up-single-sign-on-sso"></a>

{% hint style="info" %}
**Feature availability**

* Available on Business and Enterprise plans.
* You need to be an instance owner or admin to enable and configure SAML or OIDC.
{% endhint %}

n8n supports the SAML and OIDC authentication protocols for single sign-on (SSO). See [OIDC vs SAML](https://www.onelogin.com/learn/oidc-vs-saml) for more general information on the two protocols, the differences between them, and their respective benefits.

* [Set up SAML](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/verify-user-identity/use-saml/set-up-saml): a general guide to setting up SAML in n8n, and links to resources for common identity providers (IdPs).
* [Set up OIDC](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/verify-user-identity/use-oidc/set-up-oidc): a general guide to setting up OpenID Connect (OIDC) SSO in n8n.

## Configure SSO with environment variables <a href="#configure-sso-with-environment-variables" id="configure-sso-with-environment-variables"></a>

You can also configure SSO from environment variables instead of through the UI. Available from n8n v2.18.0. See [SSO environment variables](../basic-configuration/use-environment-variables/sso.md) for the full list of variables, and [Manage instance settings using environment variables](../manage-settings-using-environment-variables.md) for how the activation pattern works.
