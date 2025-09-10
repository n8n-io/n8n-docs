---
title: Convert to File
description: Documentation for the Convert to File node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: critical
---

# Convert to File

Use the Convert to File node to take input data and output it as a file. This converts the input JSON data into a binary format.

/// note | Extract From File
To extract data from a file and convert it to JSON, use the [Extract from File](/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile.md) node.
///

## Operations

* [**Convert to CSV**](#convert-to-csv)
* [**Convert to HTML**](#convert-to-html)
* [**Convert to ICS**](#convert-to-ics)
* [**Convert to JSON**](#convert-to-json)
* [**Convert to ODS**](#convert-to-ods)
* [**Convert to RTF**](#convert-to-rtf)
* [**Convert to Text File**](#convert-to-text-file)
* [**Convert to XLS**](#convert-to-xls)
* [**Convert to XLSX**](#convert-to-xlsx)
* [**Move Base64 String to File**](#move-base64-string-to-file)

Node parameters and options depend on the operation you select.

### Convert to CSV

Configure the node for this operation with the **Put Output File in Field** parameter. Enter the name of the field in the output data to contain the file.

#### Convert to CSV options

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* If the first row of the file contains header names, turn on the **Header Row** option.

### Convert to HTML

Configure the node for this operation with the **Put Output File in Field** parameter. Enter the name of the field in the output data to contain the file.

#### Convert to HTML options

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* If the first row of the file contains header names, turn on the **Header Row** option.

### Convert to ICS

* **Put Output File in Field**. Enter the name of the field in the output data to contain the file.
* **Event Title**: Enter the title for the event.
* **Start**: Enter the date and time the event will start. All-day events ignore the time.
* **End**: Enter the date and time the event will end. All-day events ignore the time. If unset, the node uses the start date.
* **All Day**: Select whether the event is an all day event (turned on) or not (turned off).

#### Convert to ICS options

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* **Attendees**: Use this option to add attendees to the event. For each attendee, add:
	* **Name**
	* **Email**
	* **RSVP**: Select whether the attendee needs to confirm attendance (turned on) or doesn't (turned off).
* **Busy Status**: Use this option to set the busy status for Microsoft applications like Outlook. Choose from:
	* **Busy**
	* **Tentative**
* **Calendar Name**: For Apple and Microsoft calendars, enter the [calendar name](https://learn.microsoft.com/en-us/openspecs/exchange_server_protocols/ms-oxcical/1da58449-b97e-46bd-b018-a1ce576f3e6d) for the event.
*  **Description**: Enter an event description.
* **Geolocation**: Enter the **Latitude** and **Longitude** for the event's location.
* **Location**: Enter the event's intended venue/location.
* **Recurrence Rule**: Enter a rule to define the repeat pattern of the event (RRULE). Generate rules using the [iCalendar.org RRULE Tool](https://icalendar.org/rrule-tool.html).
* **Organizer**: Enter the organizer's **Name** and **Email**.
* **Sequence**: If you're sending an update for an event with the same universally unique ID (UID), enter the revision sequence number.
* **Status**: Set the status of the event. Choose from:
	* **Confirmed**
	* **Cancelled**
	* **Tentative**
* **UID**: Enter a universally unique ID (UID) for the event. The UID should be globally unique. The node automatically generates a UID if you don't enter one.
* **URL**: Enter a URL associated with the event.
* **Use Workflow Timezone**: Whether to use UTC time zone (turned off) or the workflow's timezone (turned on). Set the workflow's timezone in the [Workflow Settings](/workflows/settings.md).

### Convert to JSON

Choose the best output **Mode** for your needs from these options:

* **All Items to One File**: Send all input items to a single file.
* **Each Item to Separate File**: Create a file for every input item.

#### Convert to JSON options

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* **Format**: Choose whether to format the JSON for easier reading (turned on) or not (turned off).
* **Encoding**: Choose the character set to use to encode the data. The default is **utf8**.

### Convert to ODS

Configure the node for this operation with the **Put Output File in Field** parameter. Enter the name of the field in the output data to contain the file.

#### Convert to ODS options

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* **Compression**: Choose whether to compress and reduce the file's output size.
* **Header Row**: Turn on if the first row of the file contains header names.
* **Sheet Name**: Enter the Sheet Name to create in the spreadsheet.

### Convert to RTF

Configure the node for this operation with the **Put Output File in Field** parameter. Enter the name of the field in the output data to contain the file.

#### Convert to RFT options

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* If the first row of the file contains header names, turn on the **Header Row** option.

### Convert to Text File

Enter the name of the **Text Input Field** that contains a string to convert to a file. Use dot-notation for deep fields, for example `level1.level2.currentKey`.

#### Convert to Text File options

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* **Encoding**: Choose the character set to use to encode the data. The default is **utf8**.

### Convert to XLS

Configure the node for this operation with the **Put Output File in Field** parameter. Enter the name of the field in the output data to contain the file.

#### Convert to XLS options

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* **Header Row**: Turn on if the first row of the file contains header names.
* **Sheet Name**: Enter the Sheet Name to create in the spreadsheet.

### Convert to XLSX

Configure the node for this operation with the **Put Output File in Field** parameter. Enter the name of the field in the output data to contain the file.

#### Convert to XLSX options

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* **Compression**: Choose whether to compress and reduce the file's output size.
* **Header Row**: Turn on if the first row of the file contains header names.
* **Sheet Name**: Enter the Sheet Name to create in the spreadsheet.

### Move Base64 String to File

Enter the name of the **Base64 Input Field** that contains the Base64 string to convert to a file. Use dot-notation for deep fields, for example `level1.level2.currentKey`.

#### Move Base64 String to File options

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* **MIME Type**: Enter the MIME type of the output file. Refer to [Common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) for a list of common MIME types and the file extensions they relate to.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'convert-to-file') ]]
