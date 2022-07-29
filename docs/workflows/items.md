# Items

Data sent from one node to another is sent as an array of JSON objects. Each element in this collection is called an **Item**. A node performs its action on each item of incoming data.

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
