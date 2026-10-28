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

Rate limiting for the n8n API is available from n8n 2.45.0 on:

- **Self-hosted:** All editions

It's off by default.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## How n8n counts requests

n8n counts requests for each API key. Two API keys for the same user have separate counts.

n8n counts only requests that use an API key, at `/api/v1`. Requests from the n8n editor don't count.

n8n sorts each request into one of two types:

| Type | Methods |
| :--- | :------ |
| Read | `GET`, `HEAD` |
| Write | `POST`, `PUT`, `PATCH`, `DELETE` |

Reads and writes have separate limits. Many writes don't use up the limit for reads.

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

On a self-hosted instance, change the values with environment variables. Refer to [Turn on rate limits on a self-hosted instance](#turn-on-rate-limits-on-a-self-hosted-instance).

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
2. **Add a small random delay.** If several clients wait for the same time, they all retry at once. Add up to a few seconds of random delay to each retry.
3. **Watch `X-RateLimit-Remaining`.** When it gets close to 0, slow down until the time in `X-RateLimit-Reset`.
4. **Spread out large jobs.** Don't send many requests at the same moment. Send them at a steady rate over the window.

A retried POST can create a duplicate if the first request already succeeded. Send an `Idempotency-Key` header to make retries safe. Refer to [API idempotency](idempotency.md).

## Turn on rate limits on a self-hosted instance

Set `N8N_PUBLIC_API_RATE_LIMIT_ENABLED` to `true`, and restart n8n.

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

Refer to [Deployment environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/deployment) for the full list.

### Multi-main setups

In a multi-main setup, all main instances share one count for each API key through Redis. An API key that reaches a limit on one main gets a `429` from every main until the window ends.

## Related resources

* [n8n API](./)
* [Authentication](authentication.md)
* [Pagination](pagination.md)
* [Idempotency](idempotency.md)
* [Use an API playground](use-an-api-playground.md)
* [Endpoint reference](api-reference.md)
