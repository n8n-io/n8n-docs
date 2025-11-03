---
title: Fantastic node documentation
description: Learn how to use the Fantastic node in n8n. Follow technical documentation to integrate Fantastic node into your workflows.
contentType: [integration, reference]
---

# Fantastic node

Use the Fantastic node to automate work in Fantastic and integrate Fantastic with other applications. n8n has built-in support for a wide range of Fantastic features, including creating, updating, deleting, and getting projects, tasks, and users.

On this page, you'll find a list of operations the Fantastic node supports, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/fantastic.md).
///

## Operations

* **Project**
    * Create
    * Get
    * Get All
    * Update
    * Delete
* **Task**
    * Create
    * Get
    * Get All
    * Update
    * Archive
* **User**
    * Get
    * Get All
    * Update

## Node parameters

### Resource

Select the type of resource in Fantastic to interact with:

- **Project** - Work with project-related data and operations
- **Task** - Manage individual tasks within projects
- **User** - Access and manage user information

This determines which operations become available in the **Operation** parameter.

### Operation

Select the action to perform on the selected resource. Available options depend on the **Resource** you select.

When **Resource** is set to **Project**:

- **Create** - Create a new project
- **Get** - Retrieve a specific project by ID
- **Get All** - Retrieve all projects
- **Update** - Modify an existing project
- **Delete** - Remove a project

When **Resource** is set to **Task**:

- **Create** - Create a new task
- **Get** - Retrieve a specific task by ID
- **Get All** - Retrieve all tasks
- **Update** - Modify an existing task
- **Archive** - Archive a completed task

When **Resource** is set to **User**:

- **Get** - Retrieve a specific user by ID
- **Get All** - Retrieve all users
- **Update** - Modify user information

The operation you select determines which additional fields appear in the node configuration.

### Resource ID

Enter the unique identifier for the specific resource instance to operate on. The field label changes based on the selected **Resource** (e.g., "Project ID" when Resource is "Project").

This field is:
- Required for **Get**, **Update**, **Delete**, and **Archive** operations
- Hidden for **Create** and **Get All** operations
- Supports expressions for dynamic ID assignment

The ID must be a valid UUID or numeric ID format.

## Node options

Select **Add Option** to view and configure these options.

### Return All

/// note | Option availability
This option is only available when **Operation** is set to **Get All**.
///

Whether to retrieve all matching records without pagination limits (turned on) or return results based on the **Limit** option (turned off, default).

When turned on, the node fetches all available records, making multiple API calls if necessary, and automatically handles pagination in the background.

### Limit

/// note | Option availability
This option is only available when **Operation** is set to **Get All** and **Return All** is turned off.
///

Enter the maximum number of records to return in a single request. Must be a positive integer between 1 and 1000. Default is 50.

### Additional Fields

/// note | Option availability
This option is only available when **Operation** is set to **Create** or **Update**.
///

Optional fields that you can include in Create and Update operations to provide additional data. The available fields vary based on the selected **Resource** and **Operation**.

**For Project resource (Create/Update):**

- **Name** - Project name
- **Description** - Project description
- **Status** - Project status (Active, Completed, On Hold)
- **Due Date** - Project deadline
- **Owner ID** - ID of the project owner

**For Task resource (Create/Update):**

- **Title** - Task title
- **Description** - Task details
- **Priority** - Task priority level (Low, Medium, High, Urgent)
- **Assignee ID** - ID of the assigned user
- **Due Date** - Task deadline

**For User resource (Update only):**

- **Name** - User's full name
- **Email** - User's email address
- **Role** - User's role (Admin, Member, Viewer)
- **Active** - Whether the user account is active

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, page) ]]

## Related resources

Refer to Fantastic's documentation for more information about the service.

