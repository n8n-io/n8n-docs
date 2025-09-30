---
title: Asana node documentation
description: Learn how to use the Asana node in n8n. Follow technical documentation to integrate Asana node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Asana node

Use the Asana node to automate work in Asana, and integrate Asana with other applications. n8n has built-in support for a wide range of Asana features, including creating, updating, deleting, and getting users, tasks, projects, and subtasks.

On this page, you'll find a list of operations the Asana node supports and links to more resources.

/// note | Credentials
Refer to [Asana credentials](/integrations/builtin/credentials/asana.md) for guidance on setting up authentication.
///

/// note | Update to 1.22.2 or above
Due to changes in Asana's API, some operations in this node stopped working on 17th January 2023. Upgrade to n8n 1.22.2 or above.
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* Project
    * Create a new project
    * Delete a project
    * Get a project
    * Get all projects
    * Update a project
* Subtask
    * Create a subtask
    * Get all subtasks
* Task
    * Create a task
    * Delete a task
    * Get a task
    * Get all tasks
    * Move a task
    * Search for tasks
    * Update a task
* Task Comment
    * Add a comment to a task
    * Remove a comment from a task
* Task Tag
    * Add a tag to a task
    * Remove a tag from a task
* Task Project
    * Add a task to a project
    * Remove a task from a project
* User
    * Get a user
    * Get all users
 
### Create a task

When using the **Create a task** operation, the fields are as follows:

- **Name**: Name of the task. This is generally a short sentence fragment that fits on a line in the UI for maximum readability. However, it can be longer.
- **Additional fields**
	-  **Assignee Name or ID**: Expects an integer (gid) or display name (name) of the user. This data can be gathered with the **Get a User** or **Get Many Users** operations
 	-  **Completed** (Optional): A boolean value is expected (true or false)
  	-  **Notes** (Optional): The description of the task, will show when expanding the task in Asana
#### Output
<details>
<summary>Click to view Asana Task Schema (JSON Types)</summary>
```json
[
  {
    "gid": "string",
    "num_likes": "number",
    "num_hearts": "number",
    "workspace": {
      "gid": "string",
      "resource_type": "string",
      "name": "string"
    },
    "start_at": "string | null",
    "start_on": "string | null",
    "resource_subtype": "string",
    "due_at": "string | null",
    "due_on": "string | null",
    "completed_at": "string | null",
    "assignee_status": "string",
    "completed": "boolean",
    "actual_time_minutes": "number",
    "notes": "string",
    "name": "string",
    "modified_at": "string",
    "created_at": "string",
    "resource_type": "string",
    "projects": [
      {
        "gid": "string",
        "resource_type": "string",
        "name": "string"
      }
    ],
    "tags": "array",
    "parent": "object | null",
    "likes": "array of objects",
    "hearts": "array of objects",
    "liked": "boolean",
    "hearted": "boolean",
    "assignee_section": {
      "gid": "string",
      "resource_type": "string",
      "name": "string"
    },
    "memberships": [
      {
        "project": {
          "gid": "string",
          "resource_type": "string",
          "name": "string"
        },
        "section": {
          "gid": "string",
          "resource_type": "string",
          "name": "string"
        }
      }
    ],
    "permalink_url": "string",
    "assignee": {
      "gid": "string",
      "resource_type": "string",
      "name": "string"
    },
    "followers": [
      {
        "gid": "string",
        "resource_type": "string",
        "name": "string"
      }
    ],
    "custom_fields": "array"
  }
]

```
</details>

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'asana') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
