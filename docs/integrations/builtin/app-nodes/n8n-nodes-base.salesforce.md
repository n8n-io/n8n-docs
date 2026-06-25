---
title: Salesforce node documentation
description: >-
  Learn how to use the Salesforce node in n8n. Follow technical documentation to
  integrate Salesforce node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Salesforce node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.salesforce.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.salesforce'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.salesforce'
layout:
  description:
    visible: false
---

# Salesforce node <a href="#salesforce-node" id="salesforce-node"></a>

Use the Salesforce node to automate work in Salesforce, and integrate Salesforce with other applications. n8n has built-in support for a wide range of Salesforce features, including creating, updating, deleting, and getting accounts, attachments, cases, and leads, as well as uploading documents. 

On this page, you'll find a list of operations the Salesforce node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Salesforce credentials](../credentials/salesforce.md) for guidance on setting up authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/6vuTxJwns2nA8U7V56ij/" %}

## Operations <a href="#operations" id="operations"></a>

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

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Salesforce node documentation integration templates](https://n8n.io/integrations/salesforce) or [search all templates](https://n8n.io/workflows/)

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/96ifDzfcUuwOyYrubZUt/" %}

## Working with Salesforce custom fields <a href="#working-with-salesforce-custom-fields" id="working-with-salesforce-custom-fields"></a>

To add custom fields to your request:

1. Select **Additional Fields** > **Add Field**.
2. In the dropdown, select **Custom Fields**.

You can then find and add your custom fields.
