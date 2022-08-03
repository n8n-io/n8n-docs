# Node file structure

Following best practices and standards in your node structure makes your node easier to maintain. It's helpful if other people need to work with the code.

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

For more complex nodes, n8n recommends the following structure:

  * `actions`: directory with description and implementation of each possible resource and operation.
    * In the `actions` folder, n8n recommends using `resources` and `operations` as the names of the sub-folders. 
    * For the implementation and description you can use separate files. Use `execute.ts` and `description.ts` as filenames. This makes browsing through the code a lot easier. You can simplify this for nodes that have a less complicated structure.
  * `methods`: an optional directory dynamic parameters' functions.  
  * `transport`: a directory containing the communication implementation.


## Versioning

If your node has more than one version, and you're using full versioning, this makes the file structure more complex. You need a directory for each version, along with a base file that sets the default version. Refer to [Node versioning](/integrations/creating-nodes/build/reference/node-versioning/) for more information on working with versions, including types of versioning.

## A best-practice example: The Mattermost node

n8n's built-in [Mattermost node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Mattermost){:target=_blank .external-class} implements a modular structure and versioning, following recommended patterns.


