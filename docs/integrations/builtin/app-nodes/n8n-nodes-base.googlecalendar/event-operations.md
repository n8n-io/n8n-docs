---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Google Calendar Event operations
description: Documentation for the Event operations in Google Calendar node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
priority: high
---

# Google Calendar Event operations

Use these operations to create, delete, get, and update events in Google Calendar. Refer to [Google Calendar](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/) for more information on the Google Calendar node itself.

## Create

Use this operation to add an event to a Google Calendar.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Calendar credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Event**.
- **Operation**: Select **Create**.
- **Calendar**: Choose a calendar you want to add an event to. Select **From list** to choose the title from the dropdown list or **By ID** to enter a calendar ID.
- **Start Time**: The start time for the event. By default, uses an expression evaluating to the current time (`{{ $now }}`).
- **End Time**: The end time for the event. By default, this uses an expression evaluating to an hour from now (`{{ $now.plus(1, 'hour') }}`).
- **Use Default Reminders**: Whether to enable default reminders for the event according to the calendar configuration.

### Options

- **All Day**: Whether the event is all day or not.
- **Attendees**: Attendees to invite to the event.
- **Color Name or ID**: The color of the event. Choose from the list or specify the ID using an expression.
- **Conference Data**: Creates a conference link (Hangouts, Meet, etc.) and attaches it to the event.
- **Description**: A description for the event.
- **Guests Can Invite Others**: Whether attendees other than the organizer can invite others to the event.
<!-- vale from-write-good.TooWordy = NO -->
- **Guests Can Modify**: Whether attendees other than the organizer can modify the event.
<!-- vale from-write-good.TooWordy = YES -->
- **Guests Can See Other Guests**: Whether attendees other than the organizer can see who the event's attendees are.
- **ID**: Opaque identifier of the event.
- **Location**: Geographic location of the event as free-form text.
- **Max Attendees**: The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only returns the participant.
- **Repeat Frequency**: The repetition interval for recurring events.
- **Repeat How Many Times?**: The number of instances to create for recurring events.
- **Repeat Until**: The date at which recurring events should stop.
<!-- vale from-write-good.Weasel = NO -->
- **RRULE**: Recurrence rule. When set, ignores the Repeat Frequency, Repeat How Many Times, and Repeat Until parameters.
<!-- vale from-write-good.Weasel = YES -->
- **Send Updates**: Whether to send notifications about the creation of the new event.
- **Show Me As**: Whether the event blocks time on the calendar.
- **Summary**: The title of the event.

Refer to the [Events: insert | Google Calendar](https://developers.google.com/calendar/api/v3/reference/events/insert){:target=_blank .external-link} API documentation for more information.

## Delete

Use this operation to delete an event from a Google Calendar.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Calendar credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Event**.
- **Operation**: Select **Delete**.
- **Calendar**: Choose a calendar you want to delete an event from. Select **From list** to choose the title from the dropdown list or **By ID** to enter a calendar ID.
- **Event ID**: The ID of the event to delete.

### Options

- **Send Updates**: Whether to send notifications about the deletion of the event.

Refer to the [Events: delete | Google Calendar](https://developers.google.com/calendar/api/v3/reference/events/delete){:target=_blank .external-link} API documentation for more information.

## Get

Use this operation to retrieve an event from a Google Calendar.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Calendar credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Event**.
- **Operation**: Select **Get**.
- **Calendar**: Choose a calendar you want to get an event from. Select **From list** to choose the title from the dropdown list or **By ID** to enter a calendar ID.
- **Event ID**: The ID of the event to get.

### Options

- **Max Attendees**: The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only returns the participant.
- **Return Next Instance of Recurrent Event**: Whether to return the next instance of a recurring event instead of the event itself.
- **Timezone**: The timezone used in the response. By default, uses the n8n timezone.

Refer to the [Events: get | Google Calendar](https://developers.google.com/calendar/api/v3/reference/events/get){:target=_blank .external-link} API documentation for more information.

<!-- vale from-write-good.Weasel = NO -->
## Get Many
<!-- vale from-write-good.Weasel = YES -->

Use this operation to retrieve more than one event from a Google Calendar.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Calendar credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Event**.
- **Operation**: Select **Get Many**.
- **Calendar**: Choose a calendar you want to get an event from. Select **From list** to choose the title from the dropdown list or **By ID** to enter a calendar ID.
- **Return All**: Whether to return all results or only up to a given limit.
- **Limit**: (When "Return All" isn't selected) The maximum number of results to return.
- **After**: Retrieve events that occur after this time. At least part of the event must be after this time. By default, this uses an expression evaluating to the current time (`{{ $now }}`). Switch the field to "fixed" to select a date from a date widget.
- **Before**: Retrieve events that occur before this time. At least part of the event must be before this time. By default, this uses an expression evaluating to the current time plus a week (`{{ $now.plus({ week: 1 }) }}`). Switch the field to "fixed" to select a date from a date widget.

### Options

- **Fields**: Specify the fields to return. By default, returns a set of commonly used fields predefined by Google. Use "*" to return all fields. You can find out more in [Google Calendar's documentation on working with partial resources](https://developers.google.com/calendar/api/guides/performance#partial).
<!-- vale Vale.Spelling = NO -->
- **iCalUID**: Specifies an event ID (in the iCalendar format) to include in the response.
<!-- vale Vale.Spelling = YES -->
- **Max Attendees**: The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only returns the participant.
- **Order By**: The order to use for the events in the response.
- **Query**: Free text search terms to find events that match. This searches all fields except for extended properties.
- **Recurring Event Handling**: What to do for recurring events:
	- **All Occurrences**: Return all instances of the recurring event for the specified time range.
	- **First Occurrence**: Return the first event of a recurring event within the specified time range.
	- **Next Occurrence**: Return the next instance of a recurring event within the specified time range.
- **Show Deleted**: Whether to include deleted events (with status equal to "cancelled") in the results.
- **Show Hidden Invitations**: Whether to include hidden invitations in the results.
- **Timezone**: The timezone used in the response. By default, uses the n8n timezone.
- **Updated Min**: The lower bounds for an event's last modification time (as an [RFC 3339 timestamp](https://datatracker.ietf.org/doc/html/rfc3339))

Refer to the [Events: list | Google Calendar](https://developers.google.com/calendar/api/v3/reference/events/list){:target=_blank .external-link} API documentation for more information.

## Update

Use this operation to update an event in a Google Calendar.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Calendar credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Event**.
- **Operation**: Select **Update**.
- **Calendar**: Choose a calendar you want to add an event to. Select **From list** to choose the title from the dropdown list or **By ID** to enter a calendar ID.
- **Event ID**: The ID of the event to update.
<!-- vale from-write-good.TooWordy = NO -->
- **Modify**: For recurring events, choose whether to update the recurring event or a specific instance of the recurring event.
<!-- vale from-write-good.TooWordy = YES -->
- **Use Default Reminders**: Whether to enable default reminders for the event according to the calendar configuration.
- **Update Fields**: The fields of the event to update:
	- **All Day**: Whether the event is all day or not.
	- **Attendees**: Attendees to invite to the event. You can choose to either add attendees or replace the existing attendee list.
	- **Color Name or ID**: The color of the event. Choose from the list or specify the ID using an expression.
	- **Description**: A description for the event.
	- **End**: The end time of the event.
	- **Guests Can Invite Others**: Whether attendees other than the organizer can invite others to the event.
	<!-- vale from-write-good.TooWordy = NO -->
	- **Guests Can Modify**: Whether attendees other than the organizer can make changes to the event.
	<!-- vale from-write-good.TooWordy = YES -->
	- **Guests Can See Other Guests**: Whether attendees other than the organizer can see who the event's attendees are.
	- **ID**: Opaque identifier of the event.
	- **Location**: Geographic location of the event as free-form text.
	- **Max Attendees**: The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only returns the participant.
	- **Repeat Frequency**: The repetition interval for recurring events.
	- **Repeat How Many Times?**: The number of instances to create for recurring events.
	- **Repeat Until**: The date at which recurring events should stop.
	<!-- vale from-write-good.Weasel = NO -->
	- **RRULE**: Recurrence rule. When set, ignores the Repeat Frequency, Repeat How Many Times, and Repeat Until parameters.
	<!-- vale from-write-good.Weasel = YES -->
	- **Send Updates**: Whether to send notifications about the creation of the new event.
	- **Show Me As**: Whether the event blocks time on the calendar.
	- **Start**: The start time of the event.
	- **Summary**: The title of the event.
	- **Visibility**: The visibility of the event:
		<!-- vale from-write-good.Passive = NO -->
		- **Confidential**: The event is private. This value is provided for compatibility.
		<!-- vale from-write-good.Passive = YES -->
		- **Default**: Uses the default visibility for events on the calendar.
		- **Public**: The event is public and the event details are visible to all readers of the calendar.
		- **Private**: The event is private and only event attendees may view event details.

Refer to the [Events: update | Google Calendar](https://developers.google.com/calendar/api/v3/reference/events/update){:target=_blank .external-link} API documentation for more information.
