---
contentType: howto
---

# n8n node linter

n8n's node linter, [`@n8n/eslint-plugin-community-nodes`](https://github.com/n8n-io/n8n/tree/master/packages/%40n8n/eslint-plugin-community-nodes), statically analyzes ("lints") the source code of n8n nodes and credentials in community packages. The linter detects issues and automatically fixes them to help you follow best practices.

`@n8n/eslint-plugin-community-nodes` contains a [collection of rules](https://github.com/n8n-io/n8n/tree/master/packages/%40n8n/eslint-plugin-community-nodes#rules) for node files (`*.node.ts`), credential files (`*.credentials.ts`), and the `package.json` of a community package.

## Setup

If using the [n8n node starter](https://github.com/n8n-io/n8n-nodes-starter): Run `npm install` in the starter project to install all dependencies. Once the installation finishes, the linter is available to you.

If using VS Code, install the [ESLint VS Code extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). For other IDEs, refer to their ESLint integrations.

/// note | Don't edit the configuration file
[`eslint.config.mjs`](https://github.com/n8n-io/n8n-nodes-starter/blob/master/eslint.config.mjs) contains the ESLint configuration provided by [`@n8n/node-cli`](https://www.npmjs.com/package/@n8n/node-cli). Don't edit this file.
///

## Usage

You can use the linter in a community package or in the main n8n repository.

### Linting

In a community package, the linter runs automatically after installing dependencies and before publishing the package to npm. In the [main n8n repository](https://github.com/n8n-io/n8n), the linter runs automatically using GitHub Actions whenever you push to your pull request.

In both cases, VS Code lints in the background as you work on your project. Hover over a detected issue to see a full description of the linting and a link to further information.

You can also run the linter manually:

* Run `npm run lint` to lint and view detected issues in your console.
* Run `npm run lint:fix` to lint and automatically fix issues. The linter fixes violations of rules [marked as automatically fixable](https://github.com/n8n-io/n8n/tree/master/packages/%40n8n/eslint-plugin-community-nodes#rules).

Both commands can run in the root directory of your community package, or in `/packages/nodes-base/` in the main repository.

### Exceptions

Instead of fixing a rule violation, you can also make an exception for it, so the linter doesn't flag it.

To make a lint exception from VS Code: hover over the issue and click on `Quick fix` (or `cmd+.` in macOS) and select **Disable {rule} for this line**. Only disable rules for a line where you have good reason to. If you think the linter is incorrectly reporting an issue, please [report it in the n8n repository](https://github.com/n8n-io/n8n/issues).

To add a lint exception to a single file, add a code comment. Refer to the [ESLint documentation](https://eslint.org/docs/latest/use/configure/rules#disabling-rules) for more guidance.
