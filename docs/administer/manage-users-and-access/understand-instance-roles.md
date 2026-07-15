---
description: n8n instance roles
contentType: reference
nodeTitle: Understand instance roles
originalFilePath: user-management/account-types.md
originalUrl: 'https://docs.n8n.io/user-management/account-types'
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/understand-instance-roles
layout:
  description:
    visible: false
---

# Instance roles <a href="#instance-roles" id="instance-roles"></a>

Every user has one instance role. The instance role determines the user's permissions and access across the n8n instance.

There are three built-in instance roles: Owner, Admin, and Member. If these don't meet your needs, you can create [custom instance roles](set-permissions-and-roles-rbac/create-custom-instance-roles.md) with granular permissions.

{% hint style="info" %}
**Feature availability**

The Admin role is available on Pro and Enterprise plans.
{% endhint %}

{% hint style="info" %}
**Instance roles and project roles**

n8n has two levels of roles. Instance roles control what a user can do across the entire instance. Project roles (part of [RBAC](set-permissions-and-roles-rbac/README.md)) control what a user can do within a specific project, and a user can have different project roles in different projects.
{% endhint %}

{% hint style="info" %}
**Create a Member role account for the owner**

n8n recommends that owners create a second account with the **Member** role for themselves. Owners can see and edit all workflows, credentials, and projects. However, there is no way to see who created a particular workflow, so there is a risk of overriding other people's work if you build and edit workflows as an owner.
{% endhint %}


| Permission | Owner | Admin | Member |
| ---------- |------ | ----- | ------ |
| Manage own email and password | ✅ | ✅ | ✅ |
| Manage own workflows | ✅ | ✅ | ✅ |
| View, create, and use tags | ✅ | ✅ | ✅ |
| Delete tags | ✅ | ✅ | ❌ |
| View and share all workflows | ✅ | ✅ | ❌ |
| View, edit, and share all credentials | ✅ | ✅ | ❌ |
| Set up and use [Source control](../use-source-control-and-environments/README.md) | ✅ | ✅ | ❌ |
| Create [projects](set-permissions-and-roles-rbac/organize-work-in-projects.md) | ✅ | ✅ | ❌ |
| View all projects | ✅ | ✅ | ❌ |
| Add and remove users | ✅ | ✅ | ❌ |
| Access the Cloud dashboard | ✅ | ❌ | ❌ |

## Custom instance roles <a href="#custom-instance-roles" id="custom-instance-roles"></a>

If the built-in roles don't match your access needs, you can create custom instance roles with granular permissions. Custom instance roles let you grant specific instance-level capabilities (such as managing users, tags, or API keys) without giving full Admin access.

Refer to [Create custom instance roles](set-permissions-and-roles-rbac/create-custom-instance-roles.md) for instructions on creating and managing them.
