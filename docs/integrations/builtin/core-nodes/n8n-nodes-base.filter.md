---
title: Filter
description: >-
  Documentation for the Filter node in n8n, a workflow automation platform.
  Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Filter
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.filter.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.filter'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.filter'
layout:
  description:
    visible: false
---

# Filter <a href="#filter" id="filter"></a>

Filter items based on a condition. If the item meets the condition, the Filter node passes it on to the next node in the Filter node output. If the item doesn't meet the condition, the Filter node omits the item from its output.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Create filter comparison **Conditions** to perform your filter.

- Use the data type dropdown to select the data type and comparison operation type for your condition. For example, to filter for dates after a particular date, select **Date & Time > is after**.
- The fields and values to enter into the condition change based on the data type and comparison you select. Refer to [Available data type comparisons](#available-data-type-comparisons) for a full list of all comparisons by data type.

Select **Add condition** to create more conditions.

### Combining conditions <a href="#combining-conditions" id="combining-conditions"></a>

You can choose to keep items:

* When they meet all conditions: Create two or more conditions and select **AND** in the dropdown between them.
* When they meet any of the conditions: Create two or more conditions and select **OR** in the dropdown between them.

You can't create a mix of AND and OR rules.

## Node options <a href="#node-options" id="node-options"></a>

- **Ignore Case**: Whether to ignore letter case (turned on) or be case sensitive (turned off).
- **Less Strict Type Validation**: Whether you want n8n to attempt to convert value types based on the operator you choose (turned on) or not (turned off). Turn this on when facing a "wrong type:" error in your node.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Filter integration templates](https://n8n.io/integrations/filter) or [search all templates](https://n8n.io/workflows/)

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/3PjVgh2AU4J6dwJ4Mhay/" %}
