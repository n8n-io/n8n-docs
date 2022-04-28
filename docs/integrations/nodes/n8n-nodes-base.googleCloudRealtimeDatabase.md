# Google Cloud Realtime Database

[Google Cloud Realtime Database](https://firebase.google.com/docs/database/) is a cloud-hosted database. Data is stored as JSON and synchronized in realtime to every connected client.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/google/).


## Basic Operations

* Write data to a database
* Delete data from a database
* Get a record from a database
* Append to a list of data
* Update item on a database

## Example Usage

This workflow allows you to receive updates of the position of the ISS every minute and push it to a database using the Google Cloud Realtime Database node. You can also find the [workflow](https://n8n.io/workflows/787) on n8n.io. This example usage workflow uses the following nodes.

- [Cron](/integrations/core-nodes/n8n-nodes-base.cron/)
- [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/)
- [Set](/integrations/core-nodes/n8n-nodes-base.set/)
- [Google Cloud Realtime Database]()

The final workflow should look like the following image.

![A workflow with the Google Cloud Realtime Database node](/_images/integrations/nodes/googlecloudrealtimedatabase/workflow.png)

### 1. Cron node

The Cron node will trigger the workflow every minute.

1. Click on ***Add Cron Time***.
2. Select 'Every Minute' from the ***Mode*** dropdown list.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the Cron node is configured to trigger the workflow every minute.

![Using the Cron node to trigger the workflow every minute](/_images/integrations/nodes/googlecloudrealtimedatabase/cron_node.png)

### 2. HTTP Request node (GET)

This node will make a GET request to the API `https://api.wheretheiss.at/v1/satellites/25544/positions` to fetch the position of the ISS. This information gets passed on to the next node in the workflow.

1. Enter `https://api.wheretheiss.at/v1/satellites/25544/positions` in the ***URL*** field.
2. Click on the ***Add Parameter*** button in the ***Query Parameters*** section.
3. Enter `timestamps` in the ***Name*** field.
4. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
5. Enter the following expression: `{{Date.now()}}`. This expression will return the current timestamp.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node makes a GET request to the API and returns the information about the location of the ISS.

![Using the HTTP Request node to get the information about the location of the ISS](/_images/integrations/nodes/googlecloudrealtimedatabase/httprequest_node.png)

### 3. Set node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow.

1. Click on ***Add Value*** and select 'String' from the dropdown list.
2. Enter `latitude` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > HTTP Request > Output Data > JSON > 0 > latitude. You can also add the following expression: `{{$node["HTTP Request"].json["0"]["latitude"]}}`.
5. Click on ***Add Value*** and select 'String' from the dropdown list.
6. Enter `longitude` in the ***Name*** field.
7. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Nodes > HTTP Request > Output Data > JSON > 0 > longitude. You can also add the following expression: `{{$node["HTTP Request"].json["0"]["longitude"]}}`.
9. Click on ***Add Value*** and select 'String' from the dropdown list.
10. Enter `timestamp` in the ***Name*** field.
11. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
12. Select the following in the ***Variable Selector*** section: Nodes > HTTP Request > Output Data > JSON > 0 > timpestamp. You can also add the following expression: `{{$node["HTTP Request"].json["0"]["timestamp"]}}`.
13. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
14. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node uses the data from the previous node and returns the data that we set for the workflow.

![Using the Set node to set the data](/_images/integrations/nodes/googlecloudrealtimedatabase/set_node.png)

### 4. Google Cloud Realtime Database node (push)

This node will push the data from the previous node to the `iss` path in Google Cloud Realtime Database. If you have created a path with a different name, you can use that path instead.

1. First of all, you'll have to enter credentials for the Google Cloud Realtime Database node. You can find out how to do that [here](/integrations/credentials/google/).
2. Select a project from the ***Project ID*** dropdown list.
3. Select 'Push' from the ***Operation*** dropdown list.
4. Enter a path in the ***Object Path*** field.
5. Enter `latitude, longitude, timestamp` in the ***Columns / Attributes*** field.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node pushes the data from the previous node to the `iss` path in Google Cloud Realtime Database.

![Using the Google Cloud Realtime Database node to push the data to a path](/_images/integrations/nodes/googlecloudrealtimedatabase/googlecloudrealtimedatabase_node.png)

!!! note " Activate workflow for production"
    This example workflow uses the Cron node, which is a Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cron node.

