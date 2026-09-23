---
title: Environment Variables Overview
description: An overview of configuration environment variables for self-hosted n8n.
contentType: overview
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: Use environment variables
originalFilePath: hosting/configuration/environment-variables/index.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/environment-variables'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables
layout:
  description:
    visible: false
---

# Environment variables overview <a href="#environment-variables-overview" id="environment-variables-overview"></a>

This section lists the environment variables that you can use to change n8n's configuration settings when self-hosting n8n.

{% hint style="info" %}
**File-based configuration**

You can provide a [configuration file](../../basic-configuration.md) for n8n. You can also append `_FILE` to certain variables to provide their configuration in a separate file.
{% endhint %}

## In this section

* [Ask n8n AI](ai-assistant.md): variables for n8n's built-in AI help assistant.
* [Binary data](binary-data.md): variables for storing and handling binary data.
* [Credentials](credentials.md): variables for credential overwrites and encryption.
* [Database](database.md): variables for database connection and configuration.
* [Deployment](deployment.md): variables for instance identity, encryption, and the public API.
* [Endpoints](endpoints.md): variables for customizing n8n's REST and webhook endpoint paths.
* [Executions](executions.md): variables for execution timeouts, data pruning, and process modes.
* [Expression engine](expression-engine.md): variables for controlling expression evaluation.
* [External data storage](external-data-storage.md): variables for storing data outside the n8n database.
* [External hooks](external-hooks.md): variables for the external hooks file location.
* [External secrets](external-secrets.md): variables for external secrets vaults.
* [Insights](insights.md): variables for the Insights usage tracking feature.
* [Logs](logs.md): variables for logging level, format, and destinations.
* [License](license.md): variables for activating and managing your n8n license.
* [Nodes](nodes.md): variables for excluding or including specific nodes.
* [OpenTelemetry](opentelemetry.md): variables for exporting execution traces.
* [Queue mode](queue-mode.md): variables for running n8n across multiple worker processes.
* [Scheduler](scheduler.md): variables for the durable scheduler.
* [Security](security.md): variables for hardening a self-hosted instance.
* [Source control](source-control.md): variables for Git-based source control.
* [SSO](sso.md): variables for single sign-on.
* [SSRF protection](ssrf-protection.md): variables for restricting outbound requests from workflow nodes.
* [Task runners](task-runners.md): variables for configuring external Code node execution.
* [Timezone and localization](timezone-and-localization.md): variables for setting your instance's timezone and locale.
* [User management and 2FA](user-management-and-2fa.md): variables for user management and two-factor authentication.
* [Workflows](workflows.md): variables for workflow defaults and templates.
* [Workflow history](workflow-history.md): variables for workflow version history.

## Related resources

* [Basic configuration](../../basic-configuration.md)
* [Configuration examples](../configuration-examples/README.md)


