---
title: Fantastic node
description: Just learning to update docs
contentType: [integration]
priority: medium
---


## Overview

The Fantastic node enables users to automate workflows and integrate with the Fantastic service. This document outlines the core parameters and options that are available in the node interface.

## Node Parameters

Node parameters are the required and primary configuration fields that users must interact with when setting up the node.

### Resource

**Display Name:** Resource

**Internal Name:** `resource`

**Type:** Dropdown (Options)

**Required:** Yes

**Description:** Specifies the type of resource in Fantastic that the workflow will interact with.

**Available Options:**

- **Project** - Work with project-related data and operations
- **Task** - Manage individual tasks within projects
- **User** - Access and manage user information

**Usage Context:** Users select the resource type first, which determines which operations become available in the Operation parameter.

### Operation

**Display Name:** Operation

**Internal Name:** `operation`

**Type:** Dropdown (Options)

**Required:** Yes

**Description:** Defines the specific action to perform on the selected resource.

**Available Options (varies by Resource):**

**When Resource = "Project":**

- **Create** - Create a new project
- **Get** - Retrieve a specific project by ID
- **Get All** - Retrieve all projects
- **Update** - Modify an existing project
- **Delete** - Remove a project

**When Resource = "Task":**

- **Create** - Create a new task
- **Get** - Retrieve a specific task by ID
- **Get All** - Retrieve all tasks
- **Update** - Modify an existing task
- **Archive** - Archive a completed task

**When Resource = "User":**

- **Get** - Retrieve a specific user by ID
- **Get All** - Retrieve all users
- **Update** - Modify user information

**Usage Context:** The operation determines which additional fields appear in the node configuration and what API endpoint is called.

### Resource ID

**Display Name:** Project ID / Task ID / User ID (context-dependent)

**Internal Name:** `resourceId`

**Type:** String

**Required:** Conditional (required for Get, Update, Delete, and Archive operations)

**Description:** The unique identifier for the specific resource instance to operate on.

**Validation Rules:**

- Must be a valid UUID or numeric ID format
- Cannot be empty when required
- Supports expressions for dynamic ID assignment

**Display Conditions:**

- Shown when Operation is: Get, Update, Delete, or Archive
- Hidden when Operation is: Create or Get All
- Label changes based on selected Resource (e.g., "Project ID" when Resource is "Project")

**Usage Context:** Users provide the ID of the specific resource they want to retrieve, update, delete, or archive.

## Node Options

Options are additional, non-mandatory configuration fields that users can set to customize node behavior. They appear under "Additional Fields" or "Options" in the node interface. The Fantastic node includes the following options:

### Return All

**Display Name:** Return All

**Internal Name:** `returnAll`

**Type:** Boolean (Toggle)

**Default Value:** `false`

**Description:** When enabled, retrieves all matching records without pagination limits.

**Behavior:**

- **When False (default):** Returns results based on the Limit option (default 50)
- **When True:** Fetches all available records, making multiple API calls if necessary

**Display Conditions:**

- Only visible when Operation is "Get All"
- Automatically enables pagination handling in the background

**Use Cases:**

- Exporting complete datasets
- Bulk operations on all records
- Reporting and analytics workflows

### Limit

**Display Name:** Limit

**Internal Name:** `limit`

**Type:** Number

**Default Value:** `50`

**Range:** 1-1000

**Description:** Specifies the maximum number of records to return in a single request.

**Validation Rules:**

- Must be a positive integer
- Maximum value: 1000
- Minimum value: 1

**Display Conditions:**

- Only visible when Operation is "Get All"
- Hidden when "Return All" option is enabled

**Use Cases:**

- Controlling response size for performance
- Testing workflows with smaller datasets
- Implementing custom pagination logic

### Additional Fields

**Display Name:** Additional Fields

**Internal Name:** `additionalFields`

**Type:** Collection (Multi-value)

**Default Value:** Empty

**Description:** Optional fields that can be included in Create and Update operations to provide additional data.

**Available Sub-fields (varies by Resource and Operation):**

**For Project resource (Create/Update):**

- **Name** (string) - Project name
- **Description** (string) - Project description
- **Status** (dropdown: Active, Completed, On Hold) - Project status
- **Due Date** (dateTime) - Project deadline
- **Owner ID** (string) - ID of the project owner

**For Task resource (Create/Update):**

- **Title** (string) - Task title
- **Description** (string) - Task details
- **Priority** (dropdown: Low, Medium, High, Urgent) - Task priority level
- **Assignee ID** (string) - ID of the assigned user
- **Due Date** (dateTime) - Task deadline

**For User resource (Update only):**

- **Name** (string) - User's full name
- **Email** (string) - User's email address
- **Role** (dropdown: Admin, Member, Viewer) - User's role
- **Active** (boolean) - Whether the user account is active

**Display Conditions:**

- Shown when Operation is: Create or Update
- Sub-fields dynamically adjust based on selected Resource
- All sub-fields are optional

**Usage Context:** Allows users to provide optional data beyond the minimum required fields for resource creation or modification.
