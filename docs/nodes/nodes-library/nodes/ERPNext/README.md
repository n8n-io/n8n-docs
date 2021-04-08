---
permalink: /nodes/n8n-nodes-base.erpNext
description: Learn how to use the ERPNext node in n8n
---

# ERPNext

[ERPNext](https://erpnext.com) is an open-source integrated Enterprise Resource Planning software. It is a generic ERP software used by manufacturers, distributors, and services companies.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/ERPNext/README.md).
:::

## Basic Operations

::: details Document
- Create a document
- Delete a document
- Retrieve a document
- Retrieve all documents
- Update a document
:::

## Example Usage

This workflow allows you to create, update, and retrieve a document from ERPNext. You can also find the [workflow](https://n8n.io/workflows/961) on n8n.io. This example usage workflow uses the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [ERPNext]()

The final workflow should look like the following image.

![A workflow with the ERPNext node](./workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. ERPNext node (document: create)

This node will create a new document in ERPNext.

1. First of all, you'll have to enter credentials for the ERPNext node. You can find out how to do that [here](../../../credentials/ERPNext/README.md).
2. Select 'Item' from the ***DocType*** dropdown list.
3. Click on the ***Add Property*** button.
4. Select 'Item Name' from the ***Field*** dropdown list.
5. Enter `item 1` in the ***Value*** field.
6. Click on the ***Add Property*** button.
7. Select 'Item Code' from the ***Field*** dropdown list.
8. Enter `item-1` in the ***Value*** field.
9. Click on the ***Add Property*** button.
10. Select 'Item Group' from the ***Field*** dropdown list.
11. Enter `Products` in the ***Value*** field.
**Note:** Make sure that the item group exists in your ERPNext account.
12. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new item with the name `item 1`.

![Using the ERPNext node to create a new item](./ERPNext_node.png)

### 3. ERPNext1 node (document: addContact)

This node will add the `Item Tax` property to the item that we created in the previous node.
::: v-pre
1. Select the credentials that you entered in the previous node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Select 'Item' from the ***DocType*** dropdown list.
4. Click on the gears icon next to the ***Item Name*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > name. You can also add the following expression: `{{$json["name"]}}`.
6. Click on the ***Add Property*** button.
7. Select 'Item Tax' from the ***Field*** dropdown list.
8. Enter `5` in the ***Value*** field.
10. Click on ***Execute Node*** to run the node.
:::
In the screenshot below, you will notice that the node adds the Item Tax property to the item that we created in the previous node.

![Using the ERPNext node to update an item](./ERPNext1_node.png)

### 4. ERPNext2 node (document: get)

This node will get the information about the item that we created earlier.
::: v-pre
1. Select the credentials that you entered in the previous node.
2. Select 'Get' from the ***Operation*** dropdown list.
3. Select 'Item' from the ***DocType*** dropdown list.
4. Click on the gears icon next to the ***Item Name*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > name. You can also add the following expression: `{{$json["name"]}}`.
6. Click on ***Execute Node*** to run the node.
:::

In the screenshot below, you will notice that the node returns the information of the item.

![Using the ERPNext node to return the information an item](./ERPNext2_node.png)
