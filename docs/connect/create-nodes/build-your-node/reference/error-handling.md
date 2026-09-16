---
contentType: reference
nodeTitle: Error handling
originalFilePath: integrations/creating-nodes/build/reference/error-handling.md
originalUrl: 'https://docs.n8n.io/integrations/creating-nodes/build/reference/error-handling'
url: >-
  https://docs.n8n.io/connect/create-nodes/build-your-node/reference/error-handling
layout:
  description:
    visible: false
---

# Error handling in n8n nodes <a href="#error-handling-in-n8n-nodes" id="error-handling-in-n8n-nodes"></a>

Proper error handling is crucial for creating robust n8n nodes that provide clear feedback to users when things go wrong. n8n provides two specialized error classes to handle different types of failures in node implementations:

- [**`NodeApiError`**](#nodeapierror): For API-related errors and external service failures
- [**`NodeOperationError`**](#nodeoperationerror): For operational errors, validation failures, and configuration issues

## NodeApiError <a href="#nodeapierror" id="nodeapierror"></a>

Use `NodeApiError` when dealing with external API calls and HTTP requests. This error class is specifically designed to handle API response errors and provides enhanced features for parsing and presenting API-related failures such as:

 * HTTP request failures
 * external API errors
 * authentication/authorization failures
 * rate limiting errors
 * service unavailable errors
 
Initialize new `NodeApiError` instances using the following pattern:

```typescript
new NodeApiError(node: INode, errorResponse: JsonObject, options?: NodeApiErrorOptions)
```

### Common usage patterns <a href="#common-usage-patterns" id="common-usage-patterns"></a>

For basic API request failures, catch the error and wrap it in `NodeApiError`:

```typescript
try {
	const response = await this.helpers.httpRequestWithAuthentication.call(
		this,
		credentialType,
		options
	);
	return response;
} catch (error) {
	throw new NodeApiError(this.getNode(), error as JsonObject);
}
```

Handle specific HTTP status codes with custom messages:

```typescript
try {
	const response = await this.helpers.httpRequestWithAuthentication.call(
		this,
		credentialType,
		options
	);
	return response;
} catch (error) {
	if (error.httpCode === "404") {
		const resource = this.getNodeParameter("resource", 0);
		const errorOptions = {
			message: `${
				resource.charAt(0).toUpperCase() + resource.slice(1)
			} not found`,
			description:
				"The requested resource could not be found. Please check your input parameters.",
		};
		throw new NodeApiError(
			this.getNode(),
			error as JsonObject,
			errorOptions
		);
	}

	if (error.httpCode === "401") {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: "Authentication failed",
			description: "Please check your credentials and try again.",
		});
	}

	throw new NodeApiError(this.getNode(), error as JsonObject);
}
```

## NodeOperationError <a href="#nodeoperationerror" id="nodeoperationerror"></a>

Use `NodeOperationError` for:

 * operational errors
 * validation failures
 * configuration issues that aren't related to external API calls
 * input validation errors
 * missing required parameters
 * data transformation errors
 * workflow logic errors
 
 Initialize new `NodeOperationError` instances using the following pattern:

```typescript
new NodeOperationError(node: INode, error: Error | string | JsonObject, options?: NodeOperationErrorOptions)
```

### Common usage patterns <a href="#common-usage-patterns" id="common-usage-patterns"></a>

Use `NodeOperationError` for validating user inputs:

```typescript
const email = this.getNodeParameter("email", itemIndex);

if (email.indexOf("@") === -1) {
	const description = `The email address '${email}' in the 'email' field isn't valid`;
	throw new NodeOperationError(this.getNode(), "Invalid email address", {
		description,
		itemIndex, // for multiple items, this will link the error to the specific item
	});
}
```

When processing multiple items, include the item index for better error context:

```typescript
for (let i = 0; i < items.length; i++) {
	try {
		// Process item
		const result = await processItem(items[i]);
		returnData.push(result);
	} catch (error) {
		if (this.continueOnFail()) {
			returnData.push({
				json: { error: error.message },
				pairedItem: { item: i },
			});
			continue;
		}

		throw new NodeOperationError(this.getNode(), error as Error, {
			description: error.description,
			itemIndex: i,
		});
	}
}
```

## Declaring why an operation failed

{% hint style="info" %}
**Feature availability**

Failure declarations are available from n8n 3.37.
{% endhint %}

Both `NodeApiError` and `NodeOperationError` accept a `failure` option that states why the operation failed. Use it when the node can tell from the response what went wrong, such as a used-up quota or a credential that no longer works. The declaration lands on the error's `failure` property as plain data. The node states the cause, never what to do about it: n8n owns any behavior derived from the declaration, such as how a polling trigger backs off after a failed poll.

Pass the declaration when you construct the error:

```typescript
throw new NodeApiError(this.getNode(), error as JsonObject, {
	failure: { cause: 'rate-limited' },
});
```

### Failure causes

The `cause` field takes one of six values. The first three describe failures that resolve on their own. The other three need someone to act before the operation can succeed.

| `cause` | Meaning |
|---------|---------|
| `rate-limited` | The service is throttling requests. |
| `quota-exhausted` | A usage quota ran out and the operation fails until the quota resets. |
| `temporarily-unavailable` | The service is down or degraded right now. |
| `credential-invalid` | The credential no longer works. The user has to reconnect it. |
| `configuration-invalid` | The node points at something that no longer exists or is no longer allowed. |
| `node-defect` | A bug in the node itself. Neither the credential nor the configuration is to blame. |

### Wait hints

On `rate-limited`, `quota-exhausted`, and `temporarily-unavailable`, you can add optional hints about when the operation may work again. The other causes don't accept them, since there's nothing to wait for.

| Field | Meaning |
|-------|---------|
| `retryAfterMs` | Minimum wait the service asked for, in milliseconds. |
| `resetsAtEpochMs` | When the service says the operation works again, as Unix epoch milliseconds. |

For example, a quota that resets at a known time declares when it comes back:

```typescript
throw new NodeApiError(this.getNode(), error as JsonObject, {
	failure: { cause: 'quota-exhausted', resetsAtEpochMs: nextQuotaReset() },
});
```

### Classifying API errors

Only declare a cause the response proves. If you can't classify an error with confidence, throw it unchanged: an error without a declaration is still valid.

```typescript
try {
	return await this.helpers.httpRequestWithAuthentication.call(
		this,
		credentialType,
		options
	);
} catch (error) {
	if (error.httpCode === "401") {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			failure: { cause: "credential-invalid" },
		});
	}

	if (error.httpCode === "429") {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			failure: { cause: "rate-limited" },
		});
	}

	throw new NodeApiError(this.getNode(), error as JsonObject);
}
```
