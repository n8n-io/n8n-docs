---
title: Understand project roles
description: 'Understand the project roles available in n8n, and the access they have.'
contentType: reference
nodeTitle: Understand project roles
originalFilePath: user-management/rbac/role-types.md
originalUrl: 'https://docs.n8n.io/user-management/rbac/role-types'
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/understand-project-roles
layout:
  description:
    visible: false
---

# Understand project roles <a href="#understand-project-roles" id="understand-project-roles"></a>

Project roles control what a user can do inside a single [project](../organize-work-in-projects/README.md). A user has one role in each project they belong to, and that role can differ between projects. For example, a user can be a Project Admin in one project and a Project Viewer in another.

n8n has three built-in project roles: Admin, Editor, and Viewer. On Enterprise, you can also create [custom project roles](create-custom-project-roles.md) with more granular permissions. Project roles are separate from [instance roles](understand-instance-roles.md), which control what a user can do across the whole instance.

{% hint style="info" %}
**Feature availability**

The **Project Admin** role is available on:

- **n8n Cloud:** Starter, Pro, Enterprise
- **Self-hosted:** Business, Enterprise

The **Project Editor** role is available on:

- **n8n Cloud:** Pro, Enterprise
- **Self-hosted:** Business, Enterprise

The **Project Viewer** role is available on:

- **n8n Cloud:** Enterprise
- **Self-hosted:** Enterprise

No project roles are available on the Community and Registered Community editions.
{% endhint %}

## Project Admin <a href="#project-admin" id="project-admin"></a>

A Project Admin role has the highest level of permissions. Project admins can:

* Manage project settings: Change name, delete project.
* Manage project members: Invite members and remove members, change members' roles.
* View, create, update, and delete any workflows, credentials, or executions within a project. 
* Create [end-user credentials](../../manage-credentials/end-user-credentials.md). By default, only project admins can create this credential type, but you can grant it to other users through custom roles.

## Project Editor <a href="#project-editor" id="project-editor"></a>

A Project Editor can view, create, update, and delete any workflows, credentials, or executions within a project.

## Project Viewer <a href="#project-viewer" id="project-viewer"></a>

A Project Viewer is effectively a `read-only` role with access to all workflows, credentials, and executions within a project.

Viewers aren't able to manually execute any workflows that exist in a project. 

## Assign a project role <a href="#assign-a-project-role" id="assign-a-project-role"></a>

Project admins can assign a role to each project member. You can assign only the roles that your plan or edition includes.

To assign a project role:

1. Select the project.
2. Select **Project settings**.
3. Under **Project members**, browse for users or search by username or email address.
4. Select the user and choose a role from the dropdown.
5. Select **Save**.

To assign a role when you add a user to a project, refer to [Create and manage projects](../organize-work-in-projects/create-and-manage-projects.md#add-and-remove-users-in-a-project). To assign a custom role, refer to [Create custom project roles](create-custom-project-roles.md#assign-a-custom-role-to-users).

## Permissions by role <a href="#permissions-by-role" id="permissions-by-role"></a>

| Permission | Admin | Editor | Viewer | 
| ---------- |------ | ------ | ------ | 
| View workflows in the project | ✅ | ✅ | ✅ |
| View credentials in the project | ✅ | ✅ | ✅ |
| View executions | ✅ | ✅ | ✅ | 
| Edit credentials and workflows | ✅ | ✅ | ❌ | 
| Add workflows and credentials | ✅ | ✅ | ❌ | 
| Execute workflows | ✅ | ✅ | ❌ | 
| Manage members | ✅ | ❌ | ❌ | 
| Modify the project | ✅ | ❌ | ❌ | 
| Use external secrets in credentials | ✅* | ✅* | ❌ |
| Manage project secret vaults | ✅* | ❌ | ❌ |

\* Requires **Enable external secrets for project roles** to be enabled by an instance owner or admin. Refer to [Access for project roles](../../manage-credentials/use-external-secret-stores.md#access-for-project-roles). The **Enable external secrets for project roles** setting is available from n8n 2.13.0.

Project roles apply to the credentials the project holds. A project role doesn't let you use another member's personal credential in a project workflow. Only the credential's owner, or people they share it with, can run or publish with it. Refer to [Use personal credentials in projects](../../manage-credentials/use-personal-credentials-in-projects.md).

[Variables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n/define-custom-variables) and [tags](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/tag-workflows) aren't affected by RBAC: they're global across the n8n instance.

## Related resources

* [Set permissions and roles (RBAC)](./)
* [Organize work in projects](../organize-work-in-projects/README.md)
* [Custom roles](README.md#custom-roles)
