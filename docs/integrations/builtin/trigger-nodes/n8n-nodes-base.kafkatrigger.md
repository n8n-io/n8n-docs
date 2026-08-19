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

To decode messages with an authenticated Confluent Schema Registry (for example, Confluent Cloud), enable **Use Schema Registry** in the node and add a [Schema Registry credential](../credentials/schemaregistry.md).
{% endhint %}

{% hint style="warning" %}
**Message compression**

The Kafka Trigger can consume uncompressed messages and messages compressed with **GZIP**. It can't decode messages compressed with **LZ4**, **Snappy**, or **Zstd** (a common default for Confluent and JVM producers): consuming such a topic fails with an unsupported-compression-format error. To consume the topic, configure the producer to use gzip or no compression.
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Kafka Trigger integrations](https://n8n.io/integrations/kafka-trigger/) page.
{% endhint %}

## Kafka Trigger version 2 preview

{% hint style="info" %}
**Feature availability**

Version 2 of the Kafka Trigger is a preview. Preview features may change in future releases, so avoid relying on them in production workflows.
{% endhint %}

Version 2 of the Kafka Trigger runs on [`@confluentinc/kafka-javascript`](https://github.com/confluentinc/confluent-kafka-javascript), Confluent's supported client built on librdkafka. It replaces kafkajs, the unmaintained library that version 1 uses. The trigger keeps the same fields and credential as version 1, and adds two behaviors:

- It decodes messages compressed with any codec (**GZIP**, **LZ4**, **Snappy**, and **Zstd**), while version 1 only handles uncompressed and GZIP messages.
- It checks the connection when you publish the workflow. If the topic is missing or the consumer can't join its group, publishing fails with a clear error instead of the trigger consuming nothing.

Version 2 is disabled by default during the preview. Triggers added from the nodes panel stay on version 1.3, and there's no version picker in the editor. To opt in, import a workflow JSON where the Kafka Trigger node has `"typeVersion": 2`. n8n has verified the preview on the official n8n Docker images, on both amd64 and arm64. Version 2 includes a native compiled component, so other install methods, such as npm or custom images, aren't verified during the preview.

The version 1 and version 2 client libraries can't form a consumer group together, so choose the consumer group ID to match your goal:

- **To run version 1 and version 2 side by side**, give the version 2 trigger its own consumer group ID. The two triggers are then independent, and each receives every message on the topic.
- **To migrate to version 2**, keep the same consumer group ID but run only one trigger at a time. Unpublish the version 1 workflow first, then publish the version 2 workflow. It resumes from the committed position, so it doesn't reprocess or skip anything.
- **Don't publish both triggers on the same consumer group ID.** The version 2 trigger fails to publish with a visible error, but set the group ID up front rather than relying on that error.

Before switching a workflow to version 2, download a copy of it as your rollback point. To roll back, delete the version 2 node and add a new **Kafka Trigger** node from the panel (it defaults to version 1.3), or restore your pre-preview export.

