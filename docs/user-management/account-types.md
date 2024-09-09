---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: n8n account types
contentType: reference
---

# Account types

There are three account types: owner, admin, and member. The account type affects the user permissions and access.

/// info | Feature availability
To use admin accounts, you need a pro or enterprise plan.
///

/// note | Account types and role types
Account types and role types are different things. Role types are part of [RBAC](/user-management/rbac/). 

Every account has one type. The account can have different [role types](/user-management/rbac/role-types/) for different [projects](/user-management/rbac/projects/).
///

/// note | Create a member-level account for the owner
n8n recommends that owners create a member-level account for themselves. Owners can see and edit all workflows, credentials, and projects. However, there is no way to see who created a particular workflow, so there is a risk of overriding other people's work if you build and edit workflows as an owner.
///


| Permission | Owner | Admin | Member |
| ---------- |------ | ----- | ------ |
| Manage own email and password | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Manage own workflows | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| View, create, and use tags | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Delete tags | :white_check_mark: | :white_check_mark: | :x: |
| View and share all workflows | :white_check_mark: | :white_check_mark: | :x: |
| View, edit, and share all credentials | :white_check_mark: | :white_check_mark: | :x: |
| Set up and use [Source control](/source-control-environments/) | :white_check_mark: | :white_check_mark: | :x: |
| Create [projects](/user-management/rbac/projects/) | :white_check_mark: | :white_check_mark: | :x: |
| View all projects | :white_check_mark: | :white_check_mark: | :x: |
| Add and remove users | :white_check_mark: | :white_check_mark: | :x: |
| Access the Cloud dashboard | :white_check_mark: | :x: | :x: |


