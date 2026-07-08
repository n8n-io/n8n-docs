---
title: Facebook Lead Ads Trigger node documentation
description: >-
  Learn how to use the Facebook Lead Ads Trigger node in n8n. Follow technical
  documentation to integrate Facebook Lead Ads Trigger node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Facebook Lead Ads Trigger node documentation
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.facebookleadadstrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebookleadadstrigger
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebookleadadstrigger
layout:
  description:
    visible: false
---

# Facebook Lead Ads Trigger node <a href="#facebook-lead-ads-trigger-node" id="facebook-lead-ads-trigger-node"></a>

Use the Facebook Lead Ads Trigger node to respond to events in [Facebook Lead Ads](https://www.facebook.com/business/ads/lead-ads/) and integrate Facebook Lead Ads with other applications. n8n has built-in support for responding to new leads.

On this page, you'll find a list of events the Facebook Lead Ads Trigger node can respond to, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/facebookleadads.md).
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Facebook Lead Ads Trigger integrations](https://n8n.io/integrations/facebook-lead-ads-trigger/) page.
{% endhint %}

## Events <a href="#events" id="events"></a>

* New lead

## Related resources <a href="#related-resources" id="related-resources"></a>

View [example workflows and related content](https://n8n.io/integrations/facebook-lead-ads-trigger/) on n8n's website.

Refer to [Facebook Lead Ads' documentation](https://developers.facebook.com/docs/marketing-api/guides/lead-ads/) for details about their API.

## Common issues <a href="#common-issues" id="common-issues"></a>

Here are some common errors and issues with the Facebook Lead Ads Trigger node and steps to resolve or troubleshoot them.

### Workflow only works in testing or production <a href="#workflow-only-works-in-testing-or-production" id="workflow-only-works-in-testing-or-production"></a>

Facebook Lead Ads only allows you to register a single webhook per app. This means that every time you switch from using the testing URL to the production URL (and vice versa), Facebook Lead Ads overwrites the registered webhook URL. 

You may have trouble with this if you try to test a workflow that's also active in production. Facebook Lead Ads will only send events to one of the two webhook URLs, so the other will never receive event notifications.

To work around this, you can disable your workflow when testing:

{% hint style="warning" %}
**Halts production traffic**

This workaround temporarily disables your production workflow for testing. Your workflow will no longer receive production traffic while it's deactivated.
{% endhint %}

1. Go to your workflow page.
2. From the workflow settings dropdown, click **Unpublish** to disable the workflow temporarily.
3. Test your workflow using the test webhook URL.
4. When you finish testing, click **Publish**. The production webhook URL should resume working.
