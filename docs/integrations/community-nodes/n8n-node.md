---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Using n8n-node tool

The `n8n-node` tool is the official CLI for developing community nodes for n8n. You can use it to scaffold out new nodes, build your projects, and run your node as you develop it.

Using `n8n-node`, you can create nodes that adhere to the 

## Prerequisites

Before you can use the `n8n-node` tool, you must [install n8n locally with `npm`](hosting/installation/npm.md). The `n8n-node` tool runs the local n8n instance with your community node loaded to provide live previews.

## Get n8n-node

### Run n8n-node without installing

You can run `n8n-node` directly without installing with `npx`.

For example, to run the `n8n-node new` command, you can type:

```shell
npx n8n-node new
```

To follow along with the rest of the page, prepend `npx` in front of each `n8n-node` command.

### Install n8n-node globally

You can install `n8n-node` globally with `npm`:

```shell
npm install --global @n8n/node-cli
```

Verify access to the command by typing:

```shell
n8n-node --version
```

## Command overview

The `n8n-node` tool provides the following commands:

### new

The `new` command creates the file system structure and metadata for a new node.

When called, it interactively prompts for details about your project to customize your starting code. You'll provide the project name, choose a type of node to build, and select the starting template that best matches your needs.

The `n8n-node` tool will create your project file structure and optionally install your initial project dependencies. Learn more about how to use the `new` command in the [creating a new node section](#creating-a-new-node).

### build

The `build` command compiles your node and copies all of the required assets.

### dev

The `dev` command runs n8n with your node. It monitors your project directory and automatically rebuilds the live preview when it detects changes.

## Creating a new node

To create a new node with `n8n-node`, call `n8n-node new`. You can call this command entirely interactively or provide details on the command line.

The command will prompt for any missing information about your node and then generate a project structure to get you started. By default, it will follow up by installing the initial project dependencies (you can disable this by passing the `--skip-install` flag).

### Setting node details interactively

When called without arguments, `n8n-node new` prompts you for details about your new node interactively:

```shell
n8n-node new
```

This will start an interactive prompt where you can define the details of your project:

* **What is your node called?** The name of your node. This impacts the name of your project directory, package name, and the n8n node itself. The name must use one of the following formats:
    * `n8n-nodes-<YOUR_NODE_NAME>`
    * `@<YOUR_ORG>/n8n-nodes-<YOUR_NODE_NAME>`
* **What kind of node are you building?** The [type of node](/integrations/creating-nodes/plan/choose-node-method.md) you want to build:
    * **HTTP API**: A low-code, declarative node structure that's designed for faster approval for n8n Cloud.
    * **Other**: A programmatic style node with full flexibility.
* **What template do you want to use?** When using the HTTP API, you can choose the template to start from:
    * **GitHub Issues API**: A demo node that includes multiple operations and credentials. This can help you get familiar with the node structure and conventions.
    * **Start from scratch**: A blank template that will guide you through your custom setup with some additional prompts.

When choosing HTTP API > Start from scratch, you'll be asked for the following:

* **What's the base URL of the API?** The root URL for the API you plan to integrate with.
* **What type of authentication does your API use?** What type of authentication your node should provide:
    * **API Key**: Send a secret key using headers, query parameters, or the request body.
    * **Bearer Token**: Send a token using the Authorization header (`Authorization: Bearer <token>`).
    * **OAuth2**: Use an OAuth 2.0 flow to get access tokens on behalf of a user or app.
    * **Basic Auth**: Send the base64-encoded username and password through Authorization headers.
    * **Custom**: Create your own credential logic. This will create an empty credential class that you can customize according to your needs.
    * **None**: No authentication necessary. Don't create a credential class for the node.

Once you've made your selections, `n8n-node` will create a new project directory for your node in the current directory. By default, it will also install the initial project dependencies (you can disable this by passing the `--skip-install` flag).

### Providing node details on the command line

You can provide some of your node details on the command line to avoid prompts.

You can include the name you want to use for your node an argument:

```shell
n8n-node new n8n-nodes-myproject
```

/// note | Node name format
Node names must use one of the following formats:

* `@<YOUR_ORG>/n8n-nodes-<YOUR_NODE_NAME>`
* `n8n-nodes-<YOUR_NODE_NAME>`
///

If you know the template you want to use ahead of time, you can also pass the value using the `--template` flag:

```shell
n8n-node new --template declarative/custom
```

The template must be one of the following:

* `declarative/github-issues`: A demo node that includes multiple operations and credentials. This can help you get familiar with the node structure and conventions.
* `declarative/custom`: A blank template that will guide you through your custom setup with some additional prompts.
* `programmatic/example`: A programmatic style node with full flexibility.

## Building your node

You can build your node by running the `build` command in your project's root directory:

```shell
n8n-node build
```

`n8n-node` will compile your TypeScript files and bundle your other project assets. You can also call the `build` script from your package manager. For instance, for `npm`, this is the equivalent command:

```shell
npm run build
```

## Lint your node

The `n8n-node` tool automatically creates a `lint` script for your project as well. You can run with your package manager. For example:

```shell
npm run lint
```

## Testing your node in n8n

To test your node in n8n, you run the `dev` command in your project's root directory:

```shell
n8n-node dev
```

As with the `build` command, you can also run this through your package manager. For example:

```shell
npm run dev
```

`n8n-node` will compile your project and start your local `npm`-installed n8n instance with your node loaded.

Visit your `localhost:5678` to sign in to your n8n instance. If you open a workflow, your node appears in the nodes panel:

![node in nodes panel](/_images/integrations/creating-nodes/n8n-node/node_in_nodes_panel.png)

From there, you can add it to your workflow and test the node's functionality as you develop.
