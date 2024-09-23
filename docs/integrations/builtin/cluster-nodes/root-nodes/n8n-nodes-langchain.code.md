---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: LangChain Code node documentation
description: Learn how to use the LangChain Code node in n8n. Follow technical documentation to integrate LangChain Code node into your workflows.
contentType: integration
priority: medium
---

# LangChain Code node

Use the LangChain Code node to import LangChain. This means if there is functionality you need that n8n hasn't created a node for, you can still use it. By configuring the LangChain Code node connectors you can use it as a normal node, root node or sub-node.

On this page, you'll find the node parameters, guidance on configuring the node, and links to more resources.

/// note | Not available on Cloud
This node is only available on self-hosted n8n.
///

## Node parameters

### Add Code

Add your custom code. Choose either **Execute** or **Supply Data** mode. You can only use one mode.

Unlike the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/), the LangChain Code node doesn't support Python.

* **Execute**: use the LangChain Code node like n8n's own Code node. This takes input data from the workflow, processes it, and returns it as the node output. This mode requires a main input and output. You must create these connections in **Inputs** and **Outputs**.
* **Supply Data**: use the LangChain Code node as a sub-node, sending data to a root node. This uses an output other than main.

By default, you can't load built-in or external modules in this node. Self-hosted users can [enable built-in and external modules](/hosting/configuration/configuration-methods/).

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

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'langchain-code') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
