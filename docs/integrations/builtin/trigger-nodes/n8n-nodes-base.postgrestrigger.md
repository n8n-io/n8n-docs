---
title: Postgres trigger
description: Documentation for the Postgres trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Postgres trigger

Use the Postgres trigger node to respond to events in Postgres and integrate Postgres with other applications. n8n has built-in support responding to insert, update, and delete events

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/postgres/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Postgres Trigger integrations](https://n8n.io/integrations/postgres-trigger/){:target=_blank .external-link} page.
///

## Events

You can configure how the node listens for events.

* Select **Listen and Create Trigger Rule**, then choose the events to listen for:
	* Insert
	* Update
	* Delete
* Select **Listen to Channel**, then enter a channel name that the node should monitor.

## Related resources

<!-- provide a link to the app node docs, if there is a trigger node for this service -->
n8n provides an app node for Postgres. You can find the node docs [here](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/).

View [example workflows and related content](https://n8n.io/integrations/postgres-trigger/){:target=_blank .external-link} on n8n's website.





