# ServiceNow

[ServiceNow](https://www.servicenow.com/) is a cloud computing platform to help companies manage digital workflows for their operations.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/serviceNow/).


## Basic operations

* Business Service
    * Get All
* Configuration Items
    * Get All
* Department
    * Get All
* Dictionary
    * Get All
* Incident
    * Create
    * Delete
    * Get
    * Get All
    * Update
* Table Record
    * Create
    * Delete
    * Get
    * Get All
    * Update
* User
    * Create
    * Delete
    * Get
    * Get All
    * Update
* User Group
    * Get All
* User Role
    * Get All

## Example usage

This workflow allows you to get the 50 most recent incidents and view only the desired fields. This example usage workflow uses the following nodes:

- [Start](/workflow/integrations/core-nodes/workflow-nodes-base.start/)
- [ServiceNow]()

The final workflow should look like the following image.

![A workflow with the ServiceNow node](/_images/integrations/nodes/servicenow/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. ServiceNow node

1. First enter credentials, you can find out how to do that [here](/workflow/integrations/credentials/serviceNow/).
2. Select **Incident** from the ***Resource*** dropdown.
3. Select **Get All** from the ***Operation*** dropdown.
4. Click ***Add Option*** and select **Fields**.
5. Use the dropdown to select the fields you want to view, here we used `Close code`, `Severity`, `Sys ID`, and `Resolve time`.
6. Click on ***Execute Node*** to run the workflow.

![The ServiceNow node](/_images/integrations/nodes/servicenow/servicenow_node.png)
