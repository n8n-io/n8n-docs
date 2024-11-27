---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: TheHive 5 Trigger node documentation
description: Learn how to use the TheHive 5 Trigger node in n8n. Follow technical documentation to integrate TheHive 5 Trigger node into your workflows.
contentType: integration
---

# TheHive 5 Trigger node

Use the TheHive 5 Trigger node to respond to events in [TheHive](https://strangebee.com/thehive/){:target=_blank .external-link} and integrate TheHive with other applications. n8n has built-in support for a wide range of TheHive events, including alerts, cases, comments, pages, and tasks.

On this page, you'll find a list of events the TheHive5 Trigger node can respond to and links to more resources.

/// note | TheHive and TheHive 5
n8n provides two nodes for TheHive. Use this node (TheHive 5 Trigger) if you want to use TheHive's version 5 API. If you want to use version 3 or 4, use [TheHive Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.thehivetrigger/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [TheHive 5 Trigger integrations](https://n8n.io/integrations/thehive-5-trigger/){:target=_blank .external-link} page.
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
* Comment
	* Created
	* Deleted
	* Updated
* Observable
	* Created
	* Deleted
	* Updated
* Page
	* Created
	* Deleted
	* Updated
* Task
	* Created
	* Deleted
	* Updated
* Task log
	* Created
	* Deleted
	* Updated

## Related resources

n8n provides an app node for TheHive 5. You can find the node docs [here](/integrations/builtin/app-nodes/n8n-nodes-base.thehive5/).

Refer to TheHive's [documentation](https://docs.strangebee.com/){:target=_blank .external-link} for more information about the service.


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
