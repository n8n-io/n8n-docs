---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: RBAC role types
description: Understand the RBAC roles available in n8n, and the access they have.
pageType: reference
---

# RBAC role types

/// info | Feature availability
* The Project Editor role is available on Pro Cloud and Self-hosted Enterprise plans. 
* The Project Viewer role is only available on Self-hosted Enterprise and Cloud Enterprise plans.
///

Within projects, there are three user roles: Admin, Editor, and Viewer. These roles control what the user can do in a project. A user can have different roles within different projects.

## Project Admin

A Project Admin role has the highest level of permissions. Project admins can:

* Manage project settings: Change name, delete project.
* Manage project members: Invite members and remove members, change members' roles.
* View, create, update, and delete any workflows, credentials, or executions within a project. 

## Project Editor

A Project Editor can view, create, update, and delete any workflows, credentials, or executions within a project. 

## Project Viewer

A Project Viewer is effectively a `read-only` role with access to all workflows, credentials, and executions within a project.

Viewers aren't able to manually execute any workflows that exist in a project. 

/// note | Role types and account types
Role types and [account types](/user-management/account-types/) are different things. Every account has one type. The account can have different role types for different [projects](/user-management/rbac/projects/).
///

| Permission | Admin | Editor | Viewer | 
| ---------- |------ | ------ | ------ | 
| View workflows in the project | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| View credentials in the project | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| View executions | :white_check_mark: | :white_check_mark: | :white_check_mark: | 
| Edit credentials and workflows | :white_check_mark: | :white_check_mark: | :x: | 
| Add workflows and credentials | :white_check_mark: | :white_check_mark: | :x: | 
| Execute workflows | :white_check_mark: | :white_check_mark: | :x: | 
| Manage members | :white_check_mark: | :x: | :x: | 
| Modify the project | :white_check_mark: | :x: | :x: | 

[Variables](/code/variables/) and [tags](/workflows/tags/) aren't affected by RBAC: they're global across the n8n instance.
