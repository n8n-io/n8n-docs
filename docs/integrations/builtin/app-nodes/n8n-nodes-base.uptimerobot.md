---
title: UptimeRobot node - n8n Documentation
description: Documentation for the UptimeRobot node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# UptimeRobot

The UptimeRobot node allows you to automate work in UptimeRobot, and integrate UptimeRobot with other applications. n8n has built-in support for a wide range of UptimeRobot features, including creating and deleting alerts, as well as getting account details. 

On this page, you'll find a list of operations the UptimeRobot node supports and links to more resources.

!!! note "Credentials"
    Refer to [UptimeRobot credentials](/integrations/builtin/credentials/uptimerobot/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [UptimeRobot integrations](https://n8n.io/integrations/uptimerobot/){:target="_blank" .external-link} list.


## Basic Operations

* Account
    * Get account details
* Alert Contact
    * Create an alert contact
    * Delete an alert contact
    * Get an alert contact
    * Get all alert contacts
    * Update an alert contact
* Maintenance Window
    * Create a maintenance window
    * Delete a maintenance window
    * Get a maintenance window
    * Get all a maintenance windows
    * Update a maintenance window
* Monitor
    * Create a monitor
    * Delete a monitor
    * Get a monitor
    * Get all monitors
    * Reset a monitor
    * Update a monitor
* Public Status Page
    * Create a public status page
    * Delete a public status page
    * Get a public status page
    * Get all a public status pages

## Example Usage

This workflow allows you to create, update, and get a monitor using the UptimeRobot node. You can also find the [workflow](https://n8n.io/workflows/1112) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [UptimeRobot]()

The final workflow should look like the following image.

![A workflow with the UptimeRobot node](/_images/integrations/builtin/app-nodes/uptimerobot/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. UptimeRobot node (create: monitor)

This node will create a new monitor of the type `HTTP(S)`.

1. First of all, you'll have to enter credentials for the OpenWeatherMap node. You can find out how to do that [here](/integrations/builtin/credentials/openweathermap/).
2. Select 'Monitor' from the ***Resource*** dropdown list.
3. Select 'Create' from the ***Operation*** dropdown list.
4. Enter `n8n` in the ***Friendly Name*** field.
5. Select 'HTTP(S)' from the ***Type*** dropdown list.
6. Enter `https://n8n.io` in the ***URL*** field.
7. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns data about the current weather in Berlin.

![Using the OpenWeatherMap node to get weather updates for Berlin](/_images/integrations/builtin/app-nodes/uptimerobot/uptimerobot_node.png)

### 3. UptimeRobot node (update: monitor)

This node will update the monitor that we created in the previous node.

1. Select the credentials that you entered in the previous node.
2. Select 'Monitor' from the ***Resource*** dropdown list.
3. Select 'Update' from the ***Operation*** dropdown list.
4. Click on the gears icon next to the ***ID*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > id. You can also add the following expression: `{{$json["id"]}}`.
6. Click on ***Add Field*** and select 'Friendly Name' from the dropdown list.
7. Enter `n8n website` in the ***Friendly Name*** field.
8. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node updates the friendly name of the monitor that we created in the previous node.

![Using the UptimeRobot node to update a monitor](/_images/integrations/builtin/app-nodes/uptimerobot/uptimerobot1_node.png)

### 4. UptimeRobot node (get: monitor)

This node will get the information of the monitor that we created in the previous node.

1. Select the credentials that you entered in the previous node.
2. Select 'Monitor' from the ***Resource*** dropdown list.
3. Select 'Update' from the ***Operation*** dropdown list.
4. Click on the gears icon next to the ***ID*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > id. You can also add the following expression: `{{$json["id"]}}`.
6. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node returns the information of the monitor that we created earlier.

![Using the UptimeRobot node to retrieve information of a monitor](/_images/integrations/builtin/app-nodes/uptimerobot/uptimerobot2_node.png)

