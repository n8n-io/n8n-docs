---
title: Opt out of data collection
description: "Opt out of data telemetry collection on your n8n instance."
contentType: howto
---

# Data collection

n8n collects some anonymous data from self-hosted n8n installations. Use the instructions below to opt out of data telemetry collection.

## Collected data

Refer to [Privacy | Data collection in self-hosted n8n](/privacy-security/privacy.md#data-collection-in-self-hosted-n8n) for details on the data n8n collects.

## How collection works

Your n8n instance sends most data to n8n as the events that generate it occur. Workflow execution counts and an instance pulse are sent periodically (every 6 hours). These data types mostly fall into n8n telemetry collection.

## Opting out of data collection

n8n enables telemetry collection by default. To disable it, configure the following environment variables.

### Opt out of telemetry events

To opt out of telemetry events, set the `N8N_DIAGNOSTICS_ENABLED` environment variable to false, for example:

```bash
export N8N_DIAGNOSTICS_ENABLED=false
```

### Opt out of checking for new versions of n8n

To opt out of checking for new versions of n8n, set the `N8N_VERSION_NOTIFICATIONS_ENABLED` environment variable to false, for example:

```bash
export N8N_VERSION_NOTIFICATIONS_ENABLED=false
```

## Disable all connection to n8n servers

If you want to fully prevent all communication with n8n's servers, refer to [Isolate n8n](/hosting/configuration/configuration-examples/isolation.md).

## Related resources

Refer to [Deployment environment variables](/hosting/configuration/environment-variables/deployment.md) for more information on these environment variables.

Refer to [Configuration](/hosting/configuration/configuration-methods.md) for more information on setting environment variables.
