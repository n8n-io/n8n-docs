---
title: Google Calendar node documentation
description: Learn how to use the Google Calendar node in n8n. Follow technical documentation to integrate Google Calendar node into your workflows.
contentType: [integration, reference]
priority: high
---

# Google Calendar node

Use the Google Calendar node to automate work in Google Calendar, and integrate Google Calendar with other applications. n8n has built-in support for a wide range of Google Calendar features, including adding, retrieving, deleting and updating calendar events.

On this page, you'll find a list of operations the Google Calendar node supports and links to more resources.

/// note | Credentials
Refer to [Google Calendar credentials](/integrations/builtin/credentials/google/index.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* **Calendar**
    * [**Availability**](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/calendar-operations.md#availability): If a time-slot is available in a calendar
* **Event**
    * [**Create**](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations.md#create): Add an event to calendar
    * [**Delete**](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations.md#delete): Delete an event
    * [**Get**](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations.md#get): Retrieve an event
    * [**Get Many**](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations.md#get-many): Retrieve all events from a calendar
    * [**Update**](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations.md#update): Update an event

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'google-calendar') ]]

## Related resources

n8n provides a trigger node for Google Calendar. You can find the trigger node docs [here](/integrations/builtin/trigger-nodes/n8n-nodes-base.googlecalendartrigger.md).

Refer to [Google Calendar's documentation](https://developers.google.com/calendar/api/v3/reference) for more information about the service.

View [example workflows and related content](https://n8n.io/integrations/google-calendar/) on n8n's website.
