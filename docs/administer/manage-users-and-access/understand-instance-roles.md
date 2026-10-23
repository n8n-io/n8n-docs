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

There are four built-in instance roles: Owner, Admin, Member, and Chat User. If these don't meet your needs, you can create [custom instance roles](set-permissions-and-roles-rbac/create-custom-instance-roles.md) with granular permissions.

{% hint style="info" %}
**Feature availability**

The **Admin** role is available on:

- **n8n Cloud:** Pro, Enterprise
- **Self-hosted:** Enterprise
{% endhint %}

The **Chat user** role is available on:

- **n8n Cloud:** Pro, Enterprise
- **Self-hosted:** Enterprise

The Chat user role requires the Chat feature to be enabled.
{% endhint %}

{% hint style="info" %}
**Instance roles and project roles**

n8n has two levels of roles. Instance roles control what a user can do across the entire instance. Project roles (part of [RBAC](set-permissions-and-roles-rbac/README.md)) control what a user can do within a specific project, and a user can have different project roles in different projects.
{% endhint %}

{% hint style="info" %}
**Create a Member role account for the owner**

n8n recommends that owners create a second account with the **Member** role for themselves. Owners can see and edit all workflows, credentials, and projects. However, there is no way to see who created a particular workflow, so there is a risk of overriding other people's work if you build and edit workflows as an owner.
{% endhint %}


| Permission | Owner | Admin | Member | Chat user |
| ---------- |------ | ----- | ------ | ---------
| Manage own email and password | ✅ | ✅ | ✅ | ✅ |
| Manage own workflows | ✅ | ✅ | ✅ | ✅ |
| View, create, and use tags | ✅ | ✅ | ✅ | ❌ |
| Delete tags | ✅ | ✅ | ❌ | ❌ |
| View and share all workflows | ✅ | ✅ | ❌ | ❌ |
| View, edit, and share all credentials | ✅ | ✅ | ❌ | ❌ |
| Set up and use [Source control](../use-source-control-and-environments/README.md) | ✅ | ✅ | ❌ | ❌ |
| Create [projects](set-permissions-and-roles-rbac/organize-work-in-projects.md) | ✅ | ✅ | ❌ | ❌ |
| View all projects | ✅ | ✅ | ❌ | ❌ |
| Add and remove users | ✅ | ✅ | ❌ | ❌ |
| Access the n8n Cloud console | ✅ | ❌ | ❌ | ❌ |

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## Chat user role
The Chat user role is for people who only need to use n8n through Chat. Chat users can't build workflows or access other n8n features.

**Chat users can:**

Send messages in Chat.
Create, edit, and delete their own Chat agents.
Run the workflows and agents that are shared with them in Chat.

**Chat users can't:**

Create, view, or edit workflows or credentials.
Create projects or view projects they don't belong to.
Create API keys.
Use some Chat tool types. Refer to the Chat documentation for details.
When the Chat feature is enabled, n8n opens Chat for Chat users after they sign in.

**Change a user's role to or from Chat user**

Changing the role of a user to Chat user has these effects:

- n8n removes the user from all projects they share with others. If the user is the only admin of a project, n8n blocks the change. Assign another admin to the project first.
- The user's personal project becomes read-only.
- n8n deletes all API keys of the user.
- Changing a Chat user to another role gives the user ownership of their personal project again. n8n doesn't restore the projects or API keys the user lost when they became a Chat user.

## Custom instance roles <a href="#custom-instance-roles" id="custom-instance-roles"></a>

If the built-in roles don't match your access needs, you can create custom instance roles with granular permissions. Custom instance roles let you grant specific instance-level capabilities (such as managing users, tags, or API keys) without giving full Admin access.

Refer to [Create custom instance roles](set-permissions-and-roles-rbac/create-custom-instance-roles.md) for instructions on creating and managing them.

## Related resources

* [Manage users and access](./)
* [Set up for Cloud](set-up-for-cloud.md)
* [Add and remove users](add-and-remove-users.md)
* [Set permissions and roles (RBAC)](set-permissions-and-roles-rbac/README.md)
* [Verify user identity](verify-user-identity/README.md)
* [Follow best practices](follow-best-practices.md)
