---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: n8n
description: Documentation for the n8n node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# n8n

A node to integrate with n8n itself. This node allows you to consume the [n8n API](/api/) in your workflows.

/// note | Credentials
Refer to the [API authentication](/api/authentication/) documentation for guidance on getting your n8n credentials.
///

/// warning | SSL
This node doesn't support SSL. If your server requires an SSL connection, use the [HTTP Request node](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to call the [n8n API](/api/).
The HTTP Request node has options to [provide the SSL certificate](/integrations/builtin/credentials/httprequest/#provide-an-ssl-certificate).
///

## Operations

* Audit
	* **Generate** a security audit
* Credential
	* **Create** a credential
	* **Delete** a credential
	* **Get Schema**: Use this operation to get credential data schema for type
* Execution
	* **Get** an execution
	* **Get Many** executions
	* **Delete** an execution
* Workflow
	* **Activate** a workflow
	* **Create** a workflow
	* **Deactivate** a workflow
	* **Delete** a workflow
	* **Get** a workflow
	* **Get Many** workflows
	* **Update** a workflow

## Node parameters

The parameters depend on the resource and operation you select.

### Create credential parameters

* **Name**: Enter the name of the credential you'd like to create.
* **Credential Type**: Enter the credential's type. The available types depend on nodes installed on the n8n instance. Some built-in types include `githubApi`, `notionApi`, and `slackApi`.
* **Data**: Enter a valid JSON object with the required properties for this **Credential Type**. To see the expected format, use the **Get Schema** operation.

### Delete credential parameters

* **Credential ID**: Enter the ID of the credential you want to delete.

### Get credential schema parameters

* **Credential Type**: Enter the credential's type. The available types depend on nodes installed on the n8n instance. Some built-in types include `githubApi`, `notionApi`, and `slackApi`.

### Get execution parameters

* **Execution ID**: Enter the ID of the execution you want to retrieve.

### Get many executions parameters

* **Return All**: Set whether to return all results (turned on) or whether to limit the results to the entered **Limit** (turned on).
* **Limit**: Set the number of results to return if the **Return All** control is turned off.

### Delete execution parameters

* **Execution ID**: Enter the ID of the execution you want to delete.

### Activate, deactivate, delete, and get workflow parameters

The **Activate**, **Deactivate**, **Delete**, and **Get** workflow operations all include the same parameter for you to select the **Workflow** you want to perform the operation on. Options include:

* **From list**: Select the workflow from the list.
* **By URL**: Enter the URL of the workflow.
* **By ID**: Enter the ID of the workflow.

### Create workflow parameters

* **Workflow Object**: Enter a valid JSON object with the new workflow's details. The object requires these fields:
	* `name`
	* `nodes`
	* `connections`
	* `settings`

Refer to the [n8n API | Create a worfklow documentation](/api/api-reference/#tag/Workflow/paths/~1workflows/post) for more information.

### Update workflow parameters

* **Workflow**: Select the workflow you want to update. Options include:
	* **From list**: Select the workflow from the list.
	* **By URL**: Enter the URL of the workflow.
	* **By ID**: Enter the ID of the workflow.
* **Workflow Object**: Enter a valid JSON object to update the workflow with. The object requires these fields:
	* `name`
	* `nodes`
	* `connections`
	* `settings`

Refer to the [n8n API | Update a workflow documentation](https://docs.n8n.io/api/api-reference/#tag/Workflow/paths/~1workflows~1%7Bid%7D/put) for more information.

## Node filters

The node filters depend on the resource and operation you select.

### Generate audit filters

* **Categories**: Select the risk categories you want the audit to include. Options include:
	* **Credentials**
	* **Database**
	* **Filesystem**
	* **Instance**
	* **Nodes**
* **Days Abandoned Workflow**: Use this option to set the number of days without execution after which a workflow should be considered abandoned. Enter a number of days. The default is `90`.

### Get many executions filters

* **Workflow**: Filter the executions by workflow. Options include:
	* **From list**: Select a workflow to use as a filter.
	* **By URL**: Enter a workflow URL to use as a filter.
	* **By ID**: Enter a workflow ID to use as a filter.
* **Status**: Filter the executions by status. Options include:
	* **Error**
	* **Success**
	* **Waiting**

## Node options

The options depend on the resource and operation you select.

### Get single or many execution options

The **Get Execution** and **Get Many Execution** operations have the same option:

* **Include Execution Details**: Use this control to set whether to include the detailed execution data (turned on) or not (turned off).

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'n8n') ]]
