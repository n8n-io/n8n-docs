---
title: TheHive 5 node documentation
description: >-
  Learn how to use the TheHive 5 node in n8n. Follow technical documentation to
  integrate TheHive 5 node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: TheHive 5 node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.thehive5.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.thehive5'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.thehive5'
layout:
  description:
    visible: false
---

# TheHive 5 node <a href="#thehive-5-node" id="thehive-5-node"></a>

Use the TheHive 5 node to automate work in TheHive, and integrate TheHive with other applications. n8n has built-in support for a wide range of TheHive features, including creating alerts, counting tasks logs, cases, and observables. 

On this page, you'll find a list of operations the TheHive node supports and links to more resources.

{% hint style="info" %}
**TheHive and TheHive 5**

n8n provides two nodes for TheHive. Use this node (TheHive 5) if you want to use TheHive's version 5 API. If you want to use version 3 or 4, use [TheHive](n8n-nodes-base.thehive.md).
{% endhint %}
{% hint style="info" %}
**Credentials**

Refer to [TheHive credentials](../credentials/thehive5.md) for guidance on setting up authentication.
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

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

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse TheHive 5 node documentation integration templates](https://n8n.io/integrations/thehive-5) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n provides a trigger node for TheHive. You can find the trigger node docs [here](../trigger-nodes/n8n-nodes-base.thehive5trigger.md).

Refer to TheHive's [documentation](https://docs.strangebee.com/) for more information about the service.
