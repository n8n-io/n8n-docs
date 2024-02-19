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

Add comparison conditions using the **Add Condition** filter. The available comparison operations vary for each data type.

**String**:

- exists
- doesn't exist
- is equal to
- isn't equal to
- contains
- doesn't contain
- starts with
- doesn't start with
- ends with
- doesn't end with
- matches regex
- doesn't match regex

**Number**:

- exists
- doesn't exist
- is equal to
- isn't equal to
- is greater than
- is less than
- is greater than or equal
- is less than or equal

**Date & Time**:

- exists
- doesn't exist
- is equal to
- isn't equal to
- is after
- is before
- is after or equal
- is before or equal

**Boolean**:

- exists
- doesn't exist
- is true
- is false
- is equal to
- isn't equal to

**Array**:

- exists
- doesn't exist
- is equal to
- isn't equal to
- contains
- doesn't contain
- length equal to
- length not equal to
- length greater than
- length less than
- length greater than or equal
- length less than or equal

**Object**:

- exists
- doesn't exist
- is empty
- isn't empty

## AND / OR

If you have more than one condition, you can choose either:

* **AND**: data must match all conditions to be true.
* **OR**: data only needs to match one of the conditions to be true.


## Branch execution with If and Merge nodes

--8<-- "_snippets/integrations/builtin/core-nodes/merge/if-merge-branch-execution.md"

## Related resources

View [example workflows and related content](https://n8n.io/integrations/if/){:target=_blank .external-link} on n8n's website.

Refer to [Splitting with conditionals](/flow-logic/splitting/) for more information on using conditionals to create complex logic in n8n.

If you need more than two conditional outputs, use the [Switch node](/integrations/builtin/core-nodes/n8n-nodes-base.switch/).



