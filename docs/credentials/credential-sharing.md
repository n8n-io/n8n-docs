---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Share credentials within an organization.
contentType: howto
---

# Credential sharing


/// info | Feature availability
Available on all Cloud plans, and Enterprise self-hosted plans.
///

You can share a credential you created with other users in the same n8n workspace as you. The other users can then use the credential in their workflows. They can't access or edit the credential details.

Users can share credentials they created. Instance owners, and users with the admin role, can view and share all credentials in the instance. Refer to [Account types](/user-management/account-types/) for more information about owners and admins.

In [projects](/user-management/rbac/), all users have access to workflows and credentials belonging to projects they are part of.


## Share a credential

1. Open the left menu and select **Credentials**. n8n shows a list of your credentials.
2. Select the credential you want to share. n8n opens the credential modal.
3. Select **Sharing**.
4. In **Add people**, browse or search for the user you want to share the credential with.
5. Select a user.

## Remove access to a credential

To unshare a credential:

1. Open the left menu and select **Credentials**. n8n shows a list of your credentials.
2. Select the credential you want to share. n8n opens the credential modal.
3. Select **Sharing**.
4. Select **Options** <span class="inline-image">![Options menu icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span> on the user you want to remove.
5. Select **Remove**.
