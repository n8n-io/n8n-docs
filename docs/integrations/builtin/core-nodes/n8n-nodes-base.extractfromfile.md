---
title: Extract From File
description: Documentation for the Extract From File node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: high
---

# Extract From File

A common pattern in n8n workflows is to receive a file, either from an [HTTP Request node][] (for files you are fetching from a website), a [Webhook Node][] (for files which are sent to your workflow from elsewhere), or from a local source. Data obtained in this way is often in a binary format, for example a spreadsheet or PDF.

The Extract From File node extracts data from a binary format file and converts it to JSON, which can then be easily manipulated by the rest of your workflow. For converting JSON back into a binary file type, please see the [Convert to File](/integrations/builtin/core-nodes/n8n-nodes-base.converttofile.md) node.

## Operations

Use the **Operations** drop-down to select the format of the source file to extract data from.

- **Extract From CSV**: The "Comma Separated Values" file type is commonly used for tabulated data.
- **Extract From HTML**: Extract fields from standard web page HTML format files.
- **Extract From JSON**: Extract JSON data from a binary file.
- **Extract From ICS**: Extract fields from iCalendar format files.
- **Extract From ODS**: Extract fields from ODS spreadsheet files.
- **Extract From PDF**: Extract fields from Portable Document Format files.
- **Extract From RTF**: Extract fields from Rich Text Format files.
- **Extract From Text File**: Extract fields from a standard text file format.
- **Extract From XLS**: Extract fields from a Microsoft Excel file (older format).
- **Extract From XLSX**: Extract fields from a Microsoft Excel file.
- **Move File to Base64 String**: Converts binary data to a text-friendly [base64][] format.

## Example workflow

In this example, a Webhook node is used to trigger the workflow. When a CSV file is sent to the webhook address, the file data is output and received by the Extract From File node.

[[ workflowDemo("file:///integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile/webhook-example.json") ]]

Set to operate as 'Extract from CSV', the node then outputs the data as a series of JSON 'row' objects:

```
{
  "row": {
  "0": "apple",
  "1": "1",
  "2": "2",
  "3": "3"
  }
  ...
```

/// tip | Receiving files with a webhook
Select the Webhook Node's **Add Options** button and select **Raw body**, then enable that setting to get the node to output the binary file that the subsequent node is expecting.
///

## Node parameters

### Input Binary Field

Enter the name of the field from the node input data that contains the binary file. The default is 'data'.

### Destination Output Field

Enter the name of the field in the node output that will contain the extracted data.

This parameter is only available for these operations:

- Extract From JSON
- Extract From ICS
- Extract From Text File
- Move File to Base64 String

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'extract-from-file') ]]

[HTTP Request Node]: /integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md
[Webhook Node]: /integrations/builtin/core-nodes/n8n-nodes-base.webhook/index.md
[base64]: https://datatracker.ietf.org/doc/html/rfc4648#section-4
