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
**One credential, one database**

The node opens its connection pool on the database named in the credential, so every operation runs against that database. To work with a second database, create a second credential.
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
    - **Truncate**: Removes the table's data and keeps the table's structure.
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
    - **Transaction**: All queries in one transaction. If one query fails, the node rolls back every change.

### Execute SQL <a href="#execute-sql" id="execute-sql"></a>

Use this operation to run an SQL query that the other operations don't cover.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [MySQL credential](../../credentials/mysql.md).
- **Operation**: Select **Execute SQL**.
- **Query**: The SQL query to run. You can use n8n [expressions](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/expressions-versus-data-nodes), and tokens like `$1`, `$2` and `$3` with [query parameters](#use-query-parameters).

#### Execute SQL options <a href="#execute-sql-options" id="execute-sql-options"></a>

- **Connection Timeout**: The number of milliseconds reserved for connecting to the database. Default is 30. See [Connection Timeout has no effect](#connection-timeout-has-no-effect).
- **Connections Limit**: The maximum number of connections to the database. Default is 10.
- **Output Decimals as Numbers**: Whether to output `DECIMAL` columns as numbers instead of strings. Default is off. See [Output Decimals as Numbers can lose digits](#output-decimals-as-numbers-can-lose-digits).
- **Output Large-Format Numbers As**: The format to output `NUMERIC` and `BIGINT` columns as:
    - **Text**: Returns the value as a string. This is the default, and it keeps every digit.
    - **Numbers**: Returns the value as a number. Numbers longer than 16 digits can come back incorrect.
- **Output Query Execution Details**: Whether to output the details of the executed query for each statement, instead of a confirmation of success. Default is off.
- **Query Batching**: The way to send queries to the database. See the [Delete options](#delete-options) for the three modes.
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
- **Priority**: The priority of the INSERT statement:
    - **Low Prioirity**: Delays the insert until no other client reads from the table. This is the default.
    - **High Priority**: Overrides the server's `--low-priority-updates` option, and stops the server from using concurrent inserts.
- **Query Batching**: The way to send queries to the database. See the [Delete options](#delete-options) for the three modes.
- **Replace Empty Strings with NULL**: Whether to replace empty strings in the input with NULL. Default is off.
- **Skip on Conflict**: Whether to skip the row instead of throwing an error when it violates a unique constraint. Default is off.

### Insert or Update <a href="#insert-or-update" id="insert-or-update"></a>

Use this operation to insert a row, or to update it when it already exists.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [MySQL credential](../../credentials/mysql.md).
- **Operation**: Select **Insert or Update**.
- **Table**: Choose the table that you want to work on. Select **From List** to choose the table from the dropdown list, or **Name** to enter the table name.
- **Data Mode**: How to map incoming data to the table columns. See the [Insert](#insert) parameters.
- **Column to Match On**: The column that decides whether the row exists.
- **Value of Column to Match On**: The value to look for in **Column to Match On**. Available when **Data Mode** is **Map Each Column Below**.
- **Values to Send**: The **Column** and **Value** pairs to write. Available when **Data Mode** is **Map Each Column Below**.

#### Insert or Update options <a href="#insert-or-update-options" id="insert-or-update-options"></a>

- **Connection Timeout**: The number of milliseconds reserved for connecting to the database. Default is 30. See [Connection Timeout has no effect](#connection-timeout-has-no-effect).
- **Connections Limit**: The maximum number of connections to the database. Default is 10.
- **Output Query Execution Details**: Whether to output the details of the executed query for each statement, instead of a confirmation of success. Default is off.
- **Query Batching**: The way to send queries to the database. See the [Delete options](#delete-options) for the three modes.
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

Select returns all the matching rows, or the first **Limit** rows. It can't return the next **Limit** rows, so you can't read a large table one page at a time. To walk a large table, use **Execute SQL** and write the query yourself.

#### Select options <a href="#select-options" id="select-options"></a>

- **Connection Timeout**: The number of milliseconds reserved for connecting to the database. Default is 30. See [Connection Timeout has no effect](#connection-timeout-has-no-effect).
- **Connections Limit**: The maximum number of connections to the database. Default is 10.
- **Output Columns**: Choose which columns to return. Select from the list, or specify IDs using an [expression](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/expressions-versus-data-nodes). The default returns every column.
- **Output Decimals as Numbers**: Whether to output `DECIMAL` columns as numbers instead of strings. Default is off. See [Output Decimals as Numbers can lose digits](#output-decimals-as-numbers-can-lose-digits).
- **Output Large-Format Numbers As**: The format to output `NUMERIC` and `BIGINT` columns as. See the [Execute SQL options](#execute-sql-options).
- **Output Query Execution Details**: Whether to output the details of the executed query for each statement, instead of a confirmation of success. Default is off.
- **Query Batching**: The way to send queries to the database. See the [Delete options](#delete-options) for the three modes.
- **Select Distinct**: Whether to remove duplicate rows from the result. Default is off.

### Update <a href="#update" id="update"></a>

Use this operation to update rows in a table.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [MySQL credential](../../credentials/mysql.md).
- **Operation**: Select **Update**.
- **Table**: Choose the table that you want to work on. Select **From List** to choose the table from the dropdown list, or **Name** to enter the table name.
- **Data Mode**: How to map incoming data to the table columns. See the [Insert](#insert) parameters.
- **Column to Match On**: The column that selects the rows to update.
- **Value of Column to Match On**: The value to look for in **Column to Match On**. Available when **Data Mode** is **Map Each Column Below**.
- **Values to Send**: The **Column** and **Value** pairs to write. Available when **Data Mode** is **Map Each Column Below**.

#### Update options <a href="#update-options" id="update-options"></a>

- **Connection Timeout**: The number of milliseconds reserved for connecting to the database. Default is 30. See [Connection Timeout has no effect](#connection-timeout-has-no-effect).
- **Connections Limit**: The maximum number of connections to the database. Default is 10.
- **Output Query Execution Details**: Whether to output the details of the executed query for each statement, instead of a confirmation of success. Default is off.
- **Query Batching**: The way to send queries to the database. See the [Delete options](#delete-options) for the three modes.
- **Replace Empty Strings with NULL**: Whether to replace empty strings in the input with NULL. Default is off.

## Output Decimals as Numbers can lose digits <a href="#output-decimals-as-numbers-can-lose-digits" id="output-decimals-as-numbers-can-lose-digits"></a>

**Output Decimals as Numbers** is off by default, so a `DECIMAL` column arrives as a string with every digit the database holds.

Turn the option on and n8n converts the value to a JavaScript number instead. A JavaScript number holds about 15 significant digits, and MySQL stores `DECIMAL` to 65 digits without rounding. The conversion drops the digits past that limit, and it doesn't warn you. Leave the option off for money, identifiers, and any other value you compare or store again.

Refer to MySQL's [fixed-point types documentation](https://dev.mysql.com/doc/refman/8.4/en/fixed-point-types.html) for the precision MySQL guarantees.

## Connection Timeout has no effect <a href="#connection-timeout-has-no-effect" id="connection-timeout-has-no-effect"></a>

The **Connection Timeout** option appears for every operation, but the node doesn't apply it to the connection. The **Connect Timeout** field on the [MySQL credential](../../credentials/mysql.md) doesn't reach the connection either. The node uses the MySQL driver's own default instead.

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
