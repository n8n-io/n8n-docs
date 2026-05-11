---
title: Securing n8n
contentType: overview
---

# Securing n8n

Securing your n8n instance can take several forms.

At a high level, you can:

* Conduct a [security audit](/hosting/securing/security-audit.md) to identify security risks.
* [Set up SSL](/hosting/securing/set-up-ssl.md) to enforce secure connections.
* [Set up Single Sign-On](/hosting/securing/set-up-sso.md) for user account management.
* Use [two-factor authentication (2FA)](/user-management/two-factor-auth.md) for your users.
* Enable [encryption key rotation](/hosting/securing/encryption-key-rotation.md) to periodically replace the key that encrypts credentials and other sensitive data.

You can also protect sensitive data processed by your workflows:

* [Redact execution data](/workflows/executions/execution-data-redaction.md) to hide input and output data from workflow executions.

More granularly, consider blocking or opting out of features or data collection you don't want:

* [Disable the public API](/hosting/securing/disable-public-api.md) if you aren't using it.
* [Opt out of data collection](/hosting/securing/telemetry-opt-out.md) of the anonymous data n8n collects automatically.
* [Block certain nodes](/hosting/securing/blocking-nodes.md) from being available to your users.
* [Protect against SSRF attacks](/hosting/securing/ssrf-protection.md) to control which hosts and IP ranges workflow nodes can connect to.
* [Restrict account registration](/hosting/securing/restrict-by-email-verification.md) to email-verified users.