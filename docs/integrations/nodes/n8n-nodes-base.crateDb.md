# CrateDB

[CrateDB](https://crate.io/) is an open-source distributed SQL database management system that integrates a fully searchable document-oriented data store based on a shared-nothing architecture, and is designed for high scalability.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/crateDb/).


## Basic Operations

* Execute an SQL query
* Insert rows in database
* Update rows in database


## Example Usage

This workflow allows you to create a table and insert data into it in CrateDB. You can also find the [workflow](https://n8n.io/workflows/597) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Set](/integrations/core-nodes/n8n-nodes-base.set/)
- [CrateDB]()

The final workflow should look like the following image.

![A workflow with the CrateDB node](/_images/integrations/nodes/cratedb/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. CrateDB node (Execute Query)

1. First of all, you'll have to enter credentials for the CrateDB node. You can find out how to do that [here](/integrations/credentials/crateDb/).
2. Select 'Execute Query' from the ***Operation*** dropdown list.
3. Enter the following SQL query in the ***Query*** field: `CREATE TABLE test (id INT, name STRING);`.
4. Click on the ***Node*** tab and toggle ***Always Output Data*** to true.
5. Click on ***Execute Node*** to run the node.

![Using the CreateDB node to create a table](/_images/integrations/nodes/cratedb/cratedb_node.png)

### 3. Set node

1. Click on the ***Add Value*** button and select 'Number' from the dropdown list.
2. Enter `id` in the ***Name*** field.
3. Click on the ***Add Value*** button and select 'String' from the dropdown list.
4. Enter `name` in the ***Name*** field.
5. Enter the value for the name in the ***Value*** field.
6. Click on ***Execute Node*** to run the node.

![Using the Set node to set data to be inserted by the CrateDB node](/_images/integrations/nodes/cratedb/set_node.png)

### 4. CrateDB1 node (Insert)

1. Select the credentials that you entered in the previous CrateDB node.
2. Enter `test` in the ***Table*** field.
3. Enter `id, name` in the ***Columns*** field.
4. Click on ***Execute Node*** to run the node.

![Using the CrateDB node to insert data into a table](/_images/integrations/nodes/cratedb/cratedb1_node.png)

## FAQs

### How to specify the data type of a column?
To specify the data type of a column, append the column name with `:type`, where `type` is the data type of that column. For example, if you want to specify the type `int` for the column *id* and type `text` for the column *name*, you can use the following snippet in the ***Columns*** field: `id:init,name:text`.




