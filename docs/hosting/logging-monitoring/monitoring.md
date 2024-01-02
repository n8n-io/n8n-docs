---
description: Get metrics for a health check
contentType: howto
---

# Monitoring

There are two API endpoints you can call to check the status of your instance: `/healthz` and `/metrics`.

## healthz

The `/healthz` endpoint returns a standard HTTP status code. 200 indicates the instance is reachable. It is available for both self-hosted and Cloud users.

Access the endpoint:

```
<your-instance-url>/healthz
```


## metrics

The `/metrics` endpoint provides more detailed information about the current status of the instance.

Access the endpoint:

```
<your-instance-url>/metrics
```

/// info | Feature availability
The `/metrics` endpoint isn't available on n8n Cloud.
///

## Enable metrics and healthz for self-hosted n8n

The `/metrics` and `/healthz` endpoints are disabled by default. To enable them, configure your n8n instance:

```shell
# metrics
N8N_METRICS=true
# healthz
QUEUE_HEALTH_CHECK_ACTIVE=true
```

Refer to [Configuration methods](/hosting/environment-variables/configuration-methods/) for more information on how to configure your instance using environment variables.
