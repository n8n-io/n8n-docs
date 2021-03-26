---
permalink: /nodes/n8n-nodes-base.plivo
description: Learn how to use the Plivo node in n8n
---

# Plivo

[Plivo](https://www.plivo.com/) is a cloud communications platform as a service company that allows you to add SMS, MMS, & Voice calling functionality within your apps programmatically.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Plivo/README.md).
:::

## Basic Operations

::: details SMS
- Send an SMS message
:::

::: details MMS
- Send an MMS message (US/Canada only)
:::

::: details Call
- Make a voice call
:::

## Example Usage

This workflow allows you to send daily weather updates via an SMS message using the Plivo node. You can also find the [workflow](https://n8n.io/workflows/1005) on n8n.io. This example usage workflow uses the following nodes.
- [Cron](../../core-nodes/Cron/README.md)
- [OpenWeatherMap](../../nodes/OpenWeatherMap/README.md)
- [Plivo]()

The final workflow should look like the following image.

![A workflow with the Plivo node](./workflow.png)

### 1. Cron node

The Cron node will trigger the workflow daily at 9 AM.

1. Click on ***Add Cron Time***.
2. Set hours to 9 in the ***Hour*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the Cron node is configured to trigger the workflow every day at 9 AM.

![Using the Cron node to trigger the workflow daily at 9 am](./Cron_node.png)

### 2. OpenWeatherMap node (Current Weather)

This node will return data about the current weather in Berlin. To get the weather updates for your city, you can enter the name of your city instead.

1. First of all, you'll have to enter credentials for the OpenWeatherMap node. You can find out how to do that [here](../../../credentials/OpenWeatherMap/README.md).
2. Enter `berlin` in the ***City*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns data about the current weather in Berlin.

![Using the OpenWeatherMap node to get weather updates for Berlin](./OpenWeatherMap_node.png)

### 3. Plivo node (send: sms)

This node will send an SMS with the weather update, which was sent by the previous node.

1. First of all, you'll have to enter credentials for the Plivo node. You can find out how to do that [here](../../../credentials/Plivo/README.md).
2. Enter a Plivo phone number in the ***From*** field.
3. Enter the receiver's phone number in the ***To*** field.
4. Click on the gears icon next to the ***Message*** field and click on ***Add Expression***.
::: v-pre
5. Enter the following message in the ***Expression*** field: `Hey! The temperature outside is {{$node["OpenWeatherMap"].json["main"]["temp"]}}°C.`.
6. Click on ***Execute Node*** to run the node.
:::

In the screenshot below, you will notice that the node sends an SMS to the phone number that we specified with the weather update.

![Using the Plivo node to send weather updates via SMS](./Plivo_node.png)

::: tip 💡 Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cron node.
:::
