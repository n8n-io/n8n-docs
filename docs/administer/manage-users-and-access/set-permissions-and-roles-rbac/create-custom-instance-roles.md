---
title: Custom instance roles
description: Create and manage custom instance roles with granular permissions in n8n.
contentType: howto
nodeTitle: Create custom instance roles
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/create-custom-instance-roles
layout:
  description:
    visible: false
---

# Custom instance roles <a href="#custom-instance-roles" id="custom-instance-roles"></a>

{% hint style="info" %}
**Feature availability**

Custom instance roles are available on Self-hosted Enterprise and Cloud Enterprise plans. Refer to n8n's [pricing page](https://n8n.io/pricing/) for plan details.

**Available from:** n8n version 2.30.0 (released July 7, 2026)
{% endhint %}

{% hint style="info" %}
**Instance roles vs project roles**

n8n has two types of custom roles:

* **Custom instance roles**: Roles that apply across the entire n8n instance. Assign them to users who need specific instance-level capabilities regardless of which project they're in.
* **Custom project roles**: Roles that apply within a specific project. Refer to [Create custom project roles](set-permissions-and-roles-rbac/create-custom-roles.md).
{% endhint %}

Custom instance roles let you grant users specific instance-level capabilities without giving them full Admin access. Unlike the built-in account types (Owner, Admin, Member), custom instance roles let you define granular permissions for instance settings, user management, and other instance-wide resources.

## Create a custom instance role <a href="#create-a-custom-instance-role" id="create-a-custom-instance-role"></a>

Instance owners and instance admins can create custom instance roles.

To create a custom instance role:

1. Go to **Settings** > **Roles** > **Instance roles**.
2. Select **Create role**.
3. Enter a role name and optional description.
4. Optionally, select a **Preset** (**Admin**, **Member**) to pre-fill permissions based on a built-in account type, then adjust as needed.
5. Select the permissions for this role:
   * **Instance settings** > **Manage**: View and change instance-wide settings
   * **Members** > **Manage**: Invite, remove, and update users across the instance
   * **Roles** > **Manage project roles**: Create, edit, and delete custom project roles only
   * **Roles** > **Manage**: Create, edit, and delete all custom roles (instance and project). Selecting this automatically includes **Manage project roles**.
   * **API keys** > **Manage own**: Create and delete the user's own API keys
   * **API keys** > **Manage others**: View and delete other users' API keys. Automatically includes **Manage own**.
   * **Tags** > **View**: View all tags
   * **Tags** > **Manage**: Create, edit, and delete tags
   * **Projects** > **Create**: Create new projects
   * **Insights** > **View**: View instance-level insights
6. Select **Save**.

## Assign a custom instance role to users <a href="#assign-a-custom-instance-role-to-users" id="assign-a-custom-instance-role-to-users"></a>

Users with the **Roles: Manage** permission can assign custom instance roles. A user can hold both a built-in account type (Owner, Admin, Member) and one or more custom instance roles at the same time.

To assign a custom instance role:

1. Go to **Settings** > **Users**.
2. Find the user you want to update.
3. Select the user's current role to open the role dropdown.
4. Under **Custom roles**, select the role you want to assign.

## Edit a custom instance role <a href="#edit-a-custom-instance-role" id="edit-a-custom-instance-role"></a>

To modify an existing custom instance role:

1. Go to **Settings** > **Roles** > **Instance roles**.
2. Find the custom role you want to edit.
3. Select the **three-dot menu** > **Edit**.
4. Update the role name, description, or permissions.
5. Select **Save changes**.

{% hint style="warning" %}
**Editing affects all assigned users**

Changes to a custom instance role immediately affect all users assigned to that role across the entire instance.
{% endhint %}

## Duplicate a custom instance role <a href="#duplicate-a-custom-instance-role" id="duplicate-a-custom-instance-role"></a>

To create a new role based on an existing one:

1. Go to **Settings** > **Roles** > **Instance roles**.
2. Find the role you want to duplicate.
3. Select the **three-dot menu** > **Duplicate**.
4. Modify the role name and permissions as needed.
5. Select **Create role**.

## Delete a custom instance role <a href="#delete-a-custom-instance-role" id="delete-a-custom-instance-role"></a>

To delete a custom instance role:

1. Go to **Settings** > **Roles** > **Instance roles**.
2. Find the role you want to delete.
3. Select the **three-dot menu** > **Delete**.
4. Confirm the deletion.

{% hint style="info" %}
**Reassign users before deletion**

If users are assigned to this role, reassign them to a different role before deleting it.
{% endhint %}

## Permissions reference <a href="#permissions-reference" id="permissions-reference"></a>

The table below describes each permission group and its checkboxes as they appear in the **Instance roles** editor.

| Group | Checkbox | What it allows |
| ----- | -------- | -------------- |
| Instance settings | Manage | View and change instance-wide settings |
| Members | Manage | Invite, remove, and update users across the instance |
| Roles | Manage project roles | Create, edit, duplicate, delete, and assign custom project roles only |
| Roles | Manage | Create, edit, duplicate, delete, and assign all custom roles (instance and project). Automatically includes **Manage project roles**. |
| API keys | Manage own | Create and delete the user's own API keys |
| API keys | Manage others | View and delete other users' API keys. Automatically includes **Manage own**. |
| Tags | View | View all tags |
| Tags | Manage | Create, edit, and delete tags |
| Projects | Create | Create new projects |
| Insights | View | View instance-level insights and usage data |

{% hint style="warning" %}
**Privilege escalation risk**

Combining **Roles: Manage** with **Members: Manage** creates a privilege escalation risk. A user with both permissions can assign any custom role (including their own) to any user, effectively granting themselves or others elevated access without Owner or Admin approval. Only assign this combination to fully trusted users.
{% endhint %}

