---
pageType: howto
title: RBAC projects
description: Understand how n8n uses project for RBAC. Learn how to create and manage projects.
---

n8n uses projects to group workflows, and assigns [roles](/user-management/rbac/role-types/) to users in each project. This means that a single user can have different roles in different projects, giving them different levels of access.

/// info | Feature availability
RBAC is available on all plans except the Community edition. Different plans have different numbers of projects and roles:

* Starter: one project, with admin and editor roles.
* Pro: three projects, with admin and editor roles.
* Enterprise: unlimited projects, with admin, editor, and viewer roles.
///

## Create a project

Instance owners and instance admins can create projects.

To create a project:

1. Select <span class="inline-image">![Plus icon](/_images/common-icons/plus.png)</span> **Add project**.
1. Fill out the project settings.
1. Select **Save**.

## Add and remove users in a project

To add a user to a project:

1. Select the project.
1. Select **Settings**.
1. Under **Project members**, browse for users or search by username or email address.
1. Select the user you want to add.
1. Check the [role type](/user-management/rbac/role-type/) and change it if needed.
1. Select **Save**.

To remove a user from a project:

1. Select the project.
1. Select **Settings**.
1. In the role type dropdown for the user you want to remove, select **Remove access**.
1. [TODO: they probably need to save and have the option to cancel, but this currently isn't working]

## Delete a project

To delete a project:

1. Select the project.
1. Select **Settings**.
1. Select **Delete project**.
1. Choose what to do with the workflows and credentials. You can select:
	* **Transfer its workflows and credentials to another project**: n8n prompts you to choose a project to move the data to.
	* **Delete its workflows and credentials**: n8n prompts you to confirm that you want to delete all the data in the project.
