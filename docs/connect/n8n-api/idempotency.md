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

Idempotency for the n8n API is available on:

- **n8n Cloud:** Starter, Pro, Enterprise
- **Self-hosted:** All editions

It isn't available on the free trial.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

The header is optional. If you leave it off, n8n handles the POST as usual and doesn't look up or save a previous response.

## Send an idempotency key

Set the `Idempotency-Key` header on the first POST, and send that same header again if you retry. Use a new key for each distinct request. A version 4 UUID is a safe choice. n8n doesn't require that format.

The value must be from 1 to 128 visible ASCII characters: letters, digits, and symbols, with no spaces. n8n trims leading and trailing whitespace, then compares the key character by character. An empty value, or a value that's only whitespace, is the same as leaving the header off.

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

n8n honors the header on POST requests that create a resource or start work, such as creating a workflow or calling `POST /api/v1/executions/<execution-id>/retry`. The [endpoint reference](api-reference.md) shows the header on each POST that accepts it.

n8n ignores the header, and doesn't read or write a stored response, for `GET`, `PUT`, `PATCH`, and `DELETE`. It also ignores POST requests whose URL ends with `activate`, `deactivate`, `publish`, `unpublish`, `archive`, `unarchive`, `transfer`, `test`, or `test-trace`.

## How long n8n keeps the response

n8n keeps the first response, including an error, for 12 hours, starting when it accepts the key. A retry inside that window returns the stored response and doesn't run the POST again.

After 12 hours, the same key runs the POST again and can create a duplicate. Send a new key for the next operation.

Keys belong to the user, not to one API key. Two API keys for the same user share stored responses. The same key from a different user is a separate request.

## Retry the same request

Send the same key with the same path, query string, and body, including JSON field order and whitespace. A match returns the same status code and JSON body as the first response, including an error.

n8n doesn't store a file download. A retry of a POST that returns a file runs the request again.

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

Wait, then send the same key and the same request again. Two calls in flight with one key don't create two resources. One call finishes the work. The other receives `409`, or the stored response if the first call has already finished.

{% hint style="warning" %}
**No stored response yet**

If n8n stops after it accepts the key and before it stores a response, later retries keep returning `409` until 12 hours have passed. Wait and retry with the same key. A new key can create a second resource if the first request already finished its write.
{% endhint %}

## When the request fails

n8n stores an error the same way it stores a success. If the POST returns an error, a retry with the same key and the same request returns that status code and JSON body. It doesn't run the POST again.

Send a new key to run the POST again. If the first POST returns `400` because the body is invalid, correct the body and send a new key. The original key keeps returning that `400` for 12 hours.

## Limits of an idempotency key

An idempotency key doesn't make a workflow execution durable, and it doesn't replace engine-level execution durability. If an execution stops partway through, the same key doesn't resume it.

n8n evaluates the idempotency header only on public API endpoints at `/api/v1`.

## Related resources

* [n8n API](./)
* [Authentication](authentication.md)
* [Pagination](pagination.md)
* [Use an API playground](use-an-api-playground.md)
* [Endpoint reference](api-reference.md)
