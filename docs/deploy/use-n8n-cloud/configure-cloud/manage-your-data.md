---
contentType: howto
nodeTitle: Manage your data
originalFilePath: manage-cloud/cloud-data-management.md
originalUrl: https://docs.n8n.io/manage-cloud/cloud-data-management
url: https://docs.n8n.io/deploy/use-n8n-cloud/configure-cloud/manage-your-data
description: How to manage your data on Cloud.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Manage your data

There are two concerns when managing data on Cloud:

* Memory usage: complex workflows processing large amounts of data can exceed n8n's memory limits. If this happens, the instance can crash and become inaccessible.
* Data storage: your plan includes a storage allowance for saved executions. When your instance exceeds it, n8n prunes the oldest execution data.

To avoid these issues, n8n recommends that you build your workflows with memory efficiency in mind, and don't save unnecessary data.

## Memory limits on each Cloud plan <a href="#memory-limits-on-each-cloud-plan" id="memory-limits-on-each-cloud-plan"></a>

Current plans:

* Trial: 640MiB RAM, 10 millicore CPU burstable
* Starter: 640MiB RAM, 10 millicore CPU burstable
* Pro-1 (10k executions): 640MiB RAM, 20 millicore CPU burstable
* Pro-2 (50k executions): 1280MiB RAM, 80 millicore CPU burstable
* Enterprise: 4096MiB RAM, 80 millicore CPU burstable

Legacy plans:

* Start: 320MiB RAM, 10 millicore CPU burstable
* Power: 1280MiB RAM, 80 millicore CPU burstable

## How to reduce memory consumption in your workflow <a href="#how-to-reduce-memory-consumption-in-your-workflow" id="how-to-reduce-memory-consumption-in-your-workflow"></a>

The way you build workflows affects how much data they consume when executed. Although these guidelines aren't applicable to all cases, they provide a baseline of best practices to avoid exceeding instance memory.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/EzVIOV8i2lmQ5HW3xFoo/" %}

Note that n8n itself consumes memory to run. On average, the software alone uses around 320MiB RAM.

Interactions with the UI also consume memory. Playing around with the workflow UI while it performs heavy executions could also push the memory capacity over the limit.

## Data storage limits on each Cloud plan <a href="#cloud-data-pruning-and-out-of-memory-incident-prevention" id="cloud-data-pruning-and-out-of-memory-incident-prevention"></a>

Each Cloud plan includes a storage allowance for saved executions. The allowance covers execution data and binary data combined:

* Starter: 2.5 GB
* Pro: 25 GB
* Enterprise: 50 GB

Each plan also limits how many executions n8n saves, and for how long:

* Starter: 2,500 executions and 7 days of retention
* Pro: 25,000 executions and 30 days of retention
* Enterprise: 50,000 executions and unlimited retention

### Automatic data pruning <a href="#automatic-data-pruning" id="automatic-data-pruning"></a>

The limits never block your workflows from running or from saving new data. When your instance exceeds one of its limits, n8n prunes the oldest data until the instance is back under the limit. Whichever limit your instance reaches first applies.

Pruning removes binary data first and execution data last, so you keep the longest possible execution history within your allowance.

When n8n prunes an execution's data, the execution stays in your executions list with its status and timing, but its data is no longer available.

## Backups and execution data <a href="#backups-and-execution-data" id="backups-and-execution-data"></a>

Backups of your Cloud instance cover workflows, credentials, and settings. They don't include execution history or binary data. If n8n restores your instance from a backup as part of disaster recovery, or migrates it to an Enterprise plan, your execution history is not retained.

## How to manage execution data on Cloud <a href="#how-to-manage-execution-data-on-cloud" id="how-to-manage-execution-data-on-cloud"></a>

Execution data includes node data, parameters, variables, execution context, and binary data references. It's text-based.

Binary data is non-textual data that n8n can't represent as plain text. This is files and media such as images, documents, audio files, and videos. It's much larger than textual data.

There is nothing to configure for storage limits or pruning on Cloud. If you frequently experience executions being pruned, you can reduce how much data your instance stores, save fewer executions and avoid processing unnecessarily large payloads. Refer to [How to reduce memory consumption in your workflow](#how-to-reduce-memory-consumption-in-your-workflow) for guidance on keeping payloads small.

If a workflow processes large amounts of data and is past the testing stage, stop saving its successful executions. There are two ways you can control which executions n8n saves:

In the admin dashboard, applies to all workflows:

1. From your workspace or editor, navigate to **Admin Panel**.
2. Select **Manage**.
3. In **Executions to Save** deselect the executions you don't want to log.

In your workflow settings, applies to each individual workflow:

1. Select the **Options** <img src="../../.gitbook/assets/three-dot-options-menu (1).png" alt="Options menu" data-size="line"> menu.
2. Select **Settings**. n8n opens the **Workflow settings** modal.
3. Change **Save successful production executions** to **Do not save**.
