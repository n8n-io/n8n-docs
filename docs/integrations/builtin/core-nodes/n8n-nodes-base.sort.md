---
title: Sort
description: Documentation for the Sort node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Sort

Use the Sort node to organize lists of items in a desired ordering, or generate a random selection.

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Sort integrations](https://n8n.io/integrations/sort/){:target=_blank .external-link} page.
///

/// note | Array sort behavior
The Sort operation uses the default JavaScript operation where the elements to be sorted are converted into strings and their values compared. Refer to [Mozilla's guide to Array sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort){:target=_blank .external-link} to learn more.
///

## Node parameters

* **Type**: use the dropdown to select how you want to input the sorting. The following options are available:
	* **Simple**: when selected, you can use the **Add Field To Sort By** button to input the fields, and select whether to use **Ascending** or **Descending** order.
	* **Random**: select to create a random order in the list.
	* **Code**: when selected, displays a code input field where you can enter custom JavaScript code to perform the sort operation.
* **Options** > **Add Field**: use this to add more optional settings, including:
	* **Disable Dot Notation**: when disabled, you can't reference child fields (in the format `parent.child`).

## Related resources

View [example workflows and related content](https://n8n.io/integrations/sort/){:target=_blank .external-link} on n8n's website.

--8<-- "_snippets/integrations/builtin/core-nodes/data-transformation-actions/data-section-link.md"
