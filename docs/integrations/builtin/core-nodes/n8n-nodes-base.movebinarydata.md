---
title: Convert to/from binary data
description: Documentation for the Convert to/from binary data node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Convert to/from binary data

The Convert to/from binary data node is useful to move data between binary and JSON properties.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Convert to/from binary data integrations](https://n8n.io/integrations/move-binary-data/){:target=_blank .external-link} page.
///
/// note | CSV to JSON
If you need to convert an entire CSV file to JSON, use the [Spreadsheet File](/integrations/builtin/core-nodes/n8n-nodes-base.spreadsheetfile/) node.
///

## Node reference

The node provides the following parameters:

- **Mode**: choose the conversion type.
    - **Binary to JSON**
    - **JSON to Binary**
- **Set All Data**: available for **Binary to JSON** mode. If active, n8n replaces all JSON data with the data retrieved from the binary key. If it's not active, n8n writes the data to a single JSON key. 
- **Source Key**: available for **Binary to JSON** mode. The name of the binary key to get data from. You can use dot notation in keys. For example, `level1.level2.currentKey`. 
- **Destination Key**: available for **Binary to JSON** mode. The name of the JSON key to copy data to. You can use dot notation in keys. For example, `level1.level2.newKey`. 
- **Convert All Data**: available for **JSON to Binary** mode. If active n8n converts all JSON data to binary. If it's not active, n8n only converts the data specified in **Source Key**. 
	- **Source Key**: available if **Convert All Data** is inactive. The name of the JSON key to get data from. You can use dot notation in keys. For example, `level1.level2.currentKey`. 
- **Destination Key**: available for **JSON to Binary** mode. The name of the key to copy data to. You can use dot notation in keys. For example, `level1.level2.newKey`. 

### Options

- **Keep Source**: keep the source key. By default n8n deletes it.
- **Encoding**: set the encoding of the data stream.

The following options are available in **Binary to JSON** mode:

- **JSON Parse**: run JSON parse on the data to get proper object data. This field is displayed when **Set All Data** is inactive.
- **Keep As Base64**: keeps the binary data as base64 string. This field is displayed when **Set All Data** is inactive.
- **Strip BOM**: strip the byte order mark (BOM) from the string. This field is displayed when **Encoding** is selected.

The following options are available in **JSON to Binary** mode:

- **Add BOM**: add the byte order mark (BOM) to the string. This field is displayed when **Encoding** is selected.
- **File Name**: the file name to set.
- **Mime Type**: the MIME type to set. By default the JSON mime-type will be set.
- **Use Raw Data**: use data as is and don't stringify it.
- **Data is Base64**: keeps the binary data as base64 string. This field is displayed when **Convert all Data** is inactive.
