---
title: Philips Hue
description: Documentation for the Philips Hue node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Philips Hue

The Philips Hue node allows you to automate work in Philips Hue, and integrate Philips Hue with other applications. n8n has built-in support for a wide range of Philips Hue features, including deleting, retrieving, and updating lights. 

On this page, you'll find a list of operations the Philips Hue node supports and links to more resources.

!!! note "Credentials"
    Refer to [Philips Hue credentials](/integrations/builtin/credentials/philipshue/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Philips Hue integrations](https://n8n.io/integrations/philips-hue/){:target="_blank" .external-link} list.


## Basic Operations

* Light
    * Delete a light
    * Retrieve a light
    * Retrieve all lights
    * Update a light


## Example Usage

This workflow allows you to turn on a light and set its brightness using the Philips Hue node. You can also find the [workflow](https://n8n.io/workflows/666) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Philips Hue]()

The final workflow should look like the following image.

![A workflow with the Philips Hue node](/_images/integrations/builtin/app-nodes/philipshue/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Philips Hue node (update: light)

1. First of all, you'll have to enter credentials for the Philips Hue node. You can find out how to do that [here](/integrations/builtin/credentials/philipshue/).
2. Enter the light id in the ***Light ID*** field.
3. Click on ***Add Field*** and select 'Brightness' from the dropdown list.
4. Enter a value between 1 and 254 for the brightness in the ***Brightness*** field.
5. Click on ***Execute Node*** to run the node.

