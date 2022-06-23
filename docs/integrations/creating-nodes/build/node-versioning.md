# Node versioning

n8n supports node versioning. You can make changes to existing nodes without breaking the existing behavior by introducing a new version. As an example, refer to the [Mattermost node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Mattermost){:target=_blank .external-link}.

Node versioning summary:

- The main node file should extend `NodeVersionedType` instead of `INodeType`.
- The main node file should only contain a base description including the `defaultVersion` (usually the latest) and a list of versions.
- n8n recommends using `v1`, `v2`, and so on, for version folder names.
