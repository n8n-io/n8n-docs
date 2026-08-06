---
contentType: reference
nodeTitle: Verification guidelines
originalFilePath: integrations/creating-nodes/build/reference/verification-guidelines.md
originalUrl: >-
  https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines
url: >-
  https://docs.n8n.io/connect/create-nodes/build-your-node/reference/verification-guidelines
layout:
  description:
    visible: false
---

# Community node verification guidelines <a href="#community-node-verification-guidelines" id="community-node-verification-guidelines"></a>

{% hint style="info" %}
**Do you want n8n to verify your node?**

Follow these guidelines while building your node if you want to submit it for verification by n8n. Any user with verified community nodes enabled can discover and install verified nodes from n8n's nodes panel across all deployment types (self-hosted and n8n Cloud).
{% endhint %}


{% hint style="info" %}
**Upcoming Changes**

From May 1st 2026 you must publish **ALL** community nodes using a GitHub action and include a [provenance statement](https://docs.npmjs.com/generating-provenance-statements)
{% endhint %}

## Use the n8n-node tool <a href="#use-the-n8n-node-tool" id="use-the-n8n-node-tool"></a>

All verified community node authors should use the [`n8n-node` tool](../using-the-n8n-node-tool.md) to create and check their package. This helps n8n ensure quality and consistency by:

* Generating the expected package file structure
* Adding the required metadata and configuration to the `package.json` file
* Making it easy to lint your code against n8n's standards
* Allowing you to load your node in a local n8n instance for testing

## Node Types <a href="#node-types" id="node-types"></a>

* The node **MUST** not be an existing node, If your node is an iteration on an existing node create a pull request instead.
* n8n isn't accepting Logic or Flow control nodes at the moment.
* Each package should integrate exactly one third-party service. A trigger node for the same service may be included alongside the main node. Packages that wrap multiple unrelated APIs or act as a proxy layer for several services generally don't qualify for verification. Submit each service as its own separate package.

## Package source verification <a href="#package-source-verification" id="package-source-verification"></a>

* Verify that your npm package repository URL matches the expected GitHub repository.
* Confirm that the package author / maintainer matches between npm and the repository.
* Confirm that the git link in npm works and that the repository is public.
* Make sure your package has proper documentation (README, usage examples, etc.).
* Make sure your package license is MIT.
* Packages should be published from a GitHub action and include [provenance](https://docs.npmjs.com/generating-provenance-statements)

## No external dependencies <a href="#no-external-dependencies" id="no-external-dependencies"></a>

* Ensure that your package does **not** include any external dependencies to keep it lightweight and easy to maintain.

## Proper documentation <a href="#proper-documentation" id="proper-documentation"></a>

* Provide clear documentation, whether it’s a **README** on GitHub or links to relevant **API documentation**.
* Include usage instructions, example workflows, and any necessary authentication details.

## No access to environment variables or file system <a href="#no-access-to-environment-variables-or-file-system" id="no-access-to-environment-variables-or-file-system"></a>

* The code **must not** interact with environment variables or attempt to read/write files.
* Pass all necessary data through node parameters.

## Follow n8n best practices <a href="#follow-n8n-best-practices" id="follow-n8n-best-practices"></a>

* Maintain a clear and consistent coding style.
* Use **TypeScript** and follow n8n's [**node development guidelines**](../../overview.md).
* Ensure proper error handling and validation.
* Make sure the linter passes (in other words, make sure running `npx @n8n/scan-community-package n8n-nodes-PACKAGE` passes).

## Use English language only <a href="#use-english-language-only" id="use-english-language-only"></a>

* Both the node interface and all documentation must be in **English** only.
* This includes parameter names, descriptions, help text, error messages and **README** content.
