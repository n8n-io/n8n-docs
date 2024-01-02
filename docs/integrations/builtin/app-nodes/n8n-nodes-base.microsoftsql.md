---
title: Microsoft SQL
description: Documentation for the Microsoft SQL node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Microsoft SQL

Use the Microsoft SQL node to automate work in Microsoft SQL, and integrate Microsoft SQL with other applications. n8n has built-in support for a wide range of Microsoft SQL features, including executing SQL queries, and inserting rows into the database. 

On this page, you'll find a list of operations the Microsoft SQL node supports and links to more resources.

/// note | Credentials
Refer to [Microsoft SQL credentials](/integrations/builtin/credentials/microsoftsql/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Microsoft SQL integrations](https://n8n.io/integrations/microsoft-sql/){:target="_blank" .external-link} list.
///

## Basic Operations

* Execute an SQL query
* Insert rows in database
* Update rows in database
* Delete rows in database


## Example Usage

This workflow allows you to execute an SQL query in Microsoft SQL. You can also find the [workflow](https://n8n.io/workflows/479) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Microsoft SQL]()

The final workflow should look like the following image.

![A workflow with the Microsoft SQL node](/_images/integrations/builtin/app-nodes/microsoftsql/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Microsoft SQL node

1. First of all, you'll have to enter credentials for the Microsoft SQL node. You can find out how to do that [here](/integrations/builtin/credentials/microsoftsql/).
2. Select 'Execute Query' from the *Operation* dropdown list.
3. Enter your SQL query in the *Query* field.
4. Click on *Execute Node* to run the workflow.

