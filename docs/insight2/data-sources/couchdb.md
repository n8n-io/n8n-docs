---
title: CouchDB
description: 
tags:
  - Insight²
  - Data Sources
---

# CouchDB

Insight² can connect to CouchDB databases to read and write data. CocuhDB uses basic auth for authentication , username and password for the database is required to create an CouchDB data source on Insight². For more info visit [CouchDB docs](https://docs.couchdb.org/en/stable/).


![Insight² - Data source - CouchDb](/_images/insight2/datasource-reference/couchdb/auth_couch_in2.gif)


## Supported queries:



	- [Listing records](/insight2/data-sources/couchdb/#listing-records)
			- [Optional parameters:](/insight2/data-sources/couchdb/#optional-parameters)
	- [Retrieving a record](/insight2/data-sources/couchdb/#retrieving-a-record)
			- [Required parameters:](/insight2/data-sources/couchdb/#required-parameters)
	- [Creating a record](/insight2/data-sources/couchdb/#creating-a-record)
			- [Example Records:](/insight2/data-sources/couchdb/#example-records)
	- [Updating a record](/insight2/data-sources/couchdb/#updating-a-record)
			- [Required parameters:](/insight2/data-sources/couchdb/#required-parameters_1)
			- [Example body:](/insight2/data-sources/couchdb/#example-body)
	- [Deleting a record](/insight2/data-sources/couchdb/#deleting-a-record)
			- [/insight2/data-sources/couchdb/#required-parameters_2)
	- [Find](/insight2/data-sources/couchdb/#find)
			- [Required parameters:](/insight2/data-sources/couchdb/#required-parameters_3)
			- [Example body:](/insight2/data-sources/couchdb/#example-body_1)
	- [Retrieving a view](/insight2/data-sources/couchdb/#retrieving-a-view)
			- [Required parameters:](/insight2/data-sources/couchdb/#required-parameters_4)
			- [Optional parameters:](/insight2/data-sources/couchdb/#optional-parameters_1)


**NOTE**: Record ID is same as document ID("_id") .

### Listing records

This query lists all the records in a database.

#### Optional parameters:

- **Include docs**
- **Descending order**
- **Limit**
- **Skip**


descending (boolean) – Return the documents in descending order by key. Default is false.

limit (number) – Limit the number of the returned documents to the specified number.

skip (number) – Skip this number of records before starting to return the results. Default is 0.

include_docs (boolean) – include_docs key is set to false by default , if true it returns the document data along with the default fields.





![Insight² - Data source - CouchDb](/_images/insight2/datasource-reference/couchdb/listing.png)




Example response from CouchDb:

```json
{
    "total_rows": 3,
    "offset": 0,
    "rows": [
        {
            "id": "23212104e60a71edb42ebc509f000dc2",
            "key": "23212104e60a71edb42ebc509f000dc2",
            "value": {
                "rev": "1-0cc7f48876f15883394e5c139c628123"
            }
        },
        {
            "id": "23212104e60a71edb42ebc509f00216e",
            "key": "23212104e60a71edb42ebc509f00216e",
            "value": {
                "rev": "1-b3c45696b10cb08221a335ff7cbd8b7a"
            }
        },
        {
            "id": "23212104e60a71edb42ebc509f00282a",
            "key": "23212104e60a71edb42ebc509f00282a",
            "value": {
                "rev": "1-da5732beb913ecbded309321cac892d2"
            }
        },
    ]
}
```

### Retrieving a record

#### Required parameters:

- **Record ID**



![Insight² - Data source - CouchDb](/_images/insight2/datasource-reference/couchdb/retrieving.png)




Example response from CouchDb:

```json
{
    "_id": "e33dc4e209689cb0400d095fc401a1e0",
    "_rev": "1-a62af8e14451af88c150e7e718b7a0e8",
    "0": {
        "name": "test data"
    }
}
```
The returned JSON is the JSON of the document, including the document ID and revision number:


### Creating a record



![Insight² - Data source - CouchDb](/_images/insight2/datasource-reference/couchdb/creating.png)



#### Example Records:

```json
  [{"name":"tooljet"}]
```

Click on the `run` button to run the query.


**NOTE**: Query must be saved before running.


Example response from CouchDb:
```json

   {
    "ok": true,
    "id": "23212104e60a71edb42ebc509f0049a2",
    "rev": "1-b0a625abc4e21ee554737920156e911f"
}

```

### Updating a record

You can get the revision id  value, by sending a GET request to get the document details.
You get the document as JSON in the response. For each update to the document, the revision field "_rev" gets changed.

#### Required parameters:
- **Revision ID**
- **Record ID**



![Insight² - Data source - CouchDb](/_images/insight2/datasource-reference/couchdb/updating.png)


#### Example body:

```json
  [{"name":"tooljet"}]
```


Click on the `run` button to run the query.


**NOTE**: Query must be saved before running.


Example response from CouchDb:
```json
{
    "ok": true,
    "id": "23212104e60a71edb42ebc509f0049a2",
    "rev": "2-b0a625abc4e21ee554737920156e911f"
}
```

### Deleting a record

#### Required parameters:
- **Revision ID**
- **Record ID**



![Insight² - Data source - CouchDb](/_images/insight2/datasource-reference/couchdb/deleting.png)




Click on the `run` button to run the query.


Example response from CouchDb:

```json
{
    "ok": true,
    "id": "rev_id=2-3d01e0e87139c57e9bd083e48ecde13d&record_id=e33dc4e209689cb0400d095fc401a1e0",
    "rev": "1-2b99ef28c03e68ea70bb668ee55ffb7b"
}
```

### Find

Find documents using a declarative JSON querying syntax.

#### Required parameters:
- **Selector**


**NOTE**: [selector syntax](https://pouchdb.com/guides/mango-queries.html)





![Insight² - Data source - CouchDb](/_images/insight2/datasource-reference/couchdb/find.png)



#### Example body:

```json
{
    "selector": {
        "year":  {"$gte": 2015}
    },
    "fields": ["year"]
}
```


Click on the `run` button to run the query.


**NOTE**: selector (json) – JSON object describing criteria used to select documents.

[More information](https://docs.couchdb.org/en/stable/api/database/find.html)


Example response from CouchDb:



![Insight² - Data source - CouchDb](/_images/insight2/datasource-reference/couchdb/find_response.png)



### Retrieving a view

Views are the primary tool used for querying and reporting on CouchDB documents.

#### Required parameters:
- **View url**

[Reference for view](https://docs.couchdb.org/en/3.2.0/ddocs/views/intro.html#what-is-a-view)



![Insight² - Data source - CouchDb](/_images/insight2/datasource-reference/couchdb/get_view.png)



#### Optional parameters:

- **Start key**
- **End key**
- **Limit**
- **Skip**

Click on the `run` button to run the query.


startkey (json) – Return records starting with the specified key.

endkey (json) – Stop returning records when the specified key is reached.

limit (number) – Limit the number of the returned documents to the specified number.

skip (number) – Skip this number of records before starting to return the results. Default is 0.


Example response from CouchDb:
```json
{
    "total_rows": 4,
    "offset": 0,
    "rows": [
        {
            "id": "23212104e60a71edb42ebc509f000dc2",
            "key": "23212104e60a71edb42ebc509f000dc2",
            "value": {
                "rev": "1-0cc7f48876f15883394e5c139c628123"
            }
        },
        {
            "id": "23212104e60a71edb42ebc509f00216e",
            "key": "23212104e60a71edb42ebc509f00216e",
            "value": {
                "rev": "1-b3c45696b10cb08221a335ff7cbd8b7a"
            }
        },
        {
            "id": "23212104e60a71edb42ebc509f00282a",
            "key": "23212104e60a71edb42ebc509f00282a",
            "value": {
                "rev": "1-da5732beb913ecbded309321cac892d2"
            }
        },
        {
            "id": "23212104e60a71edb42ebc509f002cbd",
            "key": "23212104e60a71edb42ebc509f002cbd",
            "value": {
                "rev": "1-ca5bb3c0767eb42ea6c33eee3d395b59"
            }

        }
    ]
}
```
