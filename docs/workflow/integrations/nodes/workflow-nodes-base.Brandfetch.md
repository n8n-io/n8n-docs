# Brandfetch

[Brandfetch](https://www.Brandfetch.com/) is a brand search engine that helps you find logos, colors, fonts, images, and more.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/brandfetch/).



## Basic Operations

* Return a company's colors
* Return a company's data
* Return a company's fonts
* Return a company's industry
* Return a company's logo & icon

## Example Usage

This workflow allows you to get the logo, icon, and information of a company and store it in Airtable. You can also find the [workflow](https://n8n.io/workflows/835) on Workflow².io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/workflow-nodes-base.start/)
- [Brandfetch]()
- [Set](/workflow/integrations/core-nodes/workflow-nodes-base.set/)
- [Airtable](/workflow/integrations/nodes/workflow-nodes-base.airtable/)

The final workflow should look like the following image.

![A workflow with the Brandfetch node](/_images/integrations/nodes/brandfetch/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Brandfetch node (logo)

This node will fetch the URL of the logo and icon of Workflow². If you want the logo and icon of a different company, enter the domain name of that company instead.

1. First of all, you'll have to enter credentials for the Brandfetch node. You can find out how to do that [here](/workflow/integrations/credentials/brandfetch/).
2. Enter `n8n.io` in the ***Domain*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node retrieves the URL of n8n's logo and icon.

![Using the Brandfetch node to retrieve the URL of the logo and icon of a comapny](/_images/integrations/nodes/brandfetch/brandfetch_node.png)

### 3. Brandfetch1 node (company)

This node will fetch company data about Workflow².

1. Select the credentials that you entered in the previous Brandfetch node.
2. Select 'Company' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Domain*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Brandfetch > Parameters > domain. You can also add the following expression: `{{$node["Brandfetch"].parameter["domain"]}}`.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns company data about Workflow².

![Using the Brandfetch node to retrieve the company data](/_images/integrations/nodes/brandfetch/brandfetch1_node.png)

### 4. Set node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow. We will set the value of `Name`, `Icon URL`, and `Logo URL`in this node.

1. Click on the ***Add Value*** button and select 'String' from the dropdown list.
2. Enter `Name` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Brandfetch1 > Output Data > JSON > name. You can also add the following expression: `{{$node["Brandfetch1"].json["name"]}}`.
5. Click on the ***Add Value*** button and select 'String' from the dropdown list.
6. Enter `Icon URL` in the ***Name*** field.
7. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Nodes > Brandfetch > Output Data > JSON > icon > image. You can also add the following expression: `{{$node["Brandfetch"].json["icon"]["image"]}}`.
9. Click on the ***Add Value*** button and select 'String' from the dropdown list.
10. Enter `Logo URL` in the ***Name*** field.
11. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
12. Select the following in the ***Variable Selector*** section: Nodes > Brandfetch > Output Data > JSON > logo > image. You can also add the following expression: `{{$node["Brandfetch"].json["logo"]["image"]}}`.
13. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
14. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node sets the value of `Name`, `Icon URL`, and `Logo URL`. This value is passed to the next node in the workflow.

![Using the Set node to set data to be inserted by the Airtable node](/_images/integrations/nodes/brandfetch/set_node.png)

### 5. Airtable node (Append)

This node will append the data that we set in the previous node to a table. Create a table like [this](https://airtable.com/shrPVVaVZuHofrDVw) in your Airtable base.

1. First of all, you'll have to enter credentials for the Airtable node. You can find out how to do that [here](/workflow/integrations/credentials/airtable/).
2. Select 'Append' from the ***Operation*** dropdown list.
3. Enter the Base ID in the ***Base ID*** field. For obtaining the Base ID, head over to their [API page](https://airtable.com/api) and select the correct base. You’ll find the Base ID there.
4. Enter the name of your table in the ***Table*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node appends the data that we had set in the previous node.

![Using the Airtable node to insert data into an Airtable table](/_images/integrations/nodes/brandfetch/airtable_node.png)
