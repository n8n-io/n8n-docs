---
title: Securing n8n
contentType: overview
nodeTitle: Security
originalFilePath: hosting/securing/overview.md
originalUrl: 'https://docs.n8n.io/hosting/securing/overview'
url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/security'
layout:
  description:
    visible: false
---

# Securing n8n <a href="#securing-n8n" id="securing-n8n"></a>

You can secure a self-hosted n8n instance to protect credentials and workflow data: run a security audit, set up SSL and SSO, restrict nodes and the public API, and redact execution data.

Securing your n8n instance can take several forms.

## In this section

* [Manage security policies](security/manage-security-policies.md): manage instance-wide security policies including MFA enforcement and personal space controls.
* [Run security audits](security/run-security-audits.md): run a security audit to identify security risks.
* [Set up SSL](security/set-up-ssl.md): enforce secure connections.
* [Configure SSO](security/configure-sso.md): set up SAML or OIDC Single Sign-On.
* [Rotate encryption keys](security/rotate-encryption-keys.md): periodically replace the key that encrypts credentials and other sensitive data.
* [Decrypt OAuth 2.0 tokens with JWE](security/decrypt-oauth-20-tokens-with-jwe.md): let your identity provider encrypt access and ID tokens that only your instance can decrypt.
* [Harden task runners](security/harden-task-runners.md): better isolation for Code node executions.
* [Redact execution data](security/redact-execution-data.md): hide input and output data from workflow executions.
* [Disable the public API](security/disable-the-public-api.md): prevent others from using the n8n public REST API.
* [Control telemetry](security/control-telemetry.md): opt out of the anonymous data n8n collects automatically.
* [Block specific nodes](security/block-specific-nodes.md): prevent your n8n users from accessing specific nodes.
* [Enable SSRF protection](security/enable-ssrf-protection.md): control which hosts and IP ranges workflow nodes can connect to.
* [Verify user emails](security/verify-user-emails.md): restrict account registration to email-verified users.

## Related resources

* [Configure n8n](./)
* [Set up token exchange](../deploy-as-an-oem-integration/set-up-token-exchange.md): authenticate users from your own identity provider when embedding n8n.
* [Require two-factor auth](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/verify-user-identity/require-two-factor-auth): enable 2FA for your users.
