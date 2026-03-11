---
description: Save, publish, unpublish, and name workflow versions.
contentType: howto
---

# Saving and publishing workflows

n8n auto saves your workflow while you're editing. When you're ready to put the workflow into production, publish your workflow. This approach prevents accidental production changes while enabling safe iteration and review.

## How saving works

Changes save automatically as you edit, typically within 1 to 5 seconds. No manual save button is required. All edits remain in draft until you publish.

## How publishing works

Publishing makes your workflow live and locks it to a specific version. Production executions will use this published version, not your latest edits. When you publish, your workflow will enable the following:

- Webhook and form triggers will use their production URLs
- Schedules will run at the times you've defined
- Events from connected apps will trigger this workflow

**Initial state** When you open a workflow with no publishable changes, the Publish button is disabled.

![](/_images/publish/publish-initial.png)

**Ready to publish** When the workflow is not yet published but has changes, the button becomes active.

![](/_images/publish/publish-ready.png)

**Published, up to date** The workflow is currently published and there are no new changes since the last publish.

![](/_images/publish/published.png)

**Published, has changes** The workflow is published, but you've made changes since the last publish that haven't gone live yet.

![](/_images/publish/published-changes.png)

**Published, invalid changes** The workflow is published, but it's not in a state to be republished (no trigger requires publishing).

![](/_images/publish/published-invalid.png)

**Published, error** The workflow is published, but there are errors in your recent changes that need to be fixed before you can publish again.

![](/_images/publish/published-error.png)


## How collaboration works

Only one person can edit a workflow at a time. If someone else is currently editing:

- You see the workflow in read-only mode
- The edit lock releases when they stop editing or become inactive
- You can then take over editing with the latest changes

## Checking publishing status

On the **Workflows** page, if a workflow is published an indicator will be displayed on the card.

![](/_images/publish/published-indicator-wf-list.png)

## Publishing a workflow

The **Publish** button in the canvas header is enabled whenever there are unpublished changes.

Each time you make a change to a workflow, n8n autosaves those changes to a new version of the workflow. These saved versions go live in production only when you publish the workflow after the changes.

1. Click the **Publish** button (or use hotkey `Shift` + `p`) to open the publishing modal
2. The version name defaults to a UUID. Customize the name if you'd like and add a description of the version.
3. Click **Publish** to make your changes live in production. Production executions always point to the currently published version.

   If you only update workflow settings, n8n will re-publish the version without requiring you to take any action.

![](/_images/publish/publish-modal.png)


## Naming versions

/// info | Feature availability
Named versions are available on Pro and Enterprise Cloud plans, and Enterprise self-hosted plans.
///

Named versions let you give a meaningful name and description to any workflow version. This helps you identify important milestones in your workflow's development. Named versions are also protected from automatic [version history pruning](/workflows/history.md), so they persist indefinitely.

To name a version from the canvas header:

1. Select the dropdown arrow next to the **Publish** button (or use hotkey `Cmd/Ctrl` + `s`).
2. Select **Name version**.
3. Enter a name and optional description.
4. Select **Save**.

![](/_images/publish/publish-dropdown.png)

To name a version from the version history page:

1. Open the version history by selecting the history icon in the header.
2. On the version you want to name, select **Options** <span class="n8n-inline-image">![Options icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span>.
3. Select **Name version**.
4. Enter a name and optional description.
5. Select **Save**.

## Managing version history

View and manage version history by clicking the history icon in the header. In the version history view, you can perform these actions:

* Unpublish the workflow to remove it from production
* Restore a previous version. Restoring lets you work on a version without affecting the production execution.
* Publish another version of the workflow
* Name a version to protect it from pruning

## How to unpublish a workflow

Unpublish a workflow from either:

- The dropdown arrow next to the **Publish** button in the canvas header (or use hotkey `Cmd/Ctrl` + `u`).
- In the workflow list
- The version history page (unpublish action on published versions)
