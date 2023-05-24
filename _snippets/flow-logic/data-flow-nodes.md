Nodes can process multiple items.

For example, if you set the Trello node to `Create-Card`, and create an expression that sets `Name` using a property called `name-input-value` from the incoming data, the node will create a card for each item, always choosing the `name-input-value` of the current item.

This input data would, for example, create two cards. One named `test1` the other one named `test2`:

```json
[
	{
		name-input-value: "test1"
	},
	{
		name-input-value: "test2"
	}
]
```
