---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Filter
description: Documentation for the Filter node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
priority: critical
---

# Filter

Filter items based on a condition. If the item meets the condition, the Filter node passes it on to the next node in the Filter node output. If the item doesn't meet the condition, the Filter node omits the item from its output.

## Node parameters

Create filter comparison **Conditions** to perform your filter.

- Use the data type dropdown to select the data type and comparison operation type for your condition. For example, to filter for dates after a particular date, select **Date & Time > is after**.
- The fields and values to enter into the condition change based on the data type and comparison you select. Refer to [Available data type comparisons](#available-data-type-comparisons) for a full list of all comparisons by data type.

Select **Add condition** to create more conditions.

### Combining conditions

You can choose to keep items:

* When they meet all conditions: Create two or more conditions and select **AND** in the dropdown between them.
* When they meet any of the conditions: Create two or more conditions and select **OR** in the dropdown between them.

You can't create a mix of AND and OR rules.

## Node options

- **Ignore Case**: Whether to ignore letter case (turned on) or be case sensitive (turned off).
- **Less Strict Type Validation**: Whether you want n8n to attempt to convert value types based on the operator you choose (turned on) or not (turned off). Turn this on when facing a "wrong type:" error in your node.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'filter') ]]

--8<-- "_snippets/integrations/builtin/core-nodes/data-types.md"
