---
title: AWS DynamoDB node documentation
description: Learn how to use the AWS DynamoDB node in n8n. Follow technical documentation to integrate AWS DynamoDB node into your workflows.
contentType: [integration, reference]
---

# AWS DynamoDB node

Use the AWS DynamoDB node to automate work in AWS DynamoDB, and integrate AWS DynamoDB with other applications. n8n has built-in support for a wide range of AWS DynamoDB features, including creating, reading, updating, deleting items, and records on a database.

On this page, you'll find a list of operations the AWS DynamoDB node supports and links to more resources.

/// note | Credentials
Refer to [AWS credentials](/integrations/builtin/credentials/aws.md) for guidance on setting up authentication. 
///

## Operations

* Item
  * Create a new record, or update the current one if it already exists (upsert/put)
  * Delete an item
  * Get an item
  * Get all items

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'aws-dynamodb') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

