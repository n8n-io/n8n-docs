---
title: Home Assistant node documentation
description: >-
  Learn how to use the Home Assistant node in n8n. Follow technical
  documentation to integrate Home Assistant node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Home Assistant node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.homeassistant.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.homeassistant
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.homeassistant
layout:
  description:
    visible: false
---

# Home Assistant node <a href="#home-assistant-node" id="home-assistant-node"></a>

Use the Home Assistant node to automate work in Home Assistant, and integrate Home Assistant with other applications. n8n has built-in support for a wide range of Home Assistant features, including getting, creating, and checking camera proxies, configurations, logs, services, and templates. 

On this page, you'll find a list of operations the Home Assistant node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Home Assistant credentials](../credentials/homeassistant.md) for guidance on setting up authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/6vuTxJwns2nA8U7V56ij/" %}

## Operations <a href="#operations" id="operations"></a>

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

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Home Assistant node documentation integration templates](https://n8n.io/integrations/home-assistant) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Home Assistant's documentation](https://developers.home-assistant.io/docs/api/rest/) for more information about the service.
