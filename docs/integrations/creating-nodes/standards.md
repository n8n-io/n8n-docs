# Standards

Following these guidelines helps make sure your node works. It also improves the user experience by ensuring consistency between nodes.

## General guidelines

These guidelines apply to any node you build.

### Reuse internal parameter names

All resource and operation fields in an n8n node have two settings: a display name, set using the `name` parameter, and an internal name, set using the `value` parameter. Reusing the internal name for fields allows n8n to preserve user-entered data if a user switches operations. 

For example: you're building a node with a resource named 'Order'. This resource has several operations, including Get, Edit, and Delete. Each of these operations uses an order ID to perform the operation on the specified order. You need to display an ID field for the user. This field has a display label, and an internal name. By using the same internal name (set in `value`) for the operation ID field on each resource, a user can enter the ID with the Get operation selected, and not lose it if they switch to Edit.

When reusing the internal name, you must ensure that only one field is visible to the user at a time. You can control this using `displayOptions`.

### Create an 'Additional Fields' parameter

Some nodes have a lot of options. Add important ones to the top level. For all others, create an 'Additional Fields' parameter where users can set them if needed. This ensures that the interface stays clean and reduces user confusion. A good example of that would be the XML node.

### Follow existing parameter naming guideline

If your node can perform several operations, call the parameter that sets the operation `Operation`. If your node can do these operations on more than one resource, create a `Resource` parameter. The following code sample shows a basic resource and operations setup:

```js
export const ExampleNode implements INodeType {
    description: {
        displayName: 'Example Node',
        ...
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
                    {
                        name: 'Resource One',
                        value: 'resourceOne'
                    },
                    {
                        name: 'Resource Two',
                        value: 'resourceTwo'
                    }
                ],
                default: 'resourceOne'
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                // Only show these operations for Resource One
                displayOptions: {
                    show: {
                        resource: [
                            'resourceOne'
                        ]
                    }
                },
                options: [
                    {
                        name: 'Create',
                        value: 'create',
                        description: 'Create an instance of Resource One'
                    }
                ]
            }
        ]
    }
}
```

### Node icons

Check existing node icons as a reference when you create your own. The icon resolution should be 60x60px if using PNG. You can also embed an SVG. 

!!! note "Don't reference Font Awesome"
    If you want to use a Font Awesome icon in your node, download and embed the image.

### Node versions

n8n supports node versioning. You can make changes to existing nodes without breaking the existing behavior by introducing a new version. As an example, refer to the [Mattermost node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Mattermost){:target=_blank .external-link}.

Node versioning summary:

- The main node file should extend `NodeVersionedType` instead of `INodeType`.
- The main node file should only contain a base description including the `defaultVersion` (usually the latest) and a list of versions.
- n8n recommends using `v1`, `v2`, and so on for version folder names.
- Code separation:  
    * `actions` folder with description and implementation of each possible action.  
    * `methods` is an optional folder with the loading dynamic parameters' functions.  
    * `transport` is a folder with all the communication implementation.

!!! note "Recommended sub-folders in the `actions` folder"
     In the `actions` folder, n8n recommends using `resources` and `operations` as the names of the sub-folders. For the implementation and description you can use separate files. Use `execute.ts` and `description.ts` as file names. This make browsing through the code a lot easier. You can simplify this for nodes that have a less complicated structure.


## Guidelines for the programmatic style

These guidelines apply when building nodes using the programmatic node-building style. They aren't relevant when using the declarative style. For more information on different node-building styles, refer to [Choose your node building approach](/integrations/creating-nodes/choose-node-method/){:target=_blank}.

### Don't change incoming data

Never change the incoming data a node receives (data accessible with `this.getInputData()`) as all nodes share it. If you need to add, change, or delete data, clone the incoming data and return the new data. If you don't do this, sibling nodes that execute after the current one will operate on the altered data and process incorrect data.

It's not necessary to always clone all the data. For example, if a node changes the binary data but not the JSON data, you can create a new item that reuses the reference to the JSON item.

You can see an example in the code of the [ReadBinaryFile-Node](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/ReadBinaryFile.node.ts#L69-L83){:target=_blank .external-link}.


### Write nodes in TypeScript

All n8n code is TypeScript. Writing your nodes in TypeScript can speed up development and reduce bugs.

### Use the built in request library

Some third-party services have their own libraries on npm, which make it easier to create an integration. The problem with these packages is that you add another dependency (plus all the dependencies of the dependencies). This adds more and more code, which has to be loaded, can introduce security vulnerabilities, bugs, and so on. Instead, use the built-in module:

```typescript
const response = await this.helpers.httpRequest(options);
```

This uses the npm package [`request-promise-native`](https://github.com/request/request-promise-native){:target=_blank .external-link}, which is the basic npm `request` module but with promises. For a full set of options refer to [the underlying `request` options documentation](https://github.com/request/request#requestoptions-callback){:target=_blank .external-link}.

Refer to [HTTP helpers](/integrations/creating-nodes/code/http-helpers/){:target=_blank} for documentation and migration instructions for the deprecated `this.helpers.request`.