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

Install an [MQTT broker](https://mqtt.org/){:target=_blank .external-link}.

MQTT provides a list of Servers/Brokers at [MQTT Software](https://mqtt.org/software/){:target=_blank .external-link}.

## Supported authentication methods

- Broker connection

## Related resources

Refer to [MQTT's documentation](https://mqtt.org/){:target=_blank .external-link} for more information about the MQTT protocol.

Refer to your broker provider's documentation for more detailed configuration and details.

## Using broker connection

To configure this credential, you'll need:

- Your MQTT broker's **Protocol**
- The **Host**
- The **Port**
- A **Username** and **Password** to authenticate with
- If you're using **SSL**, the relevant certificates and keys

To set things up:

1. Select the broker's **Protocol**, which determines the URL n8n uses. Options include:
    - **Mqtt**: Begin the URL with the standard `mqtt:` protocol.
    - **Mqtts**: Begin the URL with the secure `mqtts:` protocol.
    - **Ws**: Begin the URL with the WebSocket `ws:` protocol.
2. Enter your broker **Host**.
3. Enter the **Port** number n8n should use to connect to the broker host.
4. Enter the **Username** to log into the broker as.
5. Enter that user's **Password**.
6. If you want to receive QoS 1 and 2 messages while offline, turn off the **Clean Session** toggle.
7. Enter a **Client ID** you'd like the credential to use. If you leave this blank, n8n will generate one for you. You can use a fixed or expression-based Client ID.
    - Client IDs can be useful to identify and track connection access. n8n recommends using something with `n8n` in it for easier auditing.
8. If your MQTT broker uses SSL, turn the **SSL** toggle on. Once you turn it on:
    1. Select whether to use **Passwordless** connection with certificates, which is like the SASL mechanism EXTERNAL. If turned on:
        1. Select whether to **Reject Unauthorized Certificate**: If turned off, n8n will connect even if the certificate validation fails.
        2. Add an SSL **Client Certificate**.
        3. Add an SSL **Client Key** for the Client Certificate.
    2. One or more SSL **CA Certificates**.

Refer to your MQTT broker provider's documentation for more detailed configuration instructions.
