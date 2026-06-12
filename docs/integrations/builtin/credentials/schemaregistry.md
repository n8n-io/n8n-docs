---
title: Schema Registry credentials
description: Documentation for Schema Registry credentials. Use these credentials to authenticate Schema Registry in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Schema Registry credentials

You can use these credentials to authenticate the following nodes when you enable **Use Schema Registry**:

- [Kafka](/integrations/builtin/app-nodes/n8n-nodes-base.kafka.md)
- [Kafka Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.kafkatrigger.md)

The Kafka node and Kafka Trigger use a Schema Registry to encode and decode Avro messages. This credential is separate from your [Kafka credentials](/integrations/builtin/credentials/kafka.md): the registry has its own endpoint and authentication, distinct from the Kafka brokers.

## Supported authentication methods

- None
- Basic Auth (username and password), such as a Confluent Cloud Schema Registry API key and secret

## Related resources

Refer to the [Confluent Schema Registry documentation](https://docs.confluent.io/platform/current/schema-registry/index.html) for more information about using the service.

## Setting up the credential

To configure this credential, you'll need the URL of your Schema Registry and, if it requires authentication, the details to access it.

1. In the **URL** field, enter the base URL of your Schema Registry, for example `https://psrc-xxxxx.region.aws.confluent.cloud`.
2. Select the **Authentication** method:
    - **None**: use this for a Schema Registry that doesn't require authentication.
    - **Basic Auth**: use this for a Schema Registry that requires HTTP Basic Auth, such as Confluent Cloud. Then add:
        1. The **Username**. For Confluent Cloud, this is the Schema Registry API key.
        2. The **Password**. For Confluent Cloud, this is the Schema Registry API secret.
3. Select **Save**. n8n tests the credential by calling the registry's `/subjects` endpoint.

To use the credential, open your Kafka or Kafka Trigger node, enable **Use Schema Registry**, and select this credential.
