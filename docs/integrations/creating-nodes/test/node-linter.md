---
contentType: howto
---

# n8n node linter

n8n's node linter, [`eslint-plugin-n8n-nodes-base`](https://github.com/ivov/eslint-plugin-n8n-nodes-base), statically analyzes ("lints") the source code of n8n nodes and credentials in the official repository and in community packages. The linter detects issues and automatically fixes them to help you follow best practices.

`eslint-plugin-n8n-nodes-base` contains a [collection of rules](https://github.com/ivov/eslint-plugin-n8n-nodes-base#ruleset) for node files (`*.node.ts`), resource description files (`*Description.ts`), credential files (`*.credentials.ts`), and the `package.json` of a community package.

## Setup

If using the [n8n node starter](https://github.com/n8n-io/n8n-nodes-starter): Run `npm install` in the starter project to install all dependencies. Once the installation finishes, the linter is available to you. 

If using VS Code, install the [ESLint VS Code extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). For other IDEs, refer to their ESLint integrations.

/// note | Don't edit the configuration file
[`.eslintrc.js`](https://github.com/n8n-io/n8n-nodes-starter/blob/master/.eslintrc.js) contains the configuration for `eslint-plugin-n8n-nodes-base`. Don't edit this file.
///

## Usage

You can use the linter in a community package or in the main n8n repository.

### Linting

In a community package, the linter runs automatically after installing dependencies and before publishing the package to npm. In the [main n8n repository](https://github.com/n8n-io/n8n), the linter runs automatically using GitHub Actions whenever you push to your pull request.

In both cases, VS Code lints in the background as you work on your project. Hover over a detected issue to see a full description of the linting and a link to further information.

You can also run the linter manually:

* Run `npm run lint` to lint and view detected issues in your console. 
* Run `npm run lintfix` to lint and automatically fix issues. The linter fixes violations of rules [marked as automatically fixable](https://github.com/ivov/eslint-plugin-n8n-nodes-base#ruleset).

Both commands can run in the root directory of your community package, or in `/packages/nodes-base/` in the main repository.

### Exceptions

Instead of fixing a rule violation, you can also make an exception for it, so the linter doesn't flag it.

To make a lint exception from VS Code: hover over the issue and click on `Quick fix` (or `cmd+.` in macOS) and select **Disable {rule} for this line**. Only disable rules for a line where you have good reason to. If you think the linter is incorrectly reporting an issue, please [report it in the linter repository](https://github.com/ivov/eslint-plugin-n8n-nodes-base/issues).

To add a lint exception to a single file, add a code comment. In particular, TSLint rules may not show up in VS Code and may need to be turned off using code comments. Refer to the [TSLint documentation](https://palantir.github.io/tslint/usage/rule-flags/) for more guidance.  
