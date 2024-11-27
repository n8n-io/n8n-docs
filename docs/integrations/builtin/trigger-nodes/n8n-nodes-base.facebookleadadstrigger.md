---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Facebook Lead Ads Trigger node documentation
description: Learn how to use the Facebook Lead Ads Trigger node in n8n. Follow technical documentation to integrate Facebook Lead Ads Trigger node into your workflows.
contentType: integration
priority: medium
---

# Facebook Lead Ads Trigger node

Use the Facebook Lead Ads Trigger node to respond to events in [Facebook Lead Ads](https://www.facebook.com/business/ads/lead-ads/){:target=_blank .external-link} and integrate Facebook Lead Ads with other applications. n8n has built-in support for responding to new leads.

On this page, you'll find a list of events the Facebook Lead Ads Trigger node can respond to, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/facebookleadads/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Facebook Lead Ads Trigger integrations](https://n8n.io/integrations/facebook-lead-ads-trigger/){:target=_blank .external-link} page.
///

## Events

* New lead

## Related resources

View [example workflows and related content](https://n8n.io/integrations/facebook-lead-ads-trigger/){:target=_blank .external-link} on n8n's website.

Refer to [Facebook Lead Ads' documentation](https://developers.facebook.com/docs/marketing-api/guides/lead-ads/){:target=_blank .external-link} for details about their API.

## Common issues

Here are some common errors and issues with the Facebook Lead Ads Trigger node and steps to resolve or troubleshoot them.

### Workflow only works in testing or production

Facebook Lead Ads only allows you to register a single webhook per app. This means that every time you switch from using the testing URL to the production URL (and vice versa), Facebook Lead Ads overwrites the registered webhook URL. 

You may have trouble with this if you try to test a workflow that's also active in production. Facebook Lead Ads will only send events to one of the two webhook URLs, so the other will never receive event notifications.

To work around this, you can disable your workflow when testing:

/// warning | Halts production traffic
This workaround temporarily disables your production workflow for testing. Your workflow will no longer receive production traffic while it's deactivated.
///

1. Go to your workflow page.
2. Toggle the **Active** switch in the top panel to disable the workflow temporarily.
3. Test your workflow using the test webhook URL.
4. When you finish testing, toggle the **Inactive** toggle to enable the workflow again. The production webhook URL should resume working.
