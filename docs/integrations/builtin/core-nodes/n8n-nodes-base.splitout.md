---
title: Split Out
description: Documentation for the Split Out node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Split Out

Use the Split Out node to separate a single data item containing a list into multiple items. For example, a list of customers, and you want to split them so that you have an item for each customer.

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Split Out integrations](https://n8n.io/integrations/split-out/){:target=_blank .external-link} page.
///

## Node parameters

* **Field to Split Out**: the field containing the list you want to separate out into individual items.
	* If working with binary data inputs, use `$binary` in an expression to set the field to split out.
* **Include**: select if you want n8n to keep any other fields from the input data with each new individual item. You can select:
    * **No Other Fields**
    * **All Other Fields**
    * **Selected Other Fields**: when selected, n8n displays **Fields to Include**. Enter a comma separated list of desired fields.
	* **Options** > **Add Field**: use this to add more optional settings, including:
		* **Disable Dot Notation**: when disabled, you can't reference child fields (in the format `parent.child`).	
		* **Destination Field Name**: optionally set the field name under which to put the new split contents.
		* **Include Binary**: include binary data from the input in the new output.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/split-out/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/core-nodes/data-transformation-actions/data-section-link.md"
