---
title: Salesforce node documentation
description: Learn how to use the Salesforce node in n8n. Follow technical documentation to integrate Salesforce node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Salesforce node

Use the Salesforce node to automate work in Salesforce, and integrate Salesforce with other applications. n8n has built-in support for a wide range of Salesforce features, including creating, updating, deleting, and getting accounts, attachments, cases, and leads, as well as uploading documents. 

On this page, you'll find a list of operations the Salesforce node supports and links to more resources.

/// note | Credentials
Refer to [Salesforce credentials](/integrations/builtin/credentials/salesforce.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

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

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'salesforce') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

## Working with Salesforce custom fields

To add custom fields to your request:

1. Select **Additional Fields** > **Add Field**.
2. In the dropdown, select **Custom Fields**.

You can then find and add your custom fields.
