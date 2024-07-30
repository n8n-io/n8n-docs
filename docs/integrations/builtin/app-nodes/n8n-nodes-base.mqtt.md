---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: MQTT
description: Documentation for the MQTT node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
priority: medium
---

# MQTT

Use the MQTT node to automate work in MQTT, and integrate MQTT with other applications. n8n supports transporting messages with MQTT.

On this page, you'll find a list of operations the MQTT node supports and links to more resources.

/// note | Credentials
Refer to [MQTT credentials](/integrations/builtin/credentials/mqtt/) for guidance on setting up authentication. 
///

## Operations

Use the MQTT node to send a message. You can set the message topic, and choose whether to send the node input data as part of the message.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'mqtt') ]]

## Related resources

n8n provides a trigger node for MQTT. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.mqtttrigger/).

Refer to [MQTT's documentation](https://mqtt.org/getting-started/){:target=_blank .external-link} for more information about the service.
