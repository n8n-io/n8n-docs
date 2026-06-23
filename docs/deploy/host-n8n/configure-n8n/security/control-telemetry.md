---
title: Opt out of data collection
description: Opt out of data telemetry collection on your n8n instance.
contentType: howto
nodeTitle: Control telemetry
originalFilePath: hosting/securing/telemetry-opt-out.md
originalUrl: 'https://docs.n8n.io/hosting/securing/telemetry-opt-out'
url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/control-telemetry'
layout:
  description:
    visible: false
---

# Data collection <a href="#data-collection" id="data-collection"></a>

n8n collects some anonymous data from self-hosted n8n installations. Use the instructions below to opt out of data telemetry collection.

## Collected data <a href="#collected-data" id="collected-data"></a>

Refer to [Privacy | Data collection in self-hosted n8n](https://app.gitbook.com/s/ukPPOMQ6NId4gpAIkPXa/privacy#data-collection-in-self-hosted-n8n) for details on the data n8n collects.

## How collection works <a href="#how-collection-works" id="how-collection-works"></a>

Your n8n instance sends most data to n8n as the events that generate it occur. Workflow execution counts and an instance pulse are sent periodically (every 6 hours). These data types mostly fall into n8n telemetry collection.

## Opting out of data collection <a href="#opting-out-of-data-collection" id="opting-out-of-data-collection"></a>

n8n enables telemetry collection by default. To disable it, configure the following environment variables.

### Opt out of telemetry events <a href="#opt-out-of-telemetry-events" id="opt-out-of-telemetry-events"></a>

To opt out of telemetry events, set the `N8N_DIAGNOSTICS_ENABLED` environment variable to false, for example:

```bash
export N8N_DIAGNOSTICS_ENABLED=false
```

### Opt out of checking for new versions of n8n <a href="#opt-out-of-checking-for-new-versions-of-n8n" id="opt-out-of-checking-for-new-versions-of-n8n"></a>

To opt out of checking for new versions of n8n, set the `N8N_VERSION_NOTIFICATIONS_ENABLED` environment variable to false, for example:

```bash
export N8N_VERSION_NOTIFICATIONS_ENABLED=false
```

## Disable all connection to n8n servers <a href="#disable-all-connection-to-n8n-servers" id="disable-all-connection-to-n8n-servers"></a>

If you want to fully prevent all communication with n8n's servers, refer to [Isolate n8n](../basic-configuration/configuration-examples/isolate-n8n.md).

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Deployment environment variables](../basic-configuration/use-environment-variables/deployment.md) for more information on these environment variables.

Refer to [Configuration](../basic-configuration.md) for more information on setting environment variables.
