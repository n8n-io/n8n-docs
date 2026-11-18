---
title: MySQL node documentation
description: >-
  Learn how to use the MySQL node in n8n. Follow technical documentation to
  integrate MySQL node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: n8n-nodes-base.mysql
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.mysql/index.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.mysql'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.mysql'
layout:
  description:
    visible: false
---

# MySQL node <a href="#mysql-node" id="mysql-node"></a>

Use the MySQL node to automate work in MySQL, and integrate MySQL with other applications. n8n has built-in support for a wide range of MySQL features, including executing an SQL query, as well as inserting, and updating rows in a database.

On this page, you'll find a list of operations the MySQL node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [MySQL credentials](../../credentials/mysql.md) for guidance on setting up authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/6vuTxJwns2nA8U7V56ij/" %}

{% hint style="info" %}
**The credential sets the default database**

The node connects to the database named in the credential, and every operation uses that database by default. The **From List** option of the **Table** field, and the column lists of each operation, only cover that database. To reach another database on the same server, write a qualified name like `other_database.table_name` in the **Name** option of the **Table** field, or in an **Execute SQL** query. Set the columns with an expression. The user in the credential needs permission for that database. Another server needs another credential.
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

* [Delete](#delete)
* [Execute SQL](#execute-sql)
* [Insert](#insert)
* [Insert or Update](#insert-or-update)
* [Select](#select)
* [Update](#update)

### Delete <a href="#delete" id="delete"></a>

Use this operation to delete an entire table or rows in a table.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [MySQL credential](../../credentials/mysql.md).
- **Operation**: Select **Delete**.
- **Table**: Choose the table that you want to work on. Select **From List** to choose the table from the dropdown list, or **Name** to enter the table name.
- **Command**: The deletion action to take:
    - **Truncate**: Removes the table's data and keeps the table's structure. This is the default.
    - **Delete**: Deletes the rows that match the **Select Rows** conditions. If you set no conditions, this deletes all rows in the table.
    - **Drop**: Deletes the table's data and the table's structure permanently.
- **Select Rows**: Set the conditions that select the rows to delete. Each condition takes a **Column**, an **Operator**, and a **Value**. Available when **Command** is **Delete**. If you set no conditions, the node deletes all rows.
- **Combine Conditions**: How to combine the conditions in **Select Rows**. **AND** requires every condition to be true. **OR** requires at least one condition to be true. Available when **Command** is **Delete**.

#### Delete options <a href="#delete-options" id="delete-options"></a>

- **Connection Timeout**: The number of milliseconds reserved for connecting to the database. Default is 30. See [Connection Timeout has no effect](#connection-timeout-has-no-effect).
- **Connections Limit**: The maximum number of connections to the database. Default is 10. A high value can cause performance problems and can crash the database.
- **Output Query Execution Details**: Whether to output the details of the executed query for each statement, instead of a confirmation of success. Default is off.
- **Query Batching**: The way to send queries to the database:
    - **Single Query**: One query for all incoming items. This is the default.
    - **Independent**: One query for each incoming item.
    - **Transaction**: All queries in one transaction. If one query fails, the node rolls back every change. The **Truncate** and **Drop** commands are an exception: MySQL commits them as it runs them, so a rollback can't undo them.

### Execute SQL <a href="#execute-sql" id="execute-sql"></a>

Use this operation to run an SQL query that the other operations don't cover.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [MySQL credential](../../credentials/mysql.md).
- **Operation**: Select **Execute SQL**.
- **Query**: The SQL query to run. You can use n8n [expressions](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/expressions-versus-data-nodes), and tokens like `$1`, `$2`, and `$3` with [query parameters](#use-query-parameters).

#### Execute SQL options <a href="#execute-sql-options" id="execute-sql-options"></a>

- **Connection Timeout**: The number of milliseconds reserved for connecting to the database. Default is 30. See [Connection Timeout has no effect](#connection-timeout-has-no-effect).
- **Connections Limit**: The maximum number of connections to the database. Default is 10.
- **Output Decimals as Numbers**: Whether to output `DECIMAL` columns as numbers instead of strings. Default is off. Refer to [Decimal numbers returned as strings](common-issues.md#decimal-numbers-returned-as-strings).
- **Output Large-Format Numbers As**: How to return `BIGINT` values. The node behaves as **Numbers** until you add this option. `DECIMAL` columns have their own option, **Output Decimals as Numbers**, and this option doesn't change them.
    - **Text**: Returns every `BIGINT` as a string. n8n selects this choice when you add the option.
    - **Numbers**: Returns a `BIGINT` as a number when JavaScript can hold the full value. Larger values come back as strings, so the type can change from row to row.
- **Output Query Execution Details**: Whether to output one item for each statement, with the statement in `sql` and its result in `data`. When off, a `SELECT` returns one item for each row, and other statements return `success: true`. Default is off.
- **Query Batching**: The way to send queries to the database:
    - **Single Query**: One query for all incoming items. This is the default.
    - **Independent**: One query for each incoming item.
    - **Transaction**: All queries in one transaction. If one query fails, the node rolls back every change. A statement that changes the schema, such as `CREATE`, `ALTER`, `DROP`, or `TRUNCATE`, is an exception: MySQL [commits it as it runs it](https://dev.mysql.com/doc/refman/8.4/en/implicit-commit.html), so a rollback can't undo it.
- **Query Parameters**: A comma-separated list of the values to use as [query parameters](#use-query-parameters).
- **Replace Empty Strings with NULL**: Whether to replace empty strings in the input with NULL. Default is off. This is useful for data exported from spreadsheet software.

### Insert <a href="#insert" id="insert"></a>

Use this operation to insert rows in a table.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [MySQL credential](../../credentials/mysql.md).
- **Operation**: Select **Insert**.
- **Table**: Choose the table that you want to work on. Select **From List** to choose the table from the dropdown list, or **Name** to enter the table name.
- **Data Mode**: How to map incoming data to the table columns:
    - **Auto-Map Input Data to Columns**: Use this when the names of the incoming fields match the column names. This is the default.
    - **Map Each Column Manually**: Set the value for each column yourself.
- **Values to Send**: The **Column** and **Value** pairs to insert. Available when **Data Mode** is **Map Each Column Manually**.

#### Insert options <a href="#insert-options" id="insert-options"></a>

- **Connection Timeout**: The number of milliseconds reserved for connecting to the database. Default is 30. See [Connection Timeout has no effect](#connection-timeout-has-no-effect).
- **Connections Limit**: The maximum number of connections to the database. Default is 10.
- **Output Query Execution Details**: Whether to output the details of the executed query for each statement, instead of a confirmation of success. Default is off.
- **Priority**: The priority of the INSERT statement. The node sends no priority keyword until you add this option.
    - **Low Prioirity**: Delays the insert until no other client reads from the table. n8n selects this choice when you add the option.
    - **High Priority**: Overrides the server's `--low-priority-updates` option, and stops the server from using concurrent inserts.
- **Query Batching**: The way to send queries to the database:
    - **Single Query**: One query for all incoming items. This is the default.
    - **Independent**: One query for each incoming item.
    - **Transaction**: All queries in one transaction. If one query fails, the node rolls back every change.
- **Replace Empty Strings with NULL**: Whether to replace empty strings in the input with NULL. Default is off.
- **Skip on Conflict**: Whether to skip a row that duplicates an existing primary key or unique index, instead of throwing an error. Default is off. The node sends `INSERT IGNORE`, so MySQL also turns some other errors into warnings and stores an adjusted value, for example a truncated string. Refer to MySQL's [IGNORE documentation](https://dev.mysql.com/doc/refman/8.4/en/sql-mode.html#ignore-effect-on-execution).

### Insert or Update <a href="#insert-or-update" id="insert-or-update"></a>

Use this operation to insert a row, or to update it when it already exists.

The node sends an `INSERT ... ON DUPLICATE KEY UPDATE` statement. MySQL compares the new row with the table's primary key and unique indexes. It updates the row that matches one of those keys, and inserts a new row when no row matches.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [MySQL credential](../../credentials/mysql.md).
- **Operation**: Select **Insert or Update**.
- **Table**: Choose the table that you want to work on. Select **From List** to choose the table from the dropdown list, or **Name** to enter the table name.
- **Data Mode**: How to map incoming data to the table columns:
    - **Auto-Map Input Data to Columns**: Use this when the names of the incoming fields match the column names. This is the default.
    - **Map Each Column Below**: Set the value for each column yourself.
- **Column to Match On**: The column that identifies the row. The node keeps this column out of the update part of the statement, so an update never changes it. Give this column the primary key or a unique index, because MySQL uses those keys to find the row.
- **Value of Column to Match On**: The value to look for in **Column to Match On**. Available when **Data Mode** is **Map Each Column Below**.
- **Values to Send**: The **Column** and **Value** pairs to write. Available when **Data Mode** is **Map Each Column Below**.

#### Insert or Update options <a href="#insert-or-update-options" id="insert-or-update-options"></a>

- **Connection Timeout**: The number of milliseconds reserved for connecting to the database. Default is 30. See [Connection Timeout has no effect](#connection-timeout-has-no-effect).
- **Connections Limit**: The maximum number of connections to the database. Default is 10.
- **Output Query Execution Details**: Whether to output the details of the executed query for each statement, instead of a confirmation of success. Default is off.
- **Query Batching**: The way to send queries to the database:
    - **Single Query**: One query for all incoming items. This is the default.
    - **Independent**: One query for each incoming item.
    - **Transaction**: All queries in one transaction. If one query fails, the node rolls back every change.
- **Replace Empty Strings with NULL**: Whether to replace empty strings in the input with NULL. Default is off.

### Select <a href="#select" id="select"></a>

Use this operation to select rows from a table.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [MySQL credential](../../credentials/mysql.md).
- **Operation**: Select **Select**.
- **Table**: Choose the table that you want to work on. Select **From List** to choose the table from the dropdown list, or **Name** to enter the table name.
- **Return All**: Whether to return all the rows that match, or only up to **Limit**. Default is off.
- **Limit**: The maximum number of rows to return. Default is 50. Available when **Return All** is off.
- **Select Rows**: Set the conditions that select the rows. Each condition takes a **Column**, an **Operator**, and a **Value**. If you set no conditions, the node selects all rows.
- **Combine Conditions**: How to combine the conditions in **Select Rows**. **AND** requires every condition to be true. **OR** requires at least one condition to be true.
- **Sort**: Choose how to sort the selected rows. Each rule takes a **Column** and a **Direction**.

**Select** has no offset, so it can't skip the rows it already returned. To read a large table in pages, add a **Select Rows** condition like `id` **Greater Than** the last ID you read, and a **Sort** rule on the same column with the **Direction** set to ascending. Update the last ID after each run. This works for numeric columns only. For other columns, use **Execute SQL** and write the query yourself.

#### Select options <a href="#select-options" id="select-options"></a>

- **Connection Timeout**: The number of milliseconds reserved for connecting to the database. Default is 30. See [Connection Timeout has no effect](#connection-timeout-has-no-effect).
- **Connections Limit**: The maximum number of connections to the database. Default is 10.
- **Output Columns**: Choose which columns to return. Select from the list, which starts with `*` for every column, or specify IDs using an [expression](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/expressions-versus-data-nodes). The node returns every column until you add this option. If you add the option and select no column, the node sends an incomplete query and MySQL reports a syntax error.
- **Output Decimals as Numbers**: Whether to output `DECIMAL` columns as numbers instead of strings. Default is off. Refer to [Decimal numbers returned as strings](common-issues.md#decimal-numbers-returned-as-strings).
- **Output Large-Format Numbers As**: How to return `BIGINT` values. The node behaves as **Numbers** until you add this option. `DECIMAL` columns have their own option, **Output Decimals as Numbers**, and this option doesn't change them.
    - **Text**: Returns every `BIGINT` as a string. n8n selects this choice when you add the option.
    - **Numbers**: Returns a `BIGINT` as a number when JavaScript can hold the full value. Larger values come back as strings, so the type can change from row to row.
- **Output Query Execution Details**: Whether to output one item for each query, with the statement in `sql` and the rows in `data`, instead of one item for each row. Default is off.
- **Query Batching**: The way to send queries to the database:
    - **Single Query**: One query for all incoming items. This is the default.
    - **Independent**: One query for each incoming item.
    - **Transaction**: All queries in one transaction. If one query fails, the node rolls back every change.
- **Select Distinct**: Whether to remove duplicate rows from the result. Default is off.

### Update <a href="#update" id="update"></a>

Use this operation to update rows in a table.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [MySQL credential](../../credentials/mysql.md).
- **Operation**: Select **Update**.
- **Table**: Choose the table that you want to work on. Select **From List** to choose the table from the dropdown list, or **Name** to enter the table name.
- **Data Mode**: How to map incoming data to the table columns:
    - **Auto-Map Input Data to Columns**: Use this when the names of the incoming fields match the column names. This is the default.
    - **Map Each Column Below**: Set the value for each column yourself.
- **Column to Match On**: The column that selects the rows to update. The node writes it into the `WHERE` clause, and keeps it out of the `SET` clause, so an update never changes it.
- **Value of Column to Match On**: The value to look for in **Column to Match On**. Available when **Data Mode** is **Map Each Column Below**.
- **Values to Send**: The **Column** and **Value** pairs to write. Available when **Data Mode** is **Map Each Column Below**.

#### Update options <a href="#update-options" id="update-options"></a>

- **Connection Timeout**: The number of milliseconds reserved for connecting to the database. Default is 30. See [Connection Timeout has no effect](#connection-timeout-has-no-effect).
- **Connections Limit**: The maximum number of connections to the database. Default is 10.
- **Output Query Execution Details**: Whether to output the details of the executed query for each statement, instead of a confirmation of success. Default is off.
- **Query Batching**: The way to send queries to the database:
    - **Single Query**: One query for all incoming items. This is the default.
    - **Independent**: One query for each incoming item.
    - **Transaction**: All queries in one transaction. If one query fails, the node rolls back every change.
- **Replace Empty Strings with NULL**: Whether to replace empty strings in the input with NULL. Default is off.

## Connection Timeout has no effect <a href="#connection-timeout-has-no-effect" id="connection-timeout-has-no-effect"></a>

Node versions 2 and later show the **Connection Timeout** option for every operation, but the node doesn't apply it.

These versions also ignore the **Connect Timeout** field of the [MySQL credential](../../credentials/mysql.md). The MySQL driver's default of 10 seconds applies instead.

Version 1 of the node has no **Connection Timeout** option. It passes the credential fields to the driver, so **Connect Timeout** does apply on version 1.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse n8n-nodes-base.mysql integration templates](https://n8n.io/integrations/mysql) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [MySQL's Connectors and APIs documentation](https://dev.mysql.com/doc/index-connectors.html) for more information about the service.

Refer to MySQL's [SELECT statement documentation](https://dev.mysql.com/doc/refman/8.4/en/select.html) for more information on writing SQL queries.

## Use query parameters <a href="#use-query-parameters" id="use-query-parameters"></a>

When creating a query to run on a MySQL database, you can use the **Query Parameters** field in the **Options** section to load data into the query. n8n sanitizes data in query parameters, which prevents SQL injection.

For example, you want to find a person by their email address. Given the following input data:

```js
[
    {
        "email": "alex@example.com",
        "name": "Alex",
        "age": 21 
    },
    {
        "email": "jamie@example.com",
        "name": "Jamie",
        "age": 33 
    }
]
```

You can write a query like:

```sql
SELECT * FROM $1:name WHERE email = $2;
```

Then in **Query Parameters**, provide the field values to use. You can provide fixed values or expressions. For this example, use expressions so the node can pull the email address from each input item in turn:

```js
// users is an example table name
users, {{ $json.email }} 
```

## Common issues <a href="#common-issues" id="common-issues"></a>

For common errors or issues and suggested resolution steps, refer to [Common issues](common-issues.md).
