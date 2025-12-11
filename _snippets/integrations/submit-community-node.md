Community nodes are npm packages, hosted in the npm registry.

When building a node to submit to the community node repository, use the following resources to make sure your node setup is correct:

* n8n recommends using the [`n8n-node` CLI tool](/integrations/creating-nodes/build/n8n-node.md) to build and test your node. In particular, this is important if you plan on [submitting your node for verification](/integrations/creating-nodes/deploy/submit-community-nodes.md#submit-your-node-for-verification-by-n8n). This ensures that your node has the correct structure and follows community node requirements. It also simplifies linting and testing.
* View [n8n's own nodes](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes) for examples of patterns you can use in your nodes.
* Refer to the documentation on [building your own nodes](/integrations/creating-nodes/overview.md).
* Make sure your node follows the [standards](#standards) for community nodes.

## Standards

Developing with the [`n8n-node` tool](/integrations/creating-nodes/build/n8n-node.md) ensures that your node adheres to the following standards required to make your node available in the n8n community node repository:

* Make sure the package name starts with `n8n-nodes-` or `@<scope>/n8n-nodes-`. For example, `n8n-nodes-weather` or `@weatherPlugins/n8n-nodes-weather`.
* Include `n8n-community-node-package` in your package keywords.
* Make sure that you add your nodes and credentials to the `package.json` file inside the `n8n` attribute.
* Check your node using the linter (`npm run lint`) and test it locally (`npm run dev`) to ensure it works.
* Submit the package to the npm registry. Refer to npm's documentation on [Contributing packages to the registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) for more information.

## Submit your node for verification by n8n

n8n vets verified community nodes. Users can discover and install verified community nodes from the nodes panel in n8n. These nodes need to adhere to certain technical and UX standards and constraints.

Before submitting your node for review by n8n, you must:

* Start from the [`n8n-node` tool](/integrations/creating-nodes/build/n8n-node.md) generated scaffolding. While this isn't strictly required, n8n strongly suggests using the `n8n-node` CLI tool for any community node you plan to submit for verification. Using the tool ensures that your node follows the expected conventions and adheres to the community node requirements.
* Make sure that your node follows the [technical guidelines for verified community nodes](/integrations/creating-nodes/build/reference/verification-guidelines.md) and that all automated checks pass. Specifically, verified community nodes aren't allowed to use any run-time dependencies.
* Ensure that your node follows the [UX guidelines](/integrations/creating-nodes/build/reference/ux-guidelines.md).
* Make sure that the node has appropriate documentation in the form of a README in the [npm package](https://docs.npmjs.com/about-package-readme-files) or a related public repository.
* Submit your node to npm as n8n will fetch it from there for final vetting.

## Ready to submit?
If your node meets all the above requirements, sign up or log in to the [n8n Creator Portal](https://creators.n8n.io/nodes) and submit your node for verification. Note that n8n reserves the right to reject nodes that compete with any of n8n's paid features, especially enterprise functionality.
