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

## Personal and team projects <a href="#personal-and-team-projects" id="personal-and-team-projects"></a>

Every user has a personal project that n8n creates automatically, on every plan. On the Community and Registered Community editions, the personal project is the only project a user has, because you can't create team projects there.

On plans that include team projects, instance owners and instance admins can create team projects and add users to them. Refer to [Create and manage projects](create-and-manage-projects.md).

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
