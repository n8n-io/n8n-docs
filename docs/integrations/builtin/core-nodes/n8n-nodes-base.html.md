---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: HTML
description: Documentation for the HTML node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
priority: high
---

# HTML

The HTML node provides operations to help you work with HTML in n8n.

/// note | HTML Extract node
The HTML node replaces the HTML Extract node from version 0.213.0 on. If you're using an older version of n8n, you can still view the [HTML Extract node documentation](https://github.com/n8n-io/n8n-docs/blob/86fe33b681621e618e3adcab9a27e8605dbc23ad/docs/integrations/builtin/core-nodes/n8n-nodes-base.htmlextract.md){:target=_blank .external-link}.
///
/// warning | Cross-site scripting
When using the HTML node to generate an HTML template you can introduce [XSS (cross-site scripting)](https://owasp.org/www-community/attacks/xss/){:target=_blank .external-link}. This is a security risk. Be careful with un-trusted inputs.
///

## Operations

* [**Generate HTML template**](#generate-html-template): Use this operation to create an HTML template. This allows you to take data from your workflow and output it as HTML.
* [**Extract HTML content**](#extract-html-content): Extract contents from an HTML-formatted source. The source can be in JSON or a binary file (`.html`).
* [**Convert to HTML Table**](#convert-to-html-table): Convert content to an HTML table.

The node parameters and options depend on the operation you select. Refer to the sections below for more details on configuring each operation.

## Generate HTML template

Create an HTML template. This allows you to take data from your workflow and output it as HTML. 

You can include:

* Standard HTML
* CSS in `<style>` tags.
* JavaScript in `<script>` tags. n8n doesn't execute the JavaScript.
* Expressions, wrapped in `{{}}`.

You can use [Expressions](/code/expressions/) in the template, including n8n's [Built-in methods and variables](/code/builtin/overview/). 

## Extract HTML Content

Extract contents from an HTML-formatted source. The source can be in JSON or a binary file (`.html`).

Use these parameters:

### Source Data

Select the source type for your HTML content. Choose between:

* **JSON**: If you select this source data, enter the **JSON Property**: the name of the input containing the HTML you want to extract. The property can contain a string or an array of strings.
* **Binary**: If you select this source data, enter the **Input Binary Field**: the name of the input containing the HTML you want to extract. The property can contain a string or an array of strings.

### Extraction Values

- **Key**: Enter the key to save the extracted value under.
- **CSS Selector**: Enter the CSS selector to search for.
- **Return Value**: Select the type of data to return. Choose from:
	- **Attribute**: Return an attribute value like `class` from an element.
		- If you select this option, enter the name of the **Attribute** to return the value of.
	- **HTML**: Return the HTML that the element contains.
	- **Text**: Return the text content of the element.
		- If you choose this option, you can also enter a comma-separated list of selectors to skip in the **Skip Selectors**.
	- **Value**: Return the value of an input, select, or text area.
- **Return Array**: Choose whether to return multiple extraction values as an array (turned on) or as a single string (turned off).

### Extract HTML Content options

You can also configure this operation with these options:

* **Trim Values**: Controls whether to remove all spaces and newlines from the beginning and end of the values (turned on) or leaves them (turned off).
* **Clean Up Text**: Controls whether to remove leading whitespaces, trailing whitespaces, and line breaks (newlines) and condense multiple consecutive whitespaces into a single space (turned on) or to leave them as-is (turned off).

## Convert to HTML Table

This operation expects data from another node. It has no parameters. It includes these options:

* **Capitalize Headers**: Controls whether to capitalize the table's headers (turned on) or not (turned off).
* **Custom Styling**: Controls whether to use custom styling (turned on) or not (turned off).
* **Caption**: Enter a caption to add to the table.
* **Table Attributes**: Enter any attributes to apply to the `<table>`, such as style attributes.
* **Header Attributes**: Enter any attributes to apply to the table's headers `<th>`.
* **Row Attributes**: Enter any attributes to apply to the table's rows `<tr>`.
* **Cell Attributes**: Enter any attributes to apply to the table's cells `<td>`.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'html') ]]
