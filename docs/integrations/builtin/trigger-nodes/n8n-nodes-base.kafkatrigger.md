---
title: Kafka Trigger node documentation
description: >-
  Learn how to use the Kafka Trigger node in n8n. Follow technical documentation
  to integrate Kafka Trigger node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Kafka Trigger node documentation
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.kafkatrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.kafkatrigger
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.kafkatrigger
layout:
  description:
    visible: false
---

# Kafka Trigger node <a href="#kafka-trigger-node" id="kafka-trigger-node"></a>

[Kafka](https://kafka.apache.org/) is an open-source distributed event streaming platform that one can use for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/kafka.md).
{% endhint %}

{% hint style="info" %}
**Schema Registry**

To decode messages with an authenticated Confluent Schema Registry (for example, Confluent Cloud), enable **Use Schema Registry** in the node and add a [Schema Registry credential](/integrations/builtin/credentials/schemaregistry.md).
{% endhint %}

{% hint style="warning" %}
**Message compression**

The Kafka Trigger can consume uncompressed messages and messages compressed with **GZIP**. It can't decode messages compressed with **LZ4**, **Snappy**, or **ZSTD** (a common default for Confluent and JVM producers): consuming such a topic fails with an unsupported-compression-format error. To consume the topic, configure the producer to use gzip or no compression.
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Kafka Trigger integrations](https://n8n.io/integrations/kafka-trigger/) page.
{% endhint %}

