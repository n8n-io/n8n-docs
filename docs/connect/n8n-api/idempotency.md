---
description: Retry an n8n public API POST with an Idempotency-Key header.
layout:
  description:
    visible: false
---

# API idempotency

Send an `Idempotency-Key` header on a public API POST so a retry returns the first response, including an error, instead of running the request again.

{% hint style="info" %}
**Feature availability**

Idempotency for the n8n API is available from n8n 2.45.0 on:

- **n8n Cloud:** Starter, Pro, Enterprise
- **Self-hosted:** All editions

It isn't available on the free trial.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

The header is optional. If you leave it off, each POST runs as usual.

## Send an idempotency key

Set the `Idempotency-Key` header on the first POST, and send that same header again when you retry. Use a new key for each distinct request. A version 4 UUID is a safe choice. n8n doesn't require that format.

The value must be from 1 to 128 characters: letters, digits, and symbols, with no spaces. n8n ignores spaces before and after the key. An empty value is the same as leaving the header off.

```shell
curl -X POST \
  'https://<your-instance>/api/v1/workflows' \
  -H 'accept: application/json' \
  -H 'X-N8N-API-KEY: <your-api-key>' \
  -H 'Idempotency-Key: <idempotency-key>' \
  -H 'Content-Type: application/json' \
  -d '<workflow-json>'
```

Replace `<workflow-json>` with the workflow body. Refer to [Authentication](authentication.md) for how to create the API key.

A key that's too long, or that contains a space or another disallowed character, returns `400` and doesn't create the resource. The message is `Idempotency-Key must be 1 to 128 visible ASCII characters.`

## Requests that use the key

n8n uses the header on POST requests that create something or start work, such as creating a workflow or calling `POST /api/v1/executions/<execution-id>/retry`. The [endpoint reference](api-reference.md) shows the header on each POST that accepts it.

n8n ignores the header for `GET`, `PUT`, `PATCH`, and `DELETE`. It also ignores POST requests whose URL ends with `activate`, `deactivate`, `publish`, `unpublish`, `archive`, `unarchive`, `transfer`, `test`, or `test-trace`.

## How long n8n keeps the response

n8n keeps the first response, including an error, for 12 hours from when you send the key. A retry inside that window returns that response and doesn't run the POST again.

After 12 hours, the same key runs the POST again and can create a duplicate. Send a new key for the next operation.

Keys belong to the user, not to one API key. Two API keys for the same user share stored responses. The same key from a different user is a separate request.

## Retry the same request

Send the same path, query string, and body again, including the order of the JSON fields and any spaces. A match returns the same status code and JSON body as the first response, including an error.

A POST that returns a file isn't covered. Retrying it runs the request again.

### Same key, different request

If the path, query string, or body differs, n8n returns `422` and doesn't run the POST:

```json
{
	"message": "This Idempotency-Key was already used with a different request."
}
```

Send a new key for the changed request. The first resource stays unchanged.

### Request still in progress

If the first request hasn't finished, n8n returns `409`:

```json
{
	"message": "A request with this Idempotency-Key is already in progress."
}
```

Wait, then send the same key and the same request again. Two requests at the same time with one key don't create two resources. One request finishes the work. The other receives `409`, or the first response if that request has already finished.

## When the request fails

n8n keeps an error the same way it keeps a success. If the POST returns an error, a retry with the same key and the same request returns that status code and JSON body. It doesn't run the POST again.

Send a new key to run the POST again. If the first POST returns `400` because the body is invalid, correct the body and send a new key. The original key keeps returning that `400` for 12 hours.

## Limits of an idempotency key

The idempotency header applies only to public API endpoints at `/api/v1`.

## Related resources

* [n8n API](./)
* [Authentication](authentication.md)
* [Pagination](pagination.md)
* [Use an API playground](use-an-api-playground.md)
* [Endpoint reference](api-reference.md)
