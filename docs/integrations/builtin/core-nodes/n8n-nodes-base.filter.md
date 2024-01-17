---
title: Filter
description: Documentation for the Filter node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Filter

Filter items based on a condition. If the item meets the condition, the Filter node passes it on to the next node in the Filter node output. If the item doesn't meet the condition, the Filter node omits the item from its output.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Filter integrations](https://n8n.io/integrations/filter/){:target=_blank .external-link} list.
///

## Node parameters

**Conditions**: create comparison conditions using the fields in **Conditions**. The available comparison operations vary for each data type. Select **Add condition** to create another condition.

### Combining conditions

You can choose to keep items:

* When they meet all conditions: create two or more conditions, then select **AND** in the dropdown between the first two conditions.
* When they meet any of the conditions: create two or more conditions, then select **OR** in the dropdown between the first two conditions.

You can't create a mix of AND and OR rules.

## Node options

- **Ignore Case**: whether to ignore letter case.
- **Less Strict Type Validation**: enable this if you want n8n to attempt to convert value types based on the operator you choose.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/filter/){:target=_blank .external-link} on n8n's website.
