---
title: Aggregate
description: >-
  Documentation for the Aggregate node in n8n, a workflow automation platform.
  Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Aggregate
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.aggregate.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.aggregate'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.aggregate'
layout:
  description:
    visible: false
---

# Aggregate <a href="#aggregate" id="aggregate"></a>

Use the Aggregate node to take separate items, or portions of them, and group them together into individual items.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

To begin using the node, select the **Aggregate** you'd like to use:

* [**Individual Fields**](#individual-fields): Aggregate individual fields separately.
* [**All Item Data**](#all-item-data): Aggregate all item data into a single list.

### Individual Fields <a href="#individual-fields" id="individual-fields"></a>

* **Input Field Name**: Enter the name of the field in the input data to aggregate together.
* **Rename Field**: This toggle controls whether to give the field a different name in the aggregated output data. Turn this on to add a different field name. If you're aggregating multiple fields, you must provide new output field names. You can't leave multiple fields undefined.
	* **Output Field Name**: This field is displayed when you turn on **Rename Field**. Enter the field name for the aggregated output data.

Refer to [Node options](#node-options) for more configuration options.

### All Item Data <a href="#all-item-data" id="all-item-data"></a>

* **Put Output in Field**: Enter the name of the field to output the data in.
* **Include**: Select which fields to include in the output. Choose from:
	* **All fields**: The output includes data from all fields with no further parameters.
	* **Specified Fields**: If you select this option, enter a comma-separated list of fields the output should include data from in the **Fields To Include** parameter. The output will include only the fields in this list.
	* **All Fields Except**: If you select this option, enter a comma-separated list of fields the output should exclude data from in the **Fields To Exclude** parameter. The output will include all fields not in this list.

Refer to [Node options](#node-options) for more configuration options.

## Node options <a href="#node-options" id="node-options"></a>

You can further configure this node using these **Options**:

* **Disable Dot Notation**: The node displays this toggle when you select the **Individual Fields** Aggregate. It controls whether to disallow referencing child fields using `parent.child` in the field name (turned on), or allow it (turned off, default).
* **Merge Lists**: The node displays this toggle when you select the **Individual Fields** Aggregate. Turn it on if the field to aggregate is a list and you want to output a single flat list rather than a list of lists.
* **Include Binaries**: The node displays this toggle for both Aggregate types. Turn it on if you want to include binary data from the input in the new output.
* **Keep Missing And Null Values**: The node displays this toggle when you select the **Individual Fields** Aggregate. Turn it on to add a null (empty) entry in the output list when there is a null or missing value in the input. If turned off, the output ignores null or empty values.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Aggregate integration templates](https://n8n.io/integrations/aggregate) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/cwTNoDWbZP8wpyeUSTd9/" %}
