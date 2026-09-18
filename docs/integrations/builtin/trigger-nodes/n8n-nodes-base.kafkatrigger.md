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

Refer to [Kafka credentials](../credentials/kafka.md) for guidance on setting up authentication.
{% endhint %}

{% hint style="info" %}
**Schema Registry**

To decode messages with an authenticated Confluent Schema Registry (for example, Confluent Cloud), enable **Use Schema Registry** in the node and add a [Schema Registry credential](../credentials/schemaregistry.md).
{% endhint %}

{% hint style="warning" %}
**Message compression on version 1**

Version 1 of the Kafka Trigger consumes uncompressed messages and messages compressed with **GZIP**. It can't decode messages compressed with **LZ4**, **Snappy**, or **Zstd** (a common default for Confluent and JVM producers): consuming such a topic fails with an unsupported-compression-format error. To consume the topic, configure the producer to use GZIP or no compression, or switch to [Kafka Trigger version 2](#kafka-trigger-version-2), which decodes all four formats.
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
- It checks the topic and the consumer group when you publish the workflow. If the topic doesn't exist or the broker refuses the consumer group, publishing fails with an error instead of the trigger consuming nothing.
- Manual executions (when you select **Listen for test event**) join a temporary consumer group named `<group-id>-n8n-manual-<uuid>` and never replay the topic, even with **Read Messages From Beginning** on. They no longer take messages from the published workflow. On clusters with access control lists (ACLs), grant a prefixed group ACL for `<group-id>-n8n-manual-`, or skip the test: publish the workflow and check its executions instead.
- If the Schema Registry can't decode a message, version 2 leaves it unread and retries after **Retry Delay on Error**, so you lose no messages while the registry is unavailable. Version 1 passes the raw message to the workflow and commits the offset.

### Options removed or changed in Kafka Trigger version 2

Version 2 doesn't offer three version 1 options:

- **Auto Commit Threshold**: the new engine has no matching setting.
- **Each Batch Auto Resolve**: it would mark messages as read that no execution processed.
- **Allow Topic Creation**: it had no effect in version 1.

Every other option keeps its name and default. Three behave differently:

- **Rebalance Timeout** now sets how long one batch may take to process before the group drops the consumer. n8n uses it only when the workflow has no execution timeout of its own; the workflow timeout takes precedence.
- n8n lowers **Heartbeat Interval** automatically when it's more than a third of **Session Timeout**, so the broker doesn't drop the consumer.
- **Retry Delay on Error** also paces the retry of a message the Schema Registry can't decode. Version 1 used it only after a failed offset resolution.

### Switch a workflow to Kafka Trigger version 2

The editor has no version picker. To use version 2, import a workflow JSON file where the Kafka Trigger node has `"typeVersion": 2`. To switch an existing workflow:

1. Download the workflow (Workflow menu > **Download**) and keep that file unchanged: it's your rollback point.
2. In a copy of the file, set `"typeVersion": 2` on the Kafka Trigger node, and set the consumer group ID as described in [Choose the consumer group ID](#choose-the-consumer-group-id).
3. Import the copy into a new, empty workflow (Workflow menu > **Import from File**). Importing adds nodes next to any already on the canvas, so don't import into the workflow that still holds the version 1 trigger.
4. Re-select the Kafka credential on the node if the import cleared it, then publish the workflow.

Refer to [Export and import workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/export-and-import) for details on the menu.

n8n checks with every build that version 2's native component loads in the official n8n Docker images, on both amd64 and arm64. Other install methods, such as npm or custom images, aren't checked.

### Choose the consumer group ID

Version 1 and version 2 use different client libraries that can't form a consumer group together, so set the consumer group ID to match your goal:

- **To run both triggers at the same time**, give the version 2 trigger a consumer group ID of its own. Use this to compare them, or to try version 2 while version 1 keeps working. The two are then fully independent: each receives every message on the topic, each keeps its own read position, and starting the new trigger doesn't disturb the running one.
- **To migrate from version 1 to version 2**, keep the same group ID but run only one trigger at a time: unpublish the version 1 workflow first, then publish the version 2 workflow. It resumes at the position where the old one stopped, so it skips nothing, including messages that arrived while neither trigger was running. Only messages whose executions were still running when you unpublished version 1 can run again. Don't give it a new group ID for this: a fresh group has no saved position, so it either skips the backlog or replays the whole topic, depending on **Read Messages From Beginning**.
- **Don't publish both triggers on the same group ID.** They can't form a group at all. Your existing trigger keeps working either way: the cost of getting this wrong is a new trigger that never fires, not a broken production workflow. A version 2 trigger published second fails to publish with a visible error. The broker refuses a version 1 trigger published second, and it receives nothing until you unpublish one of the two. Set the group ID before you publish, rather than relying on that error.

### Roll back to Kafka Trigger version 1.3

Rolling back loses no read position: when you unpublish a version 2 workflow, its consumer leaves the group and nothing keeps running in the background. Committed read positions stay on the broker, attached to the group ID, for as long as the broker keeps offsets for an empty group (seven days by default).

The editor has no control to change an existing node's version, so use one of these paths. Prefer the first if you replaced an existing workflow.

- **Restore the export:** unpublish the version 2 workflow, then import the file you downloaded before switching into a new, empty workflow (Workflow menu > **Import from File**), or restore the previous version from [workflow history](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/view-change-history), if your plan keeps it. Re-select the Kafka credential if the import cleared it, then publish the workflow.
- **Replace the node:** unpublish the workflow, note the trigger's settings, delete the version 2 node, and add a new **Kafka Trigger** node from the Nodes panel. A trigger you add from the Nodes panel uses the default version, which is still version 1.3. Re-enter the settings, select the credential, reconnect the node, then publish the workflow.

What the consumer group does afterward depends on how you ran version 2:

- If you ran both triggers side by side on separate group IDs, you don't need either path: unpublish or delete the version 2 workflow. Your original trigger was never affected.
- If you migrated on a shared group ID, the rolled-back trigger rejoins the group and resumes at the committed position, including messages that arrived during the switch.
- If you switched over on a new group ID, the rolled-back trigger delivers again the messages that version 2 already processed. The old group's read position didn't move while version 2 ran.
