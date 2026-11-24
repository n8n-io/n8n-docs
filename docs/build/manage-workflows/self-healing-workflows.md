---
description: Let the n8n Assistant investigate failed production workflows and prepare fixes for you to review.
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Self-healing workflows

Self-healing lets the [n8n Assistant](../ways-of-building-workflows/n8n-assistant.md) investigate failed production workflows. It prepares fixes for you to review in your **Inbox**.

The Assistant reads the failed execution, investigates the cause, and proposes changes. You decide what to publish.

{% hint style="info" %}
**Feature availability**

<!-- vale from-microsoft.Contractions = NO -->
<!-- vale from-write-good.TooWordy = NO -->
Self-healing requires the n8n Assistant. It is available on:
<!-- vale from-microsoft.Contractions = YES -->
<!-- vale from-write-good.TooWordy = YES -->

* **n8n Cloud:** Starter and Pro.
* **Self-hosted:** Community, Registered Community, and Business.

It isn't available on Enterprise plans.

Self-healing workflows started rolling out gradually on n8n Cloud from n8n 2.49.5.
{% endhint %}

{% hint style="info" %}
**Preview status**

Self-healing workflows are in [Preview](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/understand-feature-availability#feature-maturity-preview-ga-deprecated-and-removed) and may change. Avoid relying on self-healing for production recovery.
{% endhint %}

Each investigation uses [Assistant credits](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/assistant-credits) on n8n Cloud, or tokens from your AI provider on self-hosted instances. Usage applies even when the Assistant can't produce a fix.

## Before you start

* [Publish your workflow](../understand-workflows/save-and-publish-workflows.md). Self-healing skips failures while you have saved changes that you haven't published.
* In [workflow settings](configure-workflow-settings.md), check that **Save failed production executions** is **Save** or **Default - Save**.
* For team projects, you need permission to manage project settings. Reviewers need edit access to the workflows they review. Publishing also requires publish permission.

On self-hosted instances, [set up the n8n Assistant](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/set-up-n8n-assistant), then set `N8N_INSTANCE_AI_WORKFLOW_SUGGESTIONS_ENABLED=true` and restart n8n.

On self-hosted instances, `EXECUTIONS_DATA_SAVE_ON_ERROR` defaults to `all`, which saves failed production executions. A workflow's **Save failed production executions** setting can override this default.

## Enable self-healing

1. Open your project. For a personal project, select **Self-healing**. For a team project, open **Settings** > **Self-healing**.
2. Select **Add configuration**.
3. Under **Workflows**, choose **All** or **Select manually**. If you choose **Select manually**, add at least one workflow.
4. Keep **Include sub-workflows** enabled if fixes can also change called sub-workflows in the same project.
5. For a team project, select **Reviewers**. In a personal project, you review the results yourself.
6. Select **Create configuration**.

The configuration starts active. The Assistant investigates new production failures using the access of the person who enabled it. Manual tests and retries don't trigger investigations.

## Review a result

Open **Inbox** from the left menu. A result can include changes to several workflows in the same project.

* For **Fix ready**, read **Report** and inspect **Changes**. Open **Review** to choose your next action.
* For **Needs attention**, read the report to see what needs your help. Use **Continue in…** to continue with the Assistant or editor.
* For **Could not fix**, find the report under **Closed**. It explains why the Assistant couldn't produce a fix.

For **Fix ready**, select **Apply and publish** to save and publish the proposed changes. Select **Discard and close** to reject them.

**Continue with Assistant** and **Continue with Editor** save any proposed changes as unpublished changes and close the review. Test and edit the workflow before publishing it yourself.

Review every affected workflow before publishing. A change to a shared sub-workflow can affect other workflows that call it. Verification can use simulations, so **Fix ready** doesn't guarantee that the next production execution will succeed. During a self-healing investigation, the Assistant can't create credentials or edit data tables.

## Pause self-healing

Turn off the configuration's **Active** switch to stop new investigations and cancel those in progress. Existing results remain available. Deleting the configuration also deletes its investigation history and results.

## If an investigation doesn't start

Check that the configuration is active, the workflow is fully published, and n8n saves failed executions. An investigation or open review already in progress blocks another investigation for that workflow.

After **Could not fix**, self-healing waits 24 hours before investigating another failure of the same published version. Publishing a different version ends this wait. A new production failure must occur before another investigation starts.

## Related resources

* [Manage workflows](./)
* [Configure workflow settings](configure-workflow-settings.md)
* [Tag workflows](tag-workflows.md)
* [Favorite items](favorite-items.md)
* [View change history](view-change-history.md)
* [Review workflows](workflow-reviews.md)
* [Export and import](export-and-import.md)
* [n8n packages](n8n-packages/README.md)
* [Share with others](share-with-others.md)
* [Handle workflow errors](../flow-logic/handle-errors-gracefully.md)
