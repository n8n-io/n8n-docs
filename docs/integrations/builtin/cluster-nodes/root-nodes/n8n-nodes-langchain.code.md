---
title: LangChain Code
description: Documentation for the LangChain Code node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# LangChain Code

Use the LangChain Code node to import LangChain. This means if there is functionality you need that n8n hasn't created a node for, you can still use it.

By configuring the LangChain Code node connectors you can use it as a normal node, root node or sub-node.

On this page, you'll find the node parameters, guidance on configuring the node, and links to more resources.

/// note | Not available on Cloud
This node is only available on self-hosted n8n.
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [LangChain Code integrations](https://n8n.io/integrations/langchain-code/){:target=_blank .external-link} page.
///	

## Node parameters

### Add Code

Add your custom code. Choose either **Execute** or **Supply Data** mode. You can only use one mode.

* **Execute**: use the LangChain Code node like n8n's own Code node. This takes input data from the workflow, processes it, and returns it as the node output. This mode requires a main input and output. You must create these connections in **Inputs** and **Outputs**.
* **Supply Data**: use the LangChain Code node as a sub-node, sending data to a root node. This uses an output other than main.

By default, you can't load built-in or external modules in this node. Self-hosted users can [enable built-in and external modules](/hosting/environment-variables/configuration-methods/).

### Inputs

Choose the input types. 

The main input is the normal connector found in all n8n workflows. If you have a main input and output set in the node, **Execute** code is required.

### Outputs

Choose the output types. 

The main output is the normal connector found in all n8n workflows. If you have a main input and output set in the node, **Execute** code is required.

## Node inputs and outputs configuration

By configuring the LangChain Code node connectors (inputs and outputs) you can use it as an app node, root node or sub-node.

![Screenshot of a workflow with four LangChain nodes, configured as different node types](/_images/integrations/builtin/cluster-nodes/langchaincode/create-node-types.png)

| Node type | Inputs | Outputs | Code mode |
| --------- | ------ | ------- | --------- |
| App node. Similar to the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/). | Main | Main | Execute |
| Root node | Main; at least one other type | Main | Execute |
| Sub-node | - | A type other than main. Must match the input type you want to connect to. | Supply Data |
| Sub-node with sub-nodes | A type other than main |A type other than main. Must match the input type you want to connect to. | Supply Data |

## Built-in methods

n8n provides these methods to make it easier to perform common tasks in the LangChain Code node.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/langchaincode/builtin-methods.md"

## Related resources

View [example workflows and related content](https://n8n.io/integrations/langchain-code/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
