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

## Troubleshooting: accented characters arrive as ? or Ã© <a href="#troubleshooting-accents" id="troubleshooting-accents"></a>

The CSV parser decodes incoming bytes as UTF-8. A file saved by Excel on a Windows machine in a legacy
code page - Windows-1250 for Central and Eastern Europe, Windows-1252 for Western Europe - isn't valid
UTF-8, so a name like `Đorđe Milošević` arrives as `?or?e Milo?evi?` or `ÃorÃ°e MiloÅ¡eviÄ`.

The node's **Encoding** option lists UTF-8, UTF-16 LE/BE and Latin-1 only. Latin-1 has no `Đ`, `ć`, `Š`
or `ž`, so it can't represent these files either - the option changes the decoder, but the characters it
would produce don't exist in that code page.

Fix it by decoding the bytes yourself, in a Code node set to **Run Once for All Items** placed *before*
Extract From File, then handing the parser clean UTF-8:

```js
const bytes = await this.helpers.getBinaryDataBuffer(0, 'data');
const text = new TextDecoder('windows-1250').decode(bytes);

return [{
  json: {},
  binary: {
    data: await this.helpers.prepareBinaryData(
      Buffer.from(text, 'utf8'),
      'decoded.csv',
      'text/csv',
    ),
  },
}];
```

Use `windows-1252` for Western European exports, `iso-8859-2` for some Hungarian and Romanian ones, and
`windows-1251` for Cyrillic. Extract From File can then run unchanged, because the binary it receives is
valid UTF-8.

{% hint style="info" %}
**Checking a file without opening an editor**

`new TextDecoder('utf-8', { fatal: true })` throws on invalid bytes and decodes cleanly on valid ones.
Decoding the same buffer with ``fatal: true`` is the quickest way to tell an encoding problem from a
delimiter or header problem: if it throws, the file is not UTF-8 and no CSV setting will fix it.
{% endhint %}

If characters come back as `?` after decoding, the original bytes carried no information for them (some
exporters replace unsupported characters before writing the file). Re-export from the source system with
UTF-8 selected - decoding can't restore what was already discarded.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Extract From File integration templates](https://n8n.io/integrations/extract-from-file) or [search all templates](https://n8n.io/workflows/)

[HTTP Request Node]: n8n-nodes-base.httprequest/README.md
[Webhook Node]: n8n-nodes-base.webhook/README.md
[base64]: https://datatracker.ietf.org/doc/html/rfc4648#section-4
