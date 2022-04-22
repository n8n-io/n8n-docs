---
title: Webflow
description: Use Webflow with Workflow²
tags:
  - Workflow²
  - Webflow
---
# Webflow

[Webflow](https://webflow.com) is an application that allows you to build responsive websites with browser-based visual editing software.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/webflow/).


## Basic Operations

* Item
    * Create
    * Delete
    * Get
    * Get All
    * Update

## Example Usage

This workflow allows you to create, update, and get an item from Webflow. You can also find the [workflow](https://n8n.io/workflows/1048) on Workflow².io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Webflow]()

The final workflow should look like the following image.

![A workflow with the Webflow node](/_images/integrations/nodes/webflow/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Webflow node (create: item)

This node will create a new collection of the type `Team Members` in Webflow. If you want to create a collection with a different type, use that type instead.

1. First of all, you'll have to enter credentials for the Webflow node. You can find out how to do that [here](/workflow/integrations/credentials/webflow/).
2. Select 'Create' from the ***Operation*** dropdown list.
3. Select your site from the ***Site ID*** dropdown list.
4. Select 'Team Members' from the ***Collection ID*** dropdown list.
5. Click on the ***Add Field*** button.
6. Select 'Name (PlainText) (required)' from the ***Field ID*** dropdown list. If you're using a different collection type, select the field present in that collection.
7. Enter `n8n` in the ***Field Value*** field.
8. Click on the ***Add Field*** button.
9. Select 'Slug (PlainText) (required)' from the ***Field ID*** dropdown list. If you're using a different collection type, select the field present in that collection.
10. Enter `n8n` in the ***Field Value*** field.
11. Click on the ***Add Field*** button.
12. Select 'Archived (Bool) (required)' from the ***Field ID*** dropdown list. If you're using a different collection type, select the field present in that collection.
13. Enter `false` in the ***Field Value*** field.
14. Click on the ***Add Field*** button.
15. Select 'Draft (Bool) (required)' from the ***Field ID*** dropdown list. If you're using a different collection type, select the field present in that collection.
16. Enter `false` in the ***Field Value*** field.
17. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new item for the collection type `Team Members` in Webflow.

![Using the Webflow node to create a new item](/_images/integrations/nodes/webflow/webflow_node.png)


### 3. Webflow1 node (update: item)

This node will update the item that we created using the previous node.

1. Select the credentials that you entered in the previous Webflow node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Select your site from the ***Site ID*** dropdown list.
4. Select 'Team Members' from the ***Collection ID*** dropdown list.
5. Click on the gears icon next to the ***Item ID*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > _id. You can also add the following expression: `{{$json["_id"]}}`.
7. Click on the ***Add Property*** button.
Click on the ***Add Field*** button.
8. Select 'Name (PlainText) (required)' from the ***Field ID*** dropdown list. If you're using a different collection type, select the field present in that collection.
9. Click on the gears icon next to the ***Field Value*** field and click on ***Add Expression***.
10. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > name. You can also add the following expression: `{{$json["name"]}}`.
11. Click on the ***Add Field*** button.
12. Select 'Slug (PlainText) (required)' from the ***Field ID*** dropdown list. If you're using a different collection type, select the field present in that collection.
13. Click on the gears icon next to the ***Field Value*** field and click on ***Add Expression***.
14. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > slug. You can also add the following expression: `{{$json["slug"]}}`.
15. Click on the ***Add Field*** button.
16. Select 'Archived (Bool) (required)' from the ***Field ID*** dropdown list. If you're using a different collection type, select the field present in that collection.
17. Click on the gears icon next to the ***Field Value*** field and click on ***Add Expression***.
18. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > _archived. You can also add the following expression: `{{$json["_archived"]}}`.
19. Click on the ***Add Field*** button.
20. Select 'Draft (Bool) (required)' from the ***Field ID*** dropdown list. If you're using a different collection type, select the field present in that collection.
21. Click on the gears icon next to the ***Field Value*** field and click on ***Add Expression***.
22. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > _draft. You can also add the following expression: `{{$json["_draft"]}}`.
23. Click on the ***Add Field*** button.
24. Select 'Avatar (ImageRef)' from the ***Field ID*** dropdown list. If you're using a different collection type, select the field present in that collection.
25. Enter `https://n8n.io/n8n-logo.png` in the ***Value*** field.
26. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node updates the item that got created previously.

![Using the Webflow node to update an item](/_images/integrations/nodes/webflow/webflow1_node.png)

### 4. Webflow2 node (get: item)

This node will retrieve the information about the item that we created earlier.


1. Select the credentials that you entered in the previous Webflow node.
2. Select your site from the ***Site ID*** dropdown list.
3. Select 'Team Members' from the ***Collection ID*** dropdown list.
4. Click on the gears icon next to the ***Item ID*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > _id. You can also add the following expression: `{{$json["_id"]}}`.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node retrieves the information of the item that we created earlier.

![Using the Webflow node to retrieve the information of an item](/_images/integrations/nodes/webflow/webflow2_node.png)
