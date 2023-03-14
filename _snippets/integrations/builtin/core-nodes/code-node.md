The Code node allows you to write custom JavaScript and run it as a step in your workflow.

!!! note "Function and Function Item nodes"
	The Code node replaces the Function and Function Item nodes from version 0.198.0 onwards. If you're using an older version of n8n, you can still view the [Function node documentation](https://github.com/n8n-io/n8n-docs/blob/67935ad2528e2e30d7984ea917e4af2910a096ec/docs/integrations/builtin/core-nodes/n8n-nodes-base.function.md){:target=_blank .external-link} and [Function Item node documentation](https://github.com/n8n-io/n8n-docs/blob/67935ad2528e2e30d7984ea917e4af2910a096ec/docs/integrations/builtin/core-nodes/n8n-nodes-base.functionItem.md){:target=_blank .external-link}.

## Usage

How to use the Code node.

### Choose a mode

There are two modes:

* **Run Once for All Items**: this is the default. When your workflow runs, the code in the code node executes once, regardless of how many input items there are.
* **Run Once for Each Item**: choose this if you want your code to run for every input item.

### Supported JavaScript features

The Code node supports:

* Promises. Instead of returning the items directly, you can return a promise which resolves accordingly.
* Writing to your browser console using `console.log`. This is useful for debugging and troubleshooting your workflows.

### External libraries

If you self-host n8n, you can import and use built-in and external npm modules in the Code node. To learn how to enable external modules, refer the [Configuration](/hosting/configuration/#use-built-in-and-external-modules-in-the-code-node) guide.

## Coding in n8n

There are two places where you can use code in n8n: the Code node and the expressions editor. When using either area, there are some key concepts you need to know, as well as some built-in methods and variables to help with common tasks.

### Key concepts

When working with the Code node, you need to understand the following concepts:

* [Data structure](/data/data-structure/): understand the data you receive in the Code node, and requirements for outputting data from the node.
* [Item linking](/data/data-mapping/data-item-linking/): learn how data items work, and how to link to items from previous nodes. You need to handle item linking in your code when the number of input and output items doesn't match.

### Built-in methods and variables

n8n includes built-in methods and variables. These provide support for:

* Accessing specific item data
* Accessing data about workflows, executions, and your n8n environment
* Convenience variables to help with data and time

Refer to [methods and variables](/code-examples/methods-variables-reference/) for more information.


