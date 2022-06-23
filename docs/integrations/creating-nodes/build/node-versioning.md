# Node versioning

n8n supports node versioning. You can make changes to existing nodes without breaking the existing behavior by introducing a new version. As an example, refer to the [Mattermost node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Mattermost){:target=_blank .external-link}.

Node versioning summary:

- The main node file should extend `NodeVersionedType` instead of `INodeType`.
- The main node file should only contain a base description including the `defaultVersion` (usually the latest) and a list of versions.
- n8n recommends using `v1`, `v2`, and so on, for version folder names.
- Code separation:  
    * `actions` folder with description and implementation of each possible action.  
    * `methods` is an optional folder with the loading dynamic parameters' functions.  
    * `transport` is a folder with all the communication implementation.

!!! note "Recommended sub-folders in the `actions` folder"
     In the `actions` folder, n8n recommends using `resources` and `operations` as the names of the sub-folders. For the implementation and description you can use separate files. Use `execute.ts` and `description.ts` as file names. This make browsing through the code a lot easier. You can simplify this for nodes that have a less complicated structure.