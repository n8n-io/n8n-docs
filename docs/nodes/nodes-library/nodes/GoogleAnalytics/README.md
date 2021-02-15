---
permalink: /nodes/n8n-nodes-base.googleAnalytics
description: Learn how to use the Google Analytics node in n8n
---

# Google Analytics

[Google Analytics](https://analytics.google.com) is a web analytics service offered by Google that lets you measure your advertising ROI as well as track your Flash, video, and social networking sites and applications.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Google/README.md).
:::

## Basic Operations

::: details Report
- Return the analytics data
:::

::: details User Activity
- Return user activity data
:::

## Example Usage

This workflow allows you to get analytical metrics of your website using the Goole Analytics node and store it in Airtable. You can also find the [workflow](https://n8n.io/workflows/892) on n8n.io. This example usage workflow uses the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [Google Analytics]()
- [Set](../../core-nodes/Set/README.md)
- [Airtable](../Airtable/README.md)

The final workflow should look like the following image.

![A workflow with the Google Analytics node](./workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Google Analytics node (get: report)

This node will retrieve the session metrics grouped by country for a given date range. You can select a different dimension, metric, and date range.

1. First of all, you'll have to enter credentials for the Google Analytics node. You can find out how to do that [here](../../../credentials/Google/README.md).
2. Select a view from the ***View ID*** dropdown list.
3. Click on ***Add Field*** and select 'Dimensions'.
4. Click on the ***Add Dimension*** button.
5. Select 'Country' from the ***Name*** field.
6. Click on ***Add Field*** and select 'Date Ranges'.
7. Click on the ***Add Date Range*** button.
8. Select a start date in the ***Start Date*** field.
9. Select an end date in the ***End Date*** field.
10. Click on ***Add Field*** and select 'Metrics'.
11. Click on the ***Add Metrics*** button.
12. Enter `Session` in the ***Alias*** field.
13. Enter `ga:sessions` in the ***Expression*** field.
14. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns the information about the sessions grouped by country.

![Using the Google Analytics node to retrieve analytics of a website](./Analytics_node.png)

### 3. Set node

We will use the Set node to set the values for the country and metrics. This data gets passed on to the next nodes in the workflow.
::: v-pre
1. Click on the ***Add Value*** button and select 'string' from the dropdown list.
2. Enter `Country` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Current Nodes > Input Data > JSON > country. You can also add the following expression: `{{$json["ga:country"]}}`.
5. Click on ***Add Value*** and select 'Number' from the dropdown list.
6. Enter `Metric` in the ***Name*** field.
7. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Current Nodes > Input Data > JSON > total. You can also add the following expression: `{{$json["total"]}}`.
9. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
10. Click on ***Execute Node*** to run the node.
:::
In the screenshot below, you will notice that the node sets the value for `Country` and `Metric`.

![Using the Set node to set data](./Set_node.png)

### 4. Airtable node (Append)

This node will append the data that we set in the previous node to a table. Create a table like [this](https://airtable.com/shrFIVzFaXgv7LekV) in your Airtable base.

1. First of all, you'll have to enter credentials for the Airtable node. You can find out how to do that [here](../../../credentials/Airtable/README.md).
2. Select 'Append' from the ***Operation*** dropdown list.
3. Enter the Base ID in the ***Base ID*** field. For obtaining the Base ID, head over to their [API page](https://airtable.com/api) and select the correct base. You’ll find the Base ID there.
4. Enter the name of your table in the ***Table*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node appends the data that we had set in the previous node.

![Using the Airtable node to insert data into an Airtable table](./Airtable_node.png)
