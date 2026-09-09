---
description: >-
  Submit a workflow version for review before publishing, compare changes with a
  visual diff, discuss in activity comments, and approve or request changes.
contentType: howto
nodeTitle: Workflow reviews
url: https://docs.n8n.io/build/manage-workflows/workflow-reviews
status: preview
layout:
  description:
    visible: false
tags:
  - tag: preview
    primary: true
---

# Workflow reviews

{% hint style="info" %}
**Feature availability**

Workflow reviews are available on:

- **n8n Cloud:** Enterprise
- **Self-hosted:** Enterprise

Workflow reviews are available from n8n 2.37.0. An instance admin must enable the feature in **Settings** > **Security & policies**.
{% endhint %}

{% hint style="info" %}
**Preview status**

Workflow reviews are in Preview and may change before general availability. Avoid relying on them in production workflows.
{% endhint %}

Workflow reviews let your team approve a specific [workflow version](view-change-history.md) before it's published. From the **Publish** menu, choose **Submit for review** instead of publishing directly, and assign a reviewer. On approval, n8n publishes that version automatically.

Reviews are optional after you enable the feature. You can still publish directly unless that workflow already has an open review.

n8n doesn't send email or other external notifications when you assign a reviewer or when a reviewer requests changes. Check **Reviews** in the left sidebar for requests that need your attention.

## How reviews work

A review is tied to one saved version of a workflow, the *pinned version*. You can keep editing while a review is open. New saves create newer versions and don't change the pinned version until someone submits those changes to the review.

### What a review covers

A review covers the contents of one workflow: its nodes and connections, as captured in the pinned saved version. The visual diff and the approval only apply to those contents.

A review doesn't cover the resources the workflow depends on. These aren't part of the diff, aren't gated by approval, and apply to the published workflow as soon as you change them, even while a review is open:

* **Workflow settings**, such as the timezone, error workflow, and execution order.
* **Credentials** the workflow uses.
* **Variables**.
* **Data tables**.
* **Sub-workflows** the workflow calls. Each sub-workflow is its own workflow with its own review, if any.

### Review statuses

* **Waiting for review**: the pinned version is waiting for a decision. n8n blocks publishing.
* **Changes requested**: the reviewer asked for updates. n8n keeps publishing blocked until someone submits a newer version (the review returns to **Waiting for review**) and someone approves that version.
* **Approved**: the reviewer or an admin approved. The review closes, publishing is unblocked. n8n publishes the pinned version as the **requester** (the user who submitted the workflow for review), so publish history and audit trails attribute the publish to them, not to the approving reviewer. In rare cases, n8n can't publish the version automatically: the review stays approved and closed. In these cases, publish the version yourself using the **Publish** button in the editor.
* **Closed** (no approval): n8n can also close a review without approving it when there's nothing left to review, for example if the workflow is deleted, archived, or moved out of the project. Those reviews appear under **Reviews** > **Closed**, and **Activity** shows why the review closed.

### Publishing while a review is open

While a review is open (`Waiting for review` or `Changes requested`), n8n blocks publishing that workflow from the editor, the public API, and the n8n MCP server. You can still unpublish a workflow. That doesn't close the review or unblock publishing a new version.

A workflow can have only one open review at a time. While that review is open, choosing **Publish** or **Submit for review** again doesn't start a new review. Submit your newer saved version to the existing review instead (see [Submit later changes to an open review](#submit-later-changes-to-an-open-review)).

## Enable workflow reviews

Instance admins enable workflow reviews for the whole instance in **Settings** > **Security & policies**, under **Workflow reviews**.

For more about instance security policies, refer to [Manage security policies](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/manage-security-policies).

## Submit or update a review

A *version* is the snapshot of the workflow being reviewed and published. The *review* is the request and discussion around that version. You name each one separately, so the submit flow asks for both.

1. Open the workflow and select **Publish** (or press `Shift`+`P`).
2. Choose **Submit for review** instead of publishing directly.
3. On the first step, enter a **Version name** for the snapshot (required). Optionally describe the version changes.
4. On the next step, enter a **Review title** and assign a **Reviewer** (both required). Optionally add a **Review description**.
5. Select **Submit**.

The reviewer needs `workflow:read` on that workflow. They don't need `workflow:publish`.

n8n creates a review for the current saved version. Open it from **Reviews** in the left sidebar.

### Submit later changes to an open review

1. Open the workflow.
2. Select **Submit changes** from the review status in the editor header.
3. Enter a **Version name** for the newer version (required). Optionally describe the version changes.
4. Optionally update the **Review description**, then select **Submit**.

n8n updates the open review to that newer version. If the review was in **Changes requested**, it returns to **Waiting for review**.

### Review required preference

In the **Publish** menu, you can turn on **Review required** for the current workflow. When it's on, choosing **Publish** opens the submit-for-review modal for you instead of publishing directly.

Your browser stores this preference for that workflow. It isn't saved on the workflow itself, so it has no effect on other users. An open review still blocks publishing for everyone until that review closes.

## Review a submission

A review detail has two tabs:

* **Activity**: description, activity feed, and comments. Comments stay visible after the review closes. Comments aren't anchored to a specific node in this release.
* **Changes**: a visual workflow diff between the currently **Published** version and the version **In review**. The diff works like [workflow diffs for source control](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments/compare-versions).

People who can open the review can comment on **Activity** without deciding. To decide, the assigned reviewer, or a project admin or instance admin, can choose:

* **Approve**: closes the review and publishes the pinned version as the requester.
* **Request changes**: keeps the review open so editors can update the workflow and resubmit.

## Permissions

| Action | Who can do it |
| --- | --- |
| Enable or disable workflow reviews for the instance | Instance admins with access to **Settings** > **Security & policies** |
| Submit a workflow for review | Users with `workflow:publish` on that workflow |
| Update an open review with a newer version | Users with `workflow:publish` on that workflow |
| See that a review is in progress | Users who can open the workflow, including viewers and editors. They can't open review details unless they're listed below. |
| Open review details and appear in **Reviews** | The requester, authors on the review, the assigned reviewer, and project or instance admins. Admins see all reviews. |
| Appear as a reviewer | Users with at least `workflow:read` on that workflow |
| Approve or request changes | The assigned reviewer, or a project admin or instance admin. Authors can't decide unless they also have one of those roles. |

The **requester** is the user who submitted the workflow for review. **Authors** are the requester and anyone who later submitted a newer version to the same open review.

{% hint style="info" %}
**Cancelling reviews**

You can't currently cancel or withdraw an open review. n8n plans to add this functionality in a future release.
{% endhint %}

## Related resources

* [Save and publish workflows](../understand-workflows/save-and-publish-workflows.md)
* [View change history](view-change-history.md)
* [Compare changes with workflow diffs](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments/compare-versions)
* [Manage security policies](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/manage-security-policies)
* [See available roles](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles)
