---
contentType: overview
title: Role-based access control (RBAC)
description: Set up and use role-based access control (RBAC) in n8n.
nodeTitle: Set permissions and roles (RBAC)
originalFilePath: user-management/rbac/index.md
originalUrl: 'https://docs.n8n.io/user-management/rbac'
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac
layout:
  description:
    visible: false
---

# Role-based access control (RBAC) <a href="#role-based-access-control-rbac" id="role-based-access-control-rbac"></a>

RBAC in n8n controls what each user can do at two levels: instance roles across the instance, and project roles inside each project, where you group workflows and credentials.

{% hint style="info" %}
**Feature availability**

Which RBAC features you can use depends on your plan or edition:

- **Instance roles:** the Owner and Member roles are available on every plan and edition. The Admin and Chat user roles need a higher plan. Refer to [Understand instance roles](understand-instance-roles.md).
- **Projects and project roles:** team projects and project roles aren't available on the Community and Registered Community editions. On other plans, the number of projects and the project roles you can assign depend on the plan. Refer to [Organize work in projects](../organize-work-in-projects/README.md) and [Understand project roles](understand-project-roles.md).
- **Custom roles:** available on Enterprise only. Refer to [Create custom instance roles](create-custom-instance-roles.md) and [Create custom project roles](create-custom-project-roles.md).

Plans can change. See the [pricing page](https://n8n.io/pricing/) for the current details.
{% endhint %}

The two levels are:

* **Instance roles**: determine what a user can do across the entire instance. Built-in instance roles are Owner, Admin, Member, and Chat user. Refer to [Understand instance roles](understand-instance-roles.md).
* **Project roles**: determine what a user can do within a specific project. You group workflows and credentials into projects, and a user can have different project roles in different projects. Built-in project roles are Admin, Editor, and Viewer. Refer to [Understand project roles](understand-project-roles.md).

## Custom roles <a href="#custom-roles" id="custom-roles"></a>

Custom roles let you define granular permissions beyond the built-in roles. Instead of giving users full Admin access, you can create a role with only the capabilities they need.

n8n has two types of custom roles:

* **Custom instance roles** apply across your whole n8n instance. Use them for capabilities such as managing users, tags, API keys, or custom roles themselves. Refer to [Create custom instance roles](create-custom-instance-roles.md).
* **Custom project roles** apply within a specific project. Use them to control access to workflows, credentials, folders, and other project resources. Refer to [Create custom project roles](create-custom-project-roles.md).

## In this section

* [Understand instance roles](understand-instance-roles.md): the built-in Owner, Admin, Member, and Chat user roles.
* [Understand project roles](understand-project-roles.md): the built-in project roles available in n8n, and the access they have.
* [Create custom instance roles](create-custom-instance-roles.md): define permissions that apply across the entire n8n instance.
* [Create custom project roles](create-custom-project-roles.md): define permissions within a specific project.

## Related resources

* [Manage users and access](../)
* [Organize work in projects](../organize-work-in-projects/README.md)
* [Manage users](../manage-users/README.md)
* [Verify user identity](../verify-user-identity/README.md)
* [Follow best practices](../follow-best-practices.md)
