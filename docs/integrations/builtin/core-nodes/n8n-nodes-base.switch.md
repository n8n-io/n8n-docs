---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Switch
description: Documentation for the Switch node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Switch

Use the Switch node to route a workflow conditionally based on comparison operations. It's similar to the [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if/) node, but supports multiple output routes.

## Node parameters

Select the **Mode** the node should use:

* **Rules**: Select this mode to build a matching rule for each output.
* **Expression**: Select this mode to write an expression to return the output index programmatically.

Further parameters depend on the mode you select.

### Rules parameters

* Create **Routing Rules** to define comparison conditions.
    * Use the data type dropdown to select the data type and comparison operation type for your condition. For example, to create a rules for for dates after a particular date, select **Date & Time > is after**.
    * The fields and values to enter into the condition change based on the data type and comparison you select.
* **Rename Output**: Turn this control on to rename the output field to put matching data into. Enter your desired **Output Name**.

Select **Add Routing Rule** to add more rules.

#### Available data type comparisons

- **String**
    - exists
    - does not exist
    - is empty
    - is not empty
    - is equal to
    - is not equal to
    - contains
    - does not contain
    - starts with
    - does not start with
    - ends with
    - does not end with
    - matches regex
    - does not match regex
- **Number**
    - exists
    - does not exist
    - is empty
    - is not empty
    - is equal to
    - is not equal to
    - is greater than
    - is less than
    - is greater than or equal to
    - is less than or equal to
- **Date & Time**
    - exists
    - does not exist
    - is empty
    - is not empty
    - is equal to
    - is not equal to
    - is after
    - is before
    - is after or equal to
    - is before or equal to
- **Boolean**
    - exists
    - does not exist
    - is empty
    - is not empty
    - is true
    - is false
    - is equal to
    - is not equal to
- **Array**
    - exists
    - does not exist
    - is empty
    - is not empty
    - contains
    - does not contain
    - length equal to
    - length not equal to
    - length greater than
    - length less than
    - length greater than or equal to
    - length less than or equal to
- **Object**
    - exists
    - does not exist
    - is empty
    - is not empty

### Expression parameters

- **Number of Outputs**: Set how many outputs the node should have.
- **Output Index**: Create an expression to calculate which input item should be routed to which output. The expression must return a number.

## Node options

The node only displays **Options** when you select the **Rules Mode**.

- **Fallback Output**: Choose how to route the workflow when an item doesn't match any of the rules or conditions.
    - **None**: Ignore the item. This is the default behavior.
    - **Extra Output**: Send items to an extra, separate output.
    - **Output 0**: Send items to the same output as those matching the first rule.
- **Ignore Case**: Set whether to ignore letter case when evaluating conditions (turned on) or enforce letter case (turned off).
- **Less Strict Type Validation**: Set whether you want n8n to attempt to convert value types based on the operator you choose (turned on) or not (turned off).
- **Send data to all matching outputs**: Set whether to send data to all outputs meeting conditions (turned on) or whether to send the data to the first output matching the conditions (turned off).

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'switch') ]]

## Related resources

Refer to [Splitting with conditionals](/flow-logic/splitting/) for more information on using conditionals to create complex logic in n8n.




