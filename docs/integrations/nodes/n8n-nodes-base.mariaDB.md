# MariaDB

[MariaDB](https://www.mariadb.com/) is an open-source relational database management system. MariaDB has stand-alone clients that allow users to interact directly with a MariaDB database using SQL, but more often MariaDB is used with other programs to implement applications that need relational database capability.

## Basic Operations

* Execute an SQL query.
* Insert rows in database.
* Update rows in database

## Example Usage

This workflow allows you to create a table and insert data in it on a MariaDB database. This example usage workflow would use the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Set](/integrations/core-nodes/n8n-nodes-base.set/)
- [MariaDB]()

The final workflow should look like the following image.

![A workflow with the MariaDB node](/_images/integrations/nodes/mariadb/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. MariaDB node (Execute Query)

1. First of all, you'll have to enter credentials for the MariaDB node. In order to do that, on the MariaDB options menu, select **Create New** in the **Credential for MariaDB** options field. Fill the required information to connect to the MariaDB database. 

<center>
![Create new mariaDB credentials](/_images/integrations/nodes/mariadb/mariaDB_credentials.png)

2. Select **Execute Query** from the **Operation** dropdown list.
3. Enter the following SQL query in the ***Query*** field: `CREATE TABLE test (id INT, name VARCHAR(255), PRIMARY KEY (id));`.
4. Click on ***Execute Node*** to run the node.

![Using the MariaDB node to create a table](/_images/integrations/nodes/mariadb/mariadb_node.png)
</center>

### 3. Set node

1. Set the ***Keep Only Set*** toggle to true.
2. Click on the ***Add Value*** button and select 'Number' from the dropdown list.
3. Enter `id` in the ***Name*** field.
4. Click on the ***Add Value*** button and select 'String' from the dropdown list.
5. Enter `name` in the **Name** field.
6. Enter the value for the name in the **Value** field.
7. Click on **Execute Node** to run the node.

<center>
![Using the Set node to set data to be inserted by the MariaDB node](/_images/integrations/nodes/mariadb/set_node.png)
</center>

### 4. MariaDB1 node (Insert)

1. Select the credentials that you entered in the previous MariaDB node.
2. Select `Insert` in the ***Operation*** field.
3. Enter `test` in the ***Table*** field.
4. Enter `id, name` in the ***Columns*** field.
5. Click on ***Execute Node*** to run the node.

<center>
![Using the MariaDB node to insert data into a table](/_images/integrations/nodes/mariadb/mariadb1_node.png)
</center>
