---
description: Learn what n8n Enterprise offers, follow the Enterprise journey, and explore Enterprise features for n8n Cloud and self-hosted instances.
layout:
  description:
    visible: false
---

# Enterprise Hub

n8n Enterprise adds the security, governance, and scale features that organizations need to run n8n across many teams. You can use Enterprise on n8n Cloud, where n8n hosts it for you, or self-host it on your own infrastructure.

## Your Enterprise journey

Follow these five steps to go from first setup to an Enterprise rollout that grows with your organization.

{% stepper %}
{% step %}
### Technical setup

Set up your n8n Enterprise instance on n8n Cloud or on your own infrastructure. See [Technical setup](#technical-setup).
{% endstep %}

{% step %}
### Activate first workflow

Build and run your first workflow on your new instance.
{% endstep %}

{% step %}
### Operating model setup

Decide how your teams access n8n, share work, and manage changes.
{% endstep %}

{% step %}
### Confirmation of business value

Check that your workflows deliver the results you expected.
{% endstep %}

{% step %}
### Expansion and training

Bring more teams and use cases onto n8n, and train users to build with it.
{% endstep %}
{% endstepper %}

## Enterprise features

Explore the main features that Enterprise unlocks.

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><i class="fa-key">:key:</i> <strong>Single sign-on (SSO)</strong></td><td>Let users sign in with your identity provider using SAML, OIDC, or LDAP.</td><td><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/verify-user-identity">Verify user identity</a></td></tr><tr><td><i class="fa-user-shield">:user-shield:</i> <strong>Role-based access control (RBAC)</strong></td><td>Control what each user can do with built-in and custom roles.</td><td><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac">Set permissions and roles (RBAC)</a></td></tr><tr><td><i class="fa-folder-tree">:folder-tree:</i> <strong>Projects</strong></td><td>Group workflows and credentials by team, and control who can access them.</td><td><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects">Organize work in projects</a></td></tr><tr><td><i class="fa-code-branch">:code-branch:</i> <strong>Source control and environments</strong></td><td>Use Git to version your work and move it between development and production.</td><td><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments">Use source control and environments</a></td></tr><tr><td><i class="fa-vault">:vault:</i> <strong>External secrets</strong></td><td>Keep credentials in your own secrets vault instead of in n8n.</td><td><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/use-external-secret-stores">External secrets</a></td></tr><tr><td><i class="fa-wave-pulse">:wave-pulse:</i> <strong>Log streaming</strong></td><td>Send n8n events to your external logging and monitoring tools.</td><td><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/stream-logs-to-external-systems">Stream logs to external systems</a></td></tr><tr><td><i class="fa-chart-line">:chart-line:</i> <strong>Insights</strong></td><td>Track workflow performance and time saved across your instance.</td><td><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/track-usage-with-insights">Insights</a></td></tr><tr><td><i class="fa-server">:server:</i> <strong>Multi-main mode</strong></td><td>Run several main instances for high availability on self-hosted n8n.</td><td><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/enable-queue-mode#multi-main-setup">Enable queue mode</a></td></tr></tbody></table>

## Technical setup

n8n Cloud users can skip this section, because n8n handles hosting, scaling, and upgrades for you. If you host n8n Enterprise on your own infrastructure, use these guides to plan, install, secure, and maintain your instance.

<table data-view="cards"><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><i class="fa-clipboard-check">:clipboard-check:</i> <strong>Prerequisites</strong></td><td><ul><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/understand-the-architecture">Understand the architecture</a></li><li>Host n8n prerequisites</li></ul></td></tr><tr><td><i class="fa-download">:download:</i> <strong>Installation</strong></td><td><ul><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/install-options">Install options</a></li></ul></td></tr><tr><td><i class="fa-shield-halved">:shield-halved:</i> <strong>Security</strong></td><td><ul><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security">Security</a></li><li>Enterprise security best practices checklist</li></ul></td></tr><tr><td><i class="fa-layer-group">:layer-group:</i> <strong>Scaling and queue mode</strong></td><td><ul><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling">Scaling</a></li></ul></td></tr><tr><td><i class="fa-wave-pulse">:wave-pulse:</i> <strong>Monitoring and logging</strong></td><td><ul><li>Monitoring and logging best practice pack</li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/keep-n8n-running/monitor-n8n">Monitor n8n</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/keep-n8n-running/set-up-logging">Set up logging</a></li></ul></td></tr><tr><td><i class="fa-life-ring">:life-ring:</i> <strong>Backup and disaster recovery</strong></td><td><ul><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/keep-n8n-running/backup-and-restore">Back up and restore</a></li></ul></td></tr><tr><td><i class="fa-code-branch">:code-branch:</i> <strong>Source control and environments</strong></td><td><ul><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments/understand-source-control">Understand source control</a></li><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments">Use source control and environments</a></li></ul></td></tr><tr><td><i class="fa-arrow-up-right-dots">:arrow-up-right-dots:</i> <strong>Upgrade guide</strong></td><td><ul><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/keep-n8n-running/update-n8n">Update n8n</a></li></ul></td></tr><tr><td><i class="fa-ruler-combined">:ruler-combined:</i> <strong>Infrastructure sizing</strong></td><td><ul><li>Terraform sizing recommendations</li></ul></td></tr></tbody></table>
