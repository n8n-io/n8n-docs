# Phantombuster

[Phantombuster](https://www.phantombuster.com/) is a scraping platform that allows chain actions and data extraction on the web to generate business leads, marketing audiences, and overall growth.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/phantombuster/).


## Basic Operations

* Agent
    * Delete an agent by ID.
    * Get an agent by ID.
    * Get all agents of the current user's organization.
    * Get the output of the most recent container of an agent.
    * Add an agent to the launch queue.

## Example Usage

This workflow allows you to store the output of a phantom in Airtable. You can also find the [workflow](https://n8n.io/workflows/882) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Phantombuster]()
- [Set](/integrations/core-nodes/n8n-nodes-base.set/)
- [Airtable](/integrations/nodes/n8n-nodes-base.airtable/)

The final workflow should look like the following image.

![A workflow with the Phantombuster node](/_images/integrations/nodes/phantombuster/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Phantombuster node (getOutput: agent)

Create and launch the [LinkedIn Profile Scraper](https://phantombuster.com/automations/linkedin/3112/linkedin-profile-scraper) in your Phantombuster account. This node will return the output of this phantom.

1. First of all, you'll have to enter credentials for the Phantombuster node. You can find out how to do that [here](/integrations/credentials/phantombuster/).
2. Select 'Get Output' from the ***Operation*** dropdown list.
3. Select a phantom from the ***Agent*** dropdown list.
4. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns the output from the LinkedIn Profile Scraper phantom.

![Using the Phantombuster node to get the output of a phantom](/_images/integrations/nodes/phantombuster/phantombuster_node.png)

### 3. Set node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow.


1. Click on ***Add Value*** and select 'String' from the dropdown list.
2. Enter `Name` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Phantombuster > Output Data > JSON > general > fullName. You can also add the following expression: `{{$node["Phantombuster"].json["general"]["fullName"]}}`.
5. Click on ***Add Value*** and select 'String' from the dropdown list.
6. Enter `Email` in the ***Name*** field.
7. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Nodes > Phantombuster > Output Data > JSON > details > mail. You can also add the following expression: `{{$node["Phantombuster"].json["details"]["mail"]}}`.
9. Click on ***Add Value*** and select 'String' from the dropdown list.
10. Enter `Company` in the ***Name*** field.
11. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
12. Select the following in the ***Variable Selector*** section: Nodes > Phantombuster > Output Data > JSON > jobs> [Item: 0] > companyName. You can also add the following expression: `{{$node["Phantombuster"].json["jobs"][0]["companyName"]}}`.
13. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
14. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node uses the data from the previous node and returns the data that we set for the workflow.

![Using the Set node to set the data](/_images/integrations/nodes/phantombuster/set_node.png)

## 4. Airtable node (Append)

This node will append the data that we set in the previous node to a table. Create a table like [this](https://airtable.com/shr6hP774ijrXFput) in your Airtable base.

1. First of all, you'll have to enter credentials for the Airtable node. You can find out how to do that [here](/integrations/credentials/airtable/).
2. Select 'Append' from the ***Operation*** dropdown list.
3. Enter the Base ID in the ***Base ID*** field. For obtaining the Base ID, head over to their [API page](https://airtable.com/api) and select the correct base. You’ll find the Base ID there.
4. Enter the name of your table in the ***Table*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node appends the data that we had set in the previous node.

![Using the Airtable node to insert data into an Airtable table](/_images/integrations/nodes/phantombuster/airtable_node.png)
