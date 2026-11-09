---
title: Sort
description: >-
  Documentation for the Sort node in n8n, a workflow automation platform.
  Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Sort
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.sort.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.sort'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.sort'
layout:
  description:
    visible: false
---

# Sort <a href="#sort" id="sort"></a>

Use the Sort node to organize lists of items in a desired ordering, or generate a random selection.

{% hint style="info" %}
**Array sort behavior**

The Sort operation uses the default JavaScript operation where the elements to be sorted are converted into strings and their values compared. Refer to [Mozilla's guide to Array sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) to learn more.
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Configure this node using the **Type** parameter.

Use the dropdown to select how you want to input the sorting from these options.

### Simple <a href="#simple" id="simple"></a>

Performs an ascending or descending sort using the selected fields.

When you select this **Type**:

* Use the **Add Field To Sort By** button to input the **Field Name**.
* Select whether to use **Ascending** or **Descending** order.

#### Simple options <a href="#simple-options" id="simple-options"></a>

When you select **Simple** as the **Type**, you have the option to **Disable Dot Notation**. By default, n8n enables dot notation to reference child fields in the format `parent.child`. Use this option to disable dot notation (turned on) or to continue using dot (turned off).

### Random <a href="#random" id="random"></a>

Creates a random order in the list.

### Code <a href="#code" id="code"></a>

Input custom JavaScript code to perform the sort operation. This is a good option if a simple sort won't meet your needs.

Enter your custom JavaScript code in the **Code** input field.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Sort integration templates](https://n8n.io/integrations/sort) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/0nvcx1EqJQgGVzUXOOMN/" %}
