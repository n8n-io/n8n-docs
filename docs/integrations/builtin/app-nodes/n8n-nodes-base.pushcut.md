# Pushcut

The Pushcut node allows you to automate work in Pushcut, and integrate Pushcut with other applications. n8n supports sending notifications with Pushcut.

On this page, you'll find a list of operations the Pushcut node supports and links to more resources.

!!! note "Credentials"
    Refer to [Pushcut credentials](/integrations/builtin/credentials/pushcut/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Pushcut integrations](https://n8n.io/integrations/pushcut/){:target="_blank" .external-link} list.


## Basic Operations

* Notification
    * Send a notification

## Example Usage

This workflow allows you to send daily weather updates via a push notification using the Pushcut node. You can also find the [workflow](https://n8n.io/workflows/843) on n8n.io. This example usage workflow uses the following nodes.
- [Cron](/integrations/builtin/core-nodes/n8n-nodes-base.cron/)
- [OpenWeatherMap](/integrations/builtin/app-nodes/n8n-nodes-base.openweathermap/)
- [Pushcut]()

The final workflow should look like the following image.

![A workflow with the Pushcut node](/_images/integrations/builtin/app-nodes/pushcut/workflow.png)

### 1. Cron node

The Cron node will trigger the workflow daily at 9 AM.

1. Click on ***Add Cron Time***.
2. Set hours to 9 in the ***Hour*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the Cron node is configured to trigger the workflow every day at 9 AM.

![Using the Cron node to trigger the workflow daily at 9 am](/_images/integrations/builtin/app-nodes/pushcut/cron_node.png)

### 2. OpenWeatherMap node (Current Weather)

This node will return data about the current weather in Berlin. To get the weather updates for your city, you can enter the name of your city instead.

1. First of all, you'll have to enter credentials for the OpenWeatherMap node. You can find out how to do that [here](/integrations/builtin/credentials/openweathermap/).
2. Enter `berlin` in the ***City*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns data about the current weather in Berlin.

![Using the OpenWeatherMap node to get weather updates for Berlin](/_images/integrations/builtin/app-nodes/pushcut/openweathermap_node.png)

### 3. Pushcut node (send: notification)

This node will send a push notification with the weather update, which was sent by the previous node.

1. First of all, you'll have to enter credentials for the Pushcut node. You can find out how to do that [here](/integrations/builtin/credentials/pushcut/).
2. Select a notification from the ***Notification Name*** dropdown list.
3. Click on ***Add Field*** and select 'Title' from the dropdown list.
4. Enter `Today's Weather Update` in the ***Title*** field.
5. Click on ***Add Field*** and select 'Text' from the dropdown list.
6. Click on the gears icon next to the ***Text*** field and click on ***Add Expression***.

7. Enter the following message in the ***Expression*** field: `Hey! The temperature outside is {{$node["OpenWeatherMap"].json["main"]["temp"]}}°C.`.
8. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node sends a push notification to your device with the weather update.

![Using the Pushcut node to send weather updates via a push notification](/_images/integrations/builtin/app-nodes/pushcut/pushcut_node.png)

!!! note "Activate workflow for production"
    This example workflow uses the Cron node, which is a Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cron node.

