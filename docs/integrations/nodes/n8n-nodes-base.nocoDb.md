# NocoDB

[NocoDB](https://www.nocodb.com/) is an open source Airtable alternative. It works by connecting to any relational database and transforming them into a spreadsheet interface.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/nocoDb/).


## Basic operations

* Row
    * Create a row
    * Delete a row
    * Retrieve all rows
    * Retrieve a row
    * Update a row

## Example usage

This workflow allows you to get all rows in your table.
This example workflow use the following two nodes.

- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [NocoDB]()

The final workflow should look like the following image.

![A workflow with the NocoDB node](/_images/integrations/nodes/nocodb/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. NocoDB node

1. First enter your credentials for the NocoDB node. You can find out how to do that [here](/integrations/credentials/nocoDb/).
2. Select NocoDB version your project using.
3. The **Row** ***Resource*** is selected by default.
4. Select **Get All** from the **Operation** dropdown.
5. Enter the NocoDB **Project Name**. (Project ID for older versions)
6. Enter the name of the targeted **Table**.
7. Click on **Execute Node** to run the workflow.

![The NocoDB node](/_images/integrations/nodes/nocodb/nocodb_node.png)
