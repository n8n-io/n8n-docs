# `$("<node-name>").item`

!!! info "Not avaialble in Function node"
		`$("<node-name>").item` isn't available in the Function node.


Returns the data of a specified node.

```typescript
// Returns the fileName of binary property "data" of Node "HTTP Request"
const fileName = $("HTTP Request").item.binary["data"]["fileName"]}}

// Returns the value of the JSON data property "myNumber" of Node "Set"
const myNumber = $("Set").item.json['myNumber'];

// Returns the value of the parameter "channel" of Node "Slack"
const channel = $("Slack").item.parameter["channel"];
```
