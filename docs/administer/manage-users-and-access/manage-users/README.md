---
description: Set up user management, invite users, and delete users in n8n.
layout:
  description:
    visible: false
---

# Manage users

You manage who can access your n8n instance from the **Settings** > **Users** page, which lists all users, including ones with pending invitations.

{% hint style="info" %}
**Feature availability**

User management, including adding and removing users, is available on:

- **n8n Cloud:** Starter, Pro, Enterprise
- **Self-hosted:** Community, Registered Community, Business, Enterprise

Available from n8n 0.195.0.
{% endhint %}

## Who can manage users <a href="#who-can-manage-users" id="who-can-manage-users"></a>

Your [instance role](../set-permissions-and-roles-rbac/understand-instance-roles.md) decides whether you can add and remove users, and set up user management:

- **Owner and Admin:** can invite users, resend invitations, and delete users. On plans without the Admin role, only the owner can do these things.
- **Member and Chat user:** can't add or remove users.
- **Custom instance roles:** on Enterprise, you can give a role the **Members** > **Manage** permission to let its users invite, remove, and update users without making them Admins. Refer to [Create custom instance roles](../set-permissions-and-roles-rbac/create-custom-instance-roles.md).

The owner sets up user management for the first time. n8n doesn't let you delete the owner.

If SSO is your authentication method, your identity provider manages your users and n8n blocks invitations. Some SAML and OIDC setups that use SCIM are an exception. Refer to [Verify user identity](../verify-user-identity/README.md).

## In this section

* [Set up user management](set-up-user-management.md): set up user management on n8n Cloud or on a self-hosted instance.
* [Add and remove users](add-and-remove-users.md): invite users, resend pending invitations, and delete users.

## Related resources

* [Manage users and access](../)
* [Organize work in projects](../organize-work-in-projects/README.md)
* [Set permissions and roles (RBAC)](../set-permissions-and-roles-rbac/README.md)
* [Verify user identity](../verify-user-identity/README.md)
* [Control node availability](../control-node-availability.md)
* [Follow best practices](../follow-best-practices.md)
