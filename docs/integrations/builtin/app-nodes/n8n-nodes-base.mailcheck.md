# Mailcheck

[Mailcheck](https://www.mailcheck.co/) is an application that allows you to clean your subscription list from bounces and enrich data with customers.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/mailcheck/).


## Basic Operations

* Email
    * Check

## Example Usage

This workflow allows you to validate emails stored in Airtable using the Mailcheck node. You can also find the [workflow](https://n8n.io/workflows/1055) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Airtable]/integrations/builtin/app-nodes/n8n-nodes-base.airtable/)
- [Mailcheck]()
- [Set](/integrations/builtin/core-nodes/n8n-nodes-base.set/)

The final workflow should look like the following image.

![A workflow with the Mailcheck node](/_images/integrations/builtin/app-nodes/mailcheck/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Airtable node (List)

Create a table like [this](https://airtable.com/shrDUFXWoHCuJjYjT) in your Airtable base. The Airtable node will list all the records from a table.

1. First of all, you'll have to enter credentials for the Airtable node. You can find out how to do that [here](/integrations/builtin/credentials/airtable/).
2. Select the 'List' option from the ***Operation*** dropdown list.
3. Enter the Base ID in the ***Base ID*** field. For obtaining the Base ID, head over to their [API page](https://airtable.com/api) and select the correct base. You'll find the Base ID there.
4. Enter the name of your table in the ***Table*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns all the records from the table.

![Using the Airtable node to list data from an Airtable table](/_images/integrations/builtin/app-nodes/mailcheck/airtable_node.png)

### 2. Mailcheck node (check: email)

This node will check the emails that got returned by the previous node.

1. First of all, you'll have to enter credentials for the Mailcheck node. You can find out how to do that [here](/integrations/builtin/credentials/mailcheck/).

2. Click on the gears icon next to the ***Email*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > fields > email. You can also add the following expression: `{{$json["fields"]["Email"]}}`.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node checks the email that got returned by the previous node.

![Using the Mailcheck node to check email](/_images/integrations/builtin/app-nodes/mailcheck/mailcheck_node.png)

### 3. Set node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow.

1. Click on the ***Add Value*** button and select 'Boolean' from the dropdown list.
2. Enter `Valid` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field.
4. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > mxExists. You can also add the following expression: `{{$json["mxExists"]}}`.
5. Click on the ***Add Value*** button and select 'String' from the dropdown list.
6. Enter `ID` in the ***Name*** field.
7. Click on the gears icon next to the ***Value*** field.
8. Select the following in the ***Variable Selector*** section: Nodes > Airtable > Output Data > JSON > id. You can also add the following expression: `{{$node["Airtable"].json["id"]}}`.
9. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node sets the value for `Valid` and `ID`.

![Using the Set node to set data to be updated by the Airtable node](/_images/integrations/builtin/app-nodes/mailcheck/set_node.png)

### 4. Airtable (Update)

This node will update the Valid field in the table.

1. Select the credentials that you entered in the previous Airtable node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Base ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Airtable > Parameters > application. You can also add the following expression: `{{$node["Airtable"].parameter["application"]}}`.
5. Click on the gears icon next to the ***Table*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Airtable > Parameters > table. You can also add the following expression: `{{$node["Airtable"].parameter["table"]}}`.
7. Click on the gears icon next to the ***Id*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > ID. You can also add the following expression: `{{$json["ID"]}}`.
9. Toggle ***Update All Fields*** to `false`. This option will update only the fields that we specify.
10. Click on the ***Add Field*** button.
11. Enter `Valid` in the ***Name*** field.
12. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node updates the Valid field in the table.

![Using the Airtable node to update data of a record](/_images/integrations/builtin/app-nodes/mailcheck/airtable1_node.png)
