---
title: Custom project roles
description: Create and manage custom project roles with granular permissions in n8n.
contentType: howto
nodeTitle: Create custom roles
originalFilePath: user-management/rbac/custom-roles.md
originalUrl: 'https://docs.n8n.io/user-management/rbac/custom-roles'
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/create-custom-roles
layout:
  description:
    visible: false
---

# Custom project roles <a href="#custom-project-roles" id="custom-project-roles"></a>

{% hint style="info" %}
**Feature availability**

Custom roles are available on Self-hosted Enterprise and Cloud Enterprise plans. Refer to n8n's [pricing page](https://n8n.io/pricing/) for plan details.

**Available from:** n8n version 1.122.0 (released November 24, 2025)

Secret vault scopes are available from n8n version `2.13.0`.
{% endhint %}

{% hint style="info" %}
**Instance roles vs project roles**

n8n has two types of roles:
* **Instance roles** ([account types](../understand-account-types.md)): Owner, Admin, and Member roles that span the entire n8n instance and all projects
* **Project roles**: Roles that apply within a specific project (Admin, Editor, Viewer, and custom roles)

Custom roles are project-level roles. They define permissions within individual projects, not across the entire instance.
{% endhint %}

Custom project roles allow you to create roles with specific permissions tailored to your team's needs. Unlike the built-in project roles (Admin, Editor, Viewer), custom roles let you define granular access to workflows, credentials, and other project resources.

## Create a custom role <a href="#create-a-custom-role" id="create-a-custom-role"></a>

Instance owners and instance admins can create custom roles.

To create a custom role:

1. Go to **Settings** > **Project roles**.
2. Select **Create role**.
3. Enter a role name and optional description.
4. Select the permissions (scopes) for this role:
	* **Workflow permissions**: View, execute, edit, create, publish, transfer, delete, or manage data redaction for workflows
	* **Credential permissions**: View, edit, create, share, unshare, transfer, or delete credentials
	* **Project permissions**: View, edit, or delete projects
	* **Folder permissions**: View, edit, create, transfer, or delete folders
	* **Execution permission**: Reveal redacted execution data
	* **Secret vault permissions**: View, create, edit, delete, or sync secret vaults of a project
	* **Secrets permission**: Use secrets in credentials
	* **Data table permissions**: View tables, view rows, edit tables, edit rows, create, or delete tables
	* **Project variable permissions**: View, edit, create, or delete project variables
	* **Source control**: Push to source control
5. Select **Create role**.

## Assign a custom role to users <a href="#assign-a-custom-role-to-users" id="assign-a-custom-role-to-users"></a>

Project admins can assign custom roles to project members. Custom roles apply only within the specific project where they're assigned. A user can have different roles in different projects.

To assign a custom role:

1. Select the project.
2. Select **Project settings**.
3. Under **Project members**, browse or search for users.
4. Select the user and choose the custom role from the dropdown.
5. Select **Save**.

{% hint style="info" %}
**Project-level permissions**

Custom role permissions only apply within the project where the role is assigned. To grant the same permissions across multiple projects, assign the custom role in each project individually.
{% endhint %}

## Edit a custom role <a href="#edit-a-custom-role" id="edit-a-custom-role"></a>

To modify an existing custom role:

1. Go to **Settings** > **Project roles**.
2. Find the custom role you want to edit.
3. Select the **three-dot menu** > **Edit**.
4. Update the role name, description, or permissions.
5. Select **Save changes**.

{% hint style="warning" %}
**Editing affects all assigned users**

Changes to a custom role immediately affect all users assigned to that role in any project. If the role is used across multiple projects, the permission changes apply everywhere the role is assigned.
{% endhint %}

## Duplicate a custom role <a href="#duplicate-a-custom-role" id="duplicate-a-custom-role"></a>

To create a new role based on an existing one:

1. Go to **Settings** > **Project roles**.
2. Find the role you want to duplicate.
3. Select the **three-dot menu** > **Duplicate**.
4. Modify the role name and permissions as needed.
5. Select **Create role**.

## Delete a custom role <a href="#delete-a-custom-role" id="delete-a-custom-role"></a>

To delete a custom role:

1. Go to **Settings** > **Project roles**.
2. Find the role you want to delete.
3. Select the **three-dot menu** > **Delete**.
4. Confirm the deletion.

{% hint style="info" %}
**Reassign users before deletion**

If users are assigned to this role, you must first reassign them to a different role before deleting it.
{% endhint %}

## Permission scopes reference <a href="#permission-scopes-reference" id="permission-scopes-reference"></a>

Custom roles use permission scopes to define what users can do within a project. Each scope below matches a checkbox in the **Project roles** editor. The section headings match the editor's section names; the scope codes are what you'll see in API responses and audit logs.

{% hint style="info" %}
**Automatically granted scopes**

n8n pairs some scopes together, so they don't appear as separate checkboxes:

* Granting `<resource>:read` also grants the matching list scope for that resource (for example, `workflow:read` grants `workflow:list`).
* Granting `workflow:publish` also grants `workflow:unpublish`.
{% endhint %}

### Workflow scopes <a href="#workflow-scopes" id="workflow-scopes"></a>
* `workflow:create` - Create new workflows
* `workflow:read` - View workflow details
* `workflow:update` - Edit workflows
* `workflow:execute` - Execute workflows
* `workflow:publish` - Publish workflows (also grants `workflow:unpublish`)
* `workflow:delete` - Delete workflows
* `workflow:move` - Transfer workflows between projects
* `workflow:enableRedaction` - Turn on data redaction for a workflow (refer to [Execution data redaction](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/redact-execution-data))
* `workflow:disableRedaction` - Turn off data redaction for a workflow (refer to [Execution data redaction](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/redact-execution-data))

### Credential scopes <a href="#credential-scopes" id="credential-scopes"></a>
* `credential:create` - Create new credentials
* `credential:read` - View credential details
* `credential:update` - Edit credentials
* `credential:delete` - Delete credentials
* `credential:move` - Transfer credentials between projects
* `credential:share` - Share credentials with other users
* `credential:unshare` - Remove credential sharing

### Project scopes <a href="#project-scopes" id="project-scopes"></a>
* `project:read` - View project details
* `project:update` - Edit project settings
* `project:delete` - Delete projects

### Folder scopes <a href="#folder-scopes" id="folder-scopes"></a>
* `folder:create` - Create new folders
* `folder:read` - View folder contents
* `folder:update` - Rename folders
* `folder:delete` - Delete folders
* `folder:move` - Transfer folders

### Execution scopes <a href="#execution-scopes" id="execution-scopes"></a>
* `execution:reveal` - Reveal redacted execution data (refer to [Execution data redaction](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/redact-execution-data))

### Secret vault scopes <a href="#secret-vault-scopes" id="secret-vault-scopes"></a>
The scope codes use the `externalSecretsProvider` prefix. The role editor lists this section as **Secrets vaults**.

* `externalSecretsProvider:create` - Create new secret vaults in a project
* `externalSecretsProvider:read` - View secret vaults in a project
* `externalSecretsProvider:update` - Edit secret vault configuration
* `externalSecretsProvider:delete` - Delete secret vaults from a project
* `externalSecretsProvider:sync` - Reload a vault's secrets

### Secrets scope <a href="#secrets-scope" id="secrets-scope"></a>
The scope code uses the `externalSecret` prefix. The role editor lists this section as **Secrets**.

* `externalSecret:list` - Use secrets in credentials

### Data table scopes <a href="#data-table-scopes" id="data-table-scopes"></a>
* `dataTable:create` - Create new data tables
* `dataTable:read` - View data table schema
* `dataTable:update` - Edit data table schema
* `dataTable:delete` - Delete data tables
* `dataTable:readRow` - Read rows from data tables
* `dataTable:writeRow` - Insert or update rows in data tables

### Project variable scopes <a href="#project-variable-scopes" id="project-variable-scopes"></a>
* `projectVariable:create` - Create new variables
* `projectVariable:read` - View variable values
* `projectVariable:update` - Edit variable values
* `projectVariable:delete` - Delete variables

### Source control scopes <a href="#source-control-scopes" id="source-control-scopes"></a>
* `sourceControl:push` - Push changes to source control

## Common custom role examples <a href="#common-custom-role-examples" id="common-custom-role-examples"></a>

These are example custom project roles you can create for common use cases. Remember that these roles apply within individual projects, not across your entire n8n instance.

### Workflow developer <a href="#workflow-developer" id="workflow-developer"></a>
A role for users who work only with workflows:
* `workflow:create`, `workflow:read`, `workflow:update`, `workflow:execute`, `workflow:delete`
* `credential:read` (view credentials but not edit them)
* `project:read`

### Credential manager <a href="#credential-manager" id="credential-manager"></a>
A role for users who manage credentials:
* `credential:create`, `credential:read`, `credential:update`, `credential:delete`, `credential:share`
* `workflow:read` (view workflows to understand credential usage)
* `project:read`

### Secrets user <a href="#secrets-user" id="secrets-user"></a>
A role for users who use external secrets in credentials but don't manage vaults:
* `externalSecret:list` (use secrets in credential expressions)
* `credential:create`, `credential:read`, `credential:update` (manage credentials with secrets)
* `workflow:read`
* `project:read`

### Workflow publisher <a href="#workflow-publisher" id="workflow-publisher"></a>
A role for users who can publish workflows without full edit access:
* `workflow:read`, `workflow:publish`
* `credential:read`
* `project:read`

{% hint style="info" %}
**Combining scopes**

You can combine any scopes to create roles that match your specific needs. Consider the principle of least privilege: grant only the permissions users need to perform their tasks.
{% endhint %}
