---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Kafka credentials
description: Documentation for Kafka credentials. Use these credentials to authenticate Kafka in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Kafka credentials

You can use these credentials to authenticate the following nodes:

- [Kafka](/integrations/builtin/app-nodes/n8n-nodes-base.kafka/)
- [Kafka Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.kafkatrigger/)

## Supported authentication methods

- Client ID

## Related resources

Refer to [Kafka's documentation](https://kafka.apache.org/documentation/){:target=_blank .external-link} for more information about using the service.

If you're new to Kafka, refer to the [Apache Kafka Quickstart](https://kafka.apache.org/quickstart){:target=_blank .external-link} for initial setup.

Refer to [Encryption and Authentication using SSL](https://kafka.apache.org/documentation/#security_ssl){:target=_blank .external-link} for working with SSL in Kafka.

## Using client ID

To configure this credential, you'll need a running Kafka environment and:

- A **Client ID**
- A list of relevant **Brokers**
- Username/password authentication details if your Kafka environment uses authentication

To set it up:

1. Enter the `CLIENT-ID` of the client or consumer group in the **Client ID** field in your credential.
2. Enter a comma-separated list of relevant **Brokers** for the credential to use in the format `<broker-service-name>:<port>`. Use the name you gave the broker when you defined it in the `services` list. For example, `kafka-1:9092,kafka-2:9092` would add the brokers `kafka-1` and `kafka-2` on port `9092`.
3. If your Kafka environment doesn't use SSL, turn off the **SSL** toggle.
4. If you've enabled authentication using SASL in your Kafka environment, turn on the **Authentication** toggle. Then add:
    1. The **Username**
    2. The **Password**
    3. Select the broker's configured **SASL Mechanism**. Refer to [SASL configuration](https://kafka.apache.org/documentation/#security_sasl_config){:target=_blank .external-link} for more information. Options include:
        - `Plain`
        - `scram-sha-256`
        - `scram-sha-512`

