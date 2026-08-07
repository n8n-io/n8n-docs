---
description: >-
  Submit a workflow version for review before publishing, compare changes with a
  visual diff, discuss in activity comments, and approve or request changes.
contentType: howto
nodeTitle: Workflow reviews
url: https://docs.n8n.io/build/manage-workflows/workflow-reviews
layout:
  description:
    visible: false
---

# Workflow reviews

{% hint style="warning" %}
**Preview**

Workflow reviews is an upcoming Enterprise feature. This page describes the first release so you can plan how your team will use it. Details may change before general availability.
{% endhint %}

{% hint style="info" %}
**Feature availability**

Workflow reviews will be available on Enterprise Cloud and Enterprise self-hosted plans. An instance admin must enable the feature in **Settings** > **Security**.
{% endhint %}

Workflow reviews let your team approve a specific [workflow version](view-change-history.md) before it's published. From **Publish**, choose **Submit for review** instead of publishing directly. Reviewers inspect the visual diff, discuss in **Activity**, then **Approve** or **Request changes**. On approval, n8n publishes the pinned version automatically.

Reviews are optional after you enable the feature. You can still publish directly unless that workflow already has an open review.

## How reviews work

A review pins one workflow to one saved version. Each workflow can have at most one open review at a time.

* You can keep editing while a review is open. New saves create newer versions and don't change the pinned review until someone submits those changes to it.
* While a review is open (`Waiting for review` or `Changes requested`), n8n blocks publishing that workflow from the editor, the public API, and other ways to publish. Unpublishing still works.
* You can't open a second review for the same workflow. Resubmit newer changes to the existing review instead.
* On approval, n8n closes the review and publishes the pinned version. If auto-publish fails, the review stays approved and closed. Use **Retry publish** in the editor, or publish again. Publishing isn't blocked after the review closes.

Open **Reviews** in the left sidebar to find open and closed review requests across projects you can access. You see a review if you submitted it, or if you have permission to publish workflows in that review's project.

## Enable workflow reviews

Instance admins enable workflow reviews for the whole instance in **Settings** > **Security & policies**, under **Workflow reviews**. When the setting is off, review UI and APIs aren't available. Turning the feature off later removes access to reviews on the instance.

For more about instance security policies, refer to [Manage security policies](../../deploy/host-n8n/configure-n8n/security/manage-security-policies.md).

## Submit or update a review

1. Open the workflow and select **Publish** (or press `Shift` + `p`).
2. Choose **Submit for review** instead of publishing directly.
3. Enter a **Review title** (required). Optionally add a **Description** and pick a **Reviewer**.
4. Select **Submit**.

n8n creates a review for the current saved version. Open it from **Reviews** in the left sidebar.

If the workflow already has an open review and you've saved a newer version, use the status control in the editor header or choose **Publish**, then **Submit**. n8n pins the open review to that newer version. If the review was in **Changes requested**, it returns to **Waiting for review**.

### Review required preference

In the **Publish** menu, you can turn on **Review required** for the current workflow. When it's on, choosing **Publish** opens the submit-for-review modal instead of publishing immediately.

This preference is stored in your browser for that workflow. It isn't a shared project or instance policy. While a workflow has an open review, review stays required until the review closes.

## Review a submission

A review detail has two tabs:

* **Activity**: description, activity feed, and comments. Authors and people who can decide the review can comment. Comments stay visible after the review closes. Comments aren't anchored to a specific node in this release.
* **Changes**: a visual workflow diff between the currently **Published** version and the version **In review**. The diff works like [workflow diffs for source control](../../administer/use-source-control-and-environments/compare-versions.md).

Then choose:

* **Approve**: closes the review and publishes the pinned workflow version.
* **Request changes**: keeps the review open so editors can update the workflow and resubmit.

People who contributed a version to the review (authors) can't approve or request changes on that review, unless they're a project admin or instance admin. Assigning a reviewer when you submit is optional. Any user with `workflow:publish` who isn't an author of the review can decide it.

## Permissions

| Action | Who can do it |
| --- | --- |
| Enable or disable workflow reviews for the instance | Instance admins with access to **Settings** > **Security** |
| Submit a workflow for review | Users with `workflow:publish` on that workflow |
| Update an open review with a newer version | Users with `workflow:publish` on that workflow |
| View reviews, activity, and changes | The requester, or users with `workflow:publish` in the review's project |
| Post a comment on a review | Authors of the review, or users who can approve or request changes on it |
| Approve or request changes | Users with `workflow:publish` on the workflow who aren't authors of the review. Project admins and instance admins can decide even if they contributed a version. |

Project viewers can't submit, comment on, or decide reviews.

## Related resources

* [Save and publish workflows](../understand-workflows/save-and-publish-workflows.md)
* [View change history](view-change-history.md)
* [Compare changes with workflow diffs](../../administer/use-source-control-and-environments/compare-versions.md)
* [Manage security policies](../../deploy/host-n8n/configure-n8n/security/manage-security-policies.md)
* [See available roles](../../administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md)
