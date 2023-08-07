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

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [IF integrations](https://n8n.io/integrations/if/){:target=_blank .external-link} list.

## Add conditions

Add comparison conditions using the **Add Condition** dropdown. The available comparison operations vary for each data type.

**Boolean:**

- Equal
- Not Equal

**Date & Time:**

- Occurred After
- Occurred Before


**Number:**

- Smaller
- Smaller or Equal
- Equal
- Not Equal
- Larger
- Larger or Equal
- Is Empty
- Is Not Empty


**String:**

- Contains
- Not Contains
- Ends With
- Not Ends With
- Equal
- Not Equal
- Regex Match
- Regex Not Match
- Starts With
- Not Starts With
- Is Empty
- Is Not Empty

## Match any or match all

You can choose to split a workflow when the data meets any of the conditions, or all of the conditions, by setting **Combine** to **ANY** or **ALL**.


## Branch execution with If and Merge nodes

--8<-- "_snippets/integrations/builtin/core-nodes/merge/if-merge-branch-execution.md"

## Related resources

View [example workflows and related content](https://n8n.io/integrations/if/){:target=_blank .external-link} on n8n's website.

Refer to [Splitting with conditionals](/flow-logic/splitting/) for more information on using conditionals to create complex login in n8n.

If you need more than two conditional outputs, use the [Switch node](/integrations/builtin/core-nodes/n8n-nodes-base.switch/).



