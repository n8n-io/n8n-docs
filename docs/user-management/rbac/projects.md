---
title: RBAC projects
description: Understand how n8n uses project for RBAC. Learn how to create and manage projects.
contentType: howto
---

/// info | Feature availability
RBAC is available on all plans except the Community edition. Different plans have different numbers of projects and roles. Refer to n8n's [pricing page](https://n8n.io/pricing/) for plan details.
///

n8n uses projects to group workflows and [credentials](/glossary.md#credential-n8n), and assigns [roles](/user-management/rbac/role-types.md) to users in each project. This means that a single user can have different roles in different projects, giving them different levels of access.

## Create a project

Instance owners and instance admins can create projects.

To create a project:

1. Select <span class="n8n-inline-image">![Plus icon](/_images/common-icons/plus.png)</span> **Add project**.
1. Fill out the project settings.
1. Select **Save**.

## Add and remove users in a project

Project admins can add and remove users.

To add a user to a project:

1. Select the project.
1. Select **Project settings**.
1. Under **Project members**, browse for users or search by username or email address.
1. Select the user you want to add.
1. Check the [role type](/user-management/rbac/role-types.md) and change it if needed.
1. Select **Save**.

To remove a user from a project:

1. Select the project.
1. Select **Project settings**.
1. In the role type dropdown for the user you want to remove, select **Remove access**.
1. Select **Save**.

## Delete a project

To delete a project:

1. Select the project.
1. Select **Project settings**.
1. Select **Delete project**.
1. Choose what to do with the workflows and credentials. You can select:
	* **Transfer its workflows and credentials to another project**: n8n prompts you to choose a project to move the data to.
	* **Delete its workflows and credentials**: n8n prompts you to confirm that you want to delete all the data in the project.

## Move workflows and credentials between projects or users

Workflow and credential owners can move workflows or credentials (changing ownership) to other users or projects they have access to.

/// warning | Moving revokes sharing
Moving workflows or credentials removes all existing sharing. Be aware that this could impact other workflows currently sharing these resources.
///

1. Select **Workflow menu** <span class="n8n-inline-image">![Workflow menu icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span> or **Credential menu** <span class="n8n-inline-image">![Workflow menu icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span> > **Move**.

	/// info | Moving workflows with credentials
	When moving a workflow with credentials you have permission to share, you can choose to share the credentials as well. This ensures that the workflow continues to have access to the credentials it needs to execute. n8n will note any credentials that can't be moved (credentials you don't have permission to share).
	///

1. Select the project or user you want to move to.
1. Select **Next**.
1. Confirm you understand the impact of the move: workflows may stop working if the credentials they need aren't available in the target project, and n8n removes any current individual sharing.
1. Select **Confirm move to new project**.

## Using external secrets in projects

To use [external secrets](/external-secrets.md) in a project, you must have an [instance owner or instance admin](/user-management/account-types.md) as a member of the project.
