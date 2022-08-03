# Data structure

In n8n, all data passed between nodes is an array of objects. It has the following structure:

```json
[
	{
		// For most data:
		// Wrap each item in another object, with the key 'json'
		"json": {
			// Example data
			"jsonKeyName": "keyValue",
			"anotherJsonKey": {
				"lowerLevelJsonKey": 1
			}
		},
		// For binary data:
		// Wrap each item in another object, with the key 'binary'
		"binary": {
			// Example data
			"binaryKeyName": {
				"data": "....", // Base64 encoded binary data (required)
				"mimeType": "image/png", // Best practice to set if possible (optional)
				"fileExtension": "png", // Best practice to set if possible (optional)
				"fileName": "example.png", // Best practice to set if possible (optional)
			}
		}
	},
]
```

!!! note "Skipping the 'json' key and array syntax"
    From 0.166.0 onwards, when using the function node, n8n automatically adds the `json` key if it's missing. It also automatically wraps your items in an array (`[]`) if needed. This is only when using the Function node. When building your own nodes, you must still make sure the node returns data with the `json` key.

## Data flow

Nodes do not only process one "item", they process multiple ones.
For example, if the Trello node is set to `Create-Card` and it has an expression set for `Name` to be set depending on `name` property, it will create a card for each item, always choosing the `name-property-value` of the current one.

This data would, for example, create two cards. One named `test1` the other one named `test2`:

```json
[
	{
		name: "test1"
	},
	{
		name: "test2"
	}
]
```
