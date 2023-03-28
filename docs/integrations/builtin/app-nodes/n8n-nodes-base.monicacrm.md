---
title: Monica CRM node - n8n Documentation
description: Documentation for the Monica CRM node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Monica CRM

The Monica CRM node allows you to automate work in Monica CRM, and integrate Monica CRM with other applications. n8n has built-in support for a wide range of Monica CRM features, including creating, updating, deleting, and getting activities, calls, contracts, messages, tasks, and notes. 

On this page, you'll find a list of operations the Monica CRM node supports and links to more resources.

!!! note "Credentials"
    Refer to [Monica CRM credentials](/integrations/builtin/credentials/monicacrm/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Monica CRM integrations](https://n8n.io/integrations/monica-crm/){:target="_blank" .external-link} list.



## Basic operations

* Activity
    * Create an activity
    * Delete an activity
    * Retrieve an activity
    * Retrieve all activities
    * Update an activity
* Call
    * Create a call
    * Delete a call
    * Retrieve a call
    * Retrieve all calls
    * Update a call
* Contact
    * Create a contact
    * Delete a contact
    * Retrieve a contact
    * Retrieve all contacts
    * Update a contact
* Contact Field
    * Create a contact field
    * Delete a contact field
    * Retrieve a contact field
    * Update a contact field
* Contact Tag
    * Add
    * Remove
* Conversation
    * Create a conversation
    * Delete a conversation
    * Retrieve a conversation
    * Update a conversation
* Conversation Message
    * Add a message to a conversation
    * Update a message in a conversation
* Journal Entry
    * Create a journal entry
    * Delete a journal entry
    * Retrieve a journal entry
    * Retrieve all journal entries
    * Update a journal entry
* Note
    * Create a note
    * Delete a note
    * Retrieve a note
    * Retrieve all notes
    * Update a note
* Reminder
    * Create a reminder
    * Delete a reminder
    * Retrieve a reminder
    * Retrieve all reminders
    * Update a reminder
* Tag
    * Create a tag
    * Delete a tag
    * Retrieve a tag
    * Retrieve all tags
    * Update a tag
* Task
    * Create a task
    * Delete a task
    * Retrieve a task
    * Retrieve all tasks
    * Update a task


## Example usage

This workflow allows you to create a new contact in Monica CRM. This example usage workflow would use the following three nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Monica CRM]()

The final workflow should look like the following image.

![A workflow with the Monica CRM node](/_images/integrations/builtin/app-nodes/monicacrm/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Monica CRM node

1. First enter your credentials for the Monica CRM node. You can find out how to do that [here](/integrations/builtin/credentials/monicacrm/).
2. Select *Contact* from the *Resource* dropdown list.
3. Select *Create* from the *Operation* dropdown list.
3. Enter the *First Name* of your new contact.
4. Enter the *Gender* of your new contact using the dropdown list.
5. Click on *Execute Node* to run the workflow.

![The Monica CRM node](/_images/integrations/builtin/app-nodes/monicacrm/monicacrm_node.png)

