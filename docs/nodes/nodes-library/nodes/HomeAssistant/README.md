---
permalink: /nodes/n8n-nodes-base.homeAssistant
description: Learn how to use the Home Assistant node in n8n
---

# Home Assistant

[Home Assistant](https://www.home-assistant.io/) is a free and open-source software for home automation that is designed to be the central control system for smart home devices with focus on local control and privacy.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/HomeAssistant/README.md).
:::

## Basic operations

<Resource node="n8n-nodes-base.homeAssistant"/>

## Example

This workflow allows you to retrieve your current Home Assistant configuration details. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Home Assistant]()

The final workflow should look like the following image.

![A workflow with the Home Assistant node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Home Assistant node

1. First select your credentials for the Home Assistant node. You can find out how to create credentials [here](../../../credentials/HomeAssistant/README.md).
2. From the **Resource** dropdown select **Config**.
3. From the **Operation** dropdown select **Get**.
4. Click on **Execute Node** to run the workflow.

![The Home Assistant node](./home_assistant_node.png)
