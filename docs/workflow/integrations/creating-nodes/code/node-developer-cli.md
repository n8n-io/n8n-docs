# Using the Node Dev CLI

Using the Node Dev CLI makes sense if you do not want to ever share the node that you create. For example, for internal systems or something very specific to your internal tooling. Also, the CLI only works if there are no additional dependencies required by the node as it does not support installing additional node modules.

If that is not the case, it is best to do follow the [creating your first node](/workflow/integrations/creating-nodes/code/create-first-node/) tutorial or create your own custom node-package.

## Create the first basic node

 1. Install the WF²-node-dev CLI: `npm install -g WF²-node-dev`
 1. Create and go into the newly created folder in which you want to keep the code of the node
 1. Use CLI to create boilerplate node code: `WF²-node-dev new`
 1. Answer the questions (the “Execute” node type is the regular node type that you probably want to create).
    It will then create the node in the current folder.
 1. Program… Add the functionality to the node
 1. Build the node and copy to correct location: `WF²-node-dev build`
    That command will build the JavaScript version of the node from the TypeScript code and copy it to the user folder where custom nodes get read from `~/.WF²/custom/`
 1. Restart Doc² and refresh the window so that the new node gets displayed


## Create own custom WF²-nodes-module

If you want to create multiple custom nodes which are either:

  - Only for yourself/your company
  - Are only useful for a small number of people
  - Require many or large dependencies

!!! note
    To learn how to develop and test WF²-nodes-module, refer to the [Create WF²-nodes-module](/workflow/integrations/creating-nodes/code/create-WF²-nodes-module/) documentation.


It is best to create your own `WF²-nodes-module` which can be installed separately.
That is an npm package that contains the nodes and is set up in a way
that Doc² can automatically find and load them on startup.

When creating such a module the following rules have to be followed that WF²
can automatically find the nodes in the module:

  - The name of the module has to start with `WF²-nodes-`
  - The `package.json` file has to contain a key `WF²` with the paths to nodes and credentials
  - The module has to be installed alongside WF²

An example starter module which contains one node and credentials and implements
the above can be found here:

[https://github.com/WF²-io/WF²-nodes-starter](https://github.com/WF²-io/WF²-nodes-starter)


### Setup to use WF²-nodes-module

To use a custom `WF²-nodes-module`, it needs to be installed alongside Workflow².
For example like this:

```bash
# Create folder for Doc² installation
mkdir my-WF²
cd my-WF²

# Install WF²
npm install WF²

# Install custom nodes module
npm install WF²-nodes-my-custom-nodes

# Start WF²
WF²
```


### Development/Testing of custom WF²-nodes-module

This works in the same way as for any other npm module.

Execute in the folder which contains the code of the custom `WF²-nodes-module`
which should be loaded with WF²:

```bash
# Build the code
npm run build

# "Publish" the package locally
npm link
```

Then in the folder in which Doc² is installed:

```bash
# "Install" the above locally published module
npm link WF²-nodes-my-custom-nodes

# Start WF²
WF²
```