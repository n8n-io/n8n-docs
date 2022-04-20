# Wise Trigger

[Wise](https://wise.com) allows you to transfer money abroad with low-cost money transfers, receive money with international account details, and track transactions on your phone.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/wise/).


## Events

- Triggered every time a balance account is credited
- Triggered every time a transfer's list of active cases is updated
- Triggered every time a transfer's status is updated

## Example Usage

This workflow allows you to receive updates from Wise and add information of a transfer to a base in Airtable. You can also find the [workflow](https://n8n.io/workflows/993) on n8n.io. This example usage workflow would use the following nodes.
- [Wise Trigger]()
- [Wise](/workflow/integrations/nodes/workflow-nodes-base.wise/)
- [Set](/workflow/integrations/core-nodes/n8n-nodes-base.set/)
- [Airtable](/workflow/integrations/nodes/n8n-nodes-base.airtable/)

The final workflow should look like the following image.

![A workflow with the Wise Trigger node](/_images/integrations/trigger-nodes/wisetrigger/workflow.png)

### 1. Wise Trigger node (transferStateChange)

This node will trigger the workflow when the status of your transfer changes.

1. First of all, you'll have to enter credentials for the Wise Trigger node. You can find out how to do that [here](/workflow/integrations/credentials/wise/).
2. Select 'Personal' from the ***Profile*** dropdown list.
3. Select 'Transfer State Changed' from the ***Event*** dropdown list.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node triggers the workflow when a new order gets created.

![Using the Wise Trigger node to trigger the workflow](/_images/integrations/trigger-nodes/wisetrigger/wisetrigger_node.png)

### 2. Wise node (get: transfer)

This node will get the information about the transfer.

1. Select the credentials that you entered in the previous node.
2. Select 'Transfer' from the ***Resource*** dropdown list.
3. Select 'Get' from the ***Operation*** dropdown list.
4. Click on the gears icon next to the ***Transfer ID*** field.
5. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > data > resource > id. You can also add the following expression: `{{$json["data"]["resource"]["id"]}}`.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns the information of the transfer.

![Using the Wise node to retrieve the information of the transfer](/_images/integrations/trigger-nodes/wisetrigger/wise_node.png)

### 3. Set node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow. We will set the value of `Transfer ID`, `Date`, `Reference`, and `Amount` in this node.

1. Click on ***Add Value*** and select 'String' from the dropdown list.
2. Enter `Transfer ID` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > id. You can also add the following expression: `{{$json["id"]}}`.
5. Click on ***Add Value*** and select 'String' from the dropdown list.
6. Enter `Date` in the ***Name*** field.
7. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > created. You can also add the following expression: `{{$json["created"]}}`.
9. Click on ***Add Value*** and select 'String' from the dropdown list.
10. Enter `Reference` in the ***Name*** field.
11. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
12. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > reference. You can also add the following expression: `{{$json["reference"]}}`.
13. Click on ***Add Value*** and select 'String' from the dropdown list.
10. Enter `Amount` in the ***Name*** field.
11. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
12. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > sourceValue. You can also add the following expression: `{{$json["sourceValue"]}}`.
13. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
14. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node sets the values of `Transfer ID`, `Date`, `Reference`, and `Amount`. These values are passed to the next node in the workflow.

![Using the Set node to set the values](/_images/integrations/trigger-nodes/wisetrigger/set_node.png)

### 4. Airtable node (Append)

This node will append the data that we set in the previous node to a table. Create a table like [this](https://airtable.com/shrZQQCRtQPBYTmUe) in your Airtable base.

1. First of all, you'll have to enter credentials for the Airtable node. You can find out how to do that [here](/workflow/integrations/credentials/airtable/).
2. Select 'Append' from the ***Operation*** dropdown list.
3. Enter the Base ID in the ***Base ID*** field. For obtaining the Base ID, head over to their [API page](https://airtable.com/api) and select the correct base. You’ll find the Base ID there.
4. Enter the name of your table in the ***Table*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node appends the data that we had set in the previous node.

![Using the Airtable node to insert data into an Airtable table](/_images/integrations/trigger-nodes/wisetrigger/airtable_node.png)

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Wise Trigger node.

