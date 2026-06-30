---
description: Get metrics for a health check
contentType: howto
nodeTitle: Monitor n8n
originalFilePath: hosting/logging-monitoring/monitoring.md
originalUrl: 'https://docs.n8n.io/hosting/logging-monitoring/monitoring'
url: 'https://docs.n8n.io/deploy/host-n8n/keep-n8n-running/monitor-n8n'
layout:
  description:
    visible: false
---

# Monitoring <a href="#monitoring" id="monitoring"></a>

There are three API endpoints you can call to check the status of your instance: `/healthz`, `healthz/readiness`, and `/metrics`.


## healthz and healthz/readiness <a href="#healthz-and-healthzreadiness" id="healthz-and-healthzreadiness"></a>

The `/healthz` endpoint returns a standard HTTP status code. 200 indicates the instance is reachable. It doesn't indicate DB status. It's available for both self-hosted and Cloud users.

Access the endpoint:

```
<your-instance-url>/healthz
```

The `/healthz/readiness` endpoint is similar to the `/healthz` endpoint, but it returns a HTTP status code of 200 if the DB is connected and migrated and therefore the instance is ready to accept traffic.

Access the endpoint:

```
<your-instance-url>/healthz/readiness
```

{% hint style="info" %}
**Customizing health check endpoints**

You can customize the health check endpoint path using the [`N8N_ENDPOINT_HEALTH`](../configure-n8n/basic-configuration/use-environment-variables/endpoints.md) environment variable.
{% endhint %}

## metrics <a href="#metrics" id="metrics"></a>

The `/metrics` endpoint provides more detailed information about the current status of the instance.

Access the endpoint:

```
<your-instance-url>/metrics
```

{% hint style="info" %}
**Feature availability**

The `/metrics` endpoint isn't available on n8n Cloud.
{% endhint %}


## Enable metrics and health checks for self-hosted n8n <a href="#enable-metrics-and-health-checks-for-self-hosted-n8n" id="enable-metrics-and-health-checks-for-self-hosted-n8n"></a>

The `/metrics` endpoint is disabled by default. The health endpoint is always enabled on the main n8n server. For worker servers in [queue mode](../configure-n8n/scaling/enable-queue-mode.md), the health endpoint is disabled by default.

To enable them, configure your n8n instance:

```shell
# metrics <a href="#metrics" id="metrics"></a>
N8N_METRICS=true
# healthz <a href="#healthz" id="healthz"></a>
QUEUE_HEALTH_CHECK_ACTIVE=true
```

Refer to [Configuration methods](../configure-n8n/basic-configuration.md) for more information on how to configure your instance using environment variables.
