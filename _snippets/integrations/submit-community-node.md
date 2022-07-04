!!! note "Subject to change"
    The standards described in this document are for the first release of the community nodes repository. These may change in future releases.

Community nodes are npm packages, hosted in the npm registry.

When building a node to submit to the community node repository, use the following resources to make sure your node setup is correct:

* View the [starter node](https://github.com/n8n-io/n8n-nodes-starter){:target=_blank .external-link} and [n8n's own nodes](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes){:target=_blank .external-link} for some examples.
* Refer to the documentation on [building your own nodes](/integrations/creating-nodes/).
* Make sure your node follows the [standards](#standards) for community nodes.

## Standards

To make your node available to the n8n community node repository, you must:

* Make sure the package name starts with `n8n-nodes-` or `@<scope>/n8n-nodes-`. For example, `n8n-nodes-weather` or `@weatherPlugins/n8n-nodes-weather`.
* Include `n8n-community-node-package` in your package keywords.
* Make sure that you add your nodes and credentials to the `package.json` file inside the `n8n` attribute. Refer to the [package.json in the starter node](https://github.com/n8n-io/n8n-nodes-starter/blob/master/package.json){:target=_blank .external-link} for an example.
* Submit the package to the npm registry. Refer to npm's documentation on [Contributing packages to the registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry){:target=_blank .external-link} for more information.

