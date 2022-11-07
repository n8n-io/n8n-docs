---
title: MinIO
description: 
tags:
  - Insight²
  - Data Sources
---

# MinIO

Insight² can connect to minio and perform various operation on them.

## Supported operations

- **Read object**
- **Put object**
- **List buckets**
- **List objects in a bucket**
- **Presigned url for download**
- **Presigned url for upload**

## Connection

To add a new minio source, click on the **Add or edit datasources** icon on the left sidebar of the app editor and click on `+ add data source` button. Select Minio from the modul that pops up.

![](/_images/insight2/datasource-reference/datasource_minio.png)

Insight² requires the following to connect to your DynamoDB:

- **Host**
- **Port**
- **Access key**
- **Secret key**



![Insight² - Minio connection](/_images/insight2/datasource-reference/minio-connect.png)



Click on `Test connection` button to verify if the credentials are correct and that the database is accessible to Insight² server. Click on `Save` button to save the data source.

## Querying Minio

Click on `+` button of the **query manager** at the bottom panel of the editor and select the data source added in the previous step as data source. Select the operation that you want to perform and click `Save` to save the query.

![Insight² - Mino query](/_images/insight2/datasource-reference/minio-query.png)

Click on the `run` button to run the query.<br>
:fontawesome-solid-triangle-exclamation:{ style="color: #EE0F0F" }**NOTE**: Query should be saved before running.

:fontawesome-solid-circle-info:{ style="color: #0F17E4" } Tip:
Query results can be transformed using transformations. Read our transformations documentation to see how: [link](/insight2/tutorial/transformations/)

