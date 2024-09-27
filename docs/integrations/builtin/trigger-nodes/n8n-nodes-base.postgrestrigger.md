---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Postgres Trigger node documentation
description: Learn how to use the Postgres Trigger node in n8n. Follow technical documentation to integrate Postgres Trigger node into your workflows.
contentType: integration
priority: medium
---

# Postgres Trigger node

Use the Postgres Trigger node to respond to events in [Postgres](https://www.postgresql.org/){:target=_blank .external-link} and integrate Postgres with other applications. n8n has built-in support responding to insert, update, and delete events.

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

n8n provides an app node for Postgres. You can find the node docs [here](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/).

View [example workflows and related content](https://n8n.io/integrations/postgres-trigger/){:target=_blank .external-link} on n8n's website.
