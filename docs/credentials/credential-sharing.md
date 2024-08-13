---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Share credentials within an organization.
contentType: howto
---

# Credential sharing


/// info | Feature availability
Available on all Cloud plans, and Enterprise self-hosted plans.
///

You can share a credential directly with other users to use in their workflows. Or into a project for all members of a project to use in workflows inside that project. Any users accessing a shared credential won't be able to access or edit the credential details.

Users can share credentials they created and project admins can share credentials created inside a project. Instance owners, and users with the instance admin role, can view and share all credentials in the instance. Refer to [Account types](/user-management/account-types/) for more information about owners and admins.

In [projects](/user-management/rbac/), all users have access to workflows and credentials belonging to projects they're part of.


## Share a credential

1. Open the left menu and select **Credentials**. n8n shows a list of your credentials.
2. Select the credential you want to share. n8n opens the credential modal.
3. Select **Sharing**.
4. Browse or search for the user(s) or projects(s) you want to share a credential with.
5. Select a user or project.
6. **Save**.

## Remove access to a credential

To unshare a credential:

1. Open the left menu and select **Credentials**. n8n shows a list of your credentials.
2. Select the credential you want to share. n8n opens the credential modal.
3. Select **Sharing**.
4. Select **Options** <span class="inline-image">![Options menu icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span> on the user you want to remove.
5. Select **Remove**.
6. **Save**.
