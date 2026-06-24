---
title: ClickUp node documentation
description: >-
  Learn how to use the ClickUp node in n8n. Follow technical documentation to
  integrate ClickUp node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: ClickUp node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.clickup.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.clickup'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.clickup'
layout:
  description:
    visible: false
---

# ClickUp node <a href="#clickup-node" id="clickup-node"></a>

Use the ClickUp node to automate work in ClickUp, and integrate ClickUp with other applications. n8n has built-in support for a wide range of ClickUp features, including creating, getting, deleting, and updating folders, checklists, tags, comments, and goals.

On this page, you'll find a list of operations the ClickUp node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [ClickUp credentials](../credentials/clickup.md) for guidance on setting up authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

## Operations <a href="#operations" id="operations"></a>

* Checklist
    * Create a checklist
    * Delete a checklist
    * Update a checklist
* Checklist Item
    * Create a checklist item
    * Delete a checklist item
    * Update a checklist item
* Comment
    * Create a comment
    * Delete a comment
    * Get all comments
    * Update a comment
* Folder
    * Create a folder
    * Delete a folder
    * Get a folder
    * Get all folders
    * Update a folder
* Goal
    * Create a goal
    * Delete a goal
    * Get a goal
    * Get all goals
    * Update a goal
* Goal Key Result
    * Create a key result
    * Delete a key result
    * Update a key result
* List
    * Create a list
    * Retrieve list's custom fields
    * Delete a list
    * Get a list
    * Get all lists
    * Get list members
    * Update a list
* Space Tag
    * Create a space tag
    * Delete a space tag
    * Get all space tags
    * Update a space tag
* Task
    * Create a task
    * Delete a task
    * Get a task
    * Get all tasks
    * Get task members
    * Set a custom field
    * Update a task
* Task List
    * Add a task to a list
    * Remove a task from a list
* Task Tag
    * Add a tag to a task
    * Remove a tag from a task
* Task Dependency
    * Create a task dependency
    * Delete a task dependency
* Time Entry
    * Create a time entry
    * Delete a time entry
    * Get a time entry
    * Get all time entries
    * Start a time entry
    * Stop the current running timer
    * Update a time Entry
* Time Entry Tag
    * Add tag to time entry
    * Get all time entry tags
    * Remove tag from time entry

## Operation details <a href="#operation-details" id="operation-details"></a>

### Get a task <a href="#get-a-task" id="get-a-task"></a>

When using the **Get a task** operation, you can optionally enable the following:

- **Include Subtasks**: When enabled, also fetches and includes subtasks for the specified task.
- **Include Markdown Description**: When enabled, includes the `markdown_description` field in the response, which preserves links and formatting in the task description. This is useful if your task descriptions contain links or rich formatting.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse ClickUp node documentation integration templates](https://n8n.io/integrations/clickup) or [search all templates](https://n8n.io/workflows/)

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/lMIxsgtfHVazfAS7oe1v/" %}

