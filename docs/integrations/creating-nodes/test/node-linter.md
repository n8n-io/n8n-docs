# `eslint-plugin-n8n-nodes-base`

[`eslint-plugin-n8n-nodes-base`](https://github.com/ivov/eslint-plugin-n8n-nodes-base) statically analyzes ("lints") the source code of n8n nodes and credentials in the official repository and in community packages. The linter helps to detect and autofix issues to help you follow best practices.

`eslint-plugin-n8n-nodes-base` contains a [collection of rules](https://github.com/ivov/eslint-plugin-n8n-nodes-base#ruleset) for node files (`*.node.ts`), resource description files (`*Description.ts`), credential files (`*.credentials.ts`), and the `package.json` of a community package.

## Setup

Run `npm install` in the starter project to install all dependencies. Once the installation finishes, the linter will be available to you. If using VSCode, install the [ESLint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). For other IDEs, refer to their ESLint integrations.

Be aware that `eslint-plugin-n8n-nodes-base` is configured in [`.eslintrc.js`](https://github.com/n8n-io/n8n-nodes-starter/blob/master/.eslintrc.js), but please do not edit this config file.

## Usage

### Linting

The linter runs automatically after installing dependencies and before publishing the package to npm.

VSCode also runs the linter in the background as you work on your project. Hover over a detected issue to see a full description of the linting and a link to further information.

To lint manually, run `npm run lint` to view all detected issues in your console. To lint and **autofix** manually, run `npm run lintfix`, so that violations of rules [marked as autofixable](https://github.com/ivov/eslint-plugin-n8n-nodes-base#ruleset) will be fixed for you.

### Exceptions

Instead of fixing a rule violation, you can also make an exception for it, so the linter does not flag it.

To make a lint exception, hover over the issue and click on `Quick fix` (or `cmd+.` in macOS) and select `Disable {rule} for this line`. Only except a line where you have good reason to. If you think the linter is misdetecting an issue, please [report it in the linter repo](https://github.com/ivov/eslint-plugin-n8n-nodes-base/issues).
