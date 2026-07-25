---
title: Grist Trigger node documentation
description: >-
  Learn how to use the Grist Trigger node in n8n. Follow technical documentation
  to integrate Grist Trigger node into your workflows.
contentType:
  - integration
  - reference
layout:
  description:
    visible: false
---

# Grist Trigger node

[Grist](https://getgrist.com/) is a modern relational spreadsheet that combines the flexibility of a spreadsheet with the robustness of a database.

The Grist Trigger node starts a workflow when records are added to or updated in a Grist table. It registers a [Grist webhook](https://support.getgrist.com/webhooks/) on the document, so the workflow runs as soon as Grist reports the change.

On this page, you'll find a list of events the Grist Trigger node can respond to and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/grist.md).
{% endhint %}

## Events

* **Record Created**: a new record is added to the table.
* **Record Updated**: an existing record in the table changes.

## Related resources

n8n provides an app node for Grist. You can find the node docs [here](../app-nodes/n8n-nodes-base.grist.md).

Refer to [Grist's webhook documentation](https://support.getgrist.com/webhooks/) for details about how Grist delivers events.

## Node parameters

Use these parameters to configure your node.

### Document

The Grist document to watch. Choose **From List** to pick a document your account can access, or switch to **By ID** to enter the document ID directly. You can find the ID in the document's URL or in **Document Settings**.

### Table

The table within the document to watch. Choose **From List** to pick a table from the selected document, or switch to **By ID** to enter the table ID directly.

### Trigger On

The record events that start the workflow. Select one or both of **Record Created** and **Record Updated**.

## Node options

### Ready Column Name or ID

A boolean (toggle) column that marks a record as ready. When set, the workflow only triggers once a record becomes ready (the column becomes true). This lets you fill in a record over several steps and trigger only when it's complete. Choose a column from the list, or specify a column ID using an [expression](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/expressions-versus-data-nodes).

## Output

Grist delivers changed records as a JSON array, and the node emits one workflow item per record. Each item contains the record's `id` plus a field for every column in the table.

{% hint style="info" %}
**Cell value encoding**

Complex Grist column types are delivered in Grist's encoded form. For example, lists and choice lists arrive as `["L", ...]`, dates and datetimes as `["d", timestamp]` / `["D", timestamp, timezone]`, and references as `["R", tableId, rowId]`. Decode these downstream if you need the raw values.
{% endhint %}

{% hint style="info" %}
**Batching**

Grist batches deliveries, sending up to 100 records per webhook call. A change affecting more records arrives across several executions.
{% endhint %}

## Requirements

- The account behind the credential must own the document you want to watch.
- On self-managed Grist, the n8n host must be listed in the `ALLOWED_WEBHOOK_DOMAINS` environment variable, otherwise Grist refuses to register the webhook.
