---
title: RBAC projects
contentType: howto
nodeTitle: Organize work in projects
originalFilePath: user-management/rbac/projects.md
originalUrl: https://docs.n8n.io/user-management/rbac/projects
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects
description: >-
  Understand how n8n uses project for RBAC. Learn how to create and manage
  projects.
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

# Organize work in projects

{% hint style="info" %}
**Feature availability**

RBAC is available on all plans except the Community edition. Different plans have different numbers of projects and roles. Refer to n8n's [pricing page](https://n8n.io/pricing/) for plan details.
{% endhint %}

n8n uses projects to group workflows and credentials[^1], and assigns [roles](see-available-roles.md) to users in each project. This means that a single user can have different roles in different projects, giving them different levels of access.

### Create a project <a href="#create-a-project" id="create-a-project"></a>

Instance owners and instance admins can create projects.

To create a project:

1. Select <img src="../../.gitbook/assets/plus.png" alt="Plus icon" data-size="line"> **Add project**.
2. Fill out the project settings.
3. Select **Save**.

### Add and remove users in a project <a href="#add-and-remove-users-in-a-project" id="add-and-remove-users-in-a-project"></a>

Project admins can add and remove users.

To add a user to a project:

1. Select the project.
2. Select **Project settings**.
3. Under **Project members**, browse for users or search by username or email address.
4. Select the user you want to add.
5. Check the [role type](see-available-roles.md) and change it if needed.
6. Select **Save**.

To remove a user from a project:

1. Select the project.
2. Select **Project settings**.
3. In the **three-dot menu** for the user you want to remove, select **Remove user**.
4. Select **Save**.

### Delete a project <a href="#delete-a-project" id="delete-a-project"></a>

To delete a project:

1. Select the project.
2. Select **Project settings**.
3. Select **Delete project**.
4. Choose what to do with the workflows and credentials. You can select:
   * **Transfer its workflows and credentials to another project**: n8n prompts you to choose a project to move the data to.
   * **Delete its workflows and credentials**: n8n prompts you to confirm that you want to delete all the data in the project.

### Move workflows and credentials between projects or users <a href="#move-workflows-and-credentials-between-projects-or-users" id="move-workflows-and-credentials-between-projects-or-users"></a>

Workflow and credential owners can move workflows or credentials (changing ownership) to other users or projects they have access to.

{% hint style="warning" %}
**Moving revokes sharing**

Moving workflows or credentials removes all existing sharing. Be aware that this could impact other workflows currently sharing these resources.
{% endhint %}

1.  Select **Workflow menu** <img src="../../.gitbook/assets/three-dot-options-menu (1).png" alt="Workflow menu icon" data-size="line"> or **Credential menu** <img src="../../.gitbook/assets/three-dot-options-menu (1).png" alt="Workflow menu icon" data-size="line"> > **Move**.<br>

    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p><strong>Moving workflows with credentials</strong></p><p>When moving a workflow with credentials you have permission to share, you can choose to share the credentials as well. This ensures that the workflow continues to have access to the credentials it needs to execute. n8n will note any credentials that can't be moved (credentials you don't have permission to share).</p></div>
2. Select the project or user you want to move to.
3. Select **Next**.
4. Confirm you understand the impact of the move: workflows may stop working if the credentials they need aren't available in the target project, and n8n removes any current individual sharing.
5. Select **Confirm move to new project**.

[^1]: In n8n, credentials store authentication information to connect with specific apps and services. After creating credentials with your authentication information (username and password, API key, OAuth secrets, etc.), you can use the associated app node to interact with the service.
