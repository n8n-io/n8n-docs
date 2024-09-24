---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
pageType: howto
title: RBAC projects
description: Understand how n8n uses project for RBAC. Learn how to create and manage projects.
---

/// info | Feature availability
RBAC is available on all plans except the Community edition. Different plans have different numbers of projects and roles. Refer to n8n's [pricing page](https://n8n.io/pricing/){:target=_blank .external-link} for plan details.
///

n8n uses projects to group workflows and credentials, and assigns [roles](/user-management/rbac/role-types/) to users in each project. This means that a single user can have different roles in different projects, giving them different levels of access.

## Create a project

Instance owners and instance admins can create projects.

To create a project:

1. Select <span class="inline-image">![Plus icon](/_images/common-icons/plus.png)</span> **Add project**.
1. Fill out the project settings.
1. Select **Save**.

## Add and remove users in a project

Project admins can add and remove users.

To add a user to a project:

1. Select the project.
1. Select **Project settings**.
1. Under **Project members**, browse for users or search by username or email address.
1. Select the user you want to add.
1. Check the [role type](/user-management/rbac/role-type/) and change it if needed.
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

1. Select **Workflow menu** <span class="inline-image">![Workflow menu icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span> or **Credential menu** <span class="inline-image">![Workflow menu icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span> > **Move**.
1. Select the project or user you want to move to.
1. Select **Next**.
1. Confirm you understand the impact of the move: workflows may stop working if the credentials they need aren't available in the target project, and n8n removes any current individual sharing.
1. Select **Confirm move to new project**.

## Using external secrets in projects

To use [external secrets](/external-secrets/) in a project, you must have an [instance owner or instance admin](/user-management/account-types/) as a member of the project.
