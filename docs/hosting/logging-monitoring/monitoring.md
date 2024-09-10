---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Get metrics for a health check
contentType: howto
---

# Monitoring

There are three API endpoints you can call to check the status of your instance: `/healthz`, `healthz/readiness`, and `/metrics`.

<!-- vale off -->
## healthz and healthz/readiness
<!-- vale on -->
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


## metrics

The `/metrics` endpoint provides more detailed information about the current status of the instance.

Access the endpoint:

```
<your-instance-url>/metrics
```

/// info | Feature availability
The `/metrics` endpoint isn't available on n8n Cloud.
///
<!-- vale off -->
## Enable metrics and healthz for self-hosted n8n
<!-- vale on -->
The `/metrics` and `/healthz` endpoints are disabled by default. To enable them, configure your n8n instance:

```shell
# metrics
N8N_METRICS=true
# healthz
QUEUE_HEALTH_CHECK_ACTIVE=true
```

Refer to [Configuration methods](/hosting/configuration/configuration-methods/) for more information on how to configure your instance using environment variables.
