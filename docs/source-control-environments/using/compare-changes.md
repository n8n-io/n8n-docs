---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Compare changes with workflow diffs
description: Use workflow diffs to compare local and remote changes 
contentType: howto
---

# Compare changes with workflow diffs

Workflow diffs allow you to visually compare changes between the workflow you have on an instance with what is currently in the a connected Git repository. This helps you understand exactly what has changed on workflow before you decide to either push or pull a workflow across different environments.

/// note | Feature availability
- Available on Enterprise
- Workflow diffs are only available when the environments features has been enabled on an instance
///

## Accessing workflow diffs

You can access workflow diffs from two locations:

1. **When pushing changes**: Click the workflow diff icon in the commit modal alongside the workflow you want to review
2. **When pulling changes**: Click the workflow diff in the modified changes modal alongside the workflow you want to review

## Understanding the workflow diff view

When you open a workflow diff, n8n displays two workflows vertically above and below:

### When pushing
* **Remote version in Git** (top panel): Latest version in your Git repository
* **Local Instance version** (bottom panel): Current locally saved version of the workflow

### When pulling  
* **Local instance version** (top panel): Current version on your n8n instance
* **Remote version in Git** (bottom panel): Version being pulled from the Git repository

The diff view highlights three types of changes:

* **Added nodes and connectors**: Any new node additions or connectors will show as green
* **Modified nodes and connectors**: Any modifications to existing nodes or connectors will show as orange
* **Deleted nodes and connectors**: Any nodes or connectors that have been deleted will show as red

## Reviewing node changes

For modified nodes, you can also look at the speciifc changes by doing the following:

1. Click on any modified node
2. A JSON diff appears showing all changes for that specific node
3. This allows you to review exactly what configuration changes were made

## Viewing summary of changes

In the top right, you will see a "changes" button showing a count of the number of changes:

1. Click the **Changes** button in the top right of the diff view
2. This shows the total breakdown of changes across:
   - Node changes
   - Node connector changes  
   - General workflow settings changes

## Navigating through each change

Use the navigation controls to review changes systematically:

* **Next/Previous arrows**: Cycle through each individual change
* **Back button**: Return to the previous view to select a different workflow

## Who can use workflow diffs

/// note | Workflow diffs require push or pull permissions
Only users who can push commits to an instance can access workflow diffs: instance owners, instance admins, and project admins.
///
