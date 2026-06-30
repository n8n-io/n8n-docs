---
title: RBAC role types
description: 'Understand the RBAC roles available in n8n, and the access they have.'
contentType: reference
nodeTitle: See available roles
originalFilePath: user-management/rbac/role-types.md
originalUrl: 'https://docs.n8n.io/user-management/rbac/role-types'
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles
layout:
  description:
    visible: false
---

# RBAC role types <a href="#rbac-role-types" id="rbac-role-types"></a>

{% hint style="info" %}
**Feature availability**

* The Project Editor role is available on Pro Cloud and Self-hosted Enterprise plans. 
* The Project Viewer role is only available on Self-hosted Enterprise and Cloud Enterprise plans.
{% endhint %}

Within projects, there are three user roles: Admin, Editor, and Viewer. These roles control what the user can do in a project. A user can have different roles within different projects.

## Project Admin <a href="#project-admin" id="project-admin"></a>

A Project Admin role has the highest level of permissions. Project admins can:

* Manage project settings: Change name, delete project.
* Manage project members: Invite members and remove members, change members' roles.
* View, create, update, and delete any workflows, credentials, or executions within a project. 

## Project Editor <a href="#project-editor" id="project-editor"></a>

A Project Editor can view, create, update, and delete any workflows, credentials, or executions within a project. 

## Project Viewer <a href="#project-viewer" id="project-viewer"></a>

A Project Viewer is effectively a `read-only` role with access to all workflows, credentials, and executions within a project.

Viewers aren't able to manually execute any workflows that exist in a project. 

{% hint style="info" %}
**Role types and account types**

Role types and [account types](../understand-account-types.md) are different things. Every account has one type. The account can have different role types for different [projects](organize-work-in-projects.md).
{% endhint %}

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

\* Requires **Enable external secrets for project roles** to be enabled by an instance owner or admin. Refer to [Access for project roles](../../manage-credentials/use-external-secret-stores.md#access-for-project-roles). This is available from n8n version `2.13.0`.

[Variables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n/define-custom-variables) and [tags](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/tag-workflows) aren't affected by RBAC: they're global across the n8n instance.
