---
permalink: /nodes/n8n-nodes-base.facebookTrigger
description: Learn how to use the Facebook Trigger node in n8n
---

# Facebook Trigger

[Facebook](https://www.facebook.com/) is a social networking site that makes it easy to connect and share with family and friends online.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/FacebookApp/README.md).
:::

## Object

- Get updates about an Ad Account
- Get updates about the app
- Get updates about Certificate Transparency
- Get updates about activity in groups and events in groups of Workplace
- Get updates about the comments on your media
- Get updates about the links for rich previews by an external provider
- Page updates
- Updates regarding granting or revoking permissions
- User profile updates
- Get updates about Whatsapp business account
- Get updates about Workplace security

## Example Usage

This workflow allows you to receive updates when a user updates their profile on Facebook using the Facebook Trigger node. It also allows you to update the user information in Airtable. You can also find the [workflow](https://n8n.io/workflows/769) on n8n.io. This example usage workflow would use the following nodes.
- [Facebook Trigger]()
- [Airtable](../../nodes/Airtable/README.md)
- [Set](../../core-nodes/Set/README.md)

The final workflow should look like the following image.

![A workflow with the Facebook Trigger node](./workflow.png)

### 1. Facebook Trigger node

 The Facebook Trigger node will trigger the workflow when a user updates their profile on Facebook.

1. First of all, you'll have to enter credentials for the Facebook Trigger node. You can find out how to do that [here](../../../credentials/FacebookApp/README.md).
2. Select 'User' from the ***Object*** dropdown list.
3. Enter your app ID in the ***App ID*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns the updated information of the user from Facebook. This output is passed on to the next node in the workflow.

![Using the Facebook Trigger node to trigger the workflow](./FacebookTrigger_node.png)

### 2. Airtable node (List)

This node will return the information of the user from Airtable.

1. First of all, you'll have to enter credentials for the Airtable node. You can find out how to do that [here](../../../credentials/Airtable/README.md).
:::v-pre
2. Select 'List' from the ***Operation*** dropdown list.
3. Enter the application ID in the ***Application ID*** field. For obtaining the Application ID, head over to their [API page](https://airtable.com/api) and select the correct base. You’ll find the Application ID under the Introduction section.
4. Enter the table name in the ***Table*** field.
5. Click on ***Add Option*** and select 'Filter By Formula' from the dropdown list.
6. Click on the gears icon next to the ***Filter By Formula*** field and click on ***Add Expression***.
7. Enter the following expression: `FIND({{$node["Set"].json["uid"]}},uid,0)`. This expression will only return the information of the user whose information is updated on Facebook.
8. Click on ***Execute Node*** to run the node.
:::
In the screenshot below, you will notice that the node returns the information from Airtable of a user whose hometown information was updated on Facebook.

![Using the Airtable node to list the information of a user](./Airtable_node.png)

### 3. Set node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow.
::: v-pre
1. Click on ***Add Value*** and select 'String' from the dropdown list.
2. Enter `field` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Facebook Trigger > Output Data > JSON > changes > [Item: 0] > field. You can also add the following expression: `{{$node["Facebook Trigger"].json["changes"][0]["field"]}}`.
5. Click on ***Add Value*** and select 'String' from the dropdown list.
6. Click on the gears icon next to the ***Name*** field and click on ***Add Expression***.
7. Select the following in the ***Variable Selector*** section: Nodes > Facebook Trigger > Output Data > JSON > changes > [Item: 0] > field. You can also add the following expression: `{{$node["Facebook Trigger"].json["changes"][0]["field"]}}`.
8. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
9. Select the following in the ***Variable Selector*** section: Nodes > Facebook Trigger > Output Data > JSON > changes > [Item: 0] > value > page. You can also add the following expression: `{{$node["Facebook Trigger"].json["changes"][0]["value"]["page"]}}`.
10. Click on ***Add Value*** and select 'String' from the dropdown list.
11. Enter `uid` in the ***Name*** field.
12. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
13. Select the following in the ***Variable Selector*** section: Nodes > Facebook Trigger > Output Data > JSON > uid. You can also add the following expression: `{{$node["Facebook Trigger"].json["uid"]}}`.
14. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
15. Click on ***Execute Node*** to run the node.
:::
In the screenshot below, you will notice that the node uses the data from the previous node and returns the data that we set for the workflow.

![Using the Set node to set the data](./Set_node.png)

### 4. Airtable1 node (Update)

This node will update the data coming from the previous node in a table in Airtable.
::: v-pre
1. Select the credentials that you entered in the previous node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Application ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Airtable > Parameters > application. You can also add the following expression: `{{$node["Airtable"].parameter["application"]}}`.
5. Click on the gears icon next to the ***Table*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Airtable > Parameters > table. You can also add the following expression: `{{$node["Airtable"].parameter["table"]}}`.
7. Click on the gears icon next to the ***Id*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Nodes > Airtable > Output Data > JSON > id. You can also add the following expression: `{{$node["Airtable"].json["id"]}}`.
9. Toggle the ***Update All Fields*** to false.
10. Click on the ***Add Field*** button.
11. Click on the gears icon next to the field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Nodes > Set > Output Data > JSON > field. You can also add the following expression: `{{$node["Set"].json["field"]}}`.
6. Click on ***Execute Node*** to run the node.
:::
In the screenshot below, you will notice that the node updates the hometown of the user in a table in Airtable.

![Using the Airtable node to update the information of a user](./Airtable1_node.png)
