---
title: Salesforce
description: Documentation for the Salesforce node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Salesforce

Use the Salesforce node to automate work in Salesforce, and integrate Salesforce with other applications. n8n has built-in support for a wide range of Salesforce features, including creating, updating, deleting, and getting accounts, attachements, cases, and leads, as well as uploading documents. 

On this page, you'll find a list of operations the Salesforce node supports and links to more resources.

/// note | Credentials
Refer to [Salesforce credentials](/integrations/builtin/credentials/salesforce/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Salesforce integrations](https://n8n.io/integrations/salesforce/){:target="_blank" .external-link} list.
///

## Basic Operations

* Account
    * Add note to an account
    * Create an account
    * Create a new account, or update the current one if it already exists (upsert)
    * Get an account
    * Get all accounts
    * Returns an overview of account's metadata.
    * Delete an account
    * Update an account
* Attachment
    * Create a attachment
    * Delete a attachment
    * Get a attachment
    * Get all attachments
    * Returns an overview of attachment's metadata.
    * Update a attachment
* Case
    * Add a comment to a case
    * Create a case
    * Get a case
    * Get all cases
    * Returns an overview of case's metadata
    * Delete a case
    * Update a case
* Contact
    * Add lead to a campaign
    * Add note to a contact
    * Create a contact
    * Create a new contact, or update the current one if it already exists (upsert)
    * Delete a contact
    * Get a contact
    * Returns an overview of contact's metadata
    * Get all contacts
    * Update a contact
* Custom Object
    * Create a custom object record
    * Create a new record, or update the current one if it already exists (upsert)
    * Get a custom object record
    * Get all custom object records
    * Delete a custom object record
    * Update a custom object record
* Document
    * Upload a document
* Flow
    * Get all flows
    * Invoke a flow
* Lead
    * Add lead to a campaign
    * Add note to a lead
    * Create a lead
    * Create a new lead, or update the current one if it already exists (upsert)
    * Delete a lead
    * Get a lead
    * Get all leads
    * Returns an overview of Lead's metadata
    * Update a lead
* Opportunity
    * Add note to an opportunity
    * Create an opportunity
    * Create a new opportunity, or update the current one if it already exists (upsert)
    * Delete an opportunity
    * Get an opportunity
    * Get all opportunities
    * Returns an overview of opportunity's metadata
    * Update an opportunity
* Search
    * Execute a SOQL query that returns all the results in a single response
* Task
    * Create a task
    * Delete a task
    * Get a task
    * Get all tasks
    * Returns an overview of task's metadata
    * Update a task
* User
    * Get a user
    * Get all users

## Working with Salesforce custom fields

To add custom fields to your request:

1. Select **Additional Fields** > **Add Field**.
2. In the dropdown, select **Custom Fields**.

You can then find and add your custom fields.

## Example Usage

This workflow allows you to create, update, and add a note to a lead in Salesforce. You can also find the [workflow](https://n8n.io/workflows/664) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Salesforce]()

The final workflow should look like the following image.

![A workflow with the Salesforce node](/_images/integrations/builtin/app-nodes/salesforce/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Salesforce node (create: lead)

1. First of all, you'll have to enter credentials for the Salesforce node. You can find out how to do that [here](/integrations/builtin/credentials/salesforce/).
2. Enter the name of the company in the ***Company*** field.
3. Enter the last name of the contact person in the ***Last Name*** field.
4. Click on ***Test step*** to run the node.

![Create a lead with the Salesforce node](/_images/integrations/builtin/app-nodes/salesforce/salesforce_node.png)


### 3. Salesforce1 node (update: lead)

1. Select the credentials that you entered in the previous node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Lead ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Salesforce > Output Data > JSON > id. You can also add the following expression: `{{$node["Salesforce"].json["id"]}}`
5. Click on the ***Add Field*** button and select 'City' from the dropdown list.
6. Enter a city name in the ***City*** field.
7. Click on ***Test step*** to run the node.

![Update a lead with the Salesforce node](/_images/integrations/builtin/app-nodes/salesforce/salesforce1_node.png)



### 4. Salesforce2 node (addNote: lead)

1. Select the credentials that you entered in the previous node.
2. Select ***Add Note*** from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Lead ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Salesforce > Output Data > JSON > id. You can also add the following expression: `{{$node["Salesforce"].json["id"]}}`
5. Enter the note in the ***Title*** field.
6. Click on ***Test step*** to run the node.

![Add a note to a lead with the Salesforce node](/_images/integrations/builtin/app-nodes/salesforce/salesforce2_node.png)


