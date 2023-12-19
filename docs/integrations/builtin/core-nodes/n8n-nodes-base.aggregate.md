---
title: Aggregate
description: Documentation for the Aggregate node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Aggregate

Use the Aggregate node to take separate items, or portions of them, and group them together into individual items.


///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Aggregate integrations](https://n8n.io/integrations/aggregate/){:target=_blank .external-link} page.
///

## Node parameters

* **Aggregate**: choose whether to aggregate **Individual Fields** or **All Item Data**.
* If you choose **Individual Fields**, you can then configure the fields you want to aggregate with the following parameters:
	* **Input Field Name**: the name of the field in the input data to be aggregated together.
	* **Rename Field**: enable this toggle to enter a field name for the aggregated output data. When aggregating multiple fields you must provide new output field names. You can't leave multiple fields undefined.
	* **Output Field Name**: displayed when you enable **Rename Field**. The field name for the aggregated output data.
	* **Options** > **Add Field**: use this to add more optional settings, including:
		* **Disable Dot Notation**: when disabled, you can't reference child fields (in the format `parent.child`).
		* **Merge Lists**: enable this if the field to aggregate is a list, and you want to output a single flat list rather than a list of lists.
		* **Include Binaries**: include binary data from the input in the new output.
		* **Keep Missing And Null Values**: enable this to add a null (empty) entry in the output list when there is a null or missing value in the input.
* If you choose **All Item Data**, you can then set:
	* **Put Output in Field**: the name of the output field.
	* **Include**: choose from **All fields**, **Specified Fields**, or **All Fields Except**.
	* **Options** > **Add Field**: use this to add the setting:
		* **Include Binaries**: include binary data from the input in the new output.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/aggregate/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/core-nodes/data-transformation-actions/data-section-link.md"
