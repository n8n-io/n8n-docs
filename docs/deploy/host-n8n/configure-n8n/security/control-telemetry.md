---
title: Opt out of data collection
contentType: howto
nodeTitle: Control telemetry
originalFilePath: hosting/securing/telemetry-opt-out.md
originalUrl: https://docs.n8n.io/hosting/securing/telemetry-opt-out
url: https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/control-telemetry
description: Opt out of data telemetry collection on your n8n instance.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Control telemetry

n8n collects anonymous telemetry data from self-hosted n8n installations. You can opt out of data telemetry collection.

## Collected data <a href="#collected-data" id="collected-data"></a>

Refer to [Privacy | Data collection in self-hosted n8n](https://app.gitbook.com/s/ukPPOMQ6NId4gpAIkPXa/#data-collection-in-self-hosted-n8n) for details on the data n8n collects.

## How collection works <a href="#how-collection-works" id="how-collection-works"></a>

n8n sends most data when events occur. Workflow execution counts and an instance pulse are sent periodically (every 6 hours).

## Opting out of data collection <a href="#opting-out-of-data-collection" id="opting-out-of-data-collection"></a>

n8n enables telemetry collection by default. To disable it, configure the following environment variables.

### Opt out of telemetry events <a href="#opt-out-of-telemetry-events" id="opt-out-of-telemetry-events"></a>

To opt out of diagnostic telemetry, set the `N8N_DIAGNOSTICS_ENABLED` environment variable to false:

```bash
export N8N_DIAGNOSTICS_ENABLED=false
```

### Opt out of checking for new versions of n8n <a href="#opt-out-of-checking-for-new-versions-of-n8n" id="opt-out-of-checking-for-new-versions-of-n8n"></a>

To opt out of version notifications, set the `N8N_VERSION_NOTIFICATIONS_ENABLED` environment variable to false:

```bash
export N8N_VERSION_NOTIFICATIONS_ENABLED=false
```

## Disable all connection to n8n servers <a href="#disable-all-connection-to-n8n-servers" id="disable-all-connection-to-n8n-servers"></a>

To prevent all communication with n8n's servers, refer to [Isolate n8n](../basic-configuration/configuration-examples/isolate-n8n.md).

## Related resources <a href="#related-resources" id="related-resources"></a>

* [Deployment environment variables](../basic-configuration/use-environment-variables/deployment.md): More information on these environment variables.
* [Configuration](../basic-configuration.md): How to set environment variables.
