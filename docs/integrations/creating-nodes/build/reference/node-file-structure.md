---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# Node file structure

Following best practices and standards in your node structure makes your node easier to maintain. It's helpful if other people need to work with the code.

The file and directory structure of your node depends on:

* Your node's complexity.
* Whether you use node versioning.
* How many nodes you include in the npm package.

## Required files and directories

Your node must include:

* A `package.json` file at the root of the project. This is required for any npm module.
* A `nodes` directory, containing the code for your node:
    * This directory must contain the [base file](/integrations/creating-nodes/build/reference/node-base-files/), in the format `<node-name>.node.ts`. For example, `MyNode.node.ts`.
    * n8n recommends including a [codex file](/integrations/creating-nodes/build/reference/node-codex-files/), containing metadata for your node. The codex filename must match the node base filename. For example, given a node base file named `MyNode.node.ts`, the codex name is `MyNode.node.json`.
    * The `nodes` directory can contain other files and subdirectories, including directories for versions, and node code split across more than one file to create a modular structure.
* A `credentials` directory, containing your credentials code. This code lives in a single [credentials file](/integrations/creating-nodes/build/reference/credentials-files/). The filename format is `<node-name>.credentials.ts`. For example, `MyNode.credentials.ts`.

## Modular structure
<!-- vale off -->
You can choose whether to place all your node's functionality in one file, or split it out into a base file and other modules, which the base file then imports. Unless your node is very simple, it's a best practice to split it out.
<!-- vale on -->

A basic pattern is to separate out operations. Refer to the [HttpBin starter node](https://github.com/n8n-io/n8n-nodes-starter/tree/master/nodes/HttpBin){:target=_blank .external-link} for an example of this.

For more complex nodes, n8n recommends a directory structure. Refer to the [Airtable node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Airtable){:target=_blank .external-class} or [Microsoft Outlook node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Microsoft/Outlook){:target=_blank .external-link} as examples. 

  * `actions`: a directory containing sub-directories that represent resources.
    * Each sub-directory should contain two types of files: 
      * An index file with resource description (named either `<resourceName>.resource.ts` or `index.ts`) 
      * Files for operations `<operationName>.operation.ts`. These files should have two exports: `description` of the operation and an `execute` function.
  * `methods`: an optional directory dynamic parameters' functions.  
  * `transport`: a directory containing the communication implementation.


## Versioning

If your node has more than one version, and you're using full versioning, this makes the file structure more complex. You need a directory for each version, along with a base file that sets the default version. Refer to [Node versioning](/integrations/creating-nodes/build/reference/node-versioning/) for more information on working with versions, including types of versioning.

## Decide how many nodes to include in a package

There are two possible setups when building a node:

* One node in one npm package.
* More than one node in a single npm package.

n8n supports both approaches. If you include more than one node, each node should have its own directory in the `nodes` directory.

## A best-practice example for programmatic nodes

n8n's built-in [Airtable node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Airtable){:target=_blank .external-class} implements a modular structure and versioning, following recommended patterns.


