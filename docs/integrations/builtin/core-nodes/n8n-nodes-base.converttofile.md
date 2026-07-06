---
title: Convert to File
description: >-
  Documentation for the Convert to File node in n8n, a workflow automation
  platform. Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Convert to File
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.converttofile.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.converttofile
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.converttofile
layout:
  description:
    visible: false
---

# Convert to File <a href="#convert-to-file" id="convert-to-file"></a>

Use the Convert to File node to take input data and output it as a file. This converts the input JSON data into a binary format.

{% hint style="info" %}
**Extract From File**

To extract data from a file and convert it to JSON, use the [Extract from File](n8n-nodes-base.extractfromfile.md) node.
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

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

### Convert to CSV <a href="#convert-to-csv" id="convert-to-csv"></a>

Configure the node for this operation with the **Put Output File in Field** parameter. Enter the name of the field in the output data to contain the file.

#### Convert to CSV options <a href="#convert-to-csv-options" id="convert-to-csv-options"></a>

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* If the first row of the file contains header names, turn on the **Header Row** option.

### Convert to HTML <a href="#convert-to-html" id="convert-to-html"></a>

Configure the node for this operation with the **Put Output File in Field** parameter. Enter the name of the field in the output data to contain the file.

#### Convert to HTML options <a href="#convert-to-html-options" id="convert-to-html-options"></a>

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* If the first row of the file contains header names, turn on the **Header Row** option.

### Convert to ICS <a href="#convert-to-ics" id="convert-to-ics"></a>

* **Put Output File in Field**. Enter the name of the field in the output data to contain the file.
* **Event Title**: Enter the title for the event.
* **Start**: Enter the date and time the event will start. All-day events ignore the time.
* **End**: Enter the date and time the event will end. All-day events ignore the time. If unset, the node uses the start date.
* **All Day**: Select whether the event is an all day event (turned on) or not (turned off).

#### Convert to ICS options <a href="#convert-to-ics-options" id="convert-to-ics-options"></a>

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
* **Use Workflow Timezone**: Whether to use UTC time zone (turned off) or the workflow's timezone (turned on). Set the workflow's timezone in the [Workflow Settings](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/configure-workflow-settings).

### Convert to JSON <a href="#convert-to-json" id="convert-to-json"></a>

Choose the best output **Mode** for your needs from these options:

* **All Items to One File**: Send all input items to a single file.
* **Each Item to Separate File**: Create a file for every input item.

#### Convert to JSON options <a href="#convert-to-json-options" id="convert-to-json-options"></a>

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* **Format**: Choose whether to format the JSON for easier reading (turned on) or not (turned off).
* **Encoding**: Choose the character set to use to encode the data. The default is **utf8**.

### Convert to ODS <a href="#convert-to-ods" id="convert-to-ods"></a>

Configure the node for this operation with the **Put Output File in Field** parameter. Enter the name of the field in the output data to contain the file.

#### Convert to ODS options <a href="#convert-to-ods-options" id="convert-to-ods-options"></a>

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* **Compression**: Choose whether to compress and reduce the file's output size.
* **Header Row**: Turn on if the first row of the file contains header names.
* **Sheet Name**: Enter the Sheet Name to create in the spreadsheet.

### Convert to RTF <a href="#convert-to-rtf" id="convert-to-rtf"></a>

Configure the node for this operation with the **Put Output File in Field** parameter. Enter the name of the field in the output data to contain the file.

#### Convert to RFT options <a href="#convert-to-rft-options" id="convert-to-rft-options"></a>

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* If the first row of the file contains header names, turn on the **Header Row** option.

### Convert to Text File <a href="#convert-to-text-file" id="convert-to-text-file"></a>

Enter the name of the **Text Input Field** that contains a string to convert to a file. Use dot-notation for deep fields, for example `level1.level2.currentKey`.

#### Convert to Text File options <a href="#convert-to-text-file-options" id="convert-to-text-file-options"></a>

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* **Encoding**: Choose the character set to use to encode the data. The default is **utf8**.

### Convert to XLS <a href="#convert-to-xls" id="convert-to-xls"></a>

Configure the node for this operation with the **Put Output File in Field** parameter. Enter the name of the field in the output data to contain the file.

#### Convert to XLS options <a href="#convert-to-xls-options" id="convert-to-xls-options"></a>

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* **Header Row**: Turn on if the first row of the file contains header names.
* **Sheet Name**: Enter the Sheet Name to create in the spreadsheet.

### Convert to XLSX <a href="#convert-to-xlsx" id="convert-to-xlsx"></a>

Configure the node for this operation with the **Put Output File in Field** parameter. Enter the name of the field in the output data to contain the file.

#### Convert to XLSX options <a href="#convert-to-xlsx-options" id="convert-to-xlsx-options"></a>

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* **Compression**: Choose whether to compress and reduce the file's output size.
* **Header Row**: Turn on if the first row of the file contains header names.
* **Sheet Name**: Enter the Sheet Name to create in the spreadsheet.

### Move Base64 String to File <a href="#move-base64-string-to-file" id="move-base64-string-to-file"></a>

Enter the name of the **Base64 Input Field** that contains the Base64 string to convert to a file. Use dot-notation for deep fields, for example `level1.level2.currentKey`.

#### Move Base64 String to File options <a href="#move-base64-string-to-file-options" id="move-base64-string-to-file-options"></a>

You can also configure this operation with these **Options**:

* **File Name**: Enter the file name for the generated output file.
* **MIME Type**: Enter the MIME type of the output file. Refer to [Common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) for a list of common MIME types and the file extensions they relate to.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Convert to File integration templates](https://n8n.io/integrations/convert-to-file) or [search all templates](https://n8n.io/workflows/)
