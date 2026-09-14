---
title: Kafka node documentation
description: >-
  Learn how to use the Kafka node in n8n. Follow technical documentation to
  integrate Kafka node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Kafka node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.kafka.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.kafka'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.kafka'
layout:
  description:
    visible: false
---

# Kafka node <a href="#kafka-node" id="kafka-node"></a>

Use the Kafka node to automate work in Kafka, and integrate Kafka with other applications. n8n has built-in support for a wide range of Kafka features, including sending messages. 

On this page, you'll find a list of operations the Kafka node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Kafka credentials](../credentials/kafka.md) for guidance on setting up authentication.
{% endhint %}

{% hint style="info" %}
**Schema Registry**

To encode messages with an authenticated Confluent Schema Registry (for example, Confluent Cloud), enable **Use Schema Registry** in the node and add a [Schema Registry credential](../credentials/schemaregistry.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/6vuTxJwns2nA8U7V56ij/" %}

## Operations <a href="#operations" id="operations"></a>

- Send message

## Kafka node version 2 preview

{% hint style="info" %}
**Feature availability**

Version 2 of the Kafka node is a preview. Preview features may change in future releases, so avoid relying on them in production workflows.
{% endhint %}

Version 2 of the Kafka node runs on [`@confluentinc/kafka-javascript`](https://github.com/confluentinc/confluent-kafka-javascript), Confluent's supported client built on librdkafka. It replaces kafkajs, the unmaintained library that version 1 uses. The node keeps the same fields and credential as version 1. The only visible change is the new **Compression** parameter, which compresses messages you send with **GZIP**, **Snappy**, **LZ4**, or **Zstd**. If a version 1 Kafka Trigger consumes the topic, keep **Compression** set to **GZIP** or **None**: version 1 triggers can't decode the other codecs.

Version 2 is disabled by default during the preview. Nodes added from the nodes panel stay on version 1, and there's no version picker in the editor. To opt in, import a workflow JSON where the Kafka node has `"typeVersion": 2`. n8n has verified the preview on the official n8n Docker images, on both amd64 and arm64. Version 2 includes a native compiled component, so other install methods, such as npm or custom images, aren't verified during the preview.

Before switching a workflow to version 2, download a copy of it as your rollback point. To roll back, delete the version 2 node and add a new **Kafka** node from the panel (it defaults to version 1), or restore your pre-preview export.

To consume messages with version 2, including guidance on consumer group IDs, refer to the [Kafka Trigger version 2 preview](../trigger-nodes/n8n-nodes-base.kafkatrigger.md#kafka-trigger-version-2-preview).

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Kafka node documentation integration templates](https://n8n.io/integrations/kafka) or [search all templates](https://n8n.io/workflows/)
