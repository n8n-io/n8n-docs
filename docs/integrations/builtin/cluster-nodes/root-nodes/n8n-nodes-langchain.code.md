---
title: LangChain Code
description: Documentation for the LangChain Code node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# LangChain Code

The LangChain Code node allows you to import LangChain. This means if there is functionality you need that n8n hasn't created a node for, you can still use it.

On this page, you'll find the node parameters for the LangChain Code node, and links to more resources.

!!! note "Not available on Cloud"
	This node is only available on self-hosted n8n.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [LangChain integrations](https://n8n.io/integrations/langchain-code/){:target=_blank .external-link} page.
	
## Node parameters

You must create the connectors for this node.

### Add Code

Add your custom code.

* **Execute**: like n8n's Code node. This takes input data from the workflow, processes it, and returns it as the node output. This mode requires a main input and output. You must create these connections in **Inputs** and **Outputs**.
* **SupplyData**: for fetching data into the workflow from an external source. This uses an output other than the main connector.

By default, you can't load built-in or external modules in this node. Self-hosted users can [enable built-in and external modules](/hosting/environment-variables/configuration-methods/).

### Inputs

Choose the input types. 

The main input is the normal connector found in all n8n workflows. If you have a main input and output set in the node, **Execute** is required.

### Outputs

Choose the input types. 

The main output is the normal connector found in all n8n workflows. If you have a main input and output set in the node, **Execute** is required.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/langchain-code/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
