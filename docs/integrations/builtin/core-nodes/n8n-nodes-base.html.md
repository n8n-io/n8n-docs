---
title: HTML
description: Documentation for the HTML node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# HTML

The HTML node provides operations to help you work with HTML in n8n.

/// note | HTML Extract node
The HTML node replaces the HTML Extract node from version 0.213.0 on. If you're using an older version of n8n, you can still view the [HTML Extract node documentation](https://github.com/n8n-io/n8n-docs/blob/86fe33b681621e618e3adcab9a27e8605dbc23ad/docs/integrations/builtin/core-nodes/n8n-nodes-base.htmlextract.md){:target=_blank .external-link}.
///
/// warning | Cross-site scripting
When using the HTML node to generate an HTML template you can introduce [XSS (cross-site scripting)](https://owasp.org/www-community/attacks/xss/){:target=_blank .external-link}. This is a security risk. Be careful with un-trusted inputs.
///
/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [HTML integrations](https://n8n.io/integrations/html/){:target=_blank .external-link} page.
///

## Operations

* Generate HTML template
* Extract HTML content

## Related resources

View [example workflows and related content](https://n8n.io/integrations/html/){:target=_blank .external-link} on n8n's website.

## Generate HTML template

Create an HTML template. This allows you to take data from your workflow and output it as HTML. You can use [Expressions](/code/expressions/) in the template, including n8n's [Built-in methods and variables](/code/builtin/)

You can include:

* Standard HTML
* CSS in `<style>` tags.
* JavaScript in `<script>` tags. n8n doesn't execute the JavaScript.
* Expressions, wrapped in `{{}}`.

## Extract HTML Content

Extract contents from an HTML-formatted source. The source can be in JSON, or a binary file (`.html`).

- **Source Data**: choose the source type, JSON or binary.
- **JSON Property** or **Binary Property**: the name of the input containing the HTML you want to extract. The property can either contain a string or an array of strings.
- **Extraction Values:**
	- **Key**: the key to save the extracted value under.
	- **CSS Selector**: the CSS selector to search for.
	- **Return Value**: the data to return. In this dropdown list there are four options.
		- **Attribute**: get an attribute value like 'class' from an element.
			- **Attribute**: the name of the attribute to return the value of.
		- **HTML**: get the HTML that the element contains.
		- **Text**: get the text content of the element.
		- **Value**: get the value of an input, select, or text area.
	- **Return Array**: returns the values as an array so that if n8n finds multiple values, it returns them as individual items in an array. If you don't set this, n8n returns all values as a single string.
- **Options**:
	- **Trim Values**: removes all spaces and newlines from the beginning and end of the values.









