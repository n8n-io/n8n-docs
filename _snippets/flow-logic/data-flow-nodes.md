Nodes process multiple items.

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
