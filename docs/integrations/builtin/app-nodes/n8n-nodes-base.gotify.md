# Gotify

The Gotify node allows you to automate work in the Gotify platform and integrate Drift with other applications. n8n has built-in support for a wide range of Gotify features, which includes basic operations like creating, deleting, and getting messages. 

On this page, you'll find a list of operations the Gotify node supports and links to more resources.

!!! note "Credentials"
    Refer to the [Gotify credentials](https://docs.n8n.io/integrations/builtin/credentials/gotify/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Gotify integrations](https://n8n.io/integrations/gotify/){:target="_blank" .external-link} list.


## Basic Operations

* Message
    * Create
    * Delete
    * Get All

## Example Usage

This workflow allows you to send daily weather updates via a message using the Gotify node. You can also find the [workflow](https://n8n.io/workflows/774) on n8n.io. This example usage workflow uses the following nodes.
- [Cron](/integrations/builtin/core-nodes/n8n-nodes-base.cron/)
- [OpenWeatherMap](/integrations/builtin/app-nodes/n8n-nodes-base.openweathermap/)
- [Gotify]()

The final workflow should look like the following image.

![A workflow with the Gotify node](/_images/integrations/builtin/app-nodes/gotify/workflow.png)

### 1. Cron node

The Cron node will trigger the workflow daily at 9 AM.

1. Click on ***Add Cron Time***.
2. Set hours to 9 in the ***Hour*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the Cron node is configured to trigger the workflow every day at 9 AM.

![Using the Cron node to trigger the workflow daily at 9 am](/_images/integrations/builtin/app-nodes/gotify/cron_node.png)

### 2. OpenWeatherMap node (Current Weather)

This node will return data about the current weather in Berlin. To get the weather updates for your city, you can enter the name of your city instead.

1. First of all, you'll have to enter credentials for the OpenWeatherMap node. You can find out how to do that [here](/integrations/builtin/credentials/openweathermap/).
2. Enter `berlin` in the ***City*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns data about the current weather in Berlin.

![Using the OpenWeatherMap node to get weather updates for Berlin](/_images/integrations/builtin/app-nodes/gotify/openweathermap_node.png)

### 3. Gotify node (create: message)

This node will send a message with the weather update.

1. First of all, you'll have to enter credentials for the Gotify node. You can find out how to do that [here](/integrations/builtin/credentials/gotify/).
2. Click on the gears icon next to the ***Message*** field and click on ***Add Expression***.

3. Enter the following message in the ***Expression*** field: `Hey! The temperature outside is {{$node["OpenWeatherMap"].json["main"]["temp"]}}°C.`.
4. Click on ***Add Field*** and select 'Title' from the dropdown list.
5. Enter `Today's Weather Update` in the ***Title*** field.
6. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node sends a message with the weather update.

![Using the Gotify node to send weather updates via a message](/_images/integrations/builtin/app-nodes/gotify/gotify_node.png)

!!! note "Activate workflow for production"
    This example workflow uses the Cron node, which is a Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cron node.

