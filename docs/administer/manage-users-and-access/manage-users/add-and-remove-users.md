---
contentType: howto
nodeTitle: Add and remove users
originalFilePath: user-management/manage-users.md
originalUrl: 'https://docs.n8n.io/user-management/manage-users'
url: 'https://docs.n8n.io/administer/manage-users-and-access/manage-users/add-and-remove-users'
layout:
  description:
    visible: false
---

# Add and remove users <a href="#manage-users" id="manage-users"></a>

{% hint style="info" %}
**Feature availability**

User management is available from n8n 0.195.0. For the plans and editions that include it, refer to [Manage users](./).

You must be an instance owner or instance admin to add and remove users. On Enterprise, custom instance roles with the **Members** > **Manage** permission can too.
{% endhint %}

The **Settings** > **Users** page shows all users, including ones with pending invitations.

## Invite a user <a href="#invite-a-user" id="invite-a-user"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/8qoOEjsLz4RnydVBogNy/" %}

## Resend an invitation to a pending user <a href="#resend-an-invitation-to-a-pending-user" id="resend-an-invitation-to-a-pending-user"></a>

Click the menu icon by the user, then click **Resend invite**.

## Delete a user <a href="#delete-a-user" id="delete-a-user"></a>

1. Open the **three-dot menu** for the user you want to delete and select **Delete user**.
2. Confirm you want to delete them.
3. If they're an active user, n8n asks what should happen to their data. Choose one of the following:
   * **Transfer their workflows, credentials and data tables to another user or project**: n8n prompts you to choose the user or project to move the data to.
   * **Delete their workflows, credentials and data tables**: n8n permanently deletes the data.

{% hint style="warning" %}
**Deleting a user with the API**

When you delete a user with the API (`DELETE /users/{userId}`), n8n permanently deletes their data unless you pass the `transferId` query parameter. Set `transferId` to the ID of the project to transfer the data to. Refer to the [API reference](https://docs.n8n.io/connect/n8n-api/access-and-organization/users) for full, up-to-date information.
{% endhint %}

## Related resources

* [Manage users](./)
* [Set up user management](set-up-user-management.md)
* [Understand instance roles](../set-permissions-and-roles-rbac/understand-instance-roles.md)
