---
title: Calendly Trigger node documentation
description: Learn how to use the Calendly Trigger node in n8n. Follow technical documentation to integrate Calendly Trigger node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Calendly Trigger node

[Calendly](https://calendly.com/) is an automated scheduling software that's designed to help find meeting times.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/calendly.md).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Calendly Trigger integrations](https://n8n.io/integrations/calendly-trigger/) page.
///

## Events

* Event created
* Event canceled

## Common issues

Here are some common errors and issues with the Calendly Trigger node and steps to resolve or troubleshoot them.

### Node only triggers for Calendly-managed bookings

Calendly webhooks only fire for bookings and cancellations managed by Calendly. Creating or editing an event directly in a connected calendar, such as Google Calendar, won't trigger the Calendly Trigger node.

### Webhook callback URL must be public HTTPS

The Calendly Trigger node uses Calendly webhooks, and Calendly requires webhook callback URLs to be public HTTPS URLs. For local testing, use a tunnel such as [ngrok](https://ngrok.com/) or [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/) and configure n8n to use that public HTTPS URL for webhooks. Refer to [Configuration > Webhook URL](/hosting/configuration/configuration-examples/webhook-url.md) for setup details.
