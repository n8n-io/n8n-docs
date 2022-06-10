# Ghost

[Ghost](https://www.ghost.org/) is an open-source, professional publishing platform built on a Node.js technology stack.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/ghost/).


## Basic Operations

### Admin API

**Post**
- Create a post
- Delete a post
- Get a post
- Get all posts
- Update a post


### Content API

**Post**
- Get a post
- Get all posts


## Example Usage

This workflow allows you to create, update, and get a post in Ghost. You can also find the [workflow](https://n8n.io/workflows/825) on Workflow².io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Ghost]()

The final workflow should look like the following image.

![A workflow with the Ghost node](/_images/integrations/nodes/ghost/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Ghost node (create: post)

This node will create a new post with the title `Running ghost with n8n!`. If you want to create a post with a different title, use that instead.

1. Select 'Admin API' from the ***Source*** dropdown list.
2. You'll have to enter credentials for the Ghost node. You can find out how to do that [here](/workflow/integrations/credentials/ghost/).
3. Select 'Create' from the ***Operation*** dropdown list.
4. Enter `Running ghost with n8n!` in the ***Title*** field.
5. Enter the HTML content in the ***Content*** field.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new post.

![Using the Ghost node to create a new post and publish it](/_images/integrations/nodes/ghost/ghost_node.png)

### 3. Ghost1 node (update: post)

This node will update the status of the post that we created in the previous node. We will change the status of the post to `Published`.

1. Select 'Admin API' from the ***Source*** dropdown list.
2. Select the credentials that you entered in the previous node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Post ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Ghost > Output Data > JSON > id. You can also add the following expression: `{{$node["Ghost"].json["id"]}}`.
5. Click on ***Add Field*** and select 'Status'.
6. Select 'Published' from the ***Status*** dropdown list.
7. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node updates the status of the post that we created in the previous node.

![Using the Ghost node to update the status of a post](/_images/integrations/nodes/ghost/ghost1_node.png)

### 4. Ghost2 node (get: post)

This node returns information about the post that we created using the Ghost node. In this node, we are using the ***Admin API***. You can also use the ***Content API*** to get the information about the post.

1. Select 'Admin API' from the ***Source*** dropdown list.
2. Select the credentials that you entered in the previous node.
3. Select 'ID' from the ***By*** dropdown list.
4. Click on the gears icon next to the ***Identifier*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Nodes > Ghost > Output Data > JSON > id. You can also add the following expression: `{{$node["Ghost"].json["id"]}}`.
6. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node returns information about the post that we specified.

![Using the Ghost node to get information of a post](/_images/integrations/nodes/ghost/ghost2_node.png)
