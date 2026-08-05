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

Workflow reviews will be available on Enterprise Cloud and Enterprise self-hosted plans. An instance admin must enable the feature in **Settings** > **Security & policies**.
{% endhint %}

Workflow reviews let your team approve a specific [workflow version](view-change-history.md) before it's published. From **Publish**, choose **Submit for review** instead of publishing directly. You must assign a reviewer. That reviewer inspects the visual diff, discusses in **Activity**, then **Approve** or **Request changes**. On approval, n8n publishes the pinned version automatically as the requester (the user who submitted the review).

Reviews are optional after you enable the feature. You can still publish directly unless that workflow already has an open review.

## How reviews work

A review pins one workflow to one saved version. Each workflow can have at most one open review at a time.

* You can keep editing while a review is open. New saves create newer versions and don't change the pinned review until someone submits those changes to it.
* While a review is open (`Waiting for review` or `Changes requested`), n8n blocks publishing that workflow from the editor, the public API, and other ways to publish. Unpublishing still works.
* You can't open a second review for the same workflow. Resubmit newer changes to the existing review instead.
* On approval, n8n closes the review and publishes the pinned version as the requester. If auto-publish fails, the review stays approved and closed. Use **Retry publish** in the editor, or publish again. Publishing isn't blocked after the review closes.

People with access to the workflow, including viewers and editors, can see that a review is in progress in places like the workflow editor. Only people involved in the review, and admins, can open the review details.

Open **Reviews** in the left sidebar to find open and closed review requests you can access. You see a review if you submitted it, you're an author on it (you submitted changes to the open review), you're the assigned reviewer, or you're a project admin or instance admin.

## Enable workflow reviews

Instance admins enable workflow reviews for the whole instance in **Settings** > **Security & policies**, under **Workflow reviews**. When the setting is off, review UI and APIs aren't available. Turning the feature off later removes access to reviews on the instance.

For more about instance security policies, refer to [Manage security policies](../../deploy/host-n8n/configure-n8n/security/manage-security-policies.md).

## Submit or update a review

1. Open the workflow and select **Publish** (or press `Shift` + `p`).
2. Choose **Submit for review** instead of publishing directly.
3. Enter a **Review title** and assign a **Reviewer** (both required). Optionally add a **Description**.
4. Select **Submit**.

The reviewer needs `workflow:read` on that workflow. They don't need `workflow:publish`.

n8n creates a review for the current saved version. Open it from **Reviews** in the left sidebar.

If the workflow already has an open review and you've saved a newer version, use the status control in the editor header or choose **Publish**, then **Submit**. n8n pins the open review to that newer version. If the review was in **Changes requested**, it returns to **Waiting for review**.

### Review required preference

In the **Publish** menu, you can turn on **Review required** for the current workflow. When it's on, choosing **Publish** opens the submit-for-review modal instead of publishing immediately.

This preference is stored in your browser for that workflow. It isn't a shared project or instance policy. While a workflow has an open review, review stays required until the review closes.

## Review a submission

A review detail has two tabs:

* **Activity**: description, activity feed, and comments. People who can open the review can comment. Comments stay visible after the review closes. Comments aren't anchored to a specific node in this release.
* **Changes**: a visual workflow diff between the currently **Published** version and the version **In review**. The diff works like [workflow diffs for source control](../../administer/use-source-control-and-environments/compare-versions.md).

Then the assigned reviewer, or a project admin or instance admin, can choose:

* **Approve**: closes the review and publishes the pinned workflow version as the requester.
* **Request changes**: keeps the review open so editors can update the workflow and resubmit.

## Permissions

| Action | Who can do it |
| --- | --- |
| Enable or disable workflow reviews for the instance | Instance admins with access to **Settings** > **Security & policies** |
| Submit a workflow for review | Users with `workflow:publish` on that workflow |
| Update an open review with a newer version | Users with `workflow:publish` on that workflow |
| See that a review is in progress | Users who can open the workflow, including viewers and editors |
| Open review details (activity, changes, comments) | The requester, authors on the review, the assigned reviewer, and project or instance admins |
| Appear in **Reviews** and open those reviews | The requester, authors on the review, the assigned reviewer, and project or instance admins. Admins see all reviews. |
| Be assigned as reviewer | Users with at least `workflow:read` on that workflow |
| Approve or request changes | The assigned reviewer, or a project admin or instance admin |

Authors are people who submitted the review or later submitted newer versions to the same open review. Having `workflow:publish` alone doesn't let you browse every review in a project.

## Related resources

* [Save and publish workflows](../understand-workflows/save-and-publish-workflows.md)
* [View change history](view-change-history.md)
* [Compare changes with workflow diffs](../../administer/use-source-control-and-environments/compare-versions.md)
* [Manage security policies](../../deploy/host-n8n/configure-n8n/security/manage-security-policies.md)
* [See available roles](../../administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md)
