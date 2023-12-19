---
title: Summarize
description: Documentation for the Summarize node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Summarize

Use the Summarize node to aggregate items together, in a manner similar to Excel pivot tables.

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Summarize integrations](https://n8n.io/integrations/summarize/){:target=_blank .external-link} page.
///

## Node parameters

* **Fields to Summarize**: 
	* To combine values, select an **Aggregation** method, and enter a **Field** name.
	* To split values, enter a field name or list of names in **Fields to Split By**.
* **Options** > **Add Field**: use this to add more optional settings, including:
	* **Disable Dot Notation**: when disabled, you can't reference child fields (in the format `parent.child`).
	* **Output Format**:
		* **Each Split in a Separate Item**: splitting generates a separate output item for each split out field.
		* **All Splits in a Single Item**: splitting generates a single item, which lists the split out fields.
	* **Ignore items without valid fields to group by**: ignore input items that don't contain the field specified in **Fields to Summarize**.


## Related resources

View [example workflows and related content](https://n8n.io/integrations/summarize/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/core-nodes/data-transformation-actions/data-section-link.md"
