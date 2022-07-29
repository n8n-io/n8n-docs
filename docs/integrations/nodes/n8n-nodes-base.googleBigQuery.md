# Google BigQuery

[Google BigQuery](https://cloud.google.com/bigquery/) is a fully-managed, serverless data warehouse that enables scalable analysis over petabytes of data. It is a Platform as a Service that supports querying using ANSI SQL.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/google/).


## Basic Operations

**Record**

- Create a new record
- Retrieve all records



## Example Usage

This workflow allows you to send position updates of the ISS every minute to a table in Google BigQuery. You can also find the [workflow](https://n8n.io/workflows/1049) on n8n.io. This example usage workflow uses the following nodes.
- [Cron](/integrations/core-nodes/n8n-nodes-base.cron/)
- [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/)
- [Set](/integrations/core-nodes/n8n-nodes-base.set/)
- [Google BigQuery]()

The final workflow should look like the following image.

![A workflow with the Google BigQuery node](/_images/integrations/nodes/googlebigquery/workflow.png)

### 1. Cron node

The Cron node will trigger the workflow every minute.

1. Click on ***Add Cron Time***.
2. Select 'Every Minute' from the ***Mode*** dropdown list.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the Cron node is configured to trigger the workflow every minute.

![Using the Cron node to trigger the workflow every minute](/_images/integrations/nodes/googlebigquery/cron_node.png)

### 2. HTTP Request node (GET)

This node will make a GET request to the API `https://api.wheretheiss.at/v1/satellites/25544/positions` to fetch the position of the ISS. This information gets passed on to the next node in the workflow.

1. Enter `https://api.wheretheiss.at/v1/satellites/25544/positions` in the ***URL*** field.
2. Click on the ***Add Parameter*** button in the ***Query Parameters*** section.
3. Enter `timestamps` in the ***Name*** field.
4. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
5. Enter the following expression: `{{Date.now()}}`. This expression will return the current timestamp.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node makes a GET request to the API and returns the information about the location of the ISS.

![Using the HTTP Request node to get the information about the location of the ISS](/_images/integrations/nodes/googlebigquery/httprequest_node.png)

### 3. Set node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow.

1. Click on ***Add Value*** and select 'String' from the dropdown list.
2. Enter `name` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > 0 > name. You can also add the following expression: `{{$json["0"]["name"]}}`.
5. Click on ***Add Value*** and select 'Number' from the dropdown list.
6. Enter `latitude` in the ***Name*** field.
7. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Nodes > Input Data > JSON > 0 > latitude. You can also add the following expression: `{{$json["0"]["latitude"]}}`.
9. Click on ***Add Value*** and select 'Number' from the dropdown list.
10. Enter `longitude` in the ***Name*** field.
11. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
12. Select the following in the ***Variable Selector*** section: Nodes > Input Data > JSON > 0 > longitude. You can also add the following expression: `{{$json["0"]["longitude"]}}`.
13. Click on ***Add Value*** and select 'Number' from the dropdown list.
14. Enter `timestamp` in the ***Name*** field.
15. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
16. Select the following in the ***Variable Selector*** section: Nodes > Input Data > JSON > 0 > timpestamp. You can also add the following expression: `{{$json["0"]["timestamp"]}}`.
17. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
18. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node uses the data from the previous node and returns the data that we set for the workflow.

![Using the Set node to set the data](/_images/integrations/nodes/googlebigquery/set_node.png)

### 4. Google BigQuery node (create: record)

This node will send the data from the previous node to the `position` table in Google BigQuery. If you have created a table with a different name, use that table instead.

1. First of all, you'll have to enter credentials for the Google BigQuery node. You can find out how to do that [here](/integrations/credentials/google/).
2. Select a project from the ***Project ID*** dropdown list.
3. Select a dataset from the ***Dataset ID*** dropdown list.
4. Select the table from `position` from the ***Table ID*** dropdown list. If you created a table with a different name, select that table instead.
5. Enter `name, latitude, longitude, timestamp` in the ***Columns*** field.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node sends the data from the previous node to the `position` table in Google BigQuery.

![Using the Google BigQuery node to create new record](/_images/integrations/nodes/googlebigquery/googlebigquery_node.png)

!!! note "Activate workflow for production"
    This example workflow uses the Cron node, which is a Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cron node.

