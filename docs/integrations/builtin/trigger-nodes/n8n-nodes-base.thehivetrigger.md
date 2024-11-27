---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: TheHive Trigger node documentation
description: Learn how to use the TheHive Trigger node in n8n. Follow technical documentation to integrate TheHive Trigger node into your workflows.
contentType: integration
---

# TheHive Trigger node

On this page, you'll find a list of events the TheHive Trigger node can respond to and links to more resources.

/// note | TheHive and TheHive 5
n8n provides two nodes for TheHive. Use this node (TheHive Trigger) if you want to use TheHive's version 3 or 4 API. If you want to use version 5, use [TheHive 5 Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.thehive5trigger/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [TheHive Trigger integrations](https://n8n.io/integrations/thehive-trigger/){:target=_blank .external-link} page.
///

## Events

* Alert 
	* Created
	* Deleted
	* Updated
* Case
	* Created
	* Deleted
	* Updated
* Log
	* Created
	* Deleted
	* Updated
* Observable
	* Created
	* Deleted
	* Updated
* Task
	* Created
	* Deleted
	* Updated

## Related resources

n8n provides an app node for TheHive. You can find the node docs [here](/integrations/builtin/app-nodes/n8n-nodes-base.thehive/).

View [example workflows and related content](https://n8n.io/integrations/thehive-trigger/){:target=_blank .external-link} on n8n's website.

Refer to TheHive's documentation for more information about the service:

* [Version 3](http://docs.thehive-project.org/thehive/legacy/thehive3/api/){:target=_blank .external-link}
* [Version 4](http://docs.thehive-project.org/cortex/api/api-guide/){:target=_blank .external-link}


## Configure a webhook in TheHive

To configure the webhook for your TheHive instance:

1. Copy the testing and production webhook URLs from TheHive Trigger node.
2. Add the following lines to the `application.conf` file. This is TheHive configuration file:

	```
	notification.webhook.endpoints = [
		{
			name: TESTING_WEBHOOK_NAME
			url: TESTING_WEBHOOK_URL
			version: 0
			wsConfig: {}
			includedTheHiveOrganisations: ["ORGANIZATION_NAME"]
			excludedTheHiveOrganisations: []
		},
		{
			name: PRODUCTION_WEBHOOK_NAME
			url: PRODUCTION_WEBHOOK_URL
			version: 0
			wsConfig: {}
			includedTheHiveOrganisations: ["ORGANIZATION_NAME"]
			excludedTheHiveOrganisations: []
		}
	]
	```

3. Replace `TESTING_WEBHOOK_URL` and `PRODUCTION_WEBHOOK_URL` with the URLs you copied in the previous step.
4. Replace `TESTING_WEBHOOK_NAME` and `PRODUCTION_WEBHOOK_NAME` with your preferred endpoint names.
5. Replace `ORGANIZATION_NAME` with your organization name.
6. Execute the following cURL command to enable notifications:
	```sh
	curl -XPUT -uTHEHIVE_USERNAME:THEHIVE_PASSWORD -H 'Content-type: application/json' THEHIVE_URL/api/config/organisation/notification -d '
	{
		"value": [
			{
			"delegate": false,
			"trigger": { "name": "AnyEvent"},
			"notifier": { "name": "webhook", "endpoint": "TESTING_WEBHOOK_NAME" }
			},
			{
			"delegate": false,
			"trigger": { "name": "AnyEvent"},
			"notifier": { "name": "webhook", "endpoint": "PRODUCTION_WEBHOOK_NAME" }
			}
		]
	}'
	```
