---
title: Workflow history
contentType: howto
nodeTitle: View change history
originalFilePath: workflows/history.md
originalUrl: https://docs.n8n.io/workflows/history
url: https://docs.n8n.io/build/manage-workflows/view-change-history
description: View and restore previous versions of your workflow.
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

# View change history

{% hint style="info" %}
**Feature availability**

* Full workflow history is available on Enterprise Cloud and Enterprise Self-hosted.
* Versions from the last five days are available for Cloud Pro users.
* Versions from the last 24 hours are available for all users.
{% endhint %}

Use workflow history to view and restore previous versions of your workflows.

## Understand workflow history <a href="#understand-workflow-history" id="understand-workflow-history"></a>

n8n creates a new version when you:

* Save your workflow.
* Restore an old version. n8n saves the latest version before restoring.
* Pull from a Git repository using [Source control](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments). Note that n8n saves versions to the instance database, not to Git.

Changes to workflow settings do not create a new version.

{% hint style="info" %}
**Workflow history and execution history**

Don't confuse workflow history with the [Workflow-level executions list](../understand-workflows/understand-executions/view-executions-for-a-single-workflow.md).

Executions are workflow runs. With the executions list, you can see previous runs of the current version of the workflow. You can copy previous executions into the editor to [Debug and re-run past executions](../understand-workflows/understand-executions/debug-executions.md) in your current workflow.

Workflow history is previous versions of the workflow: for example, a version with a different node, or different parameters set.
{% endhint %}

## View workflow history <a href="#view-workflow-history" id="view-workflow-history"></a>

To view a workflow's history:

1. Open the workflow.
2. Select **Workflow history** <img src="../.gitbook/assets/workflow-history.png" alt="Workflow history icon" data-size="line">. n8n opens a menu showing the saved workflow versions, and a canvas with a preview of the selected version.

## Restore or copy previous versions <a href="#restore-or-copy-previous-versions" id="restore-or-copy-previous-versions"></a>

You can restore a previous workflow version, or make a copy of it:

1. On the version you want to restore or copy, select **Options** <img src="../.gitbook/assets/three-dot-options-menu (1).png" alt="Options icon" data-size="line">.
2. Choose what you want to do:
   * **Restore version**: replace your current workflow with the selected version.
   * **Clone to new workflow**: create a new workflow based on the selected version.
   * **Open version in new tab**: open a second tab displaying the selected version. Use this to compare versions.
   * **Download**: download the version as JSON.
   * **Name version**: give the version a name and description. Named versions are protected from automatic pruning. Refer to [Naming versions](../understand-workflows/save-and-publish-workflows.md#naming-versions) for more details. Available on Pro and Enterprise plans.
