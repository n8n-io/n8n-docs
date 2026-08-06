---
contentType: howto
nodeTitle: Filter out unwanted data
originalFilePath: data/data-filtering.md
originalUrl: 'https://docs.n8n.io/data/data-filtering'
url: 'https://docs.n8n.io/build/work-with-data/filter-out-unwanted-data'
layout:
  description:
    visible: false
---

# Filtering data <a href="#filtering-data" id="filtering-data"></a>

Filtering in n8n can mean different things depending on what you want to accomplish. This guide covers both visual filtering in the UI and data filtering during workflow execution.

## Filter data visually in the UI <a href="#filter-data-visually-in-the-ui" id="filter-data-visually-in-the-ui"></a>

{% hint style="info" %}
**Feature availability**

Available on Community, Cloud Pro, and Enterprise plans.
{% endhint %}

Search and filter data in the node **INPUT** and **OUTPUT** panels. Use this to check your node's data and find specific items.

To search:

1. In a node, select **Search** <img src="../.gitbook/assets/search.png" alt="Search icon" data-size="line"> in the **INPUT** or **OUTPUT** panel.
1. Enter your search term.

n8n filters as you type, displaying the objects or rows containing the term.

Filtering is purely visual: n8n doesn't change or delete data. The filter resets when you close and reopen the node.

## Filter data during workflow execution <a href="#filter-data-during-workflow-execution" id="filter-data-during-workflow-execution"></a>

To actually remove or filter data in your workflow, use these approaches:

### Filter out items <a href="#filter-out-items" id="filter-out-items"></a>

To remove entire items from your workflow based on conditions, use the [Filter node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.filter). This node evaluates conditions and only passes through items that meet your criteria.

### Filter out fields <a href="#filter-out-fields" id="filter-out-fields"></a>

To remove specific fields from an item or object while keeping the item itself, use the [Edit Fields (Set) node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.set). Configure it to remove the fields you don't need.

### Filter array elements <a href="#filter-array-elements" id="filter-array-elements"></a>

To filter elements within an array inside an item, use the `.filter()` method in an expression or Code node. For example:

```javascript
{{ $json.myArray.filter(item => item.value > 10) }}
```

This removes array elements that don't match your condition while preserving the item structure.

### Filter out duplicate items from previous executions <a href="#filter-out-duplicate-items-from-previous-executions" id="filter-out-duplicate-items-from-previous-executions"></a>

To remove items that have been seen in previous executions of a workflow, use the [Remove Duplicates](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.removeduplicates) node. Use this when an event fires multiple times but you only want to process the first occurrence.
