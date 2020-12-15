---
permalink: /nodes/n8n-nodes-base.nasa
description: Learn how to use the NASA node in n8n
---

# NASA

[NASA](https://nasa.gov/) is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research. The NASA API makes NASA data, including imagery, accessible to application developers.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/NASA/README.md).
:::

## Basic Operations

::: details Astronomy Picture of the Day
- Get the Astronomy Picture of the Day
:::

::: details Asteroid Neo-Feed
- Retrieve a list of asteroids based on their closest approach date to Earth
:::

::: details Asteroid Neo-Lookup
- Look up an asteroid based on its NASA SPK-ID
:::

::: details Asteroid Neo-Browse
- Browse the overall asteroid dataset
:::

::: details DONKI Coronal Mass Ejection
- Retrieve DONKI coronal mass ejection data
:::

::: details DONKI Interplanetary Shock
- Retrieve DONKI interplanetary shock data
:::

::: details DONKI Solar Flare
- Retrieve DONKI solar flare data
:::

::: details DONKI Solar Energetic Particle
- Retrieve DONKI solar energetic particle data
:::

::: details DONKI Magnetopause Crossing
- Retrieve data on DONKI magnetopause crossings
:::

::: details DONKI Radiation Belt Enhancement
- Retrieve DONKI radiation belt enhancement data
:::

::: details DONKI High Speed Stream
- Retrieve DONKI high speed stream data
:::

::: details DONKI WSA+EnlilSimulation
- Retrieve DONKI WSA+EnlilSimulation data
:::

::: details DONKI Notifications
- Retrieve DONKI notifications data
:::

::: details Earth Imagery
- Retrieve Earth imagery
:::

::: details Earth Assets
- Retrieve Earth assets
:::

## Example Usage

This workflow allows you to send the Astronomy Picture of the day daily to a Telegram channel. You can also find the [workflow](https://n8n.io/workflows/828) on n8n.io. This example usage workflow uses the following nodes.
- [Cron](../../core-nodes/Cron/README.md)
- [NASA]()
- [Telegram](../../nodes/Telegram/README.md)

The final workflow should look like the following image.

![A workflow with the NASA node](./workflow.png)

### 1. Cron node

The Cron node will trigger the workflow daily at 8 PM.

1. Click on ***Add Cron Time***.
2. Set hours to 20 in the ***Hour*** field.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the Cron node is configured to trigger the workflow every day at 8 PM.

![Using the Cron node to trigger the workflow daily at 8 pm](./Cron_node.png)

### 2. NASA node (get:astronomyPictureOfTheDay)

This node will return the Astronomy Picture of the Day.

1. First of all, you'll have to enter credentials for the NASA node. You can find out how to do that [here](../../../credentials/NASA/README.md).
2. Toggle ***Download Image*** to `false`. By setting this option to false the node will not return binary data.
2. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns data for the Astronomy Picture of the Day. This data will be used by the next node in the workflow.

![Using the NASA node to get the Astronomy Picture of the Day](./NASA_node.png)

### 3. Telegram node (sendPhoto: message)

This node will send the picture that we receive from the previous node to a channel.

1. First of all, you'll have to enter credentials for the Telegram node. You can find out how to do that [here](../../../credentials/Telegram/README.md).
2. Select 'Send Photo' from the ***Operation*** dropdown list.
3. Enter a chat ID in the ***Chat ID*** field.
4. Click on the gears icon next to the ***Photo*** field and click on ***Add Expression***.
::: v-pre
5. Select the following in the ***Variable Selector*** section: Nodes > NASA > Output Data > JSON > url. You can also add the following expression: `{{$node["NASA"].json["url"]}}`.
6. Click on ***Add Field*** and select 'Caption' from the dropdown list.
7. Click on the gears icon next to the ***Caption*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Nodes > NASA > Output Data > JSON > title. You can also add the following expression: `{{$node["NASA"].json["title"]}}`.
9. Click on ***Execute Node*** to run the node.
:::

In the screenshot below, you will notice that the node sends the image with a caption to the channel that we specifiy.

![Using the Telegram node to send the Astronomy Picture of the Day](./Telegram_node.png)
