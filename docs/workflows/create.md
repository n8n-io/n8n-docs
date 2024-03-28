---
description: Create, run, and activate workflows.
contentType: howto
---

# Create a workflow

A workflow is a collection of nodes connected together to automate a process. You build workflows on the workflow canvas.

## Create a workflow

1. Make sure you're in the correct project. This affects where you can find the workflow later, and who it's automatically shared with.

    ??? Details "Workflow creation and projects"
		You can create workflows in:
		
		* <span class="inline-image">![Home icon](/_images/common-icons/home.png)</span> **Home**: you can view the workflow in <span class="inline-image">![Home icon](/_images/common-icons/home.png)</span> **Home** or in your personal project. It isn't shared.
		* In your personal project: you can view the workflow in <span class="inline-image">![Home icon](/_images/common-icons/home.png)</span> **Home** or in your personal project. It isn't shared.
		* In a different project where you are an admin or member: you can view the workflow in the project, or in **Home**, but not in your personal project. The workflow is shared with everyone in the project.

		Refer to [Projects](/user-management/rbac/projects/) for more information about RBAC and projects.
 
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
