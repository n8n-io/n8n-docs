# Submit your node to the community node repository

!!! note "Subject to change"
    The standards described in this document are for the first release of the community nodes repository. These may change in future releases.

Community nodes are npm packages, hosted in the npm registry.

When building a node to submit to the community node repository, use the following resources to make sure your node setup is correct:

* View the [starter node](https://github.com/n8n-io/n8n-nodes-starter).
* Refer to the documentation on [building your own nodes](/integrations/creating-nodes/).
* Make sure your node follows the [standards](#standards) for community nodes.

## Standards

To make your node available to the n8n community node repository, you must:

* Make sure the package name starts with `n8n-node-` or `@<scope>/n8n-node-`. For example, `n8n-node-weather` or `@weatherPlugins/n8n-node-weather`.
* Tag your package with `n8n-community-node-package`.
* Submit the package to the npm registry. Refer to npm's documentation on [Contributing packages to the registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry){:target=_blank .external-link} for more information.
* Make sure that you add your nodes and credentials to the `package.json` file inside the `n8n` attribute. Refer to the [package.json in the starter node](https://github.com/n8n-io/n8n-nodes-starter/blob/master/package.json) for an example.

## Migrating pull requests to npm packages

If you have submitted a pull request to n8n with a new node, you may need to release it as a community node instead.

1. Clone the [starter repository](https://github.com/n8n-io/n8n-nodes-starter).
2. Replace the example nodes and credentials with your own
3. Update the `package.json` file to reflect your changes.
4. Publish the package to npm.
