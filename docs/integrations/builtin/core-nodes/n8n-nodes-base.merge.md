---
title: Merge
description: Documentation for the Merge node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Merge

Use the Merge node to combine data from two streams, once data of both streams is available.

/// note | Major changes in 0.194.0
This node was overhauled in n8n 0.194.0. This document reflects the latest version of the node. If you're using an older version of n8n, you can find the previous version of this document [here](https://github.com/n8n-io/n8n-docs/blob/4ff688642cc9ee7ca7d00987847bf4e4515da59d/docs/integrations/builtin/core-nodes/n8n-nodes-base.merge.md){:target=_blank .external-link}.
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Merge integrations](https://n8n.io/integrations/merge/){:target=_blank .external-link} page.
///

## Merge mode

You can specify how the Merge node should combine data from different branches. The following options are available:

### Append

Keep data from both inputs. The output contains items from Input 1, followed by all items from Input 2.

![Diagram](/_images/integrations/builtin/core-nodes/merge/append-diagram.png)

### Combine

Combine data from both inputs. Choose a **Combination Mode** to control how n8n merges the data.

#### Merge by fields

Compare items by field values. Enter the fields you want to compare in **Fields to Match**.

n8n's default behavior is to keep matching items. You can change this using the **Output Type** setting:

* Keep matches: merge items that match.
* Keep non-matches: merge items that don't match.
* Enrich Input 1: keep all data from Input 1, and add matching data from Input 2.
* Enrich Input 2: keep all data from Input 2, and add matching data from Input 1.

![Diagram](/_images/integrations/builtin/core-nodes/merge/merge-by-field-diagram.png)


##### Field value clashes

--8<-- "_snippets/integrations/builtin/core-nodes/merge/field-value-clash.md"

##### Multiple matches

Matching by field can generate multiple matches if the inputs contain duplicate data. To handle this, select **Add Option > Multiple Matches**. Then choose:

* **Include All Matches**: output multiple items (one for each match).
* **Include First Match Only**: keep the first item, discard subsequent items.


#### Merge by position

Combine items based on their order. The item at index 0 in Input 1 merges with the item at index 0 in Input 2, and so on.

![Diagram](/_images/integrations/builtin/core-nodes/merge/merge-by-position-diagram.png)

##### Inputs with different numbers of items

If there are more items in one input than the other, the default behavior is to leave out the items without a match. Choose **Add Option** > **Include Any Unpaired Items** to keep the unmatched items.

##### Field value clashes

--8<-- "_snippets/integrations/builtin/core-nodes/merge/field-value-clash.md"

#### Multiplex

Output all possible item combinations, while merging fields with the same name.

![Diagram](/_images/integrations/builtin/core-nodes/merge/multiplex-diagram.png)

##### Field value clashes

--8<-- "_snippets/integrations/builtin/core-nodes/merge/field-value-clash.md"

#### Options

When combining branches, you can set **Options**:

For all modes:

* **Clash handling**: choose how to merge when branches clash, or when there are sub-fields.
* **Fuzzy compare**: whether to tolerate type differences when comparing fields (enabled), or not (disabled, default). For example, when you enable this, n8n treats `"3"` and `3` as the same.

When merging by field:

* **Disable dot notation**: this prevents accessing child fields using `parent.child` in the field name.
* **Multiple matches**: choose how n8n handles multiple matches when comparing branches.

When merging by position:

**Include Any Unpaired Items**: choose whether to keep or discard unpaired items.

### Choose branch

Choose which input to keep. This option always waits until the data from both inputs is available. You can keep the data from Input 1 or Input 2, or you can output a single empty item. The node outputs the data from the chosen input, without changing it.

## Merging branches with uneven numbers of items

The items passed into Input 1 of the Merge node will take precedence. For example, if the Merge node receives five items in Input 1 and 10 items in Input 2, it only processes five items. The remaining five items from Input 2 aren't processed.

## Branch execution with If and Merge nodes

--8<-- "_snippets/integrations/builtin/core-nodes/merge/if-merge-branch-execution.md"

## Try it out: Load a workflow

n8n provides an example workflow that demonstrates key Merge node concepts.

Go to [Joining different datasets](https://n8n.io/workflows/1747-joining-different-datasets/){:target=_blank .external-link} and select **Use workflow** to copy the example workflow. You can then paste it into your n8n instance.

