# Submit your node to the community node repository

!!! note "Subject to change"
    The standards described in this document are for the first release of the community nodes repository. These may change in future releases.

Community nodes are npm packages, hosted in the npm registry.

## How to start

n8n provides an example of how your repository should look like when you submit it to npm. You can find our example repository [here](https://github.com/n8n-io/n8n-nodes-starter).

### Instructions

1) Browse the repository page above and check the documentation on how to customize and build your own nodes
2) Clone the repository locally
3) Open the `package.json` file and change it according to your data, changing the package name, author information, etc.
4) Upload your repository to your own Github account
5) Submit your package to npm according to the information below following the naming and keyword guidelines

### Important notes

To make your node available to the n8n community node repository, you must:

* Make sure the package name starts with `n8n-node-` or `@<scope>/n8n-node-`. For example, `n8n-node-weather` or `@weatherPlugins/n8n-node-weather`.
* Tag your package with `n8n-community-node-package`.
* Submit the package to the npm registry. Refer to npm's documentation on [Contributing packages to the registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry){:target=_blank .external-link} for more information.
* Make sure that you add your nodes and credentials to the `package.json` file inside the `n8n` attribute.

## Migrating Pull Requests to npm packages

If you have submitted a PR you may be requested to release it as a package instead.

In this case, you should follow the above processes, cloning the starter repository and replacing the existing nodes and credentials with your own, while also making sure that you update the `package.json` file to reflect those changes and publish it to npm.
