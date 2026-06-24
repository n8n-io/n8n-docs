---
title: Microsoft Outlook node documentation
description: >-
  Learn how to use the Microsoft Outlook node in n8n. Follow technical
  documentation to integrate Microsoft Outlook node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Microsoft Outlook node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.microsoftoutlook.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftoutlook
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftoutlook
layout:
  description:
    visible: false
---

# Microsoft Outlook node <a href="#microsoft-outlook-node" id="microsoft-outlook-node"></a>

Use the Microsoft Outlook node to automate work in Microsoft Outlook, and integrate Microsoft Outlook with other applications. n8n has built-in support for a wide range of Microsoft Outlook features, including creating, updating, deleting, and getting folders, messages, and drafts. 

On this page, you'll find a list of operations the Microsoft Outlook node supports and links to more resources.

{% hint style="info" %}
**Credentials**

This node supports two authentication options:

- **Microsoft Outlook OAuth2 API**: the Microsoft Outlook-specific OAuth2 credential (default).
- **Microsoft OAuth2 API**: a generic Microsoft Graph credential that you can reuse across other Microsoft nodes. When you select this option, make sure the credential is granted the scopes this node needs (for example, `Mail.ReadWrite`, `Mail.Send`, `Calendars.ReadWrite`, and `Contacts.ReadWrite`).

Refer to [Microsoft credentials](../credentials/microsoft.md) for guidance on setting up authentication.
{% endhint %}

{% hint style="info" %}
**Government Cloud Support**

If you're using a government cloud tenant (US Government, US Government DOD, or China), make sure to select the appropriate **Microsoft Graph API Base URL** in your Microsoft credentials configuration.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/E4462HQ9P1zhTQgzmcLG/" %}

## Operations <a href="#operations" id="operations"></a>

* Calendar
	* Create
	* Delete
	* Get
	* Get Many
	* Update
* Contact
	* Create
	* Delete
	* Get
	* Get Many
	* Update
* Draft
	* Create
	* Delete
	* Get
	* Send
	* Update
* Event
	* Create
	* Delete
	* Get
	* Get Many
	* Update
* Folder
	* Create
	* Delete
	* Get
	* Get Many
	* Update
* Folder Message
    * Get Many
* Message
	* Delete
	* Get
	* Get Many
	* Move
	* Reply
	* Send
	* Send and Wait for Response
	* Update
* Message Attachment
	* Add
	* Download
	* Get
	* Get Many

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/DO3jZ432bOPsmoiDqIYg/" %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Microsoft Outlook node documentation integration templates](https://n8n.io/integrations/microsoft-outlook) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Outlook's API documentation](https://learn.microsoft.com/en-us/outlook/rest/get-started) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/lMIxsgtfHVazfAS7oe1v/" %}
