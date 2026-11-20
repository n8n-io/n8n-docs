---
description: User management in n8n
contentType: overview
nodeTitle: Manage users and access
originalFilePath: user-management/index.md
originalUrl: 'https://docs.n8n.io/user-management'
url: 'https://docs.n8n.io/administer/'
layout:
  description:
    visible: false
---

# Manage users and access <a href="#user-management" id="user-management"></a>

User management in n8n allows you to invite people to work in your n8n instance. It includes:

* [Verifying user identity](verify-user-identity/README.md) with two-factor authentication, LDAP, SAML, or OIDC
* [Adding and removing users](manage-users/add-and-remove-users.md)
* Four built-in [instance roles](set-permissions-and-roles-rbac/understand-instance-roles.md): **Owner**, **Admin**, **Member**, and **Chat user** (**Admin** and **Chat user** are available on n8n Cloud Pro, Enterprise, and self-hosted Enterprise), plus custom instance roles
* [Projects](organize-work-in-projects/README.md) to group workflows and credentials
* Three built-in [project roles](set-permissions-and-roles-rbac/understand-project-roles.md): **Project Admin**, **Project Editor**, and **Project Viewer**. These control what a user can do within one project, and a user can have a different role in each project. You can also create [custom project roles](set-permissions-and-roles-rbac/create-custom-project-roles.md)

{% hint style="info" %}
**Privacy**

The user management feature doesn't send personal information, such as email or username, to n8n.
{% endhint %}

<a href="#setup-guides" id="setup-guides"></a>To start, follow [Set up user management](manage-users/set-up-user-management.md). It covers n8n Cloud and self-hosted instances.

## In this section

* [Manage users](manage-users/README.md): set up user management, invite users, and delete users.
* [Organize work in projects](organize-work-in-projects/README.md): group workflows and credentials, add project members, and move work between projects.
* [Set permissions and roles (RBAC)](set-permissions-and-roles-rbac/README.md): control access with instance roles, project roles, and custom roles.
* [Verify user identity](verify-user-identity/README.md): require two-factor auth, or connect LDAP, SAML, or OIDC.
* [Control node availability](control-node-availability.md): block or allow nodes for the instance or a project.
* [Follow best practices](follow-best-practices.md): user management best practices.

## Related resources

* [Administer](../)
* [Use source control and environments](../use-source-control-and-environments/README.md)
* [Manage credentials](../manage-credentials/README.md)
* [Observe and log](../observe-and-log/README.md)
