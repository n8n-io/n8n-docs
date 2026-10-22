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

Credential sharing is available on:

- **n8n Cloud:** All plans
- **Self-hosted:** Business, Enterprise
{% endhint %}

You can share a credential directly with other users to use in their own workflows. Or share a credential in a project[^1] for all members of that project to use. Any users using a shared credential won't be able to view or edit the credential details.

You don't need to share your own credentials to use them in a team project you're a member of. Share a credential when other people need to run or publish workflows with it. Refer to [Use personal credentials in projects](use-personal-credentials-in-projects.md) for how personal credentials work in team projects and who a workflow run acts as.

Users can share credentials they created and own. Only project admins can share credentials created in and owned by a project. Instance owners and instance admins can view and share all credentials on an instance. On the **Sharing** tab, only the credential's owner, or users with permission to share credentials, can change who the credential is shared with.

Refer to [Instance roles](../manage-users-and-access/understand-instance-roles.md) for more information about owners and admins.

In [projects](../manage-users-and-access/set-permissions-and-roles-rbac/README.md), a user's role controls how they can interact with the workflows and credentials associated to the projects they're a member of.

{% hint style="info" %}
**Sharing end-user credentials**

Sharing an [end-user credential](end-user-credentials.md) shares the credential itself, not a connection. Users you share it with connect their own account, they don't use yours.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## Share a credential <a href="#share-a-credential" id="share-a-credential"></a>

To share a credential:

1. From the left menu, select either **Overview** or a project.
2. Select **Credentials** to see a list of your credentials.
3. Select the credential you want to share.
4. Select **Sharing**.
5. In the **Share with projects or users** dropdown, browse or search for the user or project with which you want to share your credentials.
6. Select a user or project.
7. Select **Save** to apply the changes.

People you share a credential with get the **Can use** role: they can run and publish workflows with it, but can't see or edit its details.

## Understand the Sharing tab

The **Sharing** tab lists everyone with access to the credential, and every project that uses it:

* **Shared projects:** members can use the credential, according to their [project role](../manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles.md).
* **Projects that use it without a share:** a member added their personal credential to one of the project's workflows. The project has the **Can view** label, so its members can see the credential on the workflow but can't use or edit it, unless you shared the credential with them directly. To give the whole project access, select **Share**.

Owners and Admins can use any credential in their own personal space without a share. To let them use the credential in team projects too, share it with them.

## Remove access to a credential <a href="#remove-access-to-a-credential" id="remove-access-to-a-credential"></a>

To unshare a credential:

1. From the left menu, select either **Overview** or a project.
2. Select **Credentials** to see a list of your credentials.
3. Select the credential you want to unshare.
4. Select **Sharing**.
5. Select **trash icon**<img src="../.gitbook/assets/delete-node (1).png" alt="Trash icon" data-size="line"> on the user or project you want to remove from the list of shared users and projects.
6. Select **Save** to apply the changes.

[^1]: n8n projects allow you to separate workflows, variables, and credentials into separate groups for easier management. Projects make it easier for teams to collaborate by sharing and compartmentalizing related resources.

## Related resources

* [Manage credentials](./)
* [Use personal credentials in projects](use-personal-credentials-in-projects.md)
* [End-user credentials](end-user-credentials.md)
* [Credential overwrites](credential-overwrites.md)
* [Use external secret stores](use-external-secret-stores.md)
