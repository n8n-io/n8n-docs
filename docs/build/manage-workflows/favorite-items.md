---
description: Favorite workflows, folders, projects, and data tables to pin them for quick access in the left menu.
layout:
  description:
    visible: false
---

# Favorite items

{% hint style="info" %}
**Available from n8n 2.18.0**
{% endhint %}

You can favorite workflows, folders, projects, and data tables to pin them for quick access. Favoriting an item adds it to a **Favorites** section in the left menu, so you don't have to search or browse for the items you use most.

Favorites are personal to each user. Favoriting an item doesn't change who can view or edit it, and doesn't affect other users' favorites.

## Favorite an item

To favorite an item, select its **three-dot menu**, then select **Favorite**. To remove it from your favorites, select the same **three-dot menu**, then select **Unfavorite**.

Find the **three-dot menu** for each item type here:

* **Workflows**: Next to a workflow on the **Workflows** list, or in the top header while the workflow is open.
* **Folders**: Next to a folder on the **Workflows** list.
* **Data tables**: Next to a data table on the **Data tables** list.
* **Projects**: Next to a project on the **Workflows** list. Team projects also have a star icon in the project header, which you can select instead.

{% hint style="info" %}
**Star icon only appears for team projects**

The star icon in the project header only appears when you open a team project. To favorite your personal project, use its **three-dot menu** instead.
{% endhint %}

## View your favorites

n8n lists your favorites in a **Favorites** section in the left menu, grouped by item type: projects, folders, workflows, then data tables. Select an item to open it, or select **x** next to an item to remove it from your favorites without opening it.

{% hint style="info" %}
**Limited discoverability**

The **Favorites** section only appears in the left menu after you favorite at least one item. There's no dedicated favorites page, and currently no way to search, sort, or filter within the list.
{% endhint %}

## Limits

You can favorite up to 200 items in total. If you reach this limit, remove an existing favorite before you add a new one.

n8n automatically removes a favorite when someone deletes the underlying item. If you lose access to a favorited item, for example if someone removes you from its project, it stops appearing in your favorites list until you regain access.

## Related resources

* [Data tables](../work-with-data/data-tables.md)
* [Tag workflows](tag-workflows.md)
* [Organize work in projects](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects)
