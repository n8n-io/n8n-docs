---
title: If
description: Documentation for the If node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
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

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [IF integrations](https://n8n.io/integrations/if/){:target=_blank .external-link} list.
///

## Add conditions

Create comparison **Conditions** for your If node.

- Use the data type dropdown to select the data type and comparison operation type for your condition. For example, to filter for dates after a particular date, select **Date & Time > is after**.
- The fields and values to enter into the condition change based on the data type and comparison you select.

### Available data type comparisons

- **String**
    - **exists**
    - **does not exist**
    - **is empty**
    - **is not empty**
    - **is equal to**
    - **is not equal to**
    - **contains**
    - **does not contain**
    - **starts with**
    - **does not start with**
    - **ends with**
    - **does not end with**
    - **matches regex**
    - **does not match regex**
- **Number**
    - **exists**
    - **does not exist**
    - **is empty**
    - **is not empty**
    - **is equal to**
    - **is not equal to**
    - **is greater than**
    - **is less than**
    - **is greater than or equal to**
    - **is less than or equal to**
- **Date & Time**
    - **exists**
    - **does not exist**
    - **is empty**
    - **is not empty**
    - **is equal to**
    - **is not equal to**
    - **is after**
    - **is before**
    - **is after or equal to**
    - **is before or equal to**
- **Boolean**
    - **exists**
    - **does not exist**
    - **is empty**
    - **is not empty**
    - **is true**
    - **is false**
    - **is equal to**
    - **is not equal to**
- **Array**
    - **exists**
    - **does not exist**
    - **is empty**
    - **is not empty**
    - **contains**
    - **does not contain**
    - **length equal to**
    - **length not equal to**
    - **length greater than**
    - **length less than**
    - **length greater than or equal to**
    - **length less than or equal to**
- **Object**
    - **exists**
    - **does not exist**
    - **is empty**
    - **is not empty**

Select **Add condition** to create more conditions.

### Combining conditions

You can choose to keep data:

* When it meets all conditions: Create two or more conditions and select **AND** in the dropdown between them.
* When it meets any of the conditions: Create two or more conditions and select **OR** in the dropdown between them.


## Branch execution with If and Merge nodes

--8<-- "_snippets/integrations/builtin/core-nodes/merge/if-merge-branch-execution.md"

## Related resources

View [example workflows and related content](https://n8n.io/integrations/if/){:target=_blank .external-link} on n8n's website.

Refer to [Splitting with conditionals](/flow-logic/splitting/) for more information on using conditionals to create complex logic in n8n.

If you need more than two conditional outputs, use the [Switch node](/integrations/builtin/core-nodes/n8n-nodes-base.switch/).



