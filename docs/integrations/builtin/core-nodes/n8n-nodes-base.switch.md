---
title: Switch
description: >-
  Documentation for the Switch node in n8n, a workflow automation platform.
  Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Switch
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.switch.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.switch'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.switch'
layout:
  description:
    visible: false
---

# Switch <a href="#switch" id="switch"></a>

Use the Switch node to route a workflow conditionally based on comparison operations. It's similar to the [IF](n8n-nodes-base.if.md) node, but supports multiple output routes.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Select the **Mode** the node should use:

* **Rules**: Select this mode to build a matching rule for each output.
* **Expression**: Select this mode to write an expression to return the output index programmatically.

Node configuration depends on the **Mode** you select.

### Rules <a href="#rules" id="rules"></a>

To configure the node with this operation, use these parameters:

* Create **Routing Rules** to define comparison conditions.
    * Use the data type dropdown to select the data type and comparison operation type for your condition. For example, to create a rules for dates after a particular date, select **Date & Time > is after**.
    * The fields and values to enter into the condition change based on the data type and comparison you select. Refer to [Available data type comparisons](#available-data-type-comparisons) for a full list of all comparisons by data type.
* **Rename Output**: Turn this control on to rename the output field to put matching data into. Enter your desired **Output Name**.

Select **Add Routing Rule** to add more rules.

#### Rule options <a href="#rule-options" id="rule-options"></a>

You can further configure the node with this operation using these **Options**:

- **Fallback Output**: Choose how to route the workflow when an item doesn't match any of the rules or conditions.
    - **None**: Ignore the item. This is the default behavior.
    - **Extra Output**: Send items to an extra, separate output.
    - **Output 0**: Send items to the same output as those matching the first rule.
- **Ignore Case**: Set whether to ignore letter case when evaluating conditions (turned on) or enforce letter case (turned off).
- **Less Strict Type Validation**: Set whether you want n8n to attempt to convert value types based on the operator you choose (turned on) or not (turned off).
- **Send data to all matching outputs**: Set whether to send data to all outputs meeting conditions (turned on) or whether to send the data to the first output matching the conditions (turned off).

### Expression <a href="#expression" id="expression"></a>

To configure the node with this operation, use these parameters:

- **Number of Outputs**: Set how many outputs the node should have.
- **Output Index**: Create an expression to calculate which input item should be routed to which output. The expression must return a number.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Switch integration templates](https://n8n.io/integrations/switch) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Splitting with conditionals](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/flow-logic/split-with-conditionals) for more information on using conditionals to create complex logic in n8n.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/bMMOCQFbQ4YpKDnWQQOg/" %}

