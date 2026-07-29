---
contentType: overview
title: Role-based access control (RBAC)
description: Set up and use role-based access control (RBAC) in n8n.
nodeTitle: Set permissions and roles (RBAC)
originalFilePath: user-management/rbac/index.md
originalUrl: 'https://docs.n8n.io/user-management/rbac'
url: >-
  https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac
layout:
  description:
    visible: false
---

# Role-based access control (RBAC) <a href="#role-based-access-control-rbac" id="role-based-access-control-rbac"></a>

{% hint style="info" %}
**Feature availability**

* Project roles are available on all plans except the Community edition.
* Custom roles (instance and project) require an Enterprise plan.

Refer to n8n's [pricing page](https://n8n.io/pricing/) for plan details.
{% endhint %}

RBAC in n8n lets you control access at two levels:

* **Instance roles**: determine what a user can do across the entire instance. Built-in instance roles are Owner, Admin, and Member. You can also create custom instance roles for more granular control. Refer to [Instance roles](../understand-instance-roles.md).
* **Project roles**: determine what a user can do within a specific project. You group workflows and credentials into projects, and a user can have different project roles in different projects. Refer to [See available roles](see-available-roles.md).

This section provides guidance on setting up and using RBAC in n8n.
