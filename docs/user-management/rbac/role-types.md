---
title: RBAC role tpyes
description: Understand the RBAC roles available in n8n, and the access they have.
pageType: reference
---

# RBAC role types

/// info | Feature availability
The editor role requires an enterprise license.
///

With RBAC, there are three user roles: admin, editor, and viewer. The user's role controls what the user can do in the project. A user can have different roles on different projects.

/// note | Role types and account types
Role types and [account types](/user-management/account-types/) are different things. Every account has one type. The account can have different role types for different [projects](/user-management/rbac/projects/).
///

| Permission | Admin | Editor | Viewer |
| ---------- |------ | ------ | ------ |
| View workflows in the project | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Edit credentials and workflows | :white_check_mark: | :white_check_mark: | :x: |
| Add workflows | :white_check_mark: | :white_check_mark: | :x: |
| Add members | :white_check_mark: | :x: | :x: |
| Modify the project | :white_check_mark: | :x: | :x: |

[Variables](/code/variables/) and [tags](/workflows/tags/) aren't affected by RBAC: they're global across the n8n instance.
