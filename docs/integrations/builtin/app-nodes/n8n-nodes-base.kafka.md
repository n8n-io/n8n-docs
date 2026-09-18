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

- **Compression** becomes a dropdown with **GZIP**, **LZ4**, **Snappy**, **Zstd**, and **None** (the default). Version 1 offers a GZIP on/off toggle only. A version 1 Kafka Trigger can't decode **LZ4**, **Snappy**, or **Zstd**, so keep **GZIP** or **None** while version 1 triggers consume the topic.
- With **Acks** on, version 2 waits for acknowledgment from all in-sync replicas, as the option's description states. Version 1 waited for the topic leader only. With **Acks** off (the default), neither version waits.

### Switch a workflow to Kafka node version 2

The editor has no version picker. To use version 2, import a workflow JSON file where the Kafka node has `"typeVersion": 2`. To switch an existing workflow:

1. Download the workflow (Workflow menu > **Download**) and keep that file unchanged: it's your rollback point.
2. In a copy of the file, set `"typeVersion": 2` on the Kafka node.
3. Import the copy into a new, empty workflow (Workflow menu > **Import from File**). Importing adds nodes next to any already on the canvas, so don't import into the workflow that still holds the version 1 node.
4. Re-select the Kafka credential on the node if the import cleared it.

Refer to [Export and import workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/export-and-import) for details on the menu.

n8n checks with every build that version 2's native component loads in the official n8n Docker images, on both amd64 and arm64. Other install methods, such as npm or custom images, aren't checked.

### Roll back to Kafka node version 1

The editor has no control to change an existing node's version, so use one of these paths. Prefer the first if you replaced an existing workflow.

- **Restore the export:** import the file you downloaded before switching into a new, empty workflow (Workflow menu > **Import from File**), or restore the previous version from [workflow history](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/view-change-history), if your plan keeps it. Re-select the Kafka credential if the import cleared it.
- **Replace the node:** delete the version 2 node and add a new **Kafka** node from the Nodes panel. A node you add from the Nodes panel uses the default version, which is still version 1. Re-enter the node's settings, select the credential, and reconnect the node.

To consume messages with version 2, including how to choose the consumer group ID, refer to [Kafka Trigger version 2](../trigger-nodes/n8n-nodes-base.kafkatrigger.md#kafka-trigger-version-2).

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Kafka node documentation integration templates](https://n8n.io/integrations/kafka) or [search all templates](https://n8n.io/workflows/)
