
# General Guidelines


Please make sure that everything works correctly and that no unnecessary code gets added. It is important to follow the following guidelines:


### Do not change incoming data

Never change the incoming data a node receives (which can be queried with `this.getInputData()`) as it gets shared by all nodes. If data has to get added, changed or deleted it has to be cloned and the new data returned. If that is not done, sibling nodes which execute after the current one will operate on the altered data and would process different data than they were supposed to.
It is however not needed to always clone all the data. If a node for, example only, changes only the binary data but not the JSON data, a new item can be created which reuses the reference to the JSON item.

An example can be seen in the code of the [ReadBinaryFile-Node](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/ReadBinaryFile.node.ts#L69-L83).


### Write nodes in TypeScript

All code of n8n is written in TypeScript and hence, the nodes should also be written in TypeScript. That makes development easier, faster, and avoids at least some bugs.


### Use the built in request library

Some third-party services have their own libraries on npm which make it easier to create an integration. It can be quite tempting to use them. The problem with those is that you add another dependency and not only one, you add but also all the dependencies of the dependencies. This means more and more code gets added, has to get loaded, can introduce security vulnerabilities, bugs, and so on. So please use the built-in module which can be used like this:

```typescript
const response = await this.helpers.request(options);
```

That is using the npm package [`request-promise-native`](https://github.com/request/request-promise-native) which is the basic npm `request` module but with promises. For a full set of `options` consider looking at [the underlying `request` options documentation](https://github.com/request/request#requestoptions-callback).


### Reuse parameter names

When a node can perform multiple operations like edit and delete some kind of entity, for both operations, it would need an entity-id. Do not call them "editId" and "deleteId", call them "id". n8n can handle multiple parameters with the same name without a problem as long as only one is visible. To make sure that is the case, the "displayOptions" can be used. By keeping the same name, the value can be kept if a user switches the operation from "edit" to "delete".


### Create an "Options" parameter

Some nodes may need a lot of options. Add only the very important ones to the top level and for all others, create an "Options" parameter where they can be added if needed. This ensures that the interface stays clean and does not unnecessarily confuse people. A good example of that would be the XML node.


### Follow existing parameter naming guideline

There is not much of a guideline yet but if your node can do multiple things, call the parameter which sets the behavior either "mode" (like "Merge" and "XML" node) or "operation" like the most other ones. If these operations can be done on different resources (like "User" or "Order) create a "resource" parameter (like "Pipedrive" and "Trello" node).


### Node Icons

Check existing node icons as a reference when you create own ones. The resolution of an icon should be 60x60px and saved as PNG.
