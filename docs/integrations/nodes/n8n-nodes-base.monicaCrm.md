# Monica CRM

[Monica CRM](https://www.monicahq.com/) is an open-source web application to organize and record your interactions with your loved ones.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/monicaCrm/).


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
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Monica CRM]()

The final workflow should look like the following image.

![A workflow with the Monica CRM node](/_images/integrations/nodes/monicacrm/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Monica CRM node

1. First enter your credentials for the Monica CRM node. You can find out how to do that [here](/integrations/credentials/monicaCrm/).
2. Select *Contact* from the *Resource* dropdown list.
3. Select *Create* from the *Operation* dropdown list.
3. Enter the *First Name* of your new contact.
4. Enter the *Gender* of your new contact using the dropdown list.
5. Click on *Execute Node* to run the workflow.

![The Monica CRM node](/_images/integrations/nodes/monicacrm/monicacrm_node.png)
