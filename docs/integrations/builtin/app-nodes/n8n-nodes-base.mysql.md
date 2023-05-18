---
title: MySQL
description: Documentation for the MySQL node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# MySQL

The MySQL node allows you to automate work in MySQL, and integrate MySQL with other applications. n8n has built-in support for a wide range of MySQL features, including executing an SQL query, as well as inserting, and updating rows in a database.

On this page, you'll find a list of operations the MySQL node supports and links to more resources.

!!! note "Credentials"
    Refer to [MySQL credentials](/integrations/builtin/credentials/mysql/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [MySQL integrations](https://n8n.io/integrations/mysql/){:target="_blank" .external-link} list.


## Operations

* Delete
* Execute SQL
* Insert
* Insert or Update
* Select
* Update

## Related resources

View [example workflows and related content](https://n8n.io/integrations/mysql/){:target=_blank .external-link} on n8n's website.

## Use query parameters

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
