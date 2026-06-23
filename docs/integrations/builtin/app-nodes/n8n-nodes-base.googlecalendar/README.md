---
title: Google Calendar node documentation
description: >-
  Learn how to use the Google Calendar node in n8n. Follow technical
  documentation to integrate Google Calendar node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: n8n-nodes-base.googlecalendar
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/index.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar
layout:
  description:
    visible: false
---

# Google Calendar node <a href="#google-calendar-node" id="google-calendar-node"></a>

Use the Google Calendar node to automate work in Google Calendar, and integrate Google Calendar with other applications. n8n has built-in support for a wide range of Google Calendar features, including adding, retrieving, deleting and updating calendar events.

On this page, you'll find a list of operations the Google Calendar node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Google Calendar credentials](../../credentials/google/README.md) for guidance on setting up authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

## Operations <a href="#operations" id="operations"></a>

* **Calendar**
    * [**Availability**](calendar-operations.md#availability): If a time-slot is available in a calendar
* **Event**
    * [**Create**](event-operations.md#create): Add an event to calendar
    * [**Delete**](event-operations.md#delete): Delete an event
    * [**Get**](event-operations.md#get): Retrieve an event
    * [**Get Many**](event-operations.md#get-many): Retrieve all events from a calendar
    * [**Update**](event-operations.md#update): Update an event

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse n8n-nodes-base.googlecalendar integration templates](https://n8n.io/integrations/google-calendar) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

n8n provides a trigger node for Google Calendar. You can find the trigger node docs [here](../../trigger-nodes/n8n-nodes-base.googlecalendartrigger.md).

Refer to [Google Calendar's documentation](https://developers.google.com/calendar/api/v3/reference) for more information about the service.

View [example workflows and related content](https://n8n.io/integrations/google-calendar/) on n8n's website.
