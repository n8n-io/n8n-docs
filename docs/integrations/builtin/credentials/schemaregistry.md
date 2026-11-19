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
- OAuth2 Client Credentials (a bearer token minted from your identity provider), supported by Confluent Platform 7.7 and later

You can combine any of these methods with TLS: a custom certificate authority, a client certificate for mutual TLS, or both. n8n applies the TLS fields to an `https` registry URL only.

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
    - **OAuth2 Client Credentials**: use this for a Schema Registry behind an identity provider. Then add:
        1. The **Token URL** of the token endpoint that issues the bearer token.
        2. The **Client ID** and **Client Secret** of the application you registered with that provider.
        3. The **Client Authentication** method. **Authorization Header** sends the client ID and secret as HTTP Basic, which Okta and PingFederate expect by default. Choose **Request Body** if your provider requires the pair as form fields instead.
        4. The **Scope**, if your provider requires one. Separate several scopes with spaces. Leave it empty to request none.
3. If your registry uses `https` and presents a certificate that a public certificate authority didn't sign, enter the PEM-encoded **CA Certificate** that signed it. This replaces the certificate authorities that n8n trusts by default rather than adding to them, so include every certificate authority in the registry's chain.
4. If your registry requires mutual TLS (mTLS), enter the **Client Certificate** and the **Client Private Key**, both PEM-encoded. Enter both or neither.
5. Select **Save**. n8n tests the credential by calling the registry's `/subjects` endpoint.

The credential test doesn't use the **CA Certificate**, **Client Certificate**, or **Client Private Key** fields. A registry that needs any of them fails the test, even when the credential is correct. The error usually names a certificate or a TLS handshake. A registry that requires a client certificate can also close the connection. Every other error, such as a wrong URL or a wrong password, is a real failure. To confirm the credential works, run a Kafka node that uses it.

The registry URL must use `https` when you set the **CA Certificate**, the **Client Certificate**, or the **Client Private Key**. n8n refuses to connect to an `http` URL while one of them is set.

n8n gets a token when it first needs one and renews it before it expires, so a Kafka Trigger that stays active keeps working. The token URL is a separate host from the registry, so any domain restrictions on the credential have to allow both.

To use the credential, open your Kafka or Kafka Trigger node, enable **Use Schema Registry**, and select this credential.