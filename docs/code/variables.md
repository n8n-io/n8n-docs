---
title: Custom variables
description: Custom variables allow you to store and reuse values in n8n workflows.
contentType: howto
---

# Custom variables

/// info | Feature availability
* Available on Self-hosted Enterprise and Pro Cloud plans.
* Only instance owners and admins can create variables.

///

Custom variables are read-only variables that you can use to store and reuse values in n8n workflows.

/// warning | Variable scope and availability

* **Global variables** are available to everyone on your n8n instance, across all projects.
* **Project-scoped variables** are available only within the specific project they're created in.
* Project-scoped variables are available in 1.118.0 and above. Previous versions only support global variables accessible from the left side menu.

///

## Create variables

You can access the **Variables** tab from either the overview page or a specific project.

To create a new variable:

1. On the **Variables** tab, select **Add Variable**.
2. Enter a **Key** and **Value**. The maximum key length is 50 characters, and the maximum value length is 1000 characters. n8n limits the characters you can use in the key and value to lowercase and uppercase letters, numbers, and underscores (`A-Z`, `a-z`, `0-9`, `_`).
3. Select the **Scope** (only available when creating from the overview page):
    * **Global**: The variable is available across all projects in the n8n instance.
    * **Project**: The variable is available only within a specific project (you can select which project).
    * When creating from a project page, the scope is automatically set to that project.
4. Select **Save**. The variable is now available for use in workflows according to its scope.

## Edit and delete variables

To edit or delete a variable:

1. On the **Variables** tab, hover over the variable you want to change.
2. Select **Edit** or **Delete**.

## Use variables in workflows

You can access variables in the Code node and in [expressions](/glossary.md#expression-n8n):

```javascript
// Access a variable
$vars.<variable-name>
```

All variables are strings.

During workflow execution, n8n replaces the variables with the variable value. If the variable has no value, n8n treats its value as `undefined`. Workflows don't automatically fail in this case.

/// note | Variable precedence

When a project-scoped variable has the same key as a global variable, the project-scoped variable value takes precedence and overrides the global variable value within that project's workflows.

///

Variables are read-only. You must use the UI to change the values. If you need to set and access custom data within your workflow, use [Workflow static data](/code/cookbook/builtin/get-workflow-static-data.md).
