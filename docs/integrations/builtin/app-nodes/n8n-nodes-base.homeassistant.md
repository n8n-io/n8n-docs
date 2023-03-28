---
title: Home Assistant
description: Documentation for the Home Assistant node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Home Assistant

The Home Assistant node allows you to automate work in Home Assistant, and integrate Home Assistant with other applications. n8n has built-in support for a wide range of Home Assistant features, including getting, creating, and checking camera proxies, configs, logs, services, and templates. 

On this page, you'll find a list of operations the Home Assistant node supports and links to more resources.

!!! note "Credentials"
    Refer to [Home Assistant credentials](/integrations/builtin/credentials/homeassistant/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Home Assistant integrations](https://n8n.io/integrations/home-assistant/){:target="_blank" .external-link} list.


## Basic operations

* Camera Proxy
    * Get the camera screenshot
* Config
    * Get the configuration
    * Check the configuration
* Event
    * Create an event
    * Get all events
* Log
    * Get a log for a specific entity
    * Get all logs
* Service
    * Call a service within a specific domain
    * Get all services
* State
    * Create a new record, or update the current one if it already exists (upsert)
    * Get a state for a specific entity
    * Get all states
* Template
    * Create a template

## Example

This workflow allows you to retrieve your current Home Assistant configuration details. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Home Assistant]()

The final workflow should look like the following image.

![A workflow with the Home Assistant node](/_images/integrations/builtin/app-nodes/homeassistant/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Home Assistant node

1. First select your credentials for the Home Assistant node. You can find out how to create credentials [here](/integrations/builtin/credentials/homeassistant/).
2. From the **Resource** dropdown select **Config**.
3. From the **Operation** dropdown select **Get**.
4. Click on **Execute Node** to run the workflow.

![The Home Assistant node](/_images/integrations/builtin/app-nodes/homeassistant/home_assistant_node.png)

