---
description: >-
  Use your personal credentials in team projects, and understand who can view,
  use, and edit a credential and who a workflow run acts as.
hidden: true
layout:
  description:
    visible: false
---

# Use personal credentials in projects

You can use your personal credentials in any team project you're a member of without sharing them, and only you can run workflows with them.

This page explains the levels of credential access, how personal credentials behave in team projects, what teammates see when a workflow uses someone else's credential, and who a workflow run acts as. To give other people or projects access to a credential, refer to [Share credentials securely](share-credentials-securely.md).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## Key terms

* **Personal credential:** a credential in your personal space, or a credential someone shared directly with you.
* **Project credential:** a credential that a team project holds, either because someone created it in the project or because someone shared it with the project.
* **Acting user:** the person a workflow run acts as. For a manual run, it's the person who selected **Execute**. For a triggered run (schedule, webhook, app event, and so on), it's the person who last published the workflow.

## Levels of credential access

The credential's **Sharing** tab shows two levels of access:

| Access level | What you can do |
| ------------ | --------------- |
| **Can view** | See that the credential exists and where it's used. You can't run or publish anything with it. |
| **Can use** | Run and publish workflows with the credential. You can't see or change its secret. |

When you share a credential with a person, n8n gives them the **Can use** role. To see and change its details, you need to own the credential, or have an [instance role](../manage-users-and-access/understand-instance-roles.md) that lets you edit all credentials. For credentials a team project holds, your [project role](../manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md) decides your access.

## Use personal credentials in team projects

You can select your own personal credentials in the workflows of any team project you're a member of. You don't need to share the credential with the project first.

When you open the credential selector on a node, n8n groups the credentials you can select:

* **Available to you:** your personal credentials.
* **Available in this project:** credentials the project holds.
* **Available to everyone:** credentials shared with every user on the instance.

Only you can run workflows with your personal credential in that project. Other project members can see that the workflow uses it, but they can't run or publish the workflow with it. To let the whole project use the credential, [share it with the project](share-credentials-securely.md#share-a-credential).

{% hint style="info" %}
**Agents use project credentials only**

Agents, including AI agents and the Slack and Microsoft Teams integrations, don't offer personal credentials yet. They can only use credentials the project holds.
{% endhint %}

## What teammates see when a workflow uses someone's personal credential

Teammates who can't use the credential see its name and owner on the node, for example **Jane's Slack account**. n8n disables **Execute** and **Publish** for them.

To run the workflow, they can switch the node to their own credential, or ask the owner to share it.

## Who a workflow run acts as

Every run acts as a person, and that person must be able to use the credentials the workflow needs.

* **Manual runs** act as the person who runs the workflow. That person must be able to use every credential in the workflow that the workflow's project doesn't hold.
* **Triggered runs** of a published workflow act as the person who last published it.

Credentials the project holds work for every run in that project. They keep working on a schedule even if the publisher's own access changes later.

Publishing a workflow requires access to every credential it uses. For how this affects publishing and what to do with older workflows, refer to [Who a published workflow runs as](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/save-and-publish-workflows#who-a-published-workflow-runs-as).

## Credential access for Owners and Admins

Instance Owners and Admins can view and share every credential on the instance. Their access to use a credential depends on where the workflow lives:

* **In their own personal space:** Owners and Admins can use any credential. The credential's **Sharing** tab shows **Can use in personal space** for their personal space.
* **In team projects:** their instance role doesn't let them use a member's personal credential that nobody shared with the project. They can see the credential on the node, but they can't run with it.

Refer to [Instance roles](../manage-users-and-access/understand-instance-roles.md) for the full list of Owner and Admin permissions.

## Execution data from credentials without access

If an execution used a credential a user can't use, n8n hides its data from them. The execution's status and timing stay visible. This includes data that came back from a sub-workflow that used the credential, even when the parent workflow doesn't use it itself. The same rules apply to executions read through the public API or the n8n MCP server.

## Related resources

* [Manage credentials](./)
* [Share credentials securely](share-credentials-securely.md)
* [End-user credentials](end-user-credentials.md)
* [Organize work in projects](../manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects.md)
