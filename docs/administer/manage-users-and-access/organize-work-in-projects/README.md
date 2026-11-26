---
title: Organize work in projects
contentType: overview
nodeTitle: Organize work in projects
originalFilePath: user-management/rbac/projects.md
originalUrl: https://docs.n8n.io/user-management/rbac/projects
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/organize-work-in-projects
description: >-
  Understand how n8n uses projects to group workflows and credentials and
  control access to them.
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

Projects group workflows and credentials[^1], and control which users can access them.

A team project is a project that several users can work in.

{% hint style="info" %}
**Feature availability**

Team projects are available on:

- **n8n Cloud:** Starter (1 project), Pro (3 projects), Enterprise (unlimited)
- **Self-hosted:** Business (6 projects), Enterprise (unlimited)

They aren't available on the Community and Registered Community editions.

Which project roles you can assign also depends on your plan or edition. Refer to [Role-based access control (RBAC)](../set-permissions-and-roles-rbac/README.md). 
{% endhint %}

n8n assigns [roles](../set-permissions-and-roles-rbac/understand-project-roles.md) to users in each project. A single user can have different roles in different projects, which gives them different levels of access.

### What projects isolate and what they don't

Projects control who can see and change the workflows, credentials, and data tables in them. They don't isolate infrastructure. Every project on an instance runs on the same n8n deployment and database.

#### Executions in projects

You can see a workflow's executions when your project role, a share on the workflow, or your instance role gives you permission to read executions. Membership in one project doesn't by itself show you the executions of another project.

[Instance owners and instance admins](../set-permissions-and-roles-rbac/understand-instance-roles.md) can view saved executions across all projects. The Project Admin role by itself gives no access outside its project.

Team project workflows use project roles in the editor. Where workflow sharing is available, a direct share of a workflow in a personal space can give access to the executions of that workflow. It doesn't give access to the rest of the project.

A workflow can call a sub-workflow in another project if the caller policy of the sub-workflow allows it. If **Wait for Sub-Workflow Completion** is on (the default), a successful call returns the output of the sub-workflow. It doesn't give the caller access to the execution history of the sub-workflow.

#### Data tables in projects

Each [data table](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/data-tables) belongs to one project. Unlike workflows and credentials, you can't share a data table on its own. You can list data tables and read their rows in each project where you have the corresponding permissions. Instance owners and instance admins see the data tables in every project.

The **Data Table node** only uses data tables from the project that owns the workflow. It rejects a table ID from another project, even if the person who runs the workflow has access to that project. For more on how data tables work, refer to [Data tables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/data-tables).

#### Variables in projects

Global variables are visible to every workflow. Project variables are visible only to workflows that the project owns. If a global variable and a project variable use the same key, `$vars` uses the project value. `$vars` never reads the variables of another project.

## Personal and team projects <a href="#personal-and-team-projects" id="personal-and-team-projects"></a>

Every user has a personal project that n8n creates automatically, on every plan. On the Community and Registered Community editions, the personal project is the only project a user has, because you can't create team projects there.

On plans that include team projects, instance owners and instance admins can create team projects and add users to them. Refer to [Create and manage projects](create-and-manage-projects.md).

## Plan a project structure for several teams or customers

When one instance serves several teams, business units, or customers, give each one its own team project. Each project then holds its own workflows, credentials, and member list, and members of one project can't see the resources of another unless you share them.

A common layout uses one project per team or customer, plus projects for shared and operational work:

```
Instance (visible to instance owners and instance admins)
├── Project: Customer A
│	├── Workflows (Customer A automations)
│	└── Credentials (Customer A API keys)
├── Project: Customer B
│	├── Workflows
│	└── Credentials
├── Project: Shared services
│	├── Workflows (reusable sub-workflows)
│	└── Credentials (shared infrastructure credentials)
└── Project: Platform operations
	├── Workflows (monitoring, alerting, and health checks)
	└── Credentials (internal tooling)
```

When you set up this structure:

* Give each member the least-privileged [project role](../set-permissions-and-roles-rbac/understand-project-roles.md) they need. Most members need Project Editor or Project Viewer, not Project Admin.
* Keep each team's or customer's credentials in its own project. Share a credential with another project only when that project needs it. Refer to [Share credentials securely](../../manage-credentials/share-credentials-securely.md).
* Put reusable sub-workflows in a shared project, and use each sub-workflow's caller policy to control which workflows can call it.
* For secrets that differ for each team or customer, assign a [project vault](../../manage-credentials/use-external-secret-stores.md#project-vaults) to each project.

Projects separate access, not infrastructure. All projects on an instance share the same n8n deployment and database, as described in [What projects isolate and what they don't](#what-projects-isolate-and-what-they-dont).

## Use personal credentials in team projects <a href="#use-personal-credentials-in-team-projects" id="use-personal-credentials-in-team-projects"></a>

Project members can select their own personal credentials in any workflow in a team project they belong to, without sharing the credential with the project. The credential selector groups credentials into **Available to you** (your personal credentials) and **Available in** _project name_.

Only the owner and people they share the credential with directly can run or publish workflows with it. To let every project member use it, share it with the project. Refer to [Use personal credentials in projects](../../manage-credentials/use-personal-credentials-in-projects.md).

## In this section

* [Create and manage projects](create-and-manage-projects.md): create projects, add and remove project members, delete projects, and favorite projects.
* [Move workflows and credentials](move-workflows-and-credentials.md): move workflows and credentials between projects or users.

## Related resources

* [Manage users and access](../)
* [Set permissions and roles (RBAC)](../set-permissions-and-roles-rbac/README.md)
* [Understand project roles](../set-permissions-and-roles-rbac/understand-project-roles.md)
* [Create custom project roles](../set-permissions-and-roles-rbac/create-custom-project-roles.md)

[^1]: In n8n, credentials store authentication information to connect with specific apps and services. After creating credentials with your authentication information (username and password, API key, OAuth secrets, etc.), you can use the associated app node to interact with the service.
