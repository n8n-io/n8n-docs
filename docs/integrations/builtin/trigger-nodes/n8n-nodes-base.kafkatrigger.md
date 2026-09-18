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

Refer to the [Kafka credentials documentation](../credentials/kafka.md) for authentication information for this node.
{% endhint %}

{% hint style="info" %}
**Schema Registry**

To decode messages with an authenticated Confluent Schema Registry (for example, Confluent Cloud), enable **Use Schema Registry** in the node and add a [Schema Registry credential](../credentials/schemaregistry.md).
{% endhint %}

{% hint style="warning" %}
**Message compression on version 1**

Version 1 of the Kafka Trigger consumes uncompressed messages and messages compressed with **GZIP**. It can't decode messages compressed with **LZ4**, **Snappy**, or **Zstd** (a common default for Confluent and JVM producers): consuming such a topic fails with an unsupported-compression-format error. To consume the topic, configure the producer to use gzip or no compression, or switch to [version 2](#kafka-trigger-version-2), which decodes all four formats.
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Kafka Trigger integrations](https://n8n.io/integrations/kafka-trigger/) page.
{% endhint %}

## Kafka Trigger version 2

{% hint style="info" %}
**Feature availability**

Version 2 of the Kafka Trigger is available from n8n 2.36.0. Version 1.3 stays the default: triggers you add from the Nodes panel use version 1.3, and existing workflows keep their current version.
{% endhint %}

Version 2 runs on a new, actively maintained Kafka engine, [`@confluentinc/kafka-javascript`](https://github.com/confluentinc/confluent-kafka-javascript), Confluent's supported client. It replaces kafkajs, the unmaintained library that version 1 uses. The trigger keeps the same fields and credential as version 1, with these differences:

- It decodes messages compressed with **GZIP**, **LZ4**, **Snappy**, or **Zstd**. Version 1 handles uncompressed and GZIP messages only.
- It checks the topic and the consumer group when you publish the workflow. If the topic doesn't exist or the consumer can't join its group, publishing fails with a clear error instead of the trigger consuming nothing.
- Test runs join a throwaway consumer group named `<group-id>-n8n-manual-<uuid>` and never replay the topic, so **Listen for test event** no longer takes messages from the published workflow. On clusters with ACLs, grant a prefixed group ACL for `<group-id>-n8n-manual-`, or test with the workflow published.
- If the Schema Registry can't decode a message, version 2 leaves it unread and retries after **Retry Delay on Error**, so you lose no messages while the registry is unavailable. Version 1 passes the raw message to the workflow and commits the offset.

### Options that changed in version 2

Version 2 doesn't offer **Auto Commit Threshold**, **Each Batch Auto Resolve**, or **Allow Topic Creation**. The new engine has no equivalent for **Auto Commit Threshold**, **Each Batch Auto Resolve** would mark messages as read that no execution processed, and **Allow Topic Creation** had no effect in version 1. Every other option stays the same, with two differences in behavior:

- **Rebalance Timeout** is now how long one batch may take to process before the group drops the consumer. n8n only uses it when the workflow has no execution timeout of its own, because that timeout takes precedence.
- **Heartbeat Interval** is lowered automatically when it's more than a third of **Session Timeout**, so the broker doesn't drop the consumer.

### Switch a workflow to version 2

The editor has no version picker. To use version 2, import a workflow JSON where the Kafka Trigger node has `"typeVersion": 2`. To switch an existing workflow, download it, set that value on the node in the JSON, and import the file. Before you switch, download a copy of the workflow (workflow menu > **Download**): this export is your rollback point.

n8n verifies version 2 on the official n8n Docker images, on both amd64 and arm64. Version 2 includes a native compiled component, so other install methods, such as npm or custom images, aren't verified.

### Choose the consumer group ID

Version 1 and version 2 use different client libraries that can't form a consumer group together, so set the consumer group ID to match your goal:

- **To run both triggers at the same time**, to compare them or to trial version 2 while version 1 keeps working, give the version 2 trigger a consumer group ID of its own. The two are then fully independent: each receives every message on the topic, each keeps its own read position, and starting the new trigger doesn't disturb the running one.
- **To migrate from version 1 to version 2**, keep the same group ID but run only one trigger at a time: unpublish the version 1 workflow first, then publish the version 2 workflow. It picks up where the old one stopped, with nothing reprocessed and nothing skipped, including messages that arrived while neither was running. Don't give it a new group ID for this: a fresh group has no saved position and either skips the backlog or replays the whole topic.
- **Don't publish both triggers on the same group ID.** They can't form a group at all, and the running trigger keeps working. A version 2 trigger published second fails to publish with a visible error. A version 1 trigger published second stays published but receives nothing. Set the group ID before you publish.

### Roll back to version 1

The editor has no control to change an existing node's version, so use one of these paths. Rollback is clean: when you unpublish a version 2 workflow, its consumer leaves the group, and committed read positions stay on the broker, attached to the group ID.

1. Unpublish the version 2 workflow and restore the export you made before switching (top bar > **Import from File**), or restore the previous version from the workflow's version history. Re-select the Kafka credential if the import cleared it, then publish the workflow.
2. Unpublish the workflow, note the trigger's settings, delete the version 2 node, and add a new **Kafka Trigger** node from the Nodes panel. A freshly added trigger uses the default version, which is version 1.3 while version 1.3 stays the default. Re-enter the settings, select the credential, reconnect the node, then publish the workflow.

What the consumer group does afterward depends on how you ran version 2. If you ran both triggers side by side on separate group IDs, your original trigger was never affected. If you migrated on a shared group ID, the rolled-back trigger rejoins the group and resumes at the committed position, including messages that arrived during the switch. If you switched over on a new group ID, expect the rolled-back trigger to deliver the messages version 2 already processed a second time, because the old group's read position stood still.
