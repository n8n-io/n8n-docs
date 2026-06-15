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

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `query` | `string` | No | | Filter by name or description |
| `projectId` | `string` | No | | Filter by project ID |
| `limit` | `integer` | No | `200` | Limit the number of results (max 200) |
| `sortBy` | `string` | No | `"updatedAt:desc"` | Sort order for results. One of: `"updatedAt:desc"`, `"updatedAt:asc"`, `"createdAt:desc"`, `"createdAt:asc"`, `"name:asc"`, `"name:desc"` |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | List of workflow previews |
| `data[].id` | `string` | The unique identifier of the workflow |
| `data[].name` | `string | null` | The name of the workflow |
| `data[].description` | `string | null` | The description of the workflow |
| `data[].active` | `boolean | null` | Whether the workflow is active |
| `data[].createdAt` | `string | null` | ISO timestamp when the workflow was created |
| `data[].updatedAt` | `string | null` | ISO timestamp when the workflow was last saved |
| `data[].triggerCount` | `number | null` | The number of triggers associated with the workflow |
| `data[].scopes` | `string[]` | User permissions for this workflow |
| `data[].canExecute` | `boolean` | Whether the user has permission to execute this workflow |
| `data[].availableInMCP` | `boolean` | Whether the workflow is visible to MCP tools |
| `count` | `integer` | Total number of workflows that match the filters |

#### Notes

- Maximum result limit is 200.
- Results are sorted by most recently updated workflows first by default.
- Includes user permission scopes for each workflow so MCP clients can see what actions are available for the workflow.
- **IMPORTANT**: This tool can list all workflows a user has access to, regardless of their `Available in MCP` setting.

---

### get_workflow_details

Get detailed information about a specific workflow, including trigger details.

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
| `workflow.active` | `boolean` | Whether the workflow has a published active version |
| `workflow.isArchived` | `boolean` | Whether the workflow is archived |
| `workflow.versionId` | `string` | The current workflow version ID |
| `workflow.activeVersionId` | `string | null` | The active workflow version ID, if available |
| `workflow.triggerCount` | `number` | Number of triggers |
| `workflow.createdAt` | `string | null` | ISO timestamp when the workflow was created |
| `workflow.updatedAt` | `string | null` | ISO timestamp when the workflow was last saved |
| `workflow.settings` | `object | null` | Workflow settings |
| `workflow.connections` | `object` | Workflow connections graph |
| `workflow.nodes` | `array` | List of workflow nodes. Credential references are stripped |
| `workflow.activeVersion` | `object | null` | Active workflow graph, if available |
| `workflow.activeVersion.nodes` | `array` | Nodes from the active workflow version. Credential references are stripped |
| `workflow.activeVersion.connections` | `object` | Connections from the active workflow version |
| `workflow.tags` | `array` | Tags with `id` and `name` |
| `workflow.meta` | `object | null` | Workflow metadata |
| `workflow.parentFolderId` | `string | null` | Parent folder ID |
| `workflow.description` | `string` | Workflow description, if set |
| `workflow.scopes` | `string[]` | User permissions for this workflow |
| `workflow.canExecute` | `boolean` | Whether the user has permission to execute this workflow |
| `triggerInfo` | `string` | Human-readable instructions describing how to trigger the workflow |

#### Notes

- Sensitive credential data is stripped from returned nodes.
- Includes active version details if the workflow is published.
- Includes user permission scopes and whether the workflow can be executed by the current user.
- Use `triggerInfo` to understand how supported trigger nodes can be invoked.

---

### execute_workflow

Execute a workflow by ID. Returns the execution ID immediately without waiting for completion.

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

**`webhookData` fields:**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `method` | `"GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"` | No | `"GET"` | HTTP method |
| `query` | `Record<string, string>` | No | | Query string parameters |
| `body` | `Record<string, unknown>` | No | | Request body data |
| `headers` | `Record<string, string>` | No | | HTTP headers |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `executionId` | `string | null` | The execution ID, or `null` if execution couldn't be started |
| `status` | `"started" | "error"` | Whether the workflow execution was started successfully |
| `error` | `string` | Error message if the execution couldn't be started |

#### Notes

- This tool starts the workflow and returns immediately. Use `get_execution` with the returned `executionId` to check the final execution status or fetch execution data.
- Production mode supports workflows with Webhook, Chat Trigger, Form Trigger, and Schedule Trigger nodes.
- Manual mode also supports Manual Trigger nodes.
- When `executionMode` is `"production"`, the workflow must have a published (active) version.
- If there are multiple supported triggers in a workflow, MCP clients may only be able to use one (first one) of them to trigger the workflow when using workflow execution tools.
- Executing workflows with multi-step forms or any kind of human-in-the-loop interactions isn't supported.

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

Search for projects accessible to the current user. Use this to resolve a project ID before creating workflows or data tables in a specific project.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `string` | No | Filter projects by name. Results are ranked with exact case-insensitive matches first, then partial matches. |
| `type` | `"personal" | "team"` | No | Filter by project type |
| `limit` | `integer` | No | Limit the number of results (max 100) |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | List of matching projects, sorted with exact case-insensitive matches first |
| `data[].id` | `string` | The unique identifier of the project |
| `data[].name` | `string` | The name of the project |
| `data[].type` | `"personal" | "team"` | The project type |
| `data[].matchType` | `"exact" | "partial"` | Whether the project name matches the query exactly or partially. Only present when `query` is provided |
| `count` | `integer` | Total number of matching projects |
| `hint` | `string` | Guidance for picking a result. Present when the match is ambiguous, for example when no exact match was found but multiple partial matches exist |

#### Notes

- Maximum result limit is 100.
- If a user names a project, call this tool first and pass the resolved project ID to `create_workflow_from_code`, `update_workflow`, or data table tools.
- If `hint` is present, follow it before acting. For example, ask the user to clarify instead of guessing between multiple partial matches.

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

## Execution management

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

### search_executions

/// info | Available from n8n v2.20.0
///

Search for workflow executions with optional filters. Returns execution metadata including status, timing, and workflow ID.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | No | Filter executions by workflow ID |
| `status` | `string[]` | No | Filter by execution statuses. Values: `"canceled"`, `"crashed"`, `"error"`, `"new"`, `"running"`, `"success"`, `"unknown"`, `"waiting"` |
| `startedAfter` | `string` | No | ISO 8601 timestamp. Only return executions that started after this time. |
| `startedBefore` | `string` | No | ISO 8601 timestamp. Only return executions that started before this time. |
| `limit` | `integer` | No | Limit the number of results (max 200) |
| `lastId` | `string` | No | Cursor for pagination. Pass the last execution ID from the previous page. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | List of executions matching the query |
| `data[].id` | `string` | The unique identifier of the execution |
| `data[].workflowId` | `string` | The workflow this execution belongs to |
| `data[].status` | `string` | The execution status |
| `data[].mode` | `string` | How the execution was triggered. One of: `"cli"`, `"error"`, `"integrated"`, `"internal"`, `"manual"`, `"retry"`, `"trigger"`, `"webhook"`, `"evaluation"`, `"chat"` |
| `data[].startedAt` | `string | null` | ISO timestamp when the execution started |
| `data[].stoppedAt` | `string | null` | ISO timestamp when the execution stopped |
| `data[].waitTill` | `string | null` | ISO timestamp until when the execution is waiting |
| `count` | `integer` | Total matching executions, or `-1` if the count is unavailable |
| `estimated` | `boolean` | Whether the count is an estimate for large datasets |
| `error` | `string` | Error message if the query failed |

---

## Credential management

### list_credentials

/// info | Available from n8n v2.21.0
///

List credentials the current user can access. Use this to find a credential ID before referencing it from a workflow node. Never returns credential secret data.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | `integer` | No | Limit the number of results (max 200) |
| `query` | `string` | No | Filter credentials by name (partial match) |
| `type` | `string` | No | Filter by credential type, for example `"slackApi"` or `"httpHeaderAuth"` (partial match) |
| `projectId` | `string` | No | Restrict results to credentials belonging to this project |
| `onlySharedWithMe` | `boolean` | No | Only return credentials shared directly with the current user. Defaults to false. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | List of credentials accessible to the current user |
| `data[].id` | `string` | The unique identifier of the credential |
| `data[].name` | `string` | The name of the credential |
| `data[].type` | `string` | The credential type, for example `"slackApi"` |
| `data[].scopes` | `string[]` | User permissions for this credential, for example `"credential:read"` |
| `data[].isManaged` | `boolean` | Whether the credential is managed by n8n and can't be edited by the user |
| `data[].isGlobal` | `boolean` | Whether the credential is available to all users |
| `data[].homeProject` | `object | null` | The project that owns the credential, if available |
| `data[].homeProject.id` | `string` | The unique identifier of the project |
| `data[].homeProject.name` | `string` | The name of the project |
| `data[].homeProject.type` | `string` | The project type. `"personal"` is a user's private project; `"team"` is a shared project accessible to multiple users. |
| `count` | `integer` | Number of credentials returned |
| `error` | `string` | Error message if the request failed |

#### Notes

- Maximum result limit is 200.
- Credential secret data is never returned.
- By default, global credentials are included. Set `onlySharedWithMe` to true to exclude global credentials and only return credentials shared directly with the current user.

---

## Workflow builder

### get_sdk_reference

/// info | Available from n8n v2.12.0
///

Get the n8n Workflow SDK reference documentation including patterns, expression syntax, functions, rules, import syntax, guidelines, and design guidance.

#### Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `section` | `string` | No | `"all"` | Documentation section to retrieve. One of: `"patterns"`, `"patterns_detailed"`, `"expressions"`, `"functions"`, `"rules"`, `"import"`, `"guidelines"`, `"design"`, `"all"` |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `reference` | `string` | SDK reference documentation content for the requested section |

#### Notes

- Should be called first before building any workflows.
- Omit `section`, or set it to `"all"`, to retrieve the full reference.
- Use `"patterns_detailed"` for expanded workflow pattern examples.

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

### get_workflow_best_practices

/// info | Available from n8n v2.26.0
///

Get best-practices guidance for a workflow technique. Useful this before searching for nodes or writing workflow code.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `technique` | `string` | Yes | Workflow technique key to fetch guidance for. Pass `"list"` to discover all available techniques. Values include: `"scheduling"`, `"chatbot"`, `"form_input"`, `"scraping_and_research"`, `"monitoring"`, `"enrichment"`, `"triage"`, `"content_generation"`, `"document_processing"`, `"data_extraction"`, `"data_analysis"`, `"data_transformation"`, `"data_persistence"`, `"notification"`, `"knowledge_base"`, `"human_in_the_loop"`, `"web_app"` |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `technique` | `string` | The requested technique key, or `"list"` when listing all available techniques |
| `message` | `string` | Human-readable summary of the response |
| `documentation` | `string` | Best-practices documentation for the requested technique, when available |
| `availableTechniques` | `array` | List of available techniques, returned when `technique` is `"list"` |
| `availableTechniques[].technique` | `string` | Technique key |
| `availableTechniques[].description` | `string` | Description of the technique |
| `availableTechniques[].hasDocumentation` | `boolean` | Whether detailed best-practices documentation is available for this technique |

#### Notes

- When called with `technique: "list"`, will list all available techniques
- Some known techniques may not have detailed documentation yet. In that case, the tool returns a message without `documentation`.
- This replaces the previous `get_suggested_nodes` workflow-planning guidance.

---


### validate_workflow

/// info | Available from n8n v2.12.0
///

Validate n8n Workflow SDK code. Parses the code into a workflow and checks for errors. Always validate before creating or updating a workflow.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | `string` | Yes | Full TypeScript/JavaScript workflow code using the n8n Workflow SDK. Must include the workflow export. |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `valid` | `boolean` | Whether the workflow code is valid |
| `nodeCount` | `number` | The number of nodes in the workflow. Only present when valid |
| `warnings` | `array` | Validation warnings, if any |
| `warnings[].code` | `string` | The warning code identifying the type of warning |
| `warnings[].message` | `string` | The warning message |
| `warnings[].nodeName` | `string` | The node that triggered the warning, if applicable |
| `warnings[].parameterPath` | `string` | The parameter path that triggered the warning, if applicable |
| `errors` | `string[]` | Validation errors. Only present when invalid |
| `hint` | `string` | Actionable recovery hint, if available |

#### Notes

- Must be called before `create_workflow_from_code` or `update_workflow`.
- Warnings may be present even when the code is valid.
- If `valid` is `false` and `hint` is present, follow the hint before retrying.

---

### validate_node_config

/// info | Available from n8n v2.25.1
///

Validate one or more node configurations independently against their generated node schemas. Useful while composing nodes, before assembling workflow code or calling `update_workflow`.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodes` | `array` | Yes (min 1, max 50) | One or more node configurations to validate independently |
| `nodes[].name` | `string` | No | Optional node name. Returned in the result to help correlate responses |
| `nodes[].type` | `string` | Yes | Full node type, for example `"n8n-nodes-base.set"` or `"@n8n/n8n-nodes-langchain.agent"` |
| `nodes[].typeVersion` | `number` | No | Node type version. Defaults to `1` |
| `nodes[].parameters` | `object` | No | Node parameters object, using the same shape as workflow JSON. Defaults to `{}` |
| `nodes[].subnodes` | `unknown` | No | Optional subnode configuration for AI parent nodes, for example LangChain agent model, memory, or tool references |
| `nodes[].isToolNode` | `boolean` | No | Set to `true` when validating a node wired as an AI tool subnode through an `ai_tool` connection |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `valid` | `boolean` | Whether every node configuration is valid |
| `results` | `array` | Per-node validation results, in input order |
| `results[].index` | `number` | Position of this node in the input array |
| `results[].name` | `string` | Echo of the input node name, if provided |
| `results[].type` | `string` | Echo of the input node type |
| `results[].valid` | `boolean` | Whether this node configuration is valid |
| `results[].errors` | `array` | Validation errors for this node. Omitted when the node is valid |
| `results[].errors[].path` | `string` | Parameter path of the error |
| `results[].errors[].message` | `string` | Human-readable error message |
| `error` | `string` | Top-level error message if validation couldn't run |

#### Notes

- This validates node parameter schemas only.
- It doesn't check workflow-level concerns such as connections, required inputs, triggers, disconnected nodes, or credential existence.
- For LangChain or AI tool subnodes, set `isToolNode` to `true` so the schema evaluates the correct display options branch.

---

### create_workflow_from_code

/// info | Available from n8n v2.12.0
///

Create a workflow in n8n from validated SDK code. Parses the code into a workflow and saves it.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | `string` | Yes | Full TypeScript/JavaScript workflow code using the n8n Workflow SDK. Must be validated first with `validate_workflow`. |
| `skillsUsed` | `string[]` | No | Names of n8n skills used by the MCP client to produce this workflow. Values are normalized server-side. |
| `name` | `string` | No | Optional workflow name (max 128 chars). If not provided, uses the name from the code. |
| `description` | `string` | No | Short workflow description (max 255 chars, 1-2 sentences). |
| `projectId` | `string` | No | Project ID to create the workflow in. Defaults to the user's personal project. Use `search_projects` first if the user names a project. |
| `folderId` | `string` | No | Folder ID to create the workflow in. Requires `projectId` to be set. Use `search_folders` to find a folder by name within a project. |

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
| `autoAssignedCredentials[].credentialType` | `string` | The credential type that was auto-assigned |
| `targetProject` | `object` | The project the workflow was created in |
| `targetProject.id` | `string` | The ID of the project |
| `targetProject.name` | `string` | The display name of the project |
| `targetProject.type` | `"personal" | "team"` | Whether the workflow was created in a personal or team project |
| `note` | `string` | Additional notes about workflow creation, for example nodes skipped during credential auto-assignment |
| `hint` | `string` | Actionable recovery hint, if available after an error |

#### Notes

- Automatically assigns available credentials to nodes.
- HTTP Request nodes are skipped during credential auto-assignment and must be configured manually.
- Sets `availableInMCP` flag to true on the created workflow.
- Marks the workflow with `aiBuilderAssisted` metadata and `builderVariant: mcp`.
- Resolves webhook node IDs automatically.
- `folderId` requires `projectId` to also be provided.
- If the user names a target project, call `search_projects` first and pass the resolved `projectId`; don't guess.
- After creation, tell the user which project the workflow was created in using the `targetProject` field.

---

### update_workflow

/// info | Available from n8n v2.12.0. Starting from v2.20.0, this tool switched to performing partial updates instead of re-writing the full workflow on every update.
///

Update an existing workflow in n8n by applying an ordered batch of targeted partial updates. The batch is atomic: if any operation fails, no changes are saved.

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow to update |
| `skillsUsed` | `string[]` | No | Names of n8n skills used by the MCP client to produce this workflow update. Values are normalized server-side. |
| `operations` | `array` | Yes | Ordered list of operations to apply. Must contain 1-100 operations. |

#### Supported operations

| Operation | Required fields | Optional fields | Description |
|-----------|-----------------|-----------------|-------------|
| `updateNodeParameters` | `nodeName`, `parameters` | `replace` | Deep-merges `parameters` into an existing node's parameters. If `replace` is `true`, replaces the full parameters object. |
| `setNodeParameter` | `nodeName`, `path`, `value` |  | Sets one parameter using an RFC 6901 JSON Pointer path, for example `/jsonSchema` or `/options/systemMessage`. Creates intermediate objects as needed. Array indices aren't supported; set the whole array instead. |
| `addNode` | `node.name`, `node.type`, `node.typeVersion` | `node.id`, `node.parameters`, `node.position`, `node.credentials`, `node.disabled`, `node.notes` | Adds a node. `position` is `[x, y]`. `id` is generated if omitted. Node names must be unique. |
| `removeNode` | `nodeName` |  | Removes a node and all inbound and outbound connections. Connected sub-nodes remain in the workflow but become disconnected. |
| `renameNode` | `oldName`, `newName` |  | Renames a node and rewrites connection references. The new name must be unique. |
| `addConnection` | `source`, `target` | `sourceIndex`, `targetIndex`, `connectionType` | Adds a connection. `sourceIndex` and `targetIndex` default to `0`; `connectionType` defaults to `main`. Existing identical connections aren't duplicated. |
| `removeConnection` | `source`, `target` | `sourceIndex`, `targetIndex`, `connectionType` | Removes a matching connection. `sourceIndex` and `targetIndex` default to `0`; `connectionType` defaults to `main`. |
| `setNodeCredential` | `nodeName`, `credentialKey`, `credentialId`, `credentialName` |  | Sets or replaces a node credential reference. The credential must be accessible and match the node type's accepted credential key. |
| `setNodePosition` | `nodeName`, `position` |  | Updates a node's canvas position as `[x, y]`. |
| `setNodeDisabled` | `nodeName`, `disabled` |  | Enables or disables a node. |
| `setNodeSettings` | `nodeName`, `settings` |  | Updates node-level execution settings. `settings` must include at least one supported setting. |
| `setWorkflowMetadata` |  | `name`, `description` | Updates workflow metadata. `name` has a maximum length of 128 characters; `description` has a maximum length of 255 characters. |

#### `setNodeSettings` fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `onError` | `"stopWorkflow" | "continueRegularOutput" | "continueErrorOutput"` | No | How the node behaves on error |
| `retryOnFail` | `boolean` | No | Whether to retry the node when it fails |
| `maxTries` | `integer` | No | Number of attempts when `retryOnFail` is true. Must be 2-5 |
| `waitBetweenTries` | `integer` | No | Milliseconds to wait between retry attempts. Must be 0-5000 |
| `alwaysOutputData` | `boolean` | No | Whether the node should always output data |
| `executeOnce` | `boolean` | No | Whether the node should execute only once |

#### Output

| Field | Type | Description |
|-------|------|-------------|
| `workflowId` | `string` | The ID of the updated workflow |
| `name` | `string` | The name of the updated workflow |
| `nodeCount` | `number` | The number of nodes in the workflow |
| `url` | `string` | The URL to open the workflow in n8n |
| `appliedOperations` | `number` | The number of operations applied |
| `autoAssignedCredentials` | `array` | Credentials automatically assigned to nodes added in this update |
| `autoAssignedCredentials[].nodeName` | `string` | The node that had credentials auto-assigned |
| `autoAssignedCredentials[].credentialName` | `string` | The credential that was auto-assigned |
| `autoAssignedCredentials[].credentialType` | `string` | The credential type that was auto-assigned |
| `validationWarnings` | `array` | Graph and JSON validation warnings for the resulting workflow. These warnings don't block saving |
| `validationWarnings[].code` | `string` | Warning code |
| `validationWarnings[].message` | `string` | Warning message |
| `validationWarnings[].nodeName` | `string` | Optional node associated with the warning |
| `note` | `string` | Additional notes about the workflow update, for example HTTP Request nodes skipped during credential auto-assignment |
| `error` | `string` | Error message if the update failed |

#### Notes

- Operations are applied in order and saved atomically.
- Existing credentials are preserved unless explicitly changed.
- Credential auto-assignment runs only for nodes added in the current call.
- HTTP Request nodes are skipped during credential auto-assignment and must be configured manually.
- The resulting workflow is validated before saving. Validation warnings are returned in `validationWarnings`.
- Marks the workflow with `aiBuilderAssisted` metadata and `builderVariant: mcp`.

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
- Column type is immutable (through MCP) after creation.

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
