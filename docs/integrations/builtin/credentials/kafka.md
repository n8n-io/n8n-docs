---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Kafka credentials
description: Documentation for Kafka credentials. Use these credentials to authenticate Kafka in n8n, a workflow automation platform.
contentType: integration
---

# Kafka credentials

You can use these credentials to authenticate the following nodes:

- [Kafka](/integrations/builtin/app-nodes/n8n-nodes-base.kafka/)
- [Kafka Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.kafkatrigger/)

## Prerequisites

Create a running Kafka environment. Refer to the [Apache Kafka Quickstart](https://kafka.apache.org/quickstart){:target=_blank .external-link} for initial setup.

## Supported authentication methods

- Client ID

## Related resources

Refer to [Kafka's documentation](https://kafka.apache.org/documentation/){:target=_blank .external-link} for more information about using the service.

## Using client ID

To configure this credential, you'll need:

- A **Client ID**: Refer to [Client groups](https://kafka.apache.org/documentation/#design_quotasgroups){:target=_blank .external-link} for more information on defining client groups and [client IDs](https://kafka.apache.org/documentation/#streamsconfigs_client.id){:target=_blank .external-link}.
- **Brokers**: Provide a comma-separated list of relevant brokers.
- **SSL**: Turn this on if [SSL is enabled](https://kafka.apache.org/documentation/#security_ssl){:target=_blank .external-link} in your Kafka environment.
- **Authentication**: Turn this on if you've enabled authentication in your Kafka environment. Add details for the authentication:
    - **Username**
    - **Password**
    - Select the broker's configured **SASL Mechanism**: Refer to [SASL configuration](https://kafka.apache.org/documentation/#security_sasl_config){:target=_blank .external-link} for more information. Options include:
        - `Plain`
        - `scram-sha-256`
        - `scram-sha-512`

