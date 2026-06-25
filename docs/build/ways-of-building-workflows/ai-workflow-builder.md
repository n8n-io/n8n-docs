---
title: AI Workflow Builder
description: >-
  Create, refine, and debug workflows using natural language descriptions of
  your goals.
status: beta
nodeTitle: AI Workflow Builder
originalFilePath: advanced-ai/ai-workflow-builder.md
originalUrl: 'https://docs.n8n.io/advanced-ai/ai-workflow-builder'
url: 'https://docs.n8n.io/build/ways-of-building-workflows/ai-workflow-builder'
layout:
  description:
    visible: false
---

# AI Workflow Builder <a href="#ai-workflow-builder" id="ai-workflow-builder"></a>

AI Workflow Builder enables you to create, refine, and debug workflows using natural language descriptions of your goals.

It handles the entire workflow construction process, including node selection, placement, and configuration, thereby reducing the time required to build functional workflows.

For details of pricing and availability of AI Workflow Builder, see [n8n Plans and Pricing](https://n8n.io/pricing/).

## Working with the builder <a href="#working-with-the-builder" id="working-with-the-builder"></a>

1. **Describe your workflow:** Either select an example prompt or describe your requirements in natural language.
2. **Monitor the build:** The builder provides real-time feedback through several phases.
3. **Review and refine the generated workflow:** Review required credentials and other parameters. Refine the workflow using prompts.
    
    ![ai-workflow-builder.png](../.gitbook/assets/ai-workflow-builder.png)
    

### Commands you can run in the builder <a href="#commands-you-can-run-in-the-builder" id="commands-you-can-run-in-the-builder"></a>

- `/clear`: Clears the context for the LLM and lets you start from scratch

## Understanding credits <a href="#understanding-credits" id="understanding-credits"></a>

### How credits work <a href="#how-credits-work" id="how-credits-work"></a>

Each time you send a message to the builder asking it to create or modify a workflow, that counts as one **interaction**, which is worth one **credit**.

✅ **Counts as an interaction**

- Sending a message to create a new workflow
- Asking the builder to modify an existing workflow
- Clicking the **Execute and refine** button in the builder window after a workflow is built

❌ **Does NOT count as an interaction**

- Messages that fail or produce generation errors
- Requests you manually stop by clicking the stop button

### Getting more credits <a href="#getting-more-credits" id="getting-more-credits"></a>

If you've used your monthly limit, you can upgrade to a higher plan.

For details on plans and pricing, see [n8n Plans and Pricing](https://n8n.io/pricing/).

## AI model and data handling <a href="#ai-model-and-data-handling" id="ai-model-and-data-handling"></a>

The following data are sent to the LLM:

- Text prompts that you provide to create, refine, or debug the workflow
- Node definitions, parameters, and connections and the current workflow definition.
- Any mock execution data that is loaded when using the builder

The following data are not sent:

- Details of any credentials you use
- Past executions of the workflow
