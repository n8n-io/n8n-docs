---
description: Authentication for n8n's public REST API.
contentType: howto
nodeTitle: Authentication
originalFilePath: api/authentication.md
originalUrl: 'https://docs.n8n.io/api/authentication'
url: 'https://docs.n8n.io/connect/n8n-api/authentication'
layout:
  description:
    visible: false
---

# API authentication <a href="#api-authentication" id="api-authentication"></a>

n8n uses API keys to authenticate API calls.

{% hint style="info" %}
**Feature availability**

The n8n API isn't available during the free trial. Please upgrade to access this feature.
{% endhint %}

## Create an API key <a href="#create-an-api-key" id="create-an-api-key"></a>

1. Log in to n8n.
1. Go to **Settings** > **n8n API**.
1. Select **Create an API key**.
1. Choose a **Label** and set an **Expiration** time for the key.
1. If on an enterprise plan, choose the **Scopes** to give the key. Refer to [API Scopes](#api-scopes) for the full list of available scopes.
1. Copy **My API Key** and use this key to authenticate your calls.

## Call the API using your key <a href="#call-the-api-using-your-key" id="call-the-api-using-your-key"></a>

Send the API key in your API call as a header named `X-N8N-API-KEY`. 

For example, say you want to get all active workflows. Your curl request will look like this:

```shell
# For a self-hosted n8n instance <a href="#for-a-self-hosted-n8n-instance" id="for-a-self-hosted-n8n-instance"></a>
curl -X 'GET' \
  '<N8N_HOST>:<N8N_PORT>/<N8N_PATH>/api/v<version-number>/workflows?active=true' \
  -H 'accept: application/json' \
  -H 'X-N8N-API-KEY: <your-api-key>'

# For n8n Cloud <a href="#for-n8n-cloud" id="for-n8n-cloud"></a>
curl -X 'GET' \
  '<your-cloud-instance>/api/v<version-number>/workflows?active=true' \
  -H 'accept: application/json' \
  -H 'X-N8N-API-KEY: <your-api-key>'
```

## Node configuration <a href="#node-configuration" id="node-configuration"></a>

To call the n8n API from within a workflow, use the [n8n node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.n8n). When you create the credential, fill these fields:

- **API Key**: paste the key you created in [Create an API key](#create-an-api-key).
- **Base URL**: enter your instance's API root in one of these formats:
	- Cloud: `https://<name>.app.n8n.cloud/api/v1`, where `<name>` is your Cloud subdomain.
	- Self-hosted: `https://<your-instance-url>/api/v1`.

For the available operations and parameters, refer to the [n8n node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.n8n) documentation.

## Delete an API key <a href="#delete-an-api-key" id="delete-an-api-key"></a>

1. Log in to n8n.
2. Go to **Settings** > **n8n API**.
3. Select **Delete** next to the key you want to delete.
4. Confirm the delete by selecting **Delete Forever**.

## API Scopes <a href="#api-scopes" id="api-scopes"></a>

Users of [enterprise instances](https://n8n.io/enterprise/) can limit which resources and actions an API key can access with scopes. Choose the minimum scopes needed for the key's intended purpose.

Non-enterprise API keys have full access to all the account's resources and capabilities.

{% hint style="info" %}
**API key scopes vs. project role scopes**

API key scopes control what an API key can do at the instance level. They differ from the **project role scopes** used to define custom roles inside a project. For project role scopes, refer to [Custom project roles](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/create-custom-roles).
{% endhint %}

The following tables list the scopes available when you create a scoped API key, grouped by resource.

### Community package scopes <a href="#community-package-scopes" id="community-package-scopes"></a>

| Scope | Description |
|-------|-------------|
| `communityPackage:install` | Install a community node package on the instance. |
| `communityPackage:list` | List installed community node packages. |
| `communityPackage:uninstall` | Uninstall a community node package. |
| `communityPackage:update` | Update an installed community node package. |

### Credential scopes <a href="#credential-scopes" id="credential-scopes"></a>

| Scope | Description |
|-------|-------------|
| `credential:create` | Create credentials. |
| `credential:read` | Retrieve a credential and its data schema. |
| `credential:list` | List credentials. |
| `credential:update` | Update a credential. |
| `credential:delete` | Delete a credential. |
| `credential:move` | Transfer a credential to another project. |

### Data table scopes <a href="#data-table-scopes" id="data-table-scopes"></a>

| Scope | Description |
|-------|-------------|
| `dataTable:create` | Create a data table. |
| `dataTable:read` | Retrieve a data table. |
| `dataTable:list` | List data tables. |
| `dataTable:update` | Update a data table's metadata. |
| `dataTable:delete` | Delete a data table. |

### Data table column scopes <a href="#data-table-column-scopes" id="data-table-column-scopes"></a>

| Scope | Description |
|-------|-------------|
| `dataTableColumn:create` | Add a column to a data table. |
| `dataTableColumn:read` | Retrieve a data table column. |
| `dataTableColumn:update` | Update a data table column. |
| `dataTableColumn:delete` | Delete a data table column. |

### Data table row scopes <a href="#data-table-row-scopes" id="data-table-row-scopes"></a>

| Scope | Description |
|-------|-------------|
| `dataTableRow:create` | Insert rows into a data table. |
| `dataTableRow:read` | Read rows from a data table. |
| `dataTableRow:update` | Update existing rows in a data table. |
| `dataTableRow:delete` | Delete rows from a data table. |
| `dataTableRow:upsert` | Update an existing row in a data table, or insert a new one if no row matches the filter conditions. |

### Execution scopes <a href="#execution-scopes" id="execution-scopes"></a>

| Scope | Description |
|-------|-------------|
| `execution:read` | Retrieve an execution and its details. |
| `execution:list` | List executions. |
| `execution:retry` | Retry a failed execution. |
| `execution:stop` | Stop a running execution. |
| `execution:delete` | Delete an execution. |

### Execution tags scopes <a href="#execution-tags-scopes" id="execution-tags-scopes"></a>

| Scope | Description |
|-------|-------------|
| `executionTags:list` | Read the annotation tags assigned to an execution. |
| `executionTags:update` | Update the annotation tags assigned to an execution. |

### Folder scopes <a href="#folder-scopes" id="folder-scopes"></a>

| Scope | Description |
|-------|-------------|
| `folder:create` | Create a folder in a project. |
| `folder:read` | Retrieve a folder. |
| `folder:list` | List folders in a project. |
| `folder:update` | Update a folder. |
| `folder:delete` | Delete a folder. |

### Insights scopes <a href="#insights-scopes" id="insights-scopes"></a>

| Scope | Description |
|-------|-------------|
| `insights:read` | Read instance insights data, including execution counts, failure rates, time saved, and average run time. |

### Project scopes <a href="#project-scopes" id="project-scopes"></a>

| Scope | Description |
|-------|-------------|
| `project:create` | Create a project. |
| `project:list` | List projects. |
| `project:update` | Update a project. |
| `project:delete` | Delete a project. |

### Security audit scopes <a href="#security-audit-scopes" id="security-audit-scopes"></a>

| Scope | Description |
|-------|-------------|
| `securityAudit:generate` | Generate a security audit report for the instance. |

### Source control scopes <a href="#source-control-scopes" id="source-control-scopes"></a>

| Scope | Description |
|-------|-------------|
| `sourceControl:pull` | Pull changes from the connected source control repository into the instance. |

### Tag scopes <a href="#tag-scopes" id="tag-scopes"></a>

| Scope | Description |
|-------|-------------|
| `tag:create` | Create a tag in the global tag registry. |
| `tag:read` | Retrieve a tag. |
| `tag:list` | List tags. |
| `tag:update` | Update a tag. |
| `tag:delete` | Delete a tag. |

### User scopes <a href="#user-scopes" id="user-scopes"></a>

| Scope | Description |
|-------|-------------|
| `user:create` | Invite or create users on the instance. |
| `user:read` | Retrieve a user. |
| `user:list` | List users. |
| `user:changeRole` | Change a user's global (instance-level) role. |
| `user:enforceMfa` | Reserved scope. No `/api/v1/` endpoint consumes it, so selecting this scope on a Public API key has no public-facing effect. |
| `user:delete` | Delete a user from the instance. |

### Variable scopes <a href="#variable-scopes" id="variable-scopes"></a>

| Scope | Description |
|-------|-------------|
| `variable:create` | Create an instance variable. |
| `variable:list` | List instance variables. |
| `variable:update` | Update an instance variable. |
| `variable:delete` | Delete an instance variable. |

### Workflow scopes <a href="#workflow-scopes" id="workflow-scopes"></a>

| Scope | Description |
|-------|-------------|
| `workflow:create` | Create a workflow. |
| `workflow:read` | Retrieve a workflow and its details. |
| `workflow:list` | List workflows. |
| `workflow:update` | Update a workflow. |
| `workflow:delete` | Delete, archive, or unarchive a workflow. |
| `workflow:move` | Transfer a workflow to another project. |
| `workflow:activate` | Activate or deactivate a workflow. Also referred to as "publish/unpublish" in the public API (`/workflows/{id}/activate` and `/workflows/{id}/deactivate`). |

### Workflow tags scopes <a href="#workflow-tags-scopes" id="workflow-tags-scopes"></a>

| Scope | Description |
|-------|-------------|
| `workflowTags:list` | Read the tags assigned to a workflow. |
| `workflowTags:update` | Update the tags assigned to a workflow. |

