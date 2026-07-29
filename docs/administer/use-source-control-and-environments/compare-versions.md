---
title: Compare changes with workflow diffs
description: Use workflow diffs to compare local and remote changes
contentType: howto
nodeTitle: Compare versions
originalFilePath: source-control-environments/using/compare-changes.md
originalUrl: 'https://docs.n8n.io/source-control-environments/using/compare-changes'
url: >-
  https://docs.n8n.io/administer/use-source-control-and-environments/compare-versions
layout:
  description:
    visible: false
---

# Compare changes with workflow diffs <a href="#compare-changes-with-workflow-diffs" id="compare-changes-with-workflow-diffs"></a>

Workflow diffs allow you to visually compare changes between the workflow you have on an instance and the most recent version saved in your connected Git repository. This helps you understand the exact changes to the workflow before you decide to either push or pull it across different environments.

{% hint style="info" %}
**Feature availability**

- Available on Enterprise
- Workflow diffs are only available when you [enable the environments features](set-up-source-control.md) on an instance
{% endhint %}

## Accessing workflow diffs <a href="#accessing-workflow-diffs" id="accessing-workflow-diffs"></a>

You can access workflow diffs from two locations:

1. **When pushing changes**: Click the workflow diff icon in the commit modal alongside the workflow you want to review
2. **When pulling changes**: Click the workflow diff icon in the modified changes modal alongside the workflow you want to review

## Understanding the workflow diff view <a href="#understanding-the-workflow-diff-view" id="understanding-the-workflow-diff-view"></a>

When you open a workflow diff, n8n displays two workflows stacked vertically:

### When pushing <a href="#when-pushing" id="when-pushing"></a>

* **Top panel** (Remote branch): Latest version in your Git repository
* **Bottom panel** (Local): Current locally saved version of the workflow

### When pulling <a href="#when-pulling" id="when-pulling"></a>

* **Top panel** (Local): Current version on your n8n instance
* **Bottom panel** (Remote branch): Version you're pulling from the Git repository

In both cases, the top panel always displays the workflow that will update with changes.

The diff view highlights three types of changes:

* **Added nodes and connectors**: New node additions or connectors will show as green along with an "N" icon
* **Modified nodes and connectors**: Modifications to existing nodes or connectors will show as orange along with a "M" icon
* **Deleted nodes and connectors**: Node or connector deletions will show as red along with a "D" icon 

## Reviewing node changes <a href="#reviewing-node-changes" id="reviewing-node-changes"></a>

For modified nodes, you can also compare the specific changes. Click modified nodes to show a JSON diff of the changes. You can review the exact configuration for that node before and after the given change.

## Viewing the summary of changes <a href="#viewing-the-summary-of-changes" id="viewing-the-summary-of-changes"></a>

In the top-right corner, the **changes** button shows the number of changes. This represents the total number of changes across node and node connectors, as well as general workflow settings updates.

## Navigating through each change <a href="#navigating-through-each-change" id="navigating-through-each-change"></a>

You can use the **next** and **previous** arrows in the upper-right corner to cycle through your changes in a logical order. Use the **back** button in the top-left corner to return to the commit or pull modal to select a different workflow to review changes on.

## Who can use workflow diffs <a href="#who-can-use-workflow-diffs" id="who-can-use-workflow-diffs"></a>

Only users who can push or pull commits for an instance can access workflow diffs:

* instance owners
* instance admins
* project admins
