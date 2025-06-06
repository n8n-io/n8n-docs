---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: reference
---

# Community node verification guidelines

/// note | Do you want n8n to verify your node?
Consider following these guidelines while building your node if you want to submit it for verification by n8n. Any user with verified community nodes enabled can discover and install verified nodes from n8n's nodes panel across all deployment types (self-hosted and n8n Cloud).
///

## Package source verification

* Verify that your npm package repository URL matches the expected GitHub (or other platform) repository.
* Confirm that the package author / maintainer matches between npm and the repository.
* Confirm that the git link in npm works and that the repository is public.
* Make sure your package has proper documentation (README, usage examples, etc.).
* Make sure your package license is MIT.

## No external dependencies

* Ensure that your package does **not** include any external dependencies to keep it lightweight and easy to maintain.

## Proper documentation

* Provide clear documentation, whether it’s a **README** on GitHub or links to relevant **API documentation**.
* Include usage instructions, example workflows, and any necessary authentication details.

## No access to environment variables or file system

* The code **must not** interact with environment variables or attempt to read/write files.
* Pass all necessary data through node parameters.

## Follow n8n best practices

* Maintain a clear and consistent coding style.
* Use **TypeScript** and follow n8n's [**node development guidelines**](/integrations/creating-nodes/overview.md).
* Ensure proper error handling and validation.
* Make sure the linter passes (in other words, make sure running `npx @n8n/scan-community-package n8n-nodes-PACKAGE` passes).
