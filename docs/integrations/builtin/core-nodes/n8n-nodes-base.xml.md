---
title: XML
description: Documentation for the XML node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# XML

The XML node is useful to convert data from and to XML.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [XML integrations](https://n8n.io/integrations/xml/){:target=_blank .external-link} page.
///

## Node Reference

- **Mode:** The format the data should be converted from and to.
	- **JSON to XML:** Converts data from JSON to XML
    - **XML to JSON:** Converts data from XML to JSON
- **Property Name:** The name of the property which contains the data to convert. 
- **Options**
	- **Allow Surrogate Chars:** Allows using characters from the Unicode surrogate blocks. This field is displayed when 'JSON to XML' is selected from the **Mode** dropdown list.
    - **cdata:**  Wrap text nodes instead of escaping when necessary. This field is displayed when 'JSON to XML' is selected from the **Mode** dropdown list.
    - **Headless:** Omit the XML header. This field is displayed when 'JSON to XML' is selected from the **Mode** dropdown list.
    - **Root Name:** Root element name to be used. This field is displayed when 'JSON to XML' is selected from the **Mode** dropdown list.
    - **Explicit Array:** Always put child nodes in an array if true; otherwise an array is created. This field is displayed when 'XML to JSON' is selected from the **Mode** dropdown list.
    - **Explicit Root:** Set this if you want to get the root node in the resulting object. This field is displayed when 'XML to JSON' is selected from the **Mode** dropdown list.
    - **Ignore Attributes:** Ignore all XML attributes and only create text nodes. This field is displayed when 'XML to JSON' is selected from the **Mode** dropdown list.
    - **Merge Attributes:** Merge attributes and child elements as properties of the parent, instead of keying attributes off a child attribute object. This option is ignored if 'Ignore Attribute' is true. This field is displayed when 'XML to JSON' is selected from the **Mode** dropdown list.
    - **Normalize:** Trim whitespaces inside the text nodes. This field is displayed when 'XML to JSON' is selected from the **Mode** dropdown list.
    - **Normalize Tags:** Normalize all tag names to lowercase. This field is displayed when 'XML to JSON' is selected from the **Mode** dropdown list.
    - **Trim:** Trim the whitespace at the beginning and end of text nodes. This field is displayed when 'XML to JSON' is selected from the **Mode** dropdown list.
    - **Attribute Key:** Prefix that's used to access the attributes.
    - **Character Key:** Prefix that's used to access the character content.
