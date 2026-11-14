---
description: Build a declarative webhook trigger that registers a webhook with a service and verifies, filters, and outputs each incoming request.
status: preview
layout:
  description:
    visible: false
---

# Webhook triggers

A declarative webhook trigger registers a webhook with a service when the user publishes the workflow, removes it when they unpublish, and turns each incoming request into items.

{% hint style="info" %}
**Preview status**

Declarative webhook triggers are in Preview. The configuration format may change in a later n8n version, so don't rely on it for production nodes yet. Refer to [Understand feature availability](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/understand-feature-availability#feature-maturity-preview-ga-deprecated-and-removed) for what Preview means.
{% endhint %}

{% hint style="info" %}
**Feature availability**

Declarative webhook triggers are available from n8n 3.0.0. Your package must declare node API version `3.1`. Refer to [Declarative triggers](./) for the requirements.
{% endhint %}

You configure a webhook trigger in the `trigger` object of the node description, with `type: 'webhook'`. It has two parts:

* **`lifecycle`** registers the webhook with the service when the user publishes the workflow, and removes it when they unpublish the workflow.
* **`handler`** handles each incoming request.

n8n builds `webhookMethods` and the `webhook()` method from this object, so your node class doesn't need them. You still declare the webhook endpoint in `webhooks`, with the name `default`:

```ts
webhooks: [
	{ name: 'default', httpMethod: 'POST', responseMode: 'onReceived', path: 'webhook' },
],
```

## Webhook trigger configuration

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `'webhook'` | Yes | The trigger type. |
| `lifecycle.checkExists` | object or function | No | Checks whether the webhook is still registered when the user publishes the workflow. |
| `lifecycle.create` | object or function | Yes | Registers the webhook. |
| `lifecycle.delete` | object or function | No | Removes the webhook. |
| `managedKeys` | `string[]` | No | Static-data keys that n8n clears when the webhook is gone. |
| `handler` | object | No | Handles each request. Without it, the trigger emits the request body. |

## Webhook lifecycle

The lifecycle methods store values, such as the webhook ID, in the node's static data. Later methods read them as `$staticData`. All lifecycle requests can use `$webhookUrl` and `$staticData`.

### Check that the webhook exists with `checkExists`

`checkExists` returns `true` when the webhook is still registered. When it returns `false`, n8n calls `create`.

If you omit `checkExists`, n8n deletes the stored webhook with your `delete` configuration and registers a new one each time the user publishes the workflow.

There are two ways to check. Use one of them.

**Check by ID.** n8n sends the request. A successful response means the webhook exists:

```ts
checkExists: {
	routing: { request: { method: 'GET', url: '=/webhooks/{{ $staticData.webhookId }}' } },
},
```

| Property | Description |
| --- | --- |
| `routing` | The request. |
| `idKey` | The static-data key of the webhook ID. Default `webhookId`. If this key has no value, n8n sends no request and returns `false`. |
| `notFoundHttpCodes` | Status codes that mean the webhook is gone. Default `[404]`. On one of these codes, n8n clears the managed keys and returns `false`. Other errors make publishing the workflow fail. |
| `requireKeys` | Static-data keys that must have a value. If one is empty, n8n deletes the stored webhook and registers again. Use it for values the webhook can't work without, such as its signing secret. n8n checks `requireKeys` first. |

**Check by matching.** n8n lists the registered webhooks and looks for one that matches. Use this when the API can list webhooks but you don't have an ID:

```ts
checkExists: {
	routing: {
		request: { method: 'GET', url: '/webhooks' },
		output: { postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }] },
	},
	// Match the webhook that points at this workflow's URL.
	matchOn: [{ itemProperty: 'target_url', value: '={{ $webhookUrl }}' }],
	// Save the matched webhook's ID for `delete`.
	store: { webhookId: '={{ $hook.id }}' },
},
```

| Property | Description |
| --- | --- |
| `routing` | The request. Each returned item is one registered webhook. |
| `matchOn` | A list of clauses. A webhook matches when all clauses match. `itemProperty` is a path in the webhook item, in dot notation. `value` is an expression. The comparison is strict (`===`). |
| `store` | Static data to write from the matched webhook. Expressions can use `$hook`, the matched item. |
| `requireKeys` | Works the same as when you check by ID. |

### Register the webhook with `create`

`create` registers the webhook and stores the values that later methods need:

```ts
create: {
	// Make a random signing secret before the request.
	generate: { secret: { type: 'hex', length: 32 } },
	routing: {
		request: {
			method: 'POST',
			url: '/webhooks',
			body: { url: '={{ $webhookUrl }}', secret: '={{ $generated.secret }}' },
		},
	},
	validateResponse: '={{ $response.status === "active" }}',
	store: { webhookId: '={{ $response.id }}', webhookSecret: '={{ $generated.secret }}' },
	rejectLocalhostUrl: true,
},
```

| Property | Description |
| --- | --- |
| `routing` | The request. Expressions can use `$webhookUrl`, `$staticData`, and `$generated`. |
| `generate` | Random values that n8n makes before the request. Expressions read them as `$generated.<name>`. Refer to [Generated values](#generated-values). |
| `store` | Static data to write from the response. Expressions can use `$response` and `$generated`. |
| `validateResponse` | An expression that can use `$response`. A falsy result fails the registration. |
| `rejectLocalhostUrl` | When `true`, n8n refuses a webhook URL whose host is `localhost`, `127.0.0.1`, or `[::1]`. Use it when the service can't reach a local URL. |

`$response` is the JSON of the first item the request returns, after the `postReceive` actions.

#### When registration fails

The registration fails when `validateResponse` is falsy, or when a `store` value resolves to `undefined`. In both cases, the service already has the webhook, so n8n calls your `delete` configuration, if there is one, to remove it. The error message lists only the keys of the response, not the values, because the response can contain a secret.

Always store the webhook ID in `create.store`. n8n writes the `store` values before it checks them. If the ID doesn't resolve, `delete` sends no request, and the webhook stays registered at the service.

A failed request also fails the registration. In that case, n8n doesn't call `delete`, and it keeps the other static data.

#### Generated values

Each entry in `create.generate` makes one random value:

| Property | Description |
| --- | --- |
| `type` | `hex`, `base64`, `uuid`, or `alphanumericLower`. |
| `length` | The number of random bytes, or characters for `alphanumericLower`. Default `32`, or `10` for `alphanumericLower`. Minimum `1`. `uuid` ignores it. |
| `prefix` | Text to add in front of the value. |

### Remove the webhook with `delete`

`delete` removes the webhook when the user unpublishes the workflow:

```ts
delete: {
	routing: { request: { method: 'DELETE', url: '=/webhooks/{{ $staticData.webhookId }}' } },
},
```

| Property | Description |
| --- | --- |
| `routing` | The request. |
| `idKey` | The static-data key of the webhook ID. Default `webhookId`. If this key has no value, n8n sends no request. |

On success, n8n clears the managed keys. A failed request doesn't stop the user unpublishing the workflow. n8n logs a warning and keeps the static data, so a later `delete` can try again.

If you omit `delete`, n8n has nothing to remove, and unpublishing does nothing at the service.

### Managed keys

The managed keys are the static-data keys that n8n clears when the webhook is gone. By default, these are the keys of `create.store`. Set `managedKeys` to replace the default list. You need it when `create` is a function, because a function has no `store`.

### Lifecycle functions

Each lifecycle method can also be a plain function. Use a function when the configuration can't express what the API needs. The function has the same signature as a programmatic webhook method:

```ts
lifecycle: {
	// A function for this method, configuration for the others.
	checkExists: async function (this: IHookFunctions) {
		const data = this.getWorkflowStaticData('node');
		return data.webhookId !== undefined;
	},
	create: { /* configuration */ },
	delete: { /* configuration */ },
},
```

You can mix functions and configuration. n8n calls a `delete` configuration automatically in these cases:

* Before a new registration, when `checkExists` is omitted or `requireKeys` fails.
* After `validateResponse` or a `create.store` value fails.

A `delete` function runs only when the user unpublishes the workflow.

## Webhook handler

The handler processes each request to the webhook. It runs these stages in order:

1. [Handshake](#handshake)
2. [Verification](#verification)
3. [Ping](#ping)
4. [Filter](#filter)
5. [Output](#output)

Each stage is optional. Expressions in all stages can use `$webhookRequest`, the incoming request. Without `handler`, the trigger emits the request body.

{% hint style="warning" %}
**Configure verification**

Without `verification`, anyone who knows the webhook URL can start the workflow. If the service signs its requests, configure verification.
{% endhint %}

### Handshake

Some services confirm a webhook URL before they send events. A handshake request gets a configured reply and starts no workflow:

```ts
handshake: {
	// Treat a request with this header as a handshake.
	when: '={{ $webhookRequest.headers["x-hook-secret"] !== undefined }}',
	respond: {
		body: '={{ $webhookRequest.headers["x-hook-secret"] }}',
		contentType: 'text/plain',
		headers: { 'X-Hook-Secret': '={{ $webhookRequest.headers["x-hook-secret"] }}' },
	},
},
```

| Property | Description |
| --- | --- |
| `when` | An expression. On the `default` endpoint, a truthy result makes the request a handshake. Without `when`, the `default` endpoint never runs the handshake. |
| `respond.body` | The reply body. Default `OK`. |
| `respond.statusCode` | The reply status. Default `200`. |
| `respond.contentType` | The `Content-Type` of the reply. It wins over a `Content-Type` in `headers`. |
| `respond.headers` | Reply headers. Values are expressions. n8n skips a header whose value is missing or isn't a valid header value. |

`respond` can't read `$staticData`. Don't put a stored value in the reply, because any request that matches `when` gets it.

A handshake doesn't write static data. If the service sends a signing secret, get it from the registration response with `create.store`.

#### The `setup` endpoint

Some services confirm the URL on a different endpoint. For these, add a second webhook with the name `setup`:

```ts
webhooks: [
	{ name: 'default', httpMethod: 'POST', responseMode: 'onReceived', path: 'webhook' },
	{ name: 'setup', httpMethod: 'GET', responseMode: 'onReceived', path: 'setup' },
],
```

On the `setup` endpoint, every request is a handshake:

* If `when` is set and its result is falsy, n8n replies `401 Unauthorized`.
* If there's no `handshake`, n8n replies `OK`.
* n8n doesn't verify `setup` requests and runs no other stage.

`$webhookUrl` in the lifecycle is always the URL of the `default` endpoint, so a `create` configuration can't send the `setup` URL to the service. If the service needs it, write `create` as a function and get the URL with `this.getNodeWebhookUrl('setup')`.

### Verification

Verification checks the signature of each request. A request that fails the check gets `401 Unauthorized` and starts no workflow:

```ts
verification: {
	algorithm: 'hmac-sha256',
	signatureHeader: 'x-example-signature',
	prefix: 'sha256=',
	secret: '={{ $staticData.webhookSecret }}',
},
```

| Property | Description |
| --- | --- |
| `algorithm` | `hmac-sha256` or `hmac-sha1` sign `signedPayload` with `secret`. `token` compares `secret` with the header value. |
| `signatureHeader` | The header that contains the signature or token. Not case sensitive. |
| `secret` | An expression for the secret. It can use `$staticData`, and `$credentials` when `credentialType` is set. |
| `credentialType` | The credential to load as `$credentials`, for example for `={{ $credentials.signingSecret }}`. |
| `prefix` | Text in front of the digest or token, for example `sha256=`. |
| `encoding` | The encoding of the HMAC digest: `hex` or `base64`. Default `hex`. |
| `signedPayload` | The text to sign. `{body}` is the raw request body. Default `{body}`. Refer to [Signed payload](#signed-payload). |
| `timestampHeader` | A header with a Unix timestamp in seconds or milliseconds. A missing value, or a value outside the allowed window, fails the check. Not case sensitive. |
| `maxTimestampAgeSeconds` | The allowed difference from the current time, in the past or the future. Default `300`. |
| `skipIfNoSecret` | When `true`, n8n accepts a request when no secret is configured. Default `false`. |

n8n compares signatures in constant time. The comparison includes the prefix.

#### Signed payload

`signedPayload` is a template, where `{body}` stands for the raw request body. If the template starts with `=`, the parts between `{body}` markers are expressions:

```ts
// Sign "v0:<timestamp>:<raw-body>".
signedPayload: '=v0:{{ $webhookRequest.headers["x-example-timestamp"] }}:{body}',
```

n8n adds the raw body after it resolves the expressions, so the body is never part of an expression. A template part that doesn't resolve to a string or a number fails the check.

#### Timestamps and replay protection

`timestampHeader` rejects requests outside the time window. It only prevents replay attacks when `signedPayload` also contains the timestamp. Without that, an attacker can send an old signed body with a new timestamp header.

#### HMAC verification needs the raw body

HMAC verification signs the raw bytes of the request body, not the parsed body. If n8n has no raw body for a request, the check fails. n8n doesn't keep the raw body for content types it doesn't parse itself, such as `multipart/form-data`, so HMAC verification rejects those requests. The `token` algorithm doesn't read the body.

#### Verification when there's no secret

Verification fails closed:

* An empty secret (`undefined`, `null`, or `''`) fails the check, and n8n logs a warning.
* With `skipIfNoSecret: true`, n8n accepts the request without a check when the secret is empty. When a secret is available, n8n still checks it.
* A secret that fails to load always fails the check, even with `skipIfNoSecret`. For example, a credential that's set but doesn't load. n8n treats a credential as "no secret" only when the user didn't select one.

#### Signature formats that verification doesn't support

The verification stage reads one signature from one header, with an optional fixed prefix. It doesn't support:

* One header that contains both the timestamp and the signature, for example `t=1700000000,v1=<signature>`.
* Headers that contain more than one signature, for example during secret rotation.

For these services, write the `webhook()` method yourself. Refer to [Write your own trigger methods](./#write-your-own-trigger-methods).

### Ping

A ping is a test request from the service. n8n replies and starts no workflow:

```ts
ping: { when: '={{ $webhookRequest.body.type === "ping" }}', response: 'pong' },
```

| Property | Description |
| --- | --- |
| `when` | An expression. A truthy result makes the request a ping. |
| `response` | The reply body. Default `OK`. |

The ping stage runs after verification. When you configure verification, a ping must also have a valid signature.

### Filter

The filter starts the workflow only for the events the user selected:

```ts
filter: {
	allowed: '={{ $parameter.events }}',
	actual: '={{ $webhookRequest.body.event }}',
	// Accept every event when the user selects this option.
	wildcard: '*',
},
```

| Property | Description |
| --- | --- |
| `allowed` | An expression for the allowed events. A string is a list of one event. |
| `actual` | An expression for the event of the request. |
| `wildcard` | A value that accepts all events when `allowed` contains it. |

The comparison is strict (`===`). When the event isn't allowed, or `actual` is `undefined`, n8n replies `200` with its default message and starts no workflow.

### Output

The output stage turns the request into items:

| Property | Description |
| --- | --- |
| `postReceive` | Routing `postReceive` actions. `$response.body` is the request body. |
| `includeMeta` | When `true`, each item is `{ body, headers, query }`. |

* If the body is an array, each element becomes one item. Otherwise the body is one item.
* n8n puts the body in `item.json` unchanged. Keys such as `json` or `binary` in the body are data, not item fields.
* `includeMeta` wraps each item after the `postReceive` actions. Binary data that an action attached stays on the item.
* If no items remain, n8n starts no workflow.
* The `postReceive` actions run without credentials. `$credentials` isn't available, for example in a `filter` action.

#### `includeMeta` redacts credential headers

`includeMeta` puts the request headers in the output. For nodes that use `includeMeta`, n8n marks `headers.authorization` and `headers.cookie` as sensitive output fields. n8n always redacts these fields in the execution data it shows, and users can't reveal them. Later nodes in the workflow still receive them.

## Webhook trigger expression keys

Declarative webhook triggers add these keys to expressions. The usual keys, such as `$parameter` and `$credentials` in `routing`, are also available.

| Key | Available in | Shape |
| --- | --- | --- |
| `$webhookUrl` | All lifecycle methods | The URL of the `default` webhook. A manual run gives the test URL. |
| `$staticData` | All lifecycle methods, and `handler.verification.secret` | The node's static data object. |
| `$generated` | `create`: `routing`, `store`, `validateResponse` | `Record<string, string>` with the values from `create.generate`. |
| `$response` | `create.store`, `create.validateResponse` | The JSON of the first item the `create` request returns. |
| `$response` | `handler.output.postReceive` | `{ body, headers, statusCode }`. `body` and `headers` come from the incoming request. `statusCode` is `200`. |
| `$hook` | `checkExists.matchOn[].value`, `checkExists.store` | The JSON of the registered webhook that n8n compares. |
| `$webhookRequest` | All `handler` stages | `{ body, headers, query }` of the incoming request. |
| `$credentials` | `handler.verification.secret`, when `credentialType` is set | The decrypted credential data. |

`$webhookRequest` is the incoming request. Don't confuse it with `$request`, which is the outgoing request in routing pagination.

Node.js gives header names in lowercase, so write `$webhookRequest.headers["x-example-signature"]`, not `$webhookRequest.headers["X-Example-Signature"]`.

## Webhook trigger example

This example uses a placeholder API at `api.example.com`. The API:

* Registers a webhook with `POST /webhooks` and returns `{ "id": "...", "status": "active" }`.
* Reads a webhook with `GET /webhooks/{id}` and removes it with `DELETE /webhooks/{id}`.
* Signs each event with HMAC-SHA256 over `<timestamp>.<body>`, in the `x-example-signature` header, with the timestamp in `x-example-timestamp`.
* Sends `{ "type": "ping" }` to test the URL.
* Sends events as `{ "event": "task.created", "data": { ... } }`.

```ts
import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

export class ExampleWebhookTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Example Webhook Trigger',
		name: 'exampleWebhookTrigger',
		icon: 'file:example.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when an event happens',
		subtitle: '={{ $parameter.events.join(", ") }}',
		defaults: { name: 'Example Webhook Trigger' },
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'exampleApi', required: true }],
		requestDefaults: { baseURL: 'https://api.example.com/v1' },
		// The webhook endpoint must have the name `default`.
		webhooks: [
			{ name: 'default', httpMethod: 'POST', responseMode: 'onReceived', path: 'webhook' },
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				default: ['task.created'],
				options: [
					{ name: 'All Events', value: '*' },
					{ name: 'Task Created', value: 'task.created' },
					{ name: 'Task Deleted', value: 'task.deleted' },
				],
			},
		],
		trigger: {
			type: 'webhook',
			lifecycle: {
				checkExists: {
					routing: {
						request: { method: 'GET', url: '=/webhooks/{{ $staticData.webhookId }}' },
					},
					// Register again if the secret is missing, because no event can pass verification.
					requireKeys: ['webhookSecret'],
				},
				create: {
					generate: { secret: { type: 'hex', length: 32 } },
					routing: {
						request: {
							method: 'POST',
							url: '/webhooks',
							body: {
								url: '={{ $webhookUrl }}',
								events: '={{ $parameter.events }}',
								secret: '={{ $generated.secret }}',
							},
						},
					},
					validateResponse: '={{ $response.status === "active" }}',
					// Always store the webhook ID, so that `checkExists` and `delete` can use it.
					store: {
						webhookId: '={{ $response.id }}',
						webhookSecret: '={{ $generated.secret }}',
					},
				},
				delete: {
					routing: {
						request: { method: 'DELETE', url: '=/webhooks/{{ $staticData.webhookId }}' },
					},
				},
			},
			handler: {
				// A request with a wrong signature gets 401 and starts no workflow.
				verification: {
					algorithm: 'hmac-sha256',
					signatureHeader: 'x-example-signature',
					secret: '={{ $staticData.webhookSecret }}',
					timestampHeader: 'x-example-timestamp',
					// Sign the timestamp too, so an old request can't be sent again.
					signedPayload: '={{ $webhookRequest.headers["x-example-timestamp"] }}.{body}',
				},
				ping: { when: '={{ $webhookRequest.body.type === "ping" }}' },
				filter: {
					allowed: '={{ $parameter.events }}',
					actual: '={{ $webhookRequest.body.event }}',
					wildcard: '*',
				},
				output: {
					// Emit the event's `data` object as the item.
					postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }],
				},
			},
		},
	};
}
```

## Related resources

* [Declarative triggers](./)
* [Polling triggers](polling-triggers.md)
* [Declarative-style parameters](../base-files/declarative-style-parameters.md)
