---
title: Calendly Trigger node documentation
description: >-
  Learn how to use the Calendly Trigger node in n8n. Follow technical
  documentation to integrate Calendly Trigger node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Calendly Trigger node documentation
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.calendlytrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.calendlytrigger
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.calendlytrigger
layout:
  description:
    visible: false
---

# Calendly Trigger node <a href="#calendly-trigger-node" id="calendly-trigger-node"></a>

[Calendly](https://calendly.com/) is an automated scheduling software that's designed to help find meeting times.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/calendly.md).
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Calendly Trigger integrations](https://n8n.io/integrations/calendly-trigger/) page.
{% endhint %}

## Events <a href="#events" id="events"></a>

* Event created
* Event canceled

## Common issues <a href="#common-issues" id="common-issues"></a>

Here are some common errors and issues with the Calendly Trigger node and steps to resolve or troubleshoot them.

### Node only triggers for Calendly-managed bookings <a href="#node-only-triggers-for-calendly-managed-bookings" id="node-only-triggers-for-calendly-managed-bookings"></a>

Calendly webhooks only fire for bookings and cancellations managed by Calendly. Creating or editing an event directly in a connected calendar, such as Google Calendar, won't trigger the Calendly Trigger node.

### Webhook callback URL must be public HTTPS <a href="#webhook-callback-url-must-be-public-https" id="webhook-callback-url-must-be-public-https"></a>

The Calendly Trigger node uses Calendly webhooks, and Calendly requires webhook callback URLs to be public HTTPS URLs. For local testing, use a tunnel such as [ngrok](https://ngrok.com/) or [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/) and configure n8n to use that public HTTPS URL for webhooks. Refer to [Configuration > Webhook URL](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/configuration-examples/configure-webhook-urls-with-reverse-proxy) for setup details.
