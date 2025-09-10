---
title: If
description: Documentation for the If node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: critical
tags:
  - if
  - if node
  - If
  - If node
hide:
  - tags
---

# If

Use the If node to split a workflow conditionally based on comparison operations.

## Add conditions

Create comparison **Conditions** for your If node.

- Use the data type dropdown to select the data type and comparison operation type for your condition. For example, to filter for dates after a particular date, select **Date & Time > is after**.
- The fields and values to enter into the condition change based on the data type and comparison you select. Refer to [Available data type comparisons](#available-data-type-comparisons) for a full list of all comparisons by data type.

Select **Add condition** to create more conditions.

### Combining conditions

You can choose to keep data:

* When it meets all conditions: Create two or more conditions and select **AND** in the dropdown between them.
* When it meets any of the conditions: Create two or more conditions and select **OR** in the dropdown between them.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'if') ]]

## Branch execution with If and Merge nodes

--8<-- "_snippets/integrations/builtin/core-nodes/merge/if-merge-branch-execution.md"

## Related resources

Refer to [Splitting with conditionals](/flow-logic/splitting.md) for more information on using conditionals to create complex logic in n8n.

If you need more than two conditional outputs, use the [Switch node](/integrations/builtin/core-nodes/n8n-nodes-base.switch.md).

--8<-- "_snippets/integrations/builtin/core-nodes/data-types.md"

