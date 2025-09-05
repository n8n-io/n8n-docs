---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Oracle Database node documentation
description: Learn how to use the Oracle Database node in n8n. Follow technical documentation to integrate Oracle Database node into your workflows.
contentType: [integration, reference]
priority: critical
---

# Oracle Database node

Use the Oracle Database node to automate work in Oracle Database, and integrate Oracle Database with other applications. n8n has built-in support for a wide range of Oracle Database features, including executing an SQL query, as well as inserting, and updating rows in a database.

On this page, you'll find a list of operations the Oracle Database node supports and links to more resources.

/// note | Credentials
Refer to [Oracle Database credentials](/docs/integrations/builtin/credentials/oracledb.md) for guidance on setting up authentication. 
///

--8<-- "/_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* [**Delete**](#delete): Delete an entire table or rows in a table
* [**Execute SQL**](#execute-sql): Execute an SQL statement
* [**Insert**](#insert): Insert rows in a table
* [**Insert or Update**](#insert-or-update): Insert or update rows in a table
* [**Select**](#select): Select rows from a table
* [**Update**](#update): Update rows in a table

### Delete

Use this operation to delete an entire table or rows in a table.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Oracle Database credential](/docs/integrations/builtin/credentials/oracledb.md).
- **Operation**: Select **Delete**.
- **Schema**: Choose the schema that contains the table you want to work on. Select **From list** to choose the schema from the dropdown list or **By Name** to enter the schema name.
- **Table**: Choose the table that you want to work on. Select **From list** to choose the table from the dropdown list or **By Name** to enter the table name.
- **Command**: The deletion action to take:
	- **Truncate**: Removes the table's data but preserves the table's structure.
	- **Delete**: Delete the rows that match the "Select Rows" condition. If you don't select anything, Oracle Database deletes all rows.
		- **Select Rows**: Define a **Column**, **Operator**, and **Value** to match rows on. The value
	can be passed as JSON using expression or string.
		- **Combine Conditions**: How to combine the conditions in "Select Rows". **AND** requires all conditions to be true, while **OR** requires at least one condition to be true.
	- **Drop**: Deletes the table's data and structure permanently.

#### Delete options

- **Auto Commit**: Whether this property is true, then the transaction in the current connection is automatically committed at the end of statement execution.
- **Statement Batching**: The way to send queries to the database:
	- **Single Statement**: A single Statement for all incoming items.
	- **Independently**: Execute one Statement per incoming item of the execution.
	- **Transaction**: Execute all Statements in a transaction. If a failure occurs, Oracle Database rolls back all changes.

### Execute SQL

Use this operation to execute an SQL query.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Oracle Database credential](/docs/integrations/builtin/credentials/oracledb.md).
- **Operation**: Execute SQL **Execute SQL**.
- **Statement**: The SQL statement to execute. You can use n8n [expressions](/code/expressions.md) and positional parameters like `:1`, `:2`, or named parameters like `:name`, `:id` to use with [Bind Variable Placeholder Values](#use-bind-parameters).

#### Execute Statement options

- **Auto Commit**: Whether this property is true, then the transaction in the current connection is automatically committed at the end of statement execution.
- **Bind Variable Placeholder Values**: Enter the values for the bind parameters used in the statement [bind parameters](#use-bind-parameters).
- **Output Numbers As String**: Whether the numbers should be retrieved as string.
- **Fetch Array Size**: This property is a number that sets the size of an internal buffer used for fetching query rows from Oracle Database. Changing it may affect query performance but does not affect how many rows are returned to the application.
- **Number of Rows to Prefetch**: This property is a query tuning option to set the number of additional rows the underlying Oracle driver fetches during the internal initial statement execution phase of a query.

### Insert

Use this operation to insert rows in a table.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Oracle Database credential](/docs/integrations/builtin/credentials/oracledb.md).
- **Operation**: Select **Insert**.
- **Schema**: Choose the schema that contains the table you want to work on. Select **From list** to choose the schema from the dropdown list or **By Name** to enter the schema name.
- **Table**: Choose the table that you want to work on. Select **From list** to choose the table from the dropdown list or **By Name** to enter the table name.
- **Mapping Column Mode**: How to map column names to incoming data:
	- **Map Each Column Manually**: Select the values to use for each column.
	- **Map Automatically**: Automatically map incoming data to matching column names in Oracle Database. The incoming data field names must match the column names in Oracle Database for this to work. If necessary, consider using the [edit fields (set) node](/docs/integrations/builtin/core-nodes/n8n-nodes-base.set.md) before this node to adjust the format as needed.

#### Insert options

- **Auto Commit**: Whether this property is true, then the transaction in the current connection is automatically committed at the end of statement execution.
- **Output Columns**: Choose from the list, or specify IDs using an expression.
- **Statement Batching**: The way to send queries to the database:
	- **Single Statement**: A single Statement for all incoming items.
	- **Independently**: Execute one Statement per incoming item of the execution.
	- **Transaction**: Execute all Statements in a transaction. If a failure occurs, Oracle Database rolls back all changes.

### Insert or Update

Use this operation to insert or update rows in a table.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Oracle Database credential](/docs/integrations/builtin/credentials/oracledb.md).
- **Operation**: Select **Insert or Update**.
- **Schema**: Choose the schema that contains the table you want to work on. Select **From list** to choose the schema from the dropdown list or **By Name** to enter the schema name.
- **Table**: Choose the table that you want to work on. Select **From list** to choose the table from the dropdown list or **By Name** to enter the table name.
- **Mapping Column Mode**: How to map column names to incoming data:
	- **Map Each Column Manually**: Select the values to use for each column.
	- **Map Automatically**: Automatically map incoming data to matching column names in Oracle Database. The incoming data field names must match the column names in Oracle Database for this to work. If necessary, consider using the [edit fields (set) node](/docs/integrations/builtin/core-nodes/n8n-nodes-base.set.md) before this node to adjust the format as needed.

#### Insert or Update options

- **Auto Commit**: Whether this property is true, then the transaction in the current connection is automatically committed at the end of statement execution.
- **Statement Batching**: The way to send queries to the database:
	- **Single Statement**: A single Statement for all incoming items.
	- **Independently**: Execute one Statement per incoming item of the execution.
	- **Transaction**: Execute all Statements in a transaction. If a failure occurs, Oracle Database rolls back all changes.

### Select

Use this operation to select rows in a table.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Oracle Database credential](/docs/integrations/builtin/credentials/oracledb.md).
- **Operation**: Select **Select**.
- **Schema**: Choose the schema that contains the table you want to work on. Select **From list** to choose the schema from the dropdown list or **By Name** to enter the schema name.
- **Table**: Choose the table that you want to work on. Select **From list** to choose the table from the dropdown list or **By Name** to enter the table name.
- **Return All**: Whether to return all results or only up to a given limit.
- **Limit**: The maximum number of items to return when **Return All** is disabled.
- **Select Rows**: Set the conditions to select rows. Define a **Column**, **Operator**, and **Value** to match rows on. If you don't select anything, Oracle Database selects all rows.
- **Combine Conditions**: How to combine the conditions in **Select Rows**. **AND** requires all conditions to be true, while **OR** requires at least one condition to be true.
- **Sort**: Choose how to sort the selected rows. Choose a **Column** from a list or by ID and a sort **Direction**.

#### Select options

- **Auto Commit**: Whether this property is true, then the transaction in the current connection is automatically committed at the end of statement execution.
- **Output Numbers As String**: Whether the numbers should be retrieved as string.
- **Fetch Array Size**: This property is a number that sets the size of an internal buffer used for fetching query rows from Oracle Database. Changing it may affect query performance but does not affect how many rows are returned to the application.
- **Number of Rows to Prefetch**: This property is a query tuning option to set the number of additional rows the underlying Oracle driver fetches during the internal initial statement execution phase of a query.

### Update

Use this operation to update rows in a table.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Oracle Database credential](/docs/integrations/builtin/credentials/oracledb.md).
- **Operation**: Select **Update**.
- **Schema**: Choose the schema that contains the table you want to work on. Select **From list** to choose the schema from the dropdown list or **By Name** to enter the schema name.
- **Table**: Choose the table that you want to work on. Select **From list** to choose the table from the dropdown list or **By Name** to enter the table name.
- **Mapping Column Mode**: How to map column names to incoming data:
	- **Map Each Column Manually**: Select the values to use for each column.
	- **Map Automatically**: Automatically map incoming data to matching column names in Oracle Database. The incoming data field names must match the column names in Oracle Database for this to work. If necessary, consider using the [edit fields (set) node](/docs/integrations/builtin/core-nodes/n8n-nodes-base.set.md) before this node to adjust the format as needed.

#### Update options

- **Auto Commit**: Whether this property is true, then the transaction in the current connection is automatically committed at the end of statement execution.
- **Statement Batching**: The way to send queries to the database:
	- **Single Statement**: A single Statement for all incoming items.
	- **Independently**: Execute one Statement per incoming item of the execution.
	- **Transaction**: Execute all Statements in a transaction. If a failure occurs, Oracle Database rolls back all changes.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'oracledb') ]]

## Related resources

Refer to [SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/index.html) for more information about the service.

## Use bind parameters

When creating a query to run on a Oracle database, you can use the **Bind Variable Placeholder Values** field in the **Options** section to load data into the query. n8n sanitizes data in query parameters, which prevents SQL injection.

For example, you want to find a specific fruits by their color. Given the following input data:

```js
[
    {
        "FRUIT_ID": 1,
        "FRUIT_NAME": "Apple",
        "COLOR": "Red" 
    },
    {
        "FRUIT_ID": 2,
        "FRUIT_NAME": "Banana",
        "COLOR": "Yellow"
    }
]
```

You can write a query like:

```sql
SELECT * FROM FRUITS WHERE COLOR = :col
```

Then in **Bind Variable Placeholder Values**, provide the field values to use. You can provide fixed values or expressions. For this example, use expressions so the node can pull the color from each input item in turn:

```js
// fruits is an example table name
fruits, {{ $json.color }} 
```
