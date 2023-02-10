# GetResponse

GetResponse node allows you to automate work in the GetResponse platform and integrate GetResponse with other applications. n8n has built-in support for a wide range of GetResponse features, including creating, updating, deleting, and getting contacts. 

On this page, you'll find a list of operations the GetResponse node supports and links to more resources.

!!! note "Credentials"
    Refer to the [GetResponse credentials](https://docs.n8n.io/integrations/builtin/credentials/getresponse/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [GetResponse integrations](https://n8n.io/integrations/getresponse/){:target="_blank" .external-link} list.



## Basic Operations

* Contact
    * Create a new contact
    * Delete a contact
    * Get a contact
    * Get all contacts
    * Update contact properties

## Example Usage

This workflow allows you to get all the contacts from GetResponse and check if they belong to a specific campaign. If they don't belong to the specified campaign, the workflow updates the campaign ID of the contacts using the GetResponse node. You can also find the [workflow](https://n8n.io/workflows/778) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [GetResponse]()
- [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if/)
- [No Operation, do nothing](/integrations/builtin/core-nodes/n8n-nodes-base.noop/)

The final workflow should look like the following image.

![A workflow with the GetResponse node](/_images/integrations/builtin/app-nodes/getresponse/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. GetResponse node (getAll: contact)

This node will retrieve all the contacts from GetResponse.

1. First of all, you'll have to enter credentials for the GetResponse node. You can find out how to do that [here](/integrations/builtin/credentials/getresponse/).
2. Select 'GetAll' from the ***Operation*** dropdown list.
3. Toggle ***Return All*** to true.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node retrieves all the contacts from GetResponse.

![Using the GetResponse node to retrieve all the contacts](/_images/integrations/builtin/app-nodes/getresponse/getresponse_node.png)

### 3. IF node

This node will check if a contact belongs to the `n8n` campaign or not. If a contact does not belong to the `n8n` campaign, it will return true otherwise false. Create a campaign in GetResponse if you don't already have one.

1. Click on ***Add Condition*** and select 'String'.
2. Click on the gears icon next to the ***Value 1*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > GetResponse > Output Data > JSON > campaign > name. You can also add the following expression: `{{$node["GetResponse"].json["campaign"]["name"]}}`.
4. Select 'Not Equal' from the ***Operation*** dropdown list.
5. Enter `n8n` in the ***Value 2*** field. If you have a campaign with a different name, use that name instead.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns all the contacts that do not belong to the `n8n` campaign.

![Using the IF node to check if a contact belongs to the n8n campaign or not](/_images/integrations/builtin/app-nodes/getresponse/if_node.png)

### 4. GetResponse1 node (update: contact)

This node will update the campaign ID of all the contacts that we get from the true branch of the previous node.

1. Create a GetResponse node connected to the 'true' output of the IF node.
2. Select the credentials that you entered in the previous GetResponse node.
3. Select 'Update' from the ***Operation*** dropdown list.
4. Click on the gears icon next to the ***Contact ID*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Nodes > IF > Output Data > JSON > contactId. You can also add the following expression: `{{$node["IF"].json["contactId"]}}`.
6. Click on ***Add Field*** and select 'Campaign ID' from the dropdown list.
7. Select `n8n` from the ***Campaign ID*** dropdown list. If you have a campaign with a different name, select that instead.
8. Click on ***Execute Node*** to run the node.

In the screenshot below, you notice that the node updates the campaign ID of all the contacts that do not belong to the `n8n` campaign.

![Using the GetResponse node to update the campaign of the contacts](/_images/integrations/builtin/app-nodes/getresponse/getresponse1_node.png)

### 5. NoOp node

Adding this node here is optional, as the absence of this node won't make a difference to the functioning of the workflow.

1. Create a ***NoOp*** node connected to the 'false' output of the IF node.
2. Click on ***Execute Node*** to run the node.

![Using the NoOp node](/_images/integrations/builtin/app-nodes/getresponse/noop_node.png)
