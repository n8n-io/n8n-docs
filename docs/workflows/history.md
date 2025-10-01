---
title: Workflow history
description: View and restore previous versions of your workflow.
contentType: howto
---

# Workflow history

/// info | Feature availability
* Full workflow history is available on Enterprise Cloud and Enterprise Self-hosted.
* Versions from the last five days are available for Cloud Pro users.
* Versions from the last 24 hours are available for registered Community users.
///	

Use workflow history to view and restore previous versions of your workflows. 

## Understand workflow history

n8n creates a new version when you:

 * Save your workflow.
 * Restore an old version. n8n saves the latest version before restoring.
 * Pull from a Git repository using [Source control](/source-control-environments/index.md). Note that n8n saves versions to the instance database, not to Git.

/// note | Workflow history and execution history
Don't confuse workflow history with the [Workflow-level executions list](/workflows/executions/single-workflow-executions.md).

Executions are workflow runs. With the executions list, you can see previous runs of the current version of the workflow. You can copy previous executions into the editor to [Debug and re-run past executions](/workflows/executions/debug.md) in your current workflow.

Workflow history is previous versions of the workflow: for example, a version with a different node, or different parameters set.
///


## View workflow history

To view a workflow's history:

1. Open the workflow.
1. Select **Workflow history** <span class="n8n-inline-image">![Workflow history icon](/_images/common-icons/workflow-history.png){.off-glb}</span>. n8n opens a menu showing the saved workflow versions, and a canvas with a preview of the selected version.

## Restore or copy previous versions

You can restore a previous workflow version, or make a copy of it:

1. On the version you want to restore or copy, select **Options** <span class="n8n-inline-image">![Options icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span>.
1. Choose what you want to do:
	* **Restore this version**: replace your current workflow with the selected version.
	* **Clone to new workflow**: create a new workflow based on the selected version.
	* **Open version in new tab**: open a second tab displaying the selected version. Use this to compare versions.
	* **Download**: download the version as JSON.
