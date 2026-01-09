---
title: Custom project roles
description: Create and manage custom project roles with granular permissions in n8n.
contentType: howto
---

# Custom project roles

/// info | Feature availability
Custom roles are available on Self-hosted Enterprise and Cloud Enterprise plans. Refer to n8n's [pricing page](https://n8n.io/pricing/) for plan details.

**Available from:** n8n version 1.122.0 (released November 24, 2025)
///

/// note | Instance roles vs project roles
n8n has two types of roles:
* **Instance roles** ([account types](/user-management/account-types.md)): Owner, Admin, and Member roles that span the entire n8n instance and all projects
* **Project roles**: Roles that apply within a specific project (Admin, Editor, Viewer, and custom roles)

Custom roles are project-level roles. They define permissions within individual projects, not across the entire instance.
///

Custom project roles allow you to create roles with specific permissions tailored to your team's needs. Unlike the built-in project roles (Admin, Editor, Viewer), custom roles let you define granular access to workflows, credentials, and other project resources.

## Create a custom role

Instance owners and instance admins can create custom roles.

To create a custom role:

1. Go to **Settings** > **Project roles**.
2. Select **Create role**.
3. Enter a role name and optional description.
4. Select the permissions (scopes) for this role:
	* **Workflow permissions**: Create, read, update, publish, delete, list, execute, move, or share workflows
	* **Credential permissions**: Create, read, update, delete, list, move, or share credentials
	* **Project permissions**: List, read, update, or delete projects
	* **Folder permissions**: Create, read, update, delete, list, or move folders
	* **Data table permissions**: Create, read, update, delete, list project tables, read/write rows
	* **Project variable permissions**: Create, read, update, delete, or list project variables
	* **Source control**: Push to source control
5. Select **Create role**.

## Assign a custom role to users

Project admins can assign custom roles to project members. Custom roles apply only within the specific project where they're assigned. A user can have different roles in different projects.

To assign a custom role:

1. Select the project.
2. Select **Project settings**.
3. Under **Project members**, browse or search for users.
4. Select the user and choose the custom role from the dropdown.
5. Select **Save**.

/// note | Project-level permissions
Custom role permissions only apply within the project where the role is assigned. To grant the same permissions across multiple projects, assign the custom role in each project individually.
///

## Edit a custom role

To modify an existing custom role:

1. Go to **Settings** > **Project roles**.
2. Find the custom role you want to edit.
3. Select the **three-dot menu** > **Edit**.
4. Update the role name, description, or permissions.
5. Select **Save changes**.

/// warning | Editing affects all assigned users
Changes to a custom role immediately affect all users assigned to that role in any project. If the role is used across multiple projects, the permission changes apply everywhere the role is assigned.
///

## Duplicate a custom role

To create a new role based on an existing one:

1. Go to **Settings** > **Project roles**.
2. Find the role you want to duplicate.
3. Select the **three-dot menu** > **Duplicate**.
4. Modify the role name and permissions as needed.
5. Select **Create role**.

## Delete a custom role

To delete a custom role:

1. Go to **Settings** > **Project roles**.
2. Find the role you want to delete.
3. Select the **three-dot menu** > **Delete**.
4. Confirm the deletion.

/// note | Reassign users before deletion
If users are assigned to this role, you must first reassign them to a different role before deleting it.
///

## Permission scopes reference

Custom roles use permission scopes to define what users can do within a project. Here are the available scopes by resource:

### Workflow scopes
* `workflow:create` - Create new workflows
* `workflow:read` - View workflow details
* `workflow:update` - Edit workflows
* `workflow:publish` - Publish and unpublish workflows
* `workflow:delete` - Delete workflows
* `workflow:list` - View workflows in project
* `workflow:execute` - Manually execute workflows
* `workflow:execute-chat` - Execute workflows via chat interface
* `workflow:move` - Move workflows between projects
* `workflow:share` - Share workflows with other users

### Credential scopes
* `credential:create` - Create new credentials
* `credential:read` - View credential details
* `credential:update` - Edit credentials
* `credential:delete` - Delete credentials
* `credential:list` - View credentials in project
* `credential:move` - Move credentials between projects
* `credential:share` - Share credentials with other users

### Project scopes
* `project:list` - View available projects
* `project:read` - View project details
* `project:update` - Edit project settings (Admin only)
* `project:delete` - Delete projects (Admin only)

### Folder scopes
* `folder:create` - Create new folders
* `folder:read` - View folder contents
* `folder:update` - Rename folders
* `folder:delete` - Delete folders
* `folder:list` - View folders in project
* `folder:move` - Move folders

### Data table scopes
* `dataTable:create` - Create new data tables
* `dataTable:read` - View data table schema
* `dataTable:update` - Modify data table schema
* `dataTable:delete` - Delete data tables
* `dataTable:listProject` - View data tables in project
* `dataTable:readRow` - Read rows from data tables
* `dataTable:writeRow` - Insert or update rows in data tables

### Project variable scopes
* `projectVariable:list` - View project variables
* `projectVariable:read` - View variable values
* `projectVariable:create` - Create new variables
* `projectVariable:update` - Edit variable values
* `projectVariable:delete` - Delete variables

### Source control scopes
* `sourceControl:push` - Push changes to source control

## Common custom role examples

These are example custom project roles you can create for common use cases. Remember that these roles apply within individual projects, not across your entire n8n instance.

### Workflow Developer
A role for users who work only with workflows:
* `workflow:create`, `workflow:read`, `workflow:update`, `workflow:delete`, `workflow:list`, `workflow:execute`
* `credential:read`, `credential:list` (view credentials but not modify)
* `project:list`, `project:read`

### Credential Manager
A role for users who manage credentials:
* `credential:create`, `credential:read`, `credential:update`, `credential:delete`, `credential:list`, `credential:share`
* `workflow:read`, `workflow:list` (view workflows to understand credential usage)
* `project:list`, `project:read`

### Workflow Publisher
A role for users who can publish workflows without full edit access:
* `workflow:read`, `workflow:list`, `workflow:publish`
* `credential:read`, `credential:list`
* `project:list`, `project:read`

### Read-Only with Execute
A role for users who can view and run workflows but not modify them:
* `workflow:read`, `workflow:list`, `workflow:execute`
* `credential:read`, `credential:list`
* `project:list`, `project:read`

/// note | Combining scopes
You can combine any scopes to create roles that match your specific needs. Consider the principle of least privilege: grant only the permissions users need to perform their tasks.
///
