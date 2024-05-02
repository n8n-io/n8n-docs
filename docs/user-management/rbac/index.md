---
contentType: overview
title: Role-based access control (RBAC)
description: Set up and use role-based access control (RBAC) in n8n.
---

# Role-based access control (RBAC)

/// info | Feature availability
RBAC is available on all plans except the Community edition. Different plans have different numbers of projects and roles:

* Starter: one project, with admin role.
* Pro: three projects, with admin and editor roles.
* Enterprise: unlimited projects, with admin, editor, and viewer roles.
///

/// note | Role types and account types
Role types and [account types](/user-management/account-types/) are different things. Every account has one type. The account can have different role types for different [projects](/user-management/rbac/projects/).
///

RBAC is a way of managing access to workflows and credentials based on user roles and projects. You group workflows into projects, and user access depends on the user's project role. This section provides guidance on using RBAC in n8n.

[[% import "_macros/section-toc.html" as sectionToc %]]

[[ sectionToc.sectionToc(page) ]]





