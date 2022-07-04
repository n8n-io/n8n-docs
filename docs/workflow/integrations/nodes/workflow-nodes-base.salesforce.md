# Salesforce

[Salesforce](https://www.salesforce.com/) is a cloud-based software company. It provides customer relationship management service and also sells a complementary suite of enterprise applications focused on customer service, marketing automation, analytics, and application development.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/salesforce/).


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

## Example Usage

This workflow allows you to create, update, and add a note to a lead in Salesforce. You can also find the [workflow](https://n8n.io/workflows/664) on Workflow².io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/workflow-nodes-base.start/)
- [Salesforce]()

The final workflow should look like the following image.

![A workflow with the Salesforce node](/_images/integrations/nodes/salesforce/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Salesforce node (create: lead)

1. First of all, you'll have to enter credentials for the Salesforce node. You can find out how to do that [here](/workflow/integrations/credentials/salesforce/).
2. Enter the name of the company in the ***Company*** field.
3. Enter the last name of the contact person in the ***Last Name*** field.
4. Click on ***Execute Node*** to run the node.

![Create a lead with the Salesforce node](/_images/integrations/nodes/salesforce/salesforce_node.png)


### 3. Salesforce1 node (update: lead)

1. Select the credentials that you entered in the previous node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Lead ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Salesforce > Output Data > JSON > id. You can also add the following expression: `{{$node["Salesforce"].json["id"]}}`
5. Click on the ***Add Field*** button and select 'City' from the dropdown list.
6. Enter a city name in the ***City*** field.
7. Click on ***Execute Node*** to run the node.

![Update a lead with the Salesforce node](/_images/integrations/nodes/salesforce/salesforce1_node.png)



### 4. Salesforce2 node (addNote: lead)

1. Select the credentials that you entered in the previous node.
2. Select ***Add Note*** from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Lead ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Salesforce > Output Data > JSON > id. You can also add the following expression: `{{$node["Salesforce"].json["id"]}}`
5. Enter the note in the ***Title*** field.
6. Click on ***Execute Node*** to run the node.

![Add a note to a lead with the Salesforce node](/_images/integrations/nodes/salesforce/salesforce2_node.png)

