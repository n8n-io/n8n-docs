---
description: Publish, unpublish, and save workflows.
contentType: howto
---

# Publishing and saving workflows

You can iterate on, test, and save changes to workflows as many times as you need. Then when you're ready to put the workflow into production, publish your workflow.

This approach prevents accidental production changes while enabling safe iteration and review.

## Checking publishing status

On the **Workflows** page, each workflow displays an indicator showing whether it is **Published** or **Not Published**.

## Publishing a workflow

When you open a workflow and make changes to it, the **Publish** button in the header indicates whether you have unpublished changes.

This indicator is independent from the act of saving your changes, which you must still do manually. Each time you save changes to a workflow, n8n creates a new version of the workflow.

You can save your changes as many times as you need to, but the saved version goes live in production only when you publish the workflow.

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