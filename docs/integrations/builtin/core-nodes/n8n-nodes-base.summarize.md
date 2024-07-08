---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Summarize
description: Documentation for the Summarize node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Summarize

Use the Summarize node to aggregate items together, in a manner similar to Excel pivot tables.

## Node parameters

* **Fields to Summarize**: 
	* To combine values, select an **Aggregation** method and enter a **Field** name.
	* To split values, enter a field name or list of names in **Fields to Split By**. For a list of names, enter a comma-separated list.

## Node options

* **Continue if Field Not Found**: By default, if a field to summarize can't be found in any items, the node throws an error. Use this option to continue and return a single empty item (turned on) instead or keep the default error behavior (turned off).
* **Disable Dot Notation**: By default, n8n enables dot notation to reference child fields in the format `parent.child`. Use this option to disable dot notation (turned on) or to continue using dot (turned off).
* **Output Format**:
	* **Each Split in a Separate Item**: Use this option to generate a separate output item for each split out field.
	* **All Splits in a Single Item**: Use this option to generate a single item that lists the split out fields.
* **Ignore items without valid fields to group by**: Set whether to ignore input items that don't contain the field specified in **Fields to Summarize** (turned on) or not (turned off).

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'summarize') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/core-nodes/data-transformation-actions/data-section-link.md"
