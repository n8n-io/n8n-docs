---
contentType: overview
nodeTitle: Reference
originalFilePath: integrations/creating-nodes/build/reference/index.md
originalUrl: 'https://docs.n8n.io/integrations/creating-nodes/build/reference'
url: 'https://docs.n8n.io/connect/create-nodes/build-your-node/reference'
layout:
  description:
    visible: false
---

# Node building reference <a href="#node-building-reference" id="node-building-reference"></a>

This section contains reference information, including details about node UI elements, key parameters in your node's base and credentials files, and the guidelines for submitting your node for [verification by n8n](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/community-nodes/installation-and-management/install-verified-community-nodes).

## In this section

* [Node UI elements](node-ui-elements.md): the predefined UI components available for your node's parameters.
* [Code standards](code-standards.md): good code practices for node building.
* [Error handling](error-handling.md): the error classes n8n provides for node implementations.
* [Versioning](versioning.md): make changes to an existing node without breaking its current behavior.
* [Base files](base-files/README.md): the core code of your node, for declarative and programmatic styles.
* [Codex files](codex-files.md): the JSON file that holds your node's metadata.
* [Credentials files](credentials-files.md): define the authorization methods for your node.
* [HTTP request helpers](http-request-helpers.md): make HTTP requests from your node.
* [Item linking](item-linking.md): link output items back to the items that generated them.
* [UX guidelines](ux-guidelines.md): the UI conventions a verified community node must follow.
* [Verification guidelines](verification-guidelines.md): the requirements for n8n to verify your community node.

## Related resources

* [Build your node](../)
* [Set up your development environment](../set-up-your-development-environment.md)
* [Using the n8n-node tool](../using-the-n8n-node-tool.md)
* [Tutorial: Build a declarative-style node](../tutorial-build-a-declarative-style-node.md)
* [Tutorial: Build a programmatic-style node](../tutorial-build-a-programmatic-style-node.md)
