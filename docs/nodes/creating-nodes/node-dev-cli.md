# Using the Node Dev CLI

Using the Node Dev CLI makes sense if you do not want to ever share the node that you create. For example, for internal systems or something very specific to your internal tooling. Also, the CLI only works if there are no additional dependencies required by the node as it does not support installing additional node modules.

If that is not the case, it is best to do follow the [creating your first node](create-node.md) tutorial or create your own custom node-package.

## Create the first basic node

 1. Install the n8n-node-dev CLI: `npm install -g n8n-node-dev`
 1. Create and go into the newly created folder in which you want to keep the code of the node
 1. Use CLI to create boilerplate node code: `n8n-node-dev new`
 1. Answer the questions (the “Execute” node type is the regular node type that you probably want to create).
    It will then create the node in the current folder.
 1. Program… Add the functionality to the node
 1. Build the node and copy to correct location: `n8n-node-dev build`
    That command will build the JavaScript version of the node from the TypeScript code and copy it to the user folder where custom nodes get read from `~/.n8n/custom/`
 1. Restart n8n and refresh the window so that the new node gets displayed


## Create own custom n8n-nodes-module

If you want to create multiple custom nodes which are either:

  - Only for yourself/your company
  - Are only useful for a small number of people
  - Require many or large dependencies

It is best to create your own `n8n-nodes-module` which can be installed separately.
That is an npm package that contains the nodes and is set up in a way
that n8n can automatically find and load them on startup.

When creating such a module the following rules have to be followed that n8n
can automatically find the nodes in the module:

  - The name of the module has to start with `n8n-nodes-`
  - The `package.json` file has to contain a key `n8n` with the paths to nodes and credentials
  - The module has to be installed alongside n8n

An example starter module which contains one node and credentials and implements
the above can be found here:

[https://github.com/n8n-io/n8n-nodes-starter](https://github.com/n8n-io/n8n-nodes-starter)


### Setup to use n8n-nodes-module

To use a custom `n8n-nodes-module`, it needs to be installed alongside n8n.
For example like this:

```bash
# Create folder for n8n installation
mkdir my-n8n
cd my-n8n

# Install n8n
npm install n8n

# Install custom nodes module
npm install n8n-nodes-my-custom-nodes

# Start n8n
n8n
```


### Development/Testing of custom n8n-nodes-module

This works in the same way as for any other npm module.

Execute in the folder which contains the code of the custom `n8n-nodes-module`
which should be loaded with n8n:

```bash
# Build the code
npm run build

# "Publish" the package locally
npm link
```

Then in the folder in which n8n is installed:

```bash
# "Install" the above locally published module
npm link n8n-nodes-my-custom-nodes

# Start n8n
n8n
```
