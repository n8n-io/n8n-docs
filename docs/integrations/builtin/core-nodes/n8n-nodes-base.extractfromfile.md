---
title: Extract From File
description: >-
  Documentation for the Extract From File node in n8n, a workflow automation
  platform. Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Extract From File
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile
layout:
  description:
    visible: false
---

# Extract From File <a href="#extract-from-file" id="extract-from-file"></a>

A common pattern in n8n workflows is to receive a file, either from an [HTTP Request node][] (for files you are fetching from a website), a [Webhook Node][] (for files which are sent to your workflow from elsewhere), or from a local source. Data obtained in this way is often in a binary format, for example a spreadsheet or PDF.

The Extract From File node extracts data from a binary format file and converts it to JSON, which can then be easily manipulated by the rest of your workflow. For converting JSON back into a binary file type, please see the [Convert to File](n8n-nodes-base.converttofile.md) node.

## Operations <a href="#operations" id="operations"></a>

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

## Example workflow <a href="#example-workflow" id="example-workflow"></a>

In this example, a Webhook node is used to trigger the workflow. When a CSV file is sent to the webhook address, the file data is output and received by the Extract From File node.

{% @n8n-blocks/n8n-workflow-demo content="%7B%0A%20%20%22name%22%3A%20%22Extract%20from%20file%20example%22%2C%0A%20%20%22nodes%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22httpMethod%22%3A%20%22POST%22%2C%0A%20%20%20%20%20%20%20%20%22path%22%3A%20%2206696ea7-9dc7-464a-873b-3feb095b0874%22%2C%0A%20%20%20%20%20%20%20%20%22options%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22rawBody%22%3A%20true%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.webhook%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%202%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20-380%2C%0A%20%20%20%20%20%20%20%20-80%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22dfbd51af-6050-47c5-a26c-74cba77f65f7%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22Webhook%22%2C%0A%20%20%20%20%20%20%22webhookId%22%3A%20%2206696ea7-9dc7-464a-873b-3feb095b0874%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22options%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22headerRow%22%3A%20false%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.extractFromFile%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20-160%2C%0A%20%20%20%20%20%20%20%20-80%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%221b1e4643-8269-402b-83af-dfd90fd6a0b5%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22Extract%20from%20File%22%0A%20%20%20%20%7D%0A%20%20%5D%2C%0A%20%20%22pinData%22%3A%20%7B%7D%2C%0A%20%20%22connections%22%3A%20%7B%0A%20%20%20%20%22Webhook%22%3A%20%7B%0A%20%20%20%20%20%20%22main%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22Extract%20from%20File%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22main%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%20%20%22active%22%3A%20true%2C%0A%20%20%22settings%22%3A%20%7B%0A%20%20%20%20%22executionOrder%22%3A%20%22v1%22%0A%20%20%7D%2C%0A%20%20%22versionId%22%3A%20%22dd2bf7f1-692a-41a8-9c2e-7931de57fa13%22%2C%0A%20%20%22meta%22%3A%20%7B%0A%20%20%20%20%22instanceId%22%3A%20%221060f46e51fc7902c377ab29d7cbfb87696ddf6b3c5c27cbbb65c3cb36e21baf%22%0A%20%20%7D%2C%0A%20%20%22id%22%3A%20%229i3iDZf5MpjlJ2sh%22%2C%0A%20%20%22tags%22%3A%20%5B%5D%0A%7D" url="https://raw.githubusercontent.com/n8n-io/n8n-docs/refs/heads/main/docs/_workflows/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile/webhook-example.json" %}

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

{% hint style="info" %}
**Receiving files with a webhook**

Select the Webhook Node's **Add Options** button and select **Raw body**, then enable that setting to get the node to output the binary file that the subsequent node is expecting.
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Input Binary Field <a href="#input-binary-field" id="input-binary-field"></a>

Enter the name of the field from the node input data that contains the binary file. The default is 'data'.

### Destination Output Field <a href="#destination-output-field" id="destination-output-field"></a>

Enter the name of the field in the node output that will contain the extracted data.

This parameter is only available for these operations:

- Extract From JSON
- Extract From ICS
- Extract From Text File
- Move File to Base64 String

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Extract From File integration templates](https://n8n.io/integrations/extract-from-file) or [search all templates](https://n8n.io/workflows/)

[HTTP Request Node]: /integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md
[Webhook Node]: /integrations/builtin/core-nodes/n8n-nodes-base.webhook/index.md
[base64]: https://datatracker.ietf.org/doc/html/rfc4648#section-4
