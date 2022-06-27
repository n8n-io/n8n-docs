# Node versioning

[TODO: decide if this should be in Plan or in Reference. Maybe split]

n8n supports node versioning. You can make changes to existing nodes without breaking the existing behavior by introducing a new version. 

!!! note "Versioning type restricted by node style"
    If you build a node using the declarative style, you can't use full versioning.

## Light versioning

This is available for all node types.

One node can contain more than one version, allowing small version increments without code duplication. To use this feature, change the `version` parameter in your node to an array, and add your version numbers, including your existing version. You can then access the version parameter with `@version` in your `displayOptions` (to control which version n8n displays). You can also query the version in your `execute` function using `const nodeVersion = this.getNode().typeVersion;`.

## Full versioning

This isn't available for declarative-style nodes.

As an example, refer to the [Mattermost node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Mattermost){:target=_blank .external-link}.

Node versioning summary:

- The base node file should extend `NodeVersionedType` instead of `INodeType`.
- The base node file should contain a description including the `defaultVersion` (usually the latest) and a list of versions. It shouldn't contain anything else.
- n8n recommends using `v1`, `v2`, and so on, for version folder names.

[TODO: add more info on how node versioning will affect end users and encourage good versioning]
