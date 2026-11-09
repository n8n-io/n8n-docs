---
description: Understand the n8n public API rate limits and handle a 429 response.
layout:
  description:
    visible: false
---

# API rate limits

n8n can limit how many public API requests each API key makes. A request over a limit gets a `429 Too Many Requests` response. Read the rate-limit headers to slow down before you reach a limit, and wait for the time in `Retry-After` before you retry.

{% hint style="info" %}
**Feature availability**

Rate limiting for the n8n API is available from n8n 2.47.0 on all plans, on n8n Cloud and self-hosted. It's off by default. An instance owner or admin turns it on.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## How n8n counts requests

n8n counts requests for each API key. Two API keys for the same user have separate counts.

n8n counts only requests that use an API key, at `/api/v1`. Requests from the n8n editor don't count.

n8n sorts each request into one of two types:

| Type | Methods |
| :--- | :------ |
| Read | `GET` |
| Write | `POST`, `PUT`, `PATCH`, `DELETE` |

Reads and writes have separate limits. Writes don't count toward read limits.

## The two limits

Each request counts toward two limits at the same time:

- **All endpoints:** one count for the API key across every endpoint.
- **Each endpoint:** a separate count for the API key on each endpoint. An endpoint is a method and a path. For example, `GET /api/v1/workflows/{id}` is one endpoint for every workflow ID.

n8n rejects a request when it's over either limit. Each limit has a window in seconds. The count starts again when the window ends.

| Limit | Default | Window |
| :---- | :------ | :----- |
| Reads, all endpoints | 1,200 | 60 seconds |
| Writes, all endpoints | 600 | 60 seconds |
| Reads, each endpoint | 1,000 | 60 seconds |
| Writes, each endpoint | 500 | 60 seconds |

To turn on the limits or change the values, refer to [Turn on rate limits](#turn-on-rate-limits).

## Rate-limit headers

A successful response includes these headers:

| Header | Meaning |
| :----- | :------ |
| `X-RateLimit-Limit` | The number of requests the limit allows in one window. |
| `X-RateLimit-Remaining` | The number of requests left in the current window. |
| `X-RateLimit-Reset` | The time when the window ends, as a Unix timestamp in seconds. |

Each request counts toward two limits. The headers show the limit that has the fewest requests left.

The headers aren't present when rate limiting is off, or when the request doesn't use an API key.

## When you reach a limit

A request over a limit gets this response:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 18
X-RateLimit-Limit: 600
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1793122230

{
	"message": "Too many requests"
}
```

`Retry-After` is the number of seconds to wait. If the request is over both limits, `Retry-After` waits for the later one.

A rejected request doesn't count toward any limit. n8n doesn't run it.

## Handle a 429 response

To stay under the limits and recover when you reach one:

1. **Wait for `Retry-After`.** Don't send the request again before that number of seconds has passed. A retry that's too early gets another `429`.
2. **Add a small random delay.** If several clients wait for the same time, they all retry at once. Add up to 5 seconds of random delay to each retry.
3. **Watch `X-RateLimit-Remaining`.** When it gets close to 0, slow down until the time in `X-RateLimit-Reset`.
4. **Spread out large jobs.** Don't send many requests at the same moment. Send them at a steady rate over the window.

### Calls from an n8n workflow

An n8n workflow can call the n8n API of its own instance, for example with the n8n node or the HTTP Request node. A node runs once for each item, so a list of 1,000 items sends about 1,000 requests at once. These nodes don't wait for `Retry-After`, and the node fails on a `429`.

To stay under the limits, open the node's **Options**, add **Batching**, and set **Items per Batch** and **Batch Interval (ms)**. For example, 10 items each second sends 600 requests a minute.

**Retry On Fail** doesn't fix a `429`. It waits at most 5 seconds between tries, which is often inside the same window, and it runs the node again for every item.

A retried POST can create a duplicate if the first request already succeeded. Send an `Idempotency-Key` header to make retries safe. Refer to [API idempotency](idempotency.md).

## Turn on rate limits

An instance owner or admin can turn on and change the limits in three ways:

- In the n8n settings
- With the n8n API
- With environment variables, on a self-hosted instance

A change in the settings or with the API applies at once. You don't need to restart n8n.

### In the n8n settings

1. Go to **Settings** > **Policies**.
2. Under **Public API Limits**, turn on **Enable API key rate limits**.
3. Set the limits and windows for **All endpoints** and **Individual endpoints**. Each field starts with the default value.
4. Select **Enable limits**.

To change the values later, select the edit icon next to **Enable API key rate limits**, change the fields, and select **Save changes**. In the dialog:

- Clear a limit field to remove that limit. The field shows **No limit**.
- Select **Reset to default** next to a row to go back to its default value. Select **Reset all** to reset every row.

At least one limit must have a value to turn on rate limiting.

To turn off rate limiting, turn off **Enable API key rate limits**.

### With the n8n API

Use these endpoints. The API key needs the `securitySettings:manage` scope.

| Endpoint | What it does |
| :------- | :----------- |
| `GET /api/v1/settings/rate-limits` | Returns the current settings. |
| `PUT /api/v1/settings/rate-limits` | Replaces the settings. Send every field. |

For example, to turn on the limits with the default values:

```shell
curl -X PUT https://<your-instance>/api/v1/settings/rate-limits \
  -H "X-N8N-API-KEY: <your-api-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true,
    "globalReadLimit": 1200,
    "globalReadWindowSeconds": 60,
    "globalWriteLimit": 600,
    "globalWriteWindowSeconds": 60,
    "endpointReadLimit": 1000,
    "endpointReadWindowSeconds": 60,
    "endpointWriteLimit": 500,
    "endpointWriteWindowSeconds": 60
  }'
```

Set a limit to `0` for no limit. When `enabled` is `true`, at least one limit must be more than `0`. You can send a `GET` response back as the `PUT` body.

These requests use an API key, so they count toward the limits too. Refer to the [Endpoint reference](api-reference.md) for the full schema.

### With environment variables

On a self-hosted instance, you can set the values with environment variables. Set `N8N_PUBLIC_API_RATE_LIMIT_ENABLED` to `true`, and restart n8n.

To change a limit or its window, set its environment variable:

| Limit | Limit variable | Window variable |
| :---- | :------------- | :-------------- |
| Reads, all endpoints | `N8N_PUBLIC_API_RATE_LIMIT_GLOBAL_READ_LIMIT` | `N8N_PUBLIC_API_RATE_LIMIT_GLOBAL_READ_WINDOW_SECONDS` |
| Writes, all endpoints | `N8N_PUBLIC_API_RATE_LIMIT_GLOBAL_WRITE_LIMIT` | `N8N_PUBLIC_API_RATE_LIMIT_GLOBAL_WRITE_WINDOW_SECONDS` |
| Reads, each endpoint | `N8N_PUBLIC_API_RATE_LIMIT_ENDPOINT_READ_LIMIT` | `N8N_PUBLIC_API_RATE_LIMIT_ENDPOINT_READ_WINDOW_SECONDS` |
| Writes, each endpoint | `N8N_PUBLIC_API_RATE_LIMIT_ENDPOINT_WRITE_LIMIT` | `N8N_PUBLIC_API_RATE_LIMIT_ENDPOINT_WRITE_WINDOW_SECONDS` |

Set a limit to `0` to turn off that limit. A window must be 1 second or more.

For example, to allow 300 writes in each minute across all endpoints:

```shell
N8N_PUBLIC_API_RATE_LIMIT_ENABLED=true
N8N_PUBLIC_API_RATE_LIMIT_GLOBAL_WRITE_LIMIT=300
```

An environment variable overrides the value in the settings. You can't change that field in the settings page or with the API:

- The settings page shows the field as locked.
- The `GET` response lists the field in `envManagedFields`.
- A `PUT` that changes the field gets a `409 Conflict` response. A `PUT` that sends the current value succeeds.

To change a locked field, change the environment variable and restart n8n.

Refer to [Deployment environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/deployment) for the full list.

### Multi-main setups

In a multi-main setup, all main instances share one count for each API key through Redis. An API key that reaches a limit on one main gets a `429` from every main until the window ends. A change in the settings or with the API applies to every main.

## Related resources

* [n8n API](./)
* [Authentication](authentication.md)
* [Pagination](pagination.md)
* [Idempotency](idempotency.md)
* [Use an API playground](use-an-api-playground.md)
* [Endpoint reference](api-reference.md)
