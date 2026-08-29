---
title: n8n MCP server tools reference
description: >-
  Complete reference for all tools exposed by the n8n MCP server, including
  workflow management, workflow builder, agent management, and data table
  tools.
nodeTitle: MCP server tools reference
originalFilePath: advanced-ai/mcp/mcp_tools_reference.md
originalUrl: 'https://docs.n8n.io/advanced-ai/mcp/mcp_tools_reference'
url: >-
  https://docs.n8n.io/connect/connect-to-n8n-mcp-server/mcp-server-tools-reference
layout:
  description:
    visible: false
---

# n8n MCP server tools reference <a href="#n8n-mcp-server-tools-reference" id="n8n-mcp-server-tools-reference"></a>

This page describes all tools exposed by the instance-level MCP server.

---

## Workflow management <a href="#workflow-management" id="workflow-management"></a>

### search_workflows <a href="#searchworkflows" id="searchworkflows"></a>

Search for workflows with optional filters. Returns a preview of each workflow.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `query` | `string` | No | | Filter by name or description |
| `projectId` | `string` | No | | Filter by project ID |
| `tags` | `string[]` | No | | Filter by tag names. Uses AND semantics — a workflow must have all the listed tags to match. |
| `limit` | `integer` | No | `200` | Limit the number of results (max 200) |
| `sortBy` | `string` | No | `"updatedAt:desc"` | Sort order for results. One of: `"updatedAt:desc"`, `"updatedAt:asc"`, `"createdAt:desc"`, `"createdAt:asc"`, `"name:asc"`, `"name:desc"` |
| `folderId` | `string` | No | | Filter by folder. Pass `"0"` to match only workflows that sit at the project root rather than in a folder. |
| `includeSubfolders` | `boolean` | No | `true` | Whether a `folderId` search also covers that folder's subfolders. Set to `false` to match only workflows directly inside the folder. Ignored when `folderId` is `"0"`. |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | List of workflow previews |
| `data[].id` | `string` | The unique identifier of the workflow |
| `data[].name` | `string \| null` | The name of the workflow |
| `data[].description` | `string \| null` | The description of the workflow |
| `data[].active` | `boolean \| null` | Whether the workflow is active |
| `data[].createdAt` | `string \| null` | ISO timestamp when the workflow was created |
| `data[].updatedAt` | `string \| null` | ISO timestamp when the workflow was last saved |
| `data[].triggerCount` | `number \| null` | The number of triggers associated with the workflow |
| `data[].availableInMCP` | `boolean` | Whether the workflow is visible to MCP tools |
| `data[].parentFolderId` | `string \| null` | The ID of the folder holding the workflow, or null if at the project root |
| `data[].tags` | `array` | Tags assigned to the workflow, each with `id` and `name` |
| `count` | `integer` | Total number of workflows that match the filters |

#### Notes <a href="#notes" id="notes"></a>

- Maximum result limit is 200.
- Results are sorted by most recently updated workflows first by default.
- Filtering by `tags`, and the `tags` field in results, are available from n8n 2.27.0. Use `list_workflow_tags` to discover the available tag names.
- Results no longer include `scopes` or `canExecute` from n8n 2.35.0. Use `get_workflow_details` to check permissions for a single workflow.
- Filtering by `folderId`, and the `parentFolderId` field in results, are available from n8n 2.37.0. Use `search_folders` to resolve a folder name to an ID, or pass the `parentFolderId` of a workflow you already found to list its siblings.
- **IMPORTANT**: This tool can list all workflows a user has access to, regardless of their `Available in MCP` setting.

### get_workflow_details <a href="#getworkflowdetails" id="getworkflowdetails"></a>

Get detailed information about a specific workflow, including trigger details.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `workflowId` | `string` | Yes | | The ID of the workflow to retrieve |
| `detailLevel` | `"full" | "execution"` | No | `"full"` | How much of the workflow to return. `"full"` returns the complete workflow. `"execution"` returns only the metadata and trigger information needed to run it |

{% hint style="info" %}
**Feature availability**

`detailLevel` is available from n8n 2.35.0. Earlier versions always return the full workflow.
{% endhint %}

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `workflow` | `object` | Sanitized workflow data safe for MCP consumption |
| `workflow.id` | `string` | Workflow ID |
| `workflow.name` | `string \| null` | Workflow name |
| `workflow.active` | `boolean` | Whether the workflow has a published active version |
| `workflow.isArchived` | `boolean` | Whether the workflow is archived |
| `workflow.versionId` | `string` | The current workflow version ID |
| `workflow.activeVersionId` | `string \| null` | The active workflow version ID, if available |
| `workflow.triggerCount` | `number` | Number of triggers |
| `workflow.nodeCount` | `number` | Number of nodes in the workflow. Returned at both detail levels |
| `workflow.createdAt` | `string \| null` | ISO timestamp when the workflow was created |
| `workflow.updatedAt` | `string \| null` | ISO timestamp when the workflow was last saved |
| `workflow.settings` | `object \| null` | Workflow settings |
| `workflow.connections` | `object` | Workflow connections graph |
| `workflow.nodes` | `array` | List of workflow nodes. Credential references are stripped |
| `workflow.nodeGroups` | `array` | Node groups in the workflow. Only returned when `detailLevel` is `"full"` |
| `workflow.activeVersion` | `object \| null` | Active workflow graph, if available |
| `workflow.activeVersion.sameAsDraft` | `boolean` | When `true`, the published version matches the current draft, so use the top-level `nodes`, `connections`, and `nodeGroups`. When `false`, the published graph is returned in the fields below |
| `workflow.activeVersion.nodes` | `array` | Nodes from the active workflow version. Credential references are stripped |
| `workflow.activeVersion.connections` | `object` | Connections from the active workflow version |
| `workflow.activeVersion.nodeGroups` | `array` | Node groups in the published version. Present only when `sameAsDraft` is `false` |
| `workflow.tags` | `array` | Tags with `id` and `name` |
| `workflow.meta` | `object \| null` | Workflow metadata |
| `workflow.parentFolderId` | `string \| null` | Parent folder ID |
| `workflow.description` | `string` | Workflow description, if set |
| `workflow.scopes` | `string[]` | User permissions for this workflow |
| `workflow.canExecute` | `boolean` | Whether the user has permission to execute this workflow |
| `triggerInfo` | `string` | Human-readable instructions describing how to trigger the workflow |

#### Notes <a href="#notes" id="notes"></a>

- Sensitive credential data is stripped from returned nodes. Each credential reference keeps only its `id` and `name`, so you can reuse an existing credential without creating a duplicate.
- Includes active version details if the workflow is published.
- Includes user permission scopes and whether the workflow can be executed by the current user.
- Use `triggerInfo` to understand how supported trigger nodes can be invoked.
- Use `detailLevel: "execution"` when you only need to run the workflow with `execute_workflow`. It omits the node graph, which keeps the response small.

---

### execute_workflow <a href="#executeworkflow" id="executeworkflow"></a>

Execute a workflow by ID. Returns the execution ID immediately without waiting for completion.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `workflowId` | `string` | Yes | | The ID of the workflow to execute |
| `executionMode` | `"manual" \| "production"` | Yes | | `"manual"` tests the current version, `"production"` executes the published (active) version |
| `triggerNodeName` | `string` | No | | Name of the trigger node to execute. Required when providing `inputs`. If omitted, the workflow must have exactly one eligible trigger that doesn't require inputs, such as a **Schedule Trigger** or a **Manual Trigger** in manual mode. Use `get_workflow_details` to see available trigger names |
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
| `method` | `"GET" \| "POST" \| "PUT" \| "DELETE" \| "PATCH" \| "HEAD" \| "OPTIONS"` | No | `"GET"` | HTTP method |
| `query` | `Record<string, string>` | No | | Query string parameters |
| `body` | `Record<string, unknown>` | No | | Request body data |
| `headers` | `Record<string, string>` | No | | HTTP headers |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `executionId` | `string \| null` | The execution ID, or `null` if execution couldn't be started |
| `status` | `"started" \| "error"` | Whether the workflow execution was started successfully |
| `error` | `string` | Error message if the execution couldn't be started |

#### Notes <a href="#notes" id="notes"></a>

- This tool starts the workflow and returns immediately. Use `get_workflow_execution` with the returned `executionId` to check the final execution status or fetch execution data.
- Production mode supports workflows with Webhook, Chat Trigger, Form Trigger, and Schedule Trigger nodes.
- Manual mode also supports Manual Trigger nodes.
- When `executionMode` is `"production"`, the workflow must have a published (active) version.
- If a workflow has more than one eligible trigger, or its only eligible trigger requires input data (Webhook, Chat Trigger, or Form Trigger), `execute_workflow` returns an error listing the available trigger names instead of picking one. Pass `triggerNodeName` to specify which trigger to use.
- `execute_workflow` only picks a trigger automatically when the workflow has exactly one eligible trigger that doesn't require inputs, such as a Schedule Trigger or a Manual Trigger in manual mode.
- `triggerNodeName` and the error-on-multiple-triggers behavior are available from n8n 2.36.0. Earlier versions execute a trigger without letting you specify which one when a workflow has more than one.
- Executing workflows with multi-step forms or any kind of human-in-the-loop interactions isn't supported.

---

### test_workflow <a href="#testworkflow" id="testworkflow"></a>

{% hint style="info" %}
**Feature availability**

`test_workflow` is available from n8n 2.15.0.
{% endhint %}

Test a workflow using pin data to bypass external services. Trigger nodes, nodes with credentials, and HTTP Request nodes are pinned (use simulated data). Other nodes (Set, If, Code, etc.) execute normally, including credential-free I/O nodes like Execute Command or file read/write nodes.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `workflowId` | `string` | Yes | | The ID of the workflow to test |
| `pinData` | `Record<string, array>` | Yes | | Pin data for all workflow nodes. |
| `triggerNodeName` | `string` | No | | Optional name of the trigger node to start execution from. Defaults to the first trigger node. |
| `timeout` | `integer` | No | `300` | Timeout in seconds before the test execution is interrupted. Maximum 3600 (60 minutes). Increase it to test workflows that take longer to run |

{% hint style="info" %}
**Feature availability**

`timeout` is available from n8n 2.33.0.
{% endhint %}

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `executionId` | `string \| null` | The test execution ID |
| `status` | `string` | The status of the test execution. One of: `"success"`, `"error"`, `"running"`, `"waiting"`, `"canceled"`, `"crashed"`, `"new"`, `"unknown"` |
| `error` | `string` | Error message if the execution failed |

#### Notes <a href="#notes" id="notes"></a>

- Can be used to test workflow logic without setting up credentials or hitting external services.
- This tool executes workflows synchronously (waits for execution to finish).
- Has an enforced MCP execution timeout, five minutes by default. Use `timeout` to raise it, up to 60 minutes.

---

### prepare_workflow_pin_data <a href="#preparetestpindata" id="preparetestpindata"></a>

{% hint style="info" %}
**Feature availability**

`prepare_workflow_pin_data` is available from n8n 2.15.0.
{% endhint %}

Prepare test pin data for a workflow. Trigger nodes, nodes with credentials, and HTTP Request nodes need pin data. Logic nodes (Set, If, Code, etc.) and credential-free I/O nodes (Execute Command, file read/write) execute normally without pin data. Returns JSON Schemas describing the expected output shape for each node that needs pin data.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow to generate test pin data for |

#### Output <a href="#output" id="output"></a>

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

#### Notes <a href="#notes" id="notes"></a>

- Schemas should be used to generate realistic sample data for `test_workflow`.
- Renamed from `prepare_test_pin_data` in n8n 2.34.0.

---

### publish_workflow <a href="#publishworkflow" id="publishworkflow"></a>

{% hint style="info" %}
**Feature availability**

`publish_workflow` is available from n8n 2.12.0.
{% endhint %}

Publish (activate) a workflow to make it available for production execution. This creates an active version from the current draft.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow to publish |
| `versionId` | `string` | No | Optional version ID to publish. If not provided, publishes the current draft version. |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether publishing succeeded |
| `workflowId` | `string` | The workflow ID |
| `activeVersionId` | `string \| null` | The active version ID after publishing |
| `error` | `string` | Error message if publishing failed |


---

### unpublish_workflow <a href="#unpublishworkflow" id="unpublishworkflow"></a>

{% hint style="info" %}
**Feature availability**

`unpublish_workflow` is available from n8n 2.12.0.
{% endhint %}

Unpublish (deactivate) a workflow to stop it from being available for production execution.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow to unpublish |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether unpublishing succeeded |
| `workflowId` | `string` | The workflow ID |
| `error` | `string` | Error message if unpublishing failed |


---

### get_workflow_versions_diff <a href="#getworkflowversionsdiff" id="getworkflowversionsdiff"></a>

{% hint style="info" %}
**Feature availability**

`get_workflow_versions_diff` is available from n8n 2.36.0.
{% endhint %}

Compare two saved versions of a workflow and return what changed between them.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow the versions belong to |
| `fromVersionId` | `string` | Yes | The base (older) version ID |
| `toVersionId` | `string` | Yes | The target (newer) version ID |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether the comparison succeeded |
| `workflowId` | `string` | The workflow ID |
| `fromVersionId` | `string` | The base version ID |
| `toVersionId` | `string` | The target version ID |
| `nodesAdded` | `array` | Full content of nodes present in the target version but not the base version. Credential references are reduced to `id` and `name` |
| `nodesRemoved` | `array` | Nodes present in the base version but not the target version, each with `id`, `name`, and `type` |
| `nodesModified` | `array` | Nodes present in both versions whose content changed, each with `id`, `name`, `type`, and `changes` |
| `nodesModified[].changes` | `object` | Field-level delta. Changed values appear as `{ __old, __new }`, added keys as `<key>__added`, removed keys as `<key>__deleted`, and array changes as `[op, value]` tuples |
| `connectionsAdded` | `array` | Connections present in the target version but not the base version |
| `connectionsRemoved` | `array` | Connections present in the base version but not the target version |
| `error` | `string` | Error message if the comparison failed |

Each entry in `connectionsAdded` and `connectionsRemoved` has the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `from` | `string` | Source node name |
| `to` | `string` | Target node name |
| `type` | `string` | Connection type, such as `main` or `ai_tool` |
| `fromOutput` | `number` | Index of the source node output. For example, on an **If** node, `0` is the true branch and `1` is the false branch |
| `toInput` | `number` | Index of the target node input. For example, `1` is the second input of a **Merge** node |

#### Notes <a href="#notes" id="notes"></a>

- Get the version IDs from `get_workflow_history`.
- Pass the older version as `fromVersionId` and the newer one as `toVersionId`.
- `nodesAdded` contains the full node content, so you can read added nodes without a second call. For the content of removed nodes, fetch the base version with `get_workflow_version`.
- Nodes that only moved on the canvas aren't reported as modified.
- Renaming a node doesn't by itself produce connection changes, because connection endpoints are matched by node ID.
- Modified nodes list the name they have in the target version.


---

### search_projects <a href="#searchprojects" id="searchprojects"></a>

{% hint style="info" %}
**Feature availability**

`search_projects` is available from n8n 2.14.0.
{% endhint %}

Search for projects accessible to the current user. Use this to resolve a project ID before creating workflows or data tables in a specific project.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `string` | No | Filter projects by name. Results are ranked with exact case-insensitive matches first, then partial matches. |
| `type` | `"personal" \| "team"` | No | Filter by project type |
| `limit` | `integer` | No | Limit the number of results (max 100) |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | List of matching projects, sorted with exact case-insensitive matches first |
| `data[].id` | `string` | The unique identifier of the project |
| `data[].name` | `string` | The name of the project |
| `data[].type` | `"personal" \| "team"` | The project type |
| `data[].matchType` | `"exact" \| "partial"` | Whether the project name matches the query exactly or partially. Only present when `query` is provided |
| `count` | `integer` | Total number of matching projects |
| `teamProjectsEnabled` | `boolean` | Whether team projects are licensed on this instance. When `false`, `projectId` is omitted by default on `create_workflow_from_code`, so the workflow is created in the caller's personal project, unless the user explicitly selects one of the returned accessible projects. Omitted on error responses. Available from n8n 2.26.0. |
| `hint` | `string` | Guidance for picking a result. Present when the match is ambiguous (for example, no exact match but multiple partial matches), or when team projects aren't licensed on this instance |

#### Notes <a href="#notes" id="notes"></a>

- Maximum result limit is 100.
- If a user names a project, call this tool first and pass the resolved project ID to `create_workflow_from_code`, `update_workflow`, or data table tools.
- If `hint` is present, follow it before acting. For example, ask the user to clarify instead of guessing between multiple partial matches.

---

### search_folders <a href="#searchfolders" id="searchfolders"></a>

{% hint style="info" %}
**Feature availability**

`search_folders` is available from n8n 2.14.0.
{% endhint %}

Search for folders within a project.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectId` | `string` | Yes | The ID of the project to search folders in |
| `query` | `string` | No | Filter folders by name (case-insensitive partial match) |
| `limit` | `integer` | No | Limit the number of results (max 100) |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | List of matching folders |
| `data[].id` | `string` | The unique identifier of the folder |
| `data[].name` | `string` | The name of the folder |
| `data[].parentFolderId` | `string \| null` | The ID of the parent folder, or null if at project root |
| `count` | `integer` | Total number of matching folders |

#### Notes <a href="#notes" id="notes"></a>

- Maximum result limit is 100.
- This tool enables MCP clients to create workflows in a specific folder, and to resolve a folder name to the `folderId` that `search_workflows` filters by.

---

### list_workflow_tags <a href="#listtags" id="listtags"></a>

{% hint style="info" %}
**Feature availability**

`list_workflow_tags` is available from n8n 2.27.0.
{% endhint %}

List all workflow tags in the instance. Tags are global (not project-scoped) and can be used with `search_workflows` to filter results.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `limit` | `integer` | No | `500` | Limit the number of results (max 500) |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Workflow tags available in the instance |
| `data[].id` | `string` | The unique identifier of the tag |
| `data[].name` | `string` | The display name of the tag |
| `data[].usageCount` | `integer` | Number of non-archived workflows using this tag |
| `data[].createdAt` | `string` | ISO timestamp when the tag was created |
| `data[].updatedAt` | `string` | ISO timestamp when the tag was last updated |
| `count` | `integer` | Number of tags returned |
| `totalCount` | `integer` | Total number of tags before applying the limit |

#### Notes <a href="#notes" id="notes"></a>

- Maximum result limit is 500.
- Tags are global and aren't scoped to a project.
- `usageCount` only counts non-archived workflows.
- Requires the `tag:list` global permission.
- Only available when workflow tags are enabled on the instance. If tags are disabled in the instance settings, this tool isn't exposed.
- Renamed from `list_tags` in n8n 2.34.0.

---

## Execution management <a href="#execution-management" id="execution-management"></a>

### get_workflow_execution <a href="#getexecution" id="getexecution"></a>

{% hint style="info" %}
**Feature availability**

`get_workflow_execution` is available from n8n 2.12.0.
{% endhint %}

Get execution details by execution ID and workflow ID. By default returns metadata only.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow the execution belongs to |
| `executionId` | `string` | Yes | The ID of the execution to retrieve |
| `includeData` | `boolean` | No | Whether to include full execution result data. Defaults to false (metadata only). |
| `nodeNames` | `string[]` | No | When `includeData` is true, return data only for these nodes. If omitted, data for all nodes is included. |
| `truncateData` | `integer` | No | When `includeData` is true, limit the number of data items returned per node output. |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `execution` | `object \| null` | Execution metadata, or null if an error occurred |
| `execution.id` | `string` | Execution ID |
| `execution.workflowId` | `string` | Workflow ID |
| `execution.mode` | `string` | Execution mode |
| `execution.status` | `string` | Execution status |
| `execution.startedAt` | `string \| null` | ISO timestamp when the execution started |
| `execution.stoppedAt` | `string \| null` | ISO timestamp when the execution stopped |
| `execution.retryOf` | `string \| null` | ID of the execution this is a retry of |
| `execution.retrySuccessId` | `string \| null` | ID of the successful retry execution |
| `execution.waitTill` | `string \| null` | ISO timestamp the execution is waiting until |
| `data` | `unknown` | Execution result data (only present when `includeData` is true) |
| `error` | `string` | Error message if the request failed |

#### Notes <a href="#notes" id="notes"></a>

- Use lightweight metadata queries (default) when full execution data isn't needed.
- Filtering by `nodeNames` and truncating via `truncateData` helps manage large result sets.
- Renamed from `get_execution` in n8n 2.34.0.

---

### search_workflow_executions <a href="#searchexecutions" id="searchexecutions"></a>

{% hint style="info" %}
**Feature availability**

`search_workflow_executions` is available from n8n 2.20.0.
{% endhint %}

Search for workflow executions with optional filters. Returns execution metadata including status, timing, and workflow ID.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | No | Filter executions by workflow ID |
| `status` | `string[]` | No | Filter by execution statuses. Values: `"canceled"`, `"crashed"`, `"error"`, `"new"`, `"running"`, `"success"`, `"unknown"`, `"waiting"` |
| `startedAfter` | `string` | No | ISO 8601 timestamp. Only return executions that started after this time. |
| `startedBefore` | `string` | No | ISO 8601 timestamp. Only return executions that started before this time. |
| `limit` | `integer` | No | Limit the number of results (max 200) |
| `lastId` | `string` | No | Cursor for pagination. Pass the last execution ID from the previous page. |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | List of executions matching the query |
| `data[].id` | `string` | The unique identifier of the execution |
| `data[].workflowId` | `string` | The workflow this execution belongs to |
| `data[].status` | `string` | The execution status |
| `data[].mode` | `string` | How the execution was triggered. One of: `"cli"`, `"error"`, `"integrated"`, `"internal"`, `"manual"`, `"retry"`, `"trigger"`, `"webhook"`, `"evaluation"`, `"chat"` |
| `data[].startedAt` | `string \| null` | ISO timestamp when the execution started |
| `data[].stoppedAt` | `string \| null` | ISO timestamp when the execution stopped |
| `data[].waitTill` | `string \| null` | ISO timestamp until when the execution is waiting |
| `count` | `integer` | Total matching executions, or `-1` if the count is unavailable |
| `estimated` | `boolean` | Whether the count is an estimate for large datasets |
| `error` | `string` | Error message if the query failed |

#### Notes <a href="#notes" id="notes"></a>

- Renamed from `search_executions` in n8n 2.34.0.

---

## Credential management <a href="#credential-management" id="credential-management"></a>

### list_credentials <a href="#listcredentials" id="listcredentials"></a>

{% hint style="info" %}
**Feature availability**

`list_credentials` is available from n8n 2.21.0.
{% endhint %}

List credentials the current user can access. Use this to find a credential ID before referencing it from a workflow node. Never returns credential secret data.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | `integer` | No | Limit the number of results (max 200) |
| `query` | `string` | No | Filter credentials by name (partial match) |
| `type` | `string` | No | Filter by credential type, for example `"slackApi"` or `"httpHeaderAuth"` (partial match) |
| `projectId` | `string` | No | Restrict results to credentials belonging to this project |
| `onlySharedWithMe` | `boolean` | No | Only return credentials shared directly with the current user. Defaults to false. |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | List of credentials accessible to the current user |
| `data[].id` | `string` | The unique identifier of the credential |
| `data[].name` | `string` | The name of the credential |
| `data[].type` | `string` | The credential type, for example `"slackApi"` |
| `data[].scopes` | `string[]` | User permissions for this credential, for example `"credential:read"` |
| `data[].isManaged` | `boolean` | Whether the credential is managed by n8n and can't be edited by the user |
| `data[].isGlobal` | `boolean` | Whether the credential is available to all users |
| `data[].homeProject` | `object \| null` | The project that owns the credential, if available |
| `data[].homeProject.id` | `string` | The unique identifier of the project |
| `data[].homeProject.name` | `string` | The name of the project |
| `data[].homeProject.type` | `string` | The project type. `"personal"` is a user's private project; `"team"` is a shared project accessible to multiple users. |
| `count` | `integer` | Number of credentials returned |
| `error` | `string` | Error message if the request failed |

#### Notes <a href="#notes" id="notes"></a>

- Maximum result limit is 200.
- Credential secret data is never returned.
- By default, global credentials are included. Set `onlySharedWithMe` to true to exclude global credentials and only return credentials shared directly with the current user.

---

## Workflow builder <a href="#workflow-builder" id="workflow-builder"></a>

### get_workflow_sdk_reference <a href="#getsdkreference" id="getsdkreference"></a>

{% hint style="info" %}
**Feature availability**

`get_workflow_sdk_reference` is available from n8n 2.12.0.
{% endhint %}

Get the n8n Workflow SDK reference documentation including patterns, expression syntax, functions, rules, import syntax, guidelines, and design guidance.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `section` | `string` | No | `"all"` | Documentation section to retrieve. One of: `"patterns"`, `"patterns_detailed"`, `"expressions"`, `"functions"`, `"rules"`, `"import"`, `"guidelines"`, `"design"`, `"all"` |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `reference` | `string` | SDK reference documentation content for the requested section |

#### Notes <a href="#notes" id="notes"></a>

- Should be called first before building any workflows.
- Omit `section`, or set it to `"all"`, to retrieve the full reference.
- Use `"patterns_detailed"` for expanded workflow pattern examples.
- Renamed from `get_sdk_reference` in n8n 2.34.0.

---

### search_nodes <a href="#searchnodes" id="searchnodes"></a>

{% hint style="info" %}
**Feature availability**

`search_nodes` is available from n8n 2.12.0.
{% endhint %}

Search for n8n nodes by service name, trigger type, or utility function. Set `usage` to `"agentTool"` to return only agent-compatible tool nodes. Returns node IDs, discriminators (resource/operation/mode), and related nodes needed for `get_node_types` tool.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `queries` | `string[]` | Yes (min 1) | | Search queries -- service names (for example `"gmail"`, `"slack"`), trigger types (for example `"schedule trigger"`, `"webhook"`), or utility nodes (for example `"set"`, `"if"`, `"merge"`, `"code"`) |
| `usage` | `"workflow" \| "agentTool"` | No | `"workflow"` | Set to `"agentTool"` to return only nodes that can be configured as agent tools |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `results` | `string` | Search results with matching node IDs, discriminators, and related nodes |

#### Notes <a href="#notes" id="notes"></a>

- `usage` is available from n8n 2.34.0.
- Use `usage="agentTool"` when searching for nodes to attach to an agent as a tool, for example with `mutate_agent` or `create_agent`. This excludes nodes that can't run as an agent tool, such as human-in-the-loop and MCP client nodes.

---

### get_node_types <a href="#getnodetypes" id="getnodetypes"></a>

{% hint style="info" %}
**Feature availability**

`get_node_types` is available from n8n 2.12.0.
{% endhint %}

Get TypeScript type definitions for n8n nodes. Returns exact parameter names and structures.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeIds` | `array` | Yes (min 1) | Array of node type request objects. Always pass objects (even for a single node), for example `{ "nodeId": "n8n-nodes-base.gmail" }`. Include discriminators from `search_nodes` results when available. |

**Node ID object format:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `nodeId` | `string` | Yes | The node type ID (for example `"n8n-nodes-base.gmail"`) |
| `version` | `string` | No | Specific version (for example `"2.1"`) |
| `resource` | `string` | No | Resource discriminator (for example `"message"`) |
| `operation` | `string` | No | Operation discriminator (for example `"send"`) |
| `mode` | `string` | No | Mode discriminator |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `definitions` | `string` | TypeScript type definitions for the requested nodes |

#### Notes <a href="#notes" id="notes"></a>

- Critical for correct node configuration - MCP clients should always call before writing workflow code.
- From n8n 2.27.0, every `nodeIds` entry must be an object. Plain string node IDs are no longer accepted - wrap them as `{ "nodeId": "..." }`.
- Use the `resource`, `operation`, and `mode` discriminators for multi-variant nodes.

---

### get_workflow_best_practices <a href="#getworkflowbestpractices" id="getworkflowbestpractices"></a>

{% hint style="info" %}
**Feature availability**

`get_workflow_best_practices` is available from n8n 2.26.0.
{% endhint %}

Get best-practices guidance for a workflow technique. Useful this before searching for nodes or writing workflow code.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `technique` | `string` | Yes | Workflow technique key to fetch guidance for. Pass `"list"` to discover all available techniques. Values include: `"scheduling"`, `"chatbot"`, `"form_input"`, `"scraping_and_research"`, `"monitoring"`, `"enrichment"`, `"triage"`, `"content_generation"`, `"document_processing"`, `"data_extraction"`, `"data_analysis"`, `"data_transformation"`, `"data_persistence"`, `"notification"`, `"knowledge_base"`, `"human_in_the_loop"`, `"web_app"` |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `technique` | `string` | The requested technique key, or `"list"` when listing all available techniques |
| `message` | `string` | Human-readable summary of the response |
| `documentation` | `string` | Best-practices documentation for the requested technique, when available |
| `availableTechniques` | `array` | List of available techniques, returned when `technique` is `"list"` |
| `availableTechniques[].technique` | `string` | Technique key |
| `availableTechniques[].description` | `string` | Description of the technique |
| `availableTechniques[].hasDocumentation` | `boolean` | Whether detailed best-practices documentation is available for this technique |

#### Notes <a href="#notes" id="notes"></a>

- When called with `technique: "list"`, will list all available techniques
- Some known techniques may not have detailed documentation yet. In that case, the tool returns a message without `documentation`.
- This replaces the previous `get_suggested_nodes` workflow-planning guidance.

---

### explore_node_resources <a href="#explorenoderesources" id="explorenoderesources"></a>

{% hint style="info" %}
**Feature availability**

`explore_node_resources` is available from n8n 2.27.0.
{% endhint %}

Resolve the real values behind a node's resource locator or load-options dropdown (for example Slack channels, Google Sheets tabs, or available AI models). Requires a credential to be set for the desired service.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeType` | `string` | Yes | Fully-qualified node type ID from `search_nodes` / `get_node_types`, for example `"n8n-nodes-base.slack"` |
| `version` | `number` | Yes | Node version, for example `4.7`. Must match a version returned by `search_nodes`. |
| `methodName` | `string` | Yes | The exact method name from the node's `@searchListMethod` or `@loadOptionsMethod` annotation in the type definition. Call `get_node_types` first to read the real method name — don't guess. |
| `methodType` | `"listSearch" \| "loadOptions"` | Yes | `"listSearch"` for `@searchListMethod` annotations (supports filter and pagination); `"loadOptions"` for `@loadOptionsMethod` annotations. |
| `credentialType` | `string` | Yes | Credential type key for the node, for example `"slackApi"` or `"googleSheetsOAuth2Api"` |
| `credentialId` | `string` | Yes | ID of a credential the user can access, obtained from `list_credentials` |
| `filter` | `string` | No | Optional search/filter text to narrow results |
| `paginationToken` | `string` | No | Pagination token from a previous call to fetch the next page (`listSearch` only) |
| `currentNodeParameters` | `object` | No | Current node parameters for dependent lookups. Some methods require prior selections — for example, listing sheets within a spreadsheet needs `{ documentId: { __rl: true, mode: "id", value: "<spreadsheetId>" } }`. Check the type definition's `displayOptions` to know which parameters a method depends on. |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `results` | `array` | Resources returned by the node method |
| `results[].name` | `string` | The display label of the resource |
| `results[].value` | `string \| number \| boolean` | The ID to use in workflow code |
| `results[].url` | `string` | URL for the resource, when available |
| `results[].description` | `string` | Description of the resource, when available |
| `paginationToken` | `string` | Pass back as `paginationToken` to fetch the next page. Absent when there are no more results. |
| `builderHint` | `string` | Selection guidance from the node's `@builderHint` annotation, when present |

#### Notes <a href="#notes" id="notes"></a>

- Requires a `credentialId` from `list_credentials`; the lookup runs as the current user using that credential.
- `listSearch` methods support `filter` and pagination via `paginationToken`; `loadOptions` methods don't.
- This tool reaches out to external services, unlike most other read-only tools.

---

### validate_workflow <a href="#validateworkflow" id="validateworkflow"></a>

{% hint style="info" %}
**Feature availability**

`validate_workflow` is available from n8n 2.12.0.
{% endhint %}

Validate n8n Workflow SDK code. Parses the code into a workflow and checks for errors. Always validate before creating or updating a workflow.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | `string` | Yes | Full TypeScript/JavaScript workflow code using the n8n Workflow SDK. Must include the workflow export. |

#### Output <a href="#output" id="output"></a>

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

#### Notes <a href="#notes" id="notes"></a>

- Must be called before `create_workflow_from_code` or `update_workflow`.
- Warnings may be present even when the code is valid.
- If `valid` is `false` and `hint` is present, follow the hint before retrying.

---

### validate_node_config <a href="#validatenodeconfig" id="validatenodeconfig"></a>

{% hint style="info" %}
**Feature availability**

`validate_node_config` is available from n8n 2.25.1.
{% endhint %}

Validate one or more node configurations independently against their generated node schemas. Useful while composing nodes, before assembling workflow code or calling `update_workflow`.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodes` | `array` | Yes (min 1, max 50) | One or more node configurations to validate independently |
| `nodes[].name` | `string` | No | Optional node name. Returned in the result to help correlate responses |
| `nodes[].type` | `string` | Yes | Full node type, for example `"n8n-nodes-base.set"` or `"@n8n/n8n-nodes-langchain.agent"` |
| `nodes[].typeVersion` | `number` | No | Node type version. Defaults to `1` |
| `nodes[].parameters` | `object` | No | Node parameters object, using the same shape as workflow JSON. Defaults to `{}` |
| `nodes[].subnodes` | `unknown` | No | Optional subnode configuration for AI parent nodes, for example LangChain agent model, memory, or tool references |
| `nodes[].isToolNode` | `boolean` | No | Set to `true` when validating a node wired as an AI tool subnode through an `ai_tool` connection |

#### Output <a href="#output" id="output"></a>

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

#### Notes <a href="#notes" id="notes"></a>

- This validates node parameter schemas only.
- It doesn't check workflow-level concerns such as connections, required inputs, triggers, disconnected nodes, or credential existence.
- For LangChain or AI tool subnodes, set `isToolNode` to `true` so the schema evaluates the correct display options branch.

---

### create_workflow_from_code <a href="#createworkflowfromcode" id="createworkflowfromcode"></a>

{% hint style="info" %}
**Feature availability**

`create_workflow_from_code` is available from n8n 2.12.0.
{% endhint %}

Create a workflow in n8n from validated SDK code. Parses the code into a workflow and saves it.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | `string` | Yes | Full TypeScript/JavaScript workflow code using the n8n Workflow SDK. Must be validated first with `validate_workflow`. |
| `skillsUsed` | `string[]` | No | Names of n8n skills used by the MCP client to produce this workflow. Values are normalized server-side. |
| `name` | `string` | No | Optional workflow name (max 128 chars). If not provided, uses the name from the code. |
| `description` | `string` | No | Workflow description. Text longer than 255 characters is shortened to 255 before saving. |
| `projectId` | `string` | No | Project ID to create the workflow in. Defaults to the user's personal project. Use `search_projects` first if the user names a project. |
| `folderId` | `string` | No | Folder ID to create the workflow in. Requires `projectId` to be set. Use `search_folders` to find a folder by name within a project. |

#### Output <a href="#output" id="output"></a>

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
| `targetProject.type` | `"personal" \| "team"` | Whether the workflow was created in a personal or team project |
| `note` | `string` | Additional notes about workflow creation, for example nodes skipped during credential auto-assignment or a description that was shortened to 255 characters |
| `hint` | `string` | Actionable recovery hint, if available after an error |

#### Notes <a href="#notes" id="notes"></a>

- Automatically assigns available credentials to nodes.
- HTTP Request nodes are skipped during credential auto-assignment and must be configured manually.
- Sets `availableInMCP` flag to true on the created workflow.
- Marks the workflow with `aiBuilderAssisted` metadata and `builderVariant: mcp`.
- Resolves webhook node IDs automatically.
- `folderId` requires `projectId` to also be provided.
- If the user names a target project, call `search_projects` first and pass the resolved `projectId`; don't guess.
- After creation, tell the user which project the workflow was created in using the `targetProject` field.
- From n8n 2.27.0, a `description` longer than 255 characters is truncated (not rejected); the response `note` mentions when this happens.

---

### update_workflow <a href="#updateworkflow" id="updateworkflow"></a>

{% hint style="info" %}
**Feature availability**

`update_workflow` is available from n8n 2.12.0. From n8n 2.20.0, this tool switched to performing partial updates instead of re-writing the full workflow on every update.
{% endhint %}

Update an existing workflow in n8n by applying an ordered batch of targeted partial updates. The batch is atomic: if any operation fails, no changes are saved.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow to update |
| `skillsUsed` | `string[]` | No | Names of n8n skills used by the MCP client to produce this workflow update. Values are normalized server-side. |
| `operations` | `array` | Yes | Ordered list of operations to apply. Must contain 1-100 operations. |

#### Supported operations <a href="#supported-operations" id="supported-operations"></a>

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

#### `setNodeSettings` fields <a href="#setnodesettings-fields" id="setnodesettings-fields"></a>

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `onError` | `"stopWorkflow" \| "continueRegularOutput" \| "continueErrorOutput"` | No | How the node behaves on error |
| `retryOnFail` | `boolean` | No | Whether to retry the node when it fails |
| `maxTries` | `integer` | No | Number of attempts when `retryOnFail` is true. Must be 2-5 |
| `waitBetweenTries` | `integer` | No | Milliseconds to wait between retry attempts. Must be 0-5000 |
| `alwaysOutputData` | `boolean` | No | Whether the node should always output data |
| `executeOnce` | `boolean` | No | Whether the node should execute only once |

#### Output <a href="#output" id="output"></a>

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

#### Notes <a href="#notes" id="notes"></a>

- Operations are applied in order and saved atomically.
- Existing credentials are preserved unless explicitly changed.
- Credential auto-assignment runs only for nodes added in the current call.
- HTTP Request nodes are skipped during credential auto-assignment and must be configured manually.
- The resulting workflow is validated before saving. Validation warnings are returned in `validationWarnings`.
- Marks the workflow with `aiBuilderAssisted` metadata and `builderVariant: mcp`.

---

### archive_workflow <a href="#archiveworkflow" id="archiveworkflow"></a>

{% hint style="info" %}
**Feature availability**

`archive_workflow` is available from n8n 2.12.0.
{% endhint %}

Archive a workflow in n8n by its ID.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | `string` | Yes | The ID of the workflow to archive |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `archived` | `boolean` | Whether the workflow was archived |
| `workflowId` | `string` | The ID of the archived workflow |
| `name` | `string` | The name of the archived workflow |

#### Notes <a href="#notes" id="notes"></a>

- Idempotent - skips already-archived workflows.

---

## Agent management <a href="#agent-management" id="agent-management"></a>

{% hint style="info" %}
**Feature availability**

Agent management tools are available from n8n 2.34.0, when the workflow builder and the agents module are both enabled on the instance. See [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents) for details.
{% endhint %}

{% hint style="info" %}
**Preview status**

Agents are in Preview and may change in future releases. Avoid relying on them in production workflows.
{% endhint %}

These tools create, configure, publish, and manage n8n agents: persisted, first-class conversational assistants with their own model, tools, skills, tasks, and channel integrations. An agent is a separate resource from a workflow, even though a workflow can contain an AI Agent node.

Tools that take an `agentId` resolve the project from the agent, so callers don't need to pass a project ID separately. Every tool other than `search_agents` only operates on agents with `availableInMCP` set to true; `search_agents` still returns every agent the current user can access, so a client can tell the user what exists and prompt them to enable MCP access if needed.

### search_agents <a href="#searchagents" id="searchagents"></a>

Search agents the current user can access. Use `publishedOnly` and `excludeAgentId` to discover candidate sub-agents.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `projectId` | `string` | No | | Restrict results to one project |
| `query` | `string` | No | | Filter by agent name |
| `publishedOnly` | `boolean` | No | `false` | Only return agents that have a published (active) version |
| `excludeAgentId` | `string` | No | | Agent ID to omit, useful for sub-agent search |
| `limit` | `integer` | No | `50` | Limit the number of results (max 100) |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | List of matching agents |
| `data[].id` | `string` | The unique identifier of the agent |
| `data[].name` | `string` | The name of the agent |
| `data[].projectId` | `string` | The project the agent belongs to |
| `data[].published` | `boolean` | Whether the agent has a published (active) version |
| `data[].availableInMCP` | `boolean` | Whether the agent is available to MCP tools |
| `data[].updatedAt` | `string` | ISO timestamp when the agent was last updated |
| `count` | `integer` | Number of agents returned |

#### Notes <a href="#notes" id="notes"></a>

- Maximum result limit is 100.
- Unlike other agent tools, `search_agents` returns agents regardless of their `availableInMCP` setting.
- To find candidate sub-agents for the `subAgents` config field, call with `publishedOnly: true` and pass the current agent's ID as `excludeAgentId`.

---

### get_agent <a href="#getagent" id="getagent"></a>

Read an agent draft, its skills, tasks, custom tools, runnable state, and `configHash`. Call before `mutate_agent`. Pass `versionId` to inspect a published version snapshot instead of the draft.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `agentId` | `string` | Yes | The ID of the agent to retrieve |
| `versionId` | `string` | No | Read a published version snapshot instead of the draft, for example the agent's `activeVersionId`. Snapshots are read-only, so the response has no `configHash`. |

#### Output <a href="#output" id="output"></a>

When `versionId` is omitted, the response describes the current draft:

| Field | Type | Description |
|-------|------|-------------|
| `agent` | `object` | Agent metadata |
| `agent.id` | `string` | Agent ID |
| `agent.name` | `string` | Agent name |
| `agent.projectId` | `string` | The project the agent belongs to |
| `agent.published` | `boolean` | Whether the agent has a published (active) version |
| `agent.versionId` | `string` | The draft's internal version pointer |
| `agent.activeVersionId` | `string \| null` | The published version ID, or null if unpublished |
| `agent.createdAt` | `string` | ISO timestamp when the agent was created |
| `agent.updatedAt` | `string` | ISO timestamp when the agent was last updated |
| `config` | `object` | The editable agent configuration (model, credential, instructions, tools, and so on). Excludes `integrations`, which is reported separately below. |
| `configHash` | `string` | Hash of the full persisted configuration. Pass this as `baseConfigHash` to `mutate_agent`. |
| `isRunnable` | `boolean` | Whether the agent has everything it needs to run |
| `missing` | `string[]` | Config paths still needed before the agent is runnable |
| `skills` | `object` | Map of skill ID to skill body (`name`, `description`, `instructions`, and optionally `allowedTools`, `references`) |
| `tasks` | `array` | Scheduled tasks, each with `id`, `name`, `objective`, `cronExpression`, and `enabled` |
| `customTools` | `array` | Custom tools, each with `id` and `descriptor` (`name`, `description`, `inputSchema`, `outputSchema`, and related metadata) |
| `integrations` | `array` | Configured Slack, Telegram, or Linear integrations. Read-only here; manage with `update_agent_integration`. |

When `versionId` is provided, the response describes that published snapshot instead:

| Field | Type | Description |
|-------|------|-------------|
| `agent` | `object` | Agent metadata, same shape as above |
| `version` | `object` | Version metadata |
| `version.versionId` | `string` | The version ID |
| `version.author` | `string` | Who published this version |
| `version.createdAt` | `string` | ISO timestamp when this version was published |
| `version.isActive` | `boolean` | Whether this version is the currently published one |
| `config` | `object` | The editable agent configuration at that version |
| `skills` | `object` | Skills at that version |
| `tasks` | `array` | Tasks at that version, each with `id`, `name`, `objective`, `cronExpression`, `enabled` |
| `customTools` | `array` | Custom tools at that version |

#### Notes <a href="#notes" id="notes"></a>

- A version snapshot response has no `configHash` and can't be used as a `mutate_agent` baseline; mutations only ever apply to the draft.
- Use `list_agent_versions` to find a `versionId` to inspect.

---

### get_agent_builder_reference <a href="#getagentbuilderreference" id="getagentbuilderreference"></a>

Return the required reference for agent configuration and `mutate_agent` operations, including the canonical agent configuration JSON Schema. Read before building an agent.

#### Parameters <a href="#parameters" id="parameters"></a>

This tool takes no parameters.

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `uri` | `string` | The `n8n://agents/reference` resource URI carrying the same content |
| `guide` | `string` | Markdown guide covering the build sequence, `mutate_agent` operations, custom tool authoring, integrations, and MCP server verification |
| `configSchema` | `object` | The canonical agent configuration JSON Schema |

#### Notes <a href="#notes" id="notes"></a>

- MCP clients that support resources can read the same content from the `n8n://agents/reference` resource instead. See [Agent builder reference resource](#agent-builder-reference-resource).
- Call this before `create_agent` or `mutate_agent` so configuration matches the current schema instead of being guessed.

---

### discover_agent_assets <a href="#discoveragentassets" id="discoveragentassets"></a>

Discover model catalogs, chat integrations, attachable workflows, published sub-agents, or MCP registry servers to ground an agent's configuration.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectId` | `string` | Yes | The project to discover assets in |
| `kind` | `"models" \| "integrations" \| "workflows" \| "subagents" \| "mcpServers"` | Yes | The kind of asset to discover |
| `query` | `string` | No | Filter for `workflows`, `subagents`, or `mcpServers` |
| `provider` | `string` | No | Model provider for `kind=models` (for example `"openai"`, `"anthropic"`). Omit to get a provider summary without model lists. |
| `credentialId` | `string` | No | Accessible credential used to verify live models for the selected provider |
| `excludeAgentId` | `string` | No | Agent to omit when `kind=subagents` |

#### Output <a href="#output" id="output"></a>

The `data` field's shape depends on `kind`:

| `kind` | `data` shape |
|--------|--------------|
| `models` (no `provider`) | `{ providers: [{ provider, name, modelCount }], hint }`, a provider summary. Pass `provider` to list its models. |
| `models` (with `provider`) | `{ provider, verified, models: [{ id, name, toolCall, releaseDate?, reasoning?, cost?, limits? }] }`. `verified` is true when the list was confirmed against the provider's own API using `credentialId`. |
| `integrations` | Array of `{ type, label, icon, credentialTypes, settingsRequired, settingsSchema?, settingsGuidance? }`. Telegram entries include `settingsSchema` and `settingsGuidance`. |
| `workflows` | Array of `{ name, active, triggerType }`, for workflows with a trigger supported for attaching as a `type: "workflow"` tool |
| `subagents` | Array of `{ agentId, name }`, for published agents in the project, excluding `excludeAgentId` |
| `mcpServers` | Array of MCP registry servers, each with `name`, `title`, `description`, `url`, `transport`, `authentication`, `credentialType`, `tools`, `metadata` |

Top-level response: `{ ok, kind, data }`.

#### Notes <a href="#notes" id="notes"></a>

- Omitting `provider` for `kind=models` returns a summary only; the full model catalog is too large for most MCP clients' token limits.
- For `kind=mcpServers`, omit `query` to list up to 20 registry servers; pass `query` to search by name.
- Attaching a discovered asset (a workflow, sub-agent, or MCP server) still requires adding it to the agent's config with `mutate_agent`.

---

### create_agent <a href="#createagent" id="createagent"></a>

Create an agent draft, optionally with its initial model, credential, instructions, and ordinary tool configuration. Use `mutate_agent` afterward for skills, tasks, and custom tools.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectId` | `string` | Yes | The project to create the agent in |
| `name` | `string` | Yes | The agent's name (max 128 chars) |
| `config` | `object` | No | Optional initial agent configuration. Must omit `name`, `skills`, `tasks`, `integrations`, and any `tools` entry with `type: "custom"`; the top-level `name` is injected automatically. A `credential` requires a `model` to also be set. |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `agent` | `object` | `{ id, name, projectId, published: false, versionId, activeVersionId }` |
| `configHash` | `string` | Hash of the created configuration. Pass as `baseConfigHash` to the first `mutate_agent` call. |
| `url` | `string` | The URL to open the agent in the n8n editor |

#### Notes <a href="#notes" id="notes"></a>

- Agents created through MCP are automatically made available to MCP tools (`availableInMCP: true`).
- Fetch [get_agent_builder_reference](#getagentbuilderreference) first to confirm the current configuration schema.
- Skills, tasks, and custom tools need server-generated IDs, so add them with `mutate_agent` after creation.
- If the initial `config` fails validation or references a credential the user can't access, the agent isn't created.

---

### mutate_agent <a href="#mutateagent" id="mutateagent"></a>

Apply one config, skill, task, or custom-tool mutation to an agent draft. Returns the next `configHash` for subsequent mutations.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `agentId` | `string` | Yes | The ID of the agent to mutate |
| `baseConfigHash` | `string` | Yes | The latest `configHash` returned by `get_agent` or a previous successful mutation |
| `operation` | `object` | Yes | The mutation to apply. Its fields sit directly on the object (no `value` wrapper) alongside `type`. |

**`operation` variants (discriminated by `type`):**

| `type` | Fields | Description |
|--------|--------|-------------|
| `config.replace` | `config: object` | Replace the full editable agent configuration. Can't include `integrations`. |
| `config.patch` | `patch: array` (min 1) | Apply an array of RFC 6902 JSON Patch operations (`add`, `remove`, `replace`, `move`, `copy`, `test`). Paths under `/integrations` are rejected. |
| `skill.upsert` | `skill: object`, `skillId?: string` | Omit `skillId` to create and attach a new skill; pass it to replace an existing skill body |
| `skill.delete` | `skillId: string` | Delete a skill and remove its config reference |
| `task.upsert` | `task: object`, `taskId?: string`, `enabled?: boolean` | Omit `taskId` to create a new scheduled task; pass it to replace an existing one. `task` has `name`, `objective`, and `cronExpression` (a standard five-field cron expression). |
| `task.delete` | `taskId: string` | Delete a task and remove its config reference |
| `customTool.upsert` | `code: string` | Compile, validate, store, and attach a custom tool from source code |
| `customTool.delete` | `toolId: string` | Delete a custom tool and remove its config reference |

#### Output <a href="#output" id="output"></a>

On success:

| Field | Type | Description |
|-------|------|-------------|
| `agentId` | `string` | The agent ID |
| `operation` | `string` | The applied operation's `type` |
| `configHash` | `string` | The configuration hash after this mutation. Pass to the next `mutate_agent` call. |
| `resource` | `object` | Present for skill, task, and custom-tool operations: `{ type: "skill" \| "task" \| "customTool", id }` |

On a stale configuration:

| Field | Type | Description |
|-------|------|-------------|
| `ok` | `boolean` | `false` |
| `code` | `string` | `"stale_config"` |
| `agentId` | `string` | The agent ID |
| `configHash` | `string` | The current, correct configuration hash |
| `message` | `string` | `"Call get_agent before retrying the mutation."` |

#### Notes <a href="#notes" id="notes"></a>

- Every mutation requires `baseConfigHash` from `get_agent` or the previous successful mutation. If the agent changed since that hash was read, the call returns `stale_config` instead of applying the mutation; call `get_agent` and retry against the returned `configHash`.
- Integrations (Slack, Telegram, Linear) can't be changed through `config.replace` or `config.patch`; use [update_agent_integration](#updateagentintegration).
- Custom tool code may only import `@n8n/agents` and `zod`. Its default export must be a `Tool` builder chain with `description`, `input` (a Zod schema), and `handler`; `output` is optional.
- Fetch [get_agent_builder_reference](#getagentbuilderreference) for the full configuration schema and worked examples before calling `config.replace` or `config.patch`.

---

### validate_agent <a href="#validateagent" id="validateagent"></a>

Validate an agent draft, its sidecar references, and user-accessible credentials.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `agentId` | `string` | Yes | The ID of the agent to validate |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `valid` | `boolean` | Whether the agent is valid and runnable |
| `errors` | `string[]` | Configuration schema errors |
| `missing` | `string[]` | Config paths still needed before the agent is runnable |
| `url` | `string` | The URL to open the agent in the n8n editor |

#### Notes <a href="#notes" id="notes"></a>

- Runs the same validation pass `publish_agent` enforces, so a passing result won't drift from what publishing accepts.
- Doesn't perform a live MCP server handshake; use `verify_agent_mcp_server` for that.
- A valid agent is a completed draft. Validating doesn't imply the agent should be published.

---

### call_agent <a href="#callagent" id="callagent"></a>

{% hint style="info" %}
**Feature availability**

`call_agent` is available from n8n 2.35.0.
{% endhint %}

Test an agent draft through the built-in Preview chat. Start or continue a conversation with a message request, or resume a returned approval after a person decides.

{% hint style="warning" %}
**This tool has real side effects**

`call_agent` runs the agent's real tools with real credentials, so it can change data in connected systems and send messages to real recipients. It isn't a dry run. Test on an agent draft you're willing to have act on the outside world.
{% endhint %}

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `agentId` | `string` | Yes | The ID of the agent to test |
| `request` | `object` | Yes | What to do, either a `message` request or an `approval` request. See below |

To start or continue a conversation, pass a `message` request:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `"message"` | Yes | Identifies the request type |
| `message` | `string` | Yes | The message to send to the agent |
| `sessionId` | `string` | No | Omit to start a new session. Pass the `sessionId` from a previous response to continue that conversation |

To resume a pending approval, pass an `approval` request:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `"approval"` | Yes | Identifies the request type |
| `approved` | `boolean` | Yes | Whether the person approved the pending tool call |
| `continuation` | `object` | Yes | Identifies the approval to resume. Build it from the previous response: `runId` and `toolCallId` come from the entry in `suspensions`, and `sessionId` and `response` come from the top level of that same response |

#### Output <a href="#output" id="output"></a>

The response varies with `status`. Not every field appears in every response.

| Field | Type | Description |
|-------|------|-------------|
| `ok` | `boolean` | Whether the call succeeded |
| `status` | `string` | One of `"completed"`, `"suspended"`, `"approval_required"`, or `"error"` |
| `response` | `string` | The agent's reply |
| `sessionId` | `string` | The session ID. Pass it back to continue the conversation |
| `executionId` | `string` | The execution ID, when one is available |
| `suspensions` | `array` | Pending approvals, each with `runId`, `toolCallId`, and `toolName`. Returned when `status` is `"approval_required"` |
| `approvals` | `array` | Approvals the agent is waiting on. Returned when `status` is `"suspended"` |
| `previewUrl` | `string` | URL to open the agent's Preview chat |
| `previewAccessNote` | `string` | Explains what to do when you can run the agent but can't open Preview |
| `code` | `string` | Error code when `status` is `"error"`, such as `session_not_found` or `agent_misconfigured` |
| `message` | `string` | Error message when `status` is `"error"` |
| `missing` | `string[]` | Config paths still needed, when `code` is `agent_misconfigured` |

#### Notes <a href="#notes" id="notes"></a>

- Requires the `agent:execute` scope on the agent's project.
- Available only when the agents feature is enabled and the agent is exposed to MCP.
- Every returned approval needs a person to decide. Don't approve them automatically.
- This tests agent behavior, not chat integrations.
- Testing doesn't publish the agent. A tested draft is still a draft.

---

### verify_agent_mcp_server <a href="#verifyagentmcpserver" id="verifyagentmcpserver"></a>

Test an MCP server with a user-accessible credential and return its available tools. Call before writing an `mcpServers` config entry.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `projectId` | `string` | Yes | | The project the agent belongs to |
| `name` | `string` | Yes | | Server name (max 64 chars, letters, numbers, `_` and `-` only) |
| `url` | `string` | Yes | | The HTTP(S) MCP server endpoint |
| `transport` | `"sse" \| "streamableHttp"` | No | `"streamableHttp"` | The MCP transport to use |
| `authentication` | `string` | No | `"none"` | Authentication method: `"none"`, `"bearerAuth"`, `"headerAuth"`, `"multipleHeadersAuth"`, `"mcpOAuth2Api"`, or any credential type name ending in `McpOAuth2Api`. Every value other than `"none"` requires `credential`. |
| `credential` | `string` | No | | Accessible credential ID; required when `authentication` isn't `"none"` |
| `connectionTimeoutMs` | `integer` | No | | Connection timeout in milliseconds (1–120,000) |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `tools` | `array` | Tools the server exposes, each with `name` and `description` |

#### Notes <a href="#notes" id="notes"></a>

- Opens a temporary connection to verify the server; it doesn't need to be attached to the agent first.
- `validate_agent` doesn't perform this live check, so an unverified `mcpServers` entry can pass validation and still fail at runtime.
- Use the returned tool names to populate `toolFilter` in the agent's `mcpServers` config entry instead of guessing.

---

### publish_agent <a href="#publishagent" id="publishagent"></a>

Publish a valid agent draft and activate its tasks and integrations. Pass `versionId` to republish a previously published version instead.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `agentId` | `string` | Yes | The ID of the agent to publish |
| `versionId` | `string` | No | Republish a previously published version instead of the current draft. The draft is left untouched. |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `agentId` | `string` | The agent ID |
| `published` | `boolean` | `true` |
| `versionId` | `string` | The published version's ID |
| `activeVersionId` | `string` | The active (published) version ID |
| `url` | `string` | The URL to open the agent in the n8n editor |

#### Notes <a href="#notes" id="notes"></a>

- Publishing the draft (no `versionId`) validates it first and fails if it isn't runnable. Republishing a version (`versionId` set) skips draft validation, since the draft isn't what goes live.
- Only call this after the user explicitly requests or confirms publication, activation, or deployment. Completing a build doesn't imply approval to publish.
- Activates the agent's scheduled tasks and any configured integrations.

---

### unpublish_agent <a href="#unpublishagent" id="unpublishagent"></a>

Unpublish an agent and stop its live tasks and integrations.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `agentId` | `string` | Yes | The ID of the agent to unpublish |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `agentId` | `string` | The agent ID |
| `published` | `boolean` | `false` |
| `versionId` | `string` | The draft's internal version pointer |
| `activeVersionId` | `string \| null` | `null` after unpublishing |

#### Notes <a href="#notes" id="notes"></a>

- Stops scheduled tasks and channel integrations from running until the agent is published again.
- The draft is left untouched and remains editable.

---

### revert_agent <a href="#revertagent" id="revertagent"></a>

Restore an agent draft from a published version, overwriting the draft's config, skills, tasks, and custom tools. Doesn't publish.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `agentId` | `string` | Yes | The ID of the agent to revert |
| `versionId` | `string` | No | The published version to restore the draft from. Defaults to the currently published version. |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `agentId` | `string` | The agent ID |
| `versionId` | `string` | The draft's internal version pointer after reverting |
| `activeVersionId` | `string \| null` | The currently published version ID, unchanged by this call |
| `configHash` | `string` | The configuration hash after reverting. Pass as `baseConfigHash` to the next `mutate_agent` call. |
| `url` | `string` | The URL to open the agent in the n8n editor |

#### Notes <a href="#notes" id="notes"></a>

- Overwrites the current draft; unpublished changes made since the last publish are lost.
- Doesn't publish the restored draft. Call `publish_agent` separately if needed.
- Inspect the version with `get_agent` (passing `versionId`) before reverting to it.

---

### list_agent_versions <a href="#listagentversions" id="listagentversions"></a>

List the publish history of an agent, newest first.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `agentId` | `string` | Yes | | The ID of the agent |
| `limit` | `integer` | No | `20` | Limit the number of results (max 100) |
| `offset` | `integer` | No | `0` | Number of versions to skip, for pagination |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Publish history, newest first |
| `data[].versionId` | `string` | The version ID |
| `data[].agentId` | `string` | The agent ID |
| `data[].createdAt` | `string` | ISO timestamp when this version was published |
| `data[].updatedAt` | `string` | ISO timestamp when this version was last updated |
| `data[].author` | `string` | Who published this version |
| `data[].isActive` | `boolean` | Whether this version is the currently published one |
| `count` | `integer` | Number of versions returned |

#### Notes <a href="#notes" id="notes"></a>

- Pass a `versionId` from this list to `get_agent` to inspect a version before `revert_agent` or `publish_agent`.

---

### update_agent_integration <a href="#updateagentintegration" id="updateagentintegration"></a>

Configure or disconnect a Slack, Telegram, or Linear conversation integration. This is the only way to manage integrations; `config.replace` and `config.patch` in `mutate_agent` can't change them.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `agentId` | `string` | Yes | The ID of the agent |
| `action` | `"connect" \| "disconnect"` | Yes | Whether to connect or disconnect the integration |
| `type` | `string` | Yes | Integration type returned by `discover_agent_assets` (`"slack"`, `"telegram"`, or `"linear"`) |
| `credentialId` | `string` | Yes | Accessible credential for this integration |
| `settings` | `object` | No | Integration settings. Required for Telegram `connect` operations (`accessMode`: `"public"` with `allowedUsers: []`, or `"private"` with at least one allowed Telegram user). |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `agentId` | `string` | The agent ID |
| `integration` | `object` | `{ type, credentialId }` |
| `configured` | `boolean` | Present on `connect`: `true` |
| `connected` | `boolean` | Whether the channel is live right now |
| `published` | `boolean` | Whether the agent has a published (active) version |
| `activeVersionId` | `string \| null` | The published version ID, or null if unpublished |
| `configHash` | `string` | The configuration hash after this change |

#### Notes <a href="#notes" id="notes"></a>

- Configuring an integration never publishes the agent. If the agent is already published, connecting starts the channel immediately; otherwise the channel stays inactive until `publish_agent` is called.
- Disconnecting tears down the live channel immediately, whether or not the agent is published.
- Confirm with the user before connecting a channel on an already-published agent, since it connects immediately.

---

### delete_agent <a href="#deleteagent" id="deleteagent"></a>

Permanently delete an agent and its associated resources.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `agentId` | `string` | Yes | The ID of the agent to delete |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `deleted` | `boolean` | `true` |
| `agentId` | `string` | The deleted agent's ID |

#### Notes <a href="#notes" id="notes"></a>

- This action can't be undone.

---

### Agent builder reference resource <a href="#agent-builder-reference-resource" id="agent-builder-reference-resource"></a>

For MCP clients that support resources, n8n also exposes the agent builder reference as a resource, alongside the [get_agent_builder_reference](#getagentbuilderreference) tool for clients that don't.

| Property | Value |
|----------|-------|
| URI | `n8n://agents/reference` |
| MIME type | `text/markdown` |
| Content | The same build-sequence guide, `mutate_agent` operation catalog, and canonical agent configuration JSON Schema returned by `get_agent_builder_reference` |

---

## Data tables <a href="#data-tables" id="data-tables"></a>

### search_data_tables <a href="#searchdatatables" id="searchdatatables"></a>

{% hint style="info" %}
**Feature availability**

`search_data_tables` is available from n8n 2.16.0.
{% endhint %}

Search for data tables accessible to the current user. Use this to find a data table ID before modifying or adding data to it.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `string` | No | Filter data tables by name (case-insensitive partial match) |
| `projectId` | `string` | No | Filter by project ID |
| `limit` | `integer` | No | Limit the number of results (max 100) |

#### Output <a href="#output" id="output"></a>

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

#### Notes <a href="#notes" id="notes"></a>

- Maximum result limit is 100.

---

### create_data_table <a href="#createdatatable" id="createdatatable"></a>

{% hint style="info" %}
**Feature availability**

`create_data_table` is available from n8n 2.16.0.
{% endhint %}

Create a new data table with the specified columns.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectId` | `string` | Yes | The project ID where the data table will be created |
| `name` | `string` | Yes | The name of the data table (min 1, max 128 chars, must be unique within the project) |
| `columns` | `array` | Yes (min 1) | The columns to create in the data table |
| `columns[].name` | `string` | Yes | Column name. Must start with a letter, contain only letters, numbers, and underscores (max 63 chars). |
| `columns[].type` | `string` | Yes | The data type of the column. One of: `"string"`, `"number"`, `"boolean"`, `"date"` |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | The unique identifier of the created data table |
| `name` | `string` | The name of the created data table |
| `projectId` | `string` | The project ID of the created data table |

#### Notes <a href="#notes" id="notes"></a>

- At least one column is required.
- Table name must be unique within the project.
- Column names must match the pattern: `^[a-zA-Z][a-zA-Z0-9_]*$` (max 63 chars).

---

### add_data_table_column <a href="#adddatatablecolumn" id="adddatatablecolumn"></a>

{% hint style="info" %}
**Feature availability**

`add_data_table_column` is available from n8n 2.16.0.
{% endhint %}

Add a new column to an existing data table.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataTableId` | `string` | Yes | The ID of the data table to add a column to |
| `projectId` | `string` | Yes | The project ID the data table belongs to |
| `name` | `string` | Yes | Column name. Must start with a letter, contain only letters, numbers, and underscores (max 63 chars). |
| `type` | `string` | Yes | The data type of the new column. One of: `"string"`, `"number"`, `"boolean"`, `"date"` |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether the operation succeeded |
| `message` | `string` | Description of the result |
| `column` | `object` | The created column |
| `column.id` | `string` | Column unique identifier |
| `column.name` | `string` | Column name |
| `column.type` | `string` | Column data type |

#### Notes <a href="#notes" id="notes"></a>

- Column names must match the pattern: `^[a-zA-Z][a-zA-Z0-9_]*$` (max 63 chars).
- Column type is immutable (through MCP) after creation.

---

### rename_data_table_column <a href="#renamedatatablecolumn" id="renamedatatablecolumn"></a>

{% hint style="info" %}
**Feature availability**

`rename_data_table_column` is available from n8n 2.16.0.
{% endhint %}

Rename a column in a data table.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataTableId` | `string` | Yes | The ID of the data table containing the column |
| `projectId` | `string` | Yes | The project ID the data table belongs to |
| `columnId` | `string` | Yes | The ID of the column to rename |
| `name` | `string` | Yes | The new column name. Must follow column naming rules. |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether the operation succeeded |
| `message` | `string` | Description of the result |
| `column` | `object` | The renamed column |
| `column.id` | `string` | Column unique identifier |
| `column.name` | `string` | New column name |
| `column.type` | `string` | Column data type |

#### Notes <a href="#notes" id="notes"></a>

- New name must follow column naming rules: `^[a-zA-Z][a-zA-Z0-9_]*$` (max 63 chars).

---

### delete_data_table_column <a href="#deletedatatablecolumn" id="deletedatatablecolumn"></a>

{% hint style="info" %}
**Feature availability**

`delete_data_table_column` is available from n8n 2.16.0.
{% endhint %}

Delete a column from a data table. This permanently removes the column and all its data.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataTableId` | `string` | Yes | The ID of the data table containing the column |
| `projectId` | `string` | Yes | The project ID the data table belongs to |
| `columnId` | `string` | Yes | The ID of the column to delete |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether the operation succeeded |
| `message` | `string` | Description of the result |

#### Notes <a href="#notes" id="notes"></a>

- Deleting a column through MCP can't be undone.

---

### rename_data_table <a href="#renamedatatable" id="renamedatatable"></a>

{% hint style="info" %}
**Feature availability**

`rename_data_table` is available from n8n 2.16.0.
{% endhint %}

Rename an existing data table.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataTableId` | `string` | Yes | The ID of the data table to rename |
| `projectId` | `string` | Yes | The project ID the data table belongs to |
| `name` | `string` | Yes | The new name for the data table (min 1, max 128 chars) |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether the operation succeeded |
| `message` | `string` | Description of the result |

#### Notes <a href="#notes" id="notes"></a>

- Name must be unique within the project.

---

### add_data_table_rows <a href="#adddatatablerows" id="adddatatablerows"></a>

{% hint style="info" %}
**Feature availability**

`add_data_table_rows` is available from n8n 2.16.0.
{% endhint %}

Insert rows into an existing data table. Each row is an object mapping column names to values.

#### Parameters <a href="#parameters" id="parameters"></a>

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataTableId` | `string` | Yes | The ID of the data table to insert rows into |
| `projectId` | `string` | Yes | The project ID the data table belongs to |
| `rows` | `array` | Yes (min 1, max 1000) | Array of row objects. Each object maps column names to values (`string`, `number`, `boolean`, or `null`). |

#### Output <a href="#output" id="output"></a>

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether the insert operation succeeded |
| `insertedCount` | `integer` | Number of rows successfully inserted |

#### Notes <a href="#notes" id="notes"></a>

- Maximum 1000 rows per call.
- Row values must be `string`, `number`, `boolean`, or `null`.
- Column names in row objects must match existing column names in the data table.
