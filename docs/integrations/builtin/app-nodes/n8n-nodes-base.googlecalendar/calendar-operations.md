---
title: Google Calendar Calendar operations
description: Documentation for the Calendar operations in Google Calendar node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
priority: high
---

<!-- vale Vale.Repetition = NO -->
<!-- vale from-write-good.Illusions = NO -->
# Google Calendar Calendar operations
<!-- vale from-write-good.Illusions = YES -->
<!-- vale Vale.Repetition = YES -->

Use this operation to check availability in a calendar in Google Calendar. Refer to [Google Calendar](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/index.md) for more information on the Google Calendar node itself.

## Availability

Use this operation to check if a time-slot is available in a calendar.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Calendar credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **Calendar**.
- **Operation**: Select **Availability**.
- **Calendar**: Choose a calendar you want to check against. Select **From list** to choose the title from the dropdown list or **By ID** to enter a calendar ID.
- **Start Time**: The start time for the time-slot you want to check. By default, uses an expression evaluating to the current time (`{{ $now }}`).
- **End Time**: The end time for the time-slot you want to check. By default, uses an expression evaluating to an hour from now (`{{ $now.plus(1, 'hour') }}`).

### Options

- **Output Format**: Select the format for the availability information:
	- **Availability**: Returns if there are already events overlapping with the given time slot or not.
	- **Booked Slots**: Returns the booked slots.
	- **RAW**: Returns the RAW data from the API.
- **Timezone**: The timezone used in the response. By default, uses the n8n timezone.

Refer to the [Freebusy: query | Google Calendar](https://developers.google.com/calendar/api/v3/reference/freebusy/query) API documentation for more information.
