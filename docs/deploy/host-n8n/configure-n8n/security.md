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

Securing your n8n instance can take several forms.

At a high level, you can:

* Conduct a [security audit](security/run-security-audits.md) to identify security risks.
* [Set up SSL](security/set-up-ssl.md) to enforce secure connections.
* [Set up Single Sign-On](security/configure-sso.md) for user account management.
* Use [token exchange](../deploy-as-an-oem-integration/set-up-token-exchange.md) to log users in from your own identity provider when embedding n8n, or to call n8n APIs on their behalf.
* Use [two-factor authentication (2FA)](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/verify-user-identity/require-two-factor-auth) for your users.
* Enable [encryption key rotation](security/rotate-encryption-keys.md) to periodically replace the key that encrypts credentials and other sensitive data.
* Enable [JWE token decryption for OAuth 2.0 credentials](security/decrypt-oauth-20-tokens-with-jwe.md) so your identity provider can encrypt access and ID tokens that only your instance can decrypt.

You can also protect sensitive data processed by your workflows:

* [Redact execution data](security/redact-execution-data.md) to hide input and output data from workflow executions.

More granularly, consider blocking or opting out of features or data collection you don't want:

* [Disable the public API](security/disable-the-public-api.md) if you aren't using it.
* [Opt out of data collection](security/control-telemetry.md) of the anonymous data n8n collects automatically.
* [Block certain nodes](security/block-specific-nodes.md) from being available to your users.
* [Protect against SSRF attacks](security/enable-ssrf-protection.md) to control which hosts and IP ranges workflow nodes can connect to.
* [Restrict account registration](security/verify-user-emails.md) to email-verified users.
