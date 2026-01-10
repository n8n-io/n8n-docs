---
description: Save, publish, and unpublish workflows.
contentType: howto
---

# Saving and publishing workflows

n8n automatically saves your workflow changes every 5 seconds while you're editing. When you're ready to put the workflow into production, publish your workflow. This approach prevents accidental production changes while enabling safe iteration and review.

## How saving works

Changes save automatically every 5 seconds while you edit. No manual save button is required, though you can still use Ctrl+S or Cmd+S if preferred. All edits remain in draft until you publish.

## How publishing works

Publishing makes your workflow live and locks it to a specific version. Production executions will use this published version, not your latest edits. When you publish, your workflow will enable the following:

- Webhook and form triggers will use their production URLs
- Schedules will run at the times you've defined
- Events from connected apps will trigger this workflow

**Initial state: You open the workflow**

![Initial state when workflow is opened](/_images/publish/open-workflow.png)

**Changed state: Autosaved changes yet to be published**

![Changes awaiting publish](/_images/publish/post-change.png)

**Published state: All changes published**

![All changes published](/_images/publish/all-published.png)

**Changed state: New changes yet to be published**

![New changes awaiting publish](/_images/publish/new-unpublished.png)


## How collaboration works

Only one person can edit a workflow at a time. If someone else is currently editing:

- You see the workflow in read-only mode
- The edit lock releases when they stop editing or become inactive
- You can then take over editing with the latest changes

## Checking publishing status

On the **Workflows** page, each workflow displays an indicator showing whether it is **Published** or **Not Published**. You will also be able to see the same indicator on the canvas header.

## Publishing a workflow

The **Publish** button in the canvas header is enabled whenever there are unpublished changes.

Each time you make a change to a workflow, n8n autosaves those changes to a new version of the workflow. These saved versions go live in production only when you publish the workflow after the changes.

1. Click the **Publish** button to open the publishing modal
2. The version name defaults to a UUID. Customize the name if you'd like and add a description of the version.
3. Click **Publish** to make your changes live in production. Production executions always point to the currently published version.

   If you only update workflow settings, n8n will re-publish the version without requiring you to take any action.

## Managing version history

View and manage version history by clicking the history icon in the header. In the version history view, you can perform these actions:

* Unpublish the workflow to remove it from production
* Restore a previous version. Restoring lets you work on a version without affecting the production execution.
* Publish another version of the workflow

## Unpublishing a Workflow

Unpublish a workflow from either:

- The workflow settings menu
- The version history page (unpublish action on published versions)
