---
description: Plan, deploy, and scale n8n Enterprise across your organization.
---

# Enterprise Hub

n8n Enterprise adds the security, governance, and scale features that organizations need to run n8n across many teams. You can use Enterprise on n8n Cloud, where n8n hosts it for you, or self-host it on your own infrastructure.

{% hint style="info" %}
**Not yet signed up to n8n Enterprise?**

Learn more about [pricing and plans](https://n8n.io/pricing/), or [contact Sales](https://n8n.io/contact/) for more information.
{% endhint %}

## Your Enterprise journey

Follow these five steps to go from first setup to an Enterprise rollout that grows with your organization.

{% stepper %}
{% step %}
#### [Install and configure n8n](enterprise-hub.md#install-and-configure)

Start by preparing a secure, reliable n8n Enterprise instance. Self-host n8n on your own infrastructure, or skip setup with [n8n Cloud](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud).
{% endstep %}

{% step %}
#### [Publish first workflow](enterprise-hub.md#publish-first-workflow-1)

With your instance ready, build and publish a workflow that delivers value.
{% endstep %}

{% step %}
#### [Set up governance, roles, and ownership](enterprise-hub.md#set-up-governance-roles-and-ownership-1)

As adoption grows, define how teams access n8n, share work, and manage changes.
{% endstep %}

{% step %}
#### [Confirm business value](enterprise-hub.md#confirm-business-value-1)

Measure the value your workflows create, then share those results across your organization.
{% endstep %}

{% step %}
#### [Expand and train](enterprise-hub.md#expand-and-train-1)

Use your early results to bring more teams and use cases onto n8n. Give users the training they need to build confidently.
{% endstep %}
{% endstepper %}

## What Enterprise features does n8n offer?

These features help you secure, govern and scale n8n across your organization. The Enterprise plan gives you access to them, and some are also available on other plans. Check [pricing and plans](https://n8n.io/pricing/) for full availability by plan.

| Feature                          | What it does                                                                                                         | Learn more                                                                                                                                                   |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Single sign-on (SSO)             | Let users sign in with your identity provider using SAML, OIDC, or LDAP.                                             | [Verify user identity](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/verify-user-identity)                                          |
| Role-based access control (RBAC) | Control what each user can do with built-in and custom roles.                                                        | [Set permissions and roles](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac)                           |
| Projects                         | Group workflows and credentials by team, and control who can access them.                                            | [Organize work in projects](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects) |
| Source control and environments  | Use Git to version your work and move it between development and production.                                         | [Use source control and environments](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments)                                    |
| External secrets                 | Keep credentials in your own secrets vault instead of in n8n.                                                        | [Use external secret stores](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/use-external-secret-stores)                                   |
| Log streaming                    | Send n8n events to your external logging and monitoring tools.                                                       | [Stream logs to external systems](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/stream-logs-to-external-systems)                            |
| Insights                         | Track workflow performance and time saved across your instance.                                                      | [Track usage with Insights](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/track-usage-with-insights)                                        |
| Multi-main mode                  | Run several main instances for high availability on self-hosted n8n.                                                 | [Set up multi-main mode](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/enable-queue-mode#multi-main-setup)                   |
| Security policies                | Enforce instance-wide controls for two-factor authentication, personal spaces, workflow reviews, and data redaction. | [Manage security policies](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/manage-security-policies)                          |
| Data redaction                   | Hide workflow execution data while retaining execution status and timing details.                                    | [Redact execution data](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/redact-execution-data)                                |
| Workflow history                 | View, restore, compare, and name previous workflow versions.                                                         | [View change history](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/view-change-history)                                                   |

## Install and configure

Your Enterprise journey begins with a dependable foundation. These guides help self-hosted teams prepare, secure, scale, and monitor their n8n instance. If you use n8n Cloud, n8n manages the infrastructure for you.

<table data-view="cards"><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><i class="fa-clipboard-check">:clipboard-check:</i> <strong>Prepare</strong></td><td><ul><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/understand-the-architecture">Understand the architecture</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/install-options/production-requirements">Production requirements</a></li></ul></td></tr><tr><td><i class="fa-download">:download:</i> <strong>Install</strong></td><td><ul><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/install-options">Install options</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/install-options/use-a-cloud-provider/deploy-to-aws-with-terraform">Deploy with Terraform</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/install-options/use-a-cloud-provider">Use a cloud provider</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/choose-n8ns-database">Choose n8n's database</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/manage-your-license">Add your license key</a></li></ul></td></tr><tr><td><i class="fa-layer-group">:layer-group:</i> <strong>Set up scaling &#x26; queue mode</strong></td><td><ul><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/enable-queue-mode">Enable queue mode</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/queue-mode">Queue mode environment variables</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/control-concurrency">Control concurrency</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/use-external-storage">Use external storage</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/set-up-task-runners">Set up task runners</a></li></ul></td></tr><tr><td><p><i class="fa-shield-halved">:shield-halved:</i> <strong>Secure your deployment</strong></p><ul><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/set-up-ssl">Set up SSL</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/run-security-audits">Run security audits</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-a-custom-encryption-key">Set a custom encryption key</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/rotate-encryption-keys">Rotate encryption key</a></li></ul></td><td></td></tr><tr><td><i class="fa-wave-pulse">:wave-pulse:</i> <strong>Set up monitoring and logging</strong></td><td><ul><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/keep-n8n-running/set-up-logging">Set up logging</a></li><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/stream-logs-to-external-systems">Stream logs to external systems</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/keep-n8n-running/monitor-n8n">Monitor your instance</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics">Enable Prometheus metrics</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/keep-n8n-running/visualize-metrics-with-grafana">Visualize metrics with Grafana</a></li></ul></td></tr><tr><td><i class="fa-arrow-up-right-dots">:arrow-up-right-dots:</i> <strong>Back up and upgrade</strong></td><td><ul><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/keep-n8n-running/update-n8n">Update n8n</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/keep-n8n-running/backup-and-restore">Back up your instance</a></li></ul></td></tr></tbody></table>

## Publish first workflow

With your Enterprise instance ready, move from setup to automation. Build and publish a production workflow to prove the path from an idea to a reliable result.

* [Build your first workflow](build-your-first-workflow.md)
* [Understand workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows)

## Set up governance, roles, and ownership

After you publish your first workflow, create the guardrails for wider adoption. Set up secure access, clear ownership, and controlled ways for teams to share and change their work.

<table data-view="cards"><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><i class="fa-user">:user:</i> <strong>Manage users</strong></td><td><ul><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access">User management on n8n Cloud</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/user-management">User management on hosted n8n</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/configure-sso">Configure SSO</a></li><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac">Set permissions and roles (RBAC)</a></li><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects">Organize work in projects</a></li></ul></td></tr><tr><td><i class="fa-code-branch">:code-branch:</i> <strong>Set up source control and environments</strong></td><td><ul><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments/understand-source-control">Understand source control</a></li><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments">Use source control and environments</a></li><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments/set-up-source-control">Set up source control</a></li><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments/work-with-environments">Work with environments</a></li><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments/move-work-between-environments">Move work between environments</a></li></ul></td></tr><tr><td><i class="fa-monitor-waveform">:monitor-waveform:</i> <strong>Monitor and log</strong></td><td><ul><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/track-usage-with-insights">Track usage with Insights</a></li><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/stream-logs-to-external-systems">Stream logs to external systems</a></li></ul></td></tr><tr><td><i class="fa-lock-keyhole">:lock-keyhole:</i> <strong>Manage security</strong></td><td><ul><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/manage-security-policies">Manage security policies</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/run-security-audits">Run security audits</a></li><li><a href="https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/redact-execution-data">Redact execution data</a></li></ul></td></tr><tr><td><i class="fa-lock-keyhole">:lock-keyhole:</i> <strong>Manage credentials</strong></td><td><ul><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/share-credentials-securely">Share credentials securely</a></li><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/use-external-secret-stores">Use external secret stores</a></li><li><a href="https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-credentials/credential-overwrites">Credential overwrites </a>(self-hosted only)</li></ul></td></tr></tbody></table>

## Confirm business value

As your workflows run, measure the value they create and share it with your organization. Establish a baseline for each process before automating it. Then [track the time saved by each n8n workflow](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/track-usage-with-insights#setting-the-time-saved-by-a-workflow) so Insights shows hours saved over time. Or use the [Time Saved node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.timesaved) to record savings dynamically when they vary by execution.

## Expand and train

With governance and measurable results in place, expand n8n with confidence. Bring more teams and use cases onto n8n, then help users build with the following resources.

* [n8n Academy](https://learn.n8n.io/) offers interactive courses, hands-on exercises, and quizzes.
* [n8n YouTube channel](https://www.youtube.com/c/n8n-io) shares product tutorials, workflow examples, and webinars.
* [n8n documentation](https://docs.n8n.io/) explains n8n features and configuration. Use **Ask AI** to get answers to any questions about how n8n works.
* [n8n community forum](https://community.n8n.io/?tl=en) connects you with other n8n users and the n8n team.
