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

## Kafka node version 2

{% hint style="info" %}
**Feature availability**

Version 2 of the Kafka node is available from n8n 2.36.0. Version 1 stays the default: nodes you add from the Nodes panel use version 1, and existing workflows keep their current version.
{% endhint %}

Version 2 runs on a new, actively maintained Kafka engine, [`@confluentinc/kafka-javascript`](https://github.com/confluentinc/confluent-kafka-javascript), Confluent's supported client. It replaces kafkajs, the unmaintained library that version 1 uses. The node keeps the same operation, fields, and credential as version 1. Two things change:

- **Compression** becomes a dropdown with **GZIP**, **LZ4**, **Snappy**, **Zstd**, and **None** (the default). Version 1 offers a GZIP on/off toggle only.
- **Acks** now waits for acknowledgement from all in-sync replicas, as its description says. Version 1 waited for the topic leader only.

{% hint style="warning" %}
**Compression and version 1 triggers**

A version 1 Kafka Trigger can't decode **LZ4**, **Snappy**, or **Zstd**. While version 1 triggers consume a topic, keep **Compression** set to **GZIP** or **None** when you send to it.
{% endhint %}

### Switch a workflow to version 2

The editor has no version picker. To use version 2, import a workflow JSON where the Kafka node has `"typeVersion": 2`. To switch an existing workflow, download it, set that value on the node in the JSON, and import the file. Before you switch, download a copy of the workflow (workflow menu > **Download**): this export is your rollback point.

n8n verifies version 2 on the official n8n Docker images, on both amd64 and arm64. Version 2 includes a native compiled component, so other install methods, such as npm or custom images, aren't verified.

### Roll back to version 1

The editor has no control to change an existing node's version, so use one of these paths:

1. Restore the export you made before switching (top bar > **Import from File**), or restore the previous version from the workflow's version history. Re-select the Kafka credential if the import cleared it.
2. Delete the version 2 node and add a new **Kafka** node from the Nodes panel. A freshly added node uses the default version, which is version 1 while version 1 stays the default. Re-enter the node's settings, select the credential, and reconnect the node.

To consume messages with version 2, including how to choose the consumer group ID, refer to [Kafka Trigger version 2](../trigger-nodes/n8n-nodes-base.kafkatrigger.md#kafka-trigger-version-2).

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Kafka node documentation integration templates](https://n8n.io/integrations/kafka) or [search all templates](https://n8n.io/workflows/)
