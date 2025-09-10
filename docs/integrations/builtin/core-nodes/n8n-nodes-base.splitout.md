---
title: Split Out
description: Documentation for the Split Out node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: high
---

# Split Out

Use the Split Out node to separate a single data item containing a list into multiple items. For example, a list of customers, and you want to split them so that you have an item for each customer.

## Node parameters

Configure this node using the following parameters.

### Field to Split Out

Enter the field containing the list you want to separate out into individual items.

If you're working with binary data inputs, use `$binary` in an expression to set the field to split out.

### Include

Select whether and how you want n8n to keep any other fields from the input data with each new individual item.

You can select:

* **No Other Fields**: No other fields will be included.
* **All Other Fields**: All other fields will be included.
* **Selected Other Fields**: Only the selected fields will be included.
    * **Fields to Include**: Enter a comma separated list of the fields you want to include.

## Node options

### Disable Dot Notation

By default, n8n enables dot notation to reference child fields in the format `parent.child`. Use this option to disable dot notation (turned on) or to continue using dot (turned off).

### Destination Field Name

Enter the field in the output where the split field contents should go.

### Include Binary

Choose whether to include binary data from the input in the new output (turned on) or not (turned off).

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'split-out') ]]

## Related resources

--8<-- "_snippets/integrations/builtin/core-nodes/data-transformation-actions/data-section-link.md"
