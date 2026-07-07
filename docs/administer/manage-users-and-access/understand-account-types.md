---
description: n8n account types
contentType: reference
nodeTitle: Understand account types
originalFilePath: user-management/account-types.md
originalUrl: 'https://docs.n8n.io/user-management/account-types'
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/understand-account-types
layout:
  description:
    visible: false
---

# Account types <a href="#account-types" id="account-types"></a>

There are three account types: owner, admin, and member. The account type affects the user permissions and access.

{% hint style="info" %}
**Feature availability**

To use admin accounts, you need a pro or enterprise plan.
{% endhint %}

{% hint style="info" %}
**Account types and role types**

Account types and role types are different things. Role types are part of [RBAC](set-permissions-and-roles-rbac/README.md). 

Every account has one type. The account can have different [role types](set-permissions-and-roles-rbac/see-available-roles.md) for different [projects](set-permissions-and-roles-rbac/organize-work-in-projects.md).
{% endhint %}

{% hint style="info" %}
**Create a member-level account for the owner**

n8n recommends that owners create a member-level account for themselves. Owners can see and edit all workflows, credentials, and projects. However, there is no way to see who created a particular workflow, so there is a risk of overriding other people's work if you build and edit workflows as an owner.
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

If the built-in account types don't match your access needs, you can create custom instance roles with granular permissions. Custom instance roles let you grant specific instance-level capabilities (such as managing users, tags, or API keys) without giving full Admin access.

Refer to [Create custom instance roles](set-permissions-and-roles-rbac/create-custom-instance-roles.md) for instructions on creating and managing them.
