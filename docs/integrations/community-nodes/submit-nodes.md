# Submit your node to the community node repository

!!! note "Subject to change"
    The standards described in this document are for the first release of the community nodes repository. These may change in future releases.

Community nodes are npm packages, hosted in the npm registry.

To make your node available to the n8n community node repository, you must:

* Make sure the package name starts with `n8n-node-` or `@<scope>/n8n-node-`. For example, `n8n-node-weather` or `@weatherPlugins/n8n-node-weather`.
* Tag your package with `n8n-community-node-package`.
* Submit the package to the npm registry. Refer to npm's documentation on [Contributing packages to the registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry){:target=_blank .external-link} for more information.