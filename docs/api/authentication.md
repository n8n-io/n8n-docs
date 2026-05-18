---
description: Authentication for n8n's public REST API.
contentType: howto
---

# API authentication

n8n uses API keys to authenticate API calls.

/// info | Feature availability 
The n8n API isn't available during the free trial. Please upgrade to access this feature.
///

## Create an API key

1. Log in to n8n.
1. Go to **Settings** > **n8n API**.
1. Select **Create an API key**.
1. Choose a **Label** and set an **Expiration** time for the key.
1. If on an enterprise plan, choose the **Scopes** to give the key. Refer to [API Scopes](#api-scopes) for the full list of available scopes.
1. Copy **My API Key** and use this key to authenticate your calls.

## Call the API using your key

Send the API key in your API call as a header named `X-N8N-API-KEY`. 

For example, say you want to get all active workflows. Your curl request will look like this:

```shell
# For a self-hosted n8n instance
curl -X 'GET' \
  '<N8N_HOST>:<N8N_PORT>/<N8N_PATH>/api/v<version-number>/workflows?active=true' \
  -H 'accept: application/json' \
  -H 'X-N8N-API-KEY: <your-api-key>'

# For n8n Cloud
curl -X 'GET' \
  '<your-cloud-instance>/api/v<version-number>/workflows?active=true' \
  -H 'accept: application/json' \
  -H 'X-N8N-API-KEY: <your-api-key>'
```

## Node configuration

To call the n8n API from within a workflow, use the [n8n node](/integrations/builtin/core-nodes/n8n-nodes-base.n8n.md). When you create the credential, fill these fields:

- **API Key**: paste the key you created in [Create an API key](#create-an-api-key).
- **Base URL**: enter your instance's API root in one of these formats:
	- Cloud: `https://<name>.app.n8n.cloud/api/v1`, where `<name>` is your Cloud subdomain.
	- Self-hosted: `https://<your-instance-url>/api/v1`.

For the available operations and parameters, refer to the [n8n node](/integrations/builtin/core-nodes/n8n-nodes-base.n8n.md) documentation.

## Delete an API key

1. Log in to n8n.
2. Go to **Settings** > **n8n API**.
3. Select **Delete** next to the key you want to delete.
4. Confirm the delete by selecting **Delete Forever**.

## API Scopes

Users of [enterprise instances](https://n8n.io/enterprise/) can limit which resources and actions an API key can access with scopes. Choose the minimum scopes needed for the key's intended purpose.

Non-enterprise API keys have full access to all the account's resources and capabilities.

/// note | API key scopes vs. project role scopes
API key scopes control what an API key can do at the instance level. They differ from the **project role scopes** used to define custom roles inside a project. For project role scopes, refer to [Custom project roles](/user-management/rbac/custom-roles.md).
///

The following tables list the scopes available when you create a scoped API key, grouped by resource.

### Community package scopes

| Scope | Description |
|-------|-------------|
| `communityPackage:install` | Install a community node package on the instance. |
| `communityPackage:list` | List installed community node packages. |
| `communityPackage:uninstall` | Uninstall a community node package. |
| `communityPackage:update` | Update an installed community node package. |

### Credential scopes

| Scope | Description |
|-------|-------------|
| `credential:create` | Create credentials. |
| `credential:read` | Retrieve a credential and its data schema. |
| `credential:list` | List credentials. |
| `credential:update` | Update a credential. |
| `credential:delete` | Delete a credential. |
| `credential:move` | Transfer a credential to another project. |

### Data table scopes

| Scope | Description |
|-------|-------------|
| `dataTable:create` | Create a data table. |
| `dataTable:read` | Retrieve a data table. |
| `dataTable:list` | List data tables. |
| `dataTable:update` | Update a data table's metadata. |
| `dataTable:delete` | Delete a data table. |

### Data table column scopes

| Scope | Description |
|-------|-------------|
| `dataTableColumn:create` | Add a column to a data table. |
| `dataTableColumn:read` | Retrieve a data table column. |
| `dataTableColumn:update` | Update a data table column. |
| `dataTableColumn:delete` | Delete a data table column. |

### Data table row scopes

| Scope | Description |
|-------|-------------|
| `dataTableRow:create` | Insert rows into a data table. |
| `dataTableRow:read` | Read rows from a data table. |
| `dataTableRow:update` | Update existing rows in a data table. |
| `dataTableRow:delete` | Delete rows from a data table. |
| `dataTableRow:upsert` | Create or update rows in a data table in a single operation. |

### Execution scopes

| Scope | Description |
|-------|-------------|
| `execution:read` | Retrieve an execution and its details. |
| `execution:list` | List executions. |
| `execution:retry` | Retry a failed execution. |
| `execution:stop` | Stop a running execution. |
| `execution:delete` | Delete an execution. |

### Execution tags scopes

| Scope | Description |
|-------|-------------|
| `executionTags:list` | Read the annotation tags assigned to an execution. |
| `executionTags:update` | Update the annotation tags assigned to an execution. |

### Folder scopes

| Scope | Description |
|-------|-------------|
| `folder:create` | Create a folder in a project. |
| `folder:read` | Retrieve a folder. |
| `folder:list` | List folders in a project. |
| `folder:update` | Update a folder. |
| `folder:delete` | Delete a folder. |

### Insights scopes

| Scope | Description |
|-------|-------------|
| `insights:read` | Read instance insights data, including execution counts, failure rates, time saved, and average run time. |

### Project scopes

| Scope | Description |
|-------|-------------|
| `project:create` | Create a project. |
| `project:list` | List projects. |
| `project:update` | Update a project. |
| `project:delete` | Delete a project. |

### Security audit scopes

| Scope | Description |
|-------|-------------|
| `securityAudit:generate` | Generate a security audit report for the instance. |

### Source control scopes

| Scope | Description |
|-------|-------------|
| `sourceControl:pull` | Pull changes from the connected source control repository into the instance. |

### Tag scopes

| Scope | Description |
|-------|-------------|
| `tag:create` | Create a tag in the global tag registry. |
| `tag:read` | Retrieve a tag. |
| `tag:list` | List tags. |
| `tag:update` | Update a tag. |
| `tag:delete` | Delete a tag. |

### User scopes

| Scope | Description |
|-------|-------------|
| `user:create` | Invite or create users on the instance. |
| `user:read` | Retrieve a user. |
| `user:list` | List users. |
| `user:changeRole` | Change a user's global (instance-level) role. |
| `user:enforceMfa` | Enforce two-factor authentication enrolment on a user. |
| `user:delete` | Delete a user from the instance. |

### Variable scopes

| Scope | Description |
|-------|-------------|
| `variable:create` | Create an instance variable. |
| `variable:list` | List instance variables. |
| `variable:update` | Update an instance variable. |
| `variable:delete` | Delete an instance variable. |

### Workflow scopes

| Scope | Description |
|-------|-------------|
| `workflow:create` | Create a workflow. |
| `workflow:read` | Retrieve a workflow and its details. |
| `workflow:list` | List workflows. |
| `workflow:update` | Update a workflow. |
| `workflow:delete` | Delete a workflow. |
| `workflow:move` | Transfer a workflow to another project. |
| `workflow:activate` | Activate or deactivate a workflow. |

### Workflow tags scopes

| Scope | Description |
|-------|-------------|
| `workflowTags:list` | Read the tags assigned to a workflow. |
| `workflowTags:update` | Update the tags assigned to a workflow. |

