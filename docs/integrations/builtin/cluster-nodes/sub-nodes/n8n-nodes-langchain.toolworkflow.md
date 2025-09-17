---
title: Call n8n Workflow Tool node documentation
description: Learn how to use the Call n8n Workflow Tool node in n8n. Follow technical documentation to integrate Call n8n Workflow Tool node into your workflows.
contentType: [integration, reference]
priority: high
---

# Call n8n Workflow Tool node

The Call n8n Workflow Tool node is a [tool](/glossary.md#ai-tool) that allows an [agent](/glossary.md#ai-agent) to run another n8n workflow and fetch its output data. 

On this page, you'll find the node parameters for the Call n8n Workflow Tool node, and links to more resources.

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

### Description

Enter a custom code a description. This tells the agent when to use this tool. For example:

> Call this tool to get a random color. The input should be a string with comma separated names of colors to exclude.

### Source

Tell n8n which workflow to call. You can choose either:

* **Database** to select the workflow from a list or enter a workflow ID.
* **Define Below** and copy in a complete [workflow JSON](/workflows/export-import.md).

### Workflow Inputs

When using **Database** as workflow source, once you choose a sub-workflow (and define the **Workflow Input Schema** in the sub-workflow), you can define the **Workflow Inputs**.

Select the **Refresh** button to pull in the input fields from the sub-workflow.

You can define the workflow input values using any combination of the following options:

* providing fixed values
* using expressions to reference data from the current workflow
* [letting the AI model specify the parameter](/advanced-ai/examples/using-the-fromai-function.md) by selecting the button AI button on the right side of the field
* using the [`$fromAI()` function](/advanced-ai/examples/using-the-fromai-function.md#use-the-fromai-function) in expressions to control the way the model fills in data and to mix AI generated input with other custom input

To reference data from the current workflow, drag fields from the input panel to the field with the Expressions mode selected.

To get started with the `$fromAI()` function, select the "Let the model define this parameter" button on the right side of the field and then use the **X** on the box to revert to user-defined values. The field will change to an expression field pre-populated with the `$fromAI()` expression. From here, you can customize the expression to add other static or dynamic content, or tweak the `$fromAI()` function parameters.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'workflow-tool') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/tools-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

