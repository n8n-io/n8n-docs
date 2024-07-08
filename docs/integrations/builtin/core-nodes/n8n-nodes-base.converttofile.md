---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Convert to File
description: Documentation for the Convert to File node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Convert to File

Use the Convert to File node to take input data and output it as a file. This converts the input JSON data into a binary format.


/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Convert to File integrations](https://n8n.io/integrations/convert-to-file/){:target=_blank .external-link} page.
///

/// note | Extract From File
To extract data from a file and convert it to JSON, use the [Extract from File](/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile/) node.
///

## Operations

* Convert to CSV
* Convert to HTML
* Convert to ICS
* Convert to JSON
* Convert to ODS
* Convert to RTF
* Convert to Text File
* Convert to XLS
* Convert to XLSX
* Move Base64 String to File

## Node parameters

All operations include one node parameter: **Put Output File in Field**. Enter the name of the field in the output data to contain the file.

The **Convert to ICS**, **Convert to JSON**, **Convert to Text File**, and **Move Base64 String to File** operations include other node parameters. Refer to the sections below for more details on these operations.

### Convert to ICS parameters

* **Event Title**: Enter the title for the event.
* **Start**: Enter the date and time the event will start. All-day events ignore the time.
* **End**: Enter the date and time the event will end. All-day events ignore the time. If unset, the node uses the start date.
* **All Day**: Select whether the event is an all day event (turned on) or not (turned off).

### Convert to JSON parameters

Choose the best output **Mode** for your needs from these options:

* **All Items to One File**: Send all input items to a single file.
* **Each Item to Separate File**: Create a file for every input item.

### Convert to Text File parameters

Enter the name of the **Text Input Field** that contains a string to convert to a file. Use dot-notation for deep fields, for example 'level1.level2.currentKey'.

### Move Base64 String to File parameters

Enter the name of the **Base64 Input Field** that contains the Base64 string to convert to a file. Use dot-notation for deep fields, for example 'level1.level2.currentKey'.

## Node options

Use the **Options** to configure more parameters specific to the file type you're creating.

You can set the **File Name** for the generated output file for all operations.

### Convert to CSV options

If the first row of the file contains header names, turn on the **Header Row** option.

### Convert to HTML options

If the first row of the file contains header names, turn on the **Header Row** option.

### Convert to ICS options

* **Attendees**: Use this option to add attendees to the event. For each attendee, add:
	* **Name**
	* **Email**
	* **RSVP**: Select whether the attendee needs to confirm attendance (turned on) or doesn't (turned off).
* **Busy Status**: Use this option to set the busy status for Microsoft applications like Outlook. Choose from:
	* **Busy**
	* **Tentative**
* **Calendar Name**: For Apple and Microsoft calendars, enter the [calendar name](https://learn.microsoft.com/en-us/openspecs/exchange_server_protocols/ms-oxcical/1da58449-b97e-46bd-b018-a1ce576f3e6d){:target=_blank .external-link} for the event.
*  **Description**: Enter an event description.
* **Geolocation**: Enter the **Latitude** and **Longitude** for the event's location.
* **Location**: Enter the event's intended venue/location.
* **Recurrence Rule**: Enter a rule to define the repeat pattern of the event (RRULE). Generate rules using the [iCalendar.org RRULE Tool](https://icalendar.org/rrule-tool.html){:target=_blank .external-link}.
* **Organizer**: Enter the organizer's **Name** and **Email**.
* **Sequence**: If you're sending an update for an event with the same universally unique ID (UID), enter the revision sequence number.
* **Status**: Set the status of the event. Choose from:
	* **Confirmed**
	* **Cancelled**
	* **Tentative**
* **UID**: Enter a universally unique ID (UID) for the event. The UID should be globally unique. The node automatically generates a UID if you don't enter one.
* **URL**: Enter a URL associated with the event.
* **Use Workflow Timezone**: Whether to use UTC time zone (turned off) or the workflow's timezone (turned on). Set the workflow's timezone in the [Workflow Settings](/workflows/settings/).

### Convert to JSON options

* **Format**: Choose whether to format the JSON for easier reading (turned on) or not (turned off).
* **Encoding**: Choose the character set to use to encode the data. The default is **utf8**.

### Convert to ODS options

* **Compression**: Choose whether to compress and reduce the file's output size.
* **Header Row**: Turn on if the first row of the file contains header names.
* **Sheet Name**: Enter the Sheet Name to create in the spreadsheet.

### Convert to RFT options

If the first row of the file contains header names, turn on the **Header Row** option.

### Convert to Text File options

Use the **Encoding** option to choose the character set to use to encode the data. The default is **utf8**.

### Convert to XLS options

* **Header Row**: Turn on if the first row of the file contains header names.
* **Sheet Name**: Enter the Sheet Name to create in the spreadsheet.

### Convert to XLSX options

* **Compression**: Choose whether to compress and reduce the file's output size.
* **Header Row**: Turn on if the first row of the file contains header names.
* **Sheet Name**: Enter the Sheet Name to create in the spreadsheet.

### Move Base64 String to File options

Enter the **MIME Type** of the output file. Refer to [Common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types){:target=_blank .external-link} for a list of common MIME types and the file extensions they relate to.
