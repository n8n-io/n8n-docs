---
title: submit-community-node
---
Community nodes are npm packages, hosted in the npm registry.

When building a node to submit to the community node repository, use the following resources to make sure your node setup is correct:

* n8n recommends using the [`n8n-node` CLI tool](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/build-your-node/using-the-n8n-node-tool) to build and test your node. In particular, this is important if you plan on [submitting your node for verification](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/deploy-your-node/submit-community-nodes#submit-your-node-for-verification-by-n8n). This ensures that your node has the correct structure and follows community node requirements. It also simplifies linting and testing.
* View [n8n's own nodes](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes) for examples of patterns you can use in your nodes.
* Refer to the documentation on [building your own nodes](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/overview).
* Make sure your node follows the [standards](#standards) for community nodes.

## Standards <a href="#standards" id="standards"></a>

Developing with the [`n8n-node` tool](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/build-your-node/using-the-n8n-node-tool) ensures that your node adheres to the following standards required to make your node available in the n8n community node repository:

* Make sure the package name starts with `n8n-nodes-` or `@<scope>/n8n-nodes-`. For example, `n8n-nodes-weather` or `@weatherPlugins/n8n-nodes-weather`.
* Include `n8n-community-node-package` in your package keywords.
* Make sure that you add your nodes and credentials to the `package.json` file inside the `n8n` attribute.
* Check your node using the linter (`npm run lint`) and test it locally (`npm run dev`) to ensure it works.
* Publish the package to npm. If you plan to submit your node for verification through the [n8n Creator Portal](https://creators.n8n.io/nodes), you must publish using a GitHub Actions workflow with a [provenance statement](https://docs.npmjs.com/generating-provenance-statements). See [Publishing to npm](#publishing-to-npm) below.

## Publishing to npm <a href="#publishing-to-npm" id="publishing-to-npm"></a>

{% hint style="info" %}
**Required for Creator Portal verification**

From May 1st 2026, nodes submitted for verification must be published using GitHub Actions with a [provenance statement](https://docs.npmjs.com/generating-provenance-statements). n8n won't accept verified nodes published directly from a local machine.
{% endhint %}

To submit your node for verification through the n8n Creator Portal, publish using a GitHub Actions workflow with a provenance statement. Provenance lets anyone cryptographically verify that a specific workflow built the package, from a specific repository and commit. GitHub Actions signs the provenance statement using its OIDC infrastructure.

### New nodes <a href="#new-nodes" id="new-nodes"></a>

If you scaffold your node with `npm create @n8n/node`, the scaffolding includes a ready-to-use `publish.yml` workflow. Run `npm run release` locally to bump the version, commit, tag, and push. This triggers the workflow to publish to npm.

### Existing nodes <a href="#existing-nodes" id="existing-nodes"></a>

Add the [publish workflow from the n8n-nodes-starter](https://github.com/n8n-io/n8n-nodes-starter/blob/master/.github/workflows/publish.yml) to your repository at `.github/workflows/publish.yml`.

Also make sure your project has `@n8n/node-cli` version `0.23.0` or later as a `devDependency`, as earlier versions don't support the provenance flag used by the workflow:

```sh
npm list @n8n/node-cli
```

### One-time setup <a href="#one-time-setup" id="one-time-setup"></a>

Configure npm to trust your repository's GitHub Actions workflow so it can publish on your behalf. No long-lived token required:

1. Log in to [npmjs.com](https://www.npmjs.com/) and open your package's settings.
2. Under **Publish access > Trusted Publishers**, click **Add a publisher**.
3. Select **GitHub Actions** and fill in:
   - **Repository owner**: your GitHub username or organisation
   - **Repository name**: your repository name
   - **Workflow name**: `publish.yml` (the filename, not the workflow `name:` field)

To use a token instead, create a Granular Access Token on npmjs.com and store it as `NPM_TOKEN` in your repository's Actions secrets. See the comments in the workflow file for details.

## Submit your node for verification by n8n <a href="#submit-your-node-for-verification-by-n8n" id="submit-your-node-for-verification-by-n8n"></a>

n8n vets verified community nodes. Users can discover and install verified community nodes from the nodes panel in n8n. These nodes need to adhere to certain technical and UX standards and constraints.

{% hint style="info" %}
**GitHub Actions publish required for verification**

From May 1st 2026, nodes submitted for verification through the [n8n Creator Portal](https://creators.n8n.io/nodes) must be published using GitHub Actions with a provenance statement. See [Publishing to npm](#publishing-to-npm) for setup instructions.
{% endhint %}

Before submitting your node for review by n8n, you must:

* Start from the [`n8n-node` tool](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/build-your-node/using-the-n8n-node-tool) generated scaffolding. While this isn't strictly required, n8n strongly suggests using the `n8n-node` CLI tool for any community node you plan to submit for verification. Using the tool ensures that your node follows the expected conventions and adheres to the community node requirements.
* Make sure that your node follows the [technical guidelines for verified community nodes](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/build-your-node/reference/verification-guidelines) and that all automated checks pass. Specifically, verified community nodes aren't allowed to use any run-time dependencies.
* Ensure that your node follows the [UX guidelines](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/build-your-node/reference/ux-guidelines).
* Make sure that the node has appropriate documentation in the form of a README in the [npm package](https://docs.npmjs.com/about-package-readme-files) or a related public repository.
* Publish your node to npm using a GitHub Actions workflow with provenance, as described in [Publishing to npm](#publishing-to-npm). n8n will fetch it from there for final vetting.

## Ready to submit? <a href="#ready-to-submit" id="ready-to-submit"></a>
If your node meets all the above requirements, sign up or log in to the [n8n Creator Portal](https://creators.n8n.io/nodes) and submit your node for verification. Note that n8n reserves the right to reject nodes that compete with any of n8n's paid features, especially enterprise functionality.
