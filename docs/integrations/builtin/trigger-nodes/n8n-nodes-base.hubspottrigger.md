---
title: HubSpot Trigger node documentation
description: >-
  Learn how to use the HubSpot Trigger node in n8n. Follow technical
  documentation to integrate HubSpot Trigger node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: HubSpot Trigger node documentation
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.hubspottrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspottrigger
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspottrigger
layout:
  description:
    visible: false
---

# HubSpot Trigger node <a href="#hubspot-trigger-node" id="hubspot-trigger-node"></a>

[HubSpot](https://www.hubspot.com/) provides tools for social media marketing, content management, web analytics, landing pages, customer support, and search engine optimization.

{% hint style="warning" %}
**Webhooks**

If you activate a second trigger, the previous trigger stops working. This is because the trigger registers a new webhook with HubSpot when activated. HubSpot only allows one webhook at a time.
{% endhint %}

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/hubspot.md).
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [HubSpot Trigger integrations](https://n8n.io/integrations/hubspot-trigger/) page.
{% endhint %}

## Events <a href="#events" id="events"></a>

* Company
	* Created
	* Deleted
	* Property changed
* Contact
	* Created
	* Deleted
	* Privacy deleted
	* Property changed
* Conversation
	* Created
	* Deleted
	* New message
	* Privacy deletion
	* Property changed
* Deal
	* Created
	* Deleted
	* Property changed
* Ticket
	* Created
	* Deleted
	* Property changed 

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n provides an app node for HubSpot. You can find the node docs [here](../app-nodes/n8n-nodes-base.hubspot.md).

View [example workflows and related content](https://n8n.io/integrations/hubspot-trigger/) on n8n's website.

Refer to [HubSpot's documentation](https://developers.hubspot.com/docs/api/overview) for details about their API.

