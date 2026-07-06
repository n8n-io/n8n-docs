---
title: Call n8n Workflow Tool node documentation
description: >-
  Learn how to use the Call n8n Workflow Tool node in n8n. Follow technical
  documentation to integrate Call n8n Workflow Tool node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Call n8n Workflow Tool node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow
layout:
  description:
    visible: false
---

# Call n8n Workflow Tool node <a href="#call-n8n-workflow-tool-node" id="call-n8n-workflow-tool-node"></a>

The Call n8n Workflow Tool node is a tool[^1] that allows an agent[^2] to run another n8n workflow and fetch its output data. 

On this page, you'll find the node parameters for the Call n8n Workflow Tool node, and links to more resources.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Description <a href="#description" id="description"></a>

Enter a custom code a description. This tells the agent when to use this tool. For example:

> Call this tool to get a random color. The input should be a string with comma separated names of colors to exclude.

### Source <a href="#source" id="source"></a>

Tell n8n which workflow to call. You can choose either:

* **Database** to select the workflow from a list or enter a workflow ID.
* **Define Below** and copy in a complete [workflow JSON](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/export-and-import).

### Workflow Inputs <a href="#workflow-inputs" id="workflow-inputs"></a>

When using **Database** as workflow source, once you choose a sub-workflow (and define the **Workflow Input Schema** in the sub-workflow), you can define the **Workflow Inputs**.

Select the **Refresh** button to pull in the input fields from the sub-workflow.

You can define the workflow input values using any combination of the following options:

* providing fixed values
* using expressions to reference data from the current workflow
* [letting the AI model specify the parameter](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/ai-examples/use-ai-for-parameters) by selecting the button AI button on the right side of the field
* using the [`$fromAI()` function](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/ai-examples/use-ai-for-parameters#use-the-fromai-function) in expressions to control the way the model fills in data and to mix AI generated input with other custom input

To reference data from the current workflow, drag fields from the input panel to the field with the Expressions mode selected.

To get started with the `$fromAI()` function, select the "Let the model define this parameter" button on the right side of the field and then use the **X** on the box to revert to user-defined values. The field will change to an expression field pre-populated with the `$fromAI()` expression. From here, you can customize the expression to add other static or dynamic content, or tweak the `$fromAI()` function parameters.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Call n8n Workflow Tool node documentation integration templates](https://n8n.io/integrations/workflow-tool) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Yl56nEscwQQAbBUeWfvp/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: In an AI context, a tool is an add-on resource that the AI can refer to for specific information or functionality when responding to a request. The AI model can use a tool to interact with external systems or complete specific, focused tasks.
[^2]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
