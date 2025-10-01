---
title: Airtable Trigger node documentation
description: Learn how to use the Airtable Trigger node in n8n. Follow technical documentation to integrate Airtable Trigger node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Airtable Trigger node

[Airtable](https://airtable.com/) is a spreadsheet-database hybrid, with the features of a database but applied to a spreadsheet. The fields in an Airtable table are similar to cells in a spreadsheet, but have types such as 'checkbox', 'phone number', and 'drop-down list', and can reference file attachments like images.

On this page, you'll find a list of events the Airtable Trigger node can respond to and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/airtable.md).
///

## Events

* **New Airtable event**

## Related resources

n8n provides an app node for Airtable. You can find the node docs [here](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/index.md).

View [example workflows and related content](https://n8n.io/integrations/airtable-trigger/) on n8n's website.

Refer to [Airtable's documentation](https://airtable.com/developers/web/api/introduction) for details about their API.

## Node parameters

Use these parameters to configure your node.

### Poll Times

n8n's Airtable node uses polling for check for updates on configured Airtable resources. The **Poll Times** parameter configures the querying frequency:

* Every Minute
* Every Hour
* Every Day
* Every Week
* Every Month
* Every X: Check for updates every given number of minutes or hours.
* Custom: Customize the polling interval by providing a [cron expression](https://en.wikipedia.org/wiki/Cron).

Use the **Add Poll Time** button to add more polling intervals.

### Base

The [Airtable base](https://support.airtable.com/docs/airtable-bases-overview) you want to check for updates on. You can provide your base's URL or [base ID](https://support.airtable.com/docs/finding-airtable-ids#finding-base-table-and-view-ids-from-urls).

### Table

The [Airtable table](https://support.airtable.com/docs/tables-overview) within the Airtable base that you want to check for updates on. You can provide the table's URL or [table ID](https://support.airtable.com/docs/finding-airtable-ids#finding-base-table-and-view-ids-from-urls).

### Trigger Field

A created or last modified field in your table. The Airtable Trigger node uses this to determine what updates occurred since the previous check.

### Download Attachments

Whether to download attachments from the table. When enabled, the **Download Fields** parameter defines the attachment fields.

### Download Fields

When you enable the **Download Attachments** toggle, this field defines which table fields to download. Field names are case sensitive. Use a comma to separate multiple field names.

### Additional Fields

Use the **Add Field** button to add the following parameters:

* **Fields**: A comma-separated list of fields to include in the output. If you don't specify anything here, the output will contain only the **Trigger Field**.
* **Formula**: An [Airtable formula](https://support.airtable.com/docs/formula-field-reference) to further filter the results. You can use this to add further constraints to the events that trigger the workflow. Note that formula values aren't taken into account for manual executions, only for production polling.
* **View ID**: The name or ID of a table view. When defined, only returns records available in the given view.
