# General Guidelines

Please make sure that everything works and that no unnecessary code gets added. It's' important to follow the following guidelines:

## Don't change incoming data

Never change the incoming data a node receives (data accessible with `this.getInputData()`) as all nodes share it. If you need to add, change, or delete data, clone the incoming data and return the new data. If you don't do this, sibling nodes that execute after the current one will operate on the altered data and process incorrect data.

It's not necessary to always clone all the data. For example, if a node changes the binary data but not the JSON data, you can create a new item that reuses the reference to the JSON item.

You can see an example in the code of the [ReadBinaryFile-Node](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/ReadBinaryFile.node.ts#L69-L83).


## Write nodes in TypeScript

All n8n code is TypeScript. Writing your nodes in TypeScript can speed up development and reduce bugs.

## Use the built in request library

Some third-party services have their own libraries on npm, which make it easier to create an integration. The problem with these packages is that you add another dependency (plus all the dependencies of the dependencies). This adds more and more code, which has to be loaded, can introduce security vulnerabilities, bugs, and so on. Instead, use the built-in module:

```typescript
const response = await this.helpers.httpRequest(options);
```

This uses the npm package [`request-promise-native`](https://github.com/request/request-promise-native), which is the basic npm `request` module but with promises. For a full set of options refer to [the underlying `request` options documentation](https://github.com/request/request#requestoptions-callback).

Refer to [HTTP helpers](/integrations/creating-nodes/code/http-helpers/) for documentation and migration instructions for the deprecated `this.helpers.request`.


## Reuse parameter names

When a node can perform multiple operations, such as editing and deleting an entity, use an entity ID for both operations. Call them `id`, not `editId` and `deleteId`. n8n can handle multiple parameters with the same name without a problem as long as only one is visible. To make sure that's the case, use `displayOptions`. By keeping the same name, n8n can keep the value can if a user switches the operation from `edit` to `delete`.

[TODO: I have no clue what this means. Need an example.]

## Create an 'Additional Fields' parameter

Some nodes have a lot of options. Add important ones to the top level. For all others, create an 'Additional Fields' parameter where users can set them if needed. This ensures that the interface stays clean and reduces user confusion. A good example of that would be the XML node.

## Follow existing parameter naming guideline

If your node can perform multiple operations, call the parameter that sets the operation `Operation`. If your node can do these operations on more than one resource, create a `Resource` parameter.

[TODO: add example]


## Node icons

Check existing node icons as a reference when you create your own. The icon resolution should be 60x60px. Save it as a PNG.

## Node versions

n8n supports node versioning. You can make changes to existing nodes without breaking the existing behavior by introducing a new version. As an example, refer to the [Mattermost node](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Mattermost/v1/MattermostV1.node.ts).

Node versioning summary:

- The main node file should extend `NodeVersionedType` instead of `INodeType`.
- The main node file only contains a base description containing the `defaultVersion` (usually the latest) and a list of versions.
- n8n recommends using `v1`, `v2`, and so on for version folder names.
- Code separation:  
    * `actions` folder with description and implementation of each possible action.  
    * `methods` is an optional folder with the loading dynamic parameters' functions.  
    * `transport` is a folder with all the communication implementation.

[TODO: mattermost node doesn't follow the below best practices. Do we have an example that does?]

!!! note "Recommended sub-folders in the `actions` folder"
     In the `actions` folder, n8n recommends using `resources` and `operations` as the names of the sub-folders. For the implementation and description you can use separate files. Use `execute.ts` and `description.ts` as file names. This make browsing through the code a lot easier. You can simplify this for nodes that have a less complicated structure.

[TODO: keep in mind this one doc took you 50mins and is nowhere near done]