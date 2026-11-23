---
title: Schema Registry credentials
description: Documentation for Schema Registry credentials. Use these credentials to authenticate Schema Registry in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
layout:
  description:
    visible: false
---

# Schema Registry credentials

You can use these credentials to authenticate the following nodes when you enable **Use Schema Registry**:

- [Kafka](../app-nodes/n8n-nodes-base.kafka.md)
- [Kafka Trigger](../trigger-nodes/n8n-nodes-base.kafkatrigger.md)

The Kafka node and Kafka Trigger use a Schema Registry to encode and decode Avro messages. This credential is separate from your [Kafka credentials](kafka.md): the registry has its own endpoint and authentication, distinct from the Kafka brokers.

## Supported authentication methods

- None
- Basic Auth (username and password), such as a Confluent Cloud Schema Registry API key and secret

You can combine either method with TLS: a custom certificate authority, a client certificate for mutual TLS, or both. n8n applies the TLS fields to an `https` registry URL only.

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
3. If your registry uses `https` and presents a certificate that a public certificate authority didn't sign, enter the PEM-encoded **CA Certificate** that signed it. This replaces the certificate authorities that n8n trusts by default rather than adding to them, so include every certificate authority in the registry's chain.
4. If your registry requires mutual TLS (mTLS), enter the **Client Certificate** and the **Client Private Key**, both PEM-encoded. Enter both or neither.
5. Select **Save**. n8n tests the credential by calling the registry's `/subjects` endpoint.

The credential test uses the certificate authorities that n8n trusts by default. It also sends no client certificate. A registry that needs a private certificate authority or a client certificate therefore fails the test, while the Kafka nodes still connect to it. The **CA Certificate**, **Client Certificate**, and **Client Private Key** fields apply to an `https` registry URL only; n8n refuses them against an `http` one.

To use the credential, open your Kafka or Kafka Trigger node, enable **Use Schema Registry**, and select this credential.