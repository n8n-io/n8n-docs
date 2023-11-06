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
## Add conditions

Add comparison conditions using the **Add Condition** dropdown. The available comparison operations vary for each data type.

**Boolean**

- Equal
- Not Equal

**Number**

- Smaller
- Smaller Equal
- Equal
- Not Equal
- Larger
- Larger Equal
- Is Empty

**String**

- Contains
- Equal
- Not Contains
- Not Equal
- Regex
- Is Empty


## Combine conditions

You can choose to keep items:

* When they meet all conditions: select **Combine Conditions** > **AND**.
* When they meet any of the conditions: select **Combine Conditions** > **OR**.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/filter/){:target=_blank .external-link} on n8n's website.
