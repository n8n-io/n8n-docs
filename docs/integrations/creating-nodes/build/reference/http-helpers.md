---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: reference
---

# HTTP request helper for node builders

n8n provides a flexible helper for making HTTP requests, which abstracts away most of the complexity.

/// note | Programmatic style only
The information in this document is for node building using the programmatic style. It doesn't apply to declarative style nodes.
///
## Usage

Call the helper inside the `execute` function. 

```typescript
// If no auth needed
const response = await this.helpers.httpRequest(options);

// If auth needed
const response = await this.helpers.httpRequestWithAuthentication.call(
	this, 
	'credentialTypeName', // For example: pipedriveApi
	options,
);
```

`options` is an object:

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

`url` is required. The other fields are optional. The default method is `GET`.

Some notes about the possible fields:

- `body`: you can use a regular JavaScript object for JSON payload, a buffer for file uploads, an instance of FormData for `multipart/form-data`, and `URLSearchParams` for `application/x-www-form-urlencoded`.
- `headers`: a key-value pair.  
	* If `body` is an instance of `FormData` then n8n adds `content-type: multipart/form-data` automatically.  
	* If `body` is an instance of `URLSearchParams`, then n8n adds `content-type: application/x-www-form-urlencoded`.  
	* To override this behavior, set a `content-type` header.
- `arrayFormat`: if your query string contains an array of data, such as `const qs = {IDs: [15,17]}`, the value of `arrayFormat` defines how n8n formats it.  
	* `indices` (default):  `{ a: ['b', 'c'] }` as `a[0]=b&a[1]=c`  
	* `brackets`: `{ a: ['b', 'c'] }` as `a[]=b&a[]=c`  
	* `repeat`: `{ a: ['b', 'c'] }` as `a=b&a=c`  
	* `comma`: `{ a: ['b', 'c'] }` as `a=b,c`
- `auth`: Used for Basic auth. Provide `username` and `password`. n8n recommends omitting this, and using `helpers.httpRequestWithAuthentication(...)` instead.
- `disableFollowRedirect`: By default, n8n follows redirects. You can set this to true to prevent this from happening.
- `skipSslCertificateValidation`: Used for calling HTTPS services without proper certificate
- `returnFullResponse`: Instead of returning just the body, returns an object with more data in the following format: `{body: body, headers: object, statusCode: 200, statusMessage: 'OK'}`
- `encoding`: n8n can detect the content type, but you can specify `arrayBuffer` to receive a Buffer you can read from and interact with.

## Example

For an example, refer to the [Mattermost node](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Mattermost/v1/MattermostV1.node.ts).

## Deprecation of the previous helper

The previous helper implementation using `this.helpers.request(options)` used and exposed the `request-promise` library. This was removed in version 1.

To minimize incompatibility, n8n made a transparent conversion to another library called `Axios`.

If you are having issues, please report them in the [Community Forums](https://community.n8n.io/) or on [GitHub](https://github.com/n8n-io/n8n/issues).

## Migration guide to the new helper

The new helper is much more robust, library agnostic, and easier to use.

New nodes should all use the new helper. You should strongly consider migrating existing custom nodes to the new helper. These are the main considerations when migrating:

- Accepts `url`. Doesn't accept `uri`.
- `encoding: null` now must be `encoding: arrayBuffer`.
- `rejectUnauthorized: false` is now `skipSslCertificateValidation: true`
- Use `body` according to `content-type` headers to clarify the payload.
- `resolveWithFullResponse` is now `returnFullResponse` and has similar behavior
