---
contentType: explanation
---

# How n8n structures data

Understanding how n8n structures and passes data between nodes is fundamental to building workflows. This guide covers both the data structure format and how data flows through your workflow.

## Data structure

In n8n, all data passed between nodes is an array of objects. It has the following structure:

```json
[
	{
		// For most data:
		// Wrap each item in another object, with the key 'json'
		"json": {
			// Example data
			"apple": "beets",
			"carrot": {
				"dill": 1
			}
		},
		// For binary data:
		// Wrap each item in another object, with the key 'binary'
		"binary": {
			// Example data
			"apple-picture": {
				"data": "....", // Base64 encoded binary data (required)
				"mimeType": "image/png", // Best practice to set if possible (optional)
				"fileExtension": "png", // Best practice to set if possible (optional)
				"fileName": "example.png", // Best practice to set if possible (optional)
			}
		}
	},
]
```

/// note | Skipping the `json` key and array syntax
From 0.166.0 on, when using the Function node or Code node, n8n automatically adds the `json` key if it's missing. It also automatically wraps your items in an array (`[]`) if needed. This is only the case when using the Function or Code nodes. When building your own nodes, you must still make sure the node returns data with the `json` key.
///

## How data flows within nodes

When you connect nodes in a workflow, data automatically passes from one node to the next.

Nodes process multiple items automatically. When a node receives an array of data items, it processes each item individually and performs the configured operation for each one.

For example, if you set the Trello node to `Create-Card`, and create an expression that sets `Name` using a property called `name-input-value` from the incoming data, the node creates a card for each item, always choosing the `name-input-value` of the current item.

For example, this input will create two cards. One named `test1` the other one named `test2`:

```json
[
	{
		"name-input-value": "test1"
	},
	{
		"name-input-value": "test2"
	}
]
```
