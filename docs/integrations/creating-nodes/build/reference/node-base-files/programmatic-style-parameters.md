---
title: Programmatic-style parameters
description: A reference document listing the programmatic-style parameters of the node base file.
contentType: reference
---

# Programmatic-style parameters

These are the parameters available for [node base file](/integrations/creating-nodes/build/reference/node-base-files/index.md) of programmatic-style nodes.

This document gives short code snippets to help understand the code structure and concepts. For a full walk-through of building a node, including real-world code examples, refer to [Build a programmatic-style node](/integrations/creating-nodes/build/programmatic-style-node.md).

Programmatic-style nodes also use the `execute()` method. Refer to [Programmatic-style execute method](/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-execute-method.md) for more information.

Refer to [Standard parameters](/integrations/creating-nodes/build/reference/node-base-files/standard-parameters.md) for parameters available to all nodes.

## `defaultVersion`

_Number_ | _Optional_

Use `defaultVersion` when using the full versioning approach.

n8n support two methods of node versioning. Refer to [Node versioning](/integrations/creating-nodes/build/reference/node-versioning.md) for more information.

## `methods` and `loadOptions`

_Object_ | _Optional_

Contains the `loadOptions` method for programmatic-style nodes. You can use this method to query the service to get user-specific settings (such as getting a user's email labels from Gmail), then return them and render them in the GUI so the user can include them in subsequent queries.

For example, n8n's [Gmail node](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Google/Gmail/Gmail.node.ts) uses `loadOptions` to get all email labels:

```js
	methods = {
		loadOptions: {
			// Get all the labels and display them
			async getLabels(
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const labels = await googleApiRequestAllItems.call(
					this,
					'labels',
					'GET',
					'/gmail/v1/users/me/labels',
				);
				for (const label of labels) {
					const labelName = label.name;
					const labelId = label.id;
					returnData.push({
						name: labelName,
						value: labelId,
					});
				}
				return returnData;
			},
		},
	};
```

## `version`

_Number_ or _Array_ | _Optional_

Use `version` when using the light versioning approach.

If you have one version of your node, this can be a number. If you want to support multiple versions, turn this into an array, containing numbers for each node version.

n8n support two methods of node versioning. Programmatic-style nodes can use either. Refer to [Node versioning](/integrations/creating-nodes/build/reference/node-versioning.md) for more information.

