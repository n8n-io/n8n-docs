---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Share workflows between users.
contentType: howto
---

# Workflow sharing

/// info | Feature availability
Available on Pro and Enterprise Cloud plans, and Enterprise self-hosted plans.
///

Workflow sharing allows you to share workflows between users of the same n8n instance.

Users can share workflows they created. Instance owners, and users with the admin role, can view and share all workflows in the instance. Refer to [Account types](/user-management/account-types/) for more information about owners and admins.

## Share a workflow

1. Open the workflow you want to share.
2. Select **Share**.
3. In **Add users**, find and select the users you want to share with.
4. Select **Save**.

## View shared workflows

You can browse and search workflows on the **Workflows** list. The workflows in the list depend on the project:

* **Overview** lists all workflows you can access. This includes:
	* Your own workflows.
	* Workflows shared with you.
	* Workflows in projects you're a member of.
	* If you log in as the instance owner or admin: all workflows in the instance.
* Other projects: all workflows in the project.

## Workflow roles and permissions

There are two workflow roles: creator and editor. The creator is the user who created the workflow. Editors are other users with access to the workflow.

You can't change the workflow owner, except when deleting the user.

/// note | Credentials
Workflow sharing allows editors to use all credentials used in the workflow. This includes credentials that aren't explicitly shared with them using [credential sharing](/credentials/credential-sharing/).
///
### Permissions

| Permissions | Creator | Editor | 
| ----------- | ------- | ------ | 
| View workflow (read-only) | :white_check_mark: | :white_check_mark: |
| View executions | :white_check_mark: | :white_check_mark: |
| Update (including tags) | :white_check_mark: | :white_check_mark: |
| Run | :white_check_mark: | :white_check_mark: |
| Share | :white_check_mark: | :x: |
| Export | :white_check_mark: | :white_check_mark: |
| Delete | :white_check_mark: | :x: |

## Node editing restrictions with unshared credentials

Sharing in n8n works on the principle of least privilege. This means that if a user shares a workflow with you, but they don't share their credentials, you can't edit the nodes within the workflow that use those credentials. You can view and run the workflow, and edit nodes that don't use unshared credentials.

Refer to [Credential sharing](/credentials/credential-sharing/) for guidance on sharing credentials.
