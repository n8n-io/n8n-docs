---
title: MQTT node documentation
description: Learn how to use the MQTT node in n8n. Follow technical documentation to integrate MQTT node into your workflows.
contentType: [integration, reference]
priority: medium
---

# MQTT node

Use the MQTT node to automate work in MQTT, and integrate MQTT with other applications. n8n supports transporting messages with MQTT.

On this page, you'll find a list of operations the MQTT node supports and links to more resources.

/// note | Credentials
Refer to [MQTT credentials](/integrations/builtin/credentials/mqtt.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

Use the MQTT node to send a message. You can set the message topic, and choose whether to send the node input data as part of the message.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'mqtt') ]]

## Related resources

n8n provides a trigger node for MQTT. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.mqtttrigger.md).

Refer to [MQTT's documentation](https://mqtt.org/getting-started/) for more information about the service.
