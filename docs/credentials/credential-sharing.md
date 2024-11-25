---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Credential sharing
description: Share credentials within an organization.
contentType: howto
---

# Credential sharing


/// info | Feature availability
Available on all Cloud plans, and Enterprise self-hosted plans.
///

You can share a credential directly with other users to use in their own workflows. Or share a credential in a project for all members of that project to use. Any users using a shared credential won't be able to view or edit the credential details.

Users can share credentials they created and own. Only project admins can share credentials created in and owned by a project. Instance owners and instance admins can view and share all credentials on an instance.

Refer to [Account types](/user-management/account-types/) for more information about owners and admins.

In [projects](/user-management/rbac/), a user's role controls how they can interact with the workflows and credentials associated to the projects they're a member of.

## Share a credential

To share a credential: 

1. From the left menu, select either **Overview** or a project.
2. Select **Credentials** to see a list of your credentials.
3. Select the credential you want to share.
4. Select **Sharing**.
5. In the **Share with projects or users** dropdown, browse or search for the user or project with which you want to share your credentials.
6. Select a user or project. 
7. Select **Save** to apply the changes.

## Remove access to a credential

To unshare a credential:

1. From the left menu, select either **Overview** or a project.
2. Select **Credentials** to see a list of your credentials.
3. Select the credential you want to unshare.
4. Select **Sharing**.
5. Select **trash icon**<span class="inline-image">![Trash icon](/_images/common-icons/delete-node.png){.off-glb}</span> on the user or project you want to remove from the list of shared users and projects.
6. Select **Save** to apply the changes.
