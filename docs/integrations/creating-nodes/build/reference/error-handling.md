---
contentType: reference
---

# Error handling in n8n nodes

Proper error handling is crucial for creating robust n8n nodes that provide clear feedback to users when things go wrong. n8n provides two specialized error classes to handle different types of failures in node implementations:

- [**`NodeApiError`**](#nodeapierror): For API-related errors and external service failures
- [**`NodeOperationError`**](#nodeoperationerror): For operational errors, validation failures, and configuration issues

## NodeApiError

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

### Common usage patterns

For basic API request failures, catch the error and wrap it in `NodeApiError`:

```typescript
try {
	const response = await this.helpers.requestWithAuthentication.call(
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
	const response = await this.helpers.requestWithAuthentication.call(
		this,
		credentialType,
		options
	);
	return response;
} catch (error) {
	if (error.httpCode === "404") {
		const resource = this.getNodeParameter("resource", 0) as string;
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

## NodeOperationError

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

### Common usage patterns

Use `NodeOperationError` for validating user inputs:

```typescript
const email = this.getNodeParameter("email", itemIndex) as string;

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
