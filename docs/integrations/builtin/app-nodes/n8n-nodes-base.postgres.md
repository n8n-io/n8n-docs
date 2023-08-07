---
title: Postgres
description: Documentation for the Postgres node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Postgres

The Postgres node allows you to automate work in Postgres, and integrate Postgres with other applications. n8n has built-in support for a wide range of Postgres features, including executing queries, as well as inserting and updating rows in a database. 

On this page, you'll find a list of operations the Postgres node supports and links to more resources.

!!! note "Credentials"
    Refer to [Postgres credentials](/integrations/builtin/credentials/postgres/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Postgres integrations](https://n8n.io/integrations/postgres/){:target="_blank" .external-link} list.


## Operations

* Delete
* Execute Query
* Insert
* Insert or Update
* Select
* Update


## Related resources

n8n provides a trigger node for Postgres. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.postgrestrigger/).

View [example workflows and related content](https://n8n.io/integrations/postgres/){:target=_blank .external-link} on n8n's website.

## Use query parameters

When creating a query to run on a Postgres database, you can use the **Query Parameters** field in the **Options** section to load data into the query. n8n sanitizes data in query parameters, which prevents SQL injection.

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


