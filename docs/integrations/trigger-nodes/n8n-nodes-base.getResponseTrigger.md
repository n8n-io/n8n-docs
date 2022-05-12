# GetResponse Trigger

[GetResponse](https://www.getresponse.com/) is an online platform that offers email marketing software, landing page creator, webinar hosting, and much more.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/getResponse/).


## Events

- Receive notifications when a customer is subscribed to a list
- Receive notifications when a customer is unsubscribed from a list
- Receive notifications when an email is opened
- Receive notifications when an email is clicked
- Receive notifications when a survey is submitted

## Example Usage

This workflow allows you to receive updates when a customer gets subscribed to a list in GetResponse and add them to a base in Airtable. You can also find the [workflow](https://n8n.io/workflows/933) on n8n.io. This example usage workflow would use the following nodes.

- [GetResponse Trigger]()
- [Set](/integrations/core-nodes/n8n-nodes-base.set/)
- [Airtable](/integrations/nodes/n8n-nodes-base.airtable/)

The final workflow should look like the following image.

![A workflow with the GetResponse Trigger node](/_images/integrations/trigger-nodes/getresponsetrigger/workflow.png)

### 1. GetResponse Trigger

The GetResponse Trigger node will trigger the workflow when a customer is subscribed to a list in GetResponse.

1. First of all, you'll have to enter credentials for the GetResponse Trigger node. You can find out how to do that [here](/integrations/credentials/getResponse/).
2. Select 'Customer Subscribed' from the ***Events*** dropdown list.
3. Select a list from the ***List IDs*** dropdown list.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns the information of the customer that gets subscribed to a list in GetResponse. This output is passed on to the next node in the workflow.

![Using the GetResponse Trigger node to trigger the workflow](/_images/integrations/trigger-nodes/getresponsetrigger/getresponsetrigger_node.png)

### 2. Set node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow.

1. Click on ***Add Value*** and select 'String' from the dropdown list.
2. Enter `Name` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > contact_name. You can also add the following expression: `{{$json["contact_name"]}}`.
5. Click on ***Add Value*** and select 'String' from the dropdown list.
6. Enter `Email` in the ***Name*** field.
7. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > contact_email. You can also add the following expression: `{{$json["contact_email"]}}`.
9. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
10. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node uses the data from the previous node and returns the data that we set for the workflow.

![Using the Set node to set the data](/_images/integrations/trigger-nodes/getresponsetrigger/set_node.png)

### 3. Airtable node (Append)

This node will store the data coming from the previous node in a table in Airtable. Create a table like [this](https://airtable.com/shruNwTykzR3tkr6d) in your Airtable base.

1. First of all, you'll have to enter credentials for the Airtable node. You can find out how to do that [here](/integrations/credentials/airtable/).
2. Select 'Append' from the ***Operation*** dropdown list.
3. Enter the base ID in the ***Base ID*** field. For obtaining the Base ID, head over to their [API page](https://airtable.com/api) and select the correct base. You'll find the Base ID under the Introduction section.
4. In n8n, paste the ID of the base in the ***Base ID*** field.
5. Enter the table name in the ***Table*** name field.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node adds the information of the customer from the previous node in a table in Airtable.

![Using the Airtable node to append the information of a customer](/_images/integrations/trigger-nodes/getresponsetrigger/airtable_node.png)

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the GetResponse Trigger node.

