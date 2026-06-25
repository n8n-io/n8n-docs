---
title: Credential sharing
contentType: howto
nodeTitle: Share credentials securely
originalFilePath: credentials/credential-sharing.md
originalUrl: https://docs.n8n.io/credentials/credential-sharing
url: https://docs.n8n.io/administer/manage-credentials/share-credentials-securely
description: Share credentials within an organization.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Share credentials securely

{% hint style="info" %}
**Feature availability**

Available on all Cloud plans, and Business and Enterprise self-hosted plans.
{% endhint %}

You can share a credential directly with other users to use in their own workflows. Or share a credential in a project[^1] for all members of that project to use. Any users using a shared credential won't be able to view or edit the credential details.

Users can share credentials they created and own. Only project admins can share credentials created in and owned by a project. Instance owners and instance admins can view and share all credentials on an instance.

Refer to [Account types](../manage-users-and-access/understand-account-types.md) for more information about owners and admins.

In [projects](../manage-users-and-access/set-permissions-and-roles-rbac/), a user's role controls how they can interact with the workflows and credentials associated to the projects they're a member of.

## Share a credential <a href="#share-a-credential" id="share-a-credential"></a>

To share a credential:

1. From the left menu, select either **Overview** or a project.
2. Select **Credentials** to see a list of your credentials.
3. Select the credential you want to share.
4. Select **Sharing**.
5. In the **Share with projects or users** dropdown, browse or search for the user or project with which you want to share your credentials.
6. Select a user or project.
7. Select **Save** to apply the changes.

## Remove access to a credential <a href="#remove-access-to-a-credential" id="remove-access-to-a-credential"></a>

To unshare a credential:

1. From the left menu, select either **Overview** or a project.
2. Select **Credentials** to see a list of your credentials.
3. Select the credential you want to unshare.
4. Select **Sharing**.
5. Select **trash icon**<img src="../.gitbook/assets/delete-node (1).png" alt="Trash icon" data-size="line"> on the user or project you want to remove from the list of shared users and projects.
6. Select **Save** to apply the changes.

[^1]: n8n projects allow you to separate workflows, variables, and credentials into separate groups for easier management. Projects make it easier for teams to collaborate by sharing and compartmentalizing related resources.
