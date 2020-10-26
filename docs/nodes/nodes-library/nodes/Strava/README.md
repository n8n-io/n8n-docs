---
permalink: /nodes/n8n-nodes-base.strava
description: Learn how to use the Strava node in n8n
---

# Strava

[Strava](https://www.strava.com/) is an online service for tracking fitness activities.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Strava/README.md).
:::

## Basic Operations

::: details Activity
- Create a new activity
- Get an activity
- Get all activities
- Get all activity comments
- Get all activity kudos
- Get all activity laps
- Get all activity zones
- Update an activity
:::


## Example Usage

This workflow allows you to create, update, and get an activity in Strava. You can also find the [workflow](https://n8n.io/workflows/685) on n8n.io. This example usage workflow would use the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [Strava]()

The final workflow should look like the following image.

![A workflow with the Strava node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. Strava node (create: activity)

1. First of all, you'll have to enter credentials for the Strava node. You can find out how to do that [here](../../../credentials/Strava/README.md).
2. Select the project ID from the ***Project ID*** dropdown list.
3. Enter the subject of the issue in the ***Subject*** field.
4. Click on ***Execute Node*** to run the node.

<!-- ![Using the Strava node to create an activity](./Strava_node.png) -->


::: v-pre
### 3. Strava1 node (update: activity)

1. Select the credentials that you entered in the previous node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Project ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Strava > Output Data > JSON > project. You can also add the following expression: `{{$node["Strava"].json["project"]}}`.
5. Click on the gears icon next to the ***activity ID*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Strava > Output Data > JSON > id. You can also add the following expression: `{{$node["Strava"].json["id"]}}`.
7. Click on the ***Add Field*** button and select 'Description' from the dropdown list.
8. Enter the description of the activity in the ***Description*** field.
9. Click on ***Execute Node*** to run the node.
:::

<!-- ![Using the Strava node to update an activity](./Strava1_node.png) -->


::: v-pre
### 4. Strava2 node (get: activity)

1. Select the credentials that you entered in the previous node.
2. Select 'Get' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***activity ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Strava > Output Data > JSON > id. You can also add the following expression: `{{$node["Strava"].json["id"]}}`.
5. Click on ***Execute Node*** to run the node.
:::

<!-- ![Using the Strava node to get an issue](./Strava2_node.png) -->
