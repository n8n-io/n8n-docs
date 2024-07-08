---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Create, run, and activate workflows.
contentType: howto
---

# Create a workflow

A workflow is a collection of nodes connected together to automate a process. You build workflows on the workflow canvas.

## Create a workflow

1. If your n8n instance has [RBAC and projects](/user-management/rbac/) enabled: select either <span class="inline-image">![Home icon](/_images/common-icons/home.png)</span> **Home** to create a workflow in your own space, or a project to create a workflow and automatically share it with other project members 
1. On the **Workflows** list, select **Add Workflow**.
1. Get started by adding a trigger node: select **Add first step...**

If it's your first time building a workflow, you may want to use the [quickstart guides](/try-it-out/) to quickly try out n8n features.

## Run workflows manually

You may need to run your workflow manually when building and testing, or if your workflow doesn't have a trigger node. 

To run manually, select **Test Workflow**.

## Run workflows automatically

All new workflows are inactive by default.

You need to activate workflows that start with a trigger node or Webhook node so that they can run automatically. When a workflow is inactive, you must run it manually.

To activate or deactivate your workflow, open your workflow and toggle **Inactive** / **Active**.

Once a workflow is active, it runs whenever its trigger conditions are met.
