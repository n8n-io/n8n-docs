---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Home Assistant node documentation
description: Learn how to use the Home Assistant node in n8n. Follow technical documentation to integrate Home Assistant node into your workflows.
contentType: integration
priority: medium
---

# Home Assistant node

Use the Home Assistant node to automate work in Home Assistant, and integrate Home Assistant with other applications. n8n has built-in support for a wide range of Home Assistant features, including getting, creating, and checking camera proxies, configurations, logs, services, and templates. 

On this page, you'll find a list of operations the Home Assistant node supports and links to more resources.

/// note | Credentials
Refer to [Home Assistant credentials](/integrations/builtin/credentials/homeassistant/) for guidance on setting up authentication. 
///

## Operations

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

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'home-assistant') ]]

## Related resources

Refer to [Home Assistant's documentation](https://developers.home-assistant.io/docs/api/rest/){:target=_blank .external-link} for more information about the service.
