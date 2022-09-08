# `$("<node-name>").item`

!!! info "Expressions only"
		`$("<node-name>").item` is only available in the Expressions editor. You can't use it in the Function node.


Returns the data of a specified node.

```typescript
// Returns the fileName of binary property "data" of Node "HTTP Request"
const fileName = $("HTTP Request").item.binary["data"]["fileName"]}}

// Returns the context data "noItemsLeft" of Node "SplitInBatches"
const noItemsLeft = $("SplitInBatches").item.context["noItemsLeft"];

// Returns the value of the JSON data property "myNumber" of Node "Set"
const myNumber = $("Set").item.json['myNumber'];

// Returns the value of the parameter "channel" of Node "Slack"
const channel = $("Slack").item.parameter["channel"];
```
