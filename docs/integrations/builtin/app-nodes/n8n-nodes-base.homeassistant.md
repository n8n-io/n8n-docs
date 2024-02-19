---
title: Home Assistant
description: Documentation for the Home Assistant node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Home Assistant

Use the Home Assistant node to automate work in Home Assistant, and integrate Home Assistant with other applications. n8n has built-in support for a wide range of Home Assistant features, including getting, creating, and checking camera proxies, configurations, logs, services, and templates. 

On this page, you'll find a list of operations the Home Assistant node supports and links to more resources.

/// note | Credentials
Refer to [Home Assistant credentials](/integrations/builtin/credentials/homeassistant/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Home Assistant integrations](https://n8n.io/integrations/home-assistant/){:target="_blank" .external-link} list.
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

## Related resources


View [example workflows and related content](https://n8n.io/integrations/home-assistant/){:target=_blank .external-link} on n8n's website.


Refer to [Home Assistant's documentation](https://developers.home-assistant.io/docs/api/rest/){:target=_blank .external-link} for more information about the service.
