---
title: n8n
contentType:
  - integration
  - reference
priority: medium
nodeTitle: n8n
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.n8n.md
originalUrl: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.n8n
url: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.n8n
description: >-
  Documentation for the n8n node in n8n, a workflow automation platform.
  Includes guidance on usage, and links to examples.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# n8n

A node to integrate with n8n itself. This node allows you to consume the [n8n API](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api) in your workflows.

Refer to the [n8n REST API documentation](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api) for more information on using the n8n API. Refer to [API endpoint reference](/broken/spaces/r7wKI4I1BgdBCuq5Cvcx/pages/NjbdMwHH3QGuRDWQrwJY) for working with the API endpoints directly.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node in the [API authentication](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/authentication) documentation.
{% endhint %}

{% hint style="warning" %}
**SSL**

This node doesn't support SSL. If your server requires an SSL connection, use the [HTTP Request node](n8n-nodes-base.httprequest/) to call the [n8n API](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api). The HTTP Request node has options to [provide the SSL certificate](../credentials/httprequest.md#provide-an-ssl-certificate).
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

* Audit
  * [**Generate** a security audit](n8n-nodes-base.n8n.md#generate-audit)
* Credential
  * [**Create** a credential](n8n-nodes-base.n8n.md#create-credential)
  * [**Delete** a credential](n8n-nodes-base.n8n.md#delete-credential)
  * [**Get Schema**](n8n-nodes-base.n8n.md#get-credential-schema): Use this operation to get credential data schema for type
* Execution
  * [**Get** an execution](n8n-nodes-base.n8n.md#get-execution)
  * [**Get Many** executions](n8n-nodes-base.n8n.md#get-many-executions)
  * [**Delete** an execution](n8n-nodes-base.n8n.md#delete-execution)
* Workflow
  * [**Publish** a workflow](n8n-nodes-base.n8n.md#activate-deactivate-delete-and-get-workflow)
  * [**Create** a workflow](n8n-nodes-base.n8n.md#create-workflow)
  * [**Deactivate** a workflow](n8n-nodes-base.n8n.md#activate-deactivate-delete-and-get-workflow)
  * [**Delete** a workflow](n8n-nodes-base.n8n.md#activate-deactivate-delete-and-get-workflow)
  * [**Get** a workflow](n8n-nodes-base.n8n.md#activate-deactivate-delete-and-get-workflow)
  * [**Get Many** workflows](n8n-nodes-base.n8n.md#get-many-workflows)
  * [**Update** a workflow](n8n-nodes-base.n8n.md#update-workflow)

## Generate audit <a href="#generate-audit" id="generate-audit"></a>

This operation has no parameters. Configure it with these options:

* **Categories**: Select the risk categories you want the audit to include. Options include:
  * **Credentials**
  * **Database**
  * **Filesystem**
  * **Instance**
  * **Nodes**
* **Days Abandoned Workflow**: Use this option to set the number of days without execution after which a workflow should be considered abandoned. Enter a number of days. The default is `90`.

## Create credential <a href="#create-credential" id="create-credential"></a>

Configure this operation with these parameters:

* **Name**: Enter the name of the credential you'd like to create.
* **Credential Type**: Enter the credential's type. The available types depend on nodes installed on the n8n instance. Some built-in types include `githubApi`, `notionApi`, and `slackApi`.
* **Data**: Enter a valid JSON object with the required properties for this **Credential Type**. To see the expected format, use the **Get Schema** operation.

## Delete credential <a href="#delete-credential" id="delete-credential"></a>

Configure this operation with this parameter:

* **Credential ID**: Enter the ID of the credential you want to delete.

## Get credential schema <a href="#get-credential-schema" id="get-credential-schema"></a>

Configure this operation with this parameter:

* **Credential Type**: Enter the credential's type. The available types depend on nodes installed on the n8n instance. Some built-in types include `githubApi`, `notionApi`, and `slackApi`.

## Get execution <a href="#get-execution" id="get-execution"></a>

Configure this operation with this parameter:

* **Execution ID**: Enter the ID of the execution you want to retrieve.

### Get execution option <a href="#get-execution-option" id="get-execution-option"></a>

You can further configure this operation with this **Option**:

* **Include Execution Details**: Use this control to set whether to include the detailed execution data (turned on) or not (turned off).

## Get many executions <a href="#get-many-executions" id="get-many-executions"></a>

Configure this operation with these parameters:

* **Return All**: Set whether to return all results (turned on) or whether to limit the results to the entered **Limit** (turned on).
* **Limit**: Set the number of results to return if the **Return All** control is turned off.

### Get many executions filters <a href="#get-many-executions-filters" id="get-many-executions-filters"></a>

You can further configure this operation with these **Filters**:

* **Workflow**: Filter the executions by workflow. Options include:
  * **From list**: Select a workflow to use as a filter.
  * **By URL**: Enter a workflow URL to use as a filter.
  * **By ID**: Enter a workflow ID to use as a filter.
* **Status**: Filter the executions by status. Options include:
  * **Error**
  * **Success**
  * **Waiting**

### Get many execution options <a href="#get-many-execution-options" id="get-many-execution-options"></a>

You can further configure this operation with this **Option**:

* **Include Execution Details**: Use this control to set whether to include the detailed execution data (turned on) or not (turned off).

## Delete execution <a href="#delete-execution" id="delete-execution"></a>

Configure this operation with this parameter:

* **Execution ID**: Enter the ID of the execution you want to delete.

## Activate, deactivate, delete, and get workflow <a href="#activate-deactivate-delete-and-get-workflow" id="activate-deactivate-delete-and-get-workflow"></a>

The **Activate**, **Deactivate**, **Delete**, and **Get** workflow operations all include the same parameter for you to select the **Workflow** you want to perform the operation on. Options include:

* **From list**: Select the workflow from the list.
* **By URL**: Enter the URL of the workflow.
* **By ID**: Enter the ID of the workflow.

## Create workflow <a href="#create-workflow" id="create-workflow"></a>

Configure this operation with this parameter:

* **Workflow Object**: Enter a valid JSON object with the new workflow's details. The object requires these fields:
  * `name`
  * `nodes`
  * `connections`
  * `settings`

Refer to [n8n API reference](/broken/spaces/r7wKI4I1BgdBCuq5Cvcx/pages/NjbdMwHH3QGuRDWQrwJY) for more information.

## Get many workflows <a href="#get-many-workflows" id="get-many-workflows"></a>

Configure this operation with these parameters:

* **Return All**: Set whether to return all results (turned on) or whether to limit the results to the entered **Limit** (turned on).
* **Limit**: Set the number of results to return if the **Return All** control is turned off.

### Get many workflows filters <a href="#get-many-workflows-filters" id="get-many-workflows-filters"></a>

You can further configure this operation with these **Filters**:

* **Return Only Active Workflows**: Select whether to return only active workflows (turned on) or active and inactive workflows (turned off).
* **Tags**: Enter a comma-separated list of tags the returned workflows must have.

## Update workflow <a href="#update-workflow" id="update-workflow"></a>

Configure this operation with these parameters:

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

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

[Browse n8n integration templates](https://n8n.io/integrations/n8n) or [search all templates](https://n8n.io/workflows/)
