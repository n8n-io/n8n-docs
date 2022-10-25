# Pushbullet

[Pushbullet](https://www.pushbullet.com/) connects your devices and allows you to see your phone's notifications on your computer, transfer links, and files between devices.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/pushbullet/).


## Basic Operations

* Push
    * Create a push
    * Delete a push
    * Get all pushes
    * Update a push

## Example Usage

This workflow allows you to send daily weather updates via a push notification using the Pushbullet node. You can also find the [workflow](https://n8n.io/workflows/740) on n8n.io. This example usage workflow uses the following nodes.
- [Cron](/integrations/builtin/core-nodes/n8n-nodes-base.cron/)
- [OpenWeatherMap](/integrations/builtin/app-nodes/n8n-nodes-base.openWeatherMap/)
- [Pushbullet]()

The final workflow should look like the following image.

![A workflow with the Pushbullet node](/_images/integrations/builtin/app-nodes/pushbullet/workflow.png)

### 1. Cron node

The Cron node will trigger the workflow daily at 9 AM.

1. Click on ***Add Cron Time***.
2. Set hours to 9 in the ***Hour*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the Cron node is configured to trigger the workflow every day at 9 AM.

![Using the Cron node to trigger the workflow daily at 9 am](/_images/integrations/builtin/app-nodes/pushbullet/cron_node.png)

### 2. OpenWeatherMap node (Current Weather)

This node will return data about the current weather in Berlin. To get the weather updates for your city, you can enter the name of your city instead.

1. First of all, you'll have to enter credentials for the OpenWeatherMap node. You can find out how to do that [here](/integrations/builtin/credentials/openWeatherMap/).
2. Enter `berlin` in the ***City*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns data about the current weather in Berlin.

![Using the OpenWeatherMap node to get weather updates for Berlin](/_images/integrations/builtin/app-nodes/pushbullet/openweathermap_node.png)

### 3. Pushbullet node (create: push)

This node will send a push notification with the weather update to the default device. If you want to send it to a specific device, select 'Device ID' from the ***Target*** dropdown list and enter the device ID in the ***Value*** field.

1. First of all, you'll have to enter credentials for the Pushbullet node. You can find out how to do that [here](/integrations/builtin/credentials/pushbullet/).
2. Enter `Today's Weather Update` in the ***Title*** field.
3. Click on the gears icon next to the ***Body*** field and click on ***Add Expression***.

4. Enter the following message in the ***Expression*** field: `Hey! The temperature outside is {{$node["OpenWeatherMap"].json["main"]["temp"]}}°C.`.
5. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node sends a push notification to the default device with the weather update.

![Using the Pushbullet node to send weather updates via a push notification](/_images/integrations/builtin/app-nodes/pushbullet/pushbullet_node.png)
