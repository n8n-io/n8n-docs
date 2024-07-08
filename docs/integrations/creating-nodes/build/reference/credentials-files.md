---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: reference
---

# Credentials file

The credentials file defines the authorization methods for the node. The settings in this file affect what n8n displays in the **Credentials** modal, and must reflect the authentication requirements of the service you're connecting to.

In the credentials file, you can use all the [n8n UI elements](/integrations/creating-nodes/build/reference/ui-elements/). n8n encrypts the data that's stored using credentials using an encryption key.

## Structure of the credentials file

The credentials file follows this basic structure:

1. Import statements
2. Create a class for the credentials
3. Within the class, define the properties that control authentication for the node.

### Outline structure

```js
import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ExampleNode implements ICredentialType {
	name = 'exampleNodeApi';
	displayName = 'Example Node API';
	documentationUrl = '';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
    		// Can be body, header, qs or auth
			qs: {
        		// Use the value from `apiKey` above
				'api_key': '={{$credentials.apiKey}}'
			}

		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.domain}}',
			url: '/bearer',
		},
	};
}
```


## Parameters

### `name`

String. The internal name of the object. Used to reference it from other places in the node.

### `displayName`

String. The name n8n uses in the GUI.

### `documentationUrl`

String. URL to your credentials documentation.

### `properties`

Each object contains:

* `displayName`: the name n8n uses in the GUI.
* `name`: the internal name of the object. Used to reference it from other places in the node.
* `type`: the data type expected, such as `string`.
* `default`: the URL that n8n should use to test credentials.

### `authenticate`

* `authenticate`: Object. Contains objects that tell n8n how to inject the authentication data as part of the API request. 

#### `type`

String. If you're using an authentication method that sends data in the header, body, or query string, set this to `'generic'`. 

#### `properties`

Object. Defines the authentication methods. Options are:

* `body`: Object. Sends authentication data in the request body. Can contain nested objects.
```typescript
authenticate: IAuthenticateGeneric = {
	type: 'generic',
	properties: {
		body: {
			username: '={{$credentials.username}}',
			password: '={{$credentials.password}}',
		},
	},
};
``` 

* `header`: Object. Send authentication data in the request header.
```typescript
authenticate: IAuthenticateGeneric = {
	type: 'generic',
	properties: {
		header: {
			Authorization: '=Bearer {{$credentials.authToken}}',
		},
	},
};
``` 

* `qs`: Object. Stands for "query string." Send authentication data in the request query string.
```typescript
authenticate: IAuthenticateGeneric = {
	type: 'generic',
	properties: {
		qs: {
			token: '={{$credentials.token}}',
		},
	},
};
``` 

* `auth`: Object. Used for Basic Auth. Requires `username` and `password` as the key names.
```typescript
authenticate: IAuthenticateGeneric = {
	type: 'generic',
	properties: {
		auth: {
			username: '={{$credentials.username}}',
			password: '={{$credentials.password}}',
		},
	},
};
```

### `test`

Provide a `request` object containing a URL and authentication type that n8n can use to test the credential.

```typescript
test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.domain}}',
			url: '/bearer',
		},
	};
```
