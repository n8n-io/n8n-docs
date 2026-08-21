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

Workflow reviews are available from n8n 2.36.6. An instance admin must enable the feature in **Settings** > **Security & policies**.
{% endhint %}

{% hint style="info" %}
**Preview status**

Workflow reviews are in Preview. This page describes the first release so you can plan how your team will use it, and the details may change before general availability.
{% endhint %}

Workflow reviews let your team approve a specific [workflow version](view-change-history.md) before it's published. From **Publish**, choose **Submit for review** instead of publishing directly, and assign a reviewer. On approval, n8n publishes that version automatically.

Reviews are optional after you enable the feature. You can still publish directly unless that workflow already has an open review.

n8n doesn't send email or other external notifications when someone is assigned as reviewer or when changes are requested. Check **Reviews** in the left sidebar for requests that need your attention.

## How reviews work

A review pins one workflow to one saved version. Each workflow can have at most one open review at a time. You can keep editing while a review is open. New saves create newer versions and don't change the pinned review until someone submits those changes to it.

### What a review covers

A review covers the contents of one workflow: its nodes and connections, as captured in the pinned saved version. The visual diff and the approval only apply to those contents.

A review doesn't cover the resources the workflow depends on. These aren't part of the diff, aren't gated by approval, and take effect immediately whether or not a review is open:

* **Workflow settings**, such as the timezone, error workflow, and execution order.
* **Credentials** the workflow uses.
* **Variables**.
* **Data tables**.
* **Sub-workflows** the workflow calls. Each sub-workflow is its own workflow with its own review, if any.

{% hint style="warning" %}
Changes to these resources apply to the published workflow without review, even while a review is open.
{% endhint %}

### Review statuses

* **Waiting for review**: the pinned version is waiting for a decision. Publishing is blocked.
* **Changes requested**: the reviewer asked for updates. Publishing stays blocked until someone submits a newer version (the review returns to **Waiting for review**) and that version is approved.
* **Approved**: the reviewer or an admin approved. The review closes, publishing isn't blocked, and n8n publishes the pinned version as the **requester** (the user who submitted the review), so publish history and audit trails attribute the publish to them, not to the approving reviewer. If auto-publish fails, the review stays approved and closed; publish again from the editor.
* **Closed** (no approval): n8n can also close a review without approving it when there's nothing left to review, for example if the workflow is deleted, archived, or moved out of the project. Those reviews appear under **Reviews** → **Closed**, and Activity shows why the review closed.

### Publishing while a review is open

While a review is open (`Waiting for review` or `Changes requested`), n8n blocks publishing that workflow from the editor, public API and MCP. You can still unpublish. Unpublishing doesn't close the review or unblock publishing a new version.

You can't cancel or withdraw an open review in this release. To unblock publishing without an approval, an instance admin can turn off workflow reviews for the instance. That removes review UI and APIs and lifts the publish gate. Otherwise the assigned reviewer, or a project or instance admin, must approve (or request changes, then approve after you resubmit).

A workflow can have only one open review at a time. While that review is open, choosing **Publish** or **Submit for review** again doesn't start a new review. Submit your newer saved version to the existing review instead (see [Submit later changes to an open review](#submit-later-changes-to-an-open-review)).

## Enable workflow reviews

Instance admins enable workflow reviews for the whole instance in **Settings** > **Security & policies**, under **Workflow reviews**.

For more about instance security policies, refer to [Manage security policies](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/manage-security-policies).

## Submit or update a review

1. Open the workflow and select **Publish** (or press `Shift` + `P`).
2. Choose **Submit for review** instead of publishing directly.
3. Enter a **Review title** and assign a **Reviewer** (both required). Optionally add a **Description**.
4. Select **Submit**.

The reviewer needs `workflow:read` on that workflow. They don't need `workflow:publish`.

n8n creates a review for the current saved version. Open it from **Reviews** in the left sidebar.

### Submit later changes to an open review

1. Open the workflow.
2. Select **Submit changes** from the review status in the editor header.
3. Select **Submit**.

n8n updates the open review to that newer version. If the review was in **Changes requested**, it returns to **Waiting for review**.

### Review required preference

In the **Publish** menu, you can turn on **Review required** for the current workflow. When it's on, choosing **Publish** opens the submit-for-review modal for you instead of publishing directly.

Your browser stores this preference for that workflow. It isn't saved on the workflow itself, so it has no effect on other users. An open review still blocks publishing for everyone until that review closes.

## Review a submission

A review detail has two tabs:

* **Activity**: description, activity feed, and comments. People who can open the review can comment. Comments stay visible after the review closes. Comments aren't anchored to a specific node in this release.
* **Changes**: a visual workflow diff between the currently **Published** version and the version **In review**. The diff works like [workflow diffs for source control](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments/compare-versions).

Then the assigned reviewer, or a project admin or instance admin, can choose:

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

The **requester** is the user who submitted the review. **Authors** are the requester and anyone who later submitted a newer version to the same open review.

## Related resources

* [Save and publish workflows](../understand-workflows/save-and-publish-workflows.md)
* [View change history](view-change-history.md)
* [Compare changes with workflow diffs](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/use-source-control-and-environments/compare-versions)
* [Manage security policies](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/manage-security-policies)
* [See available roles](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles)
