---
title: If
description: >-
  Documentation for the If node in n8n, a workflow automation platform. Includes
  guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: critical
tags:
  - if
  - if node
  - If
  - If node
hide:
  - tags
nodeTitle: If
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.if.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.if'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.if'
layout:
  description:
    visible: false
---

# If <a href="#if" id="if"></a>

Use the If node to split a workflow conditionally based on comparison operations.

## Add conditions <a href="#add-conditions" id="add-conditions"></a>

Create comparison **Conditions** for your If node.

- Use the data type dropdown to select the data type and comparison operation type for your condition. For example, to filter for dates after a particular date, select **Date & Time > is after**.
- The fields and values to enter into the condition change based on the data type and comparison you select. Refer to [Available data type comparisons](#available-data-type-comparisons) for a full list of all comparisons by data type.

Select **Add condition** to create more conditions.

### Combining conditions <a href="#combining-conditions" id="combining-conditions"></a>

You can choose to keep data:

* When it meets all conditions: Create two or more conditions and select **AND** in the dropdown between them.
* When it meets any of the conditions: Create two or more conditions and select **OR** in the dropdown between them.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse If integration templates](https://n8n.io/integrations/if) or [search all templates](https://n8n.io/workflows/)

## Branch execution with If and Merge nodes <a href="#branch-execution-with-if-and-merge-nodes" id="branch-execution-with-if-and-merge-nodes"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/o5sVhTw0cyO5aAAkAVDj/" %}

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Splitting with conditionals](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/flow-logic/split-with-conditionals) for more information on using conditionals to create complex logic in n8n.

If you need more than two conditional outputs, use the [Switch node](n8n-nodes-base.switch.md).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/bMMOCQFbQ4YpKDnWQQOg/" %}

