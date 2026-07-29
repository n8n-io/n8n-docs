---
contentType: explanation
nodeTitle: Choose node file structure
originalFilePath: integrations/creating-nodes/build/reference/node-file-structure.md
originalUrl: >-
  https://docs.n8n.io/integrations/creating-nodes/build/reference/node-file-structure
url: >-
  https://docs.n8n.io/connect/create-nodes/plan-your-node/choose-node-file-structure
layout:
  description:
    visible: false
---

# Node file structure <a href="#node-file-structure" id="node-file-structure"></a>

Following best practices and standards in your node structure makes your node easier to maintain. It's helpful if other people need to work with the code.

The file and directory structure of your node depends on:

* Your node's complexity.
* Whether you use node versioning.
* How many nodes you include in the npm package.

n8n recommends using the [`n8n-node` tool](../build-your-node/using-the-n8n-node-tool.md) to create the expected node file structure. You can customize the generated scaffolding as required to meet more complex needs.

## Required files and directories <a href="#required-files-and-directories" id="required-files-and-directories"></a>

Your node must include:

* A `package.json` file at the root of the project. Every npm module requires this.
* A `nodes` directory, containing the code for your node:
    * This directory must contain the [base file](../build-your-node/reference/base-files/README.md), in the format `<node-name>.node.ts`. For example, `MyNode.node.ts`.
    * n8n recommends including a [codex file](../build-your-node/reference/codex-files.md), containing metadata for your node. The codex filename must match the node base filename. For example, given a node base file named `MyNode.node.ts`, the codex name is `MyNode.node.json`.
    * The `nodes` directory can contain other files and subdirectories, including directories for versions, and node code split across more than one file to create a modular structure.
* A `credentials` directory, containing your credentials code. This code lives in a single [credentials file](../build-your-node/reference/credentials-files.md). The filename format is `<node-name>.credentials.ts`. For example, `MyNode.credentials.ts`.

## Modular structure <a href="#modular-structure" id="modular-structure"></a>


You can choose whether to place all your node's functionality in one file, or split it out into a base file and other modules, which the base file then imports. Unless your node is very simple, it's a best practice to split it out.


A basic pattern is to separate out operations. Refer to the [GithubIssues starter node](https://github.com/n8n-io/n8n-nodes-starter/tree/master/nodes/GithubIssues) for an example of this.

For more complex nodes, n8n recommends a directory structure. Refer to the [Airtable node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Airtable) or [Microsoft Outlook node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Microsoft/Outlook) as examples. 

* `actions`: a directory containing sub-directories that represent resources.
    * Each sub-directory should contain two types of files: 
      * An index file with resource description (named either `<resourceName>.resource.ts` or `index.ts`) 
      * Files for operations `<operationName>.operation.ts`. These files should have two exports: `description` of the operation and an `execute` function.
* `methods`: an optional directory dynamic parameters' functions.  
* `transport`: a directory containing the communication implementation.


## Versioning <a href="#versioning" id="versioning"></a>

If your node has more than one version, and you're using full versioning, this makes the file structure more complex. You need a directory for each version, along with a base file that sets the default version. Refer to [Node versioning](../build-your-node/reference/versioning.md) for more information on working with versions, including types of versioning.

## Decide how many nodes to include in a package <a href="#decide-how-many-nodes-to-include-in-a-package" id="decide-how-many-nodes-to-include-in-a-package"></a>

There are two possible setups when building a node:

* One node in one npm package.
* More than one node in a single npm package.

n8n supports both approaches. If you include more than one node, each node should have its own directory in the `nodes` directory.

## A best-practice example for programmatic nodes <a href="#a-best-practice-example-for-programmatic-nodes" id="a-best-practice-example-for-programmatic-nodes"></a>

n8n's built-in [Airtable node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Airtable) implements a modular structure and versioning, following recommended patterns.


