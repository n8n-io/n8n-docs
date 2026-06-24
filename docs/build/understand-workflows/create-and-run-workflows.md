---
contentType: howto
nodeTitle: Create and run workflows
originalFilePath: workflows/create.md
originalUrl: https://docs.n8n.io/workflows/create
url: https://docs.n8n.io/build/understand-workflows/create-and-run-workflows
description: Create, run, and publish workflows.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Create and run workflows

A workflow[^1] is a collection of nodes connected together to automate a process. You build workflows on the [workflow canvas](#user-content-fn-2)[^2].

## Create a workflow <a href="#create-a-workflow" id="create-a-workflow"></a>

1. Select the <img src="../.gitbook/assets/universal-resource-button (1).png" alt="universal create resource icon" data-size="line"> **button** in the upper-left corner of the side menu. Select workflow.
2. If your n8n instance supports projects, you'll also need to choose whether to create the workflow inside your **personal space** or a specific **project** you have access to. If you're using the community version, you'll always create workflows inside your personal space.
3. Get started by adding a trigger node: select **Add first step...**

Or:

1. Select the <img src="../.gitbook/assets/universal-resource-button (1).png" alt="universal create resource icon" data-size="line"> **create** button in the upper-right corner from either the **Overview** page or a specific **project**. Select workflow.
2. If you're doing this from the **Overview** page, you'll create the workflow inside your personal space. If you're doing this from inside a project, you'll create the workflow inside that specific project.
3. Get started by adding a trigger node: select **Add first step...**

If it's your first time building a workflow, you may want to use the [quickstart guides](../../../try-it-out/index.md) to quickly try out n8n features.

## Run workflows manually <a href="#run-workflows-manually" id="run-workflows-manually"></a>

You may need to run your workflow manually when building and testing, or if your workflow doesn't have a trigger node.

To run manually, select **Execute Workflow**.

## Run workflows automatically <a href="#run-workflows-automatically" id="run-workflows-automatically"></a>

All new workflows are unpublished by default. See [Publishing and saving workflows](save-and-publish-workflows.md).

You need to publish workflows that start with a trigger node or Webhook node so that they can run automatically. When a workflow is inactive, you must run it manually.

To publish your workflow, open your workflow and click **Publish**. The option to unpublish is in the workflow settings menu.

Published workflows run whenever its trigger conditions are met.

[^1]: An n8n workflow is a collection of nodes that automate a process. Workflows begin execution when a trigger condition occurs and execute sequentially to achieve complex tasks.
[^2]: The canvas is the main interface for building workflows in n8n's editor UI. You use the canvas to add and connect nodes to compose workflows.
