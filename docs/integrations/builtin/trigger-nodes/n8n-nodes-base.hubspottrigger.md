---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: HubSpot Trigger node documentation
description: Learn how to use the HubSpot Trigger node in n8n. Follow technical documentation to integrate HubSpot Trigger node into your workflows.
contentType: integration
priority: medium
---

# HubSpot Trigger node

[HubSpot](https://www.hubspot.com/){:target=_blank .external-link} provides tools for social media marketing, content management, web analytics, landing pages, customer support, and search engine optimization.

/// warning | Webhooks
If you activate a second trigger, the previous trigger stops working. This is because the trigger registers a new webhook with HubSpot when activated. HubSpot only allows one webhook at a time. 
///

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/hubspot/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [HubSpot Trigger integrations](https://n8n.io/integrations/hubspot-trigger/){:target=_blank .external-link} page.
///

## Events

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

## Related resources

n8n provides an app node for HubSpot. You can find the node docs [here](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/).

View [example workflows and related content](https://n8n.io/integrations/hubspot-trigger/){:target=_blank .external-link} on n8n's website.

Refer to [HubSpot's documentation](https://developers.hubspot.com/docs/api/overview){:target=_blank .external-link} for details about their API.

