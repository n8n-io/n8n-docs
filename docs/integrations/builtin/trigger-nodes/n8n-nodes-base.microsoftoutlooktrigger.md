---
title: Microsoft Outlook Trigger node documentation
description: >-
  Learn how to use the Microsoft Outlook Trigger node in n8n. Follow technical
  documentation to integrate Microsoft Outlook Trigger node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Microsoft Outlook Trigger node documentation
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftoutlooktrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftoutlooktrigger
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftoutlooktrigger
layout:
  description:
    visible: false
---

# Microsoft Outlook Trigger node <a href="#microsoft-outlook-trigger-node" id="microsoft-outlook-trigger-node"></a>

Use the Microsoft Outlook Trigger node to respond to events in [Microsoft Outlook](https://www.microsoft.com/en-us/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook) and integrate Microsoft Outlook with other applications.

On this page, you'll find a list of events the Microsoft Outlook Trigger node can respond to, and links to more resources.

{% hint style="info" %}
**Credentials**

This node supports two authentication options:

- **Microsoft Outlook OAuth2 API**: the Microsoft Outlook-specific OAuth2 credential (default).
- **Microsoft OAuth2 API**: a generic Microsoft Graph credential that you can reuse across other Microsoft nodes. When you select this option, make sure the credential is granted the scopes this node needs (for example, `Mail.ReadWrite`).

You can find authentication information for this node [here](../credentials/microsoft.md).
{% endhint %}

{% hint style="info" %}
**Government Cloud Support**

If you're using a government cloud tenant (US Government, US Government DOD, or China), make sure to select the appropriate **Microsoft Graph API Base URL** in your Microsoft credentials configuration.
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Microsoft Outlook integrations](https://n8n.io/integrations/microsoft-outlook-trigger/) page.
{% endhint %}

## Events <a href="#events" id="events"></a>

* Message Received

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n provides an app node for Microsoft Outlook. You can find the node docs [here](../app-nodes/n8n-nodes-base.microsoftoutlook.md).

View [example workflows and related content](https://n8n.io/integrations/microsoft-outlook-trigger/) on n8n's website.

