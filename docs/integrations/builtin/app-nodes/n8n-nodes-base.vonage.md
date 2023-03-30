---
title: Vonage
description: Documentation for the Vonage node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Vonage

The Vonage node allows you to automate work in Vonage, and integrate Vonage with other applications. n8n supports sending SMS with Vonage. 

On this page, you'll find a list of operations the Vonage node supports and links to more resources.

!!! note "Credentials"
    Refer to [Vonage credentials](/integrations/builtin/credentials/vonage/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Vonage integrations](https://n8n.io/integrations/vonage/){:target="_blank" .external-link} list.


## Basic Operations

* SMS
    * Send

## Example Usage

This workflow allows you to send daily weather updates via an SMS message using the Vonage node. You can also find the [workflow](https://n8n.io/workflows/723) on n8n.io. This example usage workflow uses the following nodes.

- [Schedule Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/)
- [OpenWeatherMap](/integrations/builtin/app-nodes/n8n-nodes-base.openweathermap/)
- [Vonage]()

The final workflow should look like the following image.

![A workflow with the Vonage node](/_images/integrations/builtin/app-nodes/vonage/workflow.png)

### 1. Cron node

The Cron node will trigger the workflow daily at 9 AM.

1. Click on ***Add Cron Time***.
2. Set hours to 9 in the ***Hour*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the Cron node is configured to trigger the workflow every day at 9 AM.

![Using the Cron node to trigger the workflow daily at 9 am](/_images/integrations/builtin/app-nodes/vonage/cron_node.png)

### 2. OpenWeatherMap node (Current Weather)

This node will return data about the current weather in Berlin. To get the weather updates for your city, you can enter the name of your city instead.

1. First of all, you'll have to enter credentials for the OpenWeatherMap node. You can find out how to do that [here](/integrations/builtin/credentials/openweathermap/).
2. Enter `berlin` in the ***City*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns data about the current weather in Berlin.

![Using the OpenWeatherMap node to get weather updates for Berlin](/_images/integrations/builtin/app-nodes/vonage/openweathermap_node.png)

### 3. Vonage node (send: sms)

This node will send an SMS with the weather update, which was sent by the previous node.

1. First of all, you'll have to enter credentials for the Vonage node. You can find out how to do that [here](/integrations/builtin/credentials/vonage/).
2. Enter a Vonage phone number or the brand name in the ***From*** field.
3. Enter the receiver's phone number in the ***To*** field.
4. Click on the gears icon next to the ***Message*** field and click on ***Add Expression***.

5. Enter the following message in the ***Expression*** field: `Hey! The temperature outside is {{$node["OpenWeatherMap"].json["main"]["temp"]}}°C.`.
6. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node sends an SMS to the phone number that we specified with the weather update, which was sent by the previous node.

![Using the Vonage node to send weather updates via SMS](/_images/integrations/builtin/app-nodes/vonage/vonage_node.png)





