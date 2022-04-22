---
title: Taiga
description: Use Taiga with Workflow²
tags:
  - Workflow²
  - Taiga
---
# Taiga

[Taiga](https://www.taiga.io/) is a free and open-source project management platform for startups, agile developers, and designers.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/taiga/).


## Basic Operations

**Issue**
- Create an issue
- Delete an issue
- Get an issue
- Get all issues
- Update an issue



## Example Usage

This workflow allows you to create, update, and get an issue on Taiga. You can also find the [workflow](https://n8n.io/workflows/685) on Workflow².io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Taiga]()

The final workflow should look like the following image.

![A workflow with the Taiga node](/_images/integrations/nodes/taiga/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Taiga node (create: issue)

1. First of all, you'll have to enter credentials for the Taiga node. You can find out how to do that [here](/workflow/integrations/credentials/taiga/).
2. Select the project ID from the ***Project ID*** dropdown list.
3. Enter the subject of the issue in the ***Subject*** field.
4. Click on ***Execute Node*** to run the node.

![Using the Taiga node to create an issue](/_images/integrations/nodes/taiga/taiga_node.png)



### 3. Taiga1 node (update: issue)

1. Select the credentials that you entered in the previous node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Project ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Taiga > Output Data > JSON > project. You can also add the following expression: `{{$node["Taiga"].json["project"]}}`.
5. Click on the gears icon next to the ***Issue ID*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Taiga > Output Data > JSON > id. You can also add the following expression: `{{$node["Taiga"].json["id"]}}`.
7. Click on the ***Add Field*** button and select 'Description' from the dropdown list.
8. Enter the description of the issue in the ***Description*** field.
9. Click on ***Execute Node*** to run the node.


![Using the Taiga node to update an issue](/_images/integrations/nodes/taiga/taiga1_node.png)



### 4. Taiga2 node (get: issue)

1. Select the credentials that you entered in the previous node.
2. Select 'Get' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Issue ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Taiga > Output Data > JSON > id. You can also add the following expression: `{{$node["Taiga"].json["id"]}}`.
5. Click on ***Execute Node*** to run the node.


![Using the Taiga node to get an issue](/_images/integrations/nodes/taiga/taiga2_node.png)
