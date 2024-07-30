---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: MQTT credentials
description: Documentation for MQTT credentials. Use these credentials to authenticate MQTT in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# MQTT credentials

You can use these credentials to authenticate the following nodes:

- [MQTT](/integrations/builtin/app-nodes/n8n-nodes-base.mqtt/)
- [MQTT Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.mqtttrigger/)

## Prerequisites

Install an [MQTT broker](https://mqtt.org/).

MQTT provides a list of Servers/Brokers at [MQTT Software](https://mqtt.org/software/){:target=_blank .external-link}.

## Supported authentication methods

- Broker connection

## Related resources

Refer to [MQTT's documentation](https://mqtt.org/){:target=_blank .external-link} for more information about the MQTT protocol.

Refer to your broker provider's documentation for more detailed configuration and details.

## Using broker connection

To configure this credential, you'll need:

- Select the broker's **Protocol**: This helps n8n determine the URL it should use. The Protocol is the start of the URL. Options include:
    - **Mqtt**: Begin the URL with the standard `mqtt:` protocol
    - **Mqtts**: Begin the URL with the secure `mqtts:` protocol
    - **Ws**: Begin the URL with the websocket `ws:` protocol
- A **Host**: Enter your broker host.
- A **Port**: Enter the port number n8n should use to connect to the broker host.
- A **Username**: Enter the username to authenticate to the broker.
- A **Password**: Enter that user's password.
- Select whether to use **Clean Session**: Turn off to receive QoS 1 and 2 messages while offline.
- A **Client ID**: If this field is blank, n8n autogenerates a Client ID for you.
- Select whether to connect using **SSL**. If turned on, also enter:
    - Whether to use **Passwordless** connection with certificates, equivalent to SASL mechanism EXTERNAL. If turned on, also enter:
        - Select whether to **Reject Unauthorized Certificate**: If turned on, n8n will connect even if the certificate validation fails.
        - Add an SSL **Client Certificate**.
        - Add an SSL **Client Key** for the Client Certificate.
    - One or more SSL **CA Certificates**.

