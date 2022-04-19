# Bubble

[Bubble](https://www.bubble.io/) lets you create interactive, multi-user apps for desktop and mobile web browsers.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/bubble/).


## Basic Operations

* Object
    * Create
    * Delete
    * Get
    * Get All
    * Update

## Example Usage

This workflow allows you to create, update, and get an object from Bubble. You can also find the [workflow](https://n8n.io/workflows/1041) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Bubble]()

The final workflow should look like the following image.

![A workflow with the Bubble node](/_images/integrations/nodes/bubble/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Bubble node (create: object)

This node will create a new object of the type `Doc` in Bubble. If you want to create an object with a different type, use that type instead.

1. First of all, you'll have to enter credentials for the Bubble node. You can find out how to do that [here](/workflow/integrations/credentials/bubble/).
2. Select 'Create' from the ***Operation*** dropdown list.
3. Enter `Doc` in the ***Type Name*** field.
4. Click on the ***Add Property*** button.
5. Enter `Name` in the ***Key*** field. If you're using a different type, enter the field name present in the type.
6. Enter `Bubble` in the ***Value*** field.
7. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new object of the type `Doc` in Bubble.

![Using the Bubble node to create a new object](/_images/integrations/nodes/bubble/bubble_node.png)


### 3. Bubble1 node (update: object)

This node will update the object that we created using the previous node.

1. Select the credentials that you entered in the previous Bubble node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Type Name*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Bubble > Parameters > typeName. You can also add the following expression: `{{$node["Bubble"].parameter["typeName"]}}`.
5. Click on the gears icon next to the ***Object ID*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > id. You can also add the following expression: `{{$json["id"]}}`.
6. Click on the ***Add Property*** button.
7. Enter `Name` in the ***Key*** field. If you're using a different type, enter the field name present in the type.
8. Enter `Bubble node` in the ***Value*** field.
9. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node updates the information of the object that got created previously.

![Using the Bubble node to update the information of an object](/_images/integrations/nodes/bubble/bubble1_node.png)

### 4. Bubble2 node (get: object)

This node will retrieve the information of the object that we created earlier.


1. Select the credentials that you entered in the previous Bubble node.
2. Click on the gears icon next to the ***Type Name*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > Bubble > Parameters > typeName. You can also add the following expression: `{{$node["Bubble"].parameter["typeName"]}}`.
4. Click on the gears icon next to the ***Object ID*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Nodes > Bubble > Output Data > JSON > id. You can also add the following expression: `{{$node["Bubble"].json["id"]}}`.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node retrieves the information of the object that we created earlier.

![Using the Bubble node to retrieve the information of an object](/_images/integrations/nodes/bubble/bubble2_node.png)
