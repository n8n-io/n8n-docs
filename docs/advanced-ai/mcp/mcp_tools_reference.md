---
title: n8n MCP server tools reference
description: Complete reference for all tools exposed by the n8n MCP server, including workflow management, workflow builder, and data table tools.
---

# n8n MCP server tools reference

This page describes all tools exposed by the instance-level MCP server.

---

## Workflow management

### search_workflows

Search for workflows with optional filters. Returns a preview of each workflow.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `string` | No | Filter by name or description |
| `projectId` | `string` | No | Filter by project ID |
| `limit` | `integer` | No | Limit the number of results (max 200) |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | List of workflow previews |
| `data[].id` | `string` | The unique identifier of the workflow |
| `data[].name` | `string | null` | The name of the workflow |
| `data[].description` | `string | null` | The description of the workflow |
| `data[].active` | `boolean | null` | Whether the workflow is active |
| `data[].createdAt` | `string | null` | ISO timestamp when the workflow was created |
| `data[].updatedAt` | `string | null` | ISO timestamp when the workflow was last updated |
| `data[].triggerCount` | `number | null` | The number of triggers associated with the workflow |
| `data[].scopes` | `string[]` | User permissions for this workflow |
| `data[].canExecute` | `boolean` | Whether the user has permission to execute this workflow |
| `data[].availableInMCP` | `boolean` | Whether the workflow is visible to MCP tools |
| `count` | `integer` | Total number of workflows that match the filters |

#### Notes
- Column type is immutable (through MCP) after creation.
- Maximum result limit is 200.
- Includes user permission scopes for each workflow so MCP clients can get more info about what they can do with the workflow.
- **IMPORTANT**: This tool is able to list all workflows a user has access to, regardless of their `Available in MCP` setting.

---

### get_workflow_details

Get detailed information about a specific workflow including trigger details.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow to retrieve |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `workflow` | `object` | Sanitized workflow data safe for MCP consumption |
| `workflow.id` | `string` | Workflow ID |
| `workflow.name` | `string | null` | Workflow name |
| `workflow.active` | `boolean` | Whether the workflow is active |
| `workflow.isArchived` | `boolean` | Whether the workflow is archived |
| `workflow.versionId` | `string` | The current workflow version ID |
| `workflow.activeVersionId` | `string | null` | The active workflow version ID, if available |
| `workflow.triggerCount` | `number` | Number of triggers |
| `workflow.createdAt` | `string | null` | ISO creation timestamp |
| `workflow.updatedAt` | `string | null` | ISO last-updated timestamp |
| `workflow.settings` | `object | null` | Workflow settings |
| `workflow.connections` | `object` | Workflow connections graph |
| `workflow.nodes` | `array` | List of nodes (credentials stripped) |
| `workflow.activeVersion` | `object | null` | Active workflow graph (nodes + connections), if available |
| `workflow.tags` | `array` | Tags with `id` and `name` |
| `workflow.meta` | `object | null` | Workflow metadata |
| `workflow.parentFolderId` | `string | null` | Parent folder ID |
| `workflow.description` | `string` | The description of the workflow |
| `workflow.scopes` | `string[]` | User permissions for this workflow |
| `workflow.canExecute` | `boolean` | Whether the user has permission to execute this workflow |
| `triggerInfo` | `string` | Human-readable instructions describing how to trigger the workflow |

#### Notes

- Sensitive credential data is stripped from nodes before returning.
- Includes active version details if the workflow is published.

---

### execute_workflow

Execute a workflow by ID by mapping data from user prompt to trigger inputs. Returns execution ID and status. This will perform 'full' workflow execution, without mocking or skipping any nodes.

#### Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `workflowId` | `string` | Yes | | The ID of the workflow to execute |
| `executionMode` | `"manual" | "production"` | No | `"production"` | `"manual"` tests the current version, `"production"` executes the published (active) version |
| `inputs` | `object` | No | | Inputs to provide to the workflow (discriminated union, see below) |

**`inputs` variants (discriminated by `type`):**

| Type | Fields | Description |
|------|--------|-------------|
| `chat` | `chatInput: string` | Input for chat-based workflows |
| `form` | `formData: Record<string, unknown>` | Input data for form-based workflows |
| `webhook` | `webhookData: { method?, query?, body?, headers? }` | Input data for webhook-based workflows |


#### Output

| Field | Type | Description |
|-------|------|-------------|
| `executionId` | `string | null` | The execution ID |
| `status` | `string` | The status of the execution. One of: `"success"`, `"error"`, `"running"`, `"waiting"`, `"canceled"`, `"crashed"`, `"new"`, `"unknown"` |
| `error` | `string` | Error message if the execution failed |

#### Notes

- Only supports workflows with specific trigger node types: Webhook, Chat Trigger, Form Trigger, Manual Trigger, Schedule Trigger.
- When `executionMode` is `"production"`, the workflow must have a published (active) version.
- If there are multiple supported triggers in a workflow, MCP clients may only be able to use one (first one) of them to trigger the workflow when using workflow execution tools (not applicable to AI Workflow builder workflows).
- Executing workflows with multi-step forms or any kind of human-in-the-loop interactions isn't supported.

---

### get_execution

/// info | Available from n8n v2.12.0
///

Get execution details by execution ID and workflow ID. By default returns metadata only.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow the execution belongs to |
| `executionId` | `string` | Yes | The ID of the execution to retrieve |
| `includeData` | `boolean` | No | Whether to include full execution result data. Defaults to false (metadata only). |
| `nodeNames` | `string[]` | No | When `includeData` is true, return data only for these nodes. If omitted, data for all nodes is included. |
| `truncateData` | `integer` | No | When `includeData` is true, limit the number of data items returned per node output. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `execution` | `object | null` | Execution metadata, or null if an error occurred |
| `execution.id` | `string` | Execution ID |
| `execution.workflowId` | `string` | Workflow ID |
| `execution.mode` | `string` | Execution mode |
| `execution.status` | `string` | Execution status |
| `execution.startedAt` | `string | null` | ISO timestamp when the execution started |
| `execution.stoppedAt` | `string | null` | ISO timestamp when the execution stopped |
| `execution.retryOf` | `string | null` | ID of the execution this is a retry of |
| `execution.retrySuccessId` | `string | null` | ID of the successful retry execution |
| `execution.waitTill` | `string | null` | ISO timestamp the execution is waiting until |
| `data` | `unknown` | Execution result data (only present when `includeData` is true) |
| `error` | `string` | Error message if the request failed |

#### Notes

- Use lightweight metadata queries (default) when full execution data isn't needed.
- Filtering by `nodeNames` and truncating via `truncateData` helps manage large result sets.

---

### test_workflow

/// info | Available from n8n v2.15.0
///

Test a workflow using pin data to bypass external services. Trigger nodes, nodes with credentials, and HTTP Request nodes are pinned (use simulated data). Other nodes (Set, If, Code, etc.) execute normally, including credential-free I/O nodes like Execute Command or file read/write nodes.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow to test |
| `pinData` | `Record<string, array>` | Yes | Pin data for all workflow nodes. |
| `triggerNodeName` | `string` | No | Optional name of the trigger node to start execution from. Defaults to the first trigger node. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `executionId` | `string | null` | The test execution ID |
| `status` | `string` | The status of the test execution. One of: `"success"`, `"error"`, `"running"`, `"waiting"`, `"canceled"`, `"crashed"`, `"new"`, `"unknown"` |
| `error` | `string` | Error message if the execution failed |

#### Notes

- Can be used to test workflow logic without setting up credentials or hitting external services.
- This tool executes workflows synchronously (waits for execution to finish).
- Has an enforced MCP execution timeout (5 minutes).

---

### prepare_test_pin_data

/// info | Available from n8n v2.15.0
///

Prepare test pin data for a workflow. Trigger nodes, nodes with credentials, and HTTP Request nodes need pin data. Logic nodes (Set, If, Code, etc.) and credential-free I/O nodes (Execute Command, file read/write) execute normally without pin data. Returns JSON Schemas describing the expected output shape for each node that needs pin data.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow to generate test pin data for |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `nodeSchemasToGenerate` | `Record<string, JsonSchema>` | Nodes that need pin data. Keys are node names, values are JSON Schema objects describing the expected output shape. |
| `nodesWithoutSchema` | `string[]` | Node names that need pin data but have no output schema. Use empty defaults `[{"json": {}}]` for each. |
| `nodesSkipped` | `string[]` | Nodes that don't need pin data and will execute normally during the test. |
| `coverage` | `object` | Coverage statistics |
| `coverage.withSchemaFromExecution` | `number` | Nodes with schemas inferred from last successful execution output |
| `coverage.withSchemaFromDefinition` | `number` | Nodes with schemas from node type definitions |
| `coverage.withoutSchema` | `number` | Nodes with no data or schema |
| `coverage.skipped` | `number` | Nodes that will execute normally (no pin data needed) |
| `coverage.total` | `number` | Total number of enabled nodes |

#### Notes

- Schemas should be used to generate realistic sample data for `test_workflow`.

---

### publish_workflow

/// info | Available from n8n v2.12.0
///

Publish (activate) a workflow to make it available for production execution. This creates an active version from the current draft.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow to publish |
| `versionId` | `string` | No | Optional version ID to publish. If not provided, publishes the current draft version. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether publishing succeeded |
| `workflowId` | `string` | The workflow ID |
| `activeVersionId` | `string | null` | The active version ID after publishing |
| `error` | `string` | Error message if publishing failed |


---

### unpublish_workflow

/// info | Available from n8n v2.12.0
///

Unpublish (deactivate) a workflow to stop it from being available for production execution.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow to unpublish |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether unpublishing succeeded |
| `workflowId` | `string` | The workflow ID |
| `error` | `string` | Error message if unpublishing failed |


---

### search_projects

/// info | Available from n8n v2.14.0
///

Search for projects accessible to the current user.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `string` | No | Filter projects by name (case-insensitive partial match) |
| `type` | `"personal" | "team"` | No | Filter by project type |
| `limit` | `integer` | No | Limit the number of results (max 100) |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | List of matching projects |
| `data[].id` | `string` | The unique identifier of the project |
| `data[].name` | `string` | The name of the project |
| `data[].type` | `"personal" | "team"` | The project type |
| `count` | `integer` | Total number of matching projects |

#### Notes

- Maximum result limit is 100.
- This tool enables MCP clients to create workflows and data tables in a specific project.

---

### search_folders

/// info | Available from n8n v2.14.0
///

Search for folders within a project.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectId` | `string` | Yes | The ID of the project to search folders in |
| `query` | `string` | No | Filter folders by name (case-insensitive partial match) |
| `limit` | `integer` | No | Limit the number of results (max 100) |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | List of matching folders |
| `data[].id` | `string` | The unique identifier of the folder |
| `data[].name` | `string` | The name of the folder |
| `data[].parentFolderId` | `string | null` | The ID of the parent folder, or null if at project root |
| `count` | `integer` | Total number of matching folders |

#### Notes

- Maximum result limit is 100.
- This tool enables MCP clients to create workflows in a specific folder.

---

## Workflow builder

### get_sdk_reference

/// info | Available from n8n v2.12.0
///

Get the n8n Workflow SDK reference documentation including patterns, expression syntax, and functions.

#### Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `section` | `string` | No | `"all"` | Documentation section to retrieve. One of: `"patterns"`, `"expressions"`, `"functions"`, `"rules"`, `"import"`, `"guidelines"`, `"design"`, `"all"` |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `reference` | `string` | SDK reference documentation content for the requested section |

#### Notes

- Should be called first before building any workflows.
- Sections cover patterns, expression syntax, built-in functions, coding rules, import syntax, naming guidelines, and design guidance.

---

### search_nodes

/// info | Available from n8n v2.12.0
///

Search for n8n nodes by service name, trigger type, or utility function. Returns node IDs, discriminators (resource/operation/mode), and related nodes needed for `get_node_types` tool.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `string[]` | Yes (min 1) | Search queries -- service names (for example `"gmail"`, `"slack"`), trigger types (for example `"schedule trigger"`, `"webhook"`), or utility nodes (for example `"set"`, `"if"`, `"merge"`, `"code"`) |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `results` | `string` | Search results with matching node IDs, discriminators, and related nodes |


---

### get_node_types

/// info | Available from n8n v2.12.0
///

Get TypeScript type definitions for n8n nodes. Returns exact parameter names and structures.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeIds` | `array` | Yes (min 1) | Array of node IDs. Each element can be a plain string (for example `"n8n-nodes-base.gmail"`) or an object with discriminators (see below). |

**Node ID object format:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `nodeId` | `string` | Yes | The node type ID (for example `"n8n-nodes-base.gmail"`) |
| `version` | `string` | No | Specific version (for example `"2.1"`) |
| `resource` | `string` | No | Resource discriminator (for example `"message"`) |
| `operation` | `string` | No | Operation discriminator (for example `"send"`) |
| `mode` | `string` | No | Mode discriminator |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `definitions` | `string` | TypeScript type definitions for the requested nodes |

#### Notes

- Critical for correct node configuration - MCP clients should always call before writing workflow code.
- Supports both simple string node IDs and objects with discriminators for multi-variant nodes.

---

### get_suggested_nodes

/// info | Available from n8n v2.12.0
///

Get curated node recommendations for workflow technique categories. Returns recommended nodes with pattern hints and configuration guidance. Use after analyzing what kind of workflow to build.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `categories` | `string[]` | Yes (min 1) | Workflow technique categories. Available values: `chatbot`, `notification`, `scheduling`, `data_transformation`, `data_persistence`, `data_extraction`, `document_processing`, `form_input`, `content_generation`, `triage`, `find_research` |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `suggestions` | `string` | Curated node recommendations with pattern hints and configuration guidance |

---

### validate_workflow

/// info | Available from n8n v2.12.0
///

Validate n8n Workflow SDK code. Parses the code into a workflow and checks for errors. Returns the workflow JSON if valid, or detailed error messages to fix. Always validate before creating a workflow.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | `string` | Yes | Full TypeScript/JavaScript workflow code using the n8n Workflow SDK. Must include the workflow export. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `valid` | `boolean` | Whether the workflow code is valid |
| `nodeCount` | `number` | The number of nodes in the workflow (if valid) |
| `warnings` | `array` | Validation warnings (if any) |
| `warnings[].code` | `string` | The warning code identifying the type of warning |
| `warnings[].message` | `string` | The warning message |
| `warnings[].nodeName` | `string` | The node that triggered the warning |
| `warnings[].parameterPath` | `string` | The parameter path that triggered the warning |
| `errors` | `string[]` | Validation errors (if invalid) |

#### Notes

- Must be called before `create_workflow_from_code` or `update_workflow`.
- Warnings may be present even when the code is valid.

---

### create_workflow_from_code

/// info | Available from n8n v2.12.0
///

Create a workflow in n8n from validated SDK code. Parses the code into a workflow and saves it.
#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | `string` | Yes | Full TypeScript/JavaScript workflow code using the n8n Workflow SDK. Must be validated first with `validate_workflow`. |
| `name` | `string` | No | Optional workflow name (max 128 chars). If not provided, uses the name from the code. |
| `description` | `string` | No | Short workflow description (max 255 chars, 1-2 sentences). |
| `projectId` | `string` | No | Project ID to create the workflow in. Defaults to the user's personal project. |
| `folderId` | `string` | No | Folder ID to create the workflow in. Requires `projectId` to be set. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `workflowId` | `string` | The ID of the created workflow |
| `name` | `string` | The name of the created workflow |
| `nodeCount` | `number` | The number of nodes in the workflow |
| `url` | `string` | The URL to open the workflow in n8n |
| `autoAssignedCredentials` | `array` | List of credentials that were automatically assigned to nodes |
| `autoAssignedCredentials[].nodeName` | `string` | The name of the node that had credentials auto-assigned |
| `autoAssignedCredentials[].credentialName` | `string` | The name of the credential that was auto-assigned |
| `note` | `string` | Additional notes about the workflow creation (for example nodes skipped during credential auto-assignment) |

#### Notes

- Automatically assigns available credentials to nodes.
- HTTP Request nodes are skipped during credential auto-assignment and must be configured manually.
- Sets `availableInMCP` flag to true on the created workflow.
- Marks the workflow with `aiBuilderAssisted` metadata.
- Resolves webhook node IDs automatically.
- `folderId` requires `projectId` to also be provided.
- MCP clients should generate short descriptions for all new workflows.

---

### update_workflow

/// info | Available from n8n v2.12.0
///

Update an existing workflow in n8n from validated SDK code. Parses the code into a workflow and saves the changes.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow to update |
| `code` | `string` | Yes | Full TypeScript/JavaScript workflow code using the n8n Workflow SDK. Must be validated first with `validate_workflow`. |
| `name` | `string` | No | Optional workflow name (max 128 chars). If not provided, uses the name from the code. |
| `description` | `string` | No | Short workflow description (max 255 chars, 1-2 sentences). |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `workflowId` | `string` | The ID of the updated workflow |
| `name` | `string` | The name of the updated workflow |
| `nodeCount` | `number` | The number of nodes in the workflow |
| `url` | `string` | The URL to open the workflow in n8n |
| `autoAssignedCredentials` | `array` | List of credentials that were automatically assigned to nodes |
| `autoAssignedCredentials[].nodeName` | `string` | The name of the node that had credentials auto-assigned |
| `autoAssignedCredentials[].credentialName` | `string` | The name of the credential that was auto-assigned |
| `note` | `string` | Additional notes about the workflow update (for example nodes skipped during credential auto-assignment) |

#### Notes

- Preserves user-configured credentials from the existing workflow by matching nodes by name and type.
- Marks the workflow with `aiBuilderAssisted` metadata.
- MCP clients should (re)generate short descriptions for all modified workflows.

---

### archive_workflow

/// info | Available from n8n v2.12.0
///

Archive a workflow in n8n by its ID.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow to archive |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `archived` | `boolean` | Whether the workflow was archived |
| `workflowId` | `string` | The ID of the archived workflow |
| `name` | `string` | The name of the archived workflow |

#### Notes

- Idempotent - skips already-archived workflows.

---

## Data tables

### search_data_tables

/// info | Available from n8n v2.16.0
///

Search for data tables accessible to the current user. Use this to find a data table ID before modifying or adding data to it.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `string` | No | Filter data tables by name (case-insensitive partial match) |
| `projectId` | `string` | No | Filter by project ID |
| `limit` | `integer` | No | Limit the number of results (max 100) |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | List of data tables matching the query |
| `data[].id` | `string` | Unique identifier of the data table |
| `data[].name` | `string` | The name of the data table |
| `data[].projectId` | `string` | The project this data table belongs to |
| `data[].createdAt` | `string` | ISO timestamp when the data table was created |
| `data[].updatedAt` | `string` | ISO timestamp when the data table was last updated |
| `data[].columns` | `array` | The columns defined in this data table |
| `data[].columns[].id` | `string` | Column unique identifier |
| `data[].columns[].name` | `string` | Column name |
| `data[].columns[].type` | `string` | Column data type. One of: `"string"`, `"number"`, `"boolean"`, `"date"` |
| `data[].columns[].index` | `integer` | Column position in the table |
| `count` | `integer` | Total number of matching data tables |

#### Notes

- Maximum result limit is 100.

---

### create_data_table

/// info | Available from n8n v2.16.0
///

Create a new data table with the specified columns.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectId` | `string` | Yes | The project ID where the data table will be created |
| `name` | `string` | Yes | The name of the data table (min 1, max 128 chars, must be unique within the project) |
| `columns` | `array` | Yes (min 1) | The columns to create in the data table |
| `columns[].name` | `string` | Yes | Column name. Must start with a letter, contain only letters, numbers, and underscores (max 63 chars). |
| `columns[].type` | `string` | Yes | The data type of the column. One of: `"string"`, `"number"`, `"boolean"`, `"date"` |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | The unique identifier of the created data table |
| `name` | `string` | The name of the created data table |
| `projectId` | `string` | The project ID of the created data table |

#### Notes

- At least one column is required.
- Table name must be unique within the project.
- Column names must match the pattern: `^[a-zA-Z][a-zA-Z0-9_]*$` (max 63 chars).

---

### add_data_table_column

/// info | Available from n8n v2.16.0
///

Add a new column to an existing data table.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataTableId` | `string` | Yes | The ID of the data table to add a column to |
| `projectId` | `string` | Yes | The project ID the data table belongs to |
| `name` | `string` | Yes | Column name. Must start with a letter, contain only letters, numbers, and underscores (max 63 chars). |
| `type` | `string` | Yes | The data type of the new column. One of: `"string"`, `"number"`, `"boolean"`, `"date"` |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether the operation succeeded |
| `message` | `string` | Description of the result |
| `column` | `object` | The created column |
| `column.id` | `string` | Column unique identifier |
| `column.name` | `string` | Column name |
| `column.type` | `string` | Column data type |

#### Notes

- Column names must match the pattern: `^[a-zA-Z][a-zA-Z0-9_]*$` (max 63 chars).
- Column type is immutable (trough MCP) after creation.

---

### rename_data_table_column

/// info | Available from n8n v2.16.0
///

Rename a column in a data table.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataTableId` | `string` | Yes | The ID of the data table containing the column |
| `projectId` | `string` | Yes | The project ID the data table belongs to |
| `columnId` | `string` | Yes | The ID of the column to rename |
| `name` | `string` | Yes | The new column name. Must follow column naming rules. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether the operation succeeded |
| `message` | `string` | Description of the result |
| `column` | `object` | The renamed column |
| `column.id` | `string` | Column unique identifier |
| `column.name` | `string` | New column name |
| `column.type` | `string` | Column data type |

#### Notes

- New name must follow column naming rules: `^[a-zA-Z][a-zA-Z0-9_]*$` (max 63 chars).

---

### delete_data_table_column

/// info | Available from n8n v2.16.0
///

Delete a column from a data table. This permanently removes the column and all its data.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataTableId` | `string` | Yes | The ID of the data table containing the column |
| `projectId` | `string` | Yes | The project ID the data table belongs to |
| `columnId` | `string` | Yes | The ID of the column to delete |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether the operation succeeded |
| `message` | `string` | Description of the result |

#### Notes

- Deleting a column through MCP can't be undone.

---

### rename_data_table

/// info | Available from n8n v2.16.0
///

Rename an existing data table.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataTableId` | `string` | Yes | The ID of the data table to rename |
| `projectId` | `string` | Yes | The project ID the data table belongs to |
| `name` | `string` | Yes | The new name for the data table (min 1, max 128 chars) |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether the operation succeeded |
| `message` | `string` | Description of the result |

#### Notes

- Name must be unique within the project.

---

### add_data_table_rows

/// info | Available from n8n v2.16.0
///

Insert rows into an existing data table. Each row is an object mapping column names to values.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataTableId` | `string` | Yes | The ID of the data table to insert rows into |
| `projectId` | `string` | Yes | The project ID the data table belongs to |
| `rows` | `array` | Yes (min 1, max 1000) | Array of row objects. Each object maps column names to values (`string`, `number`, `boolean`, or `null`). |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether the insert operation succeeded |
| `insertedCount` | `integer` | Number of rows successfully inserted |

#### Notes

- Maximum 1000 rows per call.
- Row values must be `string`, `number`, `boolean`, or `null`.
- Column names in row objects must match existing column names in the data table.
