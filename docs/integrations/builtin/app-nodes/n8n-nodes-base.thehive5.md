---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: TheHive 5 node documentation
description: Learn how to use the TheHive 5 node in n8n. Follow technical documentation to integrate TheHive 5 node into your workflows.
contentType: integration
---

# TheHive 5 node

Use the TheHive 5 node to automate work in TheHive, and integrate TheHive with other applications. n8n has built-in support for a wide range of TheHive features, including creating alerts, counting tasks logs, cases, and observables. 

On this page, you'll find a list of operations the TheHive node supports and links to more resources.

/// note | TheHive and TheHive 5
n8n provides two nodes for TheHive. Use this node (TheHive 5) if you want to use TheHive's version 5 API. If you want to use version 3 or 4, use [TheHive](/integrations/builtin/app-nodes/n8n-nodes-base.thehive/).
///
/// note | Credentials
Refer to [TheHive credentials](/integrations/builtin/credentials/thehive5/) for guidance on setting up authentication. 
///

## Operations

* Alert
	* Create
	* Delete
	* Execute Responder
	* Get
	* Merge Into Case
	* Promote to Case
	* Search
	* Update
	* Update Status
* Case
	* Add Attachment
	* Create
	* Delete Attachment
	* Delete Case
	* Execute Responder
	* Get
	* Get Attachment
	* Get Timeline
	* Search
	* Update
* Comment
	* Create
	* Delete
	* Search
	* Update
* Observable
	* Create
	* Delete
	* Execute Analyzer
	* Execute Responder
	* Get
	* Search
	* Update
* Page
	* Create
	* Delete
	* Search
	* Update
* Query
	* Execute Query
* Task
	* Create
	* Delete
	* Execute Responder
	* Get
	* Search
	* Update
* Task Log
	* Add Attachment
	* Create
	* Delete
	* Delete Attachment
	* Execute Responder
	* Get
	* Search

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'thehive-5') ]]

## Related resources

n8n provides a trigger node for TheHive. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.thehive5trigger/).

Refer to TheHive's [documentation](https://docs.strangebee.com/){:target=_blank .external-link} for more information about the service.
