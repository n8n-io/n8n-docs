---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Remove Duplicates
description: Documentation for the Remove Duplicates node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
priority: medium
---

# Remove Duplicates

Use the Remove Duplicates node to identify and delete items that are identical across all fields or a subset of fields. This is helpful in situations where you can end up with duplicate data, such as a user creating multiple accounts, or a customer submitting the same order multiple times. When working with large datasets it becomes more difficult to spot and remove these items. 

## Node parameters

* **Compare**: Select which fields of the input data n8n should compare to check if they're the same. The following options are available:
	* **All Fields**: Compares all fields of the input data.
	* **All Fields Except**: Enter which input data fields n8n should exclude from the comparison. You can provide multiple values separated by commas.
	* **Selected Fields**: Enter which input data fields n8n should include in the comparison. You can provide multiple values separated by commas.

## Node options

If you choose **All Fields Except** or **Selected Fields** as your compare type, you can add these options:

* **Disable Dot Notation**: Set whether to use dot notation to reference child fields in the format `parent.child` (turned off) or not (turn on).
* **Remove Other Fields**: Set whether to remove any fields that aren't used in the comparison (turned on) or not (turned off).

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'remove-duplicates') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/core-nodes/data-transformation-actions/data-section-link.md"
