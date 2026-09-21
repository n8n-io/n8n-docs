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

# User management <a href="#user-management" id="user-management"></a>

User management in n8n allows you to invite people to work in your n8n instance. It includes:

* Login and password management
* Adding and removing users
* Three built-in [instance roles](understand-instance-roles.md): **Owner**, **Admin**, and **Member** (**Admin** is available on n8n Cloud Pro, Enterprise, and self-hosted Enterprise), plus custom instance roles

{% hint style="info" %}
**Privacy**

The user management feature doesn't send personal information, such as email or username, to n8n.
{% endhint %}

## Setup guides <a href="#setup-guides" id="setup-guides"></a>

This section contains most usage information for user management, and the [Cloud setup guide](set-up-for-cloud.md). If you self-host n8n, there are extra steps to configure your n8n instance. Refer to the [Self-hosted guide](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/user-management).

This section includes guides to configuring [LDAP](verify-user-identity/connect-ldap.md) and [SAML](verify-user-identity/use-saml/README.md) in n8n.

## In this section

* [Set up for Cloud](set-up-for-cloud.md): set up user management on n8n Cloud.
* [Add and remove users](add-and-remove-users.md): invite, remove, and manage users on your instance.
* [Understand instance roles](understand-instance-roles.md): the built-in Owner, Admin, and Member roles.
* [Set permissions and roles (RBAC)](set-permissions-and-roles-rbac/README.md): control access at the instance and project level.
* [Verify user identity](verify-user-identity/README.md): require two-factor auth, or connect LDAP, SAML, or OIDC.
* [Follow best practices](follow-best-practices.md): user management best practices.
