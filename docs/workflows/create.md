---
description: Create, run, and publish workflows.
contentType: howto
---

# Create a workflow

A [workflow](/glossary.md#workflow-n8n) is a collection of nodes connected together to automate a process. You build workflows on the [workflow canvas](/glossary.md#canvas-n8n).

## Create a workflow

1. Select the <span class="n8n-inline-image">![universal create resource icon](/_images/common-icons/universal-resource-button.png){.off-glb}</span> **button** in the upper-left corner of the side menu. Select workflow.
2. If your n8n instance supports projects, you'll also need to choose whether to create the workflow inside your **personal space** or a specific **project** you have access to. If you're using the community version, you'll always create workflows inside your personal space.
3. Get started by adding a trigger node: select **Add first step...**

Or:

1. Select the  <span class="n8n-inline-image">![universal create resource icon](/_images/common-icons/universal-resource-button.png){.off-glb}</span> **create** button in the upper-right corner from either the **Overview** page or a specific **project**. Select workflow.
2. If you're doing this from the **Overview** page, you'll create the workflow inside your personal space. If you're doing this from inside a project, you'll create the workflow inside that specific project.
3. Get started by adding a trigger node: select **Add first step...**

If it's your first time building a workflow, you may want to use the [quickstart guides](/try-it-out/index.md) to quickly try out n8n features.

## Run workflows manually

You may need to run your workflow manually when building and testing, or if your workflow doesn't have a trigger node. 

To run manually, select **Execute Workflow**.

## Run workflows automatically

All new workflows are unpublished by default. See [Publishing and saving workflows](/workflows/publish.md).

You need to publish workflows that start with a trigger node or Webhook node so that they can run automatically. When a workflow is inactive, you must run it manually.

To publish your workflow, open your workflow and click **Publish**. The option to unpublish is in the workflow settings menu.

Published workflows run whenever its trigger conditions are met.
