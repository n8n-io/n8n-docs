---
title: Remove Duplicates
description: Documentation for the Remove Duplicates node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Remove Duplicates

Use the Remove Duplicates node to identify items that are identical across all fields or a subset of fields. This is helpful in situations where you can end up with duplicate data, such as a user creating multiple accounts, or a customer submitting the same order multiple times. When working with large datasets it becomes more difficult to spot and remove these items. 

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Remove Duplicates integrations](https://n8n.io/integrations/remove-duplicates/){:target=_blank .external-link} page.
///

## Node parameters

* **Compare**: specify which fields of the input data n8n should compare to check if they're the same. The following options are available:
  * **All Fields**: compares all fields of the input data.
  * **All Fields Except**: enter which input data fields n8n should exclude from the comparison. You can provide multiple values separated by commas.
  * **Selected Fields**: enter which input data fields n8n should include in the comparison. You can provide multiple values separated by commas.
* If you choose **All Fields Except** or **Selected Fields**, n8n displays **Options** > **Add Field**. Use this to add more optional settings, including:
	* **Disable Dot Notation**: when disabled, you can't reference child fields (in the format `parent.child`).
	* **Remove Other Fields**: keep the fields that you're comparing and remove the others.


## Related resources

View [example workflows and related content](https://n8n.io/integrations/remove-duplicates/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/core-nodes/data-transformation-actions/data-section-link.md"
