# Table of contents

* [Connect](README.md)
* [n8n API](n8n-api/README.md)
  * [Authentication](n8n-api/authentication.md)
  * [Pagination](n8n-api/pagination.md)
  * [Use an API playground](n8n-api/use-an-api-playground.md)
  * ```yaml
    props:
      models: true
      downloadLink: true
      grouping: by-tag
    type: builtin:openapi
    dependencies:
      spec:
        ref:
          kind: openapi
          spec: n8n
    ```
* [n8n CLI](n8n-cli.md)
* [Connect to n8n MCP server](connect-to-n8n-mcp-server.md)
  * [MCP server tools reference](connect-to-n8n-mcp-server/mcp-server-tools-reference.md)
* [Connect to the n8n docs MCP server](connect-to-n8n-docs-mcp-server.md)
* [Create nodes](create-nodes/README.md)
  * [Overview](create-nodes/overview.md)
  * [Plan your node](create-nodes/plan-your-node/README.md)
    * [Choose a node type](create-nodes/plan-your-node/choose-a-node-type.md)
    * [Choose a node building style](create-nodes/plan-your-node/choose-a-node-building-style.md)
    * [Node UI design](create-nodes/plan-your-node/node-ui-design.md)
    * [Choose node file structure](create-nodes/plan-your-node/choose-node-file-structure.md)
  * [Build your node](create-nodes/build-your-node/README.md)
    * [Set up your development environment](create-nodes/build-your-node/set-up-your-development-environment.md)
    * [Using the n8n-node tool](create-nodes/build-your-node/using-the-n8n-node-tool.md)
    * [Tutorial: Build a declarative-style node](create-nodes/build-your-node/tutorial-build-a-declarative-style-node.md)
    * [Tutorial: Build a programmatic-style node](create-nodes/build-your-node/tutorial-build-a-programmatic-style-node.md)
    * [Reference](create-nodes/build-your-node/reference/README.md)
      * [Node UI elements](create-nodes/build-your-node/reference/node-ui-elements.md)
      * [Code standards](create-nodes/build-your-node/reference/code-standards.md)
      * [Error handling](create-nodes/build-your-node/reference/error-handling.md)
      * [Versioning](create-nodes/build-your-node/reference/versioning.md)
      * [Base files](create-nodes/build-your-node/reference/base-files/README.md)
        * [Structure](create-nodes/build-your-node/reference/base-files/structure.md)
        * [Standard parameters](create-nodes/build-your-node/reference/base-files/standard-parameters.md)
        * [Declarative-style parameters](create-nodes/build-your-node/reference/base-files/declarative-style-parameters.md)
        * [Programmatic-style parameters](create-nodes/build-your-node/reference/base-files/programmatic-style-parameters.md)
        * [Programmatic-style execute method](create-nodes/build-your-node/reference/base-files/programmatic-style-execute-method.md)
      * [Codex files](create-nodes/build-your-node/reference/codex-files.md)
      * [Credentials files](create-nodes/build-your-node/reference/credentials-files.md)
      * [HTTP request helpers](create-nodes/build-your-node/reference/http-request-helpers.md)
      * [Item linking](create-nodes/build-your-node/reference/item-linking.md)
      * [UX guidelines](create-nodes/build-your-node/reference/ux-guidelines.md)
      * [Verification guidelines](create-nodes/build-your-node/reference/verification-guidelines.md)
  * [Test your node](create-nodes/test-your-node/README.md)
    * [Run your node locally](create-nodes/test-your-node/run-your-node-locally.md)
    * [Node linter](create-nodes/test-your-node/node-linter.md)
    * [Troubleshooting](create-nodes/test-your-node/troubleshooting.md)
  * [Deploy your node](create-nodes/deploy-your-node/README.md)
    * [Submit community nodes](create-nodes/deploy-your-node/submit-community-nodes.md)
    * [Install private nodes](create-nodes/deploy-your-node/install-private-nodes.md)
