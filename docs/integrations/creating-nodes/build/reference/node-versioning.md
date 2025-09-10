---
contentType: howto
---

# Node versioning

n8n supports node versioning. You can make changes to existing nodes without breaking the existing behavior by introducing a new version.

Be aware of how n8n decides which node version to load:

* If a user builds and saves a workflow using version 1, n8n continues to use version 1 in that workflow, even if you create and publish a version 2 of the node.
* When a user creates a new workflow and browses for nodes, n8n always loads the latest version of the node.

/// note | Versioning type restricted by node style
If you build a node using the declarative style, you can't use full versioning.
///
## Light versioning

This is available for all node types.

One node can contain more than one version, allowing small version increments without code duplication. To use this feature: 

1. Change the main `version` parameter to an array, and add your version numbers, including your existing version. 
2. You can then access the version parameter with `@version` in your `displayOptions` in any object (to control which versions n8n displays the object with). You can also query the version from a function using `const nodeVersion = this.getNode().typeVersion;`.

As an example, say you want to add versioning to the NasaPics node from the [Declarative node tutorial](/integrations/creating-nodes/build/declarative-style-node.md), then configure a resource so that n8n only displays it in version 2 of the node. In your base `NasaPics.node.ts` file:

```js
{
    displayName: 'NASA Pics',
    name: 'NasaPics',
    icon: 'file:nasapics.svg',
    // List the available versions
    version: [1,2,3],
    // More basic parameters here
    properties: [
        // Add a resource that's only displayed for version2
        {
            displayName: 'Resource name',
            // More resource parameters
            displayOptions: {
                show: {
                    '@version': 2,
                },
            },
        },
    ],
}
```

## Full versioning

This isn't available for declarative-style nodes.

As an example, refer to the [Mattermost node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Mattermost).

Full versioning summary:

- The base node file should extend `NodeVersionedType` instead of `INodeType`.
- The base node file should contain a description including the `defaultVersion` (usually the latest), other basic node metadata such as name, and a list of versions. It shouldn't contain any node functionality.
- n8n recommends using `v1`, `v2`, and so on, for version folder names.


