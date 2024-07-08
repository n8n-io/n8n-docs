---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Aggregate
description: Documentation for the Aggregate node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Aggregate

Use the Aggregate node to take separate items, or portions of them, and group them together into individual items.


///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Aggregate integrations](https://n8n.io/integrations/aggregate/){:target=_blank .external-link} page.
///

## Node parameters

To begin using the node, select the **Aggregate** you'd like to use. Choose whether to aggregate **Individual Fields** or **All Item Data**. The rest of the parameters depend on which Aggregate you select.

### Individual Fields parameters

* **Input Field Name**: Enter the name of the field in the input data to aggregate together.
* **Rename Field**: This toggle controls whether to give the field a different name in the aggregated output data. Turn this on to add a different field name. If you're aggregating multiple fields, you must provide new output field names. You can't leave multiple fields undefined.
	* **Output Field Name**: This field is displayed when you turn on **Rename Field**. Enter the field name for the aggregated output data.

### All Item Data parameters

* **Put Output in Field**: Enter the name of the field to output the data in.
* **Include**: Select which fields to include in the output. Choose from:
	* **All fields**: The output includes data from all fields with no further parameters.
	* **Specified Fields**: If you select this option, enter a comma-separated list of fields the output should include data from in the **Fields To Include** parameter. The output will include only the fields in this list.
	* **All Fields Except**: If you select this option, enter a comma-separated list of fields the output should exclude data from in the **Fields To Exclude** parameter. The output will include all fields not in this list.

## Node options

* **Add Field**: Use this option to add more settings, including:
	* **Disable Dot Notation**: The node displays this toggle when you select the **Individual Fields** Aggregate. It controls whether to disallow referencing child fields using `parent.child` in the field name (turned on), or allow it (turned off, default).
	* **Merge Lists**: The node displays this toggle when you select the **Individual Fields** Aggregate. Turn it on if the field to aggregate is a list and you want to output a single flat list rather than a list of lists.
	* **Include Binaries**: The node displays this toggle for both Aggregate types. Turn it on if you want to include binary data from the input in the new output.
	* **Keep Missing And Null Values**: The node displays this toggle when you select the **Individual Fields** Aggregate. Turn it on to add a null (empty) entry in the output list when there is a null or missing value in the input. If turned off, the output ignores null or empty values.



## Related resources

View [example workflows and related content](https://n8n.io/integrations/aggregate/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/core-nodes/data-transformation-actions/data-section-link.md"
