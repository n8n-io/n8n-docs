# Kitemaker

The Kitemaker node allows you to automate work in Kitemaker, and integrate Kitemaker with other applications. n8n has built-in support for a wide range of Kitemaker features, including creating, updating, deleting, retrieving, and getting organizations, spaces, and users. 

On this page, you'll find a list of operations the Kitemaker node supports and links to more resources.

!!! note "Credentials"
    Refer to [Kitemaker credentials](https://docs.n8n.io/integrations/builtin/credentials/kitemaker/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Kitemaker integrations](https://n8n.io/integrations/kitemaker/){:target="_blank" .external-link} list.


## Basic Operations

* Organization
    * Retrieve data on the logged-in user's organization.
* Space
    * Retrieve data on all the spaces in the logged-in user's organization.
* User
    * Retrieve data on all the users in the logged-in user's organization.
* Work Item
    * Create
    * Get
    * Get All
    * Update

## Example Usage

This workflow allows you to create, update, and get a work item from Kitemaker. You can also find the [workflow](https://n8n.io/workflows/1048) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Kitemaker]()

The final workflow should look like the following image.

![A workflow with the Kitemaker node](/_images/integrations/builtin/app-nodes/kitemaker/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Kitemaker node (workItem: create)

This node will create a work item in Kitemaker.

1. First of all, you'll have to enter credentials for the Kitemaker node. You can find out how to do that [here](/integrations/builtin/credentials/kitemaker/).
2. Select 'Create' from the ***Operation*** dropdown list.
3. Enter a title in the ***Title*** field.
4. Select 'In progress' from the ***Status ID*** dropdown list.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new work item in Kitemaker.

![Using the Kitemaker node to create a new work item](/_images/integrations/builtin/app-nodes/kitemaker/kitemaker_node.png)


### 3. Kitemaker1 node (workItem: update)

This node will update the status of the item that we created using the previous node.

1. Select the credentials that you entered in the previous Kitemaker node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Work Item ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > id. You can also add the following expression: `{{$json["id"]}}`.
5. Click on the ***Add Field*** button and select 'Status ID' from the dropdown list.
6. Select 'Done' from the ***Status ID*** dropdown list.
7. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node updates the status of the item that got created previously.

![Using the Kitemaker node to update a work item](/_images/integrations/builtin/app-nodes/kitemaker/kitemaker1_node.png)

### 4. Kitemaker2 node (workItem: get)

This node will retrieve the information about the item that we created earlier.


1. Select the credentials that you entered in the previous Kitemaker node.
2. Click on the gears icon next to the ***Work Item ID*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > id. You can also add the following expression: `{{$json["id"]}}`.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node retrieves the information of the work item that we created earlier.

![Using the Kitemaker node to retrieve the information of a work item](/_images/integrations/builtin/app-nodes/kitemaker/kitemaker2_node.png)
