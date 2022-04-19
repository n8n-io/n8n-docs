# Autopilot Trigger

[Autopilot](https://www.autopilothq.com/) is a visual marketing software that allows you to automate and personalize your marketing across the entire customer journey.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/autopilot/).


## Events

- Contact added
- Contact added to a list
- Contact entered to a segment
- Contact left a segment
- Contact removed from a list
- Contact unsubscribed
- Contact updated

## Example Usage

This workflow allows you to receive updates when a new contact gets added in Autopilot and add them to a base in Airtable. You can also find the [workflow](https://n8n.io/workflows/991) on n8n.io. This example usage workflow would use the following node.
- [Autopilot Trigger]()
- [Set](/workflow/integrations/core-nodes/n8n-nodes-base.set/)
- [Airtable](/workflow/integrations/nodes/n8n-nodes-base.airtable/)

The final workflow should look like the following image.

![A workflow with the Autopilot Trigger node](/_images/integrations/trigger-nodes/autopilottrigger/workflow.png)

### 1. Autopilot Trigger

 The Autopilot Trigger node will trigger the workflow when a new contact gets added in Autopilot.

1. First of all, you'll have to enter credentials for the Autopilot Trigger node. You can find out how to do that [here](/workflow/integrations/credentials/autopilot/).
2. Select 'Contact Added' from the ***Events*** dropdown list.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns the information of the new contact that was added to Autopilot. This output gets passed on to the next node in the workflow.

![Using the Autopilot Trigger node to trigger the workflow](/_images/integrations/trigger-nodes/autopilottrigger/autopilottrigger_node.png)

### 2. Set node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow.

1. Click on ***Add Value*** and select 'String' from the dropdown list.
2. Enter `First Name` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > contact > FirstName. You can also add the following expression: `{{$json["contact"]["FirstName"]}}`.
5. Enter `First Name` in the ***Name*** field.
6. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
7. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > contact > LastName. You can also add the following expression: `{{$json["contact"]["LastName"]}}`.
8. Click on ***Add Value*** and select 'String' from the dropdown list.
9. Enter `Email` in the ***Name*** field.
10. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
11. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > contact > Email. You can also add the following expression: `{{$json["contact"]["Email"]}}`.
12. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
13. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node uses the data from the previous node and returns the data that we set for the workflow.

![Using the Set node to set the data](/_images/integrations/trigger-nodes/autopilottrigger/set_node.png)

### 3. Airtable node

This node will store the data coming from the previous node in a table in Airtable.

1. First of all, you'll have to enter credentials for the Airtable node. You can find out how to do that [here](/workflow/integrations/credentials/airtable/).
2. Select 'Append' from the ***Operation*** dropdown list.
3. Enter the base ID in the ***Base ID*** field. For obtaining the Base ID, head over to their [API page](https://airtable.com/api) and select the correct base. You’ll find the Base ID under the Introduction section.
4. In Doc², paste the ID of the base in the ***Base ID*** field.
5. Enter the table name in the ***Table*** name field.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node adds the information of a new contact from the previous node in a table in Airtable.

![Using the Airtable node to append the information of a subscriber](/_images/integrations/trigger-nodes/autopilottrigger/airtable_node.png)

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Autopilot Trigger node.

