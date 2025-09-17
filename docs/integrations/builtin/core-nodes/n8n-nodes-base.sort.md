---
title: Sort
description: Documentation for the Sort node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: medium
---

# Sort

Use the Sort node to organize lists of items in a desired ordering, or generate a random selection.

/// note | Array sort behavior
The Sort operation uses the default JavaScript operation where the elements to be sorted are converted into strings and their values compared. Refer to [Mozilla's guide to Array sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) to learn more.
///

## Node parameters

Configure this node using the **Type** parameter.

Use the dropdown to select how you want to input the sorting from these options.

### Simple

Performs an ascending or descending sort using the selected fields.

When you select this **Type**:

* Use the **Add Field To Sort By** button to input the **Field Name**.
* Select whether to use **Ascending** or **Descending** order.

#### Simple options

When you select **Simple** as the **Type**, you have the option to **Disable Dot Notation**. By default, n8n enables dot notation to reference child fields in the format `parent.child`. Use this option to disable dot notation (turned on) or to continue using dot (turned off).

### Random

Creates a random order in the list.

### Code

Input custom JavaScript code to perform the sort operation. This is a good option if a simple sort won't meet your needs.

Enter your custom JavaScript code in the **Code** input field.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'sort') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/core-nodes/data-transformation-actions/data-section-link.md"
