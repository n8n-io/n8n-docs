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

Workflow reviews let your team approve a specific [workflow version](view-change-history.md) before it's published. From **Publish**, choose **Submit for review** instead of publishing directly. You must assign a reviewer. That reviewer inspects the visual diff, discusses in **Activity**, then **Approve** or **Request changes**. On approval, n8n publishes the pinned version automatically as the requester (the user who submitted the review), so publish history and audit trails attribute the publish to them, not to the approving reviewer.

Reviews are optional after you enable the feature. You can still publish directly unless that workflow already has an open review.

n8n doesn't send email or other external notifications when someone is assigned as reviewer or when changes are requested. Check **Reviews** in the left sidebar for requests that need your attention.

## How reviews work

A review pins one workflow to one saved version. Each workflow can have at most one open review at a time.

### Review statuses

* **Waiting for review**: the pinned version is waiting for a decision. Publishing is blocked.
* **Changes requested**: the reviewer asked for updates. Publishing stays blocked until someone submits a newer version and the review returns to **Waiting for review**, then is approved.
* **Approved**: the reviewer or an admin approved. The review is closed, publishing isn't blocked, and n8n tries to publish the pinned version as the requester.
* **Closed** (no approval): n8n can also close a review without approving it when there's nothing left to review, for example if the workflow is deleted, archived, or moved out of the project. Those reviews appear under **Reviews** → **Closed**, and Activity shows why the review closed.

### Publish gate and ways out

* While a review is open (`Waiting for review` or `Changes requested`), n8n blocks publishing that workflow from the editor and the public API. You can still unpublish the workflow. Unpublishing doesn't close the review or unblock publishing a new version.
* You can't cancel or withdraw an open review in this release. To unblock publishing without an approval, an instance admin can turn off workflow reviews for the instance. That removes review UI and APIs, and it also stops the publish gate, so workflows with open reviews can be published again. Otherwise, the assigned reviewer or a project or instance admin must approve (or request changes, then approve after you resubmit).
* You can't open a second review for the same workflow. Resubmit newer changes to the existing review instead.
* You can keep editing while a review is open. New saves create newer versions and don't change the pinned review until someone submits those changes to it.
* On approval, n8n closes the review and publishes the pinned version as the requester, so attribution stays with who asked for the publish. If n8n can't publish automatically, the review stays approved and closed. Use **Retry publish** in the editor, or publish again. Publishing isn't blocked after the review closes.

People with access to the workflow, including viewers and editors, can see that a review is in progress in places like the workflow editor. Only people involved in the review, and admins, can open the review details.

Open **Reviews** in the left sidebar to find open and closed review requests you can access. You see a review if you submitted it, you're an author on it (you submitted changes to the open review), you're the assigned reviewer, or you're a project admin or instance admin.

## Enable workflow reviews

Instance admins enable workflow reviews for the whole instance in **Settings** > **Security & policies**, under **Workflow reviews**. When the setting is off, review UI and APIs aren't available. Turning the feature off later removes access to reviews on the instance and lifts the publish block for workflows that still have an open review.

For more about instance security policies, refer to [Manage security policies](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/manage-security-policies).

## Submit or update a review

1. Open the workflow and select **Publish** (or press `Shift` + `P`).
2. Choose **Submit for review** instead of publishing directly.
3. Enter a **Review title** and assign a **Reviewer** (both required). Optionally add a **Description**.
4. Select **Submit**.

The reviewer needs `workflow:read` on that workflow. They don't need `workflow:publish`.

n8n creates a review for the current saved version. Open it from **Reviews** in the left sidebar.

### Submit later changes to an open review

You can keep editing after you submit. New saves don't change the review until you submit them.

To add a newer saved version to the existing review:

1. Open the workflow.
2. Select **Submit changes** from the review status in the editor header.
3. Select **Submit**.

n8n updates the open review to that newer version. It doesn't open a second review. If the review was in **Changes requested**, it returns to **Waiting for review**.

### Review required preference

In the **Publish** menu, you can turn on **Review required** for the current workflow. When it's on, choosing **Publish** opens the submit-for-review modal instead of publishing.

Your browser stores this preference for that workflow. It isn't a shared project or instance policy. While a workflow has an open review, review stays required until the review closes.

## Review a submission

A review detail has two tabs:

* **Activity**: description, activity feed, and comments. People who can open the review can comment. Comments stay visible after the review closes. Comments aren't anchored to a specific node in this release.
* **Changes**: a visual workflow diff between the currently **Published** version and the version **In review**. The diff works like [workflow diffs for source control](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments/compare-versions).

Then the assigned reviewer, or a project admin or instance admin, can choose:

* **Approve**: closes the review and publishes the pinned workflow version as the requester, for attribution and audit trail.
* **Request changes**: keeps the review open so editors can update the workflow and resubmit.

## Permissions

| Action | Who can do it |
| --- | --- |
| Enable or disable workflow reviews for the instance | Instance admins with access to **Settings** > **Security & policies** |
| Submit a workflow for review | Users with `workflow:publish` on that workflow |
| Update an open review with a newer version | Users with `workflow:publish` on that workflow |
| See that a review is in progress | Users who can open the workflow, including viewers and editors |
| Open review details (activity, changes, comments) | The requester, authors on the review, the assigned reviewer, and project or instance admins |
| Appear in **Reviews** and open those reviews | The requester, authors on the review, the assigned reviewer, and project or instance admins. Admins see all reviews. Having `workflow:publish` alone isn't enough. |
| Appear as a reviewer | Users with at least `workflow:read` on that workflow |
| Approve or request changes | The assigned reviewer, or a project admin or instance admin. Authors can't decide unless they also have one of those roles. |

Authors are people who submitted the review or later submitted newer versions to the same open review.

## Related resources

* [Save and publish workflows](../understand-workflows/save-and-publish-workflows.md)
* [View change history](view-change-history.md)
* [Compare changes with workflow diffs](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments/compare-versions)
* [Manage security policies](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/manage-security-policies)
* [See available roles](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles)
