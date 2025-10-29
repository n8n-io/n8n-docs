---
title: Postgres Trigger node documentation
description: Learn how to use the Postgres Trigger node in n8n. Follow technical documentation to integrate Postgres Trigger node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Postgres Trigger node

Use the Postgres Trigger node to respond to events in [Postgres](https://www.postgresql.org/) and integrate Postgres with other applications. n8n has built-in support responding to insert, update, and delete events.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/postgres.md).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Postgres Trigger integrations](https://n8n.io/integrations/postgres-trigger/) page.
///

## Events

You can configure how the node listens for events.

* Select **Listen and Create Trigger Rule**, then choose the events to listen for:
	* Insert
	* Update
	* Delete
* Select **Listen to Channel**, then enter a channel name that the node should monitor.

**Note on database permissions to creating listing events**:
* To listen for trigger events, n8n automatically creates a Postgres trigger on the target table to monitor for the event. This trigger rule on the table is added when your workflow is activated and removed when it is deactivated.
* If your workflow is not active, it is added any time you test your workflow by listening for a test event, and automaticcally deleted again when the test event listening stops.
* The Postgress trigger calls an automatically-created procedure to tell n8n about the event.
* The user in your Postgres credential must have permissions to create and execute triggers and procedures. In PostgreSQL, only superusers or the table owner (or those with TRIGGER privilege) can create triggers on that table. The user must also have CREATE privilege on the schema where the procedure will reside.


## Related resources

n8n provides an app node for Postgres. You can find the node docs [here](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/index.md).

View [example workflows and related content](https://n8n.io/integrations/postgres-trigger/) on n8n's website.
