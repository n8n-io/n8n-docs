---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Compare changes with workflow diffs
description: Use workflow diffs to compare local and remote changes 
contentType: howto
---

# Compare changes with workflow diffs

Workflow diffs allow you to visually compare changes between the workflow you have on an instance and the most recent version saved in your connected Git repository. This helps you understand the exact changes to the workflow before you decide to either push or pull it across different environments.

/// note | Feature availability
- Available on Enterprise
- Workflow diffs are only available when the environments features has been enabled on an instance
///

## Accessing workflow diffs

You can access workflow diffs from two locations:

1. **When pushing changes**: Click the workflow diff icon in the commit modal alongside the workflow you want to review
2. **When pulling changes**: Click the workflow diff icon in the modified changes modal alongside the workflow you want to review

## Understanding the workflow diff view

When you open a workflow diff, n8n displays two workflows vertically above and below:

### When pushing
* **Top panel** (Remote branch): Latest version in your Git repository
* **Bottom panel** (Local): Current locally saved version of the workflow

### When pulling  
* **Top panel** (Local): Current version on your n8n instance
* **Bottom panel** (Remote branch): Version being pulled from the Git repository

Regarldess of whether pushing or pulling, the top panel will always display the workflow that will be modified by any changes.

The diff view highlights three types of changes:

* **Added nodes and connectors**: Any new node additions or connectors will show as green along with an "N" icon
* **Modified nodes and connectors**: Any modifications to existing nodes or connectors will show as orange along with a "M" icon
* **Deleted nodes and connectors**: Any nodes or connectors that have been deleted will show as red along with a "D" icon 

## Reviewing node changes

For modified nodes, you can also compare any changes that have been made. Firstly, click any modified node to show a JSON diff of any changes. You can then review exactly what the before and after configurations were on that particular node.

## Viewing summary of changes

In the top right, you will see a "changes" button showing a count of the number of changes. This shows the total number of changes across node and node connectors and general workflow settings updates.

## Navigating through each change

You can use the next and previous arrows in the top right to cylce through your changes in a logical order. Use the back button in the top left to return to the commit or pull modal to select a different workflow to review changes on.

## Who can use workflow diffs

/// note | Workflow diffs require push or pull permissions
Only users who can push or pull commits to an instance can access workflow diffs: instance owners, instance admins, and project admins. 
///
