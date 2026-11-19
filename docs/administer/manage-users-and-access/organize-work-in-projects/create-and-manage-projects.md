---
description: Create projects, add and remove project members, delete projects, and favorite projects in n8n.
layout:
  description:
    visible: false
---

# Create and manage projects

Create a project to group workflows and credentials, then manage who can access it and what happens to its data when you delete it.

{% hint style="info" %}
**Feature availability**

The number of team projects you can create depends on your plan or edition:

- **n8n Cloud:** Starter, 1. Pro, 3. Enterprise, unlimited.
- **Self-hosted:** Community and Registered Community, none. Business, 6. Enterprise, unlimited.

Plans can change. See the [pricing page](https://n8n.io/pricing/) for the current details.
{% endhint %}

## Create a project <a href="#create-a-project" id="create-a-project"></a>

Instance owners and instance admins can create projects.

To create a project:

1. Select <img src="../../.gitbook/assets/plus.png" alt="Plus icon" data-size="line"> **Add project**.
2. Fill out the project settings.
3. Select **Save**.

## Add and remove users in a project <a href="#add-and-remove-users-in-a-project" id="add-and-remove-users-in-a-project"></a>

Project admins can add and remove users.

To add a user to a project:

1. Select the project.
2. Select **Project settings**.
3. Under **Project members**, browse for users or search by username or email address.
4. Select the user you want to add.
5. Check the [role type](../set-permissions-and-roles-rbac/understand-project-roles.md) and change it if needed.
6. Select **Save**.

To remove a user from a project:

1. Select the project.
2. Select **Project settings**.
3. In the **three-dot menu** for the user you want to remove, select **Remove user**.
4. Select **Save**.

## Delete a project <a href="#delete-a-project" id="delete-a-project"></a>

To delete a project:

1. Select the project.
2. Select **Project settings**.
3. Select **Delete project**.
4. Choose what to do with the project's workflows, credentials, and data tables. You can select:
   * **Transfer its workflows, credentials and data tables to another project**: n8n prompts you to choose a project to move the data to.
   * **Delete its workflows, credentials and data tables**: n8n prompts you to confirm that you want to delete all the data in the project.

{% hint style="danger" %}
**Deleting a project with the API**

The n8n UI asks what to do with a project's workflows, credentials, and data tables when you delete it. The public API doesn't. When you delete a project with the API (`DELETE /projects/{projectId}`), n8n permanently deletes its workflows, credentials, and data tables.

To keep this data, transfer it to another project first. You can also delete the project in the UI and choose to transfer its data. Refer to the [API reference](https://docs.n8n.io/connect/n8n-api/access-and-organization/projects) for full, up-to-date information about API endpoints and parameters.
{% endhint %}

## Favorite a project <a href="#favorite-a-project" id="favorite-a-project"></a>

You can favorite a team project to pin it for quick access. Open the project and select the star icon in the project header, or select its **three-dot menu** and select **Favorite**. See [Favorite items](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/favorite-items) for details, including how to favorite workflows, folders, and data tables the same way.

## Related resources

* [Organize work in projects](./)
* [Move workflows and credentials](move-workflows-and-credentials.md)
* [Understand project roles](../set-permissions-and-roles-rbac/understand-project-roles.md)
