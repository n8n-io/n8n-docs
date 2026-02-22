---
title: NocoDB Trigger node documentation
description: Learn how to use the NocoDB Trigger node in n8n. Follow technical documentation to integrate NocoDB Trigger node into your workflows.
contentType: [integration, reference]
priority: medium
---

# NocoDB Trigger node

On this page, you'll find a list of events the NocoDB Trigger node can respond to and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/nocodb.md).
///

## Events

* **New NocoDB event**

## Related resources

n8n provides an app node for NocoDB. You can find the node docs [here](/integrations/builtin/app-nodes/n8n-nodes-base.nocodb.md).

## Node parameters

Use these parameters to configure your node.

### Poll Times

n8n's NocoDB node uses polling for check for updates on configured NocoDB resources. The **Poll Times** parameter configures the querying frequency:

* Every Minute
* Every Hour
* Every Day
* Every Week
* Every Month
* Every X: Check for updates every given number of minutes or hours.
* Custom: Customize the polling interval by providing a [cron expression](https://en.wikipedia.org/wiki/Cron).

Use the **Add Poll Time** button to add more polling intervals.

### Workspace

The [NocoDB workspace](https://nocodb.com/docs/product-docs/workspaces) you want to check for updates on. Choose None if the NocoDB instance does not support workspace.

### Base

The [NocoDB base](https://nocodb.com/docs/product-docs/bases) you want to check for updates on.

### Table

The [NocoDB table](https://nocodb.com/docs/product-docs/tables) within the NocoDB base that you want to check for updates on.

### Trigger Field

A created or last modified field in your table. The NocoDB Trigger node uses this to determine what updates occurred since the previous check.

### Download Attachment

Whether to download attachment from the table. When enabled, the **Download Field Name or ID** parameter defines the attachment field.

### Download Field Name or ID

When you enable the **Download Attachment** toggle, this field defines which table field to download. Choose from the list.

### Additional Options

Use the **Add Option** button to add the following parameters:

* **Fields**: 
* **Filter by Formula**: A [NocoDB where clause](https://nocodb.com/docs/product-docs/developer-resources/rest-apis#comparison-operators) in RestAPI to further filter the results. You can use this to add further constraints to the events that trigger the workflow.
* **View Name or ID**: The name or ID of a table view. When defined, only returns records available in the given view.
