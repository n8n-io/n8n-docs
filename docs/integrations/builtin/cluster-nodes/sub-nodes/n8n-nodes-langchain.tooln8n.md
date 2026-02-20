---
title: n8n Tool node documentation
description: Learn how to use the n8n Tool node in n8n. Follow technical documentation to integrate n8n Tool node into your workflows.
contentType: [integration, reference]
priority: high
---

# n8n Tool node

The n8n Tool node is a [tool](/glossary.md#ai-tool) that allows an [agent](/glossary.md#ai-agent) to interact with the n8n API to manage workflows, executions, credentials, and security audits.

Use this tool to enable AI agents to automate n8n instance management tasks like creating workflows, monitoring executions, managing credentials, and generating security audits.

On this page, you'll find the node parameters for the n8n Tool node, and links to more resources.

/// note | Credentials
Refer to [n8n API credentials](/integrations/builtin/credentials/n8n.md) for guidance on setting up authentication.
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

The n8n Tool node provides multiple resources and operations. Configure the tool by selecting a **Resource** and then an **Operation**.

### Resource

Select the type of n8n entity to work with:

* **Workflow**: Manage n8n workflows
* **Execution**: Monitor and manage workflow executions
* **Credential**: Handle credential creation and management
* **Audit**: Generate security audits for your n8n instance

### Operations by Resource

#### Workflow Operations

* **Get**: Retrieve a specific workflow by ID
* **Get Many**: Retrieve multiple workflows with optional filters (active status, name, tags)
* **Create**: Create a new workflow using a workflow JSON object
* **Update**: Update an existing workflow using a workflow JSON object
* **Delete**: Delete a workflow by ID
* **Activate**: Activate a workflow by ID
* **Deactivate**: Deactivate a workflow by ID

#### Execution Operations

* **Get**: Retrieve a specific execution by ID
* **Get Many**: Retrieve multiple executions with optional filters (workflow ID, status)
* **Delete**: Delete an execution by ID

#### Credential Operations

* **Create**: Create a new credential with name, type, and data
* **Delete**: Delete a credential by ID
* **Get Schema**: Retrieve the data schema for a specific credential type

#### Audit Operations

* **Generate**: Generate a security audit report for the n8n instance

### Resource-specific Parameters

#### Workflow

**Workflow ID** (for Get, Update, Delete, Activate, Deactivate operations): Select or specify the workflow using one of three methods:
* **From List**: Choose from available workflows
* **By URL**: Enter the full workflow URL (e.g., `https://myinstance.app.n8n.cloud/workflow/abc123`)
* **By ID**: Enter the workflow ID directly

**Workflow Object** (for Create and Update operations): A JSON object containing the workflow definition. Required fields include:
* `name`: The workflow name
* `nodes`: Array of workflow nodes
* `connections`: Object defining node connections
* `settings`: Workflow settings object

Example:
```json
{
  "name": "My workflow",
  "nodes": [],
  "connections": {},
  "settings": {}
}
```

**Filters** (for Get Many operation):
* **Active**: Filter by active workflows only
* **Name**: Filter workflows by name
* **Tags**: Comma-separated list of tags to filter by

#### Execution

**Execution ID** (for Get and Delete operations): The ID of the execution to retrieve or delete

**Filters** (for Get Many operation):
* **Workflow**: Filter executions by workflow ID
* **Status**: Filter by execution status (error, success, waiting)

#### Credential

**Name** (for Create operation): The name for the new credential

**Credential Type** (for Create and Get Schema operations): The credential type name (e.g., `n8nApi`, `githubApi`)

**Data** (for Create operation): A JSON object containing the credential data fields required for the credential type. Example:
```json
{
  "apiKey": "your-api-key",
  "baseUrl": "https://your-instance.app.n8n.cloud/api/v1"
}
```

**Credential ID** (for Delete operation): The ID of the credential to delete

### Options

**Limit** (for Get Many operations): Maximum number of results to return (default: 50, max: 250)

## Usage Notes

### Creating and Updating Workflows

When using the **Create** or **Update** operations for workflows, the workflow object must be pre-configured in the node's **Workflow Object** parameter field. The AI agent cannot pass workflow JSON as a dynamic parameter - it must be set in the node configuration before the tool is used.

### Creating Credentials

Similarly, when creating credentials, the credential data must be pre-configured in the node's **Data** parameter field. The agent can only specify the credential name and type dynamically.

### Node Naming

The tool's name (derived from the node name) must contain only alphanumeric characters and underscores, and cannot start with a number. Use descriptive names like `n8n_workflow_manager` or `n8n_execution_monitor`.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'n8n-tool') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/tools-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
