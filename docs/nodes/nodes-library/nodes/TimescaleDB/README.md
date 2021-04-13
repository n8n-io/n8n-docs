---
permalink: /nodes/n8n-nodes-base.timescaleDb
description: Learn how to use the TimescaleDB node in n8n
---

# TimescaleDB

[TimescaleDB](https://www.timescale.com/) is an open-source time-series SQL database optimized for fast ingest and complex queries.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/TimescaleDB/README.md).
:::

## Basic Operations

- Execute an SQL query
- Insert rows in database
- Update rows in database

## Example Usage

This workflow allows you to receive updates of the position of the ISS every minute and insert it to a table using the TimscaleDB node. You can also find the [workflow](https://n8n.io/workflows/917) on n8n.io. This example usage workflow uses the following nodes.
- [Cron](../../core-nodes/Cron/README.md)
- [HTTP Request](../../core-nodes/HTTPRequest/README.md)
- [Set](../../core-nodes/Set/README.md)
- [TimescaleDB]()

The final workflow should look like the following image.

![A workflow with the TimescaleDB node](./workflow.png)

### 1. Cron node

The Cron node will trigger the workflow every minute.

1. Click on ***Add Cron Time***.
2. Select 'Every Minute' from the ***Mode*** dropdown list.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the Cron node is configured to trigger the workflow every minute.

![Using the Cron node to trigger the workflow every minute](./Cron_node.png)

### 2. HTTP Request node (GET)

This node will make a GET request to the API `https://api.wheretheiss.at/v1/satellites/25544/positions` to fetch the position of the ISS. This information gets passed on to the next node in the workflow.
::: v-pre
1. Enter `https://api.wheretheiss.at/v1/satellites/25544/positions` in the ***URL*** field.
2. Click on the ***Add Parameter*** button in the ***Query Parameters*** section.
3. Enter `timestamps` in the ***Name*** field.
4. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
5. Enter the following expression: `{{Date.now()}}`. This expression will return the current timestamp.
6. Click on ***Execute Node*** to run the node.
:::
In the screenshot below, you will notice that the node makes a GET request to the API and returns the information about the location of the ISS.

![Using the HTTP Request node to get the information about the location of the ISS](./HTTPRequest_node.png)

### 3. Set node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow.
::: v-pre
1. Click on ***Add Value*** and select 'String' from the dropdown list.
2. Enter `latitude` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > 0 > latitude. You can also add the following expression: `{{$json["0"]["latitude"]}}`.
5. Click on ***Add Value*** and select 'String' from the dropdown list.
6. Enter `longitude` in the ***Name*** field.
7. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > 0 > longitude. You can also add the following expression: `{{$json["0"]["longitude"]}}`.
9. Click on ***Add Value*** and select 'String' from the dropdown list.
10. Enter `timestamp` in the ***Name*** field.
11. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
12. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > 0 > timpestamp. You can also add the following expression: `{{$json["0"]["timestamp"]}}`.
13. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
14. Click on ***Execute Node*** to run the node.
:::
In the screenshot below, you will notice that the node uses the data from the previous node and returns the data that we set for the workflow.

![Using the Set node to set the data](./Set_node.png)

### 4. TimescaleDB node (Insert)

We will insert the data from the previous node to a table named `iss`. To create the table, use the following SQL command.
```
CREATE TABLE iss(latitude NUMERIC, longitude NUMERIC, timestamp NUMERIC);
```

1. First of all, you'll have to enter credentials for the TimescaleDB node. You can find out how to do that [here](../../../credentials/TimescaleDb/README.md).
2. Enter `iss` in the ***Table*** field.
3. Enter `latitude, longitude, timestamp` in the ***Columns*** field.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node inserts the data from the previous node to the `iss` table in TimescaleDB.

![Using the TimescaleDB node to insert the data to a table](./TimescaleDB_node.png)

::: tip 💡 Activate workflow for production
This example workflow uses the Cron node, which is a Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cron node.
:::

## FAQs

### How to specify the data type of a column?
To specify the data type of a column, append the column name with `:type`, where `type` is the data type of that column. For example, if you want to specify the type `int` for the column *id* and type `text` for the column *name*, you can use the following snippet in the ***Columns*** field: `id:init,name:text`.
