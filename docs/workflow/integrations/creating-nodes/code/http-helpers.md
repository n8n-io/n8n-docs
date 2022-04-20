---
title: Making HTTP Requests
description: While creating nodes it is very commonn to call external APIs or make HTTP requests to other services.
tags:
  - Workflow²
  - HTTP Requests
---
# Making HTTP Requests

While creating nodes it is very commonn to call external APIs or make HTTP requests to other services.

This plays a major role during node development, maintenance, and improvements.

We provide a very flexible helper for making HTTP requests that abstracts away most of the complexity with a simple to use interface.

## How to use

In the node code, inside the `execute` function you can easily call:

```typescript
const response = await this.helpers.httpRequest(options);
```

Where `options` is an object in this format:

```typescript
{
	url: string;
	headers?: object;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';
	body?: FormData | Array | string | number | object | Buffer | URLSearchParams;
	qs?: object;
	arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma';
	auth?: {
		username: string,
		password: string,
	};
	disableFollowRedirect?: boolean;
	encoding?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
	skipSslCertificateValidation?: boolean;
	returnFullResponse?: boolean;
	proxy?: {
		host: string;
		port: string | number;
		auth?: {
			username: string;
			password: string;
		},
		protocol?: string;
	};
	timeout?: number;
	json?: boolean;
}	
```

Where `url` is the only mandatory field. The default method is `GET`.

Some notes about the possible fields:

- **body**: You can use a regular Javascript Object for JSON payload, a Buffer for file uploads, an instance of FormData for `multipart/form-data` and `URLSearchParams` for `application/x-www-form-urlencoded`.
- **headers**: A simple key-value pair.  
	* If `body` is an instance of `FormData` then `content-type: multipart/form-data` is injected automatically.  
	* If `body` is an instance of `URLSearchParams`, then `content-type: application/x-www-form-urlencoded` is added.  
	* To override this behavior, you can set any `content-type` header you wish and it won't be overridden.
- **arrayFormat**: If your query string contains an array of data, let's say `const qs = {IDs: [15,17]}`, the values set to `arrayFormat` define how it will be sent.  
	* `indices` (default): `{ a: ['b', 'c'] }` will be formatted as `a[0]=b&a[1]=c`  
	* `brackets`: `{ a: ['b', 'c'] }` will be formatted as `a[]=b&a[]=c`  
	* `repeat`: `{ a: ['b', 'c'] }` will be formatted as `a=b&a=c`  
	* `comma`: `{ a: ['b', 'c'] }` will be formatted as `a=b,c`
- **auth**: Used for Basic auth. Provide `username` and `password`.
- **disableFollowRedirect**: By default, we'll follow redirects. You can set this to false to prevent this from happening
- **skipSslCertificateValidation**: Used for calling HTTPS services without proper certificate
- **returnFullResponse**: Instead of returning only the body, returns an object with more data in the following format: `{body: body, headers: object, statusCode: 200, statusMessage: 'OK'}`
- **encoding**: We usually detect the content type correctly but you can specify `arrayBuffer` to receive a Buffer you can read from and interact with.

## Deprecation of the previous helper

The previous helper implementation using `this.helpers.request(options)` used and exposed the `request-promise` library which was deprecated.

In an effort to keep maximum compatibility, we made a transparent conversion to another library called `axios`.

If you are having issues, please report them in our [Community Forums](https://community.n8n.io/) or on [Github](https://github.com/n8n-io/n8n/issues).

Also, you can temporarily enable Doc² to use the deprecated library by setting the environment variable `N8N_USE_DEPRECATED_REQUEST_LIB=true`.

**Please note:** This behavior is permanent and we will be removing the `request-promise` library entirely in the future so please report any errors you have so we can fix them.

## Migration guide to the new helper

As mentioned above, the previous helper is deprecated and will be replaced in the future. The new helper is much more robust, library agnostic, and easier to use.

New nodes should all use the new helper, and if you have built custom nodes we strongly suggest you migrate to the new helper. Here are the main considerations when migrating:

- Only `url` is accepted. Previously `uri` was also accepted
- `encoding: null` now must be `encoding: arrayBuffer`
- `rejectUnauthorized: false` is now `skipSslCertificateValidation: true`
- Use `body` according to `content-type` headers to clarify what is being sent
- `resolveWithFullResponse` is now `returnFullResponse` and has similar behavior

## Example

For an example, please check the [Mattermost node](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Mattermost/v1/MattermostV1.node.ts).