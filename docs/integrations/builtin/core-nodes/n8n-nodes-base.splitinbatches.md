---
title: Loop Over Items
description: Documentation for the Loop Over Items node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Loop Over Items

The Loop Over Items node helps you loop through data.

The node saves the original incoming data, and with each iteration, returns a predefined amount of data through the **loop** output.

When the node execution completes, it combines all the data and returns it through the **done** output.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Loop Over Items (Split in Batches) integrations](https://n8n.io/integrations/split-in-batches/){:target=_blank .external-link} page.
///

## Node reference

- **Batch Size**: the number of items to return with each call.
- **Options**:
    - **Reset:** if set to true, the node will reset.

/// note | Check if you need this node
n8n automatically processes incoming items. You may not need the Loop Over Items node in your workflow. To learn more about how n8n handles multiple items, refer to the documentation on [Looping in n8n](/flow-logic/looping/).
///

## Check that the node has processed all items

To check if the node still has items to process, use the following expression: `{{$node["Loop Over Items"].context["noItemsLeft"]}}`. This expression returns a boolean value. If the node still has data to process, the expression returns `false`, otherwise it returns `true`.

## Get the current running index of the node

To get the current running index of the node, use the following expression: `{{$node["Loop Over Items"].context["currentRunIndex"];}}`.

