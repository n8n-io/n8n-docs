---
title: Programmatic-style parameters
description: >-
  A reference document listing the programmatic-style parameters of the node
  base file.
contentType: reference
nodeTitle: Programmatic-style parameters
originalFilePath: >-
  integrations/creating-nodes/build/reference/node-base-files/programmatic-style-parameters.md
originalUrl: >-
  https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-parameters
url: >-
  https://docs.n8n.io/connect/create-nodes/build-your-node/reference/base-files/programmatic-style-parameters
layout:
  description:
    visible: false
---

# Programmatic-style parameters <a href="#programmatic-style-parameters" id="programmatic-style-parameters"></a>

These are the parameters available for [node base file](README.md) of programmatic-style nodes.

This document gives short code snippets to help understand the code structure and concepts. For a full walk-through of building a node, including real-world code examples, refer to [Build a programmatic-style node](../../tutorial-build-a-programmatic-style-node.md).

Programmatic-style nodes also use the `execute()` method. Refer to [Programmatic-style execute method](programmatic-style-execute-method.md) for more information.

Refer to [Standard parameters](standard-parameters.md) for parameters available to all nodes.

## `defaultVersion` <a href="#defaultversion" id="defaultversion"></a>

_Number_ | _Optional_

Use `defaultVersion` when using the full versioning approach.

n8n support two methods of node versioning. Refer to [Node versioning](../versioning.md) for more information.

## `methods` and `loadOptions` <a href="#methods-and-loadoptions" id="methods-and-loadoptions"></a>

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

## `version` <a href="#version" id="version"></a>

_Number_ or _Array_ | _Optional_

Use `version` when using the light versioning approach.

If you have one version of your node, this can be a number. If you want to support multiple versions, turn this into an array, containing numbers for each node version.

n8n support two methods of node versioning. Programmatic-style nodes can use either. Refer to [Node versioning](../versioning.md) for more information.

## `features` <a href="#features" id="features"></a>

_Object_ | _Optional_

Define named feature flags evaluated against the node version. Use features to control parameter visibility with `@feature` in `displayOptions`, or check them in code with `this.isNodeFeatureEnabled()`.

Refer to [Feature-based versioning](../versioning.md#feature-based-versioning) for more information.

