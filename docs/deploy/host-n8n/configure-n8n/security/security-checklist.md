---
description: Check the network, secrets, access, and operations settings that secure a production, self-hosted n8n instance.
layout:
  description:
    visible: false
---

# Security checklist for production

Use this checklist to confirm that a self-hosted n8n instance meets baseline security requirements before and after go-live. Each item links to the page that explains how to do it.

{% hint style="info" %}
**Feature availability**

This checklist applies to self-hosted n8n. It doesn't apply to n8n Cloud, where n8n manages the infrastructure settings. Items marked **(Business, Enterprise)** or **(Enterprise)** need that plan. The rest apply to every self-hosted edition.
{% endhint %}

## Network and TLS

- [ ] TLS 1.2 or later with a valid certificate, terminated at a reverse proxy or load balancer. Refer to [Set up SSL](set-up-ssl.md).
- [ ] HTTP redirects to HTTPS, and the proxy sets security headers such as HSTS. Refer to [Set up SSL](set-up-ssl.md).
- [ ] n8n isn't exposed directly to the internet, and only the ports you need are open. Refer to [Production requirements](../../install-options/production-requirements.md#network).
- [ ] `N8N_PROXY_HOPS`, `N8N_EDITOR_BASE_URL`, and the webhook URL variables match your proxy setup. Refer to [Configure n8n webhooks with reverse proxy](../basic-configuration/configuration-examples/configure-webhook-urls-with-reverse-proxy.md).
- [ ] You configure Content Security Policy (CSP) in n8n, not at the proxy. Before n8n 3.0, n8n only reports violations through `N8N_CONTENT_SECURITY_POLICY_REPORT_ONLY`. Review them, then enforce with `N8N_CONTENT_SECURITY_POLICY=default`. From n8n 3.0, n8n enforces a policy by default. Refer to [Security environment variables](../basic-configuration/use-environment-variables/security.md).
- [ ] To restrict which sites can embed n8n, you add `frame-ancestors` to `N8N_CONTENT_SECURITY_POLICY`.
- [ ] If you use SAML SSO with POST binding, your policy doesn't include `form-action 'self'`.
- [ ] You restrict outbound requests from nodes to the hosts they need. Refer to [SSRF protection](enable-ssrf-protection.md).
- [ ] You limit sensitive endpoints to approved IP ranges where appropriate, for example at your firewall or proxy.

## Secrets and credentials

- [ ] `N8N_ENCRYPTION_KEY` is a strong random value, the same on every main instance, worker, and webhook processor, and different in each environment. Refer to [Set a custom encryption key](../basic-configuration/configuration-examples/set-a-custom-encryption-key.md).
- [ ] You back up the encryption key in a different location from the instance. If you lose it, n8n can't decrypt your stored credentials.
- [ ] You don't change `N8N_ENCRYPTION_KEY` on an existing database. Changing it stops n8n from starting.
- [ ] Data encryption key rotation is on, with a rotation schedule. Refer to [Encryption key rotation](rotate-encryption-keys.md).
- [ ] **(Enterprise)** An external secrets store holds production credentials. Refer to [External secrets](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/use-external-secret-stores).
- [ ] You don't store credentials in workflow parameters, Git-tracked configuration files, or Kubernetes values files.
- [ ] **(Business, Enterprise)** You share credentials only with the projects that need them. Refer to [Share credentials securely](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/share-credentials-securely).

## Authentication and access

- [ ] Users sign in with SAML **(Business, Enterprise)**, OIDC **(Enterprise)**, or LDAP **(Business, Enterprise)**. Refer to [Set up Single Sign-On (SSO)](configure-sso.md).
- [ ] **(Enterprise)** You require two-factor authentication for all users who sign in with email and password. Refer to [Security settings](manage-security-policies.md).
- [ ] Users have the least privilege they need, and you don't use the instance owner account for regular work. Refer to [Understand instance roles](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/understand-instance-roles).
- [ ] You remove inactive users. Refer to [Add and remove users](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/manage-users/add-and-remove-users).
- [ ] The session duration matches your policy. Refer to the `N8N_USER_MANAGEMENT_JWT_DURATION_HOURS` variable in [User management SMTP, and two-factor authentication environment variables](../basic-configuration/use-environment-variables/user-management-and-2fa.md).
- [ ] The public API is disabled if nobody uses it. Refer to [Disable the public REST API](disable-the-public-api.md).

## Nodes and code execution

- [ ] You block nodes that run commands or access the host, such as Execute Command, SSH, and Read/Write Files from Disk. If you set `NODES_EXCLUDE`, it replaces the default list, so include the nodes n8n blocks by default. Refer to [Block access to nodes](block-specific-nodes.md).
- [ ] Code nodes and expressions can't read environment variables. n8n blocks this by default, so confirm that `N8N_BLOCK_ENV_ACCESS_IN_NODE` isn't set to `false`. Refer to [Security environment variables](../basic-configuration/use-environment-variables/security.md).
- [ ] You harden task runners. Refer to [Hardening task runners](harden-task-runners.md).
- [ ] Webhooks that accept external input require authentication. Refer to [Webhook](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.webhook#supported-authentication-methods).

## Governance and operations

- [ ] **(Enterprise)** Log streaming sends events to your logging or SIEM tool. Refer to [Log streaming](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/stream-logs-to-external-systems).
- [ ] Execution data retention matches your compliance policy. Refer to [Execution data](../scaling/manage-execution-data.md).
- [ ] **(Enterprise)** You redact sensitive execution data where needed. Refer to [Redact execution data](redact-execution-data.md).
- [ ] You turn off telemetry, version notifications, and templates if your policy requires it. Refer to [Control telemetry](control-telemetry.md) and the `N8N_TEMPLATES_ENABLED` variable in [Deployment environment variables](../basic-configuration/use-environment-variables/deployment.md).
- [ ] You've run a security audit and reviewed the findings. Refer to [Security audit](run-security-audits.md).
- [ ] You run separate development and production instances.
- [ ] **(Enterprise)** You promote changes between instances with Environments, and you protect production from edits in the UI. Refer to [Plan your environments](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/environments/plan-your-environments) and [Protect a production instance](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/environments/protect-a-production-instance), which is in Preview.
- [ ] Backup and update procedures are in place. Refer to [Back up and restore](../../keep-n8n-running/backup-and-restore.md) and [Update self-hosted n8n](../../keep-n8n-running/update-n8n.md).

## Related resources

- [Securing n8n](../security.md)
- [Production requirements](../../install-options/production-requirements.md)
