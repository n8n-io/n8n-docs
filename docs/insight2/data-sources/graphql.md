---
title: GraphQL
description: 
tags:
  - Insight²
  - Data Sources
---

# GraphQL


Insight² can connect to GraphQL endpoints to execute queries and mutations.

## Connection

To add a new GraphQL datasource,click on the **Add or edit datasources** icon on the left sidebar of the app editor and click on `+ add data source` button. Select GraphQL from the modul that pops up.

Insight² requires the following to connect to a GraphQL datasource.

- URL of the GraphQL endpoint

The following optional parameters are also supported:

   | Type         | Description |
   | -----------  | ----------- |
   | URL params   | Additional query string parameters|
   | headers      | Any headers the GraphQL source requires|



<img class="screenshot-full" src="/_images/insight2/datasource-reference/graphql/add-source.gif" alt="Insight² - GraphQL connection" height="420"/>

Click on the `Save` button to save the data source.

## Querying GraphQL
Click on `+` button of the query manager at the bottom panel of the editor and select the GraphQL endpoint added in the previous step as the data source.

<img class="screenshot-full" src="/_images/insight2/datasource-reference/graphql-query.png" alt="Insight² - GraphQL connection" height="420"/>

Click on the `run` button to run the query.<br>
:fontawesome-solid-triangle-exclamation:{ style="color: #EE0F0F" } **NOTE**: Query should be saved before running.

:fontawesome-solid-circle-info:{ style="color: #0F17E4" } **Tip**:
Query results can be transformed using transformations. Read our transformations documentation to see how: [link](/insight2/tutorial/transformations/)
