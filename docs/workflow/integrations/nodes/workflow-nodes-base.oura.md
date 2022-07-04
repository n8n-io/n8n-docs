# Oura

[Oura](https://www.ouraring.com/) is a wellness ring and app that helps you keep track of your activities and sleep.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/oura/).


## Basic Operations

* Profile
    * Get the user's personal information.
* Summary
    * Get the user's activity summary.
    * Get the user's readiness summary.
    * Get the user's sleep summary

## Example Usage

This workflow allows you to get activity summary from Oura and store the output in Airtable. You can also find the [workflow](https://n8n.io/workflows/882) on Workflow².io. This example usage workflow uses the following nodes.
- [Cron](/workflow/integrations/core-nodes/workflow-nodes-base.cron/)
- [Oura]()
- [Set](/workflow/integrations/core-nodes/workflow-nodes-base.set/)
- [Airtable](/workflow/integrations/nodes/workflow-nodes-base.airtable/)

The final workflow should look like the following image.

![A workflow with the Oura node](/_images/integrations/nodes/oura/workflow.png)

### 1. Cron node

The Cron node will trigger the workflow every Sunday at 9 AM.

1. Click on ***Add Cron Time***.
2. Select 'Every Week' from the ***Mode*** dropdown list.
3. Enter `9` in the ***Hour*** field.
4. Select 'Sunday' from the ***Weekday*** dropdown list.
5. Click on ***Execute Node*** to run the node.

![Using the Cron node to trigger the workflow once a week](/_images/integrations/nodes/oura/cron_node.png)

### 2. Oura node (getActivity: summary)

This node will return the activity summary of a week.

1. First of all, you'll have to enter credentials for the Oura node. You can find out how to do that [here](/workflow/integrations/credentials/oura/).
2. Select 'Get Activity Summary' from the ***Operation*** dropdown list.
3. Toggle ***Return All*** to `true`.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns the activity summary.

![Using the Oura node to get the activity summary](/_images/integrations/nodes/oura/oura_node.png)

### 3. Set node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow.


1. Click on ***Add Value*** and select 'String' from the dropdown list.
2. Enter `Day` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > summary_date. You can also add the following expression: `{{$json["summary_date"]}}`.
5. Click on ***Add Value*** and select 'String' from the dropdown list.
6. Enter `Steps` in the ***Name*** field.
7. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > steps. You can also add the following expression: `{{$json["steps"]}}`.
9. Click on ***Add Value*** and select 'String' from the dropdown list.
10. Enter `Activity Score` in the ***Name*** field.
11. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
12. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > score. You can also add the following expression: `{{$json["score"]}}`.
13. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
14. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node uses the data from the previous node and returns the data that we set for the workflow.

![Using the Set node to set the data](/_images/integrations/nodes/oura/set_node.png)

## 4. Airtable node (Append)

This node will append the data that we set in the previous node to a table. Create a table like [this](https://airtable.com/shrUqFItKPlSpgrht) in your Airtable base.

1. First of all, you'll have to enter credentials for the Airtable node. You can find out how to do that [here](/workflow/integrations/credentials/airtable/).
2. Select 'Append' from the ***Operation*** dropdown list.
3. Enter the Base ID in the ***Base ID*** field. For obtaining the Base ID, head over to their [API page](https://airtable.com/api) and select the correct base. You’ll find the Base ID there.
4. Enter the name of your table in the ***Table*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node appends the data that we had set in the previous node.

![Using the Airtable node to insert data into an Airtable table](/_images/integrations/nodes/oura/airtable_node.png)

!!! note " Activate workflow for production"
    This example workflow uses the Cron node, which is a Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cron node.

