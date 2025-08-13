/// note | Subject to change
The standards described in this document are for the first release of the community nodes repository. These may change in future releases.
///

Community nodes are npm packages, hosted in the npm registry.

When building a node to submit to the community node repository, use the following resources to make sure your node setup is correct:

* View the [starter node](https://github.com/n8n-io/n8n-nodes-starter) and [n8n's own nodes](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes) for some examples.
* Refer to the documentation on [building your own nodes](/integrations/creating-nodes/overview.md).
* Make sure your node follows the [standards](#standards) for community nodes.

## Standards

To make your node available to the n8n community node repository, you must:

* Make sure the package name starts with `n8n-nodes-` or `@<scope>/n8n-nodes-`. For example, `n8n-nodes-weather` or `@weatherPlugins/n8n-nodes-weather`.
* Include `n8n-community-node-package` in your package keywords.
* Make sure that you add your nodes and credentials to the `package.json` file inside the `n8n` attribute. Refer to the [package.json in the starter node](https://github.com/n8n-io/n8n-nodes-starter/blob/master/package.json) for an example.
* Check your node using the [linter](/integrations/creating-nodes/test/node-linter.md) and test it locally to ensure it works.
* Submit the package to the npm registry. Refer to npm's documentation on [Contributing packages to the registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) for more information.

## Submit your node for verification by n8n

n8n vets verified community nodes. Users can discover and install verified community nodes from the nodes panel in n8n. These nodes need to adhere to certain technical and UX standards and constraints.

Before submitting your node for review by n8n, you must:

* Make sure that your node follows the [technical guidelines for verified community nodes](/integrations/creating-nodes/build/reference/verification-guidelines.md) and that all automated checks pass. Specifically, verified community nodes aren't allowed to use any run-time dependencies.
* Ensure that your node follows the [UX guidelines](/integrations/creating-nodes/build/reference/ux-guidelines.md).
* Make sure that the node has appropriate documentation in the form of a README in the [npm package](https://docs.npmjs.com/about-package-readme-files) or a related public repository.
* Submit your node to npm as n8n will fetch it from there for final vetting.

If your node meets all the above requirements, [click here to submit your node for verification](https://internal.users.n8n.cloud/form/f0ff9304-f34a-420e-99da-6103a2f8ac5b). Note that n8n reserves the right to reject nodes that compete with any of n8n's paid features, especially enterprise functionality.
