---
title: MongoDB node documentation
description: Learn how to use the MongoDB node in n8n. Follow technical documentation to integrate MongoDB node into your workflows.
contentType: [integration, reference]
priority: medium
---

# MongoDB node

Use the MongoDB node to automate work in MongoDB, and integrate MongoDB with other applications. n8n has built-in support for a wide range of MongoDB features, including aggregating, updating, finding, deleting, and getting documents as well as creating, updating, listing, and dropping search indexes.  All operations in this Node make use of the [MongoDB Node driver](https://www.mongodb.com/docs/drivers/node/current/).

On this page, you'll find a list of operations the MongoDB node supports and links to more resources.

/// note | Credentials
Refer to [MongoDB credentials](/integrations/builtin/credentials/mongodb.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* Document
	* Aggregate documents
	* Delete documents
	* Find documents
	* Find and replace documents
	* Find and update documents
	* Insert documents
	* Update documents
* Search Index
	* Create search indexes
	* Drop search indexes
	* List search indexes
	* Update search indexes

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'mongodb') ]]
