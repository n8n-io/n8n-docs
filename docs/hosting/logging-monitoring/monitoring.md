---
description: Get metrics for a health check
---

# Monitoring

The `/metrics` endpoint provides information about the current status of the instance.

Access the endpoint:

```
<your-instance-url>/metrics
```

## Enable metrics

The `/metrics` endpoint is disabled by default. To enable it, configure your n8n instance:

```shell
N8N_METRICS=true
```

Refer to [Configuration methods](/hosting/environment-variables/configuration/) for more information on how to configure your instance using environment variables.
