---
description: How manage your data on Cloud.
contentType: howto
---

# Cloud data management

Depending on your workload specificities and on how you use n8n, your instance might risk reaching its memory capacity.

If this happens, the instance faces constant crashes that render it virtually inaccessible.

To avoid this, n8n recommends that you don't save unnecessary data and build your workflows with memory efficiency in mind.

## Data limits on each Cloud plan

1. Current plans
    * Trial - 320MiB RAM, 10 millicore CPU burstable;
    * Starter - 320MiB RAM, 10 millicore CPU burstable;
    * Pro-1 (10k executions) - 640MiB RAM, 20 millicore CPU burstable;
    * Pro-2 (50k executions) - 1280MiB RAM, 80 millicore CPU burstable;
    * Enterprise - 4096MiB RAM, 80 millicore CPU burstable.
2. Legacy plans
    * Start - 320MiB RAM, 10 millicore CPU burstable;
    * Power - 1280MiB RAM, 80 millicore CPU burstable.

## Execution data and binary data

* **Execution data** is essentially all the structured data that pertains to the workflow's execution - Node data, parameters, variables, execution context and binary data references. It is text-based.

* **Binary data** is non-textual data that cannot be represented as plain text. Essentially files and media - such as images, documents, audio files, videos, etc. It tends to be much larger than textual data.

## How to reduce memory consumption in your workflow

The way workflows are built can influence how much data they will consume when executed. Although these guidelines are not applicable to all cases, they provide a baseline of best practices to avoid overconsumption of instance memory.

* Split the data processed into smaller chunks. For example, instead of fetching 10,000 rows with each execution, process 200 rows with each execution.
* Avoid using the Code node where possible.
* Avoid manual executions when processing larger amounts of data.
* Split the workflow up into sub-workflows and ensure each sub-workflow returns a limited amount of data to its parent workflow.
* Avoid running many workflows at the same time.

Splitting the workflow might seem counter-intuitive at first as it usually requires adding at least two additional nodes: the Loop Over Items node to split up the items into smaller batches and the Execute Workflow node to start the sub-workflow.

However, as long as your sub-workflow does the heavy lifting for each batch and then returns only a small result set to the main workflow, the memory consumption is reduced. This is because the sub-workflow only holds the data for the current batch in memory, after which the memory is freed again.

It is also noteworthy that n8n itself consumes memory to run. On average, around 180MiB RAM should be expected to be in use by the software alone.

## How to manage execution data on Cloud

There are two ways through which users can regulate the execution data to be kept in the database.

How much data you want to keep is completely dependent on your designs, but, for example, if a workflow consumes a particularly large amounts of data and is past testing stage, it's a good option to prune the successful executions.

1. **Manage Dashboard**
    * From your workspace or editor, navigate to **Admin Panel**;
    * There, click on **Manage**, located in the navbar;
    * Scroll down to **Executions to Save** and  unclick which executions you would like keep from logging.

2. **Workflow Settings**
    * From the editor of the workflow you want to manage, navigate to the * * * on the top right corner;
    * Select **settings**;
    * On **Save successful production executions** change the value to **Do not save**.

## How n8n deals with Cloud data pruning and Out of Memory incident prevention

### Automatic data pruning

n8n automatically prunes execution logs after a certain time or once the max storage limit has been hit, whichever comes first. The pruning always happens from oldest to newest and the limits depend on your Could plan:

* Start and Starter plans - max 2500 executions saved and 7 days execution log retention;
* Pro and Power plans - max 25000 executions saved and 30 days execution log retention;
* Enterprise plan - max 50000 executions saved and unlimited execution log retention time.

### Manual data pruning

Heavier executions and usecases can trigger memory overconsumption despite the automatic pruning practices. In cases like this, n8n will manually prune data for the safeguard of an instances stability.

1. Alert system will warn n8n if a particular instance it at 85% disk capacity;
2. A member of the Support team will reach out to the instance owner to inform them and ask permission for data pruning.
3. If permission is granted, n8n will prune back the user's data;
    * This is done by running a backup of the instance - workflows, users, credentials and data - and restoring it without data
4. If permission is not granted, n8n will take no action until the automatic pruning limits are reached or the user requests action, for example, in the face of an Out of Memory event and instance crash.

Due to the human character of this intervention, the alert system is not fool-proof. If warnings are triggered after hours or if data consumption rates are very high, there might not be time to warn the user or prune the data before the remaining disk space is filled.