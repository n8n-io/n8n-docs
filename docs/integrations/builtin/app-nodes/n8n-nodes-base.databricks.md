---
title: Databricks node documentation
description: Learn how to use the Databricks node in n8n. Follow technical documentation to integrate Databricks node into your workflows.
contentType: [integration, reference]
---

# Databricks node

Use the Databricks node to automate work in Databricks, and integrate Databricks with other applications. n8n has built-in support for a wide range of Databricks features, including executing SQL queries, managing Unity Catalog objects, querying ML model serving endpoints, and working with vector search indexes.

On this page, you'll find a list of operations the Databricks node supports and links to more resources.

/// note | Credentials
Refer to [Databricks credentials](/integrations/builtin/credentials/databricks.md) for guidance on setting up authentication.
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* Databricks SQL
	* Execute Query
* File
	* Create Directory
	* Delete Directory
	* Delete File
	* Download File
	* Get File Metadata
	* List Directory
	* Upload File
* Genie
	* Create Conversation Message
	* Execute Message SQL Query
	* Get Conversation Message
	* Get Genie Space
	* Get Query Results
	* Start Conversation
* Model Serving
	* Query Endpoint
* Unity Catalog
	* Create Catalog
	* Create Function
	* Create Volume
	* Delete Catalog
	* Delete Function
	* Delete Volume
	* Get Catalog
	* Get Function
	* Get Table
	* Get Volume
	* List Catalogs
	* List Functions
	* List Tables
	* List Volumes
	* Update Catalog
* Vector Search
	* Create Index
	* Get Index
	* List Indexes
	* Query Index

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'databricks') ]]

## Related resources

Refer to [Databricks' REST API documentation](https://docs.databricks.com/api/) for details about their API.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
