---
title: Adding a data source
description: 
tags:
  - Insight²
  - Data Sources
---

# Adding a data source


The data sources are created on app level and not on workspace level.


**Datasource manager** is on the left-sidebar of the app builder. To add a new data source, click on the `Add datasource` button.



![Insight² - Tutorial - Adding a data source](/_images/insight2/datasource-reference/postgresql/AddingDatasource_1.png)



You will be prompted to select the data source that you wish to add. Let's select PostgreSQL for this tutorial. You will then need to provide the credentials of your PostgreSQL database. The fields that are marked as `encrypted` will be encrypted before saving to Insight's database.



![Insight² - Tutorial - Adding a data source](/_images/insight2/datasource-reference/postgresql/AddingDatasource_2.png)



The name of the data source must be unique (within the app) and can be changed by clicking on the data source name at the top of the prompt. Click on `Test Connection` button to verify the connection, this might take a couple of minutes. Once verified, save the data source.


If you are using Insight² cloud and if your data source is not publicly accessible, please white-list our IP address ( shown while creating a new data source ).




![Insight² - Tutorial - Adding a data source](/_images/insight2/datasource-reference/postgresql/AddingDatasource_3.png)


